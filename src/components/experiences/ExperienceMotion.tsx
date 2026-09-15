import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MotionCanvas } from './MotionCanvas';
import { ProductFinish } from '../../types';
import { FINISH_OPTIONS } from '../../data/finishes';
import { SANVERA_CATALOG } from '../../data/sanveraCatalog';
import { sanveraProductToCollectionItem } from '../sections/CollectionSection';
import { ProductViewerModal } from '../three/ProductViewerModal';
import { CollectionItem } from '../../types';
import { Play, Pause, ArrowRight, RotateCcw } from 'lucide-react';

interface ExperienceMotionProps {
  onOpenEnquiry: (productName: string) => void;
}

export const MOTION_CHAPTERS = [
  { id: '01', title: '01 / LINE', subtitle: 'The Gestural Vector', desc: 'Every Sanvera fitting originates not in CAD, but as a single ink stroke recording the parabolic arc of falling water.' },
  { id: '02', title: '02 / CURVE', subtitle: 'Fluid Dynamics & Tangents', desc: 'Mathematical fluid streamlines define internal bore radii, eliminating turbulent drag and preserving acoustic silence.' },
  { id: '03', title: '03 / FORM', subtitle: 'Polygonal Architecture', desc: 'Curvilinear geometry converts into precision 3D mesh topology, balancing ergonomic palm contact with visual stillness.' },
  { id: '04', title: '04 / MATERIAL', subtitle: 'Cold-Forged Brass & Alloy', desc: 'Raw dezincification-resistant brass billets are milled, diamond-knurled, and hand-finished to a warm, velvety brushed grain.' },
  { id: '05', title: '05 / WATER', subtitle: 'Laminar Release', desc: 'Internal Swiss regulators sculpt the water stream into an unbroken crystalline ribbon without micro-splash.' },
  { id: '06', title: '06 / PRODUCT', subtitle: 'The 664 Series Resolved', desc: 'The drawing ceases to be abstract and becomes the physical object — cold, dense, and perfectly weighted in the hand.' },
  { id: '07', title: '07 / SPACE', subtitle: 'Monolithic Context', desc: 'Installed against honed limestone and water surfaces, the fitting ceases to be decoration and becomes spatial anchor.' },
  { id: '08', title: '08 / RITUAL', subtitle: 'Tactile Water Turning', desc: 'The deliberate knurled handle turn. The split-second acoustic silence. The daily architectural ritual of water.' },
  { id: '09', title: '09 / SANVERA', subtitle: 'The Art of Water', desc: 'A complete collection uniting thirty-four pieces under one quiet, unwavering architectural geometry.' },
];

export const ExperienceMotion: React.FC<ExperienceMotionProps> = ({ onOpenEnquiry }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0.02);
  const [activeFinish, setActiveFinish] = useState<ProductFinish>('brushed_brass');
  const [isPlaying, setIsPlaying] = useState(false);
  const [inspectedProduct, setInspectedProduct] = useState<CollectionItem | null>(null);

  // Scroll tracking across the 450vh container
  const handleScroll = useCallback(() => {
    if (!containerRef.current || isPlaying) return;
    const rect = containerRef.current.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    if (total <= 0) return;
    const p = Math.max(0.001, Math.min(0.999, -rect.top / total));
    setProgress(p);
  }, [isPlaying]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Auto-play animation loop
  useEffect(() => {
    let animId: number;
    if (isPlaying) {
      const step = () => {
        setProgress((prev) => {
          const next = prev + 0.0015;
          if (next >= 0.999) {
            setIsPlaying(false);
            return 0.999;
          }
          return next;
        });
        animId = requestAnimationFrame(step);
      };
      animId = requestAnimationFrame(step);
    }
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  // Determine current chapter
  const currentChapterIdx = Math.min(
    MOTION_CHAPTERS.length - 1,
    Math.floor(progress * MOTION_CHAPTERS.length)
  );
  const currentChapter = MOTION_CHAPTERS[currentChapterIdx];

  const handleSelectChapter = (idx: number) => {
    setIsPlaying(false);
    const targetP = (idx + 0.05) / MOTION_CHAPTERS.length;
    setProgress(targetP);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const targetScrollY = window.scrollY + rect.top + targetP * total;
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    }
  };

  const handleInspectClimaxProduct = () => {
    const p664 = SANVERA_CATALOG.find((p) => p.id === 'mixer-664') || SANVERA_CATALOG[0];
    setInspectedProduct(sanveraProductToCollectionItem(p664));
  };

  return (
    <div className="relative w-full bg-void text-ink select-none overflow-hidden">
      {/* Product Detail Modal */}
      <ProductViewerModal
        item={inspectedProduct}
        onClose={() => setInspectedProduct(null)}
        onOpenEnquiry={onOpenEnquiry}
      />

      {/* Main Pinned 450vh Timeline Section */}
      <section ref={containerRef} id="motion" className="relative w-full h-[450vh] bg-void">
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
          {/* Dynamic 3D Motion WebGL Canvas */}
          <MotionCanvas progress={progress} activeFinish={activeFinish} />

          {/* Top Header & Breadcrumb */}
          <div className="absolute top-20 sm:top-24 left-6 sm:left-12 z-20 pointer-events-none max-w-md">
            <div className="flex items-center gap-2.5">
              <span className="label-mono text-brass">03 / MOTION</span>
              <span className="text-hair">·</span>
              <span className="label-mono text-mist">Cinematic Digital Artwork</span>
            </div>
            <h1 className="editorial-title text-3xl sm:text-5xl lg:text-6xl text-ink mt-2">
              {currentChapter.subtitle}
            </h1>
            <p className="text-xs sm:text-sm text-smoke font-light mt-3 leading-relaxed max-w-sm">
              {currentChapter.desc}
            </p>
          </div>

          {/* Top Right Controls & Climax CTA */}
          <div className="absolute top-20 sm:top-24 right-6 sm:right-12 z-20 flex flex-col items-end gap-3 pointer-events-auto">
            {/* Auto-Play Toggle */}
            <div className="flex items-center gap-2 bg-void/80 border border-hair backdrop-blur-md px-3 py-1.5 rounded-full">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-2 text-xs text-mist hover:text-ink transition-colors"
              >
                {isPlaying ? <Pause size={12} className="text-brass" /> : <Play size={12} className="text-brass" />}
                <span className="label-mono text-[10px] uppercase">
                  {isPlaying ? 'Pause Film' : 'Play Film'}
                </span>
              </button>
              <button
                onClick={() => { setProgress(0.01); setIsPlaying(false); }}
                className="p-1 text-smoke hover:text-ink transition-colors ml-1"
                title="Rewind to Chapter 01"
              >
                <RotateCcw size={11} />
              </button>
            </div>

            {/* Inspect Climax Fitting Button (visible when product evolves) */}
            {progress >= 0.45 && (
              <button
                onClick={handleInspectClimaxProduct}
                className="flex items-center gap-2 bg-ink text-void px-4 py-2 rounded-full text-xs font-medium hover:bg-white transition-all shadow-lg animate-fadeIn"
              >
                <span>Inspect 664 Series</span>
                <ArrowRight size={13} />
              </button>
            )}
          </div>

          {/* Bottom Timeline HUD Bar & Chapter Track */}
          <div className="absolute bottom-20 sm:bottom-24 inset-x-6 sm:inset-x-12 z-20 pointer-events-auto flex flex-col gap-3">
            {/* Horizontal Timeline Scrubber */}
            <div className="w-full bg-void/85 border border-hair backdrop-blur-xl p-3 sm:p-4 rounded-2xl flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="label-mono text-brass font-medium">{currentChapter.title}</span>
                  <span className="label-mono text-mist hidden sm:inline">Chapter {currentChapterIdx + 1} of 9</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="label-mono text-smoke text-[10px]">Alloy Finish:</span>
                  <div className="flex items-center gap-1.5">
                    {FINISH_OPTIONS.slice(0, 3).map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setActiveFinish(f.id)}
                        className={`w-3.5 h-3.5 rounded-full border transition-all ${
                          activeFinish === f.id ? 'border-ink scale-125' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: f.hex }}
                        title={f.name}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Scrubbing Bar */}
              <div className="relative w-full h-1.5 bg-hair/60 rounded-full overflow-hidden cursor-pointer">
                <div
                  className="h-full bg-gradient-to-r from-brass/80 to-ink transition-all duration-150 rounded-full"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>

              {/* 9 Chapters Pills */}
              <div className="grid grid-cols-3 sm:grid-cols-9 gap-1.5 pt-1">
                {MOTION_CHAPTERS.map((ch, idx) => {
                  const isActive = currentChapterIdx === idx;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => handleSelectChapter(idx)}
                      className={`px-2 py-1.5 rounded text-left transition-all ${
                        isActive
                          ? 'bg-ink/15 border-b-2 border-brass text-ink font-medium'
                          : 'text-smoke hover:text-mist hover:bg-white/5'
                      }`}
                    >
                      <span className="label-mono text-[9px] block leading-tight truncate">
                        {ch.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
