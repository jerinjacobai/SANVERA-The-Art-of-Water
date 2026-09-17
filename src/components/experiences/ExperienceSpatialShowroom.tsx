import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ShowroomCanvas, SHOWROOM_ZONES, ShowroomZone } from './ShowroomCanvas';
import { ShowroomTelemetry } from './ShowroomTelemetry';
import { ShowroomBlueprints } from './ShowroomBlueprints';
import { ProductViewerModal } from '../three/ProductViewerModal';
import { SANVERA_CATALOG } from '../../data/sanveraCatalog';
import { sanveraProductToCollectionItem } from '../sections/CollectionSection';
import { CollectionItem, ProductFinish, SanveraProduct } from '../../types';
import { ArrowRight, Compass, Box } from 'lucide-react';

interface ExperienceSpatialShowroomProps {
  onOpenEnquiry: (productName: string) => void;
}

export const ExperienceSpatialShowroom: React.FC<ExperienceSpatialShowroomProps> = ({
  onOpenEnquiry,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0.05);
  const [currentZone, setCurrentZone] = useState<ShowroomZone>(SHOWROOM_ZONES[0]);
  const [coords, setCoords] = useState({ x: 0, y: 3.4, z: 38 });
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
          const next = (prev + 0.001) % 1;
          return next;
        });
        animId = requestAnimationFrame(step);
      };
      animId = requestAnimationFrame(step);
    }
    return () => cancelAnimationFrame(animId);
  }, [isAutoPlaying, isFreeExploration]);

  // Scroll tracking for guided camera path
  const handleScroll = useCallback(() => {
    if (isFreeExploration || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    if (total <= 0) return;

    const p = Math.max(0.001, Math.min(0.999, -rect.top / total));
    setProgress(p);

    // Determine active zone based on scroll progression
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

  // Jump smoothly to a specific architectural zone
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

  // Pedestal / hotspot click handler
  const handlePedestalClick = (idOrName: string) => {
    const found = SANVERA_CATALOG.find((c) =>
      c.id === idOrName ||
      c.name.toLowerCase().includes(idOrName.toLowerCase()) ||
      c.family.toLowerCase().includes(idOrName.toLowerCase()) ||
      idOrName.toLowerCase().includes(c.id) ||
      idOrName.toLowerCase().includes(c.name.toLowerCase())
    ) || SANVERA_CATALOG[3];
    setInspectedProduct(sanveraProductToCollectionItem(found));
  };

  // Active products in the current showroom zone
  const zoneProducts = useMemo(() => {
    return currentZone.productIds
      .map((id) => SANVERA_CATALOG.find((p) => p.id === id))
      .filter((p): p is SanveraProduct => p !== undefined);
  }, [currentZone]);

  return (
    <div className="relative w-full bg-void text-ink">
      {/* 3D Product Inspector Modal with 3D & Studio Photo Archive */}
      <ProductViewerModal
        item={inspectedProduct}
        onClose={() => setInspectedProduct(null)}
        onOpenEnquiry={onOpenEnquiry}
      />

      {/* Main Pinned 3D Architectural Showroom Pavilion */}
      <section
        ref={containerRef}
        id="showroom"
        className="relative w-full h-[450vh] bg-void"
      >
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden select-none">
          {/* 3D Three.js Spatial Pavilion Scene with 7 Stations */}
          <ShowroomCanvas
            progress={progress}
            isFreeExploration={isFreeExploration}
            activeFinish={activeFinish}
            onUpdateCoords={setCoords}
            onPedestalClick={handlePedestalClick}
          />

          {/* Top Left: Pavilion Brand & Zone Status Overlay */}
          <div className="absolute top-20 sm:top-24 left-6 sm:left-12 z-20 pointer-events-none max-w-sm">
            <div className="flex items-center gap-2.5">
              <Compass size={14} className="text-brass" />
              <span className="label-mono text-mist">Sanvera Flagship Pavilion · Architectural 3D Space</span>
            </div>
            <h1 className="editorial-title text-3xl sm:text-4xl lg:text-5xl text-ink mt-2">
              {currentZone.name}
            </h1>
            <p className="text-xs sm:text-sm text-mist font-light mt-2 leading-relaxed">
              {currentZone.tagline}
            </p>
          </div>

          {/* Top Right: Architectural Context & Quick Action */}
          <div className="absolute top-20 sm:top-24 right-6 sm:right-12 z-20 max-w-xs text-right hidden md:block pointer-events-auto">
            <span className="label-mono text-brass block mb-1">Wing Specifications</span>
            <p className="text-xs text-smoke font-light leading-relaxed">
              {currentZone.description}
            </p>
            <button
              onClick={() => handlePedestalClick(currentZone.productIds[0] || 'mixer-664')}
              className="mt-3 inline-flex items-center gap-2 label-mono text-ink border-b border-hair hover:border-ink transition-colors pb-1 text-[10px]"
            >
              <Box size={12} className="text-brass" />
              <span>Inspect Wing Centerpiece (3D)</span>
              <ArrowRight size={12} />
            </button>
          </div>

          {/* Luxury Exhibition Wing Showcase Tray (Prominent, large product cards) */}
          <div className="absolute bottom-20 left-4 sm:left-10 right-4 sm:right-auto z-20 max-w-2xl pointer-events-auto">
            <div className="bg-void/90 backdrop-blur-2xl border border-hair/90 p-4 sm:p-5 rounded-2xl shadow-2xl">
              <div className="flex items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brass animate-pulse" />
                  <span className="label-mono text-[10px] text-mist uppercase tracking-wider">
                    Exhibited in {currentZone.name} ({zoneProducts.length})
                  </span>
                </div>
                <span className="label-mono text-[9px] text-brass font-medium">
                  Click card to inspect 3D model & photo
                </span>
              </div>

              {/* Large Product Showcase Cards */}
              <div className="flex items-center gap-3.5 overflow-x-auto pb-2 scrollbar-none">
                {zoneProducts.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => handlePedestalClick(prod.id)}
                    className="group flex flex-col justify-between w-48 sm:w-56 p-3.5 rounded-xl bg-char/60 hover:bg-char/95 border border-hair hover:border-brass/90 text-left transition-all shrink-0 hover:-translate-y-1 shadow-lg"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between text-[9px] mb-2">
                      <span className="label-mono text-brass font-medium">{prod.number}</span>
                      <span className="label-mono text-smoke">{prod.sku}</span>
                    </div>

                    {/* LARGE PRODUCT PHOTO (h-32 sm:h-36) */}
                    <div className="w-full h-32 sm:h-36 rounded-lg overflow-hidden bg-void/50 p-2 flex items-center justify-center border border-hair/50 group-hover:border-brass/50 transition-colors my-1">
                      <img
                        src={prod.image || '/catalog/mixer-664.jpg'}
                        alt={prod.name}
                        className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = '/catalog/mixer-664.jpg';
                        }}
                      />
                    </div>

                    {/* Title & Action */}
                    <div className="mt-2">
                      <h4 className="font-display text-xs sm:text-sm text-ink group-hover:text-brass transition-colors truncate">
                        {prod.name}
                      </h4>
                      <p className="text-[10px] text-smoke font-light mt-0.5 truncate">
                        {prod.dimensions}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
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

      {/* Architectural CAD Blueprint Drawings & Framework */}
      <ShowroomBlueprints />
    </div>
  );
};
