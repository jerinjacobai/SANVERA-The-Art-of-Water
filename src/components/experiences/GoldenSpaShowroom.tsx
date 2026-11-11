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
import { SanveraLogo } from '../common/SanveraLogo';
import { SANVERA_CATALOG } from '../../data/sanveraCatalog';
import { sanveraProductToCollectionItem } from '../sections/CollectionSection';
import { ProductViewerModal } from '../three/ProductViewerModal';
import { CollectionItem } from '../../types';

export interface SpaFixture {
  id: string;
  catalogId: string;
  studioImage: string;
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
  highlightArea: { x1: number; y1: number; x2: number; y2: number };
}

export const SPA_FIXTURES: SpaFixture[] = [
  {
    id: 'shower-sanctuary',
    catalogId: 'shower-5061',
    studioImage: '/catalog/shower-5061.png',
    name: 'Concealed Rain Shower Sanctuary & Thermostatic Column',
    subheading: 'Series 5061 Architectural Wellness Suite',
    categoryName: 'Showers & Wellness',
    sku: 'SV-5061-SHW',
    dimensions: 'Head Ø 300mm · Arm Reach 420mm · Valve H 210mm',
    materials: 'Solid Marine-Grade Brass · Ultra-Laminar Fluid Micro-Jets',
    flowRate: '14.5 L/min @ 3.0 Bar Rain Mode',
    description:
      'Flush ceiling rainhead with air-injected micro-droplets mimicking warm tropical rainfall, paired with precision thermostatic dual-diverter controls.',
    pinX: 12.5,
    pinY: 34,
    zoomScale: 1.45,
    panX: 20,
    panY: 8,
    highlightArea: { x1: 0, y1: 0, x2: 26, y2: 80 },
  },
  {
    id: 'freestanding-bath',
    catalogId: 'bathtub-freestanding',
    studioImage: '/catalog/bathtub-freestanding-oval.jpg',
    name: 'Sanvera Serene Freestanding Oval Bathtub',
    subheading: 'Monolithic Composite Mineral Stone Bath',
    categoryName: 'Bathtubs & Spouts',
    sku: 'SV-BT-01-FL',
    dimensions: 'L 1780mm × W 850mm × H 570mm',
    materials: 'Sanvera Velveteen Mineral Composite · Heat Retention Core',
    description:
      'Seamless organic oval geometry cast from natural volcanic mineral composite with integrated concealed overflow and gentle lumbar incline.',
    pinX: 49.5,
    pinY: 64,
    zoomScale: 1.4,
    panX: 0,
    panY: -10,
    highlightArea: { x1: 41, y1: 52, x2: 63, y2: 78 },
  },
  {
    id: 'floor-bath-mixer',
    catalogId: 'faucet-bathtub',
    studioImage: '/catalog/faucet-bathtub-handshower.jpg',
    name: 'Series 664 Floor-Mounted Bath Mixer & Handset',
    subheading: 'Signature Architectural Standing Gold Spout',
    categoryName: 'Faucets & Mixers',
    sku: 'SV-664-FS01',
    dimensions: 'H 980mm · Spout Reach 240mm · Base Ø 160mm',
    materials: 'Cold-Forged Solid Brass · Warm Brushed PVD Gold',
    flowRate: '18.0 L/min @ 3.0 Bar High-Volume Tub Fill',
    description:
      'Slender floor-anchored architectural column with high-reach cascading tub spout, tactile cylindrical diverter, and cylindrical micro-spray wand.',
    pinX: 37.5,
    pinY: 59,
    zoomScale: 1.48,
    panX: 10,
    panY: -8,
    highlightArea: { x1: 34, y1: 48, x2: 41, y2: 72 },
  },
  {
    id: 'vanity-mixers',
    catalogId: 'mixer-664',
    studioImage: '/catalog/mixer-664.jpg',
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
    zoomScale: 1.45,
    panX: -20,
    panY: -8,
    highlightArea: { x1: 72, y1: 50, x2: 98, y2: 76 },
  },
  {
    id: 'ambient-mirrors',
    catalogId: 'mirror-smart',
    studioImage: '/catalog/mirror-smart-ambient.jpg',
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
    zoomScale: 1.42,
    panX: -22,
    panY: 10,
    highlightArea: { x1: 76, y1: 15, x2: 98, y2: 48 },
  },
  {
    id: 'crystal-chandelier',
    catalogId: 'acc-73',
    studioImage: '/catalog/accessory-series73.jpg',
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
    zoomScale: 1.35,
    panX: 0,
    panY: 14,
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

  // Current transform properties (refined subtle zoom keeps image 100% sharp)
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
      if (e.key === 'Escape' && activeFixture) {
        handleResetZoom();
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

    if (activeFixture) {
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
        handleResetZoom();
      }
      return;
    }

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
      className="relative w-full h-[100svh] min-h-[720px] max-h-[1440px] bg-gradient-to-b from-[#18130e] via-[#211a13] to-[#120e0a] text-[#fbf8f3] select-none overflow-hidden flex flex-col justify-between"
    >
      {/* Warm Ambient Golden Chandelier & Sconce Lighting Radiance */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.18),transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_30%,rgba(224,186,114,0.12),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_40%,rgba(197,160,89,0.12),transparent_50%)] pointer-events-none" />

      {/* 3D Product Inspector Modal */}
      <ProductViewerModal
        item={inspectedProduct}
        onClose={() => setInspectedProduct(null)}
        onOpenEnquiry={onOpenEnquiry}
      />

      {/* Top Sanctuary Navigation Bar with Proud Sanvera Logo */}
      <header className="relative z-30 flex items-center justify-between px-6 sm:px-10 lg:px-16 pt-20 lg:pt-24 pb-4 bg-gradient-to-b from-[#16120e]/95 via-[#16120e]/60 to-transparent pointer-events-auto">
        {/* Brand Plaque & Active Room Title */}
        <div className="flex items-center gap-5 sm:gap-6">
          <a
            href="#hero"
            className="group flex flex-col items-center transition-all duration-300 hover:scale-105"
            aria-label="Sanvera — Return to top"
          >
            <SanveraLogo
              className="h-10 sm:h-12 lg:h-[52px] w-auto drop-shadow-[0_4px_18px_rgba(212,175,55,0.45)]"
              variant="gold"
              showSubtitle
            />
          </a>

          <div className="h-11 w-px bg-[#c5a059]/30 hidden sm:block" />

          <div className="flex flex-col">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 label-mono text-[#d4af37] text-[10px] sm:text-xs tracking-widest uppercase font-medium">
                <Compass size={13} className="text-[#d4af37]" />
                SHOWROOM · GOLDEN MARBLE SANCTUARY
              </span>
              <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
              <span className="hidden md:inline-block text-[11px] text-[#c7bcab] font-light">
                Interactive Architectural Fixture Exploration
              </span>
            </div>

            <h1 className="editorial-title text-xl sm:text-2xl lg:text-3xl text-[#fdfbf7] font-light mt-0.5 flex items-center gap-3">
              {activeFixture ? activeFixture.name : 'The Private Spa Sanctuary'}
              {activeFixture && (
                <span className="text-[10px] label-mono text-[#d4af37] border border-[#c5a059]/50 bg-[#d4af37]/10 px-2.5 py-0.5 rounded-full hidden sm:inline-block font-normal">
                  Focused Spec View
                </span>
              )}
            </h1>
          </div>
        </div>

        {/* Viewport Control Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {activeFixture && (
            <button
              onClick={handleResetZoom}
              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c572] to-[#b88c2b] text-[#1a140c] font-semibold transition-all duration-300 shadow-lg shadow-[#d4af37]/25 hover:shadow-[#d4af37]/45 hover:scale-105"
              title="Return to full bathroom view (Escape)"
            >
              <RotateCcw size={14} className="text-[#1a140c] group-hover:-rotate-90 transition-transform duration-300" />
              <span className="label-mono text-[11px]">Full Room (100%)</span>
            </button>
          )}

          <button
            onClick={() => setShowHotspotPins(!showHotspotPins)}
            className={`p-2.5 rounded-full border transition-all duration-300 hidden sm:flex items-center justify-center ${
              showHotspotPins
                ? 'bg-[#221b14]/90 border-[#c5a059]/60 text-[#d4af37] shadow-lg shadow-black/40'
                : 'bg-[#18130e]/60 border-[#c5a059]/20 text-[#9e9080] hover:text-[#d4af37]'
            }`}
            title={showHotspotPins ? 'Hide Interactive Hotspot Pins' : 'Show Interactive Hotspot Pins'}
          >
            <Eye size={16} />
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2.5 rounded-full bg-[#221b14]/90 border border-[#c5a059]/35 text-[#d8cfc4] hover:text-[#fdfbf7] hover:border-[#d4af37] transition-all shadow-lg shadow-black/40"
            title={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </header>

      {/* Main Interactive Viewport Canvas */}
      <main className="relative flex-1 w-full h-full overflow-hidden flex items-center justify-center">
        {/* Cinematic Aspect-Ratio Container */}
        <div
          ref={imageWrapperRef}
          onClick={handleImageClick}
          className="relative w-full h-full max-w-[1920px] max-h-[1080px] aspect-[16/9] mx-auto cursor-crosshair overflow-hidden rounded-xl shadow-[0_20px_80px_rgba(0,0,0,0.8)] border border-[#c5a059]/20"
          style={{ touchAction: 'none' }}
        >
          {/* Transforming Photo Canvas - using hardware acceleration and crisp contrast */}
          <div
            className="absolute inset-0 w-full h-full transition-transform duration-800 ease-editorial will-change-transform"
            style={{
              transform: `translate3d(${currentPanX}%, ${currentPanY}%, 0) scale(${currentScale})`,
              transformOrigin: '50% 50%',
            }}
          >
            <img
              src="/images/golden-spa-sanctuary.jpg"
              alt="Sanvera Luxury Golden Marble Spa Bathroom Sanctuary"
              className="w-full h-full object-cover object-center filter brightness-[1.03] contrast-[1.04]"
              style={{
                imageRendering: '-webkit-optimize-contrast',
                backfaceVisibility: 'hidden',
              }}
              draggable={false}
            />

            {/* Warm Golden Spa Light Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#14100c]/60 via-transparent to-[#14100c]/40 pointer-events-none" />

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
                      <span className="absolute w-10 h-10 rounded-full bg-[#d4af37]/35 animate-ping opacity-75" />
                      <span className="absolute w-14 h-14 rounded-full border border-[#d4af37]/40 scale-75 animate-pulse" />

                      {/* Center Golden Pin */}
                      <div
                        className={`relative z-10 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border shadow-2xl transition-all duration-300 ${
                          isActive
                            ? 'bg-gradient-to-tr from-[#d4af37] to-[#fae0a5] border-white text-[#19130c] scale-125 shadow-[0_0_25px_rgba(212,175,55,0.9)]'
                            : isHovered
                            ? 'bg-gradient-to-tr from-[#c5a059] to-[#fae0a5] border-[#fbf8f3] text-[#19130c] scale-115 shadow-[0_0_20px_rgba(212,175,55,0.7)]'
                            : 'bg-[#221b14]/90 backdrop-blur-md border-[#d4af37] text-[#d4af37] hover:scale-110 shadow-lg shadow-black/80'
                        }`}
                      >
                        <Droplets size={14} className={isActive ? 'animate-bounce' : ''} />
                      </div>
                    </div>

                    {/* Elegant Floating Hover Label */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 mt-2 px-3.5 py-2 rounded-xl bg-[#1d1610]/95 backdrop-blur-2xl border border-[#c5a059]/50 text-center whitespace-nowrap shadow-[0_15px_40px_rgba(0,0,0,0.85)] pointer-events-none transition-all duration-300 ${
                        isHovered || isActive
                          ? 'opacity-100 translate-y-0 scale-100'
                          : 'opacity-0 translate-y-1 scale-95 pointer-events-none'
                      }`}
                    >
                      <p className="label-mono text-[9px] text-[#d4af37] uppercase font-medium">{f.categoryName}</p>
                      <p className="editorial-title text-xs sm:text-sm text-[#fdfbf7] font-light mt-0.5">{f.name}</p>
                      <p className="label-mono text-[8px] text-[#c5a059] mt-0.5">Click to inspect fixture details</p>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* First-time prompt banner */}
          {!hasInteracted && !activeFixture && (
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <div className="px-5 py-2.5 rounded-full bg-[#1e1711]/90 backdrop-blur-xl border border-[#d4af37]/60 text-center shadow-[0_10px_35px_rgba(0,0,0,0.8)] animate-pulse">
                <span className="label-mono text-[11px] text-[#f4dfa7] tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-ping" />
                  Click any fixture inside the bathroom or select from the dock below to inspect
                </span>
              </div>
            </div>
          )}

          {/* Floating Architectural Fixture Card with Razor-Sharp Studio Archive Photo */}
          {activeFixture && (
            <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-30 max-w-sm sm:max-w-md w-full bg-[#1e1711]/95 backdrop-blur-2xl border border-[#c5a059]/40 rounded-2xl p-5 sm:p-6 shadow-[0_30px_70px_rgba(0,0,0,0.85)] text-[#fbf8f3] transition-all duration-500 ease-editorial animate-fadeIn">
              {/* Category Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#c5a059]/20">
                <span className="label-mono text-[#d4af37] text-[10px] uppercase tracking-widest2 font-medium">
                  {activeFixture.categoryName} · {activeFixture.sku}
                </span>
                <span className="label-mono text-[10px] text-[#b0a495]">
                  Architectural Spec
                </span>
              </div>

              {/* High-Resolution Studio Photography Twin Showcase */}
              <div className="mt-3 relative rounded-xl overflow-hidden border border-[#c5a059]/30 bg-gradient-to-b from-[#2a2016]/90 to-[#17120d]/90 p-3 group">
                <div className="h-36 sm:h-40 w-full flex items-center justify-center overflow-hidden">
                  <img
                    src={activeFixture.studioImage}
                    alt={activeFixture.name}
                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#16110c]/80 backdrop-blur-md border border-[#c5a059]/30 text-[9px] label-mono text-[#e5c572]">
                  ✦ 4K Studio Twin Archive
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="editorial-title text-lg sm:text-xl text-[#fdfbf7] font-light mt-3 leading-snug">
                {activeFixture.name}
              </h3>
              <p className="text-xs text-[#c7bcab] font-light mt-1.5 leading-relaxed line-clamp-2">
                {activeFixture.description}
              </p>

              {/* Specifications Pills */}
              <div className="mt-3.5 pt-3 border-t border-[#c5a059]/20 space-y-1.5 text-xs font-light">
                <div className="flex items-start justify-between text-[11px]">
                  <span className="text-[#a49887]">Materials:</span>
                  <span className="text-[#e2dacd] text-right font-normal">{activeFixture.materials}</span>
                </div>
                <div className="flex items-start justify-between text-[11px]">
                  <span className="text-[#a49887]">Dimensions:</span>
                  <span className="text-[#e2dacd] text-right font-normal">{activeFixture.dimensions}</span>
                </div>
                {activeFixture.flowRate && (
                  <div className="flex items-start justify-between text-[11px]">
                    <span className="text-[#a49887]">Hydraulic Flow:</span>
                    <span className="text-[#d4af37] text-right font-medium">{activeFixture.flowRate}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-4 grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => handleInspect3D(activeFixture.catalogId)}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#e5c572] to-[#b88c2b] text-[#19130c] font-semibold transition-all shadow-lg shadow-[#d4af37]/25 hover:shadow-[#d4af37]/45 text-xs"
                >
                  <Box size={14} />
                  <span>Inspect 3D Twin</span>
                </button>

                <button
                  onClick={() => onOpenEnquiry(activeFixture.name)}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-[#271e16] border border-[#c5a059]/40 hover:border-[#d4af37] text-[#fdfbf7] transition-all text-xs font-light shadow-md"
                >
                  <span>Enquire Spec</span>
                  <ArrowRight size={13} className="text-[#d4af37]" />
                </button>
              </div>

              <button
                onClick={handleResetZoom}
                className="mt-2.5 w-full py-1.5 text-center label-mono text-[10px] text-[#b0a495] hover:text-[#d4af37] transition-colors"
              >
                ← Return to Full Spa Sanctuary View
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Luxury Fixture Quick-Select Dock in Warm Gold & Travertine Bronze */}
      <footer className="relative z-30 px-4 sm:px-8 lg:px-16 pb-6 pt-3 bg-gradient-to-t from-[#15110c]/98 via-[#18130e]/80 to-transparent pointer-events-auto">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Quick-Select Fixture Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {/* Full View Reset Button */}
            <button
              onClick={handleResetZoom}
              className={`px-4 py-2.5 rounded-xl border text-xs whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                !activeFixture
                  ? 'bg-gradient-to-r from-[#d4af37] via-[#e5c572] to-[#b88c2b] text-[#19130c] font-semibold shadow-lg shadow-[#d4af37]/35 border-transparent'
                  : 'bg-[#221b14]/85 border-[#c5a059]/30 text-[#ded4c5] hover:border-[#d4af37] hover:text-[#fff]'
              }`}
            >
              <RotateCcw size={13} className={!activeFixture ? 'text-[#19130c]' : 'text-[#c5a059]'} />
              <span>Full Sanctuary (100%)</span>
            </button>

            {/* Individual Fixture Selector Pills */}
            {SPA_FIXTURES.map((f) => {
              const isSelected = activeFixture?.id === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => handleSelectFixture(f)}
                  className={`px-4 py-2.5 rounded-xl border text-xs whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#d4af37] via-[#e5c572] to-[#b88c2b] text-[#19130c] font-semibold shadow-lg shadow-[#d4af37]/35 border-transparent'
                      : 'bg-[#221b14]/85 border-[#c5a059]/30 text-[#ded4c5] hover:border-[#d4af37] hover:text-[#fff]'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isSelected ? 'bg-[#19130c]' : 'bg-[#d4af37]'
                    }`}
                  />
                  <span>{f.name.split('&')[0].trim()}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Info & 3D Catalogue Gateway */}
          <div className="hidden lg:flex items-center gap-6 text-xs text-[#b0a495] font-light">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
              <span className="label-mono text-[10px] text-[#ded4c5]">6 Live Interactive Points</span>
            </div>
            <a
              href="#collection"
              className="label-mono text-[10px] text-[#d4af37] hover:text-white transition-colors flex items-center gap-1.5 border-b border-[#c5a059]/40 pb-0.5"
            >
              <span>Explore Complete 34-Product Catalogue</span>
              <ChevronRight size={13} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
