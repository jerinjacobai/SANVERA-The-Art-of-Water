import React, { useMemo } from 'react';
import * as THREE from 'three';
import { ProductFinish } from '../../types';
import { WaterStream } from './WaterStream';

interface BasinModelProps {
  finish?: ProductFinish;
  waterActive?: boolean;
  waterIntensity?: number;
  showPedestal?: boolean;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export const BasinModel: React.FC<BasinModelProps> = ({
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

  const ceramicMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#F4F2EC',
      roughness: 0.22,
      metalness: 0.04,
    });
  }, []);

  const stoneVanityMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#34322E',
      roughness: 0.72,
      metalness: 0.05,
    });
  }, []);

  const waterMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#A0C8E0',
      transparent: true,
      opacity: 0.65,
      transmission: 0.85,
      roughness: 0.05,
      ior: 1.333,
    });
  }, []);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Vanity Countertop or Pedestal Stand */}
      {showPedestal && (
        <group position={[0, -0.65, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.6, 0.12, 1.1]} />
            <primitive object={stoneVanityMaterial} attach="material" />
          </mesh>
          {/* Monolithic Support Column */}
          <mesh position={[0, -0.5, 0]} castShadow>
            <cylinderGeometry args={[0.22, 0.26, 0.9, 32]} />
            <primitive object={stoneVanityMaterial} attach="material" />
          </mesh>
        </group>
      )}

      {/* Ceramic Vessel Countertop Basin */}
      <group position={[0, -0.4, 0]}>
        {/* Basin Outer Wall */}
        <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.48, 0.38, 0.3, 48]} />
          <primitive object={ceramicMaterial} attach="material" />
        </mesh>
        {/* Basin Inner Hollow */}
        <mesh position={[0, 0.18, 0]}>
          <cylinderGeometry args={[0.44, 0.32, 0.26, 48]} />
          <meshStandardMaterial color="#EAE7DF" roughness={0.18} side={THREE.BackSide} />
        </mesh>
        {/* Water Pool in Bottom */}
        <mesh position={[0, 0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.35, 32]} />
          <primitive object={waterMaterial} attach="material" />
        </mesh>
        {/* Pop-up Drain Assembly */}
        <mesh position={[0, 0.055, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.015, 24]} />
          <primitive object={brassMaterial} attach="material" />
        </mesh>
      </group>

      {/* Sanvera Tall Vessel Basin Mixer (Deck-mounted behind basin) */}
      <group position={[0, -0.4, -0.42]}>
        {/* Base Ring */}
        <mesh position={[0, 0.03, 0]}>
          <cylinderGeometry args={[0.065, 0.07, 0.06, 32]} />
          <primitive object={brassMaterial} attach="material" />
        </mesh>
        {/* Column */}
        <mesh position={[0, 0.34, 0]}>
          <cylinderGeometry args={[0.036, 0.036, 0.58, 24]} />
          <primitive object={brassMaterial} attach="material" />
        </mesh>
        {/* Control Handle */}
        <mesh position={[0, 0.65, 0]}>
          <cylinderGeometry args={[0.038, 0.038, 0.08, 24]} />
          <primitive object={brassMaterial} attach="material" />
        </mesh>
        {/* Forward Arch Spout */}
        <mesh position={[0, 0.58, 0.12]} rotation={[Math.PI / 2.2, 0, 0]}>
          <cylinderGeometry args={[0.024, 0.024, 0.24, 20]} />
          <primitive object={brassMaterial} attach="material" />
        </mesh>
        {/* Spout Tip */}
        <mesh position={[0, 0.49, 0.23]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.06, 20]} />
          <primitive object={brassMaterial} attach="material" />
        </mesh>

        {/* Laminar Flow Stream from mixer spout into basin */}
        {waterActive && (
          <WaterStream
            active={true}
            intensity={waterIntensity}
            origin={[0, 0.47, 0.23]}
            targetY={0.12}
          />
        )}
      </group>
    </group>
  );
};
