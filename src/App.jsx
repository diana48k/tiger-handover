import React, { useState, useEffect } from 'react';
import { DEFAULT_PROJECT } from './constants/defaults';
import { loadSettings } from './components/SettingsModal';
import ConfirmDialog from './components/ConfirmDialog';
import LoadingOverlay from './components/LoadingOverlay';
import StepIndicator from './components/StepIndicator';
import SettingsModal from './components/SettingsModal';
import OfflineBanner from './components/OfflineBanner';
import InstallPWA from './components/InstallPWA';
import Step1_ProjectInfo from './pages/Step1_ProjectInfo';
import Step2_Equipment from './pages/Step2_Equipment';
import Step3_Signature from './pages/Step3_Signature';
import Step4_Preview from './pages/Step4_Preview';
import Dashboard from './pages/Dashboard';
import { sendHandoverEmail } from './utils/emailUtils';
import { TRANSLATIONS } from './constants/translations';
import { dbGetItem, dbSetItem, dbRemoveItem } from './utils/db';

const saveHistoryEntry = async (projectData, doors, synced) => {
  try {
    const historyEntry = {
      id: Date.now(),
      savedAt: new Date().toISOString(),
      synced,
      projectData,
      doors: doors.map(d => ({
        ...d,
        beforeImage: null,
        afterImage: null,
        afterImageBase64: null,
        afterImageMime: null,
        images: (d.images || []).map(img => ({ ...img, url: null }))
      })),
    };
    const existing = await dbGetItem('handoverHistory') || [];
    await dbSetItem('handoverHistory', [historyEntry, ...existing].slice(0, 50));
  } catch (e) {
    console.warn('Could not save history entry', e);
  }
};

const CSS_STYLES = `
  body, .font-body, button, input, select, textarea, #pdf-content, #pdf-content * {
    font-family: 'Sarabun', 'Noto Sans Thai', 'Poppins', sans-serif !important;
    line-height: 1.6 !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  .animate-fadeIn { animation: fadeIn 0.25s ease-out; }

  #pdf-content * {
    letter-spacing: 0 !important;
    word-spacing: 0 !important;
  }
  #pdf-content table td, #pdf-content table th {
    line-height: 1.4 !important;
  }
  #pdf-content p, #pdf-content h1, #pdf-content h2, #pdf-content h3, #pdf-content span, #pdf-content div {
    line-height: 1.6 !important;
  }
  #pdf-content p {
    word-break: break-word !important;
    overflow-wrap: break-word !important;
  }

  @media print {
    @page { size: A4 portrait; margin: 0; }
    html, body { width: 210mm; height: 100%; margin: 0 !important; padding: 0 !important; background: white !important; }
    .no-print, header, button, .modal, .preview-container > div:first-child { display: none !important; }
    .no-print-bg { background: white !important; padding: 0 !important; }
    .preview-container { height: auto !important; overflow: visible !important; display: block !important; padding: 0 !important; }
    #pdf-content { position: relative !important; width: 210mm !important; display: block !important; gap: 0 !important; }
    .a4-page {
      box-shadow: none !important; margin: 0 !important; border: none !important;
      page-break-after: always !important; page-break-inside: avoid !important;
      width: 210mm !important; min-height: 297mm !important; height: auto !important; max-height: none !important;
      padding: 15mm 20mm !important; box-sizing: border-box !important; background: white !important;
      position: relative; overflow: visible !important;
      font-family: 'Sarabun', 'Noto Sans Thai', 'Poppins', sans-serif !important;
    }
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  }
`;

const SIMPLE_CSS = `
  body, .font-body, button, input, select, textarea {
    font-family: 'Sarabun', 'Noto Sans Thai', 'Poppins', sans-serif !important;
    line-height: 1.6 !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  .animate-fadeIn { animation: fadeIn 0.25s ease-out; }
`;

const compressImage = (file, maxWidth = 1024, quality = 0.7) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

export default function App() {
  const [step, setStep] = useState(1);
  const [lang, setLang] = useState('th');
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [errors, setErrors] = useState({});

  const t = (key) => TRANSLATIONS[lang]?.[key] || key;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  const getDefaultProject = () => {
    const settings = loadSettings();
    return {
      ...DEFAULT_PROJECT,
      date: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      techName: settings.defaultTechName || DEFAULT_PROJECT.techName,
      contractor: settings.defaultContractor || DEFAULT_PROJECT.contractor,
    };
  };

  const [projectData, setProjectData] = useState(getDefaultProject);
  const [doors, setDoors] = useState([
    {
      id: 1, name: 'door-1',
      images: [
        { id: 'before', title: 'ภาพก่อนติดตั้ง (Before)', url: null },
        { id: 'after', title: 'ภาพหลังติดตั้ง (After)', url: null }
      ],
      equipments: [
        { id: 1, name: 'XFace200', qty: 1, sn: 'KTB2253700034', remark: '' },
        { id: 2, name: 'Power Supply', qty: 1, sn: 'YDW1253200269', remark: '' }
      ]
    }
  ]);
  const [signatures, setSignatures] = useState({ tech: null, client: null, clientName: '' });
  const [aiLoading, setAiLoading] = useState({ state: false, message: '' });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, type: 'alert', title: '', message: '', onConfirm: null });

  useEffect(() => {
    const loadDraft = async () => {
      const savedDraft = await dbGetItem('handoverDraft_v2');
      if (savedDraft) {
        try {
          if (savedDraft.projectData) setProjectData(savedDraft.projectData);
          if (savedDraft.doors) {
            const migratedDoors = savedDraft.doors.map(d => {
              if (!d.images) {
                const images = [];
                images.push({ id: 'before', title: 'ภาพก่อนติดตั้ง (Before)', url: d.beforeImage || null });
                images.push({ id: 'after', title: 'ภาพหลังติดตั้ง (After)', url: d.afterImage || null });
                return { ...d, images };
              }
              return d;
            });
            setDoors(migratedDoors);
          }
          if (savedDraft.signatures) setSignatures(savedDraft.signatures);
          if (savedDraft.step) setStep(savedDraft.step);
        } catch (e) { console.error("Failed to parse draft", e); }
      }
      setIsLoaded(true);
    };
    loadDraft();
  }, []);

  const validateStep1 = () => {
    const errs = {};
    if (!projectData.clientName.trim()) errs.clientName = 'required';
    if (!projectData.orderNo.trim()) errs.orderNo = 'required';
    if (!projectData.projectName.trim()) errs.projectName = 'required';
    return errs;
  };

  const validateStep2 = () => {
    const errs = {};
    doors.forEach(door => {
      const doorErrs = {};
      if (!door.name.trim()) doorErrs.name = 'required';
      door.equipments.forEach(eq => {
        if (!eq.name.trim()) doorErrs[`eq_${eq.id}`] = 'required';
      });
      if (Object.keys(doorErrs).length > 0) errs[`door_${door.id}`] = doorErrs;
    });
    return errs;
  };

  const validateStep3 = () => {
    const errs = {};
    if (!signatures.tech) errs.techSignature = 'required';
    return errs;
  };

  const handleNext1 = () => {
    const errs = validateStep1();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({}); setStep(2);
  };

  const handleNext2 = () => {
    const errs = validateStep2();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({}); setStep(3);
  };

  const handleNext3 = () => {
    const errs = validateStep3();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({}); setStep(4);
  };

  const handleImageUpload = async (doorId, imageId, e) => {
    const file = e.target.files[0];
    if (file) {
      setAiLoading({ state: true, message: 'บีบอัดรูปภาพ...' });
      try {
        const compressedBase64 = await compressImage(file, 1024, 0.7);
        setDoors(doors => doors.map(d => d.id === doorId ? {
          ...d,
          images: (d.images || []).map(img => img.id === imageId ? { ...img, url: compressedBase64 } : img)
        } : d));
      } catch (err) {
        console.error("Image compression failed", err);
      } finally {
        setAiLoading({ state: false, message: '' });
      }
    }
    e.target.value = '';
  };

  const removeImage = (doorId, imageId, e) => {
    e.stopPropagation();
    setDoors(doors => doors.map(d => d.id === doorId ? {
      ...d,
      images: (d.images || []).map(img => img.id === imageId ? { ...img, url: null } : img)
    } : d));
  };

  const addImageSlot = (doorId) => {
    setDoors(doors => doors.map(d => d.id === doorId ? {
      ...d,
      images: [
        ...(d.images || []),
        { id: Date.now().toString(), title: 'รูปถ่ายเพิ่มเติม', url: null }
      ]
    } : d));
  };

  const removeImageSlot = (doorId, imageId, e) => {
    e.stopPropagation();
    setConfirmDialog({
      isOpen: true, type: 'confirm', title: t('confirm'), message: t('deletePhotoConfirmMsg'),
      onConfirm: () => {
        setDoors(doors => doors.map(d => d.id === doorId ? {
          ...d,
          images: (d.images || []).filter(img => img.id !== imageId)
        } : d));
        setConfirmDialog({ isOpen: false, type: 'alert', title: '', message: '', onConfirm: null });
      }
    });
  };

  const updateImageTitle = (doorId, imageId, title) => {
    setDoors(doors => doors.map(d => d.id === doorId ? {
      ...d,
      images: (d.images || []).map(img => img.id === imageId ? { ...img, title } : img)
    } : d));
  };

  const addDoor = () => setDoors([...doors, {
    id: Date.now(), name: `door-${doors.length + 1}`,
    images: [
      { id: 'before', title: lang === 'th' ? 'ภาพก่อนติดตั้ง (Before)' : 'Before Installation (Before)', url: null },
      { id: 'after', title: lang === 'th' ? 'ภาพหลังติดตั้ง (After)' : 'After Installation (After)', url: null }
    ],
    equipments: [{ id: Date.now(), name: '', qty: 1, sn: '', remark: '' }]
  }]);

  const removeDoor = (id) => setConfirmDialog({
    isOpen: true, type: 'confirm', title: t('confirm'), message: t('deleteDoorConfirmMsg'),
    onConfirm: () => {
      setDoors(doors => doors.filter(d => d.id !== id));
      setConfirmDialog({ isOpen: false, type: 'alert', title: '', message: '', onConfirm: null });
    }
  });

  const addEquipment = (doorId) => setDoors(doors.map(d => d.id === doorId ? {
    ...d, equipments: [...d.equipments, { id: Date.now(), name: '', qty: 1, sn: '', remark: '' }]
  } : d));

  const updateEquipment = (doorId, eqId, field, value) => setDoors(doors.map(d => d.id === doorId ? {
    ...d, equipments: d.equipments.map(eq => eq.id === eqId ? { ...eq, [field]: value } : eq)
  } : d));

  const removeEquipment = (doorId, eqId) => setDoors(doors.map(d => d.id === doorId ? {
    ...d, equipments: d.equipments.filter(eq => eq.id !== eqId)
  } : d));

  const handleSaveDraft = async () => {
    try {
      await dbSetItem('handoverDraft_v2', { projectData, doors, signatures, step });
      saveHistoryEntry(projectData, doors, false);
      setConfirmDialog({ isOpen: true, type: 'alert', title: t('saved'), message: t('draftSaved') });
    } catch (e) {
      setConfirmDialog({ isOpen: true, type: 'alert', title: t('error'), message: t('imagesTooLarge') });
    }
  };

  const handleClearDraft = () => {
    setConfirmDialog({
      isOpen: true, type: 'confirm', title: t('resetConfirmTitle'), message: t('resetConfirmMsg'),
      onConfirm: async () => {
        await dbRemoveItem('handoverDraft_v2');
        window.location.reload();
      }
    });
  };

  const handleSavePDF = async () => {
    const element = document.getElementById('pdf-content');
    if (!window.html2pdf) return setConfirmDialog({ isOpen: true, type: 'alert', title: t('notice'), message: t('loadingPdf') });
    setAiLoading({ state: true, message: t('loadingPdf') });
    await document.fonts.ready;
    const originalWidth = element.style.width;
    const originalAlign = element.style.alignItems;
    element.style.width = 'max-content';
    element.style.alignItems = 'flex-start';

    // Retrieve client name for PDF filename
    const clientName = projectData.clientName || '';
    const cleanFilename = clientName.replace(/[<>:"/\\|?*\x00-\x1F]/g, '_').trim() || `Handover_${projectData.orderNo}`;

    setTimeout(() => {
      window.html2pdf().set({
        margin: 0,
        filename: `${cleanFilename}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
          scrollY: 0,
          letterRendering: false,
          onclone: (clonedDoc) => {
            // Copy all link and style elements to cloned document head to ensure stylesheets & fonts are active
            const clonedHead = clonedDoc.head || clonedDoc.getElementsByTagName('head')[0];
            if (clonedHead) {
              document.head.querySelectorAll('link, style').forEach(el => {
                clonedHead.appendChild(el.cloneNode(true));
              });
            }
            // Copy loaded fonts from document to cloned document to resolve double rendering text overlaps
            try {
              document.fonts.forEach(font => {
                clonedDoc.fonts.add(font);
              });
            } catch (err) {
              console.warn('Could not copy FontFaces directly:', err);
            }
          }
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'] }
      }).from(element).save().then(() => {
        element.style.width = originalWidth;
        element.style.alignItems = originalAlign;
        setAiLoading({ state: false, message: '' });
      });
    }, 500);
  };

  const handlePrint = () => window.print();

  const handleSaveToCloud = async () => {
    if (!signatures.tech) {
      setConfirmDialog({ isOpen: true, type: 'alert', title: t('error'), message: t('signTechFirst') });
      return;
    }
    setAiLoading({ state: true, message: t('uploading') });
    const settings = loadSettings();
    const payload = { projectData, doors, signatures };
    try {
      const response = await fetch(settings.appsScriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (result.status === 'success') {
        saveHistoryEntry(projectData, doors, true);
        setAiLoading({ state: false, message: '' });
        if (settings.emailJsServiceId) {
          setConfirmDialog({
            isOpen: true, type: 'confirm',
            title: t('sendEmailConfirm'),
            message: `${t('sendEmailTo')} ${settings.recipientEmail}?`,
            onConfirm: async () => {
              setConfirmDialog({ isOpen: false, type: 'alert', title: '', message: '', onConfirm: null });
              setAiLoading({ state: true, message: t('uploading') });
              try {
                await sendHandoverEmail(settings, projectData, doors);
                setAiLoading({ state: false, message: '' });
                setConfirmDialog({ isOpen: true, type: 'alert', title: t('saved'), message: t('emailSentSuccess') });
              } catch (e) {
                setAiLoading({ state: false, message: '' });
                setConfirmDialog({ isOpen: true, type: 'alert', title: t('error'), message: `${t('emailSentFailed')} ${e.message}` });
              }
            }
          });
        } else {
          setConfirmDialog({ isOpen: true, type: 'alert', title: t('saved'), message: t('sheetsSavedSuccess') });
        }
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setAiLoading({ state: false, message: '' });
      setConfirmDialog({ isOpen: true, type: 'alert', title: t('error'), message: t('sheetsSavedFailed') });
    }
  };

  if (!isLoaded) return null;

  if (showDashboard) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] font-sans font-body relative">
        <style>{SIMPLE_CSS}</style>
        <OfflineBanner />
        <LoadingOverlay aiLoading={aiLoading} />
        <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
        <Dashboard onBack={() => setShowDashboard(false)} lang={lang} t={t} />
        <InstallPWA />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans font-body pb-10 relative">
      <style>{CSS_STYLES}</style>
      <OfflineBanner />
      <LoadingOverlay aiLoading={aiLoading} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}

      {step < 4 && (
        <header className="bg-white border-b border-[#E8E8E8] shadow-[1px_1px_8px_rgba(191,191,191,0.15)] p-4 sticky top-0 z-40">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <h1 className="font-bold text-lg flex items-center tracking-wide text-[#3A3A3A]">
              <svg className="w-5 h-5 mr-2 text-[#C10016]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" /></svg>
              {t('appName')}
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex border border-gray-200 rounded-full p-0.5 bg-gray-50 text-[10px] select-none font-sans mr-1">
                <button
                  onClick={() => setLang('th')}
                  className={`px-2.5 py-0.5 rounded-full font-bold transition-all ${lang === 'th' ? 'bg-[#C10016] text-white' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  TH
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-2.5 py-0.5 rounded-full font-bold transition-all ${lang === 'en' ? 'bg-[#C10016] text-white' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  EN
                </button>
              </div>
              <button
                onClick={() => setShowDashboard(true)}
                className="text-xs bg-white hover:bg-gray-50 border border-gray-200 text-[#3A3A3A] px-2.5 py-1.5 rounded-full font-medium flex items-center gap-1 transition-all hidden sm:flex"
              >
                <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                {t('history')}
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="text-xs bg-white hover:bg-gray-50 border border-gray-200 text-[#3A3A3A] px-2.5 py-1.5 rounded-full font-medium flex items-center gap-1 transition-all"
              >
                <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.43l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 0 1 0-.255c.007-.378-.138-.75-.43-.991l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.645-.869L9.594 3.94ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" /></svg>
                {t('settings')}
              </button>
              <button
                onClick={handleSaveDraft}
                className="text-xs bg-white hover:bg-gray-50 border border-gray-200 text-[#3A3A3A] px-2.5 py-1.5 rounded-full font-medium flex items-center gap-1 transition-all hidden sm:flex"
              >
                <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" /></svg>
                {t('saveDraft')}
              </button>
              <button
                onClick={handleClearDraft}
                className="text-xs bg-white hover:bg-red-50 border border-red-200 text-[#C10016] px-2.5 py-1.5 rounded-full font-medium flex items-center gap-1 transition-all"
              >
                <svg className="w-3.5 h-3.5 text-[#C10016]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
                {t('reset')}
              </button>
            </div>
          </div>
        </header>
      )}

      <main className={step < 4 ? "max-w-3xl mx-auto mt-8 px-4 no-print" : "w-full"}>
        {step < 4 && <StepIndicator step={step} lang={lang} t={t} />}
        {step === 1 && (
          <Step1_ProjectInfo projectData={projectData} setProjectData={setProjectData} onNext={handleNext1} errors={errors} lang={lang} t={t} />
        )}
        {step === 2 && (
          <Step2_Equipment
            doors={doors} setDoors={setDoors}
            updateEquipment={updateEquipment} addEquipment={addEquipment}
            removeEquipment={removeEquipment} removeDoor={removeDoor}
            handleImageUpload={handleImageUpload} removeImage={removeImage}
            addImageSlot={addImageSlot} removeImageSlot={removeImageSlot}
            updateImageTitle={updateImageTitle}
            addDoor={addDoor}
            onBack={() => { setErrors({}); setStep(1); }}
            onNext={handleNext2} errors={errors}
            lang={lang} t={t}
          />
        )}
        {step === 3 && (
          <Step3_Signature
            projectData={projectData} setProjectData={setProjectData}
            signatures={signatures} setSignatures={setSignatures}
            onBack={() => { setErrors({}); setStep(2); }}
            onNext={handleNext3} errors={errors}
            lang={lang} t={t}
          />
        )}
        {step === 4 && (
          <Step4_Preview
            projectData={projectData} doors={doors} signatures={signatures}
            onBack={() => setStep(3)}
            handleSavePDF={handleSavePDF} handlePrint={handlePrint} handleSaveToCloud={handleSaveToCloud}
            lang={lang} t={t}
          />
        )}
      </main>
      <InstallPWA />
    </div>
  );
}
