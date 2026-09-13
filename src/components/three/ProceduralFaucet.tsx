import React, { useMemo } from 'react';
import * as THREE from 'three';
import { ProductFinish } from '../../types';
import { WaterStream } from './WaterStream';

interface ProceduralFaucetProps {
  finish?: ProductFinish;
  waterActive?: boolean;
  waterIntensity?: number;
  showPedestal?: boolean;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export const ProceduralFaucet: React.FC<ProceduralFaucetProps> = ({
  finish = 'brushed_brass',
  waterActive = true,
  waterIntensity = 1,
  showPedestal = true,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}) => {
  // PBR Material Configurations for luxury finishes
  const material = useMemo(() => {
    switch (finish) {
      case 'polished_chrome':
        return new THREE.MeshStandardMaterial({
          color: new THREE.Color('#D8DEE4'),
          metalness: 0.98,
          roughness: 0.08,
          envMapIntensity: 1.5,
        });
      case 'dark_bronze':
        return new THREE.MeshStandardMaterial({
          color: new THREE.Color('#221D1A'),
          metalness: 0.82,
          roughness: 0.35,
          envMapIntensity: 1.1,
        });
      case 'matte_stone':
        return new THREE.MeshStandardMaterial({
          color: new THREE.Color('#948E83'),
          metalness: 0.04,
          roughness: 0.84,
          envMapIntensity: 0.4,
        });
      case 'brushed_brass':
      default:
        return new THREE.MeshStandardMaterial({
          color: new THREE.Color('#A8875A'),
          metalness: 0.88,
          roughness: 0.24,
          envMapIntensity: 1.3,
        });
    }
  }, [finish]);

  // Accent / Detail Materials
  const darkAccentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#141517'),
        metalness: 0.7,
        roughness: 0.25,
      }),
    []
  );

  const stonePedestalMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#42403B'),
        metalness: 0.06,
        roughness: 0.82,
      }),
    []
  );

  const knurledMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: finish === 'brushed_brass' ? new THREE.Color('#B59364') : material.color,
        metalness: material.metalness,
        roughness: Math.min(material.roughness + 0.15, 0.6),
        bumpScale: 0.05,
      }),
    [finish, material]
  );

  // Spout tip coordinates for water stream
  // Neck positioned at x: 0.35, y: -0.2, z: 0.
  // Elbow connects neck to horizontal spout extending back towards x: -0.65, y: 1.45.
  const spoutTipPosition: [number, number, number] = [-0.7, 1.48, 0];

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* 1. Monolithic Honed Stone Pedestal Base */}
      {showPedestal && (
        <group position={[0, -1.75, 0]}>
          <mesh material={stonePedestalMaterial} castShadow receiveShadow>
            <cylinderGeometry args={[2.0, 2.3, 0.45, 96]} />
          </mesh>
          {/* Subtle recessed water pooling reservoir */}
          <mesh position={[0, 0.23, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0, 1.85, 64]} />
            <meshStandardMaterial
              color="#2D2B28"
              metalness={0.1}
              roughness={0.7}
            />
          </mesh>
          {/* Metallic water drain collar */}
          <mesh position={[-0.7, 0.232, 0]} rotation={[-Math.PI / 2, 0, 0]} material={material}>
            <ringGeometry args={[0.08, 0.22, 48]} />
          </mesh>
        </group>
      )}

      {/* 2. Precision Counter Mounting Collar */}
      <mesh position={[0.42, -1.48, 0]} material={material} castShadow>
        <cylinderGeometry args={[0.42, 0.46, 0.1, 64]} />
      </mesh>
      <mesh position={[0.42, -1.43, 0]} material={darkAccentMaterial}>
        <cylinderGeometry args={[0.39, 0.42, 0.03, 64]} />
      </mesh>

      {/* 3. Main Vertical Cylindrical Body */}
      <mesh position={[0.42, -0.25, 0]} material={material} castShadow>
        <cylinderGeometry args={[0.26, 0.32, 2.3, 64]} />
      </mesh>

      {/* 4. Elegant Continuous Arc Spout Neck */}
      <mesh position={[0.08, 0.88, 0]} rotation={[0, 0, -0.2]} material={material} castShadow>
        <torusGeometry args={[0.78, 0.21, 32, 96, Math.PI * 0.86]} />
      </mesh>

      {/* 5. Spout Outlet Nozzle Tube */}
      <mesh
        position={[-0.26, 1.34, 0]}
        rotation={[0, 0, Math.PI / 2 - 0.2]}
        material={material}
        castShadow
      >
        <cylinderGeometry args={[0.19, 0.21, 0.95, 48]} />
      </mesh>

      {/* 6. Aerator Trim & Concealed Tip Ring */}
      <mesh
        position={[-0.68, 1.48, 0]}
        rotation={[0, 0, Math.PI / 2 - 0.2]}
        material={darkAccentMaterial}
      >
        <cylinderGeometry args={[0.21, 0.17, 0.14, 48]} />
      </mesh>

      {/* 7. Precision Side Control Lever (Knurled Joystick Mechanism) */}
      <group position={[0.82, -0.3, 0]} rotation={[0, 0, -Math.PI / 2]}>
        {/* Valve socket collar */}
        <mesh position={[0, 0, 0]} material={material}>
          <cylinderGeometry args={[0.25, 0.28, 0.18, 48]} />
        </mesh>
        {/* Knurled grip band */}
        <mesh position={[0, 0.14, 0]} material={knurledMaterial}>
          <cylinderGeometry args={[0.24, 0.24, 0.12, 64]} />
        </mesh>
        {/* Lever stem */}
        <mesh position={[0, 0.38, 0]} material={material}>
          <cylinderGeometry args={[0.18, 0.23, 0.38, 48]} />
        </mesh>
        {/* Minimalist lever pin */}
        <mesh position={[0, 0.82, 0]} material={material} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.65, 32]} />
        </mesh>
      </group>

      {/* 8. Flowing Water Stream Simulation */}
      <WaterStream
        active={waterActive}
        intensity={waterIntensity}
        origin={spoutTipPosition}
        targetY={-1.5}
      />
    </group>
  );
};
