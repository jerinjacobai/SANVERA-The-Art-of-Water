import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const requestRef = useRef<number>();

  useEffect(() => {
    // Only activate on devices with fine pointer (mouse)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Check hovered element data-cursor attributes
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('[data-cursor]');
      if (interactiveEl) {
        setCursorText(interactiveEl.getAttribute('data-cursor') || '');
        setIsHovered(true);
      } else if (target.closest('button, a, input, select, textarea, canvas')) {
        setIsHovered(true);
        setCursorText('');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth trailing physics
    const animate = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.16,
        y: prev.y + (position.y - prev.y) * 0.16,
      }));
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [position.x, position.y]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[120] overflow-hidden hidden lg:block">
      {/* Precision Core Dot */}
      <div
        className="fixed w-1.5 h-1.5 bg-ink rounded-full -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: isHovered ? 0 : 0.9,
        }}
      />

      {/* Trailing Outer Ring / Badge */}
      <div
        className={`fixed -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/40 flex items-center justify-center transition-all duration-300 ease-out backdrop-blur-[1px] ${
          cursorText
            ? 'w-16 h-16 bg-void/80 border-brass text-brass'
            : isHovered
            ? 'w-10 h-10 bg-ink/10 border-ink'
            : 'w-7 h-7 bg-transparent border-hairLight'
        }`}
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
        }}
      >
        {cursorText && (
          <span className="label-mono text-[8px] tracking-widest text-center select-none">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
