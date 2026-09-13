import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface WaterStreamProps {
  active?: boolean;
  intensity?: number;
  origin?: [number, number, number];
  targetY?: number;
}

export const WaterStream: React.FC<WaterStreamProps> = ({
  active = true,
  intensity = 1,
  origin = [-0.7, 1.48, 0],
  targetY = -1.45,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ripplesRef = useRef<THREE.Group>(null);
  const dropletsRef = useRef<THREE.Points>(null);

  // Generate smooth curved path for the water stream
  const curve = useMemo(() => {
    const start = new THREE.Vector3(...origin);
    const mid1 = new THREE.Vector3(origin[0] - 0.04, origin[1] - 0.7, origin[2]);
    const mid2 = new THREE.Vector3(origin[0] - 0.02, origin[1] - 1.8, origin[2]);
    const end = new THREE.Vector3(origin[0], targetY, origin[2]);
    return new THREE.CatmullRomCurve3([start, mid1, mid2, end]);
  }, [origin, targetY]);

  // Procedural droplets around the stream and at impact
  const dropletCount = 45;
  const [dropletPositions, dropletVelocities] = useMemo(() => {
    const pos = new Float32Array(dropletCount * 3);
    const vel = new Float32Array(dropletCount * 3);
    for (let i = 0; i < dropletCount; i++) {
      // Scatter along vertical descent
      pos[i * 3] = origin[0] + (Math.random() - 0.5) * 0.12;
      pos[i * 3 + 1] = origin[1] - Math.random() * (origin[1] - targetY);
      pos[i * 3 + 2] = origin[2] + (Math.random() - 0.5) * 0.12;

      vel[i * 3] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 1] = -0.04 - Math.random() * 0.04;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    return [pos, vel];
  }, [origin, targetY]);

  // Luxury Glass/Water Physical Material
  const waterMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#D8EEF8'),
      metalness: 0.0,
      roughness: 0.04,
      transmission: 0.88,
      thickness: 0.6,
      ior: 1.333,
      transparent: true,
      opacity: 0.82,
      specularIntensity: 1.0,
      specularColor: new THREE.Color('#FFFFFF'),
    });
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Kinetic pulse through water stream
    if (meshRef.current) {
      const scaleX = 1 + Math.sin(t * 12) * 0.035 * intensity;
      const scaleZ = 1 + Math.cos(t * 12) * 0.035 * intensity;
      meshRef.current.scale.set(scaleX, 1, scaleZ);
    }

    // Ripple expansion on the landing stone base
    if (ripplesRef.current) {
      ripplesRef.current.children.forEach((child, idx) => {
        const ring = child as THREE.Mesh;
        const phase = (t * 1.5 + idx * 0.4) % 1;
        ring.scale.setScalar(0.4 + phase * 1.8);
        if (ring.material instanceof THREE.Material) {
          ring.material.opacity = (1 - phase) * 0.45 * intensity;
        }
      });
    }

    // Animated water droplet physics
    if (dropletsRef.current) {
      const geo = dropletsRef.current.geometry;
      const posAttr = geo.attributes.position;
      const array = posAttr.array as Float32Array;

      for (let i = 0; i < dropletCount; i++) {
        array[i * 3 + 1] += dropletVelocities[i * 3 + 1];
        if (array[i * 3 + 1] < targetY) {
          // Reset droplet back to top spout
          array[i * 3] = origin[0] + (Math.random() - 0.5) * 0.08;
          array[i * 3 + 1] = origin[1] - Math.random() * 0.1;
          array[i * 3 + 2] = origin[2] + (Math.random() - 0.5) * 0.08;
        }
      }
      posAttr.needsUpdate = true;
    }
  });

  if (!active) return null;

  return (
    <group>
      {/* Central continuous flowing stream */}
      <mesh ref={meshRef} material={waterMaterial}>
        <tubeGeometry args={[curve, 48, 0.042 * intensity, 16, false]} />
      </mesh>

      {/* Internal crystal core */}
      <mesh material={waterMaterial}>
        <tubeGeometry args={[curve, 32, 0.022 * intensity, 12, false]} />
      </mesh>

      {/* Cascading water particles */}
      <points ref={dropletsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[dropletPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#E8F4FA"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Surface impact ripples */}
      <group ref={ripplesRef} position={[origin[0], targetY + 0.01, origin[2]]} rotation={[-Math.PI / 2, 0, 0]}>
        {[0, 1, 2].map((idx) => (
          <mesh key={idx}>
            <ringGeometry args={[0.08, 0.1, 32]} />
            <meshBasicMaterial
              color="#D8EEF8"
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};
