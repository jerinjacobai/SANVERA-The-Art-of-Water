import React, { useEffect, useState } from 'react';
import { ExperienceId, EXPERIENCES } from './ExperienceSwitcher';

interface ExperienceTransitionOverlayProps {
  isTransitioning: boolean;
  targetExp: ExperienceId;
  onTransitionMiddle?: () => void;
  onTransitionEnd?: () => void;
}

export const ExperienceTransitionOverlay: React.FC<ExperienceTransitionOverlayProps> = ({
  isTransitioning,
  targetExp,
  onTransitionMiddle,
  onTransitionEnd,
}) => {
  const [stage, setStage] = useState<'idle' | 'covering' | 'revealing'>('idle');
  const targetInfo = EXPERIENCES.find((e) => e.id === targetExp) || EXPERIENCES[0];

  useEffect(() => {
    if (!isTransitioning) {
      setStage('idle');
      return;
    }

    // Phase 1: Sweep in & veil covers screen
    setStage('covering');

    const middleTimer = setTimeout(() => {
      onTransitionMiddle?.();
      setStage('revealing');
    }, 550);

    const endTimer = setTimeout(() => {
      setStage('idle');
      onTransitionEnd?.();
    }, 1150);

    return () => {
      clearTimeout(middleTimer);
      clearTimeout(endTimer);
    };
  }, [isTransitioning, targetExp]);

  if (!isTransitioning && stage === 'idle') return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] pointer-events-none transition-all duration-500 ease-editorial flex flex-col items-center justify-center bg-void/98 backdrop-blur-2xl ${
        stage === 'covering' ? 'opacity-100' : stage === 'revealing' ? 'opacity-90' : 'opacity-0'
      }`}
    >
      {/* Dynamic Water-Line Horizon Beam */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-brass/60 to-transparent w-full animate-pulse" />

      {/* Brand Transition Moment */}
      <div className="relative z-10 text-center flex flex-col items-center gap-3 px-6">
        <span className="label-mono text-brass text-[10px] sm:text-[11px] tracking-widest3 uppercase">
          Sanvera Architecture
        </span>
        <h2 className="editorial-title text-2xl sm:text-4xl lg:text-5xl text-ink font-light tracking-wide">
          {targetInfo.number} · {targetInfo.name}
        </h2>
        <span className="label-mono text-mist text-[10px] tracking-widest uppercase">
          {targetInfo.tagline}
        </span>
      </div>
    </div>
  );
};
