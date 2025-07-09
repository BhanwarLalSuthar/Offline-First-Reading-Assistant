import React, { useRef, useEffect, useState } from 'react';
import { saveAnnotation, getAnnotation } from './annotationStorage';
import useNetworkStatus from '../../Connection_Status/ConnectionStatus';

const TOOL_DRAW = 'draw';
const TOOL_ERASE = 'erase';

export default function AnnotationLayer({ width = 800, height = 600, storageKey = 'annotation', isWhiteboard = false, imageSrc }) {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState(null);
  const [tool, setTool] = useState(TOOL_DRAW);
  const [annotationName, setAnnotationName] = useState('');
  const online = useNetworkStatus();

  useEffect(() => {
    if (online) {
      getAnnotation(storageKey).then((saved) => {
        if (saved && canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          ctx.clearRect(0, 0, width, height);
          const img = new window.Image();
          img.onload = () => ctx.drawImage(img, 0, 0);
          img.src = saved;
        } else if (canvasRef.current) {
          canvasRef.current.getContext('2d').clearRect(0, 0, width, height);
        }
      });
    }
  }, [storageKey, online, width, height]);


  useEffect(() => {
    if (!online) {
      saveDrawing();
    }

  }, [online]);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.getContext('2d').clearRect(0, 0, width, height);
    }
  }, [storageKey, width, height]);

  const saveDrawing = async () => {
    if (canvasRef.current) {
      const data = canvasRef.current.toDataURL();
      await saveAnnotation(storageKey, data, true);
    }
  };

  const handlePointerDown = (e) => {
    setDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    setLastPoint({
      x: (e.touches ? e.touches[0].clientX : e.clientX) - rect.left,
      y: (e.touches ? e.touches[0].clientY : e.clientY) - rect.top,
    });
  };

  const handlePointerMove = (e) => {
    if (!drawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    const ctx = canvasRef.current.getContext('2d');
    if (tool === TOOL_DRAW) {
      ctx.strokeStyle = 'rgba(255, 0, 0, 0.7)';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (tool === TOOL_ERASE) {
      ctx.clearRect(x - 8, y - 8, 40, 40);
    }
    setLastPoint({ x, y });
  };

  const handlePointerUp = () => {
    setDrawing(false);
    setLastPoint(null);
    saveDrawing();
  };

  const handleNewWhiteboard = () => {
    if (canvasRef.current) {
      canvasRef.current.getContext('2d').clearRect(0, 0, width, height);
    }
  };

  const handleDownload = () => {
    if (canvasRef.current) {
      if (imageSrc) {
        console.log(imageSrc)
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = width;
        tempCanvas.height = height;
        const tempCtx = tempCanvas.getContext('2d');
        const img = new window.Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          tempCtx.drawImage(img, 0, 0, width, height);
          tempCtx.drawImage(canvasRef.current, 0, 0);
          const link = document.createElement('a');
          link.download = (annotationName || 'annotation') + '.png';
          link.href = tempCanvas.toDataURL('image/png');
          link.click();
        };
        img.onerror = () => {
          // fallback: just annotation layer
          const link = document.createElement('a');
          link.download = (annotationName || 'annotation') + '.png';
          link.href = canvasRef.current.toDataURL('image/png');
          link.click();
        };
        img.src = imageSrc;
      } else {
        const link = document.createElement('a');
        link.download = (annotationName || 'annotation') + '.png';
        link.href = canvasRef.current.toDataURL('image/png');
        link.click();
      }
    }
  };

  return (
    <div style={{ position: 'absolute', left: 0, top: 0, width, height, zIndex: 10 }}>
      {/* Toolbar */}
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 20, background: '#fff', borderRadius: 4, padding: 8, boxShadow: '0 2px 8px #0002' }}>
        <button onClick={() => setTool(TOOL_DRAW)} style={{ fontWeight: tool === TOOL_DRAW ? 'bold' : 'normal' }}>Draw</button>
        <button onClick={() => setTool(TOOL_ERASE)} style={{ fontWeight: tool === TOOL_ERASE ? 'bold' : 'normal' }}>Erase</button>
        {isWhiteboard && <button onClick={handleNewWhiteboard}>New Whiteboard</button>}
        <input
          type="text"
          placeholder="Annotation Name"
          value={annotationName}
          onChange={e => setAnnotationName(e.target.value)}
          style={{ marginLeft: 8 }}
        />
        <button onClick={handleDownload} style={{ marginLeft: 8 }}>Download</button>
      </div>
 
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          pointerEvents: 'auto',
          zIndex: 10,
          background: 'transparent',
        }}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
      />
    </div>
  );
}
