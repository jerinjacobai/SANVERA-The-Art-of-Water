import React, { useMemo } from 'react';
import * as THREE from 'three';
import { ProductFinish } from '../../types';

interface AccessoryModelProps {
  finish?: ProductFinish;
  showPedestal?: boolean;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export const AccessoryModel: React.FC<AccessoryModelProps> = ({
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

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Stone Wall Background Plate */}
      {showPedestal && (
        <mesh position={[0, 0, -0.15]} receiveShadow>
          <boxGeometry args={[1.8, 1.4, 0.1]} />
          <meshStandardMaterial color="#2B2927" roughness={0.8} />
        </mesh>
      )}

      {/* Series 73 Architectural Brass Towel Rail */}
      <group position={[0, 0.15, 0]}>
        {/* Left Mount */}
        <mesh position={[-0.45, 0, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.024, 0.024, 0.12, 16]} />
          <primitive object={brassMaterial} attach="material" />
        </mesh>
        {/* Right Mount */}
        <mesh position={[0.45, 0, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.024, 0.024, 0.12, 16]} />
          <primitive object={brassMaterial} attach="material" />
        </mesh>
        {/* Horizontal Bar */}
        <mesh position={[0, 0, 0.01]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.015, 0.015, 0.96, 16]} />
          <primitive object={brassMaterial} attach="material" />
        </mesh>
      </group>

      {/* Series 87 Minimalist Robe Hook Duo */}
      <group position={[-0.22, -0.22, 0]}>
        <mesh position={[0, 0, -0.04]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.08, 16]} />
          <primitive object={brassMaterial} attach="material" />
        </mesh>
        <mesh position={[0, 0.02, 0.01]}>
          <cylinderGeometry args={[0.012, 0.012, 0.06, 16]} />
          <primitive object={brassMaterial} attach="material" />
        </mesh>
      </group>

      <group position={[0.22, -0.22, 0]}>
        <mesh position={[0, 0, -0.04]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.08, 16]} />
          <primitive object={brassMaterial} attach="material" />
        </mesh>
        <mesh position={[0, 0.02, 0.01]}>
          <cylinderGeometry args={[0.012, 0.012, 0.06, 16]} />
          <primitive object={brassMaterial} attach="material" />
        </mesh>
      </group>
    </group>
  );
};
