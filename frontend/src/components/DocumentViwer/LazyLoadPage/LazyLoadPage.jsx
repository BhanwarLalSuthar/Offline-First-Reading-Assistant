import React, { useRef, useState, useEffect } from 'react';

export default function LazyLoadPage({ src, alt = '', type = 'image', style = {} }) {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ minHeight: 300, ...style }}>
      {isVisible && type === 'image' && (
        <img src={src} alt={alt} style={{ width: '100%', ...style }} />
      )}

      {!isVisible && <div style={{ height: 300, background: '#f0f0f0' }}>Loading...</div>}
    </div>
  );
}
