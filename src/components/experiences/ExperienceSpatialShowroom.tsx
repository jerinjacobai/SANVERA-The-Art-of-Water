import React from 'react';
import { GoldenSpaShowroom } from './GoldenSpaShowroom';
import { ShowroomBlueprints } from './ShowroomBlueprints';

interface ExperienceSpatialShowroomProps {
  onOpenEnquiry: (productName: string) => void;
}

export const ExperienceSpatialShowroom: React.FC<ExperienceSpatialShowroomProps> = ({
  onOpenEnquiry,
}) => {
  return (
    <div className="relative w-full bg-void text-ink">
      {/* Flagship Interactive Golden Marble Spa Bathroom Sanctuary */}
      <GoldenSpaShowroom onOpenEnquiry={onOpenEnquiry} />

      {/* Architectural Engineering Blueprints & Technical Details */}
      <ShowroomBlueprints />
    </div>
  );
};
