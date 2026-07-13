import React, { useState } from 'react';

const DEFAULT_SETTINGS = {
  companyName: 'Tiger Soft 1998',
  companyAddress: '18 CTC Bldg Soi Ram-Intra 51 Bangkok 10230',
  defaultTechName: 'Kritsorn S.',
  defaultContractor: 'Tiger Soft 1998',
  appsScriptUrl: 'https://script.google.com/macros/s/AKfycbzJVCXGiGiPPMKekdLQznPEavtLkeBLfkmQSllhyJY6PMV8blfaqxOB-1Pjy5enOFEb/exec',
  emailJsServiceId: '',
  emailJsTemplateId: '',
  emailJsPublicKey: '',
  recipientEmail: '',
};

export const loadSettings = () => {
  try {
    const saved = localStorage.getItem('handoverSettings');
    if (saved) return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
  } catch (e) {}
  return DEFAULT_SETTINGS;
};

const SettingsModal = ({ onClose }) => {
  const [settings, setSettings] = useState(loadSettings);

  const handleSave = () => {
    localStorage.setItem('handoverSettings', JSON.stringify(settings));
    onClose();
  };

  const handleReset = () => setSettings(DEFAULT_SETTINGS);

  const inp = "w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#007BFF] outline-none text-sm";
  const inpMono = inp + " font-mono";

  return (
    <div className="fixed inset-0 bg-[#1A1A1B] bg-opacity-70 z-[120] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-gray-100 overflow-hidden">
        <div className="bg-[#1A1A1B] px-6 py-4 flex items-center justify-between">
          <h2 className="text-white font-bold text-lg">settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Company Name</label>
            <input type="text" value={settings.companyName}
              onChange={e => setSettings({ ...settings, companyName: e.target.value })} className={inp} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Company Address</label>
            <textarea value={settings.companyAddress}
              onChange={e => setSettings({ ...settings, companyAddress: e.target.value })}
              rows={2} className={inp + " resize-none"} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Default Tech Name</label>
            <input type="text" value={settings.defaultTechName}
              onChange={e => setSettings({ ...settings, defaultTechName: e.target.value })} className={inp} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Default Contractor</label>
            <input type="text" value={settings.defaultContractor}
              onChange={e => setSettings({ ...settings, defaultContractor: e.target.value })} className={inp} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Google Apps Script URL</label>
            <input type="text" value={settings.appsScriptUrl}
              onChange={e => setSettings({ ...settings, appsScriptUrl: e.target.value })}
              className={inpMono} placeholder="https://script.google.com/macros/s/..." />
            <p className="text-xs text-gray-400 mt-1">URL for saving to Google Sheets</p>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">EmailJS Settings</p>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">EmailJS Service ID</label>
                <input type="text" value={settings.emailJsServiceId}
                  onChange={e => setSettings({ ...settings, emailJsServiceId: e.target.value })}
                  className={inpMono} placeholder="service_xxxxxxx" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">EmailJS Template ID</label>
                <input type="text" value={settings.emailJsTemplateId}
                  onChange={e => setSettings({ ...settings, emailJsTemplateId: e.target.value })}
                  className={inpMono} placeholder="template_xxxxxxx" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">EmailJS Public Key</label>
                <input type="text" value={settings.emailJsPublicKey}
                  onChange={e => setSettings({ ...settings, emailJsPublicKey: e.target.value })}
                  className={inpMono} placeholder="xxxxxxxxxxxxxxxxxxxx" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Recipient Email</label>
                <input type="email" value={settings.recipientEmail}
                  onChange={e => setSettings({ ...settings, recipientEmail: e.target.value })}
                  className={inp} placeholder="example@email.com" />
              </div>
              <p className="text-xs text-gray-400">
                Sign up free at{' '}
                <a href="https://www.emailjs.com" target="_blank" rel="noopener noreferrer" className="text-[#007BFF] underline">emailjs.com</a>
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
          <button onClick={handleReset}
            className="bg-gray-100 text-gray-600 hover:bg-gray-200 px-4 py-2.5 rounded-lg font-medium text-sm">
            Reset
          </button>
          <button onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg font-bold">
            Cancel
          </button>
          <button onClick={handleSave}
            className="flex-1 bg-[#007BFF] text-white py-2.5 rounded-lg font-bold hover:bg-[#0056b3]">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
