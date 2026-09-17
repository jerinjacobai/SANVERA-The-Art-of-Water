import React, { useState, useEffect, useCallback, useRef } from 'react';
import Lenis from 'lenis';
import { Header } from './components/layout/Header';
import { MenuOverlay } from './components/layout/MenuOverlay';
import { SearchModal } from './components/layout/SearchModal';
import { Footer } from './components/layout/Footer';
import { ExperienceMonograph } from './components/experiences/ExperienceMonograph';
import { ExperienceSpatialShowroom } from './components/experiences/ExperienceSpatialShowroom';
import { ExperienceMotion } from './components/experiences/ExperienceMotion';
import { ExperienceSwitcher, ExperienceId } from './components/layout/ExperienceSwitcher';
import { ExperienceTransitionOverlay } from './components/layout/ExperienceTransitionOverlay';
import { ProductViewerModal } from './components/three/ProductViewerModal';
import { CustomCursor } from './components/ui/CustomCursor';
import { CollectionItem } from './types';

const parseInitialExperience = (): ExperienceId => {
  if (typeof window === 'undefined') return 2;
  const path = window.location.pathname.toLowerCase();
  if (path.includes('art-of-water') || path.includes('monograph')) return 1;
  if (path.includes('motion')) return 3;
  if (path.includes('showroom') || path.includes('pavilion')) return 2;

  const params = new URLSearchParams(window.location.search);
  const expParam = params.get('exp');
  if (expParam === '1' || expParam === '2' || expParam === '3') {
    return parseInt(expParam, 10) as ExperienceId;
  }
  const hash = window.location.hash.toLowerCase();
  if (hash === '#art-of-water' || hash === '#monograph') return 1;
  if (hash === '#motion' || hash === '#hydrolab' || hash === '#lab') return 3;
  if (hash === '#showroom' || hash === '#pavilion') return 2;

  // The Showroom is the premier flagship experience of Sanvera
  return 2;
};

export const App: React.FC = () => {
  const [activeExp, setActiveExp] = useState<ExperienceId>(parseInitialExperience);
  const [pendingExp, setPendingExp] = useState<ExperienceId>(parseInitialExperience);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
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
      if (parsed !== activeExp) {
        setActiveExp(parsed);
        setPendingExp(parsed);
      }
    };

    window.addEventListener('popstate', handleUrlSync);
    window.addEventListener('hashchange', handleUrlSync);

    return () => {
      window.removeEventListener('popstate', handleUrlSync);
      window.removeEventListener('hashchange', handleUrlSync);
    };
  }, [activeExp]);

  // Switch experience with transition overlay, URL synchronization, and scroll reset
  const handleSwitchExperience = useCallback((id: ExperienceId) => {
    if (id === activeExp && !isTransitioning) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { duration: 0.8 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    setPendingExp(id);
    setIsTransitioning(true);
  }, [activeExp, isTransitioning]);

  // Callback triggered halfway through transition veil (screen fully covered)
  const handleTransitionMiddle = useCallback(() => {
    setActiveExp(pendingExp);

    const url = new URL(window.location.href);
    url.searchParams.set('exp', pendingExp.toString());

    if (pendingExp === 1) url.hash = '#art-of-water';
    else if (pendingExp === 2) url.hash = '#showroom';
    else if (pendingExp === 3) url.hash = '#motion';

    window.history.pushState(null, '', url.toString());

    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pendingExp]);

  // Callback when transition veil has completely faded out
  const handleTransitionEnd = useCallback(() => {
    setIsTransitioning(false);
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
      }, 650);
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

      {/* Cinematic Experience Switcher Transition Overlay */}
      <ExperienceTransitionOverlay
        isTransitioning={isTransitioning}
        targetExp={pendingExp}
        onTransitionMiddle={handleTransitionMiddle}
        onTransitionEnd={handleTransitionEnd}
      />

      {/* Fixed Header & Navigation */}
      <Header
        activeExp={activeExp}
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Fullscreen Overlay Menu */}
      <MenuOverlay
        isOpen={isMenuOpen}
        activeExp={activeExp}
        onClose={() => setIsMenuOpen(false)}
        onSelectExperience={handleSwitchExperience}
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

      {/* Dynamic Multi-Experience Container (Strict 3D WebGL scene lifecycle isolation) */}
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
          <ExperienceMotion
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
