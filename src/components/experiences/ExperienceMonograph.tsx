import React from 'react';
import { HeroSection } from '../hero/HeroSection';
import { WaveBand } from '../sections/WaveBand';
import { PhilosophySection } from '../sections/PhilosophySection';
import { DrawingToProductSection } from '../sections/DrawingToProductSection';
import { MaterialSection } from '../sections/MaterialSection';
import { CollectionSection } from '../sections/CollectionSection';
import { ArchitecturalGallery } from '../sections/ArchitecturalGallery';
import { ExperienceFilmSection } from '../sections/ExperienceFilmSection';
import { JournalSection } from '../sections/JournalSection';
import { ProjectEnquirySection } from '../sections/ProjectEnquirySection';
import { CollectionItem } from '../../types';

interface ExperienceMonographProps {
  onSelectProduct: (item: CollectionItem) => void;
  enquiryPrefill?: string;
}

export const ExperienceMonograph: React.FC<ExperienceMonographProps> = ({
  onSelectProduct,
  enquiryPrefill,
}) => {
  return (
    <div className="w-full">
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
      <CollectionSection onSelectProduct={onSelectProduct} />

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
    </div>
  );
};
