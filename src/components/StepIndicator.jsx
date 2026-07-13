import React from 'react';

const StepIndicator = ({ step, lang }) => {
  return (
    <div className="flex items-center mb-8 text-sm font-bold tracking-wide">
      <div className={`flex-1 text-center py-2.5 border-b-2 transition-colors ${step >= 1 ? 'border-[#C10016] text-[#1A1A1B]' : 'border-gray-200 text-gray-400'}`}>
        1. {lang === 'th' ? 'ข้อมูล' : 'Info'}
      </div>
      <div className={`flex-1 text-center py-2.5 border-b-2 transition-colors ${step >= 2 ? 'border-[#C10016] text-[#1A1A1B]' : 'border-gray-200 text-gray-400'}`}>
        2. {lang === 'th' ? 'อุปกรณ์' : 'Equipment'}
      </div>
      <div className={`flex-1 text-center py-2.5 border-b-2 transition-colors ${step >= 3 ? 'border-[#C10016] text-[#1A1A1B]' : 'border-gray-200 text-gray-400'}`}>
        3. {lang === 'th' ? 'ลายเซ็น' : 'Signatures'}
      </div>
    </div>
  );
};

export default StepIndicator;
