import React from 'react';

const LoadingOverlay = ({ aiLoading }) => {
  if (!aiLoading.state) return null;

  return (
    <div className="fixed inset-0 bg-[#1A1A1B] bg-opacity-80 z-[100] flex flex-col items-center justify-center backdrop-blur-sm">
      <div className="w-12 h-12 border-4 border-gray-500 border-t-[#007BFF] rounded-full animate-spin mb-5"></div>
      <div className="text-white text-lg font-bold tracking-wide">{aiLoading.message}</div>
    </div>
  );
};

export default LoadingOverlay;
