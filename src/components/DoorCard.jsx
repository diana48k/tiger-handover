import React, { useState } from 'react';
import BarcodeScanner from './BarcodeScanner';

const DoorCard = ({
  door, idx, doors, setDoors, updateEquipment, addEquipment, removeEquipment, removeDoor,
  handleImageUpload, removeImage, addImageSlot, removeImageSlot, updateImageTitle, errors, t
}) => {
  const [showScanner, setShowScanner] = useState(false);
  const [scanTarget, setScanTarget] = useState(null);

  const handleScanClick = (doorId, eqId) => {
    setScanTarget({ doorId, eqId });
    setShowScanner(true);
  };

  const handleScanResult = (result) => {
    if (scanTarget) {
      updateEquipment(scanTarget.doorId, scanTarget.eqId, 'sn', result);
    }
    setShowScanner(false);
    setScanTarget(null);
  };

  const handleScannerClose = () => {
    setShowScanner(false);
    setScanTarget(null);
  };

  const doorErrors = errors && errors[`door_${door.id}`] ? errors[`door_${door.id}`] : {};

  return (
    <>
      {showScanner && (
        <BarcodeScanner
          onScan={handleScanResult}
          onClose={handleScannerClose}
        />
      )}

      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 relative animate-fadeIn">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center w-full md:w-2/3">
            <span className="font-bold text-[#C10016] mr-3 text-lg">{idx + 1}.</span>
            <div className="w-full">
              <input
                type="text"
                value={door.name}
                onChange={e => setDoors(doors.map(d => d.id === door.id ? { ...d, name: e.target.value } : d))}
                className={`text-lg font-bold text-[#1A1A1B] border-b focus:border-[#2563EB] outline-none px-2 py-1 w-full transition-all ${doorErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                placeholder={t('doorNamePlaceholder')}
              />
              {doorErrors.name && <p className="text-red-500 text-xs mt-1">{doorErrors.name}</p>}
            </div>
          </div>
          {doors.length > 1 && (
            <button
              onClick={() => removeDoor(door.id)}
              className="text-[#C10016] bg-red-50 border border-red-100 hover:bg-red-100/50 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
              {t('deleteBtn')}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-3">
          {(door.images || []).map((img) => {
            const isDefault = img.id === 'before' || img.id === 'after';
            return (
              <div key={img.id} className="border border-dashed border-gray-300 rounded-lg p-3 text-center relative min-h-[14rem] flex flex-col items-center justify-between bg-[#F8F9FA] hover:bg-gray-100 overflow-hidden group transition-all">
                <input
                  type="text"
                  value={img.title}
                  onChange={(e) => updateImageTitle(door.id, img.id, e.target.value)}
                  className="w-full text-center text-xs font-bold text-gray-700 bg-transparent border-b border-dashed border-gray-200 focus:border-[#2563EB] outline-none pb-1 mb-2"
                  placeholder={t('photoDescriptionPlaceholder')}
                />
                
                <div className="relative w-full h-32 flex flex-col items-center justify-center">
                  {img.url ? (
                    <>
                      <img src={img.url} alt={img.title} className="h-full object-contain rounded" />
                      <button
                        onClick={(e) => removeImage(door.id, img.id, e)}
                        className="absolute top-1 right-1 bg-white text-[#C10016] border border-red-100 px-2 py-0.5 rounded shadow-md hover:bg-red-50 z-20 text-[10px] font-bold flex items-center gap-0.5"
                      >
                        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                        {t('deletePhotoBtn')}
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="text-gray-400 text-xs flex flex-col items-center select-none">
                        <svg className="w-6 h-6 text-gray-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" /></svg>
                        {t('tapToUpload')}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(door.id, img.id, e)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                    </>
                  )}
                </div>

                {!isDefault && (
                  <button
                    onClick={(e) => removeImageSlot(door.id, img.id, e)}
                    className="mt-2 text-red-500 hover:text-red-700 text-xs font-semibold flex items-center gap-0.5 transition-all"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
                    {t('deleteSlotBtn')}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-end mb-5">
          <button
            onClick={() => addImageSlot(door.id)}
            className="text-xs text-[#C10016] border border-red-200 hover:bg-red-50/50 px-3.5 py-1.5 rounded-full font-bold flex items-center gap-1 transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9" /></svg>
            {t('addPhotoBtn').replace('📸 ', '').replace('+', '')}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse min-w-[600px]">
            <thead className="bg-[#F8F9FA] text-gray-500 border-b border-gray-200 select-none">
              <tr>
                <th className="p-2 font-bold text-gray-600">{t('eqTableHeaderName')}</th>
                <th className="p-2 w-16 text-center font-bold text-gray-600">{t('eqTableHeaderQty')}</th>
                <th className="p-2 w-48 font-bold text-gray-600">{t('eqTableHeaderSn')}</th>
                <th className="p-2 font-bold text-gray-600">{t('eqTableHeaderRemark')}</th>
                <th className="p-2 w-12 text-center font-bold text-gray-600">{t('eqTableHeaderDelete')}</th>
              </tr>
            </thead>
            <tbody>
              {door.equipments.map((eq) => {
                const eqError = doorErrors[`eq_${eq.id}`];
                return (
                  <tr key={eq.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-1.5">
                      <input
                        type="text"
                        value={eq.name}
                        onChange={e => updateEquipment(door.id, eq.id, 'name', e.target.value)}
                        className={`w-full p-2 bg-transparent border rounded text-sm outline-none focus:border-[#2563EB] transition-all ${eqError ? 'border-red-400' : 'border-gray-200'}`}
                      />
                      {eqError && <p className="text-red-500 text-xs mt-0.5">{eqError}</p>}
                    </td>
                    <td className="p-1.5">
                      <input type="number" value={eq.qty} onChange={e => updateEquipment(door.id, eq.id, 'qty', e.target.value)} className="w-full p-2 bg-transparent border border-gray-200 rounded text-sm text-center outline-none focus:border-[#2563EB] transition-all" />
                    </td>
                    <td className="p-1.5">
                      <div className="flex gap-1">
                        <input type="text" value={eq.sn} onChange={e => updateEquipment(door.id, eq.id, 'sn', e.target.value)} className="w-full p-2 bg-transparent border border-gray-200 rounded text-sm outline-none focus:border-[#2563EB] transition-all" />
                        <button
                          onClick={() => handleScanClick(door.id, eq.id)}
                          className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white p-2.5 rounded transition-all flex items-center justify-center shrink-0"
                          title={t('scanBarcodeTitle')}
                        >
                          <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" /></svg>
                        </button>
                      </div>
                    </td>
                    <td className="p-1.5">
                      <input type="text" value={eq.remark} onChange={e => updateEquipment(door.id, eq.id, 'remark', e.target.value)} className="w-full p-2 bg-transparent border border-gray-200 rounded text-sm outline-none focus:border-[#2563EB] transition-all" />
                    </td>
                    <td className="p-1.5 text-center">
                      <button onClick={() => removeEquipment(door.id, eq.id)} className="text-red-500 bg-red-50 hover:bg-red-100 p-2 rounded transition-all inline-flex items-center justify-center">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button onClick={() => addEquipment(door.id)} className="text-[#2563EB] bg-blue-50/70 px-4 py-1.5 rounded-full text-xs font-bold mt-3 hover:bg-blue-100 flex items-center gap-1 transition-all">{t('addEqBtn')}</button>
        </div>
      </div>
    </>
  );
};

export default DoorCard;
