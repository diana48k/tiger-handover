import { useState, useEffect } from 'react';

export default function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="bg-yellow-500 text-yellow-900 text-center text-sm py-2 px-4 font-medium">
      📡 ไม่มีการเชื่อมต่ออินเทอร์เน็ต — สามารถกรอกข้อมูลและบันทึกร่างได้ตามปกติ
    </div>
  );
}
