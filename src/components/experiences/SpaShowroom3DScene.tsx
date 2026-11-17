import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, Sparkles, Html } from '@react-three/drei';
import * as THREE from 'three';
import { ProductFinish } from '../../types';
import { ProceduralFaucet } from '../three/ProceduralFaucet';
import { BathtubModel } from '../three/BathtubModel';
import { ShowerModel } from '../three/ShowerModel';
import { BasinModel } from '../three/BasinModel';
import { MirrorModel } from '../three/MirrorModel';
import { Droplets, Sparkles as SparklesIcon } from 'lucide-react';

export interface Fixture3DTarget {
  id: string;
  name: string;
  category: string;
  sku: string;
  // 3D position of the hotspot marker in the room
  markerPos: [number, number, number];
  // 3D camera position when focused
  camPos: [number, number, number];
  // 3D camera lookAt target when focused
  lookTarget: [number, number, number];
  // 3D model position in the room when focused
  modelPos: [number, number, number];
  modelScale: number;
}

export const FIXTURES_3D: Fixture3DTarget[] = [
  {
    id: 'shower-sanctuary',
    name: 'Concealed Rain Shower Sanctuary & Thermostatic Column',
    category: 'Showers & Wellness',
    sku: 'SV-5061-SHW',
    markerPos: [-5.8, 1.2, -1.0],
    camPos: [-4.2, 0.6, 3.8],
    lookTarget: [-5.6, 0.8, -1.2],
    modelPos: [-5.5, -0.6, -0.8],
    modelScale: 0.95,
  },
  {
    id: 'freestanding-bath',
    name: 'Sanvera Serene Freestanding Oval Bathtub',
    category: 'Bathtubs & Spouts',
    sku: 'SV-BT-01-FL',
    markerPos: [0, -1.1, 0.5],
    camPos: [0, -0.2, 4.4],
    lookTarget: [0, -0.9, 0.2],
    modelPos: [0, -1.4, 0.5],
    modelScale: 0.85,
  },
  {
    id: 'floor-bath-mixer',
    name: 'Series 664 Floor-Mounted Bath Mixer & Handset',
    category: 'Faucets & Mixers',
    sku: 'SV-664-FS01',
    markerPos: [-2.1, -0.6, 0.8],
    camPos: [-1.4, -0.3, 3.8],
    lookTarget: [-2.2, -0.6, 0.6],
    modelPos: [-2.0, -1.1, 0.8],
    modelScale: 0.82,
  },
  {
    id: 'vanity-mixers',
    name: 'Series 664 Gold Basin Mixers & Countertop Basins',
    category: 'Faucets & Mixers',
    sku: 'SV-664-BM04',
    markerPos: [4.9, -0.6, 0.8],
    camPos: [3.8, -0.1, 4.0],
    lookTarget: [5.0, -0.5, 0.5],
    modelPos: [4.9, -1.0, 0.7],
    modelScale: 0.88,
  },
  {
    id: 'ambient-mirrors',
    name: 'Aura Ambient Backlit Smart Mirrors & Sconces',
    category: 'Mirrors & Optics',
    sku: 'SV-MIR-01-AURA',
    markerPos: [5.2, 1.6, 0.3],
    camPos: [4.2, 1.2, 4.2],
    lookTarget: [5.2, 1.4, 0.2],
    modelPos: [5.1, 0.7, 0.3],
    modelScale: 0.9,
  },
  {
    id: 'crystal-chandelier',
    name: 'Sanvera Grand Cascading Brass & Crystal Chandelier',
    category: 'Hardware & Accessories',
    sku: 'SV-ACC-CHAND-01',
    markerPos: [0, 2.9, -0.5],
    camPos: [0, 1.8, 4.8],
    lookTarget: [0, 2.8, -0.6],
    modelPos: [0, 2.3, -0.6],
    modelScale: 0.9,
  },
];

interface SpaCurvedBackdropProps {
  onBackdropClick: () => void;
}

const SpaCurvedBackdrop: React.FC<SpaCurvedBackdropProps> = ({ onBackdropClick }) => {
  const texture = useTexture('/images/golden-spa-sanctuary.jpg');

  useMemo(() => {
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = 16;
  }, [texture]);

  // Curved architectural cylinder slice in 3D space
  const geometry = useMemo(() => {
    return new THREE.CylinderGeometry(18, 18, 13.5, 64, 1, true, Math.PI * 0.71, Math.PI * 0.58);
  }, []);

  return (
    <group position={[0, 0.6, 0]}>
      {/* 3D Curved Panoramic Wall */}
      <mesh
        geometry={geometry}
        onClick={(e) => {
          e.stopPropagation();
          onBackdropClick();
        }}
      >
        <meshBasicMaterial map={texture} side={THREE.BackSide} toneMapped={false} />
      </mesh>

      {/* Subtle Polished Marble Reflection Floor in 3D space */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.4, 0]}>
        <planeGeometry args={[32, 32]} />
        <meshStandardMaterial
          color="#16120e"
          roughness={0.25}
          metalness={0.35}
          transparent
          opacity={0.75}
        />
      </mesh>
    </group>
  );
};

interface SpatialHotspotProps {
  fixture: Fixture3DTarget;
  isActive: boolean;
  onSelect: () => void;
}

const SpatialHotspot: React.FC<SpatialHotspotProps> = ({ fixture, isActive, onSelect }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <group position={fixture.markerPos}>
      {/* 3D HTML Anchor */}
      <Html center distanceFactor={14} zIndexRange={[10, 0]}>
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative cursor-pointer select-none group"
          title={`Click to inspect ${fixture.name} in 3D`}
        >
          {/* Pulsing Aegean Teal Ripple Rings */}
          <div className="relative flex items-center justify-center">
            <span
              className={`absolute w-12 h-12 rounded-full animate-ping opacity-75 ${
                isActive ? 'bg-[#00c2d3]/50' : 'bg-[#00808c]/40'
              }`}
            />
            <span
              className={`absolute w-16 h-16 rounded-full border scale-75 animate-pulse ${
                isActive ? 'border-[#00c2d3]/80' : 'border-[#00808c]/40'
              }`}
            />

            {/* Center Pin Button */}
            <div
              className={`relative z-10 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border shadow-2xl transition-all duration-500 ${
                isActive
                  ? 'bg-gradient-to-tr from-[#00808c] to-[#00f0ff] border-white text-white scale-125 shadow-[0_0_30px_rgba(0,194,211,1)]'
                  : hovered
                  ? 'bg-gradient-to-tr from-[#00808c] to-[#2ae0ef] border-white text-white scale-115 shadow-[0_0_22px_rgba(0,194,211,0.8)]'
                  : 'bg-[#18130e]/95 backdrop-blur-md border-[#00c2d3] text-[#00c2d3] hover:scale-110 shadow-lg shadow-black/80'
              }`}
            >
              <Droplets size={15} className={isActive ? 'animate-bounce text-white' : 'text-[#00c2d3]'} />
            </div>
          </div>

          {/* Floating Hover Card in 3D */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 mt-3 px-4 py-2 rounded-xl bg-[#1a140f]/95 backdrop-blur-2xl border border-[#00808c]/50 text-center whitespace-nowrap shadow-[0_20px_50px_rgba(0,0,0,0.9)] pointer-events-none transition-all duration-300 ${
              hovered || isActive
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-1 scale-95 pointer-events-none'
            }`}
          >
            <div className="flex items-center justify-center gap-1.5 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00c2d3] animate-ping" />
              <p className="label-mono text-[9px] text-[#00c2d3] uppercase font-semibold tracking-wider">
                {fixture.category}
              </p>
            </div>
            <p className="editorial-title text-xs sm:text-sm text-[#fdfbf7] font-light">{fixture.name}</p>
            <p className="label-mono text-[8px] text-[#c5a059] mt-0.5 flex items-center justify-center gap-1">
              <SparklesIcon size={9} className="text-[#d4af37]" />
              <span>Click to fly into 3D view</span>
            </p>
          </div>
        </div>
      </Html>
    </group>
  );
};

interface FocusedModelDispatcherProps {
  activeFixture: Fixture3DTarget | null;
  activeFinish: ProductFinish;
  waterActive: boolean;
  modelRotY: number;
}

const FocusedModelDispatcher: React.FC<FocusedModelDispatcherProps> = ({
  activeFixture,
  activeFinish,
  waterActive,
  modelRotY,
}) => {
  if (!activeFixture) return null;

  return (
    <group position={activeFixture.modelPos} rotation={[0, modelRotY, 0]}>
      {activeFixture.id === 'shower-sanctuary' && (
        <ShowerModel
          finish={activeFinish}
          waterActive={waterActive}
          scale={activeFixture.modelScale}
        />
      )}

      {activeFixture.id === 'freestanding-bath' && (
        <BathtubModel
          finish={activeFinish}
          waterActive={waterActive}
          scale={activeFixture.modelScale}
        />
      )}

      {activeFixture.id === 'floor-bath-mixer' && (
        <ProceduralFaucet
          finish={activeFinish}
          waterActive={waterActive}
          scale={activeFixture.modelScale}
        />
      )}

      {activeFixture.id === 'vanity-mixers' && (
        <group>
          <BasinModel finish={activeFinish} scale={activeFixture.modelScale} />
          <group position={[0, 0.45, -0.2]}>
            <ProceduralFaucet
              finish={activeFinish}
              waterActive={waterActive}
              scale={activeFixture.modelScale * 0.85}
            />
          </group>
        </group>
      )}

      {activeFixture.id === 'ambient-mirrors' && (
        <MirrorModel scale={activeFixture.modelScale} />
      )}

      {activeFixture.id === 'crystal-chandelier' && (
        <group scale={activeFixture.modelScale}>
          {/* Procedural Chandelier Tier Rings with Crystal Refraction */}
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
          <pointLight color="#fff0c2" intensity={3.5} distance={6} />
        </group>
      )}
    </group>
  );
};

interface CameraRigProps {
  activeFixture: Fixture3DTarget | null;
  onModelRotYUpdate: (rot: number) => void;
}

const CameraRig: React.FC<CameraRigProps> = ({ activeFixture, onModelRotYUpdate }) => {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const modelRot = useRef(0);
  const lookAtTarget = useRef(new THREE.Vector3(0, 0, 0));

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((_, delta) => {
    // 1. Calculate Target Camera Position
    let targetX = 0;
    let targetY = 0.4;
    let targetZ = 10.5;

    let targetLookX = 0;
    let targetLookY = 0.2;
    let targetLookZ = 0;

    if (activeFixture) {
      targetX = activeFixture.camPos[0];
      targetY = activeFixture.camPos[1];
      targetZ = activeFixture.camPos[2];

      targetLookX = activeFixture.lookTarget[0];
      targetLookY = activeFixture.lookTarget[1];
      targetLookZ = activeFixture.lookTarget[2];

      // Subtle slow rotation of the 3D model
      modelRot.current += delta * 0.45;
      onModelRotYUpdate(modelRot.current);
    } else {
      // Living 3D Mouse Parallax in Room Overview Mode
      targetX = mouse.current.x * 0.85;
      targetY = 0.4 + mouse.current.y * 0.45;
      targetZ = 10.5;

      targetLookX = mouse.current.x * 0.2;
      targetLookY = 0.2 + mouse.current.y * 0.15;
      targetLookZ = 0;
    }

    // Buttery smooth lerp for camera position
    const lerpSpeed = activeFixture ? 0.055 : 0.04;
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

export interface SpaShowroom3DSceneProps {
  activeFixtureId: string | null;
  onSelectFixture: (id: string) => void;
  onResetZoom: () => void;
  activeFinish: ProductFinish;
  waterActive: boolean;
  showHotspots: boolean;
}

export const SpaShowroom3DScene: React.FC<SpaShowroom3DSceneProps> = ({
  activeFixtureId,
  onSelectFixture,
  onResetZoom,
  activeFinish,
  waterActive,
  showHotspots,
}) => {
  const [modelRotY, setModelRotY] = React.useState(0);

  const activeFixture = useMemo(() => {
    return FIXTURES_3D.find((f) => f.id === activeFixtureId) || null;
  }, [activeFixtureId]);

  return (
    <div className="relative w-full h-full select-none cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0.4, 10.5], fov: 44, near: 0.1, far: 80 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
      >
        <color attach="background" args={['#14100c']} />

        {/* Cinematic Camera Rig & Parallax */}
        <CameraRig
          activeFixture={activeFixture}
          onModelRotYUpdate={setModelRotY}
        />

        {/* Atmospheric Warm Lighting System */}
        <ambientLight intensity={1.35} color="#fae5b3" />
        <directionalLight position={[0, 6, 4]} intensity={2.2} color="#fff2d6" castShadow />
        <pointLight position={[0, 4.5, 1]} intensity={3.0} color="#ffd88a" distance={10} />
        <pointLight position={[-4.5, 2, 0]} intensity={1.8} color="#ffe5b3" distance={7} />
        <pointLight position={[4.5, 2, 0]} intensity={1.8} color="#ffe5b3" distance={7} />

        {/* Volumetric Floating Golden Light Particles & Water Mist */}
        <Sparkles
          count={55}
          scale={[16, 9, 12]}
          size={3.2}
          speed={0.4}
          opacity={0.65}
          color="#d4af37"
        />

        {/* 3D Curved Architectural Sanctuary Room */}
        <Suspense fallback={null}>
          <SpaCurvedBackdrop onBackdropClick={onResetZoom} />
        </Suspense>

        {/* 3D Spatial Hotspots */}
        {showHotspots &&
          FIXTURES_3D.map((f) => (
            <SpatialHotspot
              key={f.id}
              fixture={f}
              isActive={activeFixtureId === f.id}
              onSelect={() => onSelectFixture(f.id)}
            />
          ))}

        {/* Live Interactive 3D Model in Focused View */}
        <FocusedModelDispatcher
          activeFixture={activeFixture}
          activeFinish={activeFinish}
          waterActive={waterActive}
          modelRotY={modelRotY}
        />
      </Canvas>
    </div>
  );
};
