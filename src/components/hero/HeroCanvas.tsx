import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { StudioLighting } from '../three/StudioLighting';
import { ProductModel } from '../three/ProductModel';
import { ProductFinish } from '../../types';

interface HeroCanvasProps {
  progress: number;
  activeFinish?: ProductFinish;
}

interface SceneRigProps {
  progress: number;
  activeFinish: ProductFinish;
}

const SceneRig: React.FC<SceneRigProps> = ({ progress, activeFinish }) => {
  const modelGroupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  // Subtle mouse parallax effect
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const [dynWaterFlow, setDynWaterFlow] = React.useState(0.6);
  const [dynWarmth, setDynWarmth] = React.useState(1.0);

  useFrame((state) => {
    const p = THREE.MathUtils.clamp(progress, 0, 1);

    let targetCamX = 0;
    let targetCamY = 1.0;
    let targetCamZ = 6.2;
    let targetLookX = 0;
    let targetLookY = 0.2;
    let targetLookZ = 0;

    let targetModelRotY = 0.35;
    let targetModelRotX = -0.02;
    let targetModelScale = 1.0;
    let targetModelPosY = -0.15;
    let waterFlow = 0.6;
    let lightingWarmth = 1.0;

    if (p < 0.25) {
      // Stage 1: The Art of Water
      const t = p / 0.25;
      targetCamX = THREE.MathUtils.lerp(0, 0.4, t);
      targetCamY = THREE.MathUtils.lerp(1.2, 0.9, t);
      targetCamZ = THREE.MathUtils.lerp(6.8, 5.8, t);
      targetModelRotY = THREE.MathUtils.lerp(0.2, 0.55, t);
      targetModelPosY = THREE.MathUtils.lerp(-0.25, -0.12, t);
      targetModelScale = THREE.MathUtils.lerp(0.96, 1.04, t);
      waterFlow = THREE.MathUtils.lerp(0.4, 0.7, t);
      lightingWarmth = 1.0;
    } else if (p < 0.52) {
      // Stage 2: Form in Motion
      const t = (p - 0.25) / 0.27;
      targetCamX = THREE.MathUtils.lerp(0.4, -1.8, t);
      targetCamY = THREE.MathUtils.lerp(0.9, 1.4, t);
      targetCamZ = THREE.MathUtils.lerp(5.8, 4.4, t);
      targetLookY = THREE.MathUtils.lerp(0.2, 0.4, t);
      targetModelRotY = THREE.MathUtils.lerp(0.55, 2.1, t); // Orbit ~120 degrees
      targetModelRotX = THREE.MathUtils.lerp(-0.02, 0.08, t);
      targetModelScale = THREE.MathUtils.lerp(1.04, 1.08, t);
      waterFlow = THREE.MathUtils.lerp(0.7, 0.9, t);
      lightingWarmth = 1.1;
    } else if (p < 0.78) {
      // Stage 3: Material with Purpose (Macro Detail)
      const t = (p - 0.52) / 0.26;
      targetCamX = THREE.MathUtils.lerp(-1.8, 0.85, t);
      targetCamY = THREE.MathUtils.lerp(1.4, 0.65, t);
      targetCamZ = THREE.MathUtils.lerp(4.4, 3.2, t); // Close-up macro!
      targetLookX = THREE.MathUtils.lerp(0, 0.35, t);
      targetLookY = THREE.MathUtils.lerp(0.4, 0.6, t);
      targetModelRotY = THREE.MathUtils.lerp(2.1, 3.4, t);
      targetModelRotX = THREE.MathUtils.lerp(0.08, -0.05, t);
      targetModelScale = THREE.MathUtils.lerp(1.08, 1.15, t);
      waterFlow = THREE.MathUtils.lerp(0.9, 0.6, t);
      lightingWarmth = 1.35; // Rich warm golden material emphasis
    } else {
      // Stage 4: Designed Around Water (Architectural Wide)
      const t = (p - 0.78) / 0.22;
      targetCamX = THREE.MathUtils.lerp(0.85, 0, t);
      targetCamY = THREE.MathUtils.lerp(0.65, 1.1, t);
      targetCamZ = THREE.MathUtils.lerp(3.2, 6.4, t);
      targetLookX = THREE.MathUtils.lerp(0.35, 0, t);
      targetLookY = THREE.MathUtils.lerp(0.6, 0.1, t);
      targetModelRotY = THREE.MathUtils.lerp(3.4, 4.45, t);
      targetModelRotX = THREE.MathUtils.lerp(-0.05, -0.02, t);
      targetModelScale = THREE.MathUtils.lerp(1.15, 1.0, t);
      targetModelPosY = THREE.MathUtils.lerp(-0.12, -0.2, t);
      waterFlow = THREE.MathUtils.lerp(0.6, 1.0, t); // Full crystalline stream
      lightingWarmth = 1.0;
    }

    if (Math.abs(dynWaterFlow - waterFlow) > 0.05) {
      setDynWaterFlow(waterFlow);
    }
    if (Math.abs(dynWarmth - lightingWarmth) > 0.05) {
      setDynWarmth(lightingWarmth);
    }

    // Apply gentle mouse parallax to camera
    const parallaxX = mouse.current.x * 0.25;
    const parallaxY = -mouse.current.y * 0.2;

    // Smooth lerping to destination coordinates
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      targetCamX + parallaxX,
      0.08
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      targetCamY + parallaxY,
      0.08
    );
    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      targetCamZ,
      0.08
    );

    state.camera.lookAt(targetLookX, targetLookY, targetLookZ);

    if (modelGroupRef.current) {
      modelGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        modelGroupRef.current.rotation.y,
        targetModelRotY,
        0.08
      );
      modelGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        modelGroupRef.current.rotation.x,
        targetModelRotX,
        0.08
      );
      modelGroupRef.current.position.y = THREE.MathUtils.lerp(
        modelGroupRef.current.position.y,
        targetModelPosY,
        0.08
      );
      const s = THREE.MathUtils.lerp(
        modelGroupRef.current.scale.x,
        targetModelScale,
        0.08
      );
      modelGroupRef.current.scale.set(s, s, s);
    }
  });

  return (
    <>
      <StudioLighting intensityMultiplier={1.15} warmth={dynWarmth} />

      <group ref={modelGroupRef}>
        <ProductModel
          finish={activeFinish}
          waterActive={true}
          waterIntensity={dynWaterFlow}
          showPedestal={true}
        />
      </group>
    </>
  );
};

export const HeroCanvas: React.FC<HeroCanvasProps> = ({
  progress,
  activeFinish = 'brushed_brass',
}) => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 1.2, 6.8], fov: 32 }}
        className="w-full h-full"
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        dpr={[1, 2]}
      >
        <fogExp2 attach="fog" args={['#050505', 0.04]} />
        <SceneRig progress={progress} activeFinish={activeFinish} />
      </Canvas>
    </div>
  );
};
