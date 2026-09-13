import React, { useState, useEffect, useRef, useCallback } from 'react';
import { HeroCanvas } from './HeroCanvas';
import { HeroStory } from './HeroStory';
import { HeroProgress } from './HeroProgress';
import { ProductFinish } from '../../types';
import { FINISH_OPTIONS } from '../../data/finishes';

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [activeFinish, setActiveFinish] = useState<ProductFinish>('brushed_brass');

  const updateProgress = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const totalScrollable = rect.height - window.innerHeight;
    if (totalScrollable <= 0) return;

    const p = Math.max(0, Math.min(1, -rect.top / totalScrollable));
    setProgress(p);

    // Calculate stage index (0 to 3)
    let stage = 0;
    if (p >= 0.78) stage = 3;
    else if (p >= 0.52) stage = 2;
    else if (p >= 0.25) stage = 1;
    setCurrentStage(stage);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress();
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [updateProgress]);

  // Jump to specific stage on progress tick click
  const handleSelectStage = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const totalScrollable = rect.height - window.innerHeight;
    const targetP = [0.05, 0.35, 0.65, 0.9][index];
    const targetScrollY = window.scrollY + rect.top + targetP * totalScrollable;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-[360vh] bg-void"
    >
      {/* Pinned Sticky Viewport (100svh) */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden grain-overlay select-none">
        {/* Ambient Dark Background & Atmospheric Lighting */}
        <div className="absolute inset-0 bg-[#050505]" />
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            background:
              'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(168,135,90,0.08) 0%, transparent 70%)',
          }}
        />

        {/* Faint Architectural Grid & Vignette */}
        <div className="tech-grid absolute inset-0 pointer-events-none opacity-40" />
        <div className="vignette-radial absolute inset-0 pointer-events-none" />

        {/* Real-time 3D Product Canvas */}
        <HeroCanvas progress={progress} activeFinish={activeFinish} />

        {/* Hero Staged Storytelling Typography */}
        <HeroStory currentStage={currentStage} />

        {/* Hero Vertical Progress Bar */}
        <HeroProgress
          progress={progress}
          currentStage={currentStage}
          onSelectStage={handleSelectStage}
        />

        {/* Floating Finish Selector in Hero (Bottom Right) */}
        <div className="absolute bottom-8 right-6 sm:right-12 lg:right-16 z-30 hidden sm:flex flex-col items-end gap-2">
          <span className="label-mono text-smoke text-[9px]">Preview Alloy</span>
          <div className="flex items-center gap-2 p-1.5 border border-hair/80 bg-void/60 backdrop-blur-md">
            {FINISH_OPTIONS.map((finish) => (
              <button
                key={finish.id}
                onClick={() => setActiveFinish(finish.id)}
                title={finish.name}
                className={`w-4 h-4 rounded-full transition-all duration-300 border ${
                  activeFinish === finish.id
                    ? 'border-ink scale-110 ring-1 ring-ink/30'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                style={{ backgroundColor: finish.hex }}
                aria-label={`Select ${finish.name} finish`}
              />
            ))}
          </div>
        </div>

        {/* Subtle Scroll Hint */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 transition-opacity duration-700 ${
            progress > 0.88 ? 'opacity-0 pointer-events-none' : 'opacity-60'
          }`}
        >
          <span className="label-mono text-[9px] text-smoke">Scroll to experience</span>
          <div className="w-px h-6 bg-gradient-to-b from-smoke to-transparent" />
        </div>
      </div>
    </section>
  );
};
