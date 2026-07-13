import React from 'react';

const ConfirmDialog = ({ confirmDialog, setConfirmDialog }) => {
  if (!confirmDialog.isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#1A1A1B] bg-opacity-60 z-[110] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm border border-gray-100 animate-fadeIn">
        <h3 className="text-xl font-bold text-[#1A1A1B] mb-2">{confirmDialog.title}</h3>
        <p className="text-gray-600 mb-6 text-sm leading-relaxed">{confirmDialog.message}</p>
        <div className="flex gap-3">
          {confirmDialog.type === 'confirm' && (
            <button
              onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
              className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg font-bold"
            >
              ยกเลิก
            </button>
          )}
          <button
            onClick={() => {
              if (confirmDialog.onConfirm) confirmDialog.onConfirm();
              if (confirmDialog.type === 'alert') setConfirmDialog({ ...confirmDialog, isOpen: false });
            }}
            className={`flex-1 py-2.5 rounded-lg font-bold text-white shadow-sm ${confirmDialog.type === 'confirm' ? 'bg-red-600' : 'bg-[#007BFF]'}`}
          >
            {confirmDialog.type === 'confirm' ? 'ยืนยัน' : 'ตกลง'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
