import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface HeaderProps {
  onOpenMenu: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMenu, onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-[72px] lg:h-[88px] transition-all duration-700 ease-editorial border-b ${
        isScrolled
          ? 'bg-void/85 backdrop-blur-md border-hair'
          : 'bg-gradient-to-b from-void/60 to-transparent border-transparent'
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1800px] items-center justify-between px-6 sm:px-10 lg:px-16">
        {/* Brand Logo */}
        <a
          href="#hero"
          className="group flex items-center gap-3 transition-opacity duration-300 hover:opacity-80"
          aria-label="Sanvera — Return to top"
        >
          <img
            src="/images/logo.png"
            alt="Sanvera"
            className="h-3.5 sm:h-4 lg:h-[18px] w-auto object-contain"
            onError={(e) => {
              // Graceful text fallback if image path is unavailable
              e.currentTarget.style.display = 'none';
              const textFallback = document.getElementById('brand-text-fallback');
              if (textFallback) textFallback.style.display = 'block';
            }}
          />
          <span
            id="brand-text-fallback"
            className="hidden font-display text-lg tracking-widest3 font-light text-ink uppercase"
          >
            Sanvera
          </span>
        </a>

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
            Collection
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
