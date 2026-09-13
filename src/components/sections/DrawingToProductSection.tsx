import React, { useState } from 'react';
import { Sliders } from 'lucide-react';

const EVOLUTION_STAGES = [
  {
    step: '01',
    name: 'Sketch',
    description: 'A single continuous gesture capturing the velocity and downward curvature of natural water flow.',
  },
  {
    step: '02',
    name: 'Geometry',
    description: 'Translation into parametric CAD curves with 3.2mm joint radii and calibrated interior hydraulic wall thickness.',
  },
  {
    step: '03',
    name: 'Model',
    description: 'High-density subdivision mesh topology verified through computational fluid dynamics (CFD) simulation.',
  },
  {
    step: '04',
    name: 'Object',
    description: 'Resolved in solid cold-forged brass and honed mineral stone, sealed with inorganic quartz protection.',
  },
];

export const DrawingToProductSection: React.FC = () => {
  const [sliderVal, setSliderVal] = useState(75); // 0 to 100

  // Calculate stage from slider
  const stageIndex = Math.min(3, Math.floor((sliderVal / 100) * 4));

  return (
    <section id="evolution" className="relative bg-char py-24 sm:py-32 lg:py-40 text-ink border-t border-hair">
      <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-hair pb-6">
          <div className="flex items-center gap-4">
            <span className="label-mono text-smoke">05</span>
            <span className="label-mono text-mist">/ The Evolution</span>
          </div>
          <span className="label-mono text-brass hidden sm:inline">
            Interactive Drawing Sequence
          </span>
        </div>

        {/* Title */}
        <div className="mt-16 sm:mt-20 max-w-3xl">
          <h2 className="editorial-title text-4xl sm:text-6xl lg:text-7xl text-ink">
            From movement<br />to solid matter
          </h2>
          <p className="mt-6 text-base sm:text-lg text-mist font-light leading-relaxed">
            Every Sanvera fixture begins not in software, but as an observational drawing of water in free fall.
            Drag the scrubber below to witness the metamorphosis from gesture to solid brass.
          </p>
        </div>

        {/* Interactive Visual Transformation Stage */}
        <div className="mt-16 lg:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Visual Display Box */}
          <div className="lg:col-span-8 relative aspect-[16/10] sm:aspect-[16/9] bg-void border border-hair overflow-hidden rounded-sm select-none">
            {/* Background Blueprint Grid */}
            <div className="tech-grid absolute inset-0 opacity-30" />

            {/* Stage 1: Hand-Drawn Sketch Layer */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-700 pointer-events-none"
              style={{
                opacity: Math.max(0, 1 - (sliderVal / 33)),
              }}
            >
              <svg viewBox="0 0 600 400" className="w-4/5 h-4/5">
                <path
                  d="M 360,340 C 358,260 362,180 340,110 C 320,60 260,65 210,85 C 160,105 150,140 145,170"
                  fill="none"
                  stroke="#D8D0C5"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="4 2"
                  className="opacity-70"
                />
                <path
                  d="M 365,340 C 362,260 366,180 345,110 C 325,58 262,62 212,82"
                  fill="none"
                  stroke="#A8875A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className="opacity-40"
                />
                {/* Gestural guide lines */}
                <line x1="120" y1="85" x2="420" y2="85" stroke="#F2F0EA" strokeWidth="0.5" strokeDasharray="6 6" opacity="0.3" />
                <line x1="360" y1="40" x2="360" y2="360" stroke="#F2F0EA" strokeWidth="0.5" strokeDasharray="6 6" opacity="0.3" />
                <text x="130" y="75" fill="#6E7276" className="label-mono text-[9px]">arc of stream: r=78mm</text>
              </svg>
            </div>

            {/* Stage 2: Technical CAD Vector Geometry Layer */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-700 pointer-events-none"
              style={{
                opacity: sliderVal > 15 && sliderVal < 65 ? Math.sin(((sliderVal - 15) / 50) * Math.PI) : 0,
              }}
            >
              <svg viewBox="0 0 600 400" className="w-4/5 h-4/5">
                {/* CAD Body Outlines */}
                <rect x="330" y="160" width="60" height="180" fill="none" stroke="#F2F0EA" strokeWidth="1" opacity="0.8" />
                <rect x="320" y="330" width="80" height="20" fill="none" stroke="#A8875A" strokeWidth="1" opacity="0.9" />
                {/* Spout Radius Arc */}
                <path
                  d="M 330,160 C 330,80 230,80 170,160"
                  fill="none"
                  stroke="#F2F0EA"
                  strokeWidth="1.2"
                  opacity="0.9"
                />
                <path
                  d="M 390,160 C 390,40 180,40 130,160"
                  fill="none"
                  stroke="#F2F0EA"
                  strokeWidth="1.2"
                  opacity="0.9"
                />
                {/* Aerator nozzle */}
                <rect x="130" y="150" width="40" height="25" fill="none" stroke="#F2F0EA" strokeWidth="1" opacity="0.7" />
                {/* Dimension Callouts */}
                <line x1="390" y1="160" x2="430" y2="160" stroke="#6E7276" strokeWidth="0.8" />
                <line x1="390" y1="340" x2="430" y2="340" stroke="#6E7276" strokeWidth="0.8" />
                <line x1="420" y1="160" x2="420" y2="340" stroke="#A8875A" strokeWidth="0.8" />
                <text x="435" y="255" fill="#A8875A" className="label-mono text-[10px]">H: 284mm</text>
                {/* Radius dimension arc */}
                <circle cx="280" cy="110" r="45" fill="none" stroke="#6E7276" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.6" />
                <text x="260" y="105" fill="#6E7276" className="label-mono text-[9px]">R: 90.0°</text>
              </svg>
            </div>

            {/* Stage 3: 3D Wireframe Mesh Layer */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-700 pointer-events-none"
              style={{
                opacity: sliderVal > 45 && sliderVal < 85 ? Math.sin(((sliderVal - 45) / 40) * Math.PI) : 0,
              }}
            >
              <svg viewBox="0 0 600 400" className="w-4/5 h-4/5 opacity-80">
                {/* Mesh Lathe Rings */}
                {[170, 200, 230, 260, 290, 320].map((y) => (
                  <ellipse key={y} cx="360" cy={y} rx="30" ry="8" fill="none" stroke="#8CB8D0" strokeWidth="0.8" opacity="0.6" />
                ))}
                {/* Vertical segment lines */}
                {[-26, -14, 0, 14, 26].map((xOffset) => (
                  <line key={xOffset} x1={360 + xOffset} y1="160" x2={360 + xOffset} y2="330" stroke="#8CB8D0" strokeWidth="0.6" opacity="0.5" />
                ))}
                {/* Torus wireframe segments */}
                {[0, 15, 30, 45, 60, 75, 90].map((deg) => (
                  <circle
                    key={deg}
                    cx={280 + Math.cos((deg * Math.PI) / 180) * 80}
                    cy={150 - Math.sin((deg * Math.PI) / 180) * 60}
                    r="15"
                    fill="none"
                    stroke="#8CB8D0"
                    strokeWidth="0.6"
                    opacity="0.6"
                  />
                ))}
              </svg>
            </div>

            {/* Stage 4: Resolved Solid Brass Object Layer */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-700 pointer-events-none"
              style={{
                opacity: Math.max(0, (sliderVal - 65) / 35),
              }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Warm specular back-glow */}
                <div className="absolute w-72 h-72 rounded-full bg-brass/15 blur-3xl" />
                <svg viewBox="0 0 600 400" className="w-4/5 h-4/5 relative z-10 drop-shadow-2xl">
                  <defs>
                    <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#D4BC88" />
                      <stop offset="35%" stopColor="#A8875A" />
                      <stop offset="70%" stopColor="#6E5534" />
                      <stop offset="100%" stopColor="#C5A059" />
                    </linearGradient>
                    <linearGradient id="stoneGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#6E6A62" />
                      <stop offset="100%" stopColor="#363430" />
                    </linearGradient>
                    <linearGradient id="waterFlowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#E2F2FC" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#9BC2D8" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>

                  {/* Stone Pedestal */}
                  <ellipse cx="360" cy="345" rx="140" ry="24" fill="url(#stoneGrad)" />
                  <rect x="220" y="340" width="280" height="20" fill="url(#stoneGrad)" />

                  {/* Main Brass Body */}
                  <rect x="335" y="160" width="50" height="180" rx="3" fill="url(#brassGrad)" />
                  {/* Flange */}
                  <rect x="325" y="332" width="70" height="10" rx="2" fill="url(#brassGrad)" />

                  {/* Curving Spout Tube */}
                  <path
                    d="M 335,160 C 335,70 210,70 150,150 L 125,165 C 190,55 385,55 385,160 Z"
                    fill="url(#brassGrad)"
                  />
                  {/* Spout Tip / Aerator */}
                  <rect x="122" y="152" width="28" height="18" rx="2" fill="#1A1C1E" />

                  {/* Active Water Stream */}
                  <path
                    d="M 132,170 Q 131,250 132,342 Q 138,342 138,250 Q 137,170 138,170 Z"
                    fill="url(#waterFlowGrad)"
                  />
                  {/* Impact ripples */}
                  <ellipse cx="135" cy="344" rx="28" ry="6" fill="none" stroke="#D8EEF8" strokeWidth="1" opacity="0.6" />
                </svg>
              </div>
            </div>

            {/* Corner Badge Showing Evolution State */}
            <div className="absolute top-6 left-6 z-20 flex items-center gap-3 bg-void/80 backdrop-blur-md px-3 py-1.5 border border-hair">
              <span className="label-mono text-brass">
                {EVOLUTION_STAGES[stageIndex].step}
              </span>
              <span className="label-mono text-ink">
                {EVOLUTION_STAGES[stageIndex].name}
              </span>
            </div>

            {/* Progress Percentage */}
            <div className="absolute top-6 right-6 z-20 label-mono text-smoke">
              {sliderVal}% Resolved
            </div>
          </div>

          {/* Interactive Scrub Control & Stage Explanations */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-8">
            {/* Slider Scrubber Controller */}
            <div className="p-6 border border-hair bg-void/40">
              <div className="flex items-center justify-between mb-4">
                <span className="label-mono text-smoke flex items-center gap-2">
                  <Sliders size={12} />
                  <span>Interactive Morph</span>
                </span>
                <span className="label-mono text-ink">{sliderVal}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderVal}
                onChange={(e) => setSliderVal(Number(e.target.value))}
                className="w-full h-1 bg-hair appearance-none cursor-pointer accent-brass"
                aria-label="Metamorphosis slider from sketch to object"
              />
              <div className="flex justify-between mt-3 text-[9px] uppercase tracking-widest2 text-smoke font-mono">
                <span>Drawing</span>
                <span>Vector</span>
                <span>Mesh</span>
                <span>Object</span>
              </div>
            </div>

            {/* Stage Selector Buttons */}
            <div className="space-y-3">
              {EVOLUTION_STAGES.map((st, idx) => {
                const isActive = stageIndex === idx;
                const stageTargetValues = [0, 33, 66, 100];
                return (
                  <button
                    key={st.step}
                    onClick={() => setSliderVal(stageTargetValues[idx])}
                    className={`w-full p-4 border text-left transition-all duration-300 ${
                      isActive
                        ? 'border-ink bg-void/80 text-ink'
                        : 'border-hair/50 text-smoke hover:border-mist hover:text-mist'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="label-mono text-brass">{st.step}</span>
                      <span className="label-mono font-normal uppercase text-xs">
                        {st.name}
                      </span>
                    </div>
                    {isActive && (
                      <p className="mt-3 text-xs text-mist font-light leading-relaxed">
                        {st.description}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
