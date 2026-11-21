import React from 'react';
import { SanveraLogo } from '../common/SanveraLogo';

export const Footer: React.FC = () => {
  return (
    <footer id="site-footer" className="relative bg-[#021316] border-t border-[#00808c]/30 pt-20 lg:pt-32 pb-12 lg:pb-16 text-[#f8fafc]">
      <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 lg:pb-24 border-b border-[#00808c]/20">
          {/* Col 1: Brand & Tagline with White Logo */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <a href="#showroom" className="inline-block group" aria-label="Sanvera — Return to top">
                {/* White Logo clearly visible against dark teal background */}
                <SanveraLogo
                  className="h-12 lg:h-16 w-auto drop-shadow-[0_2px_16px_rgba(255,255,255,0.4)] transition-transform duration-300 group-hover:scale-105"
                  variant="white"
                  showSubtitle
                />
              </a>
              <p className="mt-8 text-base lg:text-lg text-[#c0dcdd] font-light leading-relaxed max-w-[22rem]">
                Sanitaryware for architecture that takes water seriously.
              </p>
            </div>

            <div className="mt-12 text-xs text-[#789fa2] font-light space-y-1">
              <p>Studio & Prototyping: Via della Spiga, Milan</p>
              <p>Metallurgical Foundry: Lumezzane, Brescia</p>
              <p>Distribution: Europe · Middle East · North America</p>
            </div>
          </div>

          {/* Col 2: Collection Links */}
          <div className="md:col-span-2 md:col-start-7">
            <span className="label-mono text-[#00c2d3] block mb-6">Collection</span>
            <ul className="space-y-3.5 text-xs uppercase tracking-widest2 text-[#c0dcdd] font-light">
              <li><a href="#collection" className="hover:text-white transition-colors">Concealed Showers</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Deck & Wall Mixers</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Faucets & Spouts</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Mineral Bathtubs</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Ceramic Vessel Basins</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Architectural Hardware</a></li>
            </ul>
          </div>

          {/* Col 3: Brand & Architecture */}
          <div className="md:col-span-2">
            <span className="label-mono text-[#00c2d3] block mb-6">Philosophy</span>
            <ul className="space-y-3.5 text-xs uppercase tracking-widest2 text-[#c0dcdd] font-light">
              <li><a href="#about" className="hover:text-white transition-colors">The Ritual of Water</a></li>
              <li><a href="#evolution" className="hover:text-white transition-colors">CNC Craftsmanship</a></li>
              <li><a href="#materials" className="hover:text-white transition-colors">Tactile Metallurgy</a></li>
              <li><a href="#architecture" className="hover:text-white transition-colors">Built Case Studies</a></li>
              <li><a href="#journal" className="hover:text-white transition-colors">Sanvera Journal</a></li>
            </ul>
          </div>

          {/* Col 4: Specification & Architectural Studio */}
          <div className="md:col-span-2">
            <span className="label-mono text-[#d4af37] block mb-6">Trade Support</span>
            <ul className="space-y-3.5 text-xs uppercase tracking-widest2 text-[#c0dcdd] font-light">
              <li><a href="#enquiry" className="hover:text-white transition-colors">Architectural Specs</a></li>
              <li><a href="#enquiry" className="hover:text-white transition-colors">BIM & 3D CAD Library</a></li>
              <li><a href="#enquiry" className="hover:text-white transition-colors">Material Sample Chest</a></li>
              <li><a href="#enquiry" className="hover:text-white transition-colors">Project Tender Support</a></li>
              <li><a href="#enquiry" className="hover:text-white transition-colors">Warranty Registry</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-[10px] uppercase tracking-widest2 text-[#789fa2]">
          <p>© {new Date().getFullYear()} SANVERA S.P.A. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-8">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#00c2d3] transition-colors">Instagram</a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-[#00c2d3] transition-colors">Pinterest</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#00c2d3] transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
