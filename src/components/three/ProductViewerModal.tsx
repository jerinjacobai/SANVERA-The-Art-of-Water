import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { X, RotateCcw, Download, Check, ArrowRight } from 'lucide-react';
import { CollectionItem, ProductFinish } from '../../types';
import { FINISH_OPTIONS } from '../../data/finishes';
import { ProductModel } from './ProductModel';
import { StudioLighting } from './StudioLighting';

interface ProductViewerModalProps {
  item: CollectionItem | null;
  onClose: () => void;
  onOpenEnquiry: (productName: string) => void;
}

export const ProductViewerModal: React.FC<ProductViewerModalProps> = ({
  item,
  onClose,
  onOpenEnquiry,
}) => {
  const [activeFinish, setActiveFinish] = useState<ProductFinish>('brushed_brass');
  const [activeTab, setActiveTab] = useState<'specs' | 'dimensions' | 'install' | 'downloads'>('specs');
  const [isWaterFlowing, setIsWaterFlowing] = useState(true);
  const [viewMode, setViewMode] = useState<'3d' | 'photo'>('3d');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const currentFinishObj = FINISH_OPTIONS.find((f) => f.id === activeFinish) || FINISH_OPTIONS[0];

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-[90] flex bg-void/95 backdrop-blur-xl text-ink">
      {/* 3D Viewport Column */}
      <div className="relative flex-1 h-full w-full overflow-hidden">
        {/* Top Header bar */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-6 sm:p-10 pointer-events-none">
          <div className="pointer-events-auto">
            <span className="label-mono text-mist">{item.series}</span>
            <h2 className="editorial-title text-3xl sm:text-4xl lg:text-5xl mt-1 text-ink">
              {item.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="pointer-events-auto flex items-center gap-3 border border-hair hover:border-ink px-4 py-2 text-xs uppercase tracking-widest2 text-mist hover:text-ink transition-colors duration-300"
            aria-label="Close Product View"
          >
            <span>Close</span>
            <X size={14} />
          </button>
        </div>

        {/* 3D Canvas Scene */}
        {viewMode === '3d' ? (
        <Canvas
          camera={{ position: [0, 1.2, 5.8], fov: 36 }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
          shadows
        >
          <color attach="background" args={['#070809']} />
          <fog attach="fog" args={['#070809', 5, 18]} />
          <StudioLighting intensityMultiplier={1.1} />

          <group position={[0, -0.2, 0]}>
            <ProductModel
              category={item.category}
              productId={item.id}
              finish={activeFinish}
              waterActive={isWaterFlowing}
              waterIntensity={1}
              showPedestal={true}
              scale={0.9}
            />

            <ContactShadows
              position={[0, -1.95, 0]}
              opacity={0.65}
              scale={7}
              blur={2.5}
              far={4}
            />
          </group>

          <OrbitControls
            enablePan={false}
            minDistance={3.2}
            maxDistance={8.5}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2 - 0.05}
            dampingFactor={0.05}
          />
        </Canvas>
      ) : (
        <div className="w-full h-full flex items-center justify-center p-8 sm:p-14 relative bg-radial-gradient">
          <div className="relative max-w-2xl max-h-[70vh] flex items-center justify-center p-6 border border-hair/60 bg-char/40 backdrop-blur-md rounded-lg shadow-2xl">
            <img
              src={item.previewImage || '/catalog/mixer-664.jpg'}
              alt={item.title}
              className="max-h-[58vh] w-auto object-contain transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 bg-void/85 backdrop-blur-md px-3 py-1 text-[9px] label-mono text-brass border border-hair/50 rounded-sm">
              Authentic Sanvera Studio Capture
            </div>
          </div>
        </div>
      )}

        {/* Bottom Interactive Controls */}
        <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 z-20 flex flex-wrap items-center justify-between gap-4 pointer-events-none">
          {/* Interaction hint */}
          <div className="flex items-center gap-3 text-smoke text-[10px] uppercase tracking-widest2">
            <RotateCcw size={12} />
            <span>Drag to rotate · Scroll to zoom</span>
          </div>

          {/* Mode Switcher: 3D vs Official Studio Photo */}
          <div className="pointer-events-auto flex items-center bg-void/80 backdrop-blur-md border border-hair p-1 rounded-full text-xs">
            <button
              onClick={() => setViewMode('3d')}
              className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest2 transition-colors ${
                viewMode === '3d' ? 'bg-ink text-void font-medium' : 'text-smoke hover:text-ink'
              }`}
            >
              3D Interactive
            </button>
            <button
              onClick={() => setViewMode('photo')}
              className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest2 transition-colors ${
                viewMode === 'photo' ? 'bg-ink text-void font-medium' : 'text-smoke hover:text-ink'
              }`}
            >
              Studio Archive
            </button>
          </div>

          {/* Water flow toggle */}
          <div className="pointer-events-auto flex items-center gap-4">
            <button
              onClick={() => setIsWaterFlowing(!isWaterFlowing)}
              className={`text-[10px] uppercase tracking-widest2 px-4 py-2 border transition-all duration-300 ${
                isWaterFlowing
                  ? 'border-brass text-brass bg-brass/10'
                  : 'border-hair text-smoke hover:border-mist hover:text-ink'
              }`}
            >
              Water: {isWaterFlowing ? 'Flowing' : 'Paused'}
            </button>
          </div>
        </div>
      </div>

      {/* Information Drawer (Right Side) */}
      <div className="w-full max-w-[440px] h-full overflow-y-auto border-l border-hair bg-char/90 p-8 sm:p-12 flex flex-col justify-between hidden md:flex">
        <div>
          {/* Section Kicker */}
          <div className="flex items-center justify-between pb-6 border-b border-hair">
            <span className="label-mono text-smoke">Product Reference</span>
            <span className="label-mono text-brass">{item.number} / 06</span>
          </div>

          {/* Description */}
          <p className="mt-8 text-mist font-light leading-relaxed text-sm lg:text-base">
            {item.description}
          </p>

          {/* Finish Selector */}
          <div className="mt-10">
            <span className="label-mono text-smoke block mb-4">Select Finish</span>
            <div className="grid grid-cols-2 gap-3">
              {FINISH_OPTIONS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFinish(f.id)}
                  className={`p-3 border text-left transition-all duration-300 flex items-center gap-3 ${
                    activeFinish === f.id
                      ? 'border-ink bg-ink/5 text-ink'
                      : 'border-hair text-smoke hover:border-mist hover:text-mist'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-hair shrink-0"
                    style={{ backgroundColor: f.hex }}
                  />
                  <span className="text-xs tracking-wider uppercase font-light truncate">
                    {f.name}
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-smoke font-light leading-relaxed">
              {currentFinishObj.description}
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="mt-10 border-b border-hair flex gap-6 text-[10px] uppercase tracking-widest2">
            {(['specs', 'dimensions', 'install', 'downloads'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 transition-colors ${
                  activeTab === tab
                    ? 'border-b-2 border-ink text-ink'
                    : 'text-smoke hover:text-mist'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          <div className="mt-6 text-xs text-mist font-light space-y-4">
            {activeTab === 'specs' && (
              <div className="space-y-4">
                <div>
                  <span className="label-mono text-smoke block">Materials</span>
                  <p className="mt-1 text-ink">{item.specs.materials}</p>
                </div>
                <div>
                  <span className="label-mono text-smoke block">Flow Rate</span>
                  <p className="mt-1 text-ink">{item.specs.flowRate}</p>
                </div>
                <div>
                  <span className="label-mono text-smoke block">Internal Valve</span>
                  <p className="mt-1 text-ink">{item.specs.cartridge}</p>
                </div>
                <div>
                  <span className="label-mono text-smoke block">Warranty</span>
                  <p className="mt-1 text-ink">{item.specs.warranty}</p>
                </div>
              </div>
            )}

            {activeTab === 'dimensions' && (
              <div className="space-y-4">
                <div>
                  <span className="label-mono text-smoke block">Geometric Profile</span>
                  <p className="mt-1 text-ink">{item.specs.dimensions}</p>
                </div>
                <div>
                  <span className="label-mono text-smoke block">Mounting Diameter</span>
                  <p className="mt-1 text-ink">Standard 35mm counter bore hole</p>
                </div>
                <div>
                  <span className="label-mono text-smoke block">Recommended Pressure</span>
                  <p className="mt-1 text-ink">1.5 – 5.0 bar dynamic operating pressure</p>
                </div>
              </div>
            )}

            {activeTab === 'install' && (
              <div className="space-y-3">
                {item.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="text-brass shrink-0 mt-0.5">·</span>
                    <p className="text-mist">{feat}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'downloads' && (
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleDownload}
                  className="w-full flex items-center justify-between p-3 border border-hair hover:border-ink transition-colors text-ink text-left"
                >
                  <span className="label-mono">2D / 3D CAD Pack (.STEP, .DWG, .OBJ)</span>
                  {downloadSuccess ? <Check size={14} className="text-brass" /> : <Download size={14} />}
                </button>
                <button
                  onClick={handleDownload}
                  className="w-full flex items-center justify-between p-3 border border-hair hover:border-ink transition-colors text-ink text-left"
                >
                  <span className="label-mono">Technical Specification PDF</span>
                  <Download size={14} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="pt-8 mt-8 border-t border-hair">
          <button
            onClick={() => {
              onClose();
              onOpenEnquiry(item.title);
            }}
            className="w-full group flex items-center justify-between p-4 border border-ink bg-ink text-void hover:bg-transparent hover:text-ink transition-all duration-500 text-[11px] uppercase tracking-widest2"
          >
            <span>Specify For Project</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
