import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ShowroomCanvas, SHOWROOM_ZONES, ShowroomZone } from './ShowroomCanvas';
import { ShowroomTelemetry } from './ShowroomTelemetry';
import { ShowroomBlueprints } from './ShowroomBlueprints';
import { ProductViewerModal } from '../three/ProductViewerModal';
import { COLLECTIONS } from '../../data/collections';
import { CollectionItem, ProductFinish } from '../../types';
import { ArrowRight, Compass } from 'lucide-react';

interface ExperienceSpatialShowroomProps {
  onOpenEnquiry: (productName: string) => void;
}

export const ExperienceSpatialShowroom: React.FC<ExperienceSpatialShowroomProps> = ({
  onOpenEnquiry,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0.05);
  const [currentZone, setCurrentZone] = useState<ShowroomZone>(SHOWROOM_ZONES[0]);
  const [coords, setCoords] = useState({ x: 0, y: 3.2, z: 38 });
  const [isFreeExploration, setIsFreeExploration] = useState(false);
  const [activeFinish, setActiveFinish] = useState<ProductFinish>('brushed_brass');
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [inspectedProduct, setInspectedProduct] = useState<CollectionItem | null>(null);

  // Auto-play animation timer
  useEffect(() => {
    let animId: number;
    if (isAutoPlaying && !isFreeExploration) {
      const step = () => {
        setProgress((prev) => {
          const next = (prev + 0.0012) % 1;
          return next;
        });
        animId = requestAnimationFrame(step);
      };
      animId = requestAnimationFrame(step);
    }
    return () => cancelAnimationFrame(animId);
  }, [isAutoPlaying, isFreeExploration]);

  // Scroll tracking for guided path
  const handleScroll = useCallback(() => {
    if (isFreeExploration || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    if (total <= 0) return;

    const p = Math.max(0.001, Math.min(0.999, -rect.top / total));
    setProgress(p);

    // Find closest zone
    let closest = SHOWROOM_ZONES[0];
    let minDiff = Infinity;
    SHOWROOM_ZONES.forEach((z) => {
      const diff = Math.abs(z.t - p);
      if (diff < minDiff) {
        minDiff = diff;
        closest = z;
      }
    });
    setCurrentZone(closest);
  }, [isFreeExploration]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Jump to specific zone
  const handleSelectZone = (zone: ShowroomZone) => {
    if (isFreeExploration) setIsFreeExploration(false);
    setProgress(zone.t);
    setCurrentZone(zone);

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const targetScrollY = window.scrollY + rect.top + zone.t * total;
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    }
  };

  // Pedestal click handler (matches with Collection item)
  const handlePedestalClick = (pedestalName: string) => {
    const found = COLLECTIONS.find((c) =>
      c.title.toLowerCase().includes(pedestalName.toLowerCase()) ||
      pedestalName.toLowerCase().includes(c.title.toLowerCase())
    ) || COLLECTIONS[1];
    setInspectedProduct(found);
  };

  return (
    <div className="relative w-full bg-void text-ink">
      {/* 3D Product Inspector Modal when clicking pedestals */}
      <ProductViewerModal
        item={inspectedProduct}
        onClose={() => setInspectedProduct(null)}
        onOpenEnquiry={onOpenEnquiry}
      />

      {/* Main Pinned 3D Architectural Walkthrough Section */}
      <section
        ref={containerRef}
        id="showroom"
        className="relative w-full h-[400vh] bg-void"
      >
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden select-none">
          {/* 3D Three.js Spatial Pavilion Scene */}
          <ShowroomCanvas
            progress={progress}
            isFreeExploration={isFreeExploration}
            activeFinish={activeFinish}
            onUpdateCoords={setCoords}
            onPedestalClick={handlePedestalClick}
          />

          {/* Top Left Spatial Showroom Brand Overlay */}
          <div className="absolute top-20 sm:top-24 left-6 sm:left-12 z-20 pointer-events-none max-w-sm">
            <div className="flex items-center gap-2.5">
              <Compass size={14} className="text-brass" />
              <span className="label-mono text-mist">Sanvera Pavilion · Spatial Exhibition</span>
            </div>
            <h1 className="editorial-title text-3xl sm:text-4xl lg:text-5xl text-ink mt-2">
              {currentZone.name}
            </h1>
            <p className="text-xs sm:text-sm text-mist font-light mt-2 leading-relaxed">
              {currentZone.tagline}
            </p>
          </div>

          {/* Top Right Contextual Description & Hotspot Trigger */}
          <div className="absolute top-20 sm:top-24 right-6 sm:right-12 z-20 max-w-xs text-right hidden md:block pointer-events-auto">
            <span className="label-mono text-brass block mb-1">Spatial Architecture</span>
            <p className="text-xs text-smoke font-light leading-relaxed">
              {currentZone.description}
            </p>
            <button
              onClick={() => handlePedestalClick('Series Mixer')}
              className="mt-4 inline-flex items-center gap-2 label-mono text-ink border-b border-hair hover:border-ink transition-colors pb-1 text-[10px]"
            >
              <span>Inspect Zone Fittings</span>
              <ArrowRight size={12} />
            </button>
          </div>

          {/* Bottom Telemetry HUD Bar (Coordinates, Zones, Controls) */}
          <ShowroomTelemetry
            currentZone={currentZone}
            coords={coords}
            progress={progress}
            isFreeExploration={isFreeExploration}
            onToggleMode={() => setIsFreeExploration(!isFreeExploration)}
            onSelectZone={handleSelectZone}
            activeFinish={activeFinish}
            onSelectFinish={setActiveFinish}
            isAutoPlaying={isAutoPlaying}
            onToggleAutoPlay={() => setIsAutoPlaying(!isAutoPlaying)}
          />
        </div>
      </section>

      {/* Architectural CAD Blueprint Drawings & Framework (from BRQ reference) */}
      <ShowroomBlueprints />
    </div>
  );
};
