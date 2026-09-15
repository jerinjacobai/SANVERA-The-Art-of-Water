import React, { useState, useEffect, useCallback, useRef } from 'react';
import Lenis from 'lenis';
import { Header } from './components/layout/Header';
import { MenuOverlay } from './components/layout/MenuOverlay';
import { SearchModal } from './components/layout/SearchModal';
import { Footer } from './components/layout/Footer';
import { ExperienceMonograph } from './components/experiences/ExperienceMonograph';
import { ExperienceSpatialShowroom } from './components/experiences/ExperienceSpatialShowroom';
import { ExperienceHydroLab } from './components/experiences/ExperienceHydroLab';
import { ExperienceSwitcher, ExperienceId } from './components/layout/ExperienceSwitcher';
import { ProductViewerModal } from './components/three/ProductViewerModal';
import { CustomCursor } from './components/ui/CustomCursor';
import { CollectionItem } from './types';

const parseInitialExperience = (): ExperienceId => {
  if (typeof window === 'undefined') return 1;
  const params = new URLSearchParams(window.location.search);
  const expParam = params.get('exp');
  if (expParam === '1' || expParam === '2' || expParam === '3') {
    return parseInt(expParam, 10) as ExperienceId;
  }
  const hash = window.location.hash.toLowerCase();
  if (hash === '#showroom' || hash === '#pavilion') return 2;
  if (hash === '#hydrolab' || hash === '#lab') return 3;
  return 1;
};

export const App: React.FC = () => {
  const [activeExp, setActiveExp] = useState<ExperienceId>(parseInitialExperience);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<CollectionItem | null>(null);
  const [enquiryPrefill, setEnquiryPrefill] = useState<string>('');
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Listen to browser back/forward and hash changes
  useEffect(() => {
    const handleUrlSync = () => {
      const parsed = parseInitialExperience();
      setActiveExp(parsed);
    };

    window.addEventListener('popstate', handleUrlSync);
    window.addEventListener('hashchange', handleUrlSync);

    return () => {
      window.removeEventListener('popstate', handleUrlSync);
      window.removeEventListener('hashchange', handleUrlSync);
    };
  }, []);

  // Switch experience with URL search param and smooth reset
  const handleSwitchExperience = useCallback((id: ExperienceId) => {
    setActiveExp(id);
    const url = new URL(window.location.href);
    url.searchParams.set('exp', id.toString());

    if (id === 1) url.hash = '#monograph';
    else if (id === 2) url.hash = '#showroom';
    else if (id === 3) url.hash = '#hydrolab';

    window.history.pushState(null, '', url.toString());

    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Handle Enquiry triggering across experiences
  const handleOpenEnquiryForProduct = useCallback((productName: string) => {
    setEnquiryPrefill(productName);
    if (activeExp !== 1) {
      handleSwitchExperience(1);
      setTimeout(() => {
        const enquiryEl = document.getElementById('enquiry');
        if (enquiryEl) {
          enquiryEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      const enquiryEl = document.getElementById('enquiry');
      if (enquiryEl) {
        enquiryEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [activeExp, handleSwitchExperience]);

  return (
    <div className="min-h-screen bg-void text-ink font-sans selection:bg-ink selection:text-void relative">
      {/* Luxury Custom Cursor */}
      <CustomCursor />

      {/* Fixed Header & Navigation */}
      <Header
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Fullscreen Overlay Menu */}
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(item) => setSelectedProduct(item)}
      />

      {/* Interactive 3D Product Inspector Modal */}
      <ProductViewerModal
        item={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenEnquiry={handleOpenEnquiryForProduct}
      />

      {/* Dynamic Multi-Experience Container (Strict 3D scene lifecycle isolation) */}
      <main className="relative w-full">
        {activeExp === 1 && (
          <ExperienceMonograph
            onSelectProduct={(item) => setSelectedProduct(item)}
            enquiryPrefill={enquiryPrefill}
          />
        )}

        {activeExp === 2 && (
          <ExperienceSpatialShowroom
            onOpenEnquiry={handleOpenEnquiryForProduct}
          />
        )}

        {activeExp === 3 && (
          <ExperienceHydroLab
            onOpenEnquiry={handleOpenEnquiryForProduct}
          />
        )}
      </main>

      {/* Floating Luxury Multi-Experience Switcher Dock */}
      <ExperienceSwitcher
        activeExp={activeExp}
        onChange={handleSwitchExperience}
      />

      {/* Grand Architectural Footer */}
      <Footer />
    </div>
  );
};
