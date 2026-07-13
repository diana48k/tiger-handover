import React from 'react';
import SignaturePad from '../components/SignaturePad';

const Step3_Signature = ({ projectData, setProjectData, signatures, setSignatures, onBack, onNext, errors, lang, t }) => {
  return (
    <div className="space-y-6 animate-fadeIn no-print">
      <h2 className="text-xl font-bold text-[#1A1A1B] border-b border-gray-200 pb-2">{t('step3Title')}</h2>

      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
        <h3 className="font-bold text-gray-500 mb-3 text-sm">{t('techSignTitle')}</h3>
        <SignaturePad
          penColor="#1A1A1B"
          initialDataUrl={signatures.tech}
          onEnd={(url) => setSignatures(s => ({ ...s, tech: url }))}
          t={t}
        />
        {errors.techSignature && (
          <p className="text-red-500 text-xs mt-2">{t(errors.techSignature)}</p>
        )}
        <input
          type="text"
          value={projectData.techName}
          onChange={e => setProjectData({ ...projectData, techName: e.target.value })}
          className="mt-3 w-full p-2 border border-gray-200 rounded text-center bg-[#F8F9FA] text-[#1A1A1B] font-medium outline-none"
        />
      </div>

      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-gray-500 text-sm">{t('clientSignTitle')}</h3>
          <span className="text-xs text-gray-400 font-medium">{t('clientSignOptional')}</span>
        </div>
        <SignaturePad
          penColor="#1A1A1B"
          initialDataUrl={signatures.client}
          onEnd={(url) => setSignatures(s => ({ ...s, client: url }))}
          t={t}
        />
        <input
          type="text"
          value={signatures.clientName}
          onChange={e => setSignatures({ ...signatures, clientName: e.target.value })}
          placeholder={t('clientNamePlaceholder')}
          className="mt-3 w-full p-2 border-b-2 border-gray-300 rounded-none text-center focus:border-[#2563EB] outline-none transition-all text-sm"
        />
      </div>

      <div className="flex gap-4">
        <button onClick={onBack} className="w-1/3 bg-white border border-gray-200 text-gray-700 p-3 rounded-full font-bold hover:bg-gray-50 transition-all text-sm">{t('back')}</button>
        <button onClick={onNext} className="w-2/3 bg-[#2563EB] text-white p-3 rounded-full font-bold hover:bg-[#1d4ed8] transition-all text-sm">{t('nextStep3')}</button>
      </div>
    </div>
  );
};

export default Step3_Signature;
