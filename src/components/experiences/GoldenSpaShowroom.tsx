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
  Sparkles,
} from 'lucide-react';
import { SanveraLogo } from '../common/SanveraLogo';
import { SpaShowroom3DScene } from './SpaShowroom3DScene';
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
    subheading: 'Series 5061 Architectural Wellness Suite',
    categoryName: 'Showers & Wellness',
    sku: 'SV-5061-SHW',
    dimensions: 'Head Ø 300mm · Arm Reach 420mm · Valve H 210mm',
    materials: 'Solid Marine-Grade Brass · Ultra-Laminar Fluid Micro-Jets',
    flowRate: '14.5 L/min @ 3.0 Bar Rain Mode',
    description:
      'Engineered flush into the warm marble ceiling with air-injected micro-droplets mimicking warm tropical rainfall, paired with precision thermostatic dual-diverter controls.',
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
      'Seamless organic oval geometry cast from natural volcanic mineral composite with integrated concealed overflow and gentle ergonomic lumbar incline.',
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
  const [activeFixtureId, setActiveFixtureId] = useState<string | null>(null);
  const [activeFinish, setActiveFinish] = useState<ProductFinish>('brushed_brass');
  const [waterActive, setWaterActive] = useState<boolean>(true);
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [inspectedProduct, setInspectedProduct] = useState<CollectionItem | null>(null);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const activeFixtureInfo = SPA_FIXTURES_INFO.find((f) => f.id === activeFixtureId) || null;

  // Zoom / Fly to fixture
  const handleSelectFixture = (id: string) => {
    setActiveFixtureId(id);
    setHasInteracted(true);
  };

  // Reset to full view
  const handleResetZoom = () => {
    setActiveFixtureId(null);
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
      if (e.key === 'Escape' && activeFixtureId) {
        handleResetZoom();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeFixtureId]);

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
      className="relative w-full h-[100svh] min-h-[740px] max-h-[1440px] bg-gradient-to-b from-[#15110d] via-[#1c1611] to-[#120e0a] text-[#fbf8f3] select-none overflow-hidden flex flex-col justify-between"
    >
      {/* 3D Product Inspector Modal */}
      <ProductViewerModal
        item={inspectedProduct}
        onClose={() => setInspectedProduct(null)}
        onOpenEnquiry={onOpenEnquiry}
      />

      {/* Top Sanctuary Navigation Bar with Proud Signature Teal Sanvera Logo */}
      <header className="relative z-30 flex items-center justify-between px-6 sm:px-10 lg:px-16 pt-20 lg:pt-24 pb-4 bg-gradient-to-b from-[#14100c]/98 via-[#14100c]/70 to-transparent pointer-events-auto">
        {/* Brand Plaque & Active Room Title */}
        <div className="flex items-center gap-5 sm:gap-6">
          <a
            href="#hero"
            className="group flex flex-col items-center transition-all duration-300 hover:scale-105"
            aria-label="Sanvera — Return to top"
          >
            <SanveraLogo
              className="h-10 sm:h-12 lg:h-[52px] w-auto drop-shadow-[0_4px_18px_rgba(0,128,140,0.55)]"
              variant="teal"
              showSubtitle
            />
          </a>

          <div className="h-11 w-px bg-[#c5a059]/30 hidden sm:block" />

          <div className="flex flex-col">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 label-mono text-[#00c2d3] text-[10px] sm:text-xs tracking-widest uppercase font-medium">
                <Compass size={13} className="text-[#00c2d3]" />
                SHOWROOM · 3D GOLDEN SPA SANCTUARY
              </span>
              <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-[#00c2d3]" />
              <span className="hidden md:inline-block text-[11px] text-[#c7bcab] font-light">
                Living 3D Spatial Architectural Experience
              </span>
            </div>

            <h1 className="editorial-title text-xl sm:text-2xl lg:text-3xl text-[#fdfbf7] font-light mt-0.5 flex items-center gap-3">
              {activeFixtureInfo ? activeFixtureInfo.name : 'The Private Spa Sanctuary'}
              {activeFixtureInfo && (
                <span className="text-[10px] label-mono text-[#00c2d3] border border-[#00808c]/50 bg-[#00808c]/20 px-2.5 py-0.5 rounded-full hidden sm:inline-block font-normal">
                  3D Spatial Fly-To Active
                </span>
              )}
            </h1>
          </div>
        </div>

        {/* Viewport Control Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {activeFixtureId && (
            <button
              onClick={handleResetZoom}
              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c572] to-[#b88c2b] text-[#1a140c] font-semibold transition-all duration-300 shadow-lg shadow-[#d4af37]/25 hover:shadow-[#d4af37]/45 hover:scale-105"
              title="Return to full bathroom view (Escape)"
            >
              <RotateCcw size={14} className="text-[#1a140c] group-hover:-rotate-90 transition-transform duration-300" />
              <span className="label-mono text-[11px]">Full Room (3D)</span>
            </button>
          )}

          <button
            onClick={() => setShowHotspots(!showHotspots)}
            className={`p-2.5 rounded-full border transition-all duration-300 hidden sm:flex items-center justify-center ${
              showHotspots
                ? 'bg-[#221b14]/90 border-[#00c2d3]/60 text-[#00c2d3] shadow-lg shadow-black/40'
                : 'bg-[#18130e]/60 border-[#c5a059]/20 text-[#9e9080] hover:text-[#00c2d3]'
            }`}
            title={showHotspots ? 'Hide 3D Hotspot Beacons' : 'Show 3D Hotspot Beacons'}
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

      {/* Main Living 3D Spatial Canvas */}
      <main className="relative flex-1 w-full h-full overflow-hidden">
        {/* Living 3D Three.js WebGL Scene with Panoramic Backdrop & Live Models */}
        <SpaShowroom3DScene
          activeFixtureId={activeFixtureId}
          onSelectFixture={handleSelectFixture}
          onResetZoom={handleResetZoom}
          activeFinish={activeFinish}
          waterActive={waterActive}
          showHotspots={showHotspots}
        />

        {/* First-time prompt banner */}
        {!hasInteracted && !activeFixtureId && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <div className="px-5 py-2.5 rounded-full bg-[#1e1711]/92 backdrop-blur-xl border border-[#00c2d3]/50 text-center shadow-[0_10px_35px_rgba(0,0,0,0.8)] animate-pulse">
              <span className="label-mono text-[11px] text-[#f4dfa7] tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00c2d3] animate-ping" />
                Move cursor to explore 3D room parallax · Click any 3D fixture beacon to fly in
              </span>
            </div>
          </div>
        )}

        {/* Floating Architectural Fixture Card with Live 3D Finishes, Water Controls & Studio Archive */}
        {activeFixtureInfo && (
          <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-30 max-w-sm sm:max-w-md w-full bg-[#1b1510]/95 backdrop-blur-2xl border border-[#c5a059]/40 rounded-2xl p-5 sm:p-6 shadow-[0_30px_70px_rgba(0,0,0,0.85)] text-[#fbf8f3] transition-all duration-500 ease-editorial animate-fadeIn">
            {/* Category Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#c5a059]/20">
              <span className="label-mono text-[#00c2d3] text-[10px] uppercase tracking-widest2 font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00c2d3] animate-ping" />
                {activeFixtureInfo.categoryName} · {activeFixtureInfo.sku}
              </span>
              <span className="label-mono text-[10px] text-[#b0a495]">
                3D Interactive Twin
              </span>
            </div>

            {/* High-Resolution Studio Photography Twin Showcase */}
            <div className="mt-3 relative rounded-xl overflow-hidden border border-[#c5a059]/30 bg-gradient-to-b from-[#2a2016]/90 to-[#17120d]/90 p-3 group">
              <div className="h-32 sm:h-36 w-full flex items-center justify-center overflow-hidden">
                <img
                  src={activeFixtureInfo.studioImage}
                  alt={activeFixtureInfo.name}
                  className="max-h-full max-w-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#16110c]/85 backdrop-blur-md border border-[#c5a059]/30 text-[9px] label-mono text-[#e5c572] flex items-center gap-1">
                <Sparkles size={9} className="text-[#d4af37]" />
                <span>4K Architectural Masterwork</span>
              </div>
            </div>

            {/* Interactive 3D Finish Customizer */}
            <div className="mt-3.5 pt-3 border-t border-[#c5a059]/20">
              <div className="flex items-center justify-between mb-2">
                <span className="label-mono text-[10px] text-[#a49887] uppercase tracking-wider">
                  Live 3D Material Finish:
                </span>
                <span className="label-mono text-[10px] text-[#d4af37] font-medium">
                  {FINISH_OPTIONS.find((f) => f.id === activeFinish)?.name}
                </span>
              </div>

              {/* Finish Swatches */}
              <div className="grid grid-cols-4 gap-2">
                {FINISH_OPTIONS.map((opt) => {
                  const isSelected = activeFinish === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setActiveFinish(opt.id)}
                      className={`py-1.5 px-2 rounded-lg border text-center transition-all duration-300 flex flex-col items-center gap-1 ${
                        isSelected
                          ? 'border-[#00c2d3] bg-[#00808c]/20 shadow-md shadow-[#00808c]/30 scale-105'
                          : 'border-[#c5a059]/20 bg-[#221b14]/60 hover:border-[#c5a059]/60'
                      }`}
                      title={opt.name}
                    >
                      <div
                        className="w-4 h-4 rounded-full border border-black/40 shadow-inner"
                        style={{ backgroundColor: opt.hex }}
                      />
                      <span className="text-[9px] label-mono text-[#c7bcab] truncate w-full">
                        {opt.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hydraulic Water Flow Toggle (if supported) */}
            {activeFixtureInfo.categoryName !== 'Mirrors & Optics' &&
              activeFixtureInfo.categoryName !== 'Hardware & Accessories' && (
                <div className="mt-2.5 flex items-center justify-between py-2 px-3 rounded-lg bg-[#241c15]/80 border border-[#c5a059]/20">
                  <div className="flex items-center gap-2">
                    <Droplets
                      size={14}
                      className={waterActive ? 'text-[#00c2d3] animate-pulse' : 'text-[#8a7c6c]'}
                    />
                    <span className="text-[11px] label-mono text-[#ded4c5]">
                      3D Water Stream: {waterActive ? 'Flow Active' : 'Off'}
                    </span>
                  </div>
                  <button
                    onClick={() => setWaterActive(!waterActive)}
                    className={`px-2.5 py-0.5 rounded text-[10px] label-mono uppercase font-semibold transition-colors ${
                      waterActive
                        ? 'bg-[#00808c] text-white hover:bg-[#009da9]'
                        : 'bg-[#30261e] text-[#8a7c6c] hover:text-white'
                    }`}
                  >
                    {waterActive ? 'Active' : 'Enable'}
                  </button>
                </div>
              )}

            {/* Specifications Details */}
            <div className="mt-3 pt-2.5 border-t border-[#c5a059]/20 space-y-1.5 text-xs font-light">
              <div className="flex items-start justify-between text-[11px]">
                <span className="text-[#a49887]">Dimensions:</span>
                <span className="text-[#e2dacd] text-right font-normal">{activeFixtureInfo.dimensions}</span>
              </div>
              <div className="flex items-start justify-between text-[11px]">
                <span className="text-[#a49887]">Materials:</span>
                <span className="text-[#e2dacd] text-right font-normal">{activeFixtureInfo.materials}</span>
              </div>
              {activeFixtureInfo.flowRate && (
                <div className="flex items-start justify-between text-[11px]">
                  <span className="text-[#a49887]">Flow Capacity:</span>
                  <span className="text-[#d4af37] text-right font-medium">{activeFixtureInfo.flowRate}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <button
                onClick={() => handleInspect3D(activeFixtureInfo.catalogId)}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#e5c572] to-[#b88c2b] text-[#19130c] font-semibold transition-all shadow-lg shadow-[#d4af37]/25 hover:shadow-[#d4af37]/45 text-xs"
              >
                <Box size={14} />
                <span>Full 3D Studio</span>
              </button>

              <button
                onClick={() => onOpenEnquiry(activeFixtureInfo.name)}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-[#271e16] border border-[#c5a059]/40 hover:border-[#00c2d3] text-[#fdfbf7] transition-all text-xs font-light shadow-md"
              >
                <span>Enquire Spec</span>
                <ArrowRight size={13} className="text-[#00c2d3]" />
              </button>
            </div>

            <button
              onClick={handleResetZoom}
              className="mt-2.5 w-full py-1.5 text-center label-mono text-[10px] text-[#b0a495] hover:text-[#00c2d3] transition-colors"
            >
              ← Return to Full 3D Sanctuary View (Escape)
            </button>
          </div>
        )}
      </main>

      {/* Bottom Luxury Fixture Quick-Select Dock in Warm Gold & Signature Aegean Teal */}
      <footer className="relative z-30 px-4 sm:px-8 lg:px-16 pb-6 pt-3 bg-gradient-to-t from-[#15110c]/98 via-[#18130e]/85 to-transparent pointer-events-auto">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Quick-Select Fixture Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {/* Full View Reset Button */}
            <button
              onClick={handleResetZoom}
              className={`px-4 py-2.5 rounded-xl border text-xs whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                !activeFixtureId
                  ? 'bg-gradient-to-r from-[#d4af37] via-[#e5c572] to-[#b88c2b] text-[#19130c] font-semibold shadow-lg shadow-[#d4af37]/35 border-transparent'
                  : 'bg-[#221b14]/85 border-[#c5a059]/30 text-[#ded4c5] hover:border-[#00c2d3] hover:text-[#fff]'
              }`}
            >
              <RotateCcw size={13} className={!activeFixtureId ? 'text-[#19130c]' : 'text-[#00c2d3]'} />
              <span>Full Sanctuary (3D)</span>
            </button>

            {/* Individual Fixture Selector Pills */}
            {SPA_FIXTURES_INFO.map((f) => {
              const isSelected = activeFixtureId === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => handleSelectFixture(f.id)}
                  className={`px-4 py-2.5 rounded-xl border text-xs whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#00808c] via-[#009da9] to-[#006e78] text-white font-semibold shadow-lg shadow-[#00808c]/45 border-transparent'
                      : 'bg-[#221b14]/85 border-[#c5a059]/30 text-[#ded4c5] hover:border-[#00c2d3] hover:text-[#fff]'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isSelected ? 'bg-white' : 'bg-[#00c2d3]'
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
              <span className="w-2 h-2 rounded-full bg-[#00c2d3] animate-pulse" />
              <span className="label-mono text-[10px] text-[#ded4c5]">6 Spatial 3D Anchors Active</span>
            </div>
            <a
              href="#collection"
              className="label-mono text-[10px] text-[#00c2d3] hover:text-white transition-colors flex items-center gap-1.5 border-b border-[#00808c]/40 pb-0.5"
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
