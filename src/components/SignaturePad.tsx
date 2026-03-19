import React, { useRef, useEffect, useState } from 'react';

interface SignaturePadProps {
  initialData?: string;
  onSave: (data: string) => void;
  language: string;
}

export default function SignaturePad({ initialData, onSave, language }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(!!initialData);
  const [savedMsgVisible, setSavedMsgVisible] = useState(false);

  const isFirstRun = useRef(true);
  const lastSavedData = useRef(initialData);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      const width = canvas.offsetWidth;
      const height = 150;
      
      if (width === 0) return;

      // Capture current state if not first run
      let tempCanvas: HTMLCanvasElement | null = null;
      if (!isFirstRun.current) {
        tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        tempCanvas.getContext('2d')?.drawImage(canvas, 0, 0);
      }

      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.scale(ratio, ratio);

      ctx.lineWidth = 2.0;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#004494';

      if (tempCanvas && tempCanvas.width > 0) {
        ctx.drawImage(tempCanvas, 0, 0, width, height);
      } else if (initialData) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, width, height);
        };
        img.src = initialData;
      }
      isFirstRun.current = false;
    };

    updateCanvasSize();
    
    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
    });
    
    resizeObserver.observe(canvas);
    return () => resizeObserver.disconnect();
  }, [initialData]);

  const getPos = (e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    setHasSignature(true);
    const pos = getPos(e.nativeEvent);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const pos = getPos(e.nativeEvent);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      const canvas = canvasRef.current;
      if (canvas) {
        const dataUrl = canvas.toDataURL('image/png');
        lastSavedData.current = dataUrl;
        onSave(dataUrl);
        setSavedMsgVisible(true);
        setTimeout(() => setSavedMsgVisible(false), 1500);
      }
    }
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setHasSignature(false);
    lastSavedData.current = '';
    onSave('');
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (canvas && hasSignature) {
      const dataUrl = canvas.toDataURL('image/png');
      lastSavedData.current = dataUrl;
      onSave(dataUrl);
      setSavedMsgVisible(true);
      setTimeout(() => setSavedMsgVisible(false), 2000);
    } else if (!hasSignature) {
      alert(language === 'de' ? 'Bitte zuerst unterschreiben.' : 'Please sign first.');
    }
  };

  const t = {
    clear: { de: 'Löschen', uk: 'Очистити', ru: 'Очистить', en: 'Clear' },
    save: { de: '💾 Unterschrift speichern', uk: '💾 Зберегти підпис', ru: '💾 Сохранить подпись', en: '💾 Save signature' },
    saved: { de: 'Gespeichert!', uk: 'Збережено!', ru: 'Сохранено!', en: 'Saved!' },
    hint: { de: 'Bitte unterschreibe im Feld oben flüssig mit dem Finger oder der Maus und klicke auf Speichern.', uk: 'Будь ласка, розпишися в полі вище пальцем або мишкою та натисни Зберегти.', ru: 'Пожалуйста, распишись в поле выше пальцем или мышкой и нажми Сохранить.', en: 'Please sign smoothly in the field above with your finger or mouse and click Save.' }
  };

  return (
    <div className="mt-4">
      <div className="relative border-2 border-dashed border-danger rounded-lg bg-white overflow-hidden touch-none">
        <canvas
          ref={canvasRef}
          className="w-full h-[150px] cursor-crosshair touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        <button
          type="button"
          onClick={handleClear}
          className="absolute top-2 right-2 bg-gray-100 border border-gray-300 px-2 py-1 rounded text-xs font-bold cursor-pointer z-10"
        >
          {t.clear[language as keyof typeof t.clear]}
        </button>
      </div>
      <div className="text-center mt-3">
        <button
          type="button"
          onClick={handleSave}
          className="bg-success text-white border-none px-4 py-2 rounded font-bold cursor-pointer shadow-sm"
        >
          {t.save[language as keyof typeof t.save]}
        </button>
        {savedMsgVisible && (
          <span className="text-success text-xs ml-2 font-bold">
            {t.saved[language as keyof typeof t.saved]}
          </span>
        )}
      </div>
      <p className="text-xs text-gray-500 mt-2 text-center">
        {t.hint[language as keyof typeof t.hint]}
      </p>
    </div>
  );
}
