import React, { useRef, useMemo, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, Sparkles, Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Sparkles as SparklesIcon } from 'lucide-react';
import { ProductFinish } from '../../types';
import { ProceduralFaucet } from '../three/ProceduralFaucet';
import { BathtubModel } from '../three/BathtubModel';
import { ShowerModel } from '../three/ShowerModel';
import { BasinModel } from '../three/BasinModel';
import { MirrorModel } from '../three/MirrorModel';

export interface FixtureHotspotData {
  id: string;
  name: string;
  shortName: string;
  category: string;
  sku: string;
  catalogId: string;
  // Normalized 2D coordinates on the 1024x576 photograph (-0.5 to +0.5)
  normX: number;
  normY: number;
  // 3D camera focal distance and framing
  camDistance: number;
  camOffset: [number, number, number];
}

export const FIXTURES_HOTSPOTS: FixtureHotspotData[] = [
  {
    id: 'shower-sanctuary',
    name: 'Concealed Rain Shower Sanctuary & Thermostatic Column',
    shortName: 'Rain Shower',
    category: 'Showers & Wellness',
    sku: 'SV-5061-SHW',
    catalogId: 'shower-5061',
    normX: -0.34,
    normY: 0.12,
    camDistance: 7.2,
    camOffset: [-3.4, 0.9, 0],
  },
  {
    id: 'freestanding-bath',
    name: 'Sanvera Serene Freestanding Oval Bathtub',
    shortName: 'Oval Bathtub',
    category: 'Bathtubs & Spouts',
    sku: 'SV-BT-01-FL',
    catalogId: 'bathtub-freestanding',
    normX: 0.0,
    normY: -0.15,
    camDistance: 7.5,
    camOffset: [0, -1.1, 0],
  },
  {
    id: 'floor-bath-mixer',
    name: 'Series 664 Floor-Mounted Bath Mixer & Handset',
    shortName: 'Floor Mixer',
    category: 'Faucets & Mixers',
    sku: 'SV-664-FS01',
    catalogId: 'faucet-bathtub',
    normX: -0.135,
    normY: -0.09,
    camDistance: 7.0,
    camOffset: [-1.4, -0.6, 0],
  },
  {
    id: 'vanity-mixers',
    name: 'Series 664 Gold Basin Mixers & Countertop Basins',
    shortName: 'Basin Mixers',
    category: 'Faucets & Mixers',
    sku: 'SV-664-BM04',
    catalogId: 'mixer-664',
    normX: 0.31,
    normY: -0.07,
    camDistance: 7.2,
    camOffset: [3.2, -0.5, 0],
  },
  {
    id: 'ambient-mirrors',
    name: 'Aura Ambient Backlit Smart Mirrors & Sconces',
    shortName: 'Aura Mirrors',
    category: 'Mirrors & Optics',
    sku: 'SV-MIR-01-AURA',
    catalogId: 'mirror-smart',
    normX: 0.34,
    normY: 0.22,
    camDistance: 7.0,
    camOffset: [3.4, 1.4, 0],
  },
  {
    id: 'crystal-chandelier',
    name: 'Sanvera Grand Cascading Brass & Crystal Chandelier',
    shortName: 'Chandelier',
    category: 'Hardware & Accessories',
    sku: 'SV-ACC-CHAND-01',
    catalogId: 'acc-73',
    normX: 0.0,
    normY: 0.36,
    camDistance: 7.4,
    camOffset: [0, 2.4, 0],
  },
];

// Helper to get PBR materials matching active finish
export const getPBRFinishColor = (finish: ProductFinish) => {
  switch (finish) {
    case 'polished_chrome':
      return { color: '#D8DEE4', metalness: 0.98, roughness: 0.06 };
    case 'dark_bronze':
      return { color: '#1A1816', metalness: 0.85, roughness: 0.32 };
    case 'matte_stone':
      return { color: '#C8A282', metalness: 0.88, roughness: 0.28 }; // Rose Gold
    case 'brushed_brass':
    default:
      return { color: '#D4AF37', metalness: 0.92, roughness: 0.18 }; // 24K Brushed Gold
  }
};

interface SpaFullBleedBackdropProps {
  planeWidth: number;
  planeHeight: number;
  onBackdropClick: () => void;
}

const SpaFullBleedBackdrop: React.FC<SpaFullBleedBackdropProps> = ({
  planeWidth,
  planeHeight,
  onBackdropClick,
}) => {
  const texture = useTexture('/images/golden-spa-sanctuary.jpg');

  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = 16;
  }, [texture]);

  // Curved architectural panoramic wall in 3D
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(planeWidth, planeHeight, 36, 18);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const zOffset = -Math.pow(x / (planeWidth * 0.5), 2) * 0.85;
      pos.setZ(i, zOffset);
    }
    geo.computeVertexNormals();
    return geo;
  }, [planeWidth, planeHeight]);

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Full-Bleed Curved Calacatta Marble Panoramic Wall */}
      <mesh
        geometry={geometry}
        onClick={(e) => {
          e.stopPropagation();
          onBackdropClick();
        }}
      >
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      {/* 2. 3D Polished Marble Floor with Specular Reflection Catching Chandelier Light */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -planeHeight * 0.49, 1]}>
        <planeGeometry args={[planeWidth * 1.3, 10]} />
        <meshStandardMaterial
          color="#062227"
          roughness={0.22}
          metalness={0.35}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* 3. Architectural Shower Glass Partition Mesh (Left Enclosure) */}
      <mesh position={[-planeWidth * 0.22, 0, 0.4]} rotation={[0, 0.08, 0]}>
        <boxGeometry args={[0.04, planeHeight * 0.82, 3.2]} />
        <meshPhysicalMaterial
          color="#b0e0e6"
          transparent
          opacity={0.35}
          transmission={0.88}
          roughness={0.06}
          ior={1.52}
          metalness={0.1}
        />
      </mesh>

      {/* 4. Brushed Gold Glass Header Channel */}
      <mesh position={[-planeWidth * 0.22, planeHeight * 0.41, 0.4]} rotation={[0, 0.08, 0]}>
        <boxGeometry args={[0.08, 0.06, 3.2]} />
        <meshStandardMaterial color="#d4af37" metalness={0.92} roughness={0.18} />
      </mesh>
    </group>
  );
};

interface SpatialMicroBeaconProps {
  fixture: FixtureHotspotData;
  position: [number, number, number];
  isActive: boolean;
  onSelect: () => void;
}

const SpatialMicroBeacon: React.FC<SpatialMicroBeaconProps> = ({
  fixture,
  position,
  isActive,
  onSelect,
}) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <group position={position}>
      {/* 3D Anchored Micro-Beacon */}
      <Html center distanceFactor={10} zIndexRange={[20, 0]}>
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative cursor-pointer select-none group flex items-center justify-center p-2.5 -m-2.5"
          title={`Click to focus ${fixture.name}`}
        >
          {/* Subtle breathing ripple halo */}
          <span
            className={`absolute w-7 h-7 rounded-full border transition-all duration-700 pointer-events-none ${
              isActive
                ? 'border-[#00c2d3] scale-125 opacity-90 animate-ping'
                : 'border-[#00c2d3]/40 scale-100 opacity-40 group-hover:scale-125 group-hover:border-[#00c2d3]/80 group-hover:opacity-80'
            }`}
          />

          {/* Micro Beacon Jewel Core */}
          <div
            className={`relative z-10 flex items-center justify-center w-6 h-6 rounded-full border shadow-xl transition-all duration-300 ${
              isActive
                ? 'bg-gradient-to-tr from-[#00808c] to-[#00f0ff] border-white text-white scale-125 shadow-[0_0_24px_rgba(0,194,211,1)]'
                : hovered
                ? 'bg-[#00808c] border-white text-white scale-115 shadow-[0_0_16px_rgba(0,194,211,0.8)]'
                : 'bg-[#062429]/95 backdrop-blur-md border-[#00808c]/70 text-[#00c2d3] shadow-lg shadow-black/80 group-hover:border-[#00c2d3]'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full transition-colors ${
                isActive ? 'bg-white' : hovered ? 'bg-[#00f0ff]' : 'bg-[#00c2d3]'
              }`}
            />
          </div>

          {/* Sleek Architectural Tooltip (Positioned above beacon) */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-3 px-3.5 py-2 rounded-xl bg-[#041c20]/95 backdrop-blur-2xl border border-[#00808c]/50 text-center whitespace-nowrap shadow-[0_15px_40px_rgba(0,0,0,0.85)] pointer-events-none transition-all duration-300 ${
              hovered && !isActive
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-1 scale-95 pointer-events-none'
            }`}
          >
            <div className="flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00c2d3]" />
              <p className="label-mono text-[8px] text-[#00c2d3] uppercase font-semibold tracking-widest">
                {fixture.category}
              </p>
            </div>
            <p className="editorial-title text-xs text-white font-light mt-0.5">{fixture.name}</p>
            <p className="label-mono text-[8px] text-[#d4af37] mt-0.5 flex items-center justify-center gap-1">
              <SparklesIcon size={8} className="text-[#d4af37]" />
              <span>Click to inspect fixture in 3D</span>
            </p>
          </div>
        </div>
      </Html>
    </group>
  );
};

interface FocusedModelDispatcherProps {
  activeFixtureId: string | null;
  activeFinish: ProductFinish;
  waterActive: boolean;
  planeWidth: number;
  planeHeight: number;
}

const FocusedModelDispatcher: React.FC<FocusedModelDispatcherProps> = ({
  activeFixtureId,
  activeFinish,
  waterActive,
  planeWidth,
  planeHeight,
}) => {
  const modelRot = useRef(0);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current && activeFixtureId) {
      modelRot.current += delta * 0.35;
      groupRef.current.rotation.y = modelRot.current;
    }
  });

  if (!activeFixtureId) return null;

  const fixture = FIXTURES_HOTSPOTS.find((f) => f.id === activeFixtureId);
  if (!fixture) return null;

  const posX = fixture.normX * planeWidth;
  const posY = fixture.normY * planeHeight;
  const posZ = -Math.pow(posX / (planeWidth * 0.5), 2) * 0.85 + 0.35;

  return (
    <group position={[posX, posY, posZ]}>
      {/* Dynamic Focus Spotlight */}
      <pointLight color="#ffe8b3" intensity={3.5} distance={5} />

      <group ref={groupRef}>
        {fixture.id === 'shower-sanctuary' && (
          <ShowerModel
            finish={activeFinish}
            waterActive={waterActive}
            showPedestal={false}
            scale={0.85}
          />
        )}

        {fixture.id === 'freestanding-bath' && (
          <BathtubModel
            finish={activeFinish}
            waterActive={waterActive}
            showPedestal={false}
            scale={0.8}
          />
        )}

        {fixture.id === 'floor-bath-mixer' && (
          <ProceduralFaucet
            finish={activeFinish}
            waterActive={waterActive}
            showPedestal={false}
            scale={0.8}
          />
        )}

        {fixture.id === 'vanity-mixers' && (
          <group scale={0.78}>
            <BasinModel finish={activeFinish} showPedestal={false} />
            <group position={[0, 0.42, -0.2]}>
              <ProceduralFaucet
                finish={activeFinish}
                waterActive={waterActive}
                showPedestal={false}
                scale={0.75}
              />
            </group>
          </group>
        )}

        {fixture.id === 'ambient-mirrors' && (
          <MirrorModel finish={activeFinish} showPedestal={false} scale={0.85} />
        )}

        {fixture.id === 'crystal-chandelier' && (
          <group scale={0.85}>
            <mesh position={[0, 0, 0]}>
              <torusGeometry args={[0.9, 0.05, 16, 48]} />
              <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.15} />
            </mesh>
            <mesh position={[0, -0.3, 0]}>
              <torusGeometry args={[0.65, 0.04, 16, 48]} />
              <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.15} />
            </mesh>
            <mesh position={[0, -0.6, 0]}>
              <torusGeometry args={[0.4, 0.035, 16, 48]} />
              <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.15} />
            </mesh>
            <pointLight color="#fff0c2" intensity={4.0} distance={7} />
          </group>
        )}
      </group>
    </group>
  );
};

interface CameraRigProps {
  activeFixtureId: string | null;
  planeWidth: number;
  planeHeight: number;
  isOrbitMode: boolean;
}

const CameraRig: React.FC<CameraRigProps> = ({
  activeFixtureId,
  planeWidth,
  planeHeight,
  isOrbitMode,
}) => {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const lookAtTarget = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    // If user is manually orbiting with controls, skip camera position override
    if (isOrbitMode) return;

    let targetX = 0;
    let targetY = 0;
    let targetZ = 10.0;

    let targetLookX = 0;
    let targetLookY = 0;
    let targetLookZ = 0;

    const activeFixture = FIXTURES_HOTSPOTS.find((f) => f.id === activeFixtureId);

    if (activeFixture) {
      const markerX = activeFixture.normX * planeWidth;
      const markerY = activeFixture.normY * planeHeight;
      const markerZ = -Math.pow(markerX / (planeWidth * 0.5), 2) * 0.85;

      // Architectural 1.25x framing: gentle glide into view without disorienting extreme zoom
      targetX = markerX * 0.62;
      targetY = markerY * 0.62;
      targetZ = activeFixture.camDistance;

      targetLookX = markerX * 0.85;
      targetLookY = markerY * 0.85;
      targetLookZ = markerZ;
    } else {
      // Natural, living 3D parallax in Sanctuary Overview
      targetX = mouse.current.x * 0.42;
      targetY = -mouse.current.y * 0.22;
      targetZ = 10.0;

      targetLookX = mouse.current.x * 0.12;
      targetLookY = -mouse.current.y * 0.06;
      targetLookZ = 0;
    }

    // Buttery smooth lerp for camera position
    const lerpSpeed = activeFixture ? 0.045 : 0.035;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, lerpSpeed);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, lerpSpeed);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, lerpSpeed);

    // Buttery smooth lerp for lookAt target
    lookAtTarget.current.x = THREE.MathUtils.lerp(lookAtTarget.current.x, targetLookX, lerpSpeed);
    lookAtTarget.current.y = THREE.MathUtils.lerp(lookAtTarget.current.y, targetLookY, lerpSpeed);
    lookAtTarget.current.z = THREE.MathUtils.lerp(lookAtTarget.current.z, targetLookZ, lerpSpeed);

    camera.lookAt(lookAtTarget.current);
  });

  return null;
};

interface SceneContentProps {
  activeFixtureId: string | null;
  onSelectFixture: (id: string) => void;
  onResetZoom: () => void;
  showHotspots: boolean;
  activeFinish: ProductFinish;
  waterActive: boolean;
  isOrbitMode: boolean;
}

const SceneContent: React.FC<SceneContentProps> = ({
  activeFixtureId,
  onSelectFixture,
  onResetZoom,
  showHotspots,
  activeFinish,
  waterActive,
  isOrbitMode,
}) => {
  const { viewport } = useThree();

  // Full-bleed calculation: covers viewport edge-to-edge at camera distance 10
  const { planeWidth, planeHeight } = useMemo(() => {
    const imageAspect = 1024 / 576; // 1.77778
    const vAspect = viewport.width / viewport.height;
    let w: number;
    let h: number;

    if (vAspect > imageAspect) {
      w = viewport.width * 1.08;
      h = w / imageAspect;
    } else {
      h = viewport.height * 1.08;
      w = h * imageAspect;
    }
    return { planeWidth: w, planeHeight: h };
  }, [viewport.width, viewport.height]);

  return (
    <>
      <CameraRig
        activeFixtureId={activeFixtureId}
        planeWidth={planeWidth}
        planeHeight={planeHeight}
        isOrbitMode={isOrbitMode}
      />

      {/* Orbit Controls (Active when drag-to-explore is enabled) */}
      {isOrbitMode && (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          dampingFactor={0.06}
          rotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minPolarAngle={Math.PI / 2 - 0.25}
          minAzimuthAngle={-Math.PI / 5}
          maxAzimuthAngle={Math.PI / 5}
        />
      )}

      {/* Atmospheric Luxury Lighting System with Aegean Undertones */}
      <ambientLight intensity={1.4} color="#e6f4f5" />
      <directionalLight position={[0, 6, 4]} intensity={2.2} color="#fff6e5" />
      <pointLight position={[0, 3.4, 1.5]} intensity={3.0} color="#ffd88a" distance={11} />
      <pointLight position={[-planeWidth * 0.28, 1.2, 0.8]} intensity={1.8} color="#00c2d3" distance={6} />
      <pointLight position={[planeWidth * 0.28, 1.2, 0.8]} intensity={1.8} color="#00808c" distance={6} />

      {/* Volumetric Floating Golden & Water Sparkles */}
      <Sparkles
        count={50}
        scale={[planeWidth * 0.95, planeHeight * 0.95, 9]}
        size={3.0}
        speed={0.35}
        opacity={0.65}
        color="#00c2d3"
      />

      {/* Full-Bleed Curved Panoramic Luxury Bathroom Wall */}
      <Suspense fallback={null}>
        <SpaFullBleedBackdrop
          planeWidth={planeWidth}
          planeHeight={planeHeight}
          onBackdropClick={onResetZoom}
        />
      </Suspense>

      {/* 3D Spatial Micro-Beacons */}
      {showHotspots &&
        FIXTURES_HOTSPOTS.map((f) => {
          const markerX = f.normX * planeWidth;
          const markerY = f.normY * planeHeight;
          const markerZ = -Math.pow(markerX / (planeWidth * 0.5), 2) * 0.85 + 0.12;

          return (
            <SpatialMicroBeacon
              key={f.id}
              fixture={f}
              position={[markerX, markerY, markerZ]}
              isActive={activeFixtureId === f.id}
              onSelect={() => onSelectFixture(f.id)}
            />
          );
        })}

      {/* Focused 3D Model with Real PBR Materials & Water Simulation */}
      <FocusedModelDispatcher
        activeFixtureId={activeFixtureId}
        activeFinish={activeFinish}
        waterActive={waterActive}
        planeWidth={planeWidth}
        planeHeight={planeHeight}
      />
    </>
  );
};

export interface SpaShowroom3DSceneProps {
  activeFixtureId: string | null;
  onSelectFixture: (id: string) => void;
  onResetZoom: () => void;
  showHotspots: boolean;
  activeFinish: ProductFinish;
  waterActive: boolean;
  isOrbitMode: boolean;
}

export const SpaShowroom3DScene: React.FC<SpaShowroom3DSceneProps> = ({
  activeFixtureId,
  onSelectFixture,
  onResetZoom,
  showHotspots,
  activeFinish,
  waterActive,
  isOrbitMode,
}) => {
  return (
    <div className="relative w-full h-full select-none cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 10.0], fov: 46, near: 0.1, far: 80 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
      >
        <color attach="background" args={['#031a1e']} />
        <SceneContent
          activeFixtureId={activeFixtureId}
          onSelectFixture={onSelectFixture}
          onResetZoom={onResetZoom}
          showHotspots={showHotspots}
          activeFinish={activeFinish}
          waterActive={waterActive}
          isOrbitMode={isOrbitMode}
        />
      </Canvas>
    </div>
  );
};
