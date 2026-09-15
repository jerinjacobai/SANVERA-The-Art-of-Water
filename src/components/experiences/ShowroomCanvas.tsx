import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { ProductFinish } from '../../types';
import { ProceduralFaucet } from '../three/ProceduralFaucet';
import { WaterStream } from '../three/WaterStream';

export interface ShowroomZone {
  id: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  t: number; // 0 to 1 on path
  focusTarget: [number, number, number];
}

export const SHOWROOM_ZONES: ShowroomZone[] = [
  {
    id: 'approach',
    number: '00',
    name: 'Approach & Forecourt',
    tagline: 'Exterior reflection pool and limestone paving',
    description: 'The architectural experience begins before crossing the threshold. A quiet reflecting water basin mirrors the monolithic limestone pavilion.',
    t: 0.05,
    focusTarget: [0, 1.8, 18],
  },
  {
    id: 'portal',
    number: '01',
    name: 'Arrival Portal',
    tagline: 'Double-height 9m limestone threshold',
    description: 'Entering the double-height sanctuary. Fluted bronze canopies and structural stone columns frame the interior perspective.',
    t: 0.28,
    focusTarget: [0, 2.2, 8],
  },
  {
    id: 'mixer-gallery',
    number: '02',
    name: '664 Series Mixer Plinth',
    tagline: 'Flagship diamond-knurled deck mixer on honed stone',
    description: 'Central monolithic exhibition block featuring the Sanvera 664 Series Mixer with active Swiss laminar water flow and knurled control.',
    t: 0.54,
    focusTarget: [-0.2, 1.4, -6],
  },
  {
    id: 'shower-suite',
    number: '03',
    name: 'Concealed Shower 5061 Suite',
    tagline: 'Recessed thermostatic architecture with 300mm rain canopy',
    description: 'Private stone niche demonstrating zero-reveal flush wall plates, acoustic water dampening, and dual volume controls from the 5061 series.',
    t: 0.76,
    focusTarget: [3.8, 2.5, -22],
  },
  {
    id: 'bath-vault',
    number: '04',
    name: 'Freestanding Bath Sanctuary',
    tagline: 'Mineral composite soaking tub with floor-mounted mixer',
    description: 'The journey resolves at the northern glass curtain wall. Monolithic cast stone bath shaped for thermal immersion and visual silence.',
    t: 0.96,
    focusTarget: [0, 1.2, -36],
  },
];

interface ShowroomRigProps {
  progress: number;
  isFreeExploration: boolean;
  activeFinish: ProductFinish;
  onUpdateCoords: (coords: { x: number; y: number; z: number }) => void;
  onPedestalClick: (pedestalName: string) => void;
}

const ShowroomRig: React.FC<ShowroomRigProps> = ({
  progress,
  isFreeExploration,
  activeFinish,
  onUpdateCoords,
  onPedestalClick,
}) => {
  const currentPos = useRef(new THREE.Vector3(0, 2.5, 36));
  const currentLook = useRef(new THREE.Vector3(0, 2.0, 20));

  // Build the 3D architectural camera spline (CatmullRom)
  const cameraPath = useMemo(() => {
    const points = [
      new THREE.Vector3(0, 3.2, 38),   // 00 Approach
      new THREE.Vector3(1.2, 2.6, 26),  // Entry steps
      new THREE.Vector3(0, 2.4, 18),   // 01 Portal
      new THREE.Vector3(-1.8, 2.2, 10), // Lobby
      new THREE.Vector3(0, 2.0, -2),   // 02 Mixer Gallery
      new THREE.Vector3(2.4, 2.2, -14), // Gallery link
      new THREE.Vector3(3.2, 2.4, -22), // 03 Shower Suite
      new THREE.Vector3(0, 2.2, -32),  // Atrium center
      new THREE.Vector3(0, 2.0, -40),  // 04 Bath Vault
    ];
    return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.25);
  }, []);

  useFrame((state) => {
    if (!isFreeExploration) {
      const p = THREE.MathUtils.clamp(progress, 0.001, 0.999);
      const targetPos = cameraPath.getPointAt(p);
      const tangent = cameraPath.getTangentAt(p);
      const targetLook = new THREE.Vector3().copy(targetPos).add(tangent.multiplyScalar(4));

      // Smooth camera interpolation
      currentPos.current.lerp(targetPos, 0.08);
      currentLook.current.lerp(targetLook, 0.08);

      state.camera.position.copy(currentPos.current);
      state.camera.lookAt(currentLook.current);

      onUpdateCoords({
        x: Number(currentPos.current.x.toFixed(1)),
        y: Number(currentPos.current.y.toFixed(1)),
        z: Number(currentPos.current.z.toFixed(1)),
      });
    } else {
      onUpdateCoords({
        x: Number(state.camera.position.x.toFixed(1)),
        y: Number(state.camera.position.y.toFixed(1)),
        z: Number(state.camera.position.z.toFixed(1)),
      });
    }
  });

  // Reusable PBR architectural materials
  const M = useMemo(() => {
    return {
      floor: new THREE.MeshStandardMaterial({ color: '#DCD8CE', roughness: 0.65, metalness: 0.04 }),
      stoneD: new THREE.MeshStandardMaterial({ color: '#3A3834', roughness: 0.75, metalness: 0.06 }),
      stoneL: new THREE.MeshStandardMaterial({ color: '#C6C0B4', roughness: 0.6, metalness: 0.04 }),
      plaster: new THREE.MeshStandardMaterial({ color: '#E5E2D9', roughness: 0.9, metalness: 0.01 }),
      glass: new THREE.MeshPhysicalMaterial({
        color: '#BDCCD6',
        transparent: true,
        opacity: 0.25,
        transmission: 0.85,
        roughness: 0.08,
        ior: 1.5,
      }),
      mullion: new THREE.MeshStandardMaterial({ color: '#181A1C', roughness: 0.35, metalness: 0.8 }),
      water: new THREE.MeshPhysicalMaterial({
        color: '#A0C4D8',
        transparent: true,
        opacity: 0.6,
        transmission: 0.85,
        roughness: 0.05,
        ior: 1.333,
      }),
      wood: new THREE.MeshStandardMaterial({ color: '#453528', roughness: 0.5, metalness: 0.05 }),
    };
  }, []);

  return (
    <>
      {/* =========================================================================
          1. LIGHTING RIG (Architectural Studio & Daylight)
          ========================================================================= */}
      <ambientLight intensity={0.5} color="#151719" />
      <hemisphereLight args={['#F0ECE1', '#0C0E0F', 1.2]} />
      {/* Sun / Exterior Daylight */}
      <directionalLight position={[15, 20, 25]} intensity={2.6} color="#FFF8EB" castShadow />
      {/* Cool Sky Light */}
      <directionalLight position={[-15, 12, -25]} intensity={1.4} color="#A8C8E8" />
      {/* Recessed Atrium Downlights */}
      <pointLight position={[0, 7.5, 10]} intensity={1.2} color="#FFF1D6" distance={25} />
      <pointLight position={[0, 6.5, -8]} intensity={1.5} color="#FFF1D6" distance={28} />
      <pointLight position={[0, 6.5, -28]} intensity={1.5} color="#FFF1D6" distance={28} />

      {/* =========================================================================
          2. ARCHITECTURAL PAVILION STRUCTURE
          ========================================================================= */}
      <group>
        {/* Exterior Water Reflecting Pool (Forecourt) */}
        <mesh position={[0, -0.05, 34]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[26, 16]} />
          <primitive object={M.water} attach="material" />
        </mesh>
        <mesh position={[0, -0.15, 34]}>
          <boxGeometry args={[26.4, 0.2, 16.4]} />
          <primitive object={M.stoneD} attach="material" />
        </mesh>

        {/* Main Floor Slab (-45 to +22 z, -10 to +10 x) */}
        <mesh position={[0, -0.1, -12]}>
          <boxGeometry args={[22, 0.2, 68]} />
          <primitive object={M.floor} attach="material" />
        </mesh>

        {/* Entrance Steps */}
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[0, 0.08 - i * 0.16, 23.5 + i * 1.1]}>
            <boxGeometry args={[14, 0.16, 1.2]} />
            <primitive object={M.stoneD} attach="material" />
          </mesh>
        ))}

        {/* Portico Entrance Frame & Canopy (z = 22) */}
        <mesh position={[0, 6.2, 22.5]}>
          <boxGeometry args={[14, 0.4, 4]} />
          <primitive object={M.stoneD} attach="material" />
        </mesh>
        <mesh position={[-6.2, 3.1, 23.8]}>
          <boxGeometry args={[0.4, 6.2, 0.4]} />
          <primitive object={M.mullion} attach="material" />
        </mesh>
        <mesh position={[6.2, 3.1, 23.8]}>
          <boxGeometry args={[0.4, 6.2, 0.4]} />
          <primitive object={M.mullion} attach="material" />
        </mesh>

        {/* Double-height Lobby Ceiling (z: 6 to 22, height: 8.5) */}
        <mesh position={[0, 8.8, 14]}>
          <boxGeometry args={[22, 0.4, 16]} />
          <primitive object={M.plaster} attach="material" />
        </mesh>

        {/* Atrium Ceiling (z: -45 to 6, height: 7.2) */}
        <mesh position={[0, 7.4, -20]}>
          <boxGeometry args={[22, 0.4, 52]} />
          <primitive object={M.plaster} attach="material" />
        </mesh>

        {/* Structural Columns */}
        {[-7, 7].map((x) =>
          [16, 8, -6, -20, -34].map((z) => (
            <mesh key={`${x}-${z}`} position={[x, z > 6 ? 4.2 : 3.5, z]} castShadow>
              <boxGeometry args={[0.8, z > 6 ? 8.6 : 7.2, 0.8]} />
              <primitive object={M.stoneL} attach="material" />
            </mesh>
          ))
        )}

        {/* Left & Right Glass Curtain Walls (x = -11 and +11) */}
        {[-11, 11].map((x) => (
          <group key={x}>
            {/* Spandrel beam bottom */}
            <mesh position={[x, 0.3, -12]}>
              <boxGeometry args={[0.3, 0.6, 68]} />
              <primitive object={M.stoneD} attach="material" />
            </mesh>
            {/* Glass Plane */}
            <mesh position={[x, 3.8, -12]} rotation={[0, x > 0 ? -Math.PI / 2 : Math.PI / 2, 0]}>
              <planeGeometry args={[68, 6.8]} />
              <primitive object={M.glass} attach="material" />
            </mesh>
            {/* Mullion Posts */}
            {Array.from({ length: 15 }).map((_, i) => (
              <mesh key={i} position={[x, 3.8, -44 + i * 4.6]}>
                <boxGeometry args={[0.18, 6.8, 0.18]} />
                <primitive object={M.mullion} attach="material" />
              </mesh>
            ))}
          </group>
        ))}

        {/* North Glazed End Wall (z = -46) */}
        <mesh position={[0, 3.6, -46]}>
          <planeGeometry args={[22, 7.2]} />
          <primitive object={M.glass} attach="material" />
        </mesh>
        <mesh position={[0, 0.3, -46]}>
          <boxGeometry args={[22, 0.6, 0.3]} />
          <primitive object={M.stoneD} attach="material" />
        </mesh>
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh key={i} position={[-10 + i * 4, 3.6, -46]}>
            <boxGeometry args={[0.18, 7.2, 0.18]} />
            <primitive object={M.mullion} attach="material" />
          </mesh>
        ))}
      </group>

      {/* =========================================================================
          3. EXHIBITION PEDESTALS & PRODUCTS IN SPATIAL CONTEXT
          ========================================================================= */}

      {/* PEDESTAL 01: Atrium Reception Monolith (z = 10) */}
      <group
        position={[-3.8, 0, 10]}
        onClick={(e) => {
          e.stopPropagation();
          onPedestalClick('Public Area Touchless Sensor Faucet');
        }}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; }}
      >
        <mesh position={[0, 0.55, 0]} castShadow>
          <boxGeometry args={[4.2, 1.1, 1.6]} />
          <primitive object={M.stoneD} attach="material" />
        </mesh>
        {/* Subtle Water Basin on Reception Plinth */}
        <mesh position={[1.2, 1.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0, 0.45, 32]} />
          <primitive object={M.water} attach="material" />
        </mesh>
      </group>

      {/* PEDESTAL 02: Central Faucet & Mixer Exhibition Plinth (z = -4) */}
      <group
        position={[0, 0, -4]}
        onClick={(e) => {
          e.stopPropagation();
          onPedestalClick('664 Series Signature Precision Mixer');
        }}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; }}
      >
        {/* Stone Pedestal */}
        <mesh position={[0, 0.65, 0]} castShadow>
          <cylinderGeometry args={[1.1, 1.25, 1.3, 48]} />
          <primitive object={M.stoneD} attach="material" />
        </mesh>
        {/* Real 3D Procedural Faucet Mounted in Pavilion */}
        <group position={[0, 1.32, 0]}>
          <ProceduralFaucet
            finish={activeFinish}
            waterActive={true}
            waterIntensity={0.85}
            showPedestal={false}
            scale={0.55}
          />
        </group>
        {/* Floor Spotlight illuminating mixer */}
        <pointLight position={[0, 2.5, -4]} intensity={1.8} color="#FFF2DC" distance={6} />
      </group>

      {/* PEDESTAL 03: Shower Suite Wall (z = -22, x = 4.5) */}
      <group
        position={[4.8, 0, -22]}
        onClick={(e) => {
          e.stopPropagation();
          onPedestalClick('Concealed Shower System 5061');
        }}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; }}
      >
        {/* Partition Wall */}
        <mesh position={[0, 2.5, 0]}>
          <boxGeometry args={[0.3, 5, 6]} />
          <primitive object={M.stoneD} attach="material" />
        </mesh>
        {/* Flush-set brass shower plate */}
        <mesh position={[-0.16, 2.8, 0]}>
          <boxGeometry args={[0.02, 0.9, 0.45]} />
          <meshStandardMaterial
            color={activeFinish === 'brushed_brass' ? '#A8875A' : '#D8DEE4'}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        {/* Shower head projecting out */}
        <mesh position={[-0.7, 4.2, 0]}>
          <cylinderGeometry args={[0.45, 0.45, 0.04, 32]} />
          <meshStandardMaterial color="#A8875A" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Soft falling water shower effect */}
        <WaterStream active={true} intensity={0.75} origin={[-0.7, 4.15, 0]} targetY={0.05} />
      </group>

      {/* PEDESTAL 04: Monolithic Freestanding Bathtub (z = -38, x = 0) */}
      <group
        position={[0, 0, -38]}
        onClick={(e) => {
          e.stopPropagation();
          onPedestalClick('Sanvera Freestanding Oval Bathtub');
        }}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; }}
      >
        {/* Stone Pod Platform */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[7, 0.2, 5]} />
          <primitive object={M.stoneD} attach="material" />
        </mesh>
        {/* Bathtub Oval Body */}
        <mesh position={[0, 0.65, 0]} castShadow>
          <cylinderGeometry args={[1.2, 0.9, 0.85, 32]} />
          <primitive object={M.stoneL} attach="material" />
        </mesh>
        {/* Water in bath */}
        <mesh position={[0, 0.95, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0, 1.05, 32]} />
          <primitive object={M.water} attach="material" />
        </mesh>
      </group>
    </>
  );
};

interface ShowroomCanvasProps {
  progress: number;
  isFreeExploration: boolean;
  activeFinish: ProductFinish;
  onUpdateCoords: (coords: { x: number; y: number; z: number }) => void;
  onPedestalClick: (pedestalName: string) => void;
}

export const ShowroomCanvas: React.FC<ShowroomCanvasProps> = ({
  progress,
  isFreeExploration,
  activeFinish,
  onUpdateCoords,
  onPedestalClick,
}) => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 3.2, 38], fov: 42, near: 0.1, far: 200 }}
        className={`w-full h-full ${isFreeExploration ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'}`}
        shadows
        dpr={[1, 2]}
      >
        <color attach="background" args={['#0C0E0F']} />
        <fog attach="fog" args={['#0C0E0F', 20, 95]} />

        <ShowroomRig
          progress={progress}
          isFreeExploration={isFreeExploration}
          activeFinish={activeFinish}
          onUpdateCoords={onUpdateCoords}
          onPedestalClick={onPedestalClick}
        />

        {/* Orbit Controls enabled ONLY in Free Exploration Mode */}
        {isFreeExploration && (
          <OrbitControls
            enableDamping
            dampingFactor={0.06}
            minDistance={2}
            maxDistance={55}
            maxPolarAngle={Math.PI / 2 - 0.02}
          />
        )}
      </Canvas>
    </div>
  );
};
