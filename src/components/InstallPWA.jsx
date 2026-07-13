import { useState, useEffect } from 'react';

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  if (!showInstall) return null;

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      setShowInstall(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-[#1A1A1B] text-white rounded-xl p-4 shadow-2xl z-50 flex items-center justify-between">
      <div>
        <p className="font-bold text-sm">📲 ติดตั้งแอปบนมือถือ</p>
        <p className="text-xs text-gray-400 mt-0.5">ใช้งานได้แม้ไม่มีอินเทอร์เน็ต</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setShowInstall(false)}
          className="text-gray-400 text-xs px-3 py-2 rounded-lg"
        >
          ไม่ตอนนี้
        </button>
        <button
          onClick={handleInstall}
          className="bg-[#007BFF] text-white text-xs px-4 py-2 rounded-lg font-bold"
        >
          ติดตั้ง
        </button>
      </div>
    </div>
  );
}
