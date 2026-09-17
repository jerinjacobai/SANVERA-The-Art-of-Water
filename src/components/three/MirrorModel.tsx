import React, { useMemo } from 'react';
import * as THREE from 'three';
import { ProductFinish } from '../../types';

interface MirrorModelProps {
  finish?: ProductFinish;
  showPedestal?: boolean;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export const MirrorModel: React.FC<MirrorModelProps> = ({
  finish = 'brushed_brass',
  showPedestal = true,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}) => {
  const brassMaterial = useMemo(() => {
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

  const mirrorGlass = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#D2DCE4',
      roughness: 0.02,
      metalness: 0.98,
      envMapIntensity: 2.0,
    });
  }, []);

  const wallMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#1E1D1B',
      roughness: 0.88,
      metalness: 0.04,
    });
  }, []);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Stone Backdrop Wall */}
      {showPedestal && (
        <mesh position={[0, 0, -0.15]} receiveShadow>
          <boxGeometry args={[2.4, 2.6, 0.1]} />
          <primitive object={wallMaterial} attach="material" />
        </mesh>
      )}

      {/* Floating Ambient LED Backlit Mirror */}
      <group position={[0, 0, 0]}>
        {/* Backing Light Plate (Warm Diffused Glow) */}
        <mesh position={[0, 0, -0.04]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.74, 0.74, 0.02, 48]} />
          <meshBasicMaterial color="#FFE8C0" transparent opacity={0.65} />
        </mesh>
        {/* Soft Ambient Light Halo */}
        <pointLight position={[0, 0, 0.1]} intensity={1.8} color="#FFE6B8" distance={3.5} />

        {/* Polished Brass Rim Trim */}
        <mesh position={[0, 0, -0.01]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.71, 0.71, 0.035, 48]} />
          <primitive object={brassMaterial} attach="material" />
        </mesh>

        {/* Mirror Front Glass Plate */}
        <mesh position={[0, 0, 0.01]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.69, 0.69, 0.01, 48]} />
          <primitive object={mirrorGlass} attach="material" />
        </mesh>

        {/* Illuminated Capacitive Touch Switch Ring */}
        <mesh position={[0, -0.45, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.025, 0.035, 24]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      </group>
    </group>
  );
};
