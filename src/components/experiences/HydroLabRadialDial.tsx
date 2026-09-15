import React, { useState } from 'react';
import { Target, Activity, ShieldCheck, Waves, VolumeX } from 'lucide-react';

const HYDRO_DIAL_TARGETS = [
  {
    id: 'laminar',
    number: '01',
    title: 'Zero Turbulence',
    metric: '4.8 L/min',
    subtitle: 'Non-aerated laminar crystalline water stream',
    description: 'Internal fluid channels modeled to eliminate micro-vortices. Water leaves the spout as a solid, glass-like rod without turbulent misting.',
    icon: Waves,
    angle: 0,
  },
  {
    id: 'acoustic',
    number: '02',
    title: 'Acoustic Silence',
    metric: '< 16.4 dB',
    subtitle: 'Acoustically dampened resonant walls',
    description: 'Wall thicknesses calibrated via CNC down to 0.05mm precision, absorbing hydraulic shock and pressure pulses silently.',
    icon: VolumeX,
    angle: 72,
  },
  {
    id: 'metallurgy',
    number: '03',
    title: 'Forged Purity',
    metric: 'CuZn39Pb3',
    subtitle: 'High-density dezincification-resistant brass',
    description: 'Cold-forged under 400 metric tonnes of hydraulic compression, completely eliminating microscopic porosity and casting fissures.',
    icon: ShieldCheck,
    angle: 144,
  },
  {
    id: 'cartridge',
    number: '04',
    title: 'Keramik Precision',
    metric: '500,000 Cycles',
    subtitle: 'Kerox Swiss sintered alumina ceramic discs',
    description: 'Polished to optical flatness (0.2 µm roughness), ensuring featherlight progressive resistance over decades of continuous operation.',
    icon: Target,
    angle: 216,
  },
  {
    id: 'coating',
    number: '05',
    title: 'Quartz Protection',
    metric: '2.0 µm Layer',
    subtitle: 'Inorganic microscopic silica ceramic seal',
    description: 'Vapor-deposited protective skin that shields hand-brushed grain from fingerprints, lime deposits, and aggressive cleaning chemicals.',
    icon: Activity,
    angle: 288,
  },
];

export const HydroLabRadialDial: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeTarget = HYDRO_DIAL_TARGETS[activeIdx];

  return (
    <section className="relative bg-char py-24 sm:py-32 text-ink border-t border-hair overflow-hidden select-none">
      <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-hair pb-6">
          <span className="label-mono text-smoke">Hydrodynamic Performance HUD</span>
          <span className="label-mono text-brass">ActiveHop / Radial Telemetry Dial</span>
        </div>

        <div className="mt-16 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Radial Circle HUD */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[460px] sm:min-h-[540px]">
            {/* Ambient Back Glow */}
            <div className="absolute w-80 h-80 rounded-full bg-brass/10 blur-3xl pointer-events-none" />

            {/* Circular Orbit Ring (ActiveHop-inspired) */}
            <svg
              viewBox="-280 -280 560 560"
              className="w-[340px] sm:w-[460px] h-[340px] sm:h-[460px] absolute z-10"
            >
              {/* Outer Orbit Circle */}
              <circle
                cx="0"
                cy="0"
                r="220"
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
                strokeDasharray="6 6"
              />
              {/* Inner Focus Ring */}
              <circle
                cx="0"
                cy="0"
                r="140"
                fill="none"
                stroke="#A8875A"
                strokeWidth="0.8"
                opacity="0.3"
              />

              {/* Connecting Radial Ray to active target */}
              {(() => {
                const rad = (activeTarget.angle * Math.PI) / 180;
                const x = Math.cos(rad) * 220;
                const y = Math.sin(rad) * 220;
                return (
                  <line
                    x1="0"
                    y1="0"
                    x2={x}
                    y2={y}
                    stroke="#A8875A"
                    strokeWidth="1.5"
                    className="transition-all duration-700 ease-editorial"
                  />
                );
              })()}
            </svg>

            {/* Orbiting Interactive Buttons */}
            <div className="relative w-[340px] sm:w-[460px] h-[340px] sm:h-[460px] z-20">
              {HYDRO_DIAL_TARGETS.map((target, idx) => {
                const isActive = activeIdx === idx;
                const rad = (target.angle * Math.PI) / 180;
                // Position on 220px radius
                const x = 50 + (Math.cos(rad) * 44);
                const y = 50 + (Math.sin(rad) * 44);

                return (
                  <button
                    key={target.id}
                    onClick={() => setActiveIdx(idx)}
                    style={{ left: `${x}%`, top: `${y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 rounded-full border transition-all duration-500 flex items-center justify-center ${
                      isActive
                        ? 'border-brass bg-brass text-void scale-125 shadow-lg shadow-brass/20 ring-4 ring-brass/20'
                        : 'border-hair bg-void/80 text-mist hover:border-ink hover:text-ink hover:scale-110'
                    }`}
                    title={target.title}
                  >
                    <target.icon size={16} />
                  </button>
                );
              })}

              {/* Central Dial Readout Core */}
              <div className="absolute inset-0 m-auto w-32 h-32 rounded-full border border-hair bg-void/90 flex flex-col items-center justify-center p-3 text-center">
                <span className="label-mono text-smoke text-[8px]">Metric</span>
                <span className="font-display font-medium text-lg text-brass mt-0.5">
                  {activeTarget.metric}
                </span>
                <span className="label-mono text-[8px] text-mist mt-1">Target {activeTarget.number}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Technical Specification Card */}
          <div className="lg:col-span-5 p-8 sm:p-12 border border-hair bg-void/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="label-mono text-brass">{activeTarget.number} / 05</span>
                <span className="label-mono text-smoke">· Engineering Standard</span>
              </div>

              <h3 className="editorial-title text-3xl sm:text-5xl text-ink mt-4">
                {activeTarget.title}
              </h3>

              <p className="mt-3 text-sm text-brass font-light italic">
                {activeTarget.subtitle}
              </p>

              <p className="mt-6 text-sm sm:text-base text-mist font-light leading-relaxed">
                {activeTarget.description}
              </p>
            </div>

            {/* Quick selector bar */}
            <div className="mt-10 pt-6 border-t border-hair flex items-center justify-between">
              <span className="label-mono text-smoke text-[9px]">Select Target</span>
              <div className="flex gap-2">
                {HYDRO_DIAL_TARGETS.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveIdx(idx)}
                    className={`w-7 h-7 rounded-full border label-mono text-[9px] transition-colors ${
                      activeIdx === idx
                        ? 'border-ink bg-ink text-void font-bold'
                        : 'border-hair text-smoke hover:border-mist'
                    }`}
                  >
                    {t.number}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
