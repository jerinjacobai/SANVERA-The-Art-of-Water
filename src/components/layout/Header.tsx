import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { SanveraLogo } from '../common/SanveraLogo';

interface HeaderProps {
  onOpenMenu: () => void;
  onOpenSearch: () => void;
  activeExp?: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMenu, onOpenSearch, activeExp = 1 }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const expLabel = activeExp === 1 ? '01 / Art of Water' : activeExp === 2 ? '02 / Showroom' : '03 / Motion';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-[80px] lg:h-[96px] transition-all duration-700 ease-editorial border-b ${
        isScrolled
          ? 'bg-[#15120e]/90 backdrop-blur-xl border-[#c5a059]/25 shadow-lg shadow-black/50'
          : 'bg-gradient-to-b from-[#15120e]/80 via-[#15120e]/30 to-transparent border-transparent'
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1800px] items-center justify-between px-6 sm:px-10 lg:px-16">
        {/* Brand Logo & Active Experience Badge */}
        <div className="flex items-center gap-5">
          <a
            href="#hero"
            className="group flex items-center gap-3 transition-all duration-300 hover:scale-105"
            aria-label="Sanvera — Return to top"
          >
            <SanveraLogo
              className="h-9 sm:h-11 lg:h-[48px] w-auto drop-shadow-[0_2px_12px_rgba(212,175,55,0.35)]"
              variant="gold"
            />
          </a>

          <span className="hidden xl:inline-block label-mono text-[9px] text-[#d4af37] border border-[#c5a059]/40 bg-[#d4af37]/10 px-2.5 py-0.5 rounded-full">
            {expLabel}
          </span>
        </div>

        {/* Desktop Primary Navigation */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-12" aria-label="Primary Navigation">
          <a
            href="#about"
            className="label-mono text-mist hover:text-ink transition-colors duration-500"
          >
            Philosophy
          </a>
          <a
            href="#evolution"
            className="label-mono text-mist hover:text-ink transition-colors duration-500"
          >
            Craft
          </a>
          <a
            href="#materials"
            className="label-mono text-mist hover:text-ink transition-colors duration-500"
          >
            Materials
          </a>
          <a
            href="#collection"
            className="label-mono text-mist hover:text-ink transition-colors duration-500"
          >
            Catalogue
          </a>
          <a
            href="#journal"
            className="label-mono text-mist hover:text-ink transition-colors duration-500"
          >
            Journal
          </a>
          <a
            href="#enquiry"
            className="label-mono text-mist hover:text-ink transition-colors duration-500"
          >
            Contact
          </a>
        </nav>

        {/* Right Actions: Search & Menu */}
        <div className="flex items-center gap-6 sm:gap-8">
          <button
            onClick={onOpenSearch}
            className="text-mist hover:text-ink transition-colors duration-500 p-1"
            aria-label="Search Collection and Journal"
          >
            <Search size={16} strokeWidth={1.5} />
          </button>

          <button
            onClick={onOpenMenu}
            className="group flex items-center gap-3 text-mist hover:text-ink transition-colors duration-500"
            aria-label="Open Fullsite Menu"
          >
            <span className="label-mono hidden sm:inline">Menu</span>
            <div className="flex flex-col justify-between w-5 h-2.5">
              <span className="block w-full h-px bg-current transition-transform duration-500" />
              <span className="block w-full h-px bg-current transition-transform duration-500" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
