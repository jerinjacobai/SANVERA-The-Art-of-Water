import React, { useState, useEffect, useRef } from 'react';
import {
  Maximize2,
  Minimize2,
  RotateCcw,
  Box,
  ArrowRight,
  Eye,
  Sparkles,
  X,
  ChevronDown,
} from 'lucide-react';
import { SpaShowroom3DScene, SANCTUARY_WAYPOINTS } from './SpaShowroom3DScene';
import { SANVERA_CATALOG } from '../../data/sanveraCatalog';
import { sanveraProductToCollectionItem } from '../sections/CollectionSection';
import { ProductViewerModal } from '../three/ProductViewerModal';
import { CollectionItem, ProductFinish } from '../../types';
import { FINISH_OPTIONS } from '../../data/finishes';

export interface SpaFixtureInfo {
  id: string;
  catalogId: string;
  studioImage: string;
  name: string;
  shortName: string;
  subheading: string;
  categoryName: string;
  sku: string;
  dimensions: string;
  materials: string;
  flowRate?: string;
  description: string;
}

export const SPA_FIXTURES_INFO: SpaFixtureInfo[] = [
  {
    id: 'shower-sanctuary',
    catalogId: 'shower-5061',
    studioImage: '/catalog/shower-5061.png',
    name: 'Concealed Rain Shower Sanctuary & Thermostatic Column',
    shortName: 'Rain Shower',
    subheading: 'Series 5061 Architectural Wellness Suite',
    categoryName: 'Showers & Wellness',
    sku: 'SV-5061-SHW',
    dimensions: 'Head Ø 300mm · Arm Reach 420mm · Valve H 210mm',
    materials: 'Solid Marine-Grade Brass · Ultra-Laminar Fluid Micro-Jets',
    flowRate: '14.5 L/min @ 3.0 Bar Rain Mode',
    description:
      'Engineered flush into the marble ceiling with air-injected micro-droplets mimicking warm tropical rainfall, paired with precision thermostatic dual-diverter controls.',
  },
  {
    id: 'freestanding-bath',
    catalogId: 'bathtub-freestanding',
    studioImage: '/catalog/bathtub-freestanding-oval.jpg',
    name: 'Sanvera Serene Freestanding Oval Bathtub',
    shortName: 'Oval Bathtub',
    subheading: 'Monolithic Composite Mineral Stone Bath',
    categoryName: 'Bathtubs & Spouts',
    sku: 'SV-BT-01-FL',
    dimensions: 'L 1780mm × W 850mm × H 570mm',
    materials: 'Sanvera Velveteen Mineral Composite · Heat Retention Core',
    description:
      'Seamless organic oval geometry cast from natural volcanic mineral composite with integrated concealed overflow and gentle ergonomic lumbar incline.',
  },
  {
    id: 'floor-bath-mixer',
    catalogId: 'faucet-bathtub',
    studioImage: '/catalog/faucet-bathtub-handshower.jpg',
    name: 'Series 664 Floor-Mounted Bath Mixer & Handset',
    shortName: 'Floor Mixer',
    subheading: 'Signature Architectural Standing Gold Spout',
    categoryName: 'Faucets & Mixers',
    sku: 'SV-664-FS01',
    dimensions: 'H 980mm · Spout Reach 240mm · Base Ø 160mm',
    materials: 'Cold-Forged Solid Brass · Warm Brushed PVD Gold Coating',
    flowRate: '18.0 L/min @ 3.0 Bar High-Volume Tub Fill',
    description:
      'Slender floor-anchored architectural column with high-reach cascading tub spout, tactile cylindrical diverter, and cylindrical micro-spray wand.',
  },
  {
    id: 'vanity-mixers',
    catalogId: 'mixer-664',
    studioImage: '/catalog/mixer-664.jpg',
    name: 'Series 664 Gold Basin Mixers & Countertop Basins',
    shortName: 'Basin Mixers',
    subheading: 'Signature Precision Deck Mixers & Ceramic Basins',
    categoryName: 'Faucets & Mixers',
    sku: 'SV-664-BM04',
    dimensions: 'H 210mm · Spout Reach 145mm · Basin Ø 410mm',
    materials: 'Solid Cast Brass · Ceramic Disc Cartridge · Glazed Ceramic',
    flowRate: '4.8 L/min Eco-Aerated Stream',
    description:
      'Dual precision-milled gold basin faucets resting upon the dark veined marble floating console, illuminating the handcrafted ceramic vessel washbasins.',
  },
  {
    id: 'ambient-mirrors',
    catalogId: 'mirror-smart',
    studioImage: '/catalog/mirror-smart-ambient.jpg',
    name: 'Aura Ambient Backlit Smart Mirrors & Sconces',
    shortName: 'Aura Mirrors',
    subheading: 'Pill-Silhouette Architectural Vanity Optics',
    categoryName: 'Mirrors & Optics',
    sku: 'SV-MIR-01-AURA',
    dimensions: 'H 1100mm × W 600mm × D 38mm',
    materials: 'Copper-Free Crystal Glass · 2700K Warm LED Perimeter · Brass Bezel',
    description:
      'Capsule-contoured mirrors framed in brushed gold with diffused 360° perimeter illumination, heated demister film, and dual fluted brass wall sconces.',
  },
  {
    id: 'crystal-chandelier',
    catalogId: 'acc-73',
    studioImage: '/catalog/accessory-series73.jpg',
    name: 'Sanvera Grand Cascading Brass & Crystal Chandelier',
    shortName: 'Chandelier',
    subheading: 'Architectural Ceiling Lighting Centerpiece',
    categoryName: 'Hardware & Accessories',
    sku: 'SV-ACC-CHAND-01',
    dimensions: 'Ø 950mm × H 480mm',
    materials: 'Warm Brushed Brass Rings · Precision Fluted K9 Crystal Prisms',
    description:
      'Concentric tiered crystalline chandelier projecting warm refracted golden light across the veined Italian marble sanctuary.',
  },
];

interface GoldenSpaShowroomProps {
  onOpenEnquiry: (productName: string) => void;
}

export const GoldenSpaShowroom: React.FC<GoldenSpaShowroomProps> = ({
  onOpenEnquiry,
}) => {
  const [activeWaypointId, setActiveWaypointId] = useState<string>('portal');
  const [activeFinish, setActiveFinish] = useState<ProductFinish>('brushed_brass');
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [inspectedProduct, setInspectedProduct] = useState<CollectionItem | null>(null);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [isSpecDrawerOpen, setIsSpecDrawerOpen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const activeWaypoint =
    SANCTUARY_WAYPOINTS.find((w) => w.id === activeWaypointId) || SANCTUARY_WAYPOINTS[0];

  // Resolve associated fixture info if at a specific fixture waypoint
  const activeFixtureInfo =
    SPA_FIXTURES_INFO.find((f) => f.id === activeWaypoint.fixtureId || f.id === activeWaypoint.id) || null;

  // Walk to waypoint
  const handleSelectWaypoint = (id: string) => {
    setActiveWaypointId(id);
    setHasInteracted(true);
    // Keep drawer closed by default so view is 100% unobstructed (client request: "can u hide for now?")
    setIsSpecDrawerOpen(false);
  };

  // Reset to full sanctuary entrance
  const handleResetZoom = () => {
    setActiveWaypointId('portal');
    setIsSpecDrawerOpen(false);
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
        if (isSpecDrawerOpen) {
          setIsSpecDrawerOpen(false);
        } else if (activeWaypointId !== 'portal') {
          handleResetZoom();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeWaypointId, isSpecDrawerOpen]);

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
      className="relative w-full h-[100svh] min-h-[700px] max-h-[1440px] bg-[#031a1e] text-[#f8fafc] select-none overflow-hidden"
    >
      {/* 3D Product Inspector Modal */}
      <ProductViewerModal
        item={inspectedProduct}
        onClose={() => setInspectedProduct(null)}
        onOpenEnquiry={onOpenEnquiry}
      />

      {/* Floating Sanctuary Breadcrumb (Top Left) */}
      <div className="absolute top-24 sm:top-28 left-6 sm:left-10 lg:left-16 z-30 flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#062429]/90 backdrop-blur-xl border border-[#00808c]/40 shadow-xl pointer-events-auto">
        <span className="w-2 h-2 rounded-full bg-[#00c2d3] animate-pulse shadow-[0_0_8px_#00c2d3]" />
        <span className="label-mono text-[10px] sm:text-[11px] text-[#00c2d3] tracking-widest uppercase font-semibold">
          3D SHOWROOM
        </span>
        <span className="text-[#00808c]/60">·</span>
        <span className="editorial-title text-xs sm:text-sm text-white font-light">
          {activeWaypoint.name}
        </span>
      </div>

      {/* Viewport Control Actions (Top Right) */}
      <div className="absolute top-24 sm:top-28 right-6 sm:right-10 lg:right-16 z-30 flex items-center gap-2 sm:gap-2.5 pointer-events-auto">
        {activeWaypointId !== 'portal' && (
          <button
            onClick={handleResetZoom}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c572] to-[#b88c2b] text-[#041c20] font-semibold text-xs transition-all shadow-lg shadow-[#d4af37]/25 hover:scale-105 cursor-pointer"
            title="Return to grand entrance portal (Escape)"
          >
            <RotateCcw size={13} className="text-[#041c20]" />
            <span className="label-mono text-[10px]">Overview (Esc)</span>
          </button>
        )}

        <button
          onClick={() => setShowHotspots(!showHotspots)}
          className={`p-2 rounded-full border transition-all text-xs flex items-center justify-center cursor-pointer ${
            showHotspots
              ? 'bg-[#062429]/90 border-[#00c2d3]/60 text-[#00c2d3] shadow-md shadow-black/40'
              : 'bg-[#062429]/60 border-[#00808c]/30 text-[#789fa2] hover:text-[#00c2d3]'
          }`}
          title={showHotspots ? 'Hide Hotspots' : 'Show Hotspots'}
        >
          <Eye size={15} />
        </button>

        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-full bg-[#062429]/90 border border-[#00808c]/40 text-[#f8fafc] hover:text-white hover:border-[#00c2d3] transition-all shadow-md shadow-black/40 cursor-pointer"
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        >
          {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
        </button>
      </div>

      {/* Main Full-Bleed Edge-to-Edge 3D WebGL Canvas */}
      <div className="absolute inset-0 w-full h-full">
        <SpaShowroom3DScene
          activeWaypointId={activeWaypointId}
          onSelectWaypoint={handleSelectWaypoint}
          onResetZoom={handleResetZoom}
          showHotspots={showHotspots}
          activeFinish={activeFinish}
        />
      </div>

      {/* First-time exploration guidance */}
      {!hasInteracted && activeWaypointId === 'portal' && (
        <div className="absolute top-36 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <div className="px-5 py-2 rounded-full bg-[#062429]/92 backdrop-blur-xl border border-[#00c2d3]/40 text-center shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
            <span className="label-mono text-[10px] sm:text-[11px] text-[#f5df9a] tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00c2d3] animate-ping" />
              Drag anywhere to look around · Click fixtures or dock below to zoom in
            </span>
          </div>
        </div>
      )}

      {/* Minimal Floating Fixture Badge (Unobtrusive - client requested clean view: "can u hide for now?") */}
      {activeFixtureInfo && (
        <div className="absolute top-36 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#062429]/92 backdrop-blur-xl border border-[#00808c]/50 shadow-2xl pointer-events-auto animate-fadeIn max-w-[92vw]">
          <span className="w-2 h-2 rounded-full bg-[#00c2d3] animate-pulse" />
          <span className="editorial-title text-xs sm:text-sm text-white font-light truncate max-w-[200px] sm:max-w-[340px]">
            {activeFixtureInfo.name}
          </span>
          <div className="flex items-center gap-1.5 pl-2 border-l border-[#00808c]/40">
            <button
              onClick={() => setIsSpecDrawerOpen(!isSpecDrawerOpen)}
              className="px-3 py-1 rounded-full bg-[#00808c]/30 hover:bg-[#00808c]/60 border border-[#00c2d3]/50 text-[10px] label-mono text-[#00c2d3] hover:text-white transition-all cursor-pointer font-medium"
            >
              {isSpecDrawerOpen ? 'Hide Spec' : 'View Spec'}
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1 rounded-full text-[#789fa2] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Return to Grand Portal (Escape)"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Architectural Fixture Spec Card (Slides in ONLY when user clicks 'View Spec') */}
      {activeFixtureInfo && isSpecDrawerOpen && (
        <div className="absolute top-28 sm:top-28 right-6 sm:right-10 z-40 max-w-[350px] sm:max-w-[390px] w-full bg-[#062429]/95 backdrop-blur-2xl border border-[#00808c]/50 rounded-2xl p-5 shadow-[0_25px_60px_rgba(0,0,0,0.85)] text-[#f8fafc] transition-all duration-300 pointer-events-auto animate-fadeIn">
          {/* Category Header with Close Button */}
          <div className="flex items-center justify-between pb-3 border-b border-[#00808c]/30">
            <span className="label-mono text-[#00c2d3] text-[10px] uppercase tracking-wider font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00c2d3] animate-ping" />
              {activeFixtureInfo.categoryName} · {activeFixtureInfo.sku}
            </span>
            <button
              onClick={() => setIsSpecDrawerOpen(false)}
              className="p-1 rounded-full text-[#789fa2] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Close Spec"
            >
              <X size={15} />
            </button>
          </div>

          {/* 4K Studio Photography Showcase */}
          <div className="mt-3 relative rounded-xl overflow-hidden border border-[#00808c]/30 bg-gradient-to-b from-[#093138]/90 to-[#031a1e]/90 p-3 group">
            <div className="h-32 sm:h-36 w-full flex items-center justify-center overflow-hidden">
              <img
                src={activeFixtureInfo.studioImage}
                alt={activeFixtureInfo.name}
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#041c20]/85 backdrop-blur-md border border-[#00808c]/30 text-[9px] label-mono text-[#d4af37] flex items-center gap-1">
              <Sparkles size={9} className="text-[#d4af37]" />
              <span>4K Architectural Twin</span>
            </div>
          </div>

          {/* Fixture Title & Description */}
          <div className="mt-3">
            <h2 className="editorial-title text-base sm:text-lg text-white font-light leading-snug">
              {activeFixtureInfo.name}
            </h2>
            <p className="text-[11px] text-[#c0dcdd] font-light mt-1 line-clamp-2 leading-relaxed">
              {activeFixtureInfo.description}
            </p>
          </div>

          {/* Interactive Material Finish Swatches */}
          <div className="mt-3 pt-2.5 border-t border-[#00808c]/30">
            <div className="flex items-center justify-between mb-1.5">
              <span className="label-mono text-[9px] text-[#789fa2] uppercase tracking-wider">
                Material Finish:
              </span>
              <span className="label-mono text-[10px] text-[#d4af37] font-medium">
                {FINISH_OPTIONS.find((f) => f.id === activeFinish)?.name}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1.5">
              {FINISH_OPTIONS.map((opt) => {
                const isSelected = activeFinish === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setActiveFinish(opt.id)}
                    className={`py-1 px-1.5 rounded-lg border text-center transition-all duration-200 flex flex-col items-center gap-1 cursor-pointer ${
                      isSelected
                        ? 'border-[#00c2d3] bg-[#00808c]/30 scale-105 shadow-sm shadow-[#00808c]/40'
                        : 'border-[#00808c]/30 bg-[#092f35]/60 hover:border-[#00c2d3]/50'
                    }`}
                    title={opt.name}
                  >
                    <div
                      className="w-3.5 h-3.5 rounded-full border border-black/40 shadow-inner"
                      style={{ backgroundColor: opt.hex }}
                    />
                    <span className="text-[8px] label-mono text-[#d2dfdf] truncate w-full">
                      {opt.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Specifications */}
          <div className="mt-2.5 pt-2 border-t border-[#00808c]/30 space-y-1 text-xs font-light">
            <div className="flex items-start justify-between text-[10px]">
              <span className="text-[#789fa2]">Dimensions:</span>
              <span className="text-[#e2ecec] text-right font-normal">{activeFixtureInfo.dimensions}</span>
            </div>
            {activeFixtureInfo.flowRate && (
              <div className="flex items-start justify-between text-[10px]">
                <span className="text-[#789fa2]">Flow Capacity:</span>
                <span className="text-[#d4af37] text-right font-medium">{activeFixtureInfo.flowRate}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-3.5 grid grid-cols-2 gap-2">
            <button
              onClick={() => handleInspect3D(activeFixtureInfo.catalogId)}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#e5c572] to-[#b88c2b] text-[#041c20] font-semibold transition-all shadow-md shadow-[#d4af37]/25 hover:scale-102 text-xs cursor-pointer"
            >
              <Box size={13} />
              <span>Full 3D Studio</span>
            </button>

            <button
              onClick={() => onOpenEnquiry(activeFixtureInfo.name)}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#082d33] border border-[#00808c]/50 hover:border-[#00c2d3] text-white transition-all text-xs font-light shadow-md cursor-pointer"
            >
              <span>Enquire Spec</span>
              <ArrowRight size={12} className="text-[#00c2d3]" />
            </button>
          </div>
        </div>
      )}

      {/* Bottom Luxury Architectural Walkaround Vantage Dock */}
      <div className="absolute bottom-11 sm:bottom-14 left-1/2 -translate-x-1/2 z-40 max-w-[94vw] sm:max-w-fit w-auto pointer-events-auto">
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#062429]/95 backdrop-blur-xl border border-[#00808c]/50 shadow-2xl overflow-x-auto scrollbar-none">
          {SANCTUARY_WAYPOINTS.map((w) => {
            const isSelected = activeWaypointId === w.id;
            return (
              <button
                key={w.id}
                onClick={() => handleSelectWaypoint(w.id)}
                className={`px-3.5 py-1.5 rounded-xl border text-[11px] whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#00808c] to-[#00a8b5] text-white font-medium border-transparent shadow-md shadow-[#00808c]/50'
                    : 'bg-transparent border-transparent text-[#c0dcdd] hover:text-white hover:bg-white/5'
                }`}
              >
                {w.id === 'portal' ? (
                  <RotateCcw size={12} className={isSelected ? 'text-white' : 'text-[#00c2d3]'} />
                ) : (
                  <Sparkles size={12} className={isSelected ? 'text-white' : 'text-[#00c2d3]'} />
                )}
                <span>{w.shortName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Subtle Scroll Invitation to explore catalogue below */}
      <a
        href="#collection"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="absolute bottom-2.5 sm:bottom-3.5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 text-[10px] label-mono text-[#00c2d3] hover:text-white transition-colors cursor-pointer group whitespace-nowrap pointer-events-auto"
        title="Scroll down to explore collection"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#00c2d3] animate-ping" />
        <span>Scroll to explore 34-product catalogue & engineering blueprints</span>
        <ChevronDown size={13} className="group-hover:translate-y-0.5 transition-transform text-[#00c2d3]" />
      </a>
    </div>
  );
};
