import React from 'react';
import DoorCard from '../components/DoorCard';

const Step2_Equipment = ({
  doors, setDoors, updateEquipment, addEquipment, removeEquipment, removeDoor,
  handleImageUpload, removeImage, addImageSlot, removeImageSlot, updateImageTitle,
  addDoor, onBack, onNext, errors, lang, t
}) => {
  return (
    <div className="space-y-6 animate-fadeIn pb-10 no-print">
      <div className="flex justify-between items-center border-b border-gray-200 pb-2 select-none">
        <h2 className="text-xl font-bold text-[#1A1A1B]">{t('step2Title')}</h2>
        <span className="text-xs bg-gray-200 text-[#1A1A1B] font-bold px-3 py-1.5 rounded-full">{t('total')} {doors.length} {t('doorsCount')}</span>
      </div>

      {doors.map((door, idx) => (
        <DoorCard
          key={door.id}
          door={door}
          idx={idx}
          doors={doors}
          setDoors={setDoors}
          updateEquipment={updateEquipment}
          addEquipment={addEquipment}
          removeEquipment={removeEquipment}
          removeDoor={removeDoor}
          handleImageUpload={handleImageUpload}
          removeImage={removeImage}
          addImageSlot={addImageSlot}
          removeImageSlot={removeImageSlot}
          updateImageTitle={updateImageTitle}
          errors={errors}
          t={t}
        />
      ))}

      <button
        onClick={addDoor}
        className="w-full py-3.5 border border-dashed border-[#C10016] text-[#C10016] bg-red-50/10 hover:bg-red-50/30 font-bold rounded-full transition-all text-sm flex items-center justify-center gap-1"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
        {t('addNewDoorBtn').replace('+ ', '')}
      </button>

      <div className="flex gap-4 pt-4 border-t border-gray-200">
        <button onClick={onBack} className="w-1/3 bg-white border border-gray-200 text-gray-700 p-3 rounded-full font-bold hover:bg-gray-50 transition-all text-sm">{t('back')}</button>
        <button onClick={onNext} className="w-2/3 bg-[#2563EB] text-white p-3 rounded-full font-bold hover:bg-[#1d4ed8] transition-all text-sm">{t('nextStep2')}</button>
      </div>
    </div>
  );
};

export default Step2_Equipment;
