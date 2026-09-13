import React, { useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_ITEMS = [
  { title: 'Philosophy', href: '#about', number: '01', note: 'Form, function & ritual' },
  { title: 'The Evolution', href: '#evolution', number: '02', note: 'Sketch to brass object' },
  { title: 'Materials', href: '#materials', number: '03', note: 'Brass, stone, glass, water' },
  { title: 'Collection', href: '#collection', number: '04', note: 'Six architectural families' },
  { title: 'Sanctuary Film', href: '#film', number: '05', note: 'Cinematic sensory experience' },
  { title: 'Journal', href: '#journal', number: '06', note: 'Essays on ritual and space' },
  { title: 'Project Enquiry', href: '#enquiry', number: '07', note: 'Architectural studio consultation' },
];

export const MenuOverlay: React.FC<MenuOverlayProps> = ({ isOpen, onClose }) => {
  // Prevent body scroll when menu is open & listen to Escape
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-void/98 backdrop-blur-2xl text-ink transition-opacity duration-700 ease-editorial flex flex-col justify-between p-6 sm:p-12 lg:p-16 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Site Navigation Menu"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-hair pb-6">
        <span className="label-mono text-smoke">Sanvera — Navigation</span>
        <button
          onClick={onClose}
          className="group flex items-center gap-3 text-mist hover:text-ink transition-colors duration-300"
        >
          <span className="label-mono">Close</span>
          <X size={16} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      {/* Main Nav Links (Massive Editorial Typography) */}
      <nav className="my-auto py-10 flex flex-col gap-3 sm:gap-4 max-w-[1400px]">
        {MENU_ITEMS.map((item, idx) => (
          <a
            key={item.number}
            href={item.href}
            onClick={onClose}
            className="group flex items-baseline justify-between border-b border-hair/40 py-2 sm:py-3 transition-transform duration-500 ease-editorial hover:translate-x-4"
            style={{ transitionDelay: `${idx * 30}ms` }}
          >
            <div className="flex items-baseline gap-4 sm:gap-8">
              <span className="label-mono text-brass text-xs sm:text-sm">{item.number}</span>
              <span className="editorial-title text-3xl sm:text-5xl lg:text-7xl text-smoke group-hover:text-ink transition-colors duration-500">
                {item.title}
              </span>
            </div>
            <div className="hidden md:flex items-center gap-4 text-smoke group-hover:text-mist transition-colors">
              <span className="label-mono text-[10px]">{item.note}</span>
              <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
          </a>
        ))}
      </nav>

      {/* Footer Info inside Menu */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pt-6 border-t border-hair">
        <div>
          <span className="label-mono text-smoke block">Direct Enquiry</span>
          <p className="mt-1 text-sm font-light text-mist">projects@sanvera.com</p>
        </div>
        <div>
          <span className="label-mono text-smoke block">Atelier</span>
          <p className="mt-1 text-sm font-light text-mist">Brescia · Zurich · Copenhagen</p>
        </div>
        <div className="flex items-center gap-6">
          <a href="#instagram" className="label-mono text-smoke hover:text-ink transition-colors">Instagram</a>
          <a href="#pinterest" className="label-mono text-smoke hover:text-ink transition-colors">Pinterest</a>
          <a href="#linkedin" className="label-mono text-smoke hover:text-ink transition-colors">LinkedIn</a>
        </div>
      </div>
    </div>
  );
};
