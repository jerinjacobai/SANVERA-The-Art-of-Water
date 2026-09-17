import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { ProductFinish } from '../../types';
import { ProceduralFaucet } from '../three/ProceduralFaucet';
import { BathtubModel } from '../three/BathtubModel';
import { ShowerModel } from '../three/ShowerModel';
import { BasinModel } from '../three/BasinModel';
import { ToiletModel } from '../three/ToiletModel';
import { MirrorModel } from '../three/MirrorModel';

export interface ShowroomZone {
  id: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  t: number; // 0 to 1 on path
  focusTarget: [number, number, number];
  zoneCategory: string;
  productIds: string[];
}

export const SHOWROOM_ZONES: ShowroomZone[] = [
  {
    id: 'approach',
    number: '00',
    name: 'Approach & Forecourt',
    tagline: 'Exterior reflection pool with Touchless Sensor Faucet',
    description: 'The architectural experience begins before crossing the threshold. Monolithic stone plinth with infrared touchless water control.',
    t: 0.05,
    focusTarget: [-3.8, 1.2, 18],
    zoneCategory: 'public_area',
    productIds: ['public-sensor-faucet'],
  },
  {
    id: 'mixer-gallery',
    number: '01',
    name: 'Faucets & Series Mixers',
    tagline: 'The 664 Signature Mixer, 661 Series & Wall Mixers on honed basalt',
    description: 'Central exhibition colonnade featuring the flagship 664 Series Mixer with active Swiss laminar water flow and knurled control.',
    t: 0.22,
    focusTarget: [0, 1.5, 4],
    zoneCategory: 'faucets_mixers',
    productIds: ['mixer-664', 'mixer-661', 'mixer-666', 'faucet-concealed-wall'],
  },
  {
    id: 'basin-gallery',
    number: '02',
    name: 'Basins & Pedestals Gallery',
    tagline: 'Monolithic volcanic stone pedestal sink and ceramic vessel basins',
    description: 'Sculptural stone basins paired with architectural deck-mounted mixers and integrated pop-up drain assemblies.',
    t: 0.38,
    focusTarget: [-4.8, 1.4, -8],
    zoneCategory: 'basins',
    productIds: ['basin-pedestal', 'basin-ceramic', 'faucet-2-3-hole'],
  },
  {
    id: 'shower-suite',
    number: '03',
    name: 'Concealed Shower Wellness Suite',
    tagline: 'Dual-dial thermostatic architecture with 300mm rain canopy',
    description: 'Private stone alcove demonstrating zero-reveal flush wall plates, acoustic water dampening, and the 5061 concealed thermostatic system.',
    t: 0.54,
    focusTarget: [4.8, 2.4, -18],
    zoneCategory: 'showers',
    productIds: ['shower-5061', 'shower-5148', 'shower-square-set', 'shower-rain-head'],
  },
  {
    id: 'ceramic-wing',
    number: '04',
    name: 'Ceramic & Sanitary Wing',
    tagline: 'Wall-hung rimless architectural toilet with dual flush plate',
    description: 'Monolithic cantilevered ceramic geometry with concealed in-wall cistern and brushed brass actuation plate.',
    t: 0.70,
    focusTarget: [-4.8, 1.2, -28],
    zoneCategory: 'toilets',
    productIds: ['toilet-rimless'],
  },
  {
    id: 'mirror-hardware',
    number: '05',
    name: 'Optics & Hardware Suite',
    tagline: 'Ambient LED backlit smart mirrors and Series 73/88 brass rails',
    description: 'Floating backlit halo optics with capacitive touch controls and precision cold-forged brass towel bars and robe hooks.',
    t: 0.84,
    focusTarget: [4.8, 1.8, -28],
    zoneCategory: 'mirrors',
    productIds: ['mirror-smart', 'mirror-makeup', 'acc-73', 'acc-88'],
  },
  {
    id: 'bath-sanctuary',
    number: '06',
    name: 'Freestanding Bath Sanctuary',
    tagline: 'Mineral composite oval bath with floor spout & linear drain',
    description: 'The journey resolves at the northern glass curtain wall. Monolithic cast stone bath shaped for thermal immersion and visual silence.',
    t: 0.96,
    focusTarget: [0, 1.2, -38],
    zoneCategory: 'bathtubs',
    productIds: ['bathtub-freestanding', 'faucet-bathtub', 'drain-floor'],
  },
];

interface ShowroomRigProps {
  progress: number;
  isFreeExploration: boolean;
  activeFinish: ProductFinish;
  onUpdateCoords: (coords: { x: number; y: number; z: number }) => void;
  onPedestalClick: (productIdOrName: string) => void;
}

const ShowroomRig: React.FC<ShowroomRigProps> = ({
  progress,
  isFreeExploration,
  activeFinish,
  onUpdateCoords,
  onPedestalClick,
}) => {
  const currentPos = useRef(new THREE.Vector3(0, 2.8, 36));
  const currentLook = useRef(new THREE.Vector3(0, 2.0, 20));

  // Build the 3D architectural camera spline (CatmullRom) across all 7 wings
  const cameraPath = useMemo(() => {
    const points = [
      new THREE.Vector3(0, 3.4, 38),     // 00 Approach Forecourt
      new THREE.Vector3(-1.8, 2.8, 24),  // 00 Public Sensor Plinth
      new THREE.Vector3(0, 2.5, 14),     // Portal Entrance
      new THREE.Vector3(0, 2.2, 4),      // 01 664 Mixer Altar
      new THREE.Vector3(-2.8, 2.2, -6),  // 02 Basins Gallery
      new THREE.Vector3(2.6, 2.4, -16),  // 03 Shower Wellness Suite
      new THREE.Vector3(-2.6, 2.2, -26), // 04 Sanitary Toilet Wing
      new THREE.Vector3(2.6, 2.2, -28),  // 05 Mirror & Hardware Suite
      new THREE.Vector3(0, 2.2, -36),    // 06 Freestanding Bath Sanctuary
      new THREE.Vector3(0, 2.0, -42),    // Northern Glazed Belvedere
    ];
    return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.2);
  }, []);

  useFrame((state) => {
    if (!isFreeExploration) {
      const p = THREE.MathUtils.clamp(progress, 0.001, 0.999);
      const targetPos = cameraPath.getPointAt(p);
      const tangent = cameraPath.getTangentAt(p);
      const targetLook = new THREE.Vector3().copy(targetPos).add(tangent.multiplyScalar(4.5));

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
      floor: new THREE.MeshStandardMaterial({ color: '#D4D0C6', roughness: 0.65, metalness: 0.04 }),
      stoneD: new THREE.MeshStandardMaterial({ color: '#2B2926', roughness: 0.75, metalness: 0.06 }),
      stoneL: new THREE.MeshStandardMaterial({ color: '#BDB7A9', roughness: 0.6, metalness: 0.04 }),
      plaster: new THREE.MeshStandardMaterial({ color: '#E5E2D9', roughness: 0.9, metalness: 0.01 }),
      glass: new THREE.MeshPhysicalMaterial({
        color: '#BDCCD6',
        transparent: true,
        opacity: 0.25,
        transmission: 0.85,
        roughness: 0.08,
        ior: 1.5,
      }),
      mullion: new THREE.MeshStandardMaterial({ color: '#16181A', roughness: 0.35, metalness: 0.8 }),
      water: new THREE.MeshPhysicalMaterial({
        color: '#A0C4D8',
        transparent: true,
        opacity: 0.65,
        transmission: 0.85,
        roughness: 0.05,
        ior: 1.333,
      }),
    };
  }, []);

  return (
    <>
      {/* 1. ARCHITECTURAL LIGHTING */}
      <ambientLight intensity={0.55} color="#151719" />
      <hemisphereLight args={['#F2EDE3', '#0E1012', 1.2]} />
      <directionalLight position={[18, 22, 26]} intensity={2.8} color="#FFF8EB" castShadow />
      <directionalLight position={[-18, 14, -26]} intensity={1.5} color="#A2C4E6" />
      <pointLight position={[0, 7.5, 12]} intensity={1.4} color="#FFF1D6" distance={25} />
      <pointLight position={[0, 6.5, -4]} intensity={1.6} color="#FFF1D6" distance={26} />
      <pointLight position={[0, 6.5, -24]} intensity={1.6} color="#FFF1D6" distance={26} />
      <pointLight position={[0, 6.5, -38]} intensity={1.8} color="#FFF1D6" distance={26} />

      {/* 2. ARCHITECTURAL PAVILION ENCLOSURE */}
      <group>
        {/* Exterior Reflection Pool (Forecourt) */}
        <mesh position={[0, -0.05, 34]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[26, 16]} />
          <primitive object={M.water} attach="material" />
        </mesh>
        <mesh position={[0, -0.15, 34]}>
          <boxGeometry args={[26.4, 0.2, 16.4]} />
          <primitive object={M.stoneD} attach="material" />
        </mesh>

        {/* Main Pavilion Floor Slab (-48 to +24 z, -11 to +11 x) */}
        <mesh position={[0, -0.1, -12]}>
          <boxGeometry args={[22, 0.2, 72]} />
          <primitive object={M.floor} attach="material" />
        </mesh>

        {/* Entrance Steps */}
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[0, 0.08 - i * 0.16, 24.5 + i * 1.1]}>
            <boxGeometry args={[14, 0.16, 1.2]} />
            <primitive object={M.stoneD} attach="material" />
          </mesh>
        ))}

        {/* Portico Entrance Frame */}
        <mesh position={[0, 6.2, 23.5]}>
          <boxGeometry args={[14, 0.4, 4]} />
          <primitive object={M.stoneD} attach="material" />
        </mesh>

        {/* Double-Height Ceiling */}
        <mesh position={[0, 8.8, 14]}>
          <boxGeometry args={[22, 0.4, 18]} />
          <primitive object={M.plaster} attach="material" />
        </mesh>

        {/* Main Gallery Ceiling */}
        <mesh position={[0, 7.4, -20]}>
          <boxGeometry args={[22, 0.4, 54]} />
          <primitive object={M.plaster} attach="material" />
        </mesh>

        {/* Limestone Columns */}
        {[-7.5, 7.5].map((x) =>
          [18, 8, -4, -18, -32, -44].map((z) => (
            <mesh key={`${x}-${z}`} position={[x, z > 6 ? 4.2 : 3.5, z]} castShadow>
              <boxGeometry args={[0.85, z > 6 ? 8.6 : 7.2, 0.85]} />
              <primitive object={M.stoneL} attach="material" />
            </mesh>
          ))
        )}

        {/* Glass Curtain Walls */}
        {[-11, 11].map((x) => (
          <group key={x}>
            <mesh position={[x, 3.8, -12]} rotation={[0, x > 0 ? -Math.PI / 2 : Math.PI / 2, 0]}>
              <planeGeometry args={[72, 6.8]} />
              <primitive object={M.glass} attach="material" />
            </mesh>
          </group>
        ))}

        {/* Northern Panoramic Glass End Wall */}
        <mesh position={[0, 3.6, -48]}>
          <planeGeometry args={[22, 7.2]} />
          <primitive object={M.glass} attach="material" />
        </mesh>
      </group>

      {/* =========================================================================
          3. SEVEN INTERACTIVE 3D PRODUCT STATIONS
          ========================================================================= */}

      {/* STATION 0: FORECOURT / PUBLIC AREA TOUCHLESS SENSOR FAUCET (z = 18, x = -4.5) */}
      <group position={[-4.5, 0, 18]}>
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[2.4, 1.0, 1.4]} />
          <primitive object={M.stoneD} attach="material" />
        </mesh>
        <group position={[0, 1.0, 0]}>
          <ProceduralFaucet
            finish={activeFinish}
            waterActive={true}
            waterIntensity={0.8}
            showPedestal={false}
            scale={0.5}
          />
        </group>
        {/* Interactive 3D Hotspot Badge */}
        <Html position={[0, 1.7, 0]} center distanceFactor={13}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPedestalClick('public-sensor-faucet');
            }}
            className="group flex items-center gap-2 bg-void/90 backdrop-blur-md border border-hair hover:border-brass px-3 py-1.5 rounded-full text-xs transition-all shadow-xl hover:scale-105 pointer-events-auto"
          >
            <span className="w-2 h-2 rounded-full bg-brass animate-ping" />
            <span className="label-mono text-[9px] text-ink uppercase tracking-wider">
              34 · Public Sensor Faucet
            </span>
          </button>
        </Html>
      </group>

      {/* STATION 1: CENTRAL 664 SERIES SIGNATURE FAUCET ALTAR (z = 4, x = 0) */}
      <group position={[0, 0, 4]}>
        {/* Main Stone Plinth */}
        <mesh position={[0, 0.6, 0]} castShadow>
          <cylinderGeometry args={[1.2, 1.35, 1.2, 48]} />
          <primitive object={M.stoneD} attach="material" />
        </mesh>
        {/* Flagship 664 Signature Mixer */}
        <group position={[0, 1.2, 0]}>
          <ProceduralFaucet
            finish={activeFinish}
            waterActive={true}
            waterIntensity={1.0}
            showPedestal={false}
            scale={0.65}
          />
        </group>
        <pointLight position={[0, 2.5, 0]} intensity={2.0} color="#FFE6C0" distance={6} />

        {/* Interactive 3D Hotspot Badge */}
        <Html position={[0, 2.1, 0]} center distanceFactor={13}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPedestalClick('mixer-664');
            }}
            className="group flex items-center gap-2 bg-void/95 backdrop-blur-md border border-brass px-3.5 py-1.5 rounded-full text-xs transition-all shadow-xl hover:scale-105 pointer-events-auto"
          >
            <span className="w-2 h-2 rounded-full bg-brass animate-pulse" />
            <span className="label-mono text-[9px] text-brass uppercase tracking-wider font-medium">
              04 · 664 Signature Mixer
            </span>
          </button>
        </Html>
      </group>

      {/* STATION 2: BASINS & PEDESTALS GALLERY (z = -8, x = -5.0) */}
      <group position={[-5.0, 0, -8]}>
        <BasinModel
          finish={activeFinish}
          waterActive={true}
          waterIntensity={0.8}
          showPedestal={true}
          scale={1.0}
        />
        <Html position={[0, 1.6, 0]} center distanceFactor={13}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPedestalClick('basin-pedestal');
            }}
            className="group flex items-center gap-2 bg-void/90 backdrop-blur-md border border-hair hover:border-brass px-3 py-1.5 rounded-full text-xs transition-all shadow-xl hover:scale-105 pointer-events-auto"
          >
            <span className="w-2 h-2 rounded-full bg-brass animate-pulse" />
            <span className="label-mono text-[9px] text-ink uppercase tracking-wider">
              20 · Monolithic Pedestal Sink
            </span>
          </button>
        </Html>
      </group>

      {/* STATION 3: CONCEALED SHOWER 5061 WELLNESS SUITE (z = -18, x = 5.0) */}
      <group position={[5.0, 0, -18]}>
        <ShowerModel
          finish={activeFinish}
          waterActive={true}
          waterIntensity={0.85}
          showPedestal={true}
          scale={0.9}
        />
        <Html position={[0, 2.5, 0.4]} center distanceFactor={13}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPedestalClick('shower-5061');
            }}
            className="group flex items-center gap-2 bg-void/95 backdrop-blur-md border border-brass px-3.5 py-1.5 rounded-full text-xs transition-all shadow-xl hover:scale-105 pointer-events-auto"
          >
            <span className="w-2 h-2 rounded-full bg-brass animate-pulse" />
            <span className="label-mono text-[9px] text-brass uppercase tracking-wider font-medium">
              12 · Shower System 5061
            </span>
          </button>
        </Html>
      </group>

      {/* STATION 4: CERAMIC & TOILET ALCOVE (z = -28, x = -5.0) */}
      <group position={[-5.0, 0, -28]}>
        <ToiletModel
          finish={activeFinish}
          showPedestal={true}
          scale={1.05}
        />
        <Html position={[0, 1.5, 0.2]} center distanceFactor={13}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPedestalClick('toilet-rimless');
            }}
            className="group flex items-center gap-2 bg-void/90 backdrop-blur-md border border-hair hover:border-brass px-3 py-1.5 rounded-full text-xs transition-all shadow-xl hover:scale-105 pointer-events-auto"
          >
            <span className="w-2 h-2 rounded-full bg-brass animate-pulse" />
            <span className="label-mono text-[9px] text-ink uppercase tracking-wider">
              22 · Wall-Hung Rimless Toilet
            </span>
          </button>
        </Html>
      </group>

      {/* STATION 5: OPTICS & HARDWARE SUITE (z = -28, x = 5.0) */}
      <group position={[5.0, 0, -28]}>
        <MirrorModel
          finish={activeFinish}
          showPedestal={true}
          scale={0.95}
        />
        <Html position={[0, 2.2, 0.2]} center distanceFactor={13}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPedestalClick('mirror-smart');
            }}
            className="group flex items-center gap-2 bg-void/90 backdrop-blur-md border border-hair hover:border-brass px-3 py-1.5 rounded-full text-xs transition-all shadow-xl hover:scale-105 pointer-events-auto"
          >
            <span className="w-2 h-2 rounded-full bg-brass animate-pulse" />
            <span className="label-mono text-[9px] text-ink uppercase tracking-wider">
              23 · Ambient Smart Mirror
            </span>
          </button>
        </Html>
      </group>

      {/* STATION 6: FREESTANDING BATH SANCTUARY & LINEAR DRAIN (z = -38, x = 0) */}
      <group position={[0, 0, -38]}>
        <BathtubModel
          finish={activeFinish}
          waterActive={true}
          waterIntensity={1.0}
          showPedestal={true}
          scale={0.88}
        />
        <Html position={[0, 1.7, 0]} center distanceFactor={14}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPedestalClick('bathtub-freestanding');
            }}
            className="group flex items-center gap-2 bg-void/95 backdrop-blur-md border border-brass px-4 py-1.5 rounded-full text-xs transition-all shadow-2xl hover:scale-105 pointer-events-auto"
          >
            <span className="w-2 h-2 rounded-full bg-brass animate-pulse" />
            <span className="label-mono text-[9px] text-brass uppercase tracking-wider font-medium">
              21 · Freestanding Oval Bathtub
            </span>
          </button>
        </Html>
      </group>
    </>
  );
};

interface ShowroomCanvasProps {
  progress: number;
  isFreeExploration: boolean;
  activeFinish: ProductFinish;
  onUpdateCoords: (coords: { x: number; y: number; z: number }) => void;
  onPedestalClick: (productIdOrName: string) => void;
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
        camera={{ position: [0, 3.4, 38], fov: 42, near: 0.1, far: 200 }}
        className={`w-full h-full ${isFreeExploration ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-auto'}`}
        shadows
        dpr={[1, 2]}
      >
        <color attach="background" args={['#0C0E0F']} />
        <fog attach="fog" args={['#0C0E0F', 22, 105]} />

        <ShowroomRig
          progress={progress}
          isFreeExploration={isFreeExploration}
          activeFinish={activeFinish}
          onUpdateCoords={onUpdateCoords}
          onPedestalClick={onPedestalClick}
        />

        {/* Orbit Controls enabled in Free Exploration Mode */}
        {isFreeExploration && (
          <OrbitControls
            enableDamping
            dampingFactor={0.06}
            minDistance={2}
            maxDistance={60}
            maxPolarAngle={Math.PI / 2 - 0.02}
          />
        )}
      </Canvas>
    </div>
  );
};
