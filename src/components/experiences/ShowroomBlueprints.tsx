import React from 'react';

export const ShowroomBlueprints: React.FC = () => {
  return (
    <section id="blueprints" className="relative bg-char py-24 sm:py-32 text-ink border-t border-hair">
      <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-6 border-b border-hair pb-6">
          <div>
            <span className="label-mono text-[#00c2d3] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00c2d3] animate-pulse" />
              ARCHITECTURAL SCHEMATICS
            </span>
            <h2 className="editorial-title text-3xl sm:text-5xl text-white mt-2">
              The Pavilion Blueprints
            </h2>
          </div>
          <span className="label-mono text-brass">
            Brescia Atelier · Sheet A-101 to A-104
          </span>
        </div>

        {/* 4 Architectural Elevation Drawing Cards */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Drawing 1: Longitude Section */}
          <article className="p-8 border border-hair bg-void/60 rounded-xl shadow-xl shadow-[#021316]/50">
            <div className="aspect-[16/9] w-full border border-[#00808c]/40 p-4 bg-[#031c20]/90 rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 400 200" className="w-full h-full stroke-white fill-none" strokeWidth="1">
                {/* Elevation grid */}
                <g opacity="0.2" stroke="#00c2d3">
                  <path d="M0 160h400M0 120h400M0 80h400M0 40h400M60 0v200M340 0v200" />
                </g>
                {/* Building shell */}
                <path d="M 50 160 L 350 160 L 350 40 L 50 40 Z" stroke="#00c2d3" strokeWidth="1.2" />
                <path d="M 50 40 L 200 20 L 350 40" stroke="#00c2d3" strokeWidth="1.2" />
                {/* Columns */}
                <path d="M 90 160 V 50 M 150 160 V 50 M 250 160 V 50 M 310 160 V 50" opacity="0.7" stroke="#ffffff" />
                {/* Central plinth & water reservoir */}
                <rect x="175" y="125" width="50" height="35" fill="#00808c" fillOpacity="0.3" stroke="#d4af37" />
                <path d="M 50 175 H 350 M 50 170 v 10 M 350 170 v 10" stroke="#d4af37" />
                <text x="200" y="190" fill="#00c2d3" fontSize="8" fontFamily="DM Mono" textAnchor="middle" stroke="none">
                  Total Longitudinal Axis: 68.0 m
                </text>
              </svg>
            </div>
            <div className="mt-6 flex items-baseline justify-between">
              <h3 className="text-xl font-light text-white">Longitudinal Sanctuary Elevation</h3>
              <span className="label-mono text-[#00c2d3]">Sheet A-101</span>
            </div>
            <p className="mt-2 text-xs text-[#c0dcdd] font-light leading-relaxed">
              Section cut along primary north-south sightline showing double-height reception portal, coffered acoustics, and glazed northern aperture.
            </p>
          </article>

          {/* Drawing 2: Transverse Cross-Section */}
          <article className="p-8 border border-hair bg-void/60 rounded-xl shadow-xl shadow-[#021316]/50">
            <div className="aspect-[16/9] w-full border border-[#00808c]/40 p-4 bg-[#031c20]/90 rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 400 200" className="w-full h-full stroke-white fill-none" strokeWidth="1">
                <g opacity="0.2" stroke="#00c2d3">
                  <path d="M0 160h400M0 110h400M0 60h400M80 0v200M320 0v200" />
                </g>
                <rect x="80" y="50" width="240" height="110" stroke="#00c2d3" strokeWidth="1.2" />
                <path d="M 120 160 V 50 M 280 160 V 50" opacity="0.7" stroke="#ffffff" />
                {/* Curtain wall mullions */}
                <path d="M 80 85 H 320 M 80 120 H 320" opacity="0.5" stroke="#ffffff" strokeDasharray="4 2" />
                <circle cx="200" cy="110" r="16" fill="#00808c" fillOpacity="0.3" stroke="#d4af37" />
                <path d="M 80 175 H 320 M 80 170 v 10 M 320 170 v 10" stroke="#d4af37" />
                <text x="200" y="190" fill="#00c2d3" fontSize="8" fontFamily="DM Mono" textAnchor="middle" stroke="none">
                  Transverse Clear Span: 22.0 m
                </text>
              </svg>
            </div>
            <div className="mt-6 flex items-baseline justify-between">
              <h3 className="text-xl font-light text-white">Transverse Gallery Section</h3>
              <span className="label-mono text-[#00c2d3]">Sheet A-102</span>
            </div>
            <p className="mt-2 text-xs text-[#c0dcdd] font-light leading-relaxed">
              Transverse clear span displaying perimeter glass curtain walls, recessed stone spandrels, and central plinth spotlight cone.
            </p>
          </article>
        </div>

        {/* Technical Specification & Architectural Schedule */}
        <div className="mt-16 sm:mt-20 border border-hair bg-void/50 p-8 sm:p-12 rounded-xl">
          <span className="label-mono text-[#00c2d3] block mb-4">Trade Schedule</span>
          <h3 className="editorial-title text-2xl sm:text-3xl text-white">
            Pavilion Technical Framework
          </h3>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-left text-xs text-mist font-light divide-y divide-hair">
              <thead>
                <tr className="label-mono text-[#789fa2] text-[9px] pb-4">
                  <th className="py-3 font-normal">REF</th>
                  <th className="py-3 font-normal">ZONE</th>
                  <th className="py-3 font-normal">MATERIAL PROFILE</th>
                  <th className="py-3 font-normal">HYDRAULIC LOAD</th>
                  <th className="py-3 font-normal text-right">ACOUSTIC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hair/40">
                <tr>
                  <td className="py-4 label-mono text-brass">S-01</td>
                  <td className="py-4 text-white">Approach Basin</td>
                  <td className="py-4">Honed Pietra di Cardoso & water skin</td>
                  <td className="py-4">Recirculating 45 L/min closed circuit</td>
                  <td className="py-4 text-right label-mono text-[#00c2d3]">&lt; 12 dB</td>
                </tr>
                <tr>
                  <td className="py-4 label-mono text-brass">S-02</td>
                  <td className="py-4 text-white">Arrival Portal</td>
                  <td className="py-4">Solid limestone block, fluted bronze trim</td>
                  <td className="py-4">Passive thermal mass dampening</td>
                  <td className="py-4 text-right label-mono text-[#00c2d3]">&lt; 14 dB</td>
                </tr>
                <tr>
                  <td className="py-4 label-mono text-brass">S-03</td>
                  <td className="py-4 text-white">Mixer Gallery</td>
                  <td className="py-4">Brushed Brass Series 02, stone cylinder</td>
                  <td className="py-4">5.0 L/min laminar crystal flow</td>
                  <td className="py-4 text-right label-mono text-[#00c2d3]">&lt; 16 dB</td>
                </tr>
                <tr>
                  <td className="py-4 label-mono text-brass">S-04</td>
                  <td className="py-4 text-white">Shower Suite</td>
                  <td className="py-4">Zero-reveal flush plates, stainless manifold</td>
                  <td className="py-4">18.0 L/min thermostatic rain head</td>
                  <td className="py-4 text-right label-mono text-[#00c2d3]">&lt; 18 dB</td>
                </tr>
                <tr>
                  <td className="py-4 label-mono text-brass">S-05</td>
                  <td className="py-4 text-white">Bath Vault</td>
                  <td className="py-4">Solidstone™ mineral composite & glass aperture</td>
                  <td className="py-4">310 Litres high-thermal capacity</td>
                  <td className="py-4 text-right label-mono text-[#00c2d3]">&lt; 10 dB</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
