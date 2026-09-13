import React, { useState } from 'react';
import { MATERIALS } from '../../data/materials';

export const MaterialSection: React.FC = () => {
  const [selectedMaterialId, setSelectedMaterialId] = useState('brass');
  const selectedMaterial = MATERIALS.find((m) => m.id === selectedMaterialId) || MATERIALS[0];

  return (
    <section id="materials" className="relative bg-void py-24 sm:py-32 lg:py-40 text-ink">
      <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex items-center gap-4 border-t border-hair pt-6">
          <span className="label-mono text-smoke">06</span>
          <span className="label-mono text-mist">/ Materiality</span>
        </div>

        {/* Section Title */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <h2 className="editorial-title text-4xl sm:text-6xl lg:text-7xl xl:text-[88px] text-ink leading-[0.92]">
              Material is part<br />of the design
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pt-4">
            <p className="text-base sm:text-lg text-mist font-light leading-relaxed">
              We do not apply decorative coatings to disguise inferior substrates. Solid brass, alpine stone, and smoked float glass are chosen for their unyielding longevity and tactile resonance.
            </p>
          </div>
        </div>

        {/* Material Selection Tabs */}
        <div className="mt-16 sm:mt-20 border-b border-hair flex overflow-x-auto gap-8 sm:gap-12 pb-4 scrollbar-none">
          {MATERIALS.map((mat) => {
            const isSelected = mat.id === selectedMaterialId;
            return (
              <button
                key={mat.id}
                onClick={() => setSelectedMaterialId(mat.id)}
                className={`group flex items-baseline gap-3 whitespace-nowrap transition-all duration-300 pb-2 border-b-2 ${
                  isSelected
                    ? 'border-ink text-ink font-normal'
                    : 'border-transparent text-smoke hover:text-mist'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block transition-transform group-hover:scale-125"
                  style={{ backgroundColor: mat.colorHex }}
                />
                <span className="label-mono text-xs">{mat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Material Showcase Display */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Macro Material Photography Plate */}
          <figure className="plate plate-sheen lg:col-span-7 aspect-[4/3] sm:aspect-[16/11] relative overflow-hidden group">
            <img
              src={selectedMaterial.image}
              alt={selectedMaterial.name}
              className="w-full h-full object-cover grayscale contrast-115 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-1000 ease-editorial opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/30 to-transparent" />
            <figcaption className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <span className="label-mono text-ink text-xs">{selectedMaterial.name} · Macro Surface</span>
              <span className="label-mono text-brass">{selectedMaterial.kicker}</span>
            </figcaption>
          </figure>

          {/* Right Column: Physical Attributes & Narrative */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 sm:p-12 border border-hair bg-char/50">
            <div>
              <span className="label-mono text-brass block">{selectedMaterial.kicker}</span>
              <h3 className="editorial-title text-3xl sm:text-4xl text-ink mt-3">
                {selectedMaterial.name}
              </h3>
              <p className="mt-6 text-sm sm:text-base text-mist font-light leading-relaxed">
                {selectedMaterial.description}
              </p>
              <p className="mt-4 text-xs sm:text-sm text-smoke font-light leading-relaxed">
                {selectedMaterial.secondaryText}
              </p>
            </div>

            {/* Geological / Metallurgical Properties Grid */}
            <div className="mt-12 pt-8 border-t border-hair space-y-4">
              <div>
                <span className="label-mono text-smoke block">Origin & Provenance</span>
                <p className="text-xs text-ink font-light mt-1">{selectedMaterial.properties.origin}</p>
              </div>
              <div>
                <span className="label-mono text-smoke block">Sensory Tactility</span>
                <p className="text-xs text-ink font-light mt-1">{selectedMaterial.properties.tactility}</p>
              </div>
              <div>
                <span className="label-mono text-smoke block">Ecological Durability</span>
                <p className="text-xs text-ink font-light mt-1">{selectedMaterial.properties.resilience}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
