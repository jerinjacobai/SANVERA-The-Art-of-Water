import React, { useState, useEffect } from 'react';
import { Compass, Film, Layers, X } from 'lucide-react';

export type ExperienceId = 1 | 2 | 3;

interface ExperienceSwitcherProps {
  activeExp: ExperienceId;
  onChange: (id: ExperienceId) => void;
}

export const EXPERIENCES = [
  {
    id: 1 as ExperienceId,
    number: '01',
    name: 'Art of Water',
    fullName: 'The Art of Water',
    tagline: 'The Ritual of Water',
    description: 'Editorial brand monograph, scroll choreography & material evolution',
    icon: Layers,
    slug: '/art-of-water',
    hash: '#monograph',
  },
  {
    id: 2 as ExperienceId,
    number: '02',
    name: 'Showroom',
    fullName: 'The Sanvera Showroom',
    tagline: 'Spatial Architectural Exhibition',
    description: 'Interactive 3D pavilion with guided journey & spatial catalogue discovery',
    icon: Compass,
    slug: '/showroom',
    hash: '#showroom',
  },
  {
    id: 3 as ExperienceId,
    number: '03',
    name: 'Motion',
    fullName: 'Sanvera / Motion',
    tagline: 'Cinematic Fluid Transformation',
    description: 'A 9-chapter visual artwork exploring form, water, material & ritual',
    icon: Film,
    slug: '/motion',
    hash: '#motion',
  },
];

export const ExperienceSwitcher: React.FC<ExperienceSwitcherProps> = ({
  activeExp,
  onChange,
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Keyboard navigation shortcuts: 1, 2, 3
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === '1') onChange(1);
      if (e.key === '2') onChange(2);
      if (e.key === '3') onChange(3);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onChange]);

  const activeExperience = EXPERIENCES.find((e) => e.id === activeExp) || EXPERIENCES[0];
  const ActiveIcon = activeExperience.icon;

  return (
    <>
      {/* =========================================================================
          DESKTOP LUXURY FLOATING DOCK (Minimal, Non-dominant, Hover Expansion)
          ========================================================================= */}
      <nav
        aria-label="Sanvera Experience Switcher"
        className="hidden md:flex fixed bottom-7 left-1/2 -translate-x-1/2 z-50 items-center gap-1.5 p-1.5 border border-hair/90 bg-void/90 backdrop-blur-xl shadow-2xl rounded-full select-none transition-all duration-500"
      >
        <div className="flex items-center px-3 py-1 border-r border-hair/60 text-smoke">
          <span className="label-mono text-[9px] tracking-widest text-mist">EXP</span>
        </div>

        {EXPERIENCES.map((exp) => {
          const isActive = activeExp === exp.id;
          const Icon = exp.icon;

          return (
            <button
              key={exp.id}
              onClick={() => onChange(exp.id)}
              title={`${exp.fullName} — ${exp.description}`}
              className={`group relative flex items-center gap-2.5 px-3.5 py-2 rounded-full transition-all duration-500 text-xs font-light tracking-wider uppercase ${
                isActive
                  ? 'bg-ink text-void shadow-md font-medium'
                  : 'text-mist hover:text-ink hover:bg-white/5'
              }`}
            >
              <Icon
                size={13}
                className={`transition-transform duration-300 ${
                  isActive ? 'text-void scale-110' : 'text-brass group-hover:scale-110'
                }`}
              />
              <span className="label-mono text-[11px] whitespace-nowrap">
                {exp.number} / {exp.name}
              </span>
            </button>
          );
        })}
      </nav>

      {/* =========================================================================
          MOBILE COMPACT FLOATING TRIGGER & FULLSCREEN DRAWER
          ========================================================================= */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={() => setIsMobileOpen(true)}
          aria-label="Open Experience Selector"
          className="flex items-center gap-2.5 px-4 py-2.5 border border-hair/90 bg-void/90 backdrop-blur-xl shadow-2xl rounded-full text-ink text-xs select-none"
        >
          <ActiveIcon size={13} className="text-brass" />
          <span className="label-mono text-[10px] tracking-wider uppercase">
            EXP · {activeExperience.number} / {activeExperience.name}
          </span>
        </button>
      </div>

      {/* Mobile Drawer Modal */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-[110] bg-void/98 backdrop-blur-2xl p-6 flex flex-col justify-between animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-label="Select Brand Experience"
        >
          <div className="flex items-center justify-between border-b border-hair pb-4">
            <span className="label-mono text-smoke text-xs">Sanvera · Experience Selection</span>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="text-mist hover:text-ink p-1"
              aria-label="Close Selector"
            >
              <X size={18} />
            </button>
          </div>

          <div className="my-auto flex flex-col gap-4">
            {EXPERIENCES.map((exp) => {
              const isActive = activeExp === exp.id;
              const Icon = exp.icon;

              return (
                <button
                  key={exp.id}
                  onClick={() => {
                    onChange(exp.id);
                    setIsMobileOpen(false);
                  }}
                  className={`p-5 rounded-2xl border text-left transition-all duration-300 ${
                    isActive
                      ? 'border-brass bg-white/5 text-ink'
                      : 'border-hair/60 bg-transparent text-mist hover:text-ink'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon size={14} className={isActive ? 'text-brass' : 'text-smoke'} />
                      <span className="label-mono text-brass text-xs">EXPERIENCE {exp.number}</span>
                    </div>
                    {isActive && (
                      <span className="label-mono text-[10px] text-brass uppercase border border-brass/40 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  <h3 className="editorial-title text-2xl text-ink font-light">{exp.fullName}</h3>
                  <p className="text-xs text-smoke font-light mt-1.5 leading-relaxed">{exp.description}</p>
                </button>
              );
            })}
          </div>

          <div className="border-t border-hair pt-4 text-center">
            <span className="label-mono text-[10px] text-smoke">The Art of Water · Sanvera</span>
          </div>
        </div>
      )}
    </>
  );
};
