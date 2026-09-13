import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer id="site-footer" className="relative bg-void border-t border-hair pt-20 lg:pt-32 pb-12 lg:pb-16 text-ink">
      <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 lg:pb-24 border-b border-hair">
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <a href="#hero" className="inline-block">
                <img
                  src="/images/logo.png"
                  alt="Sanvera"
                  className="h-5 lg:h-7 w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const textFallback = document.getElementById('footer-text-fallback');
                    if (textFallback) textFallback.style.display = 'block';
                  }}
                />
                <span
                  id="footer-text-fallback"
                  className="hidden font-display text-2xl tracking-widest3 font-light text-ink uppercase"
                >
                  Sanvera
                </span>
              </a>
              <p className="mt-8 text-base lg:text-lg text-smoke font-light leading-relaxed max-w-[22rem]">
                Sanitaryware for architecture that takes water seriously.
              </p>
            </div>

            <div className="mt-12 text-xs text-smoke font-light space-y-1">
              <p>Studio & Prototyping: Via della Spiga, Milan</p>
              <p>Metallurgical Foundry: Lumezzane, Brescia</p>
              <p>Distribution: Europe · Middle East · North America</p>
            </div>
          </div>

          {/* Col 2: Collection Links */}
          <div className="md:col-span-2 md:col-start-7">
            <span className="label-mono text-smoke block mb-6">Collection</span>
            <ul className="space-y-3.5 text-xs uppercase tracking-widest2 text-mist font-light">
              <li><a href="#collection" className="hover:text-ink transition-colors">Concealed Shower</a></li>
              <li><a href="#collection" className="hover:text-ink transition-colors">Series Mixer</a></li>
              <li><a href="#collection" className="hover:text-ink transition-colors">Faucets & Spouts</a></li>
              <li><a href="#collection" className="hover:text-ink transition-colors">Bathtubs</a></li>
              <li><a href="#collection" className="hover:text-ink transition-colors">Pedestal Sinks</a></li>
              <li><a href="#collection" className="hover:text-ink transition-colors">Accessories</a></li>
            </ul>
          </div>

          {/* Col 3: Brand & Architecture */}
          <div className="md:col-span-2">
            <span className="label-mono text-smoke block mb-6">Philosophy</span>
            <ul className="space-y-3.5 text-xs uppercase tracking-widest2 text-mist font-light">
              <li><a href="#about" className="hover:text-ink transition-colors">The Manifesto</a></li>
              <li><a href="#evolution" className="hover:text-ink transition-colors">The Evolution</a></li>
              <li><a href="#materials" className="hover:text-ink transition-colors">Materiality</a></li>
              <li><a href="#film" className="hover:text-ink transition-colors">Sanctuary Film</a></li>
              <li><a href="#journal" className="hover:text-ink transition-colors">Editorial Journal</a></li>
            </ul>
          </div>

          {/* Col 4: Specification & Architectural Studio */}
          <div className="md:col-span-2">
            <span className="label-mono text-smoke block mb-6">Trade Support</span>
            <ul className="space-y-3.5 text-xs uppercase tracking-widest2 text-mist font-light">
              <li><a href="#enquiry" className="hover:text-ink transition-colors">Architectural Specification</a></li>
              <li><a href="#enquiry" className="hover:text-ink transition-colors">BIM & 3D CAD Library</a></li>
              <li><a href="#enquiry" className="hover:text-ink transition-colors">Material Sample Chest</a></li>
              <li><a href="#enquiry" className="hover:text-ink transition-colors">Project Tender Support</a></li>
              <li><a href="#enquiry" className="hover:text-ink transition-colors">Warranty Registry</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-[10px] uppercase tracking-widest2 text-smoke">
          <p>© {new Date().getFullYear()} SANVERA DESIGN HOUSE. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-8">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-ink transition-colors">Instagram</a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-ink transition-colors">Pinterest</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-ink transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
