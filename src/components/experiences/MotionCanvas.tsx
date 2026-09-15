import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ProductFinish } from '../../types';
import { ProceduralFaucet } from '../three/ProceduralFaucet';

interface MotionCanvasProps {
  progress: number; // 0 to 1 scroll progression
  activeFinish: ProductFinish;
}

const MotionScene: React.FC<MotionCanvasProps> = ({ progress, activeFinish }) => {
  const lineRef = useRef<THREE.Line>(null);
  const wireframeGroupRef = useRef<THREE.Group>(null);
  const productGroupRef = useRef<THREE.Group>(null);
  const architectureGroupRef = useRef<THREE.Group>(null);

  // Chapter 01 & 02: Dynamic spline curve representing the initial gestural water arc
  const { curvePoints, curveGeometry } = useMemo(() => {
    const curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-2.2, 2.8, -1.0),
      new THREE.Vector3(-0.8, 3.4, 0.5),
      new THREE.Vector3(0.8, 2.2, 1.2),
      new THREE.Vector3(1.8, -0.5, 0.2)
    );
    const pts = curve.getPoints(80);
    const geom = new THREE.BufferGeometry().setFromPoints(pts);
    return { curvePoints: pts, curveGeometry: geom };
  }, []);

  // Compute staged visibility and opacity from progress (0 to 1)
  // 0.00 - 0.22: Line & Curve (Chapters 1 & 2)
  // 0.20 - 0.40: Wireframe Form (Chapter 3)
  // 0.38 - 1.00: Solid Product & Materials (Chapters 4 - 9)
  // 0.48 - 1.00: Water flow (Chapters 5 - 9)
  // 0.68 - 1.00: Architectural space (Chapters 7 - 9)

  useFrame((state) => {
    const p = Math.max(0, Math.min(1, progress));

    // Camera Choreography across the 9 chapters
    const cam = state.camera;
    if (p < 0.25) {
      // Approach abstract curve
      const t = p / 0.25;
      cam.position.set(
        THREE.MathUtils.lerp(0, 1.5, t),
        THREE.MathUtils.lerp(2.2, 2.8, t),
        THREE.MathUtils.lerp(6.5, 4.8, t)
      );
      cam.lookAt(0, 1.8, 0);
    } else if (p < 0.5) {
      // Rotate around wireframe into material
      const t = (p - 0.25) / 0.25;
      const angle = t * Math.PI * 0.75;
      const radius = THREE.MathUtils.lerp(4.8, 3.8, t);
      cam.position.set(
        Math.sin(angle) * radius,
        THREE.MathUtils.lerp(2.8, 2.0, t),
        Math.cos(angle) * radius
      );
      cam.lookAt(0, 1.5, 0);
    } else if (p < 0.75) {
      // Macro focus on knurling and water release
      const t = (p - 0.5) / 0.25;
      cam.position.set(
        THREE.MathUtils.lerp(3.2, 1.8, t),
        THREE.MathUtils.lerp(2.0, 1.6, t),
        THREE.MathUtils.lerp(2.4, 2.8, t)
      );
      cam.lookAt(0, 1.4, 0);
    } else {
      // Grand pull-back to architectural portrait
      const t = (p - 0.75) / 0.25;
      cam.position.set(
        THREE.MathUtils.lerp(1.8, 0, t),
        THREE.MathUtils.lerp(1.6, 2.1, t),
        THREE.MathUtils.lerp(2.8, 5.8, t)
      );
      cam.lookAt(0, 1.5, 0);
    }

    // Dynamic rotation of elements
    if (productGroupRef.current) {
      productGroupRef.current.rotation.y = p * Math.PI * 0.6;
    }
    if (wireframeGroupRef.current) {
      wireframeGroupRef.current.rotation.y = p * Math.PI * 0.6;
    }
    if (lineRef.current) {
      lineRef.current.rotation.y = p * 0.8;
      lineRef.current.rotation.z = Math.sin(p * Math.PI) * 0.15;
    }
  });

  const isLineVisible = progress < 0.35;
  const isWireframeVisible = progress >= 0.18 && progress < 0.52;
  const isProductVisible = progress >= 0.35;
  const isWaterActive = progress >= 0.48;
  const isSpaceVisible = progress >= 0.65;

  return (
    <>
      {/* Studio Lighting with Dramatic Key & Rim */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 7, 5]} intensity={2.2} color="#FFF5E8" castShadow />
      <directionalLight position={[-5, 4, -4]} intensity={1.2} color="#90B0D8" />
      <pointLight position={[0, -0.5, 2]} intensity={0.8} color="#C5A059" distance={5} />

      {/* CHAPTER 01 & 02: Gestural Spline Line & Harmonic Curve */}
      {isLineVisible && (
        <group position={[0, 0.4, 0]}>
          <primitive object={new THREE.Line(curveGeometry, new THREE.LineBasicMaterial({
            color: '#C5A059',
            linewidth: 2,
            transparent: true,
            opacity: progress < 0.2 ? 1 : Math.max(0, 1 - (progress - 0.2) / 0.15),
          }))} ref={lineRef} />

          {/* Floating particle markers along curve */}
          {curvePoints.filter((_, idx) => idx % 8 === 0).map((pt, i) => (
            <mesh key={i} position={[pt.x, pt.y, pt.z]}>
              <sphereGeometry args={[0.035, 16, 16]} />
              <meshBasicMaterial color="#E8C88A" transparent opacity={0.8} />
            </mesh>
          ))}
        </group>
      )}

      {/* CHAPTER 03: Wireframe CAD Mesh Topology */}
      {isWireframeVisible && (
        <group ref={wireframeGroupRef} position={[0, 0, 0]}>
          {/* Faucet stem wireframe */}
          <mesh position={[0, 1.2, 0]}>
            <cylinderGeometry args={[0.22, 0.24, 1.4, 16, 6]} />
            <meshBasicMaterial color="#A8875A" wireframe transparent opacity={0.5} />
          </mesh>
          {/* Spout arc wireframe */}
          <mesh position={[0.45, 1.9, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <torusGeometry args={[0.5, 0.12, 12, 24, Math.PI / 2]} />
            <meshBasicMaterial color="#E8C88A" wireframe transparent opacity={0.6} />
          </mesh>
          {/* Base pedestal wireframe */}
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.85, 0.95, 0.6, 24, 4]} />
            <meshBasicMaterial color="#6E7276" wireframe transparent opacity={0.4} />
          </mesh>
        </group>
      )}

      {/* CHAPTERS 04 - 09: Solid Cold-Forged Brass Object (664 Series Faucet & Water) */}
      {isProductVisible && (
        <group ref={productGroupRef} position={[0, 0, 0]}>
          <ProceduralFaucet
            finish={activeFinish}
            waterActive={isWaterActive}
            waterIntensity={progress >= 0.7 ? 1.0 : 0.6}
            showPedestal={true}
            scale={0.85}
          />
        </group>
      )}

      {/* CHAPTERS 07 - 09: Brutalist Architectural Sanctuary Composition */}
      {isSpaceVisible && (
        <group ref={architectureGroupRef} position={[0, 0, 0]}>
          {/* Northern backdrop limestone panel */}
          <mesh position={[0, 3.5, -4.5]}>
            <boxGeometry args={[14, 8, 0.4]} />
            <meshStandardMaterial color="#181A1C" roughness={0.88} metalness={0.1} />
          </mesh>
          {/* Side architectural monolith column */}
          <mesh position={[-4.5, 3.5, -1.5]}>
            <boxGeometry args={[0.8, 8, 3.5]} />
            <meshStandardMaterial color="#222428" roughness={0.85} metalness={0.1} />
          </mesh>
          {/* Polished water reflection ground */}
          <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[16, 16]} />
            <meshStandardMaterial color="#0A0B0C" roughness={0.12} metalness={0.85} />
          </mesh>
        </group>
      )}
    </>
  );
};

export const MotionCanvas: React.FC<MotionCanvasProps> = (props) => {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 2.5, 6.5], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      className="w-full h-full"
    >
      <MotionScene {...props} />
    </Canvas>
  );
};
