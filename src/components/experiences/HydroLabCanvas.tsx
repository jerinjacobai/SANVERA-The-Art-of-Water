import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { ProductFinish } from '../../types';
import { WaterStream } from '../three/WaterStream';

interface HydroLabRigProps {
  explodedProgress: number; // 0 (assembled) to 1 (fully exploded)
  activeFinish: ProductFinish;
  waterVelocity: number; // 0.2 (gentle) to 1.5 (high velocity)
  autoRotate: boolean;
}

const HydroLabRig: React.FC<HydroLabRigProps> = ({
  explodedProgress,
  activeFinish,
  waterVelocity,
  autoRotate,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  // Materials
  const M = useMemo(() => {
    const isBrass = activeFinish === 'brushed_brass';
    return {
      outerShell: new THREE.MeshStandardMaterial({
        color: isBrass ? '#A8875A' : '#D8DEE4',
        metalness: isBrass ? 0.88 : 0.96,
        roughness: 0.22,
      }),
      ceramicCartridge: new THREE.MeshStandardMaterial({
        color: '#2B5E7D', // Precision technical blue ceramic
        metalness: 0.1,
        roughness: 0.3,
      }),
      flowRegulator: new THREE.MeshStandardMaterial({
        color: '#D47E3B', // Engineered copper/brass mesh
        metalness: 0.6,
        roughness: 0.4,
      }),
      mountingFlange: new THREE.MeshStandardMaterial({
        color: '#222528',
        metalness: 0.8,
        roughness: 0.3,
      }),
      spoutTube: new THREE.MeshStandardMaterial({
        color: isBrass ? '#B59364' : '#E0E5EA',
        metalness: 0.9,
        roughness: 0.2,
      }),
      darkAccent: new THREE.MeshStandardMaterial({
        color: '#151719',
        metalness: 0.8,
        roughness: 0.2,
      }),
    };
  }, [activeFinish]);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  const exp = THREE.MathUtils.clamp(explodedProgress, 0, 1);

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* =========================================================================
          EXPLODED 3D COMPONENTS (Shift along axes based on explodedProgress)
          ========================================================================= */}

      {/* Component 1: Mounting Base Flange (Shifts downward: y -= exp * 1.8) */}
      <group position={[0.42, -1.48 - exp * 1.6, 0]}>
        <mesh material={M.mountingFlange} castShadow>
          <cylinderGeometry args={[0.42, 0.48, 0.15, 64]} />
        </mesh>
        <mesh position={[0, -0.15, 0]} material={M.darkAccent}>
          <cylinderGeometry args={[0.38, 0.38, 0.1, 48]} />
        </mesh>
      </group>

      {/* Component 2: Main Outer Brass Body (Stays central: y += 0) */}
      <group position={[0.42, -0.25, 0]}>
        <mesh material={M.outerShell} castShadow>
          <cylinderGeometry args={[0.26, 0.32, 2.3, 64]} />
        </mesh>
      </group>

      {/* Component 3: Internal Swiss Ceramic Cartridge (Shifts laterally right: x += exp * 2.2) */}
      <group position={[0.42 + exp * 1.8, -0.25, 0]}>
        <mesh material={M.ceramicCartridge}>
          <cylinderGeometry args={[0.2, 0.2, 1.2, 48]} />
        </mesh>
        <mesh position={[0, 0.7, 0]} material={M.flowRegulator}>
          <cylinderGeometry args={[0.08, 0.08, 0.3, 32]} />
        </mesh>
      </group>

      {/* Component 4: Spout Neck Arc & Outlet (Shifts upward & left: y += exp * 1.5, x -= exp * 1.2) */}
      <group position={[0.08 - exp * 0.9, 0.88 + exp * 1.4, 0]} rotation={[0, 0, -0.2]}>
        {/* Curved Neck */}
        <mesh material={M.spoutTube} castShadow>
          <torusGeometry args={[0.78, 0.21, 32, 96, Math.PI * 0.86]} />
        </mesh>
        {/* Horizontal Spout Extrusion */}
        <mesh
          position={[-0.34, 0.46, 0]}
          rotation={[0, 0, Math.PI / 2]}
          material={M.outerShell}
        >
          <cylinderGeometry args={[0.19, 0.21, 0.95, 48]} />
        </mesh>
      </group>

      {/* Component 5: Aerator Tip & Flow Disperser (Shifts far left: x -= exp * 2.6) */}
      <group position={[-0.68 - exp * 1.8, 1.48 + exp * 1.2, 0]}>
        <mesh material={M.flowRegulator}>
          <cylinderGeometry args={[0.18, 0.16, 0.18, 48]} />
        </mesh>
        {/* Water stream connects to aerator tip when assembled, fades out when exploded */}
        {exp < 0.25 && (
          <WaterStream
            active={true}
            intensity={waterVelocity * (1 - exp * 4)}
            origin={[0, 0, 0]}
            targetY={-2.8}
          />
        )}
      </group>

      {/* Component 6: Knurled Control Lever (Shifts right: x += exp * 2.4) */}
      <group position={[0.82 + exp * 2.2, -0.3, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <mesh material={M.outerShell}>
          <cylinderGeometry args={[0.25, 0.28, 0.18, 48]} />
        </mesh>
        <mesh position={[0, 0.14, 0]} material={M.darkAccent}>
          <cylinderGeometry args={[0.24, 0.24, 0.12, 64]} />
        </mesh>
        <mesh position={[0, 0.72, 0]} material={M.outerShell}>
          <cylinderGeometry args={[0.08, 0.08, 0.65, 32]} />
        </mesh>
      </group>
    </group>
  );
};

interface HydroLabCanvasProps {
  explodedProgress: number;
  activeFinish: ProductFinish;
  waterVelocity: number;
  autoRotate: boolean;
}

export const HydroLabCanvas: React.FC<HydroLabCanvasProps> = ({
  explodedProgress,
  activeFinish,
  waterVelocity,
  autoRotate,
}) => {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0.8, 5.8], fov: 38 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        dpr={[1, 2]}
      >
        <color attach="background" args={['#080A0B']} />
        <fog attach="fog" args={['#080A0B', 8, 22]} />

        {/* Studio Spotlight Rig */}
        <ambientLight intensity={0.4} color="#151719" />
        <directionalLight position={[5, 8, 6]} intensity={3.5} color="#FFF5E6" />
        <directionalLight position={[-6, 4, -4]} intensity={2.2} color="#90B8E8" />
        <pointLight position={[0, 3, 0]} intensity={1.5} color="#FFFFFF" />

        <HydroLabRig
          explodedProgress={explodedProgress}
          activeFinish={activeFinish}
          waterVelocity={waterVelocity}
          autoRotate={autoRotate}
        />

        <OrbitControls
          enablePan={false}
          minDistance={3.0}
          maxDistance={9.0}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2 + 0.1}
          dampingFactor={0.06}
        />
      </Canvas>
    </div>
  );
};
