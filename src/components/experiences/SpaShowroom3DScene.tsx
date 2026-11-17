import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, Sparkles, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Sparkles as SparklesIcon } from 'lucide-react';

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
  },
];

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

  // Gentle curved panoramic surface: edges bend back slightly for natural 3D depth
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(planeWidth, planeHeight, 32, 16);
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
      {/* Edge-to-Edge Full-Bleed Golden Marble Sanctuary Mesh */}
      <mesh
        geometry={geometry}
        onClick={(e) => {
          e.stopPropagation();
          onBackdropClick();
        }}
      >
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      {/* Subtle Polished Marble Ground Reflection Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -planeHeight * 0.49, 1]}>
        <planeGeometry args={[planeWidth * 1.2, 8]} />
        <meshStandardMaterial
          color="#16120e"
          roughness={0.2}
          metalness={0.4}
          transparent
          opacity={0.65}
        />
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
      {/* Scaled HTML micro-pin in 3D */}
      <Html center distanceFactor={10} zIndexRange={[15, 0]}>
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative cursor-pointer select-none group flex items-center justify-center p-2 -m-2"
          title={`Click to inspect ${fixture.name}`}
        >
          {/* Subtle breathing ripple ring */}
          <span
            className={`absolute w-7 h-7 rounded-full border transition-all duration-700 pointer-events-none ${
              isActive
                ? 'border-[#00c2d3] scale-125 opacity-90 animate-ping'
                : 'border-[#c5a059]/40 scale-100 opacity-40 group-hover:scale-125 group-hover:border-[#00c2d3]/80 group-hover:opacity-80'
            }`}
          />

          {/* Micro Beacon Jewel Core */}
          <div
            className={`relative z-10 flex items-center justify-center w-6 h-6 rounded-full border shadow-xl transition-all duration-300 ${
              isActive
                ? 'bg-gradient-to-tr from-[#00808c] to-[#00f0ff] border-white text-white scale-125 shadow-[0_0_24px_rgba(0,194,211,1)]'
                : hovered
                ? 'bg-[#00808c] border-[#fdfbf7] text-white scale-115 shadow-[0_0_16px_rgba(0,194,211,0.8)]'
                : 'bg-[#18130e]/92 backdrop-blur-md border-[#c5a059]/70 text-[#d4af37] shadow-lg shadow-black/80 group-hover:border-[#00c2d3]'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full transition-colors ${
                isActive ? 'bg-white' : hovered ? 'bg-[#00f0ff]' : 'bg-[#00c2d3]'
              }`}
            />
          </div>

          {/* Sleek Architectural Tooltip (Appears above beacon) */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-3 px-3 py-1.5 rounded-xl bg-[#18130e]/95 backdrop-blur-2xl border border-[#c5a059]/40 text-center whitespace-nowrap shadow-[0_15px_40px_rgba(0,0,0,0.85)] pointer-events-none transition-all duration-300 ${
              hovered && !isActive
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-1 scale-95 pointer-events-none'
            }`}
          >
            <div className="flex items-center justify-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[#00c2d3]" />
              <p className="label-mono text-[8px] text-[#00c2d3] uppercase font-semibold tracking-widest">
                {fixture.category}
              </p>
            </div>
            <p className="editorial-title text-xs text-[#fdfbf7] font-light mt-0.5">{fixture.name}</p>
            <p className="label-mono text-[8px] text-[#c5a059] mt-0.5 flex items-center justify-center gap-1">
              <SparklesIcon size={8} className="text-[#d4af37]" />
              <span>Click to focus & inspect</span>
            </p>
          </div>
        </div>
      </Html>
    </group>
  );
};

interface CameraRigProps {
  activeFixtureId: string | null;
  planeWidth: number;
  planeHeight: number;
}

const CameraRig: React.FC<CameraRigProps> = ({ activeFixtureId, planeWidth, planeHeight }) => {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const lookAtTarget = useRef(new THREE.Vector3(0, 0, 0));

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
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

      // Balanced 1.28x architectural framing: gentle glide into view without disorienting extreme zoom
      targetX = markerX * 0.62;
      targetY = markerY * 0.62;
      targetZ = 7.8;

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
}

const SceneContent: React.FC<SceneContentProps> = ({
  activeFixtureId,
  onSelectFixture,
  onResetZoom,
  showHotspots,
}) => {
  const { viewport } = useThree();

  // Full-bleed calculation: cover viewport edge-to-edge at camera distance 10
  const { planeWidth, planeHeight } = useMemo(() => {
    const imageAspect = 1024 / 576; // 1.77778
    const vAspect = viewport.width / viewport.height;
    let w: number;
    let h: number;

    if (vAspect > imageAspect) {
      // Viewport wider than 16:9
      w = viewport.width * 1.08;
      h = w / imageAspect;
    } else {
      // Viewport taller than 16:9
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
      />

      {/* Atmospheric Warm Lighting System */}
      <ambientLight intensity={1.4} color="#fae5b3" />
      <directionalLight position={[0, 5, 4]} intensity={2.0} color="#fff2d6" />
      <pointLight position={[0, 3.2, 1.5]} intensity={2.8} color="#ffd88a" distance={10} />

      {/* Volumetric Floating Golden Sparkles */}
      <Sparkles
        count={45}
        scale={[planeWidth * 0.9, planeHeight * 0.9, 8]}
        size={2.8}
        speed={0.35}
        opacity={0.65}
        color="#d4af37"
      />

      {/* 100% Full-Bleed Curved Panoramic Sanctuary Wall */}
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
    </>
  );
};

export interface SpaShowroom3DSceneProps {
  activeFixtureId: string | null;
  onSelectFixture: (id: string) => void;
  onResetZoom: () => void;
  showHotspots: boolean;
}

export const SpaShowroom3DScene: React.FC<SpaShowroom3DSceneProps> = ({
  activeFixtureId,
  onSelectFixture,
  onResetZoom,
  showHotspots,
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
          toneMappingExposure: 1.12,
        }}
      >
        <color attach="background" args={['#14100c']} />
        <SceneContent
          activeFixtureId={activeFixtureId}
          onSelectFixture={onSelectFixture}
          onResetZoom={onResetZoom}
          showHotspots={showHotspots}
        />
      </Canvas>
    </div>
  );
};
