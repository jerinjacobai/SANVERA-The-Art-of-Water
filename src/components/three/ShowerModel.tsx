import React, { useMemo } from 'react';
import * as THREE from 'three';
import { ProductFinish } from '../../types';
import { WaterStream } from './WaterStream';

interface ShowerModelProps {
  finish?: ProductFinish;
  waterActive?: boolean;
  waterIntensity?: number;
  showPedestal?: boolean;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export const ShowerModel: React.FC<ShowerModelProps> = ({
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

  const wallMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#282725',
      roughness: 0.85,
      metalness: 0.05,
    });
  }, []);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Stone Architectural Wall Niche */}
      {showPedestal && (
        <group position={[0, 0, -0.6]}>
          <mesh receiveShadow>
            <boxGeometry args={[3.2, 4.4, 0.25]} />
            <primitive object={wallMaterial} attach="material" />
          </mesh>
          {/* Shower Tray / Floor */}
          <mesh position={[0, -2.2, 1.2]} receiveShadow>
            <boxGeometry args={[3.2, 0.15, 2.4]} />
            <meshStandardMaterial color="#1E1D1B" roughness={0.9} />
          </mesh>
          {/* Linear Floor Drain in shower tray */}
          <mesh position={[0, -2.12, 0.4]}>
            <boxGeometry args={[1.2, 0.02, 0.1]} />
            <primitive object={brassMaterial} attach="material" />
          </mesh>
        </group>
      )}

      {/* Concealed 5061 Thermostatic Rough-in Plate (Centered at torso height) */}
      <group position={[0, -0.2, -0.47]}>
        {/* Recessed Wall Escutcheon Plate */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.34, 0.72, 0.02]} />
          <primitive object={brassMaterial} attach="material" />
        </mesh>
        {/* Top Knob: Water Diverter / Flow Volume */}
        <mesh position={[0, 0.2, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.055, 0.055, 0.06, 32]} />
          <primitive object={brassMaterial} attach="material" />
        </mesh>
        {/* Diamond Knurling band */}
        <mesh position={[0, 0.2, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.057, 0.057, 0.03, 32]} />
          <meshStandardMaterial color="#886C44" metalness={0.9} roughness={0.5} />
        </mesh>
        {/* Bottom Knob: Thermostatic Temperature Lock (38°C stop) */}
        <mesh position={[0, -0.18, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.055, 0.055, 0.06, 32]} />
          <primitive object={brassMaterial} attach="material" />
        </mesh>
      </group>

      {/* Wall-Mounted Hand Shower Bracket, Hose & Stick */}
      <group position={[0.42, -0.3, -0.47]}>
        <mesh position={[0, 0, 0.03]}>
          <cylinderGeometry args={[0.03, 0.03, 0.06, 24]} />
          <primitive object={brassMaterial} attach="material" />
        </mesh>
        {/* Hand Shower Wand */}
        <mesh position={[0, 0.14, 0.08]} rotation={[-0.1, 0, 0]}>
          <cylinderGeometry args={[0.018, 0.022, 0.28, 20]} />
          <primitive object={brassMaterial} attach="material" />
        </mesh>
      </group>

      {/* 300mm Overhead Rain Shower Arm & Ultra-Slim Canopy */}
      <group position={[0, 1.7, -0.47]}>
        {/* Wall Flange */}
        <mesh position={[0, 0, 0.02]}>
          <cylinderGeometry args={[0.045, 0.045, 0.02, 24]} />
          <primitive object={brassMaterial} attach="material" />
        </mesh>
        {/* Horizontal Extension Arm */}
        <mesh position={[0, 0, 0.42]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.022, 0.022, 0.8, 24]} />
          <primitive object={brassMaterial} attach="material" />
        </mesh>
        {/* 90-degree drop */}
        <mesh position={[0, -0.06, 0.8]}>
          <cylinderGeometry args={[0.022, 0.022, 0.12, 24]} />
          <primitive object={brassMaterial} attach="material" />
        </mesh>
        {/* 300mm Circular Rain Shower Canopy Disk */}
        <mesh position={[0, -0.13, 0.8]} castShadow>
          <cylinderGeometry args={[0.38, 0.38, 0.018, 48]} />
          <primitive object={brassMaterial} attach="material" />
        </mesh>
        {/* Nozzle Faceplate */}
        <mesh position={[0, -0.14, 0.8]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.36, 48]} />
          <meshStandardMaterial color="#44423E" roughness={0.3} />
        </mesh>

        {/* Multi-Droplet Falling Rainfall Shower Curtain */}
        {waterActive && (
          <group position={[0, -0.15, 0.8]}>
            <WaterStream active={true} intensity={waterIntensity} origin={[0, 0, 0]} targetY={-3.7} />
            <WaterStream active={true} intensity={waterIntensity * 0.8} origin={[-0.15, 0, 0]} targetY={-3.7} />
            <WaterStream active={true} intensity={waterIntensity * 0.8} origin={[0.15, 0, 0]} targetY={-3.7} />
            <WaterStream active={true} intensity={waterIntensity * 0.8} origin={[0, 0, -0.15]} targetY={-3.7} />
            <WaterStream active={true} intensity={waterIntensity * 0.8} origin={[0, 0, 0.15]} targetY={-3.7} />
          </group>
        )}
      </group>
    </group>
  );
};
