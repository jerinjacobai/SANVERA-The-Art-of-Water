import React from 'react';
import { Compass, Sparkles, Layers } from 'lucide-react';

export type ExperienceId = 1 | 2 | 3;

interface ExperienceSwitcherProps {
  activeExp: ExperienceId;
  onChange: (id: ExperienceId) => void;
}

export const EXPERIENCES = [
  {
    id: 1 as ExperienceId,
    number: '01',
    name: 'Monograph',
    tagline: 'The Ritual of Water',
    description: 'Cinematic editorial storytelling, 3D scroll choreography & material evolution',
    icon: Layers,
    hash: '#monograph',
  },
  {
    id: 2 as ExperienceId,
    number: '02',
    name: 'Spatial Showroom',
    tagline: 'The Pavilion',
    description: 'Interactive architectural walkthrough with guided journey & free 3D exploration',
    icon: Compass,
    hash: '#showroom',
  },
  {
    id: 3 as ExperienceId,
    number: '03',
    name: 'Hydro-Lab',
    tagline: 'Kinetic Engineering',
    description: 'Exploded component engineering, radial dials & dynamic water flow lab',
    icon: Sparkles,
    hash: '#hydrolab',
  },
];

export const ExperienceSwitcher: React.FC<ExperienceSwitcherProps> = ({
  activeExp,
  onChange,
}) => {
  return (
    <nav
      aria-label="Experience Switcher"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 p-1.5 border border-hair/90 bg-void/85 backdrop-blur-xl shadow-2xl rounded-full select-none"
    >
      <div className="hidden sm:flex items-center px-3 py-1 border-r border-hair/60 text-smoke">
        <span className="label-mono text-[9px] tracking-widest text-mist">EXP</span>
      </div>

      {EXPERIENCES.map((exp) => {
        const isActive = activeExp === exp.id;
        const Icon = exp.icon;

        return (
          <button
            key={exp.id}
            onClick={() => onChange(exp.id)}
            title={`${exp.name} — ${exp.description}`}
            className={`group relative flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-full transition-all duration-500 text-xs font-light tracking-wider uppercase ${
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
            <span className="label-mono text-[10px] sm:text-[11px] whitespace-nowrap">
              {exp.number} · {exp.name}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
