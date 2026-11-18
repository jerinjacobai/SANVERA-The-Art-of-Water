import React, { useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { SanveraLogo } from '../common/SanveraLogo';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  activeExp?: number;
  onSelectExperience?: (id: number) => void;
}

const MENU_ITEMS = [
  {
    number: '01',
    title: 'The Spa Sanctuary Showroom',
    subtitle: 'Living 3D spatial golden marble bathroom with interactive fixture inspection',
    targetId: 'showroom',
    highlight: true,
  },
  {
    number: '02',
    title: '34-Product Master Catalogue',
    subtitle: 'Thirty-four precision-engineered architectural luxury fittings & 3D models',
    targetId: 'collection',
    highlight: false,
  },
  {
    number: '03',
    title: 'Architectural Blueprints',
    subtitle: 'Technical elevation drawings, hydraulic flow rates & acoustic schedules',
    targetId: 'blueprints',
    highlight: false,
  },
  {
    number: '04',
    title: 'Brand Philosophy & Ritual',
    subtitle: 'The Ritual of Water, sensory architecture & elemental purity',
    targetId: 'about',
    highlight: false,
  },
  {
    number: '05',
    title: 'Metallurgical Craft & Evolution',
    subtitle: 'Brescia atelier, 5-axis robotic CNC milling & artisan hand-polishing',
    targetId: 'evolution',
    highlight: false,
  },
  {
    number: '06',
    title: 'Tactile Materials Library',
    subtitle: 'Solid marine-grade brass, volcanic composite stone & optical crystal',
    targetId: 'materials',
    highlight: false,
  },
  {
    number: '07',
    title: 'Built Monolithic Sanctuaries',
    subtitle: 'Private luxury residential case studies across Lake Como, Zurich & Kyoto',
    targetId: 'architecture',
    highlight: false,
  },
  {
    number: '08',
    title: 'The Sanctuary Film',
    subtitle: 'Cinematic sensory artwork exploring fluid transformation',
    targetId: 'film',
    highlight: false,
  },
  {
    number: '09',
    title: 'Sanvera Journal',
    subtitle: 'Architectural essays on water ritual, stillness & spatial form',
    targetId: 'journal',
    highlight: false,
  },
  {
    number: '10',
    title: 'Architectural Consultation',
    subtitle: 'Bespoke project specification, finish sample kits & BIM/CAD data',
    targetId: 'enquiry',
    highlight: false,
  },
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

  const handleNavClick = (targetId: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 120);
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#14100c]/98 backdrop-blur-3xl text-[#fdfbf7] flex flex-col justify-between p-6 sm:p-10 lg:p-16 overflow-y-auto animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Site Navigation Menu"
    >
      {/* Top Header Bar inside Menu */}
      <div className="flex items-center justify-between border-b border-[#c5a059]/30 pb-6 max-w-[1600px] w-full mx-auto">
        <div className="flex items-center gap-4">
          <SanveraLogo className="h-9 sm:h-11 w-auto" variant="teal" />
          <div className="h-6 w-px bg-[#c5a059]/30 hidden sm:block" />
          <span className="label-mono text-xs text-[#00c2d3] uppercase tracking-widest hidden sm:inline">
            ARCHITECTURAL DIRECTORY
          </span>
        </div>

        <button
          onClick={onClose}
          className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#221b14] border border-[#c5a059]/50 hover:border-[#00c2d3] text-[#fdfbf7] hover:text-[#00c2d3] transition-all group shadow-md cursor-pointer"
        >
          <span className="label-mono text-xs font-semibold tracking-wider">CLOSE</span>
          <X size={15} className="group-hover:rotate-90 transition-transform duration-300 text-[#d4af37] group-hover:text-[#00c2d3]" />
        </button>
      </div>

      {/* Main Navigation Links */}
      <nav className="my-auto py-8 sm:py-12 flex flex-col gap-2 sm:gap-3 max-w-[1600px] w-full mx-auto">
        {MENU_ITEMS.map((item, idx) => (
          <button
            key={item.targetId}
            onClick={() => handleNavClick(item.targetId)}
            className="group flex items-baseline justify-between text-left border-b border-[#c5a059]/15 py-3 sm:py-4 transition-all duration-300 hover:translate-x-3 hover:border-[#00c2d3]/50 cursor-pointer w-full"
            style={{ transitionDelay: `${idx * 15}ms` }}
          >
            <div className="flex items-baseline gap-4 sm:gap-8">
              <span
                className={`label-mono text-xs sm:text-sm font-semibold ${
                  item.highlight ? 'text-[#00c2d3]' : 'text-[#d4af37]'
                }`}
              >
                {item.number}
              </span>
              <div>
                <h3
                  className={`editorial-title text-2xl sm:text-4xl lg:text-5xl font-light transition-colors duration-300 ${
                    item.highlight
                      ? 'text-[#fdfbf7] group-hover:text-[#00c2d3]'
                      : 'text-[#ded4c5] group-hover:text-[#fdfbf7]'
                  }`}
                >
                  {item.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-[#9e9080] font-light mt-1 group-hover:text-[#c7bcab] transition-colors line-clamp-1 sm:line-clamp-none">
                  {item.subtitle}
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-3 text-[#c5a059] group-hover:text-[#00c2d3] transition-colors shrink-0">
              <span className="label-mono text-[10px] uppercase tracking-wider">Explore</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        ))}
      </nav>

      {/* Footer Info inside Menu */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pt-6 border-t border-[#c5a059]/30 max-w-[1600px] w-full mx-auto">
        <div>
          <span className="label-mono text-[10px] text-[#00c2d3] uppercase tracking-wider block">
            Direct Studio Enquiry
          </span>
          <p className="mt-1 text-xs sm:text-sm font-light text-[#ded4c5]">
            projects@sanvera.com · +39 030 998 2100
          </p>
        </div>
        <div>
          <span className="label-mono text-[10px] text-[#d4af37] uppercase tracking-wider block">
            Atelier & Showrooms
          </span>
          <p className="mt-1 text-xs sm:text-sm font-light text-[#ded4c5]">
            Brescia (Factory) · Milan · Zurich · London
          </p>
        </div>
        <div className="flex items-center gap-5 text-xs text-[#b0a495]">
          <span className="label-mono text-[10px]">Sanvera S.p.A. © 2026</span>
        </div>
      </div>
    </div>
  );
};
