import React, { useState, useRef, useEffect } from 'react';

const SignaturePad = ({ penColor = "#1A1A1B", onClear, onEnd, initialDataUrl, t }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = 120;
      const ctx = canvas.getContext('2d');
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 2.5;

      if (initialDataUrl) {
        const img = new Image();
        img.onload = () => { ctx.drawImage(img, 0, 0); };
        img.src = initialDataUrl;
      }
    }
  }, [initialDataUrl]);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    if (e.touches && e.touches.length > 0) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.strokeStyle = penColor;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing && onEnd) onEnd(canvasRef.current.toDataURL('image/png'));
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (onClear) onClear();
    if (onEnd) onEnd(null);
  };

  return (
    <div className="relative w-full border border-gray-300 rounded-lg bg-white overflow-hidden touch-none no-print shadow-sm">
      <canvas
        ref={canvasRef}
        className="w-full cursor-crosshair touch-none bg-transparent"
        onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing}
        onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing}
      />
      <button onClick={clearCanvas} type="button" className="absolute top-2 right-2 bg-gray-100 text-gray-500 hover:text-red-500 text-xs px-2.5 py-1 rounded shadow-sm transition-colors z-20">
        {t ? t('clearSignatureBtn') : 'ล้างลายเซ็น'}
      </button>
    </div>
  );
};

export default SignaturePad;
