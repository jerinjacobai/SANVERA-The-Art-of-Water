import React, { useState, useEffect, useCallback, useRef } from 'react';
import Lenis from 'lenis';
import { Header } from './components/layout/Header';
import { MenuOverlay } from './components/layout/MenuOverlay';
import { SearchModal } from './components/layout/SearchModal';
import { Footer } from './components/layout/Footer';
import { GoldenSpaShowroom } from './components/experiences/GoldenSpaShowroom';
import { ShowroomBlueprints } from './components/experiences/ShowroomBlueprints';
import { CollectionSection } from './components/sections/CollectionSection';
import { PhilosophySection } from './components/sections/PhilosophySection';
import { DrawingToProductSection } from './components/sections/DrawingToProductSection';
import { MaterialSection } from './components/sections/MaterialSection';
import { ArchitecturalGallery } from './components/sections/ArchitecturalGallery';
import { ExperienceFilmSection } from './components/sections/ExperienceFilmSection';
import { JournalSection } from './components/sections/JournalSection';
import { ProjectEnquirySection } from './components/sections/ProjectEnquirySection';
import { WaveBand } from './components/sections/WaveBand';
import { ProductViewerModal } from './components/three/ProductViewerModal';
import { CustomCursor } from './components/ui/CustomCursor';
import { CollectionItem } from './types';

export const App: React.FC = () => {
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

  // Handle Enquiry triggering across components
  const handleOpenEnquiryForProduct = useCallback((productName: string) => {
    setEnquiryPrefill(productName);
    const enquiryEl = document.getElementById('enquiry');
    if (enquiryEl) {
      enquiryEl.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Handle direct product selection for 3D inspection
  const handleSelectProduct = useCallback((item: CollectionItem) => {
    setSelectedProduct(item);
  }, []);

  return (
    <div className="min-h-screen bg-void text-ink font-sans selection:bg-[#00808c] selection:text-white relative">
      {/* Luxury Custom Cursor */}
      <CustomCursor />

      {/* High-Contrast, Prominent Luxury Header */}
      <Header
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Fullscreen Overlay Menu with Direct Architecture Navigation */}
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
      />

      {/* Interactive 3D Product Inspector Modal */}
      <ProductViewerModal
        item={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenEnquiry={handleOpenEnquiryForProduct}
      />

      {/* Unified Master Architectural Journey */}
      <main className="relative w-full">
        {/* 1. Flagship 3D Golden Spa Sanctuary Showroom (Main Hero) */}
        <GoldenSpaShowroom onOpenEnquiry={handleOpenEnquiryForProduct} />

        {/* 2. Architectural Elevation Blueprints & Engineering Schedule */}
        <ShowroomBlueprints />

        {/* 3. The 34-Product Master Collection (Interactive Studio & Finishes) */}
        <CollectionSection onSelectProduct={handleSelectProduct} />

        {/* 4. Fluid Water Wave Band Transition */}
        <WaveBand />

        {/* 5. Brand Philosophy: The Ritual of Water */}
        <PhilosophySection />

        {/* 6. Evolutionary Metamorphosis: Hand Drawing to 5-Axis CNC Object */}
        <DrawingToProductSection />

        {/* 7. Fluid Water Wave Band Transition */}
        <WaveBand reverse />

        {/* 8. Tactile Materiality: Solid Brass, Volcanic Stone, Optical Glass */}
        <MaterialSection />

        {/* 9. Built Architectural Context: Monolithic Sanctuaries */}
        <ArchitecturalGallery />

        {/* 10. The Sanctuary Film Experience */}
        <ExperienceFilmSection />

        {/* 11. Editorial Journal & Case Studies */}
        <JournalSection />

        {/* 12. Architectural Studio Project Consultation & Spec Enquiry */}
        <ProjectEnquirySection prefilledProduct={enquiryPrefill} />
      </main>

      {/* Grand Architectural Brand Footer */}
      <Footer />
    </div>
  );
};
