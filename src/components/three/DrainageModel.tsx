import React, { useMemo } from 'react';
import * as THREE from 'three';
import { ProductFinish } from '../../types';

interface DrainageModelProps {
  finish?: ProductFinish;
  showPedestal?: boolean;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export const DrainageModel: React.FC<DrainageModelProps> = ({
  finish = 'brushed_brass',
  showPedestal = true,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}) => {
  const metalMaterial = useMemo(() => {
    switch (finish) {
      case 'polished_chrome':
        return new THREE.MeshStandardMaterial({ color: '#D8DEE4', metalness: 0.98, roughness: 0.08 });
      case 'dark_bronze':
        return new THREE.MeshStandardMaterial({ color: '#221D1A', metalness: 0.82, roughness: 0.35 });
      case 'matte_stone':
        return new THREE.MeshStandardMaterial({ color: '#948E83', metalness: 0.04, roughness: 0.84 });
      case 'brushed_brass':
      default:
        return new THREE.MeshStandardMaterial({ color: '#A8875A', metalness: 0.88, roughness: 0.24 });
    }
  }, [finish]);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Surrounding Stone Floor Section */}
      {showPedestal && (
        <mesh position={[0, -0.15, 0]} receiveShadow>
          <boxGeometry args={[1.8, 0.2, 1.2]} />
          <meshStandardMaterial color="#2E2C29" roughness={0.82} />
        </mesh>
      )}

      {/* Linear Tile-in Floor Drain Channel */}
      <group position={[0, -0.04, 0]}>
        {/* Recessed Trough */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.2, 0.04, 0.18]} />
          <meshStandardMaterial color="#141414" roughness={0.5} />
        </mesh>
        {/* Brushed Brass / Stainless Grate Insert */}
        <mesh position={[0, 0.015, 0]}>
          <boxGeometry args={[1.16, 0.015, 0.14]} />
          <primitive object={metalMaterial} attach="material" />
        </mesh>
        {/* Tile insert center */}
        <mesh position={[0, 0.024, 0]}>
          <boxGeometry args={[1.12, 0.01, 0.1]} />
          <meshStandardMaterial color="#3A3834" roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
};
