import React from 'react';
import { getThaiDate, formatThaiDateRange } from '../utils/dateUtils';
import { loadSettings } from '../components/SettingsModal';

const Step4_Preview = ({ projectData, doors, signatures, onBack, handleSavePDF, handlePrint, handleSaveToCloud, lang, t }) => {
  const settings = loadSettings();
  const companyName = settings.companyName || projectData.contractor;
  const companyAddress = settings.companyAddress || 'เลขที่ 18 อาคารซีทีซี ซอยรามอินทรา 51 แขวงท่าแร้ง เขตบางเขน กรุงเทพมหานคร 10230';

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    if (lang === 'th') {
      return getThaiDate(dateStr);
    }
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatDateRange = (startStr, endStr) => {
    if (lang === 'th') {
      return formatThaiDateRange(startStr, endStr);
    }
    if (!startStr) return '';
    const start = new Date(startStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    if (!endStr || startStr === endStr) return start;
    const end = new Date(endStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    return `${start} - ${end}`;
  };

  return (
    <div className="animate-fadeIn w-full">
      <div className="no-print sticky top-0 bg-white border-b border-gray-200 shadow-sm p-4 mb-6 z-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#3A3A3A] flex items-center gap-1.5 select-none">
            <svg className="w-5 h-5 text-[#C10016]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.23 13.44-3.2 3.2m0 0-3.2-3.2m3.2 3.2V9" /></svg>
            {t('step4Title').replace('📄 ', '')}
          </h2>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          <button onClick={onBack} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-full text-xs font-bold hover:bg-gray-50 transition-all">{t('back')}</button>
          
          <button
            onClick={handlePrint}
            className="bg-white border border-gray-200 text-[#3A3A3A] hover:bg-gray-50 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1 transition-all"
          >
            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-14.326 0C3.768 7.44 3 8.376 3 9.456V15.75a2.25 2.25 0 0 0 2.25 2.25h1.092m4.218-12V3h4.887v3" /></svg>
            {t('printBtn').replace('🖨️ ', '')}
          </button>
          
          <button
            onClick={handleSavePDF}
            className="bg-white border border-gray-200 text-[#3A3A3A] hover:bg-gray-50 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1 transition-all"
          >
            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5-3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
            {t('savePdfBtn').replace('📄 ', '')}
          </button>

          <button
            onClick={handleSaveToCloud}
            className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-5 py-2 rounded-full text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
          >
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" /></svg>
            {t('saveToCloudBtn').replace('☁️ ', '')}
          </button>
        </div>
      </div>

      <div className="preview-container bg-gray-200 flex flex-col items-center gap-6 pb-20 no-print-bg">
        <div id="pdf-content" className="flex flex-col gap-6 w-full items-center">

          {/* PAGE 1 - Cover */}
          <div className="a4-page bg-white relative overflow-hidden flex flex-col mx-auto shadow-md" style={{ width: '210mm', minHeight: '297mm', height: 'auto', padding: '15mm 20mm', boxSizing: 'border-box' }}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C10016] rounded-bl-full opacity-5"></div>
            <div className="absolute bottom-0 left-0 w-full h-4 bg-[#1A1A1B]"></div>
            <div className="flex-grow flex flex-col justify-center items-center text-center px-10">
              <div className="mb-6 flex justify-center items-center">
                <img src="/LOGO.png" alt="Company Logo" className="max-h-24 max-w-[200px] object-contain" />
              </div>
              <h1 className="text-4xl font-extrabold text-[#1A1A1B] mb-6 tracking-wide">{t('coverTitle')}</h1>
              <h2 className="text-xl font-bold text-gray-700 mb-2">{t('coverProjectLabel')} {projectData.projectName}</h2>
              <div className="w-16 h-1 bg-[#C10016] my-8"></div>
              <p className="text-base text-gray-500 mb-2">{t('coverPresentedTo')}</p>
              <h3 className="text-xl font-bold text-[#1A1A1B]">{projectData.clientName}</h3>
            </div>
            <div className="mt-auto text-center pb-8">
              <p className="text-gray-400 font-medium mb-1 text-xs uppercase">{t('coverPreparedBy')}</p>
              <p className="text-base font-bold text-[#1A1A1B]">{companyName}</p>
              <p className="text-xs text-gray-500 mt-2">{t('coverOperationDate')} {formatDateRange(projectData.date, projectData.endDate)}</p>
            </div>
          </div>

          {/* PAGE 2 - Letter */}
          <div className="a4-page bg-white relative mx-auto shadow-md" style={{ width: '210mm', minHeight: '297mm', height: 'auto', padding: '15mm 20mm 30mm 20mm', boxSizing: 'border-box', position: 'relative' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <img src="/LOGO.png" alt="Company Logo" style={{ maxHeight: '64px', maxWidth: '150px', objectFit: 'contain', margin: '0 auto 8px' }} />
              <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1A1A1B', margin: 0 }}>{t('letterTitle')}</h1>
            </div>
            
            <div style={{ fontSize: '13px', color: '#1F2937', lineHeight: '1.8' }}>
              <div style={{ textAlign: 'right', color: '#4B5563', marginBottom: '24px' }}>{t('letterDatePrefix')} {formatDate(projectData.endDate || projectData.date)}</div>
              
              <table style={{ width: '100%', borderCollapse: 'collapse', border: 'none', marginBottom: '24px', fontSize: '13px', color: '#1F2937' }}>
                <tbody>
                  <tr>
                    <td style={{ width: '64px', fontWeight: 'bold', color: '#1A1A1B', verticalAlign: 'top', padding: '4px 0', textAlign: 'left' }}>{t('letterSubject')}</td>
                    <td style={{ verticalAlign: 'top', padding: '4px 0', textAlign: 'left' }}>{lang === 'th' ? `ส่งมอบงาน "${projectData.projectName}"` : `Handover of "${projectData.projectName}"`}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 'bold', color: '#1A1A1B', verticalAlign: 'top', padding: '4px 0', textAlign: 'left' }}>{t('letterTo')}</td>
                    <td style={{ verticalAlign: 'top', padding: '4px 0', textAlign: 'left' }}>{projectData.clientName}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 'bold', color: '#1A1A1B', verticalAlign: 'top', padding: '4px 0', textAlign: 'left' }}>{t('letterRef')}</td>
                    <td style={{ verticalAlign: 'top', padding: '4px 0', textAlign: 'left' }}>{lang === 'th' ? `เอกสารใบสั่งซื้อสินค้าและบริการ เลขที่ ${projectData.orderNo}` : `Service Purchase Order Document No. ${projectData.orderNo}`}</td>
                  </tr>
                </tbody>
              </table>

              <div style={{ textAlign: 'left' }}>
                {lang === 'th' ? (
                  <p style={{ textIndent: '36px', marginBottom: '12px' }}>ตามที่ {projectData.clientName} ได้เป็นผู้ว่าจ้างให้ {companyName} ดำเนินการติดตั้งระบบ {projectData.projectName} จำนวน {doors.length} ประตู ได้แก่</p>
                ) : (
                  <p style={{ textIndent: '36px', marginBottom: '12px' }}>According to the contract where {projectData.clientName} engaged {companyName} to install the {projectData.projectName} system for {doors.length} doors, namely:</p>
                )}
                
                <table style={{ width: '100%', marginLeft: '36px', marginBottom: '16px', borderCollapse: 'collapse', border: 'none', color: '#C10016', fontWeight: '600' }}>
                  <tbody>
                    {Array.from({ length: Math.ceil(doors.length / 2) }).map((_, rowIndex) => {
                      const d1 = doors[rowIndex * 2];
                      const d2 = doors[rowIndex * 2 + 1];
                      return (
                        <tr key={rowIndex}>
                          <td style={{ width: '50%', padding: '4px 0', textAlign: 'left' }}>
                            {d1 ? `${rowIndex * 2 + 1}. ${d1.name}` : ''}
                          </td>
                          <td style={{ width: '50%', padding: '4px 0', textAlign: 'left' }}>
                            {d2 ? `${rowIndex * 2 + 2}. ${d2.name}` : ''}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                
                {lang === 'th' ? (
                  <p style={{ textIndent: '36px', marginBottom: '12px' }}>บัดนี้ บริษัทฯ ได้ดำเนินการติดตั้งแล้วเสร็จถูกต้องตามแบบ และรายละเอียดทุกประการ จึงมีความประสงค์ขอส่งมอบงานที่ได้ดำเนินการแล้วเสร็จนี้ให้กับ {projectData.clientName}</p>
                ) : (
                  <p style={{ textIndent: '36px', marginBottom: '12px' }}>We hereby certify that the company has successfully completed the installation in accordance with all drawings and specifications. We now wish to formally hand over the completed work to {projectData.clientName}</p>
                )}
                
                <p style={{ textIndent: '36px', marginBottom: '24px' }}>{t('letterBody6')}</p>
              </div>
            </div>
            
            <div style={{ marginTop: '40px', textAlign: 'center', width: '220px', marginLeft: 'auto', marginRight: '40px' }}>
              <p style={{ marginBottom: '8px', color: '#4B5563', fontSize: '13px' }}>{t('letterSincerely')}</p>
              <div style={{ height: '64px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', marginBottom: '4px' }}>
                {signatures.tech && <img src={signatures.tech} alt="Tech Sig" style={{ maxHeight: '100%', objectFit: 'contain' }} />}
              </div>
              <p style={{ borderTop: '1px solid #D1D5DB', paddingTop: '8px', fontWeight: 'bold', color: '#1A1A1B', fontSize: '13px', margin: 0 }}>ลงชื่อ {projectData.techName}</p>
              <p style={{ fontSize: '12px', color: '#6B7280', margin: '2px 0 0' }}>{t('letterDelivererLabel')}</p>
            </div>
            
            <div style={{ position: 'absolute', bottom: '15mm', left: '20mm', right: '20mm', paddingTop: '16px', borderTop: '1px solid #E5E7EB', textAlign: 'center', fontSize: '11px', color: '#9CA3AF', lineHeight: '1.5' }}>
              <span style={{ fontWeight: 'bold', color: '#1A1A1B' }}>{companyName}</span> <br />
              {companyAddress}
            </div>
          </div>

          {/* PAGE 3+ - Door pages */}
          {doors.map((door, index) => {
            const doorImages = door.images || [
              { id: 'before', title: lang === 'th' ? 'ภาพก่อนติดตั้ง (Before)' : 'Before Installation (Before)', url: door.beforeImage },
              { id: 'after', title: lang === 'th' ? 'ภาพหลังติดตั้ง (After)' : 'After Installation (After)', url: door.afterImage }
            ];
            return (
              <div key={`pdf-door-${door.id}`} className="a4-page bg-white relative flex flex-col mx-auto shadow-md pb-10" style={{ width: '210mm', minHeight: '297mm', height: 'auto', padding: '15mm 20mm', boxSizing: 'border-box' }}>
                <div className="border-l-4 border-[#C10016] pl-4 mb-4">
                  <h2 className="text-lg font-bold text-[#1A1A1B]">{index + 1}. {door.name}</h2>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {doorImages.map((img) => (
                    <div key={img.id} className="border border-gray-200 rounded-lg p-2 bg-gray-50 flex flex-col justify-between">
                      <h3 className="text-center font-bold text-gray-500 bg-[#F8F9FA] py-1 mb-1 border border-gray-200 rounded-t text-xs uppercase truncate">{img.title}</h3>
                      <div className="h-[180px] border border-t-0 border-gray-200 flex items-center justify-center bg-white p-1 rounded-b">
                        {img.url ? <img src={img.url} alt={img.title} className="max-h-full max-w-full object-contain rounded" /> : <span className="text-gray-300 text-xs">[{lang === 'th' ? 'ไม่มีรูปภาพ' : 'No Photo'}]</span>}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-[#1A1A1B] mb-2 text-[14px]">{t('pdfEqDetailsTitle')}</h3>
                  <table className="w-full text-[12px] border-collapse">
                    <thead>
                      <tr className="bg-[#1A1A1B] text-white">
                        <th className="border border-[#1A1A1B] p-1.5 text-center w-10">{t('pdfEqTableHeaderNo')}</th>
                        <th className="border border-[#1A1A1B] p-1.5 text-left">{t('pdfEqTableHeaderName')}</th>
                        <th className="border border-[#1A1A1B] p-1.5 text-center w-12">{t('pdfEqTableHeaderQty')}</th>
                        <th className="border border-[#1A1A1B] p-1.5 text-left w-36">{t('pdfEqTableHeaderSn')}</th>
                        <th className="border border-[#1A1A1B] p-1.5 text-left">{t('pdfEqTableHeaderRemark')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {door.equipments.map((eq, i) => (
                        <tr key={eq.id} className="even:bg-[#F8F9FA]">
                          <td className="border border-gray-200 p-1.5 text-center text-gray-500">{i + 1}</td>
                          <td className="border border-gray-200 p-1.5 font-medium text-[#1A1A1B]">{eq.name || '-'}</td>
                          <td className="border border-gray-200 p-1.5 text-center">{eq.qty}</td>
                          <td className="border border-gray-200 p-1.5 font-mono text-[11px] text-gray-600">{eq.sn || '-'}</td>
                          <td className="border border-gray-200 p-1.5 text-gray-600 leading-snug">{eq.remark || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-8 pt-4 border-t border-gray-200 text-center text-[11px] text-gray-400">
                  <span className="font-bold text-[#1A1A1B]">{companyName}</span> <br />
                  {companyAddress}
                </div>
              </div>
            );
          })}

          {/* LAST PAGE - Signatures */}
          <div className="a4-page bg-white relative flex flex-col mx-auto shadow-md" style={{ width: '210mm', minHeight: '297mm', height: 'auto', padding: '15mm 20mm', boxSizing: 'border-box' }}>
            <h1 className="text-xl font-bold text-center mb-6 border-b-2 border-[#1A1A1B] pb-3 inline-block mx-auto text-[#1A1A1B]">{t('pdfSignTitle')}</h1>
            
            <div className="bg-[#F8F9FA] p-6 rounded border border-gray-200 mb-10 mx-6">
              {lang === 'th' ? (
                <>
                  <p className="text-[15px] mb-3 text-center text-[#1A1A1B] leading-relaxed">
                    ข้าพเจ้า <span className="underline decoration-dotted underline-offset-4 font-bold px-2">{signatures.clientName || '...........................................'}</span> ในนามของ <strong className="font-bold">{projectData.clientName}</strong>
                  </p>
                  <p className="text-center text-[13px] text-gray-600 leading-relaxed">
                    ขอรับรองว่าได้รับการส่งมอบงานติดตั้ง และอุปกรณ์ทั้งหมดตามที่ระบุไว้ในเอกสารฉบับนี้<br />
                    พร้อมทั้งได้รับการอธิบายวิธีการใช้งานเบื้องต้นเป็นที่เรียบร้อยแล้ว
                  </p>
                </>
              ) : (
                <>
                  <p className="text-[15px] mb-3 text-center text-[#1A1A1B] leading-relaxed">
                    I, <span className="underline decoration-dotted underline-offset-4 font-bold px-2">{signatures.clientName || '...........................................'}</span> on behalf of <strong className="font-bold">{projectData.clientName}</strong>
                  </p>
                  <p className="text-center text-[13px] text-gray-600 leading-relaxed">
                    hereby certify that I have received all the installation work and equipment specified in this document,<br />
                    and have received the basic operations explanation.
                  </p>
                </>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-12 mt-8 px-10">
              <div className="text-center">
                <p className="font-bold text-gray-600 mb-2 uppercase text-[12px]">{t('pdfSignDelivererLabel')}</p>
                <div className="h-20 flex items-end justify-center border-b border-gray-300 pb-2 mb-2 relative">
                  {signatures.tech && <img src={signatures.tech} alt="Tech Sig" className="absolute bottom-1 max-h-[70px] max-w-full object-contain" />}
                </div>
                <p className="font-bold text-[#1A1A1B] text-[13px]">( {projectData.techName} )</p>
                <p className="text-[11px] text-gray-500 mt-1">{t('pdfSignTechTitle')}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">{t('pdfSignDatePrefix')} {formatDate(projectData.endDate)}</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-[#C10016] mb-2 uppercase text-[12px]">{t('pdfSignRecipientLabel')}</p>
                <div className="h-20 flex items-end justify-center border-b border-gray-300 pb-2 mb-2 relative">
                  {signatures.client && <img src={signatures.client} alt="Client Sig" className="absolute bottom-1 max-h-[70px] max-w-full object-contain" />}
                </div>
                <p className="font-bold text-[#1A1A1B] text-[13px]">( {signatures.clientName || '...........................................'} )</p>
                <p className="text-[11px] text-gray-500 mt-1">{t('pdfSignClientTitle')}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">{t('pdfSignDatePrefix')} {formatDate(projectData.endDate)}</p>
              </div>
            </div>
            <div className="mt-auto text-center text-[10px] text-gray-400 border-t border-gray-200 pt-3 tracking-wide select-none">
              {t('pdfFooterSystem')} • TigerSoft (TGX)
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Step4_Preview;
