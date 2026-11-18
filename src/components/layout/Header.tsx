import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { SanveraLogo } from '../common/SanveraLogo';

interface HeaderProps {
  onOpenMenu: () => void;
  onOpenSearch: () => void;
  activeExp?: number;
}

interface NavLinkItem {
  label: string;
  targetId: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { label: 'Showroom', targetId: 'showroom' },
  { label: 'Catalogue', targetId: 'collection' },
  { label: 'Blueprints', targetId: 'blueprints' },
  { label: 'Philosophy', targetId: 'about' },
  { label: 'Craft', targetId: 'evolution' },
  { label: 'Materials', targetId: 'materials' },
  { label: 'Journal', targetId: 'journal' },
  { label: 'Contact', targetId: 'enquiry' },
];

export const Header: React.FC<HeaderProps> = ({ onOpenMenu, onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('showroom');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Determine active section based on scroll position
      const scrollPos = window.scrollY + 220;
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_LINKS[i].targetId);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(NAV_LINKS[i].targetId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-[80px] lg:h-[92px] transition-all duration-500 border-b ${
        isScrolled
          ? 'bg-[#14100c]/98 backdrop-blur-2xl border-[#c5a059]/35 shadow-2xl shadow-black/80'
          : 'bg-[#14100c]/90 backdrop-blur-xl border-[#c5a059]/30 shadow-xl shadow-black/60'
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1800px] items-center justify-between px-6 sm:px-10 lg:px-16">
        {/* Brand Logo & Flagship Pill */}
        <div className="flex items-center gap-4">
          <a
            href="#showroom"
            onClick={(e) => handleScrollTo(e, 'showroom')}
            className="group flex items-center transition-all duration-300 hover:scale-105"
            aria-label="Sanvera — The Art of Water"
          >
            <SanveraLogo
              className="h-10 sm:h-12 lg:h-[48px] w-auto drop-shadow-[0_2px_14px_rgba(0,128,140,0.55)]"
              variant="teal"
            />
          </a>

          <span className="hidden xl:inline-flex items-center gap-1.5 label-mono text-[9px] text-[#00c2d3] border border-[#00808c]/40 bg-[#00808c]/15 px-2.5 py-0.5 rounded-full font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00c2d3] animate-pulse" />
            SHOWROOM SANCTUARY
          </span>
        </div>

        {/* Desktop Primary Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Primary Navigation">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.targetId;
            return (
              <a
                key={link.targetId}
                href={`#${link.targetId}`}
                onClick={(e) => handleScrollTo(e, link.targetId)}
                className={`relative py-1 label-mono text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-[#fdfbf7] font-semibold'
                    : 'text-[#c7bcab] hover:text-[#fdfbf7]'
                }`}
              >
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-[#00c2d3] shadow-[0_0_6px_#00c2d3]" />
                )}
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Search & Prominent Menu Button */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1e1711]/90 border border-[#c5a059]/40 text-[#ded4c5] hover:text-[#00c2d3] hover:border-[#00c2d3] transition-all duration-300 shadow-md shadow-black/40"
            aria-label="Search Collection and Journal"
            title="Search Catalogue & Journal"
          >
            <Search size={16} strokeWidth={2} />
          </button>

          {/* Prominent High-Visibility Menu Pill */}
          <button
            onClick={onOpenMenu}
            className="group flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#241c15] to-[#1c1611] border border-[#c5a059]/50 hover:border-[#00c2d3] text-[#fdfbf7] hover:text-[#00c2d3] transition-all duration-300 shadow-lg shadow-black/50 hover:shadow-[#00808c]/25 cursor-pointer"
            aria-label="Open Fullsite Menu"
          >
            <span className="label-mono text-xs font-semibold tracking-widest text-[#fdfbf7] group-hover:text-[#00c2d3] transition-colors">
              MENU
            </span>
            <div className="flex flex-col justify-between w-4 h-3">
              <span className="block w-full h-0.5 bg-[#d4af37] group-hover:bg-[#00c2d3] rounded-full transition-colors" />
              <span className="block w-3/4 h-0.5 bg-[#d4af37] group-hover:bg-[#00c2d3] rounded-full transition-colors ml-auto" />
              <span className="block w-full h-0.5 bg-[#d4af37] group-hover:bg-[#00c2d3] rounded-full transition-colors" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
