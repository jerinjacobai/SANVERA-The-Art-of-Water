import React, { useState, useEffect, useRef } from 'react';
import {
  Compass,
  Maximize2,
  Minimize2,
  RotateCcw,
  Box,
  ArrowRight,
  Droplets,
  Eye,
  ChevronRight,
} from 'lucide-react';
import { SANVERA_CATALOG } from '../../data/sanveraCatalog';
import { sanveraProductToCollectionItem } from '../sections/CollectionSection';
import { ProductViewerModal } from '../three/ProductViewerModal';
import { CollectionItem } from '../../types';

export interface SpaFixture {
  id: string;
  catalogId: string;
  name: string;
  subheading: string;
  categoryName: string;
  sku: string;
  dimensions: string;
  materials: string;
  flowRate?: string;
  description: string;
  pinX: number; // % from left (0..100)
  pinY: number; // % from top (0..100)
  zoomScale: number;
  panX: number; // % translate
  panY: number; // % translate
  iconName: 'shower' | 'bath' | 'faucet' | 'vanity' | 'mirror' | 'chandelier';
  highlightArea: { x1: number; y1: number; x2: number; y2: number }; // click hitbox %
}

export const SPA_FIXTURES: SpaFixture[] = [
  {
    id: 'shower-sanctuary',
    catalogId: 'shower-5061',
    name: 'Concealed Rain Shower Sanctuary & Thermostatic Column',
    subheading: 'Series 5061 Architectural Wellness Suite',
    categoryName: 'Showers & Wellness',
    sku: 'SV-5061-SHW',
    dimensions: 'Head Ø 300mm · Arm Reach 420mm · Valve H 210mm',
    materials: 'Solid Marine-Grade Brass · Ultra-Laminar Fluid Micro-Jets',
    flowRate: '14.5 L/min @ 3.0 Bar Rain Mode',
    description:
      'Engineered flush into the warm marble ceiling with air-injected micro-droplets mimicking warm tropical rainfall, paired with precision thermostatic dual-diverter controls.',
    pinX: 12.5,
    pinY: 34,
    zoomScale: 2.7,
    panX: 34,
    panY: 18,
    iconName: 'shower',
    highlightArea: { x1: 0, y1: 0, x2: 26, y2: 80 },
  },
  {
    id: 'freestanding-bath',
    catalogId: 'bathtub-freestanding',
    name: 'Sanvera Serene Freestanding Oval Bathtub',
    subheading: 'Monolithic Composite Mineral Stone Bath',
    categoryName: 'Bathtubs & Spouts',
    sku: 'SV-BT-01-FL',
    dimensions: 'L 1780mm × W 850mm × H 570mm',
    materials: 'Sanvera Velveteen Mineral Composite · Heat Retention Core',
    description:
      'Seamless organic oval geometry cast from natural volcanic stone and mineral resin with integrated overflow and gentle ergonomic lumbar incline.',
    pinX: 49.5,
    pinY: 64,
    zoomScale: 2.3,
    panX: 0,
    panY: -16,
    iconName: 'bath',
    highlightArea: { x1: 41, y1: 52, x2: 63, y2: 78 },
  },
  {
    id: 'floor-bath-mixer',
    catalogId: 'faucet-bathtub',
    name: 'Series 664 Floor-Mounted Bath Mixer & Handset',
    subheading: 'Signature Architectural Standing Gold Spout',
    categoryName: 'Faucets & Mixers',
    sku: 'SV-664-FS01',
    dimensions: 'H 980mm · Spout Reach 240mm · Base Ø 160mm',
    materials: 'Cold-Forged Solid Brass · Brushed PVD Gold Coating',
    flowRate: '18.0 L/min @ 3.0 Bar High-Volume Tub Fill',
    description:
      'Slender floor-anchored architectural column with high-reach cascading tub spout, tactile cylindrical diverter, and cylindrical micro-spray wand.',
    pinX: 37.5,
    pinY: 59,
    zoomScale: 3.2,
    panX: 16,
    panY: -12,
    iconName: 'faucet',
    highlightArea: { x1: 34, y1: 48, x2: 41, y2: 72 },
  },
  {
    id: 'vanity-mixers',
    catalogId: 'mixer-664',
    name: 'Series 664 Gold Basin Mixers & Countertop Basins',
    subheading: 'Signature Precision Deck Mixers & Ceramic Basins',
    categoryName: 'Faucets & Mixers',
    sku: 'SV-664-BM04',
    dimensions: 'H 210mm · Spout Reach 145mm · Basin Ø 410mm',
    materials: 'Solid Cast Brass · Ceramic Disc Cartridge · Glazed Ceramic',
    flowRate: '4.8 L/min Eco-Aerated Stream',
    description:
      'Dual precision-milled gold basin faucets resting upon the dark veined marble floating console, illuminating the handcrafted ceramic vessel washbasins.',
    pinX: 83.5,
    pinY: 60,
    zoomScale: 2.7,
    panX: -34,
    panY: -12,
    iconName: 'vanity',
    highlightArea: { x1: 72, y1: 50, x2: 98, y2: 76 },
  },
  {
    id: 'ambient-mirrors',
    catalogId: 'mirror-smart',
    name: 'Aura Ambient Backlit Smart Mirrors & Sconces',
    subheading: 'Pill-Silhouette Architectural Vanity Optics',
    categoryName: 'Mirrors & Optics',
    sku: 'SV-MIR-01-AURA',
    dimensions: 'H 1100mm × W 600mm × D 38mm',
    materials: 'Copper-Free Crystal Glass · 2700K Warm LED Perimeter · Brass Bezel',
    description:
      'Capsule-contoured mirrors framed in brushed gold with diffused 360° perimeter illumination, heated demister film, and dual fluted brass wall sconces.',
    pinX: 89,
    pinY: 28,
    zoomScale: 2.4,
    panX: -36,
    panY: 22,
    iconName: 'mirror',
    highlightArea: { x1: 76, y1: 15, x2: 98, y2: 48 },
  },
  {
    id: 'crystal-chandelier',
    catalogId: 'acc-73',
    name: 'Sanvera Grand Cascading Brass & Crystal Chandelier',
    subheading: 'Architectural Ceiling Lighting Centerpiece',
    categoryName: 'Hardware & Accessories',
    sku: 'SV-ACC-CHAND-01',
    dimensions: 'Ø 950mm × H 480mm',
    materials: 'Warm Brushed Brass Rings · Precision Fluted K9 Crystal Prisms',
    description:
      'Concentric tiered crystalline chandelier projecting warm refracted golden light across the veined Italian marble sanctuary.',
    pinX: 50,
    pinY: 14,
    zoomScale: 2.2,
    panX: 0,
    panY: 34,
    iconName: 'chandelier',
    highlightArea: { x1: 38, y1: 0, x2: 62, y2: 28 },
  },
];

interface GoldenSpaShowroomProps {
  onOpenEnquiry: (productName: string) => void;
}

export const GoldenSpaShowroom: React.FC<GoldenSpaShowroomProps> = ({
  onOpenEnquiry,
}) => {
  const [activeFixture, setActiveFixture] = useState<SpaFixture | null>(null);
  const [hoveredFixture, setHoveredFixture] = useState<SpaFixture | null>(null);
  const [inspectedProduct, setInspectedProduct] = useState<CollectionItem | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHotspotPins, setShowHotspotPins] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  // Current transform properties
  const currentScale = activeFixture ? activeFixture.zoomScale : 1;
  const currentPanX = activeFixture ? activeFixture.panX : 0;
  const currentPanY = activeFixture ? activeFixture.panY : 0;

  // Zoom to fixture
  const handleSelectFixture = (fixture: SpaFixture) => {
    setActiveFixture(fixture);
    setHasInteracted(true);
  };

  // Reset to full view
  const handleResetZoom = () => {
    setActiveFixture(null);
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Listen to Escape key to zoom out
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeFixture) {
          handleResetZoom();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeFixture]);

  // Click on the sanctuary image: detect which hitbox was clicked
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageWrapperRef.current) return;
    const rect = imageWrapperRef.current.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    // If currently zoomed in, clicking background or another region
    if (activeFixture) {
      // Check if clicking another fixture
      const other = SPA_FIXTURES.find(
        (f) =>
          clickX >= f.highlightArea.x1 &&
          clickX <= f.highlightArea.x2 &&
          clickY >= f.highlightArea.y1 &&
          clickY <= f.highlightArea.y2
      );
      if (other && other.id !== activeFixture.id) {
        handleSelectFixture(other);
      } else {
        // Zoom back out to full view
        handleResetZoom();
      }
      return;
    }

    // If in full overview, check if clicked a fixture area
    const matched = SPA_FIXTURES.find(
      (f) =>
        clickX >= f.highlightArea.x1 &&
        clickX <= f.highlightArea.x2 &&
        clickY >= f.highlightArea.y1 &&
        clickY <= f.highlightArea.y2
    );

    if (matched) {
      handleSelectFixture(matched);
    }
  };

  // Inspect 3D Model Modal handler
  const handleInspect3D = (catalogId: string) => {
    const found =
      SANVERA_CATALOG.find((c) => c.id === catalogId) ||
      SANVERA_CATALOG.find((c) => c.category === 'faucets_mixers') ||
      SANVERA_CATALOG[0];
    setInspectedProduct(sanveraProductToCollectionItem(found));
  };

  return (
    <div
      ref={containerRef}
      id="showroom"
      className="relative w-full h-[100svh] min-h-[700px] max-h-[1440px] bg-[#080706] text-ink select-none overflow-hidden flex flex-col justify-between"
    >
      {/* 3D Product Inspector Modal */}
      <ProductViewerModal
        item={inspectedProduct}
        onClose={() => setInspectedProduct(null)}
        onOpenEnquiry={onOpenEnquiry}
      />

      {/* Top Sanctuary Navigation Bar */}
      <header className="relative z-30 flex items-center justify-between px-6 sm:px-10 lg:px-16 pt-20 lg:pt-24 pb-4 bg-gradient-to-b from-void/90 via-void/50 to-transparent pointer-events-auto">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 label-mono text-brass text-[10px] sm:text-xs">
              <Compass size={13} className="text-brass animate-spin-slow" />
              SANVERA SHOWROOM · GOLDEN MARBLE SPA SANCTUARY
            </span>
            <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-brass/60" />
            <span className="hidden md:inline-block text-[11px] text-smoke font-light">
              Interactive Architectural Exploration
            </span>
          </div>

          <h1 className="editorial-title text-2xl sm:text-3xl lg:text-4xl text-ink font-light mt-1 flex items-center gap-3">
            {activeFixture ? activeFixture.name : 'The Private Spa Sanctuary'}
            {activeFixture && (
              <span className="text-xs label-mono text-brass border border-brass/40 px-2.5 py-0.5 rounded-full hidden sm:inline-block">
                Zoom {activeFixture.zoomScale}× Active
              </span>
            )}
          </h1>
        </div>

        {/* Viewport Control Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {activeFixture && (
            <button
              onClick={handleResetZoom}
              className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brass/15 border border-brass/40 hover:bg-brass/25 text-ink transition-all duration-300 shadow-lg shadow-black/40"
              title="Return to full bathroom view (Escape)"
            >
              <RotateCcw size={14} className="text-brass group-hover:-rotate-90 transition-transform duration-300" />
              <span className="label-mono text-[11px] text-ink font-medium">Zoom Out (Full Spa)</span>
            </button>
          )}

          <button
            onClick={() => setShowHotspotPins(!showHotspotPins)}
            className={`p-2.5 rounded-full border transition-all duration-300 hidden sm:flex items-center justify-center ${
              showHotspotPins
                ? 'bg-void/70 border-hair text-brass'
                : 'bg-void/40 border-hair/50 text-smoke hover:text-mist'
            }`}
            title={showHotspotPins ? 'Hide Interactive Hotspot Pins' : 'Show Interactive Hotspot Pins'}
          >
            <Eye size={15} />
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2.5 rounded-full bg-void/70 border border-hair text-mist hover:text-ink hover:border-mist transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
          >
            {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>
        </div>
      </header>

      {/* Main Interactive Viewport Canvas */}
      <main className="relative flex-1 w-full h-full overflow-hidden flex items-center justify-center">
        {/* Cinematic Aspect-Ratio Container */}
        <div
          ref={imageWrapperRef}
          onClick={handleImageClick}
          className="relative w-full h-full max-w-[1920px] max-h-[1080px] aspect-[16/9] mx-auto cursor-crosshair overflow-hidden"
          style={{ touchAction: 'none' }}
        >
          {/* Transforming Photo Canvas */}
          <div
            className="absolute inset-0 w-full h-full transition-transform duration-800 ease-editorial will-change-transform"
            style={{
              transform: `translate(${currentPanX}%, ${currentPanY}%) scale(${currentScale})`,
              transformOrigin: '50% 50%',
            }}
          >
            <img
              src="/images/golden-spa-sanctuary.jpg"
              alt="Sanvera Luxury Golden Marble Spa Bathroom Sanctuary"
              className="w-full h-full object-cover object-center filter brightness-[1.02] contrast-[1.03]"
              draggable={false}
            />

            {/* Subtle luxury ambient shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30 pointer-events-none" />

            {/* Interactive Glowing Golden Hotspot Pins */}
            {showHotspotPins &&
              SPA_FIXTURES.map((f) => {
                const isActive = activeFixture?.id === f.id;
                const isHovered = hoveredFixture?.id === f.id;

                return (
                  <div
                    key={f.id}
                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300"
                    style={{
                      left: `${f.pinX}%`,
                      top: `${f.pinY}%`,
                    }}
                    onMouseEnter={() => setHoveredFixture(f)}
                    onMouseLeave={() => setHoveredFixture(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isActive) {
                        handleResetZoom();
                      } else {
                        handleSelectFixture(f);
                      }
                    }}
                  >
                    {/* Pulsing Aura Rings */}
                    <div className="relative flex items-center justify-center">
                      <span className="absolute w-8 h-8 rounded-full bg-brass/30 animate-ping opacity-75" />
                      <span className="absolute w-12 h-12 rounded-full border border-brass/25 scale-75 animate-pulse" />

                      {/* Center Golden Pin */}
                      <div
                        className={`relative z-10 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border shadow-2xl transition-all duration-300 ${
                          isActive
                            ? 'bg-brass border-white text-void scale-125 shadow-brass/80'
                            : isHovered
                            ? 'bg-brass/90 border-ink text-void scale-110 shadow-brass/50'
                            : 'bg-void/90 backdrop-blur-md border-brass/80 text-brass hover:scale-110'
                        }`}
                      >
                        <Droplets size={13} className={isActive ? 'animate-bounce' : ''} />
                      </div>
                    </div>

                    {/* Elegant Floating Hover Label */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 rounded-lg bg-void/95 backdrop-blur-xl border border-hair text-center whitespace-nowrap shadow-2xl pointer-events-none transition-all duration-300 ${
                        isHovered || isActive
                          ? 'opacity-100 translate-y-0 scale-100'
                          : 'opacity-0 translate-y-1 scale-95 pointer-events-none'
                      }`}
                    >
                      <p className="label-mono text-[9px] text-brass uppercase">{f.categoryName}</p>
                      <p className="editorial-title text-xs sm:text-sm text-ink font-light mt-0.5">{f.name}</p>
                      <p className="label-mono text-[8px] text-smoke mt-0.5">Click to zoom in ({f.zoomScale}×)</p>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* First-time prompt banner */}
          {!hasInteracted && !activeFixture && (
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <div className="px-4 py-2 rounded-full bg-void/80 backdrop-blur-md border border-brass/40 text-center shadow-2xl animate-pulse">
                <span className="label-mono text-[10px] text-brass tracking-wider">
                  ✦ Click any fixture inside the bathroom or select from below to zoom in
                </span>
              </div>
            </div>
          )}

          {/* Floating Architectural Fixture Card (Appears in Zoomed Mode) */}
          {activeFixture && (
            <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-30 max-w-sm sm:max-w-md w-full bg-void/92 backdrop-blur-2xl border border-brass/30 rounded-2xl p-6 shadow-2xl text-ink transition-all duration-500 ease-editorial animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-hair">
                <span className="label-mono text-brass text-[10px] uppercase tracking-widest2">
                  {activeFixture.categoryName} · {activeFixture.sku}
                </span>
                <span className="label-mono text-[10px] text-smoke">
                  Zoom {activeFixture.zoomScale}×
                </span>
              </div>

              <h3 className="editorial-title text-xl sm:text-2xl text-ink font-light mt-3 leading-snug">
                {activeFixture.name}
              </h3>
              <p className="text-xs text-smoke font-light mt-1.5 leading-relaxed">
                {activeFixture.description}
              </p>

              {/* Specifications Pills */}
              <div className="mt-4 pt-3 border-t border-hair/60 space-y-1.5 text-xs font-light">
                <div className="flex items-start justify-between text-[11px]">
                  <span className="text-smoke">Materials:</span>
                  <span className="text-mist text-right font-normal">{activeFixture.materials}</span>
                </div>
                <div className="flex items-start justify-between text-[11px]">
                  <span className="text-smoke">Dimensions:</span>
                  <span className="text-mist text-right font-normal">{activeFixture.dimensions}</span>
                </div>
                {activeFixture.flowRate && (
                  <div className="flex items-start justify-between text-[11px]">
                    <span className="text-smoke">Hydraulic Flow:</span>
                    <span className="text-brass text-right font-normal">{activeFixture.flowRate}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-5 grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => handleInspect3D(activeFixture.catalogId)}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-brass text-void hover:bg-brass-light font-medium transition-colors shadow-lg shadow-brass/20 text-xs"
                >
                  <Box size={14} />
                  <span>Inspect 3D Twin</span>
                </button>

                <button
                  onClick={() => onOpenEnquiry(activeFixture.name)}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-void/80 border border-hair hover:border-ink text-ink transition-colors text-xs font-light"
                >
                  <span>Enquire Spec</span>
                  <ArrowRight size={13} className="text-brass" />
                </button>
              </div>

              <button
                onClick={handleResetZoom}
                className="mt-3 w-full py-2 text-center label-mono text-[10px] text-smoke hover:text-ink transition-colors"
              >
                ← Return to Full Spa Sanctuary View
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Luxury Fixture Quick-Select Dock */}
      <footer className="relative z-30 px-4 sm:px-8 lg:px-16 pb-6 pt-3 bg-gradient-to-t from-void/95 via-void/70 to-transparent pointer-events-auto">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Quick-Select Fixture Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {/* Full View Reset Button */}
            <button
              onClick={handleResetZoom}
              className={`px-3.5 py-2 rounded-xl border text-xs whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                !activeFixture
                  ? 'bg-brass text-void border-brass font-medium shadow-lg shadow-brass/20'
                  : 'bg-void/80 border-hair text-mist hover:text-ink hover:border-mist'
              }`}
            >
              <RotateCcw size={12} className={!activeFixture ? 'text-void' : 'text-smoke'} />
              <span>Full Sanctuary (100%)</span>
            </button>

            {/* Individual Fixture Selector Pills */}
            {SPA_FIXTURES.map((f) => {
              const isSelected = activeFixture?.id === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => handleSelectFixture(f)}
                  className={`px-3.5 py-2 rounded-xl border text-xs whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                    isSelected
                      ? 'bg-brass text-void border-brass font-medium shadow-lg shadow-brass/30'
                      : 'bg-void/80 border-hair text-mist hover:text-ink hover:border-mist'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isSelected ? 'bg-void' : 'bg-brass'
                    }`}
                  />
                  <span>{f.name.split('&')[0].trim()}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Info & 3D Catalogue Gateway */}
          <div className="hidden lg:flex items-center gap-6 text-xs text-smoke font-light">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="label-mono text-[10px] text-mist">6 Live Interactive Points</span>
            </div>
            <a
              href="#collection"
              className="label-mono text-[10px] text-brass hover:text-ink transition-colors flex items-center gap-1.5 border-b border-brass/40 pb-0.5"
            >
              <span>View Full 34-Product Catalogue</span>
              <ChevronRight size={12} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
