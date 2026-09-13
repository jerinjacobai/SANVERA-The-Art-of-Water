import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Header } from './components/layout/Header';
import { MenuOverlay } from './components/layout/MenuOverlay';
import { SearchModal } from './components/layout/SearchModal';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/hero/HeroSection';
import { WaveBand } from './components/sections/WaveBand';
import { PhilosophySection } from './components/sections/PhilosophySection';
import { DrawingToProductSection } from './components/sections/DrawingToProductSection';
import { MaterialSection } from './components/sections/MaterialSection';
import { CollectionSection } from './components/sections/CollectionSection';
import { ArchitecturalGallery } from './components/sections/ArchitecturalGallery';
import { ExperienceFilmSection } from './components/sections/ExperienceFilmSection';
import { JournalSection } from './components/sections/JournalSection';
import { ProjectEnquirySection } from './components/sections/ProjectEnquirySection';
import { ProductViewerModal } from './components/three/ProductViewerModal';
import { CustomCursor } from './components/ui/CustomCursor';
import { CollectionItem } from './types';

export const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<CollectionItem | null>(null);
  const [enquiryPrefill, setEnquiryPrefill] = useState<string>('');

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

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleOpenEnquiryForProduct = (productName: string) => {
    setEnquiryPrefill(productName);
    const enquiryEl = document.getElementById('enquiry');
    if (enquiryEl) {
      enquiryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

      {/* Main Experience Flow */}
      <main>
        {/* 1. Immersive Pinned 3D Hero Scene with Scroll Choreography */}
        <HeroSection />

        {/* 2. Sinusoidal Water Wave Band Transition */}
        <WaveBand />

        {/* 3. Brand Philosophy & Studio Craft */}
        <PhilosophySection />

        {/* 4. Signature Drawing -> Geometry -> Model -> Object Metamorphosis */}
        <DrawingToProductSection />

        {/* 5. Sinusoidal Water Wave Band Transition */}
        <WaveBand reverse />

        {/* 6. Tactile Materiality: Brass, Stone, Glass, Water */}
        <MaterialSection />

        {/* 7. The Collection (Editorial rows with hover preview) */}
        <CollectionSection onSelectProduct={(item) => setSelectedProduct(item)} />

        {/* 8. Sinusoidal Water Wave Band Transition */}
        <WaveBand />

        {/* 9. Architectural Context: Monolithic Bathrooms */}
        <ArchitecturalGallery />

        {/* 10. The Sanctuary Film Experience */}
        <ExperienceFilmSection />

        {/* 11. Editorial Journal & Essays */}
        <JournalSection />

        {/* 12. Architectural Studio Project Enquiry */}
        <ProjectEnquirySection prefilledProduct={enquiryPrefill} />
      </main>

      {/* Grand Architectural Footer */}
      <Footer />
    </div>
  );
};
