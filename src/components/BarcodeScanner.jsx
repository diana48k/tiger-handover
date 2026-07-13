import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const BarcodeScanner = ({ onScan, onClose }) => {
  const scannerRef = useRef(null);
  const readerId = 'barcode-reader';

  useEffect(() => {
    const html5QrCode = new Html5Qrcode(readerId);
    scannerRef.current = html5QrCode;

    html5QrCode.start(
      { facingMode: 'environment' },
      { fps: 10, qrbox: { width: 250, height: 250 } },
      (decodedText) => {
        onScan(decodedText);
        stopScanner();
      },
      () => {}
    ).catch((err) => {
      console.error('Camera start error:', err);
    });

    return () => {
      stopScanner();
    };
  }, []);

  const stopScanner = () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      scannerRef.current.stop().catch(() => {});
    }
  };

  const handleClose = () => {
    stopScanner();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-[200] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm bg-[#1A1A1B] rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <h3 className="text-white font-bold text-lg">สแกนบาร์โค้ด / QR Code</h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <div className="p-4">
          <div id={readerId} className="w-full rounded-lg overflow-hidden"></div>
          <p className="text-gray-400 text-sm text-center mt-4">
            จ่อบาร์โค้ดหรือ QR Code ให้ตรงกับกล้อง
          </p>
        </div>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleClose}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-bold transition-colors"
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  );
};

export default BarcodeScanner;
