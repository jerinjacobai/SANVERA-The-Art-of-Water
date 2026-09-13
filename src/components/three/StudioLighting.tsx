import React from 'react';

interface StudioLightingProps {
  intensityMultiplier?: number;
  warmth?: number;
}

export const StudioLighting: React.FC<StudioLightingProps> = ({
  intensityMultiplier = 1,
  warmth = 1,
}) => {
  return (
    <>
      {/* Subtle ambient scene tone */}
      <ambientLight intensity={0.4 * intensityMultiplier} color="#151719" />

      {/* Hemisphere light for ground vs sky luxury bounce */}
      <hemisphereLight
        args={['#E8E3D8', '#08080A', 1.4 * intensityMultiplier]}
        position={[0, 10, 0]}
      />

      {/* Primary Key Light - Warm luxury studio spotlight */}
      <directionalLight
        position={[4, 6, 4]}
        intensity={3.8 * intensityMultiplier * warmth}
        color="#FFF4E0"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Back / Rim Light - Cool crisp edge definition on brass and chrome */}
      <directionalLight
        position={[-5, 3, -4]}
        intensity={2.2 * intensityMultiplier}
        color="#B0C8E8"
      />

      {/* Secondary Fill Light - Low warm side bounce */}
      <directionalLight
        position={[-3, -1, 3]}
        intensity={1.1 * intensityMultiplier}
        color="#A8875A"
      />

      {/* Top Accent Light for spout apex highlights */}
      <pointLight
        position={[0, 4, 1]}
        intensity={1.6 * intensityMultiplier}
        color="#FFFFFF"
        distance={8}
      />
    </>
  );
};
