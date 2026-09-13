import React from 'react';

interface HeroProgressProps {
  progress: number;
  currentStage: number;
  onSelectStage?: (stageIndex: number) => void;
}

const STAGES = [
  { number: '01', name: 'Form' },
  { number: '02', name: 'Material' },
  { number: '03', name: 'Water' },
  { number: '04', name: 'Ritual' },
];

export const HeroProgress: React.FC<HeroProgressProps> = ({
  progress,
  currentStage,
  onSelectStage,
}) => {
  return (
    <>
      {/* Desktop Vertical Progress Indicator (Left Side) */}
      <aside
        className="pointer-events-none absolute inset-y-0 left-6 sm:left-10 lg:left-14 z-30 hidden md:flex flex-col justify-center items-start"
        aria-label="Experience Progress"
      >
        <div className="relative flex flex-col items-start h-[52vh] justify-between">
          {/* Top Crosshair */}
          <span className="text-smoke text-[11px] font-light -translate-x-[4px] select-none">+</span>

          {/* Background Hairline Track */}
          <div className="absolute left-0 top-[24px] bottom-[24px] w-px bg-hair" />

          {/* Active Fill Line */}
          <div
            className="absolute left-0 top-[24px] w-px bg-ink transition-transform duration-150 origin-top"
            style={{
              height: 'calc(100% - 48px)',
              transform: `scaleY(${Math.max(0.04, Math.min(1, progress))})`,
            }}
          />

          {/* Stage Ticks & Text Labels */}
          <div className="relative flex flex-col justify-between h-full py-6">
            {STAGES.map((stage, idx) => {
              const isActive = currentStage === idx;
              return (
                <button
                  key={stage.number}
                  onClick={() => onSelectStage?.(idx)}
                  className="group pointer-events-auto flex items-center gap-4 text-left transition-all duration-500 py-1.5"
                >
                  {/* Tick marker */}
                  <span
                    className={`block h-px w-6 transition-all duration-500 origin-left ${
                      isActive
                        ? 'bg-ink scale-x-100 opacity-100'
                        : 'bg-smoke scale-x-50 opacity-40 group-hover:scale-x-75 group-hover:opacity-80'
                    }`}
                  />
                  {/* Label */}
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`label-mono transition-colors duration-500 ${
                        isActive ? 'text-brass' : 'text-smoke/60'
                      }`}
                    >
                      {stage.number}
                    </span>
                    <span
                      className={`text-[11px] uppercase tracking-widest2 transition-colors duration-500 font-light ${
                        isActive ? 'text-ink font-normal' : 'text-smoke group-hover:text-mist'
                      }`}
                    >
                      {stage.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom Crosshair */}
          <span className="text-smoke text-[11px] font-light -translate-x-[4px] select-none">+</span>
        </div>
      </aside>

      {/* Mobile Horizontal Indicator (Bottom) */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-6 z-30 flex md:hidden items-center justify-center gap-4 px-6"
        aria-hidden="true"
      >
        {STAGES.map((stage, idx) => {
          const isActive = currentStage === idx;
          return (
            <div key={stage.number} className="flex items-center gap-2">
              <span
                className={`h-px transition-all duration-500 ${
                  isActive ? 'w-8 bg-ink' : 'w-4 bg-hair'
                }`}
              />
              <span
                className={`text-[9px] uppercase tracking-widest2 transition-colors duration-500 ${
                  isActive ? 'text-ink font-medium' : 'text-smoke/60'
                }`}
              >
                {stage.name}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};
