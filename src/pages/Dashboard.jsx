import React, { useState, useEffect } from 'react';
import { formatThaiDateRange } from '../utils/dateUtils';
import { loadSettings } from '../components/SettingsModal';
import { dbGetItem } from '../utils/db';

const DetailModal = ({ record, onClose, lang, t }) => {
  if (!record) return null;
  const { projectData, doors, savedAt, synced } = record;

  const formatDateTime = (isoStr) => {
    if (!isoStr) return '';
    const d = new Date(isoStr);
    if (lang === 'th') {
      const date = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear() + 543}`;
      const time = `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')} น.`;
      return `${date} ${time}`;
    }
    return d.toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const formatDateRange = (startStr, endStr) => {
    if (lang === 'th') {
      return formatThaiDateRange(startStr, endStr);
    }
    if (!startStr) return '';
    const start = new Date(startStr).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });
    if (!endStr || startStr === endStr) return start;
    const end = new Date(endStr).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });
    return `${start} - ${end}`;
  };

  return (
    <div className="fixed inset-0 bg-[#1A1A1B]/60 z-[200] flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-gray-100 overflow-hidden">
        <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-[#3A3A3A] font-bold text-lg">{t('detailModalTitle')}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900 text-2xl leading-none">&times;</button>
        </div>
        <div className="p-6 space-y-3 max-h-[70vh] overflow-y-auto">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${synced ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
              {synced ? t('detailModalSourceCloud') : t('detailModalSourceLocal')}
            </span>
            <span className="text-xs text-gray-400">{formatDateTime(savedAt)}</span>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{t('projectName')}</span>
              <span className="font-semibold text-right text-gray-800">{projectData?.projectName || '-'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{t('workOrderNo')}</span>
              <span className="font-semibold text-gray-800">{projectData?.orderNo || '-'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{t('clientName')}</span>
              <span className="font-semibold text-right text-gray-800">{projectData?.clientName || '-'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{t('techSignTitle').replace(' (ช่างเทคนิค)', '')}</span>
              <span className="font-semibold text-right text-gray-800">{projectData?.techName || '-'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{t('startDate')}</span>
              <span className="font-semibold text-gray-800">{formatDateRange(projectData?.date, projectData?.endDate)}</span>
            </div>
          </div>

          <div>
            <p className="text-sm font-bold text-gray-700 mb-2">{t('doorsCount')} ({doors?.length || 0})</p>
            <div className="space-y-2">
              {(doors || []).map((door, i) => (
                <div key={door.id || i} className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm font-bold text-gray-800">{i + 1}. {door.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{door.equipments?.length || 0} {t('eqTableHeaderName')}</p>
                  {(door.equipments || []).map((eq, j) => (
                    <p key={eq.id || j} className="text-xs text-gray-600 ml-3 mt-0.5 font-medium">• {eq.name}{eq.sn ? ` (S/N: ${eq.sn})` : ''}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full bg-[#2563EB] text-white py-2.5 rounded-full font-bold hover:bg-[#1d4ed8] transition-all text-sm shadow-sm"
          >
            {t('detailModalCloseBtn')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard({ onBack, lang, t }) {
  const [localHistory, setLocalHistory] = useState([]);
  const [cloudHistory, setCloudHistory] = useState([]);
  const [cloudLoading, setCloudLoading] = useState(false);
  const [cloudError, setCloudError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);

  const formatDateTime = (isoStr) => {
    if (!isoStr) return '';
    const d = new Date(isoStr);
    if (lang === 'th') {
      const date = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear() + 543}`;
      const time = `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')} น.`;
      return `${date} ${time}`;
    }
    return d.toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const formatDateRange = (startStr, endStr) => {
    if (lang === 'th') {
      return formatThaiDateRange(startStr, endStr);
    }
    if (!startStr) return '';
    const start = new Date(startStr).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });
    if (!endStr || startStr === endStr) return start;
    const end = new Date(endStr).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });
    return `${start} - ${end}`;
  };

  useEffect(() => {
    const loadLocalHistory = async () => {
      const history = await dbGetItem('handoverHistory');
      if (history) {
        setLocalHistory(history);
      }
    };
    loadLocalHistory();

    const settings = loadSettings();
    if (settings.appsScriptUrl) {
      setCloudLoading(true);
      fetch(`${settings.appsScriptUrl}?action=getHistory`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setCloudHistory(data);
          setCloudLoading(false);
        })
        .catch(() => {
          setCloudError(t('cloudLoadFailed'));
          setCloudLoading(false);
        });
    }
  }, [t]);

  const allRecords = [
    ...localHistory.map(r => ({ ...r, source: 'local' })),
    ...cloudHistory.map(r => ({ ...r, source: 'cloud', synced: true })),
  ].sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));

  const filtered = searchQuery.trim()
    ? allRecords.filter(r => {
        const q = searchQuery.toLowerCase();
        const pd = r.projectData || {};
        return (
          (pd.clientName || '').toLowerCase().includes(q) ||
          (pd.projectName || '').toLowerCase().includes(q) ||
          (pd.orderNo || '').toLowerCase().includes(q)
        );
      })
    : allRecords;

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans font-body pb-10">
      <header className="bg-white border-b border-[#E8E8E8] shadow-[1px_1px_8px_rgba(191,191,191,0.15)] p-4 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs text-[#C10016] font-bold border border-red-100 hover:bg-red-50 bg-white px-3 py-1.5 rounded-full transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
            {t('back')}
          </button>
          <h1 className="font-bold text-lg flex items-center gap-1.5 text-[#3A3A3A] select-none">
            <svg className="w-5 h-5 text-[#C10016]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2Z" /></svg>
            {t('dashboardTitle').replace('📋 ', '')}
          </h1>
          <div className="w-16" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto mt-6 px-4">
        <div className="mb-4">
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none text-sm shadow-sm transition-all"
          />
        </div>

        {cloudLoading && (
          <div className="text-center text-sm text-gray-400 py-3">
            <span className="animate-pulse">{t('cloudLoadingMsg')}</span>
          </div>
        )}
        {cloudError && (
          <div className="text-center text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg py-2.5 px-3 mb-3 font-semibold">
            {cloudError}
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400 select-none animate-fadeIn">
            <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" /></svg>
            <p className="text-lg font-bold">{t('noHistoryTitle')}</p>
            <p className="text-sm mt-1">{t('noHistoryDesc')}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((record) => {
              const pd = record.projectData || {};
              const doorCount = record.doors?.length || 0;
              return (
                <button
                  key={record.id}
                  onClick={() => setSelectedRecord(record)}
                  className="w-full text-left bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:border-[#C10016] hover:shadow-md transition-all animate-fadeIn"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-gray-900 text-sm truncate">{pd.projectName || 'Untitled Project'}</p>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${record.synced ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                          {record.synced ? t('detailModalSourceCloud') : t('detailModalSourceLocal')}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{pd.orderNo || '-'}</p>
                      <p className="text-sm text-gray-700 mt-1 font-semibold">{pd.clientName || '-'}</p>
                      <div className="flex items-center gap-3 mt-2.5 text-xs text-gray-400 font-medium">
                        <span className="flex items-center gap-0.5">
                          <svg className="w-3.5 h-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" /></svg>
                          {formatDateRange(pd.date, pd.endDate)}
                        </span>
                        <span className="flex items-center gap-0.5">
                          <svg className="w-3.5 h-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0H9m12 0-3-3m3 3-3 3" /></svg>
                          {doorCount} {t('doorsCount')}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[10px] text-gray-400">{formatDateTime(record.savedAt)}</p>
                      <p className="text-[#C10016] text-xs mt-2 font-bold flex items-center gap-0.5">{t('detailViewLink')}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </main>

      {selectedRecord && (
        <DetailModal record={selectedRecord} onClose={() => setSelectedRecord(null)} lang={lang} t={t} />
      )}
    </div>
  );
}
