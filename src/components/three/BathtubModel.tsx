import React, { useMemo } from 'react';
import * as THREE from 'three';
import { ProductFinish } from '../../types';
import { WaterStream } from './WaterStream';

interface BathtubModelProps {
  finish?: ProductFinish;
  waterActive?: boolean;
  waterIntensity?: number;
  showPedestal?: boolean;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export const BathtubModel: React.FC<BathtubModelProps> = ({
  finish = 'brushed_brass',
  waterActive = true,
  waterIntensity = 1,
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

  const tubMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#ECEAE4',
      roughness: 0.38,
      metalness: 0.04,
    });
  }, []);

  const waterMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#A8D0E8',
      transparent: true,
      opacity: 0.65,
      transmission: 0.82,
      roughness: 0.06,
      ior: 1.333,
    });
  }, []);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Optional Architectural Stone Base Plinth */}
      {showPedestal && (
        <mesh position={[0, -0.65, 0]} receiveShadow>
          <boxGeometry args={[4.2, 0.15, 2.6]} />
          <meshStandardMaterial color="#2E2D2B" roughness={0.78} metalness={0.06} />
        </mesh>
      )}

      {/* Outer Bathtub Shell - Sculptural Double-Ended Oval */}
      <group position={[0, 0, 0]}>
        {/* Main Oval Tub Body */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.55, 1.25, 1.05, 48]} />
          <primitive object={tubMaterial} attach="material" />
        </mesh>

        {/* Rim bevel */}
        <mesh position={[0, 0.52, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.35, 1.58, 48]} />
          <primitive object={tubMaterial} attach="material" />
        </mesh>

        {/* Inner Tub Basin Hollow */}
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[1.36, 1.12, 0.95, 48]} />
          <meshStandardMaterial color="#E2DFD8" roughness={0.25} side={THREE.BackSide} />
        </mesh>

        {/* Water Level in Tub */}
        <mesh position={[0, 0.22, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.32, 48]} />
          <primitive object={waterMaterial} attach="material" />
        </mesh>

        {/* Pop-up Drain in Tub Floor */}
        <mesh position={[0, -0.38, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.02, 24]} />
          <primitive object={brassMaterial} attach="material" />
        </mesh>

        {/* Floor-Mounted Freestanding Bath Mixer & Spout */}
        <group position={[1.82, -0.58, 0]}>
          {/* Base Escutcheon */}
          <mesh position={[0, 0.04, 0]}>
            <cylinderGeometry args={[0.16, 0.18, 0.08, 32]} />
            <primitive object={brassMaterial} attach="material" />
          </mesh>
          {/* Vertical Column */}
          <mesh position={[0, 0.75, 0]}>
            <cylinderGeometry args={[0.042, 0.042, 1.42, 24]} />
            <primitive object={brassMaterial} attach="material" />
          </mesh>
          {/* Mixer Valve Handle */}
          <mesh position={[0, 1.05, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.12, 24]} />
            <primitive object={brassMaterial} attach="material" />
          </mesh>
          {/* Curved Gooseneck Spout */}
          <mesh position={[-0.22, 1.48, 0]} rotation={[0, 0, Math.PI / 3]}>
            <torusGeometry args={[0.26, 0.038, 16, 32, Math.PI / 1.3]} />
            <primitive object={brassMaterial} attach="material" />
          </mesh>
          {/* Hand Shower Bracket & Wand */}
          <mesh position={[0.08, 1.15, -0.05]} rotation={[0, 0, -0.2]}>
            <cylinderGeometry args={[0.02, 0.02, 0.28, 16]} />
            <primitive object={brassMaterial} attach="material" />
          </mesh>

          {/* Water stream from spout into tub */}
          {waterActive && (
            <WaterStream
              active={true}
              intensity={waterIntensity}
              origin={[-0.45, 1.48, 0]}
              targetY={0.8}
            />
          )}
        </group>
      </group>
    </group>
  );
};
