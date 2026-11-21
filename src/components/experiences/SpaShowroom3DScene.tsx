import React, { useRef, useMemo, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, Sparkles, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Sparkles as SparklesIcon } from 'lucide-react';
import { ProductFinish } from '../../types';

export interface WalkaroundWaypoint {
  id: string;
  name: string;
  shortName: string;
  area: string;
  // Normalized target coordinates on the backdrop [-0.5 to 0.5]
  normX: number;
  normY: number;
  zoomZ: number; // Camera Z distance (smaller = closer zoom)
  fixtureId?: string;
  description: string;
}

export const SANCTUARY_WAYPOINTS: WalkaroundWaypoint[] = [
  {
    id: 'portal',
    name: 'Sanctuary Grand Perspective',
    shortName: 'Grand Portal',
    area: 'Arrival Threshold',
    normX: 0.0,
    normY: 0.0,
    zoomZ: 10.0,
    description:
      'Panoramic grand perspective overlooking the freestanding mineral tub, glass shower suite, and floating vanity.',
  },
  {
    id: 'shower-sanctuary',
    name: 'Concealed Rain Shower Suite',
    shortName: 'Shower Suite',
    area: 'Wellness Enclosure',
    normX: -0.34,
    normY: 0.08,
    zoomZ: 4.6,
    fixtureId: 'shower-sanctuary',
    description:
      'Inside the frameless architectural glass enclosure, inspecting the flush ceiling rain head, shampoo niches, and thermostatic column.',
  },
  {
    id: 'freestanding-bath',
    name: 'Freestanding Bathtub & Floor Spout',
    shortName: 'Bathtub & Spout',
    area: 'Central Sanctuary',
    normX: -0.09,
    normY: -0.14,
    zoomZ: 4.3,
    fixtureId: 'freestanding-bath',
    description:
      'Up close with the sculpted mineral composite bath, observing the 24K brushed gold floor mixer spout and water reservoir.',
  },
  {
    id: 'vanity-mixers',
    name: 'Double Marble Vanity & Optics',
    shortName: 'Vanity & Optics',
    area: 'Grooming Console',
    normX: 0.32,
    normY: 0.0,
    zoomZ: 4.5,
    fixtureId: 'vanity-mixers',
    description:
      'Standing at the cantilevered dark marble console, examining the dual ceramic vessel basins, gold deck mixers, and backlit mirrors.',
  },
  {
    id: 'crystal-chandelier',
    name: 'Cascading Crystal Chandelier',
    shortName: 'Chandelier',
    area: 'Ceiling Centerpiece',
    normX: 0.0,
    normY: 0.33,
    zoomZ: 5.0,
    fixtureId: 'crystal-chandelier',
    description:
      'Looking upward into the concentric tiered brass rings and hand-cut K9 crystal prisms casting warm light across the marble.',
  },
];

export interface FixtureHotspotData {
  id: string;
  name: string;
  shortName: string;
  category: string;
  sku: string;
  catalogId: string;
  normX: number;
  normY: number;
  waypointId: string;
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
    waypointId: 'shower-sanctuary',
  },
  {
    id: 'freestanding-bath',
    name: 'Sanvera Serene Freestanding Oval Bathtub',
    shortName: 'Oval Bathtub',
    category: 'Bathtubs & Spouts',
    sku: 'SV-BT-01-FL',
    catalogId: 'bathtub-freestanding',
    normX: 0.02,
    normY: -0.17,
    waypointId: 'freestanding-bath',
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
    waypointId: 'freestanding-bath',
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
    waypointId: 'vanity-mixers',
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
    waypointId: 'vanity-mixers',
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
    waypointId: 'crystal-chandelier',
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
    texture.generateMipmaps = false; // Disable mipmaps for ultra-crisp 1:1 pixel rendering
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = 16;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.needsUpdate = true;
  }, [texture]);

  // Gentle full-bleed architectural panoramic plane (subtle curvature for immersive depth)
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(planeWidth, planeHeight, 32, 16);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      // Very gentle cylindrical curve hugging viewer peripheral vision without exposing edges
      const zOffset = -Math.pow(x / (planeWidth * 0.5), 2) * 0.35;
      pos.setZ(i, zOffset);
    }
    geo.computeVertexNormals();
    return geo;
  }, [planeWidth, planeHeight]);

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Full-Bleed Edge-to-Edge Calacatta Gold Marble Sanctuary Panoramic Wall */}
      <mesh
        geometry={geometry}
        onClick={(e) => {
          e.stopPropagation();
          onBackdropClick();
        }}
      >
        <meshBasicMaterial map={texture} toneMapped={false} />
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
      <Html center distanceFactor={10} zIndexRange={[20, 0]}>
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative cursor-pointer select-none group flex items-center justify-center p-3 -m-3"
          title={`Click to focus ${fixture.name}`}
        >
          {/* Subtle breathing ripple halo */}
          <span
            className={`absolute w-7 h-7 rounded-full border transition-all duration-700 pointer-events-none ${
              isActive
                ? 'border-[#00c2d3] scale-125 opacity-90 animate-ping'
                : 'border-[#00c2d3]/50 scale-100 opacity-40 group-hover:scale-125 group-hover:border-[#00c2d3] group-hover:opacity-80'
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

          {/* Sleek Tooltip */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-3 px-3 py-1.5 rounded-xl bg-[#041c20]/95 backdrop-blur-2xl border border-[#00808c]/50 text-center whitespace-nowrap shadow-[0_15px_40px_rgba(0,0,0,0.85)] pointer-events-none transition-all duration-300 ${
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
            <p className="editorial-title text-xs text-white font-light mt-0.5">{fixture.shortName}</p>
            <p className="label-mono text-[8px] text-[#d4af37] mt-0.5 flex items-center justify-center gap-1">
              <SparklesIcon size={8} className="text-[#d4af37]" />
              <span>Click to inspect fixture</span>
            </p>
          </div>
        </div>
      </Html>
    </group>
  );
};

interface CameraRigProps {
  activeWaypointId: string;
  panOffset: { x: number; y: number };
  planeWidth: number;
  planeHeight: number;
}

const CameraRig: React.FC<CameraRigProps> = ({
  activeWaypointId,
  panOffset,
  planeWidth,
  planeHeight,
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

  useFrame((_, delta) => {
    const activeWaypoint =
      SANCTUARY_WAYPOINTS.find((w) => w.id === activeWaypointId) || SANCTUARY_WAYPOINTS[0];

    // Compute Target 3D coordinates based on normalized waypoint
    const targetCenterX = activeWaypoint.normX * planeWidth;
    const targetCenterY = activeWaypoint.normY * planeHeight;

    let targetCamX = targetCenterX;
    let targetCamY = targetCenterY;
    let targetCamZ = activeWaypoint.zoomZ;

    // Target Look-At Target + Drag-To-Look Pan + Subtle Parallax
    let targetLookX = targetCenterX + panOffset.x + mouse.current.x * 0.12;
    let targetLookY = targetCenterY + panOffset.y - mouse.current.y * 0.08;
    let targetLookZ = 0;

    // In Grand Portal overview, add subtle floating Steadicam sway
    if (activeWaypoint.id === 'portal') {
      targetCamX += mouse.current.x * 0.28;
      targetCamY += -mouse.current.y * 0.15;
    }

    // Critically Damped Exponential Spring (Zero frame-rate dependency, buttery smooth)
    const decay = 3.8;
    const alpha = 1 - Math.exp(-decay * delta);

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX, alpha);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, alpha);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, alpha);

    lookAtTarget.current.x = THREE.MathUtils.lerp(lookAtTarget.current.x, targetLookX, alpha);
    lookAtTarget.current.y = THREE.MathUtils.lerp(lookAtTarget.current.y, targetLookY, alpha);
    lookAtTarget.current.z = THREE.MathUtils.lerp(lookAtTarget.current.z, targetLookZ, alpha);

    camera.lookAt(lookAtTarget.current);
  });

  return null;
};

interface SceneContentProps {
  activeWaypointId: string;
  onSelectWaypoint: (id: string) => void;
  onResetZoom: () => void;
  showHotspots: boolean;
  panOffset: { x: number; y: number };
}

const SceneContent: React.FC<SceneContentProps> = ({
  activeWaypointId,
  onSelectWaypoint,
  onResetZoom,
  showHotspots,
  panOffset,
}) => {
  const { viewport } = useThree();

  // Full-bleed Cover Dimensions calculation
  // Ensures 100% edge-to-edge coverage with ZERO black gaps on any display aspect ratio
  const { planeWidth, planeHeight } = useMemo(() => {
    const imageAspect = 1024 / 576; // 1.77778
    const vAspect = viewport.width / viewport.height;
    let w: number;
    let h: number;

    // Generous overscan so pan & camera movement never expose edges
    if (vAspect > imageAspect) {
      w = viewport.width * 1.35;
      h = w / imageAspect;
    } else {
      h = viewport.height * 1.35;
      w = h * imageAspect;
    }
    return { planeWidth: w, planeHeight: h };
  }, [viewport.width, viewport.height]);

  return (
    <>
      <CameraRig
        activeWaypointId={activeWaypointId}
        panOffset={panOffset}
        planeWidth={planeWidth}
        planeHeight={planeHeight}
      />

      {/* Atmospheric Luxury Lighting */}
      <ambientLight intensity={1.5} color="#eef7f8" />
      <directionalLight position={[0, 6, 4]} intensity={2.0} color="#fff6e5" />
      <pointLight position={[0, 3.4, 1.5]} intensity={3.0} color="#ffd88a" distance={12} />

      {/* Volumetric Floating Golden & Water Mist Sparkles */}
      <Sparkles
        count={50}
        scale={[planeWidth * 0.9, planeHeight * 0.9, 8]}
        size={3.0}
        speed={0.35}
        opacity={0.65}
        color="#00c2d3"
      />

      {/* Full-Bleed Edge-to-Edge Panoramic Luxury Bathroom Sanctuary */}
      <Suspense fallback={null}>
        <SpaFullBleedBackdrop
          planeWidth={planeWidth}
          planeHeight={planeHeight}
          onBackdropClick={onResetZoom}
        />
      </Suspense>

      {/* 3D Spatial Micro-Beacons on Key Fixtures */}
      {showHotspots &&
        FIXTURES_HOTSPOTS.map((f) => {
          const markerX = f.normX * planeWidth;
          const markerY = f.normY * planeHeight;
          const markerZ = -Math.pow(markerX / (planeWidth * 0.5), 2) * 0.35 + 0.12;

          return (
            <SpatialMicroBeacon
              key={f.id}
              fixture={f}
              position={[markerX, markerY, markerZ]}
              isActive={activeWaypointId === f.waypointId || activeWaypointId === f.id}
              onSelect={() => onSelectWaypoint(f.waypointId)}
            />
          );
        })}
    </>
  );
};

export interface SpaShowroom3DSceneProps {
  activeWaypointId: string;
  onSelectWaypoint: (id: string) => void;
  onResetZoom: () => void;
  showHotspots: boolean;
  activeFinish: ProductFinish;
}

export const SpaShowroom3DScene: React.FC<SpaShowroom3DSceneProps> = ({
  activeWaypointId,
  onSelectWaypoint,
  onResetZoom,
  showHotspots,
}) => {
  const [panOffset, setPanOffset] = React.useState({ x: 0, y: 0 });
  const isPointerDown = useRef(false);
  const lastPointerPos = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isPointerDown.current = true;
    lastPointerPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDown.current) return;
    const deltaX = e.clientX - lastPointerPos.current.x;
    const deltaY = e.clientY - lastPointerPos.current.y;
    lastPointerPos.current = { x: e.clientX, y: e.clientY };

    setPanOffset((prev) => ({
      x: THREE.MathUtils.clamp(prev.x + deltaX * 0.005, -1.8, 1.8),
      y: THREE.MathUtils.clamp(prev.y - deltaY * 0.0035, -0.9, 0.9),
    }));
  };

  const handlePointerUp = () => {
    isPointerDown.current = false;
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="relative w-full h-full select-none cursor-grab active:cursor-grabbing"
    >
      <Canvas
        camera={{ position: [0, 0, 10.0], fov: 46, near: 0.1, far: 80 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
      >
        <color attach="background" args={['#031a1e']} />
        <SceneContent
          activeWaypointId={activeWaypointId}
          onSelectWaypoint={onSelectWaypoint}
          onResetZoom={onResetZoom}
          showHotspots={showHotspots}
          panOffset={panOffset}
        />
      </Canvas>
    </div>
  );
};
