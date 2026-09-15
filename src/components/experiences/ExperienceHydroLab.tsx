import React, { useState } from 'react';
import { HydroLabCanvas } from './HydroLabCanvas';
import { HydroLabRadialDial } from './HydroLabRadialDial';
import { ProductFinish } from '../../types';
import { FINISH_OPTIONS } from '../../data/finishes';
import { Sliders, Gauge, Rotate3d, ArrowRight } from 'lucide-react';

interface ExperienceHydroLabProps {
  onOpenEnquiry: (productName: string) => void;
}

const KINETIC_VARIANTS = [
  { id: 'drop', name: 'SERIES 01 · DROP', flowRate: '4.8 L/min', tag: 'Laminar Ribbon' },
  { id: 'arc', name: 'SERIES 02 · ARC', flowRate: '5.2 L/min', tag: 'High-Arc Spout' },
  { id: 'monolith', name: 'SERIES 03 · MONOLITH', flowRate: '6.0 L/min', tag: 'Deck Concealed' },
  { id: 'vessel', name: 'SERIES 04 · VESSEL', flowRate: '4.5 L/min', tag: 'Low-Turbulence' },
];

export const ExperienceHydroLab: React.FC<ExperienceHydroLabProps> = ({ onOpenEnquiry }) => {
  const [explodedVal, setExplodedVal] = useState(0); // 0 (assembled) to 1 (exploded)
  const [waterVelocity, setWaterVelocity] = useState(1.0);
  const [activeFinish, setActiveFinish] = useState<ProductFinish>('brushed_brass');
  const [autoRotate, setAutoRotate] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(KINETIC_VARIANTS[0]);

  return (
    <div className="relative w-full bg-void text-ink overflow-hidden select-none">
      {/* =========================================================================
          SECTION 1: KINETIC 3D LAB HERO & EXPLODED VIEW ENGINE
          ========================================================================= */}
      <section className="relative w-full min-h-[100svh] flex flex-col justify-between pt-24 pb-12 px-6 sm:px-12 border-b border-hair">
        {/* Background Grid & Ambient Glow */}
        <div className="tech-grid absolute inset-0 opacity-20 pointer-events-none" />

        {/* Top Header Banner */}
        <div className="relative z-20 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="label-mono text-brass">03 / Hydro-Lab</span>
              <span className="label-mono text-mist">· Kinetic Engineering</span>
            </div>
            <h1 className="editorial-title text-3xl sm:text-5xl lg:text-6xl text-ink mt-2">
              Exploded Architecture
            </h1>
          </div>
          <div className="text-right">
            <span className="label-mono text-smoke block text-[9px]">Hydrostatic Load</span>
            <span className="label-mono text-brass text-xs">Rated to 50.0 Bar</span>
          </div>
        </div>

        {/* Central 3D Interactive Viewport */}
        <div className="relative flex-1 w-full min-h-[460px] sm:min-h-[560px] my-6">
          <HydroLabCanvas
            explodedProgress={explodedVal}
            activeFinish={activeFinish}
            waterVelocity={waterVelocity}
            autoRotate={autoRotate}
          />

          {/* Floating Callout Badges when Exploded */}
          {explodedVal > 0.35 && (
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 sm:p-10">
              <div className="flex justify-between items-start">
                <div className="bg-void/80 backdrop-blur-md p-3 border border-hair max-w-xs animate-fade-in">
                  <span className="label-mono text-brass text-[9px]">Component A</span>
                  <h4 className="text-sm font-medium text-ink">Spout Assembly & Aerator</h4>
                  <p className="text-[11px] text-smoke mt-0.5">German Neoperl laminar grid insert</p>
                </div>
                <div className="bg-void/80 backdrop-blur-md p-3 border border-hair max-w-xs animate-fade-in text-right">
                  <span className="label-mono text-brass text-[9px]">Component B</span>
                  <h4 className="text-sm font-medium text-ink">Kerox Ceramic Core</h4>
                  <p className="text-[11px] text-smoke mt-0.5">Sintered alumina discs (0.2µm)</p>
                </div>
              </div>

              <div className="flex justify-between items-end">
                <div className="bg-void/80 backdrop-blur-md p-3 border border-hair max-w-xs animate-fade-in">
                  <span className="label-mono text-brass text-[9px]">Component C</span>
                  <h4 className="text-sm font-medium text-ink">Counter Flange</h4>
                  <p className="text-[11px] text-smoke mt-0.5">35mm standard aperture collar</p>
                </div>
                <div className="bg-void/80 backdrop-blur-md p-3 border border-hair max-w-xs animate-fade-in text-right">
                  <span className="label-mono text-brass text-[9px]">Component D</span>
                  <h4 className="text-sm font-medium text-ink">Forged Brass Casing</h4>
                  <p className="text-[11px] text-smoke mt-0.5">CuZn39Pb3 virgin ingot metallurgy</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Interactive Engineering Controllers */}
        <div className="relative z-20 grid grid-cols-1 md:grid-cols-3 gap-6 p-6 border border-hair bg-void/80 backdrop-blur-md">
          {/* Controller 1: Exploded View Scrubber */}
          <div className="flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <span className="label-mono text-smoke flex items-center gap-2 text-[9px]">
                <Sliders size={12} />
                <span>Exploded View</span>
              </span>
              <span className="label-mono text-brass text-[10px]">
                {Math.round(explodedVal * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={explodedVal}
              onChange={(e) => setExplodedVal(Number(e.target.value))}
              className="w-full h-1 bg-hair appearance-none cursor-pointer accent-brass"
            />
            <div className="flex justify-between text-[8px] text-smoke uppercase tracking-wider font-mono">
              <span>Assembled</span>
              <span>Deconstructed</span>
            </div>
          </div>

          {/* Controller 2: Water Flow Velocity Slider */}
          <div className="flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <span className="label-mono text-smoke flex items-center gap-2 text-[9px]">
                <Gauge size={12} />
                <span>Water Velocity & Pressure</span>
              </span>
              <span className="label-mono text-ink text-[10px]">
                {(waterVelocity * 4.8).toFixed(1)} L/min
              </span>
            </div>
            <input
              type="range"
              min="0.2"
              max="1.5"
              step="0.05"
              value={waterVelocity}
              onChange={(e) => setWaterVelocity(Number(e.target.value))}
              className="w-full h-1 bg-hair appearance-none cursor-pointer accent-brass"
            />
            <div className="flex justify-between text-[8px] text-smoke uppercase tracking-wider font-mono">
              <span>Low (Eco)</span>
              <span>Full Cascade</span>
            </div>
          </div>

          {/* Controller 3: Finish & Auto-Rotation */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="label-mono text-smoke block text-[9px] mb-1.5">Alloy Finish</span>
              <div className="flex items-center gap-2">
                {FINISH_OPTIONS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setActiveFinish(f.id)}
                    title={f.name}
                    className={`w-4 h-4 rounded-full border transition-transform ${
                      activeFinish === f.id
                        ? 'border-ink scale-125 ring-2 ring-ink/30'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: f.hex }}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`flex items-center gap-2 px-3 py-1.5 border label-mono text-[9px] transition-colors ${
                autoRotate
                  ? 'border-brass text-brass bg-brass/10'
                  : 'border-hair text-smoke hover:border-mist'
              }`}
            >
              <Rotate3d size={12} />
              <span>{autoRotate ? 'Rotating' : 'Static'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: KINETIC VARIANT MARQUEE TRACK (ActiveHop-inspired)
          ========================================================================= */}
      <div className="relative border-b border-hair bg-char/50 py-8 overflow-hidden select-none">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-12 mb-4 flex items-center justify-between">
          <span className="label-mono text-smoke">Hydraulic Series Family</span>
          <span className="label-mono text-brass">Select Variant Below</span>
        </div>

        <div className="flex overflow-x-auto gap-4 sm:gap-6 px-6 sm:px-12 pb-2 scrollbar-none">
          {KINETIC_VARIANTS.map((v) => (
            <button
              key={v.id}
              onClick={() => setSelectedVariant(v)}
              className={`px-6 py-4 border text-left flex-none min-w-[240px] transition-all duration-300 ${
                selectedVariant.id === v.id
                  ? 'border-ink bg-void text-ink shadow-lg'
                  : 'border-hair text-smoke hover:border-mist hover:text-mist bg-void/30'
              }`}
            >
              <span className="label-mono text-brass text-[9px] block mb-1">{v.tag}</span>
              <h4 className="font-display font-medium text-lg uppercase tracking-tight">
                {v.name}
              </h4>
              <p className="label-mono text-[10px] text-smoke mt-2">Flow Rate: {v.flowRate}</p>
            </button>
          ))}
        </div>
      </div>

      {/* =========================================================================
          SECTION 3: ACTIVEHOP RADIAL DIAL HUD
          ========================================================================= */}
      <HydroLabRadialDial />

      {/* =========================================================================
          SECTION 4: LIGHTWEIGHT-INSPIRED TECHNICAL BENCHMARK STRIP
          ========================================================================= */}
      <section className="relative bg-void py-20 border-t border-hair text-ink">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16">
          <span className="label-mono text-smoke block mb-4">Laboratory Benchmarks</span>
          <h2 className="editorial-title text-3xl sm:text-5xl text-ink mb-12">
            Engineered Without Tolerances
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x-0 lg:divide-x divide-hair">
            <div className="pr-6">
              <span className="label-mono text-brass text-xs">50.0 BAR</span>
              <h3 className="text-xl sm:text-2xl font-light text-ink mt-2">Hydrostatic Proof</h3>
              <p className="text-xs text-smoke font-light mt-2 leading-relaxed">
                Tested to 500% of municipal main supply pressure without structural distortion.
              </p>
            </div>
            <div className="lg:pl-8 pr-6">
              <span className="label-mono text-brass text-xs">0.2 µm</span>
              <h3 className="text-xl sm:text-2xl font-light text-ink mt-2">Surface Flatness</h3>
              <p className="text-xs text-smoke font-light mt-2 leading-relaxed">
                Diamond-lapped ceramic valving ensures air-tight vacuum sealing at zero torque.
              </p>
            </div>
            <div className="lg:pl-8 pr-6">
              <span className="label-mono text-brass text-xs">&lt; 16 dB</span>
              <h3 className="text-xl sm:text-2xl font-light text-ink mt-2">Acoustic Rating</h3>
              <p className="text-xs text-smoke font-light mt-2 leading-relaxed">
                Class 1 acoustic isolation exceeds DIN 4109 noise dampening requirements for private residences.
              </p>
            </div>
            <div className="lg:pl-8">
              <span className="label-mono text-brass text-xs">0.00%</span>
              <h3 className="text-xl sm:text-2xl font-light text-ink mt-2">Zero-Lead Purity</h3>
              <p className="text-xs text-smoke font-light mt-2 leading-relaxed">
                Dezincification-resistant metallurgical matrix ensures clean water consumption.
              </p>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-hair flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <span className="label-mono text-smoke text-[10px]">
              Sanvera Testing Laboratory · Brescia Foundry
            </span>
            <button
              onClick={() => onOpenEnquiry('Hydro-Lab Series ' + selectedVariant.name)}
              className="inline-flex items-center gap-3 px-6 py-3 border border-ink bg-ink text-void hover:bg-transparent hover:text-ink transition-colors label-mono text-xs"
            >
              <span>Request Laboratory Test Report</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
