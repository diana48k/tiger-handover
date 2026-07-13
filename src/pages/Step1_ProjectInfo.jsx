import React from 'react';

const Step1_ProjectInfo = ({ projectData, setProjectData, onNext, errors, t }) => {
  return (
    <div className="space-y-4 animate-fadeIn no-print">
      <h2 className="text-xl font-bold text-[#1A1A1B] border-b border-gray-200 pb-2">{t('step1Title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">{t('clientName')}</label>
          <input
            type="text"
            value={projectData.clientName}
            onChange={e => setProjectData({ ...projectData, clientName: e.target.value })}
            className={`w-full p-2.5 bg-white border rounded-lg focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all ${errors.clientName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.clientName && <p className="text-red-500 text-xs mt-1">{t(errors.clientName)}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">{t('workOrderNo')}</label>
          <input
            type="text"
            value={projectData.orderNo}
            onChange={e => setProjectData({ ...projectData, orderNo: e.target.value })}
            className={`w-full p-2.5 bg-white border rounded-lg focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all ${errors.orderNo ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.orderNo && <p className="text-red-500 text-xs mt-1">{t(errors.orderNo)}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-500 mb-1">{t('projectName')}</label>
          <input
            type="text"
            value={projectData.projectName}
            onChange={e => setProjectData({ ...projectData, projectName: e.target.value })}
            className={`w-full p-2.5 bg-white border rounded-lg focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all ${errors.projectName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.projectName && <p className="text-red-500 text-xs mt-1">{t(errors.projectName)}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">{t('startDate')}</label>
          <input
            type="date"
            value={projectData.date}
            onChange={e => setProjectData({ ...projectData, date: e.target.value })}
            className="w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">{t('endDate')}</label>
          <input
            type="date"
            value={projectData.endDate}
            onChange={e => setProjectData({ ...projectData, endDate: e.target.value })}
            className="w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all"
          />
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full bg-[#2563EB] text-white p-3.5 rounded-full font-bold hover:bg-[#1d4ed8] mt-8 shadow-sm transition-all text-sm"
      >
        {t('nextStep1')}
      </button>
    </div>
  );
};

export default Step1_ProjectInfo;
