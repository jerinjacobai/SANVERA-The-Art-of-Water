import React, { useMemo } from 'react';
import * as THREE from 'three';
import { ProductFinish } from '../../types';

interface ToiletModelProps {
  finish?: ProductFinish;
  showPedestal?: boolean;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export const ToiletModel: React.FC<ToiletModelProps> = ({
  finish = 'brushed_brass',
  showPedestal = true,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}) => {
  const brassMaterial = useMemo(() => {
    switch (finish) {
      case 'polished_chrome':
        return new THREE.MeshStandardMaterial({ color: '#D8DEE4', metalness: 0.98, roughness: 0.08 });
      case 'dark_bronze':
        return new THREE.MeshStandardMaterial({ color: '#221D1A', metalness: 0.82, roughness: 0.35 });
      case 'matte_stone':
        return new THREE.MeshStandardMaterial({ color: '#948E83', metalness: 0.04, roughness: 0.84 });
      case 'brushed_brass':
      default:
        return new THREE.MeshStandardMaterial({ color: '#A8875A', metalness: 0.88, roughness: 0.24 });
    }
  }, [finish]);

  const ceramicMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#F4F2ED',
      roughness: 0.24,
      metalness: 0.04,
    });
  }, []);

  const wallMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#2C2B29',
      roughness: 0.8,
      metalness: 0.06,
    });
  }, []);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Rear Concealed Wall Module */}
      {showPedestal && (
        <group position={[0, 0.3, -0.45]}>
          <mesh receiveShadow>
            <boxGeometry args={[1.8, 2.4, 0.2]} />
            <primitive object={wallMaterial} attach="material" />
          </mesh>
          {/* Dual Flush Actuation Plate on Wall */}
          <mesh position={[0, 0.65, 0.11]}>
            <boxGeometry args={[0.26, 0.16, 0.015]} />
            <primitive object={brassMaterial} attach="material" />
          </mesh>
          {/* Half-flush and Full-flush buttons */}
          <mesh position={[-0.05, 0.65, 0.12]}>
            <boxGeometry args={[0.08, 0.09, 0.01]} />
            <meshStandardMaterial color="#6E5637" metalness={0.9} roughness={0.3} />
          </mesh>
          <mesh position={[0.05, 0.65, 0.12]}>
            <boxGeometry args={[0.08, 0.09, 0.01]} />
            <meshStandardMaterial color="#6E5637" metalness={0.9} roughness={0.3} />
          </mesh>
        </group>
      )}

      {/* Wall-Hung Cantilevered Toilet Bowl */}
      <group position={[0, -0.1, 0]}>
        {/* Main Ceramic Body */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.42, 0.36, 0.62]} />
          <primitive object={ceramicMaterial} attach="material" />
        </mesh>
        {/* Front Rounded Contoured Nose */}
        <mesh position={[0, -0.02, 0.3]} rotation={[0, -Math.PI / 2, 0]} castShadow>
          <cylinderGeometry args={[0.21, 0.16, 0.32, 32, 1, false, 0, Math.PI]} />
          <primitive object={ceramicMaterial} attach="material" />
        </mesh>
        {/* Ceramic Rim Top Bevel */}
        <mesh position={[0, 0.18, 0.08]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.18, 0.04, 16, 32, Math.PI * 1.8]} />
          <primitive object={ceramicMaterial} attach="material" />
        </mesh>
        {/* Soft-Close Ultra-Slim Ergonomic Seat & Cover */}
        <mesh position={[0, 0.2, 0.06]}>
          <boxGeometry args={[0.4, 0.025, 0.54]} />
          <meshStandardMaterial color="#FAF8F5" roughness={0.15} />
        </mesh>
        {/* Seat Hinges */}
        <mesh position={[-0.12, 0.2, -0.18]}>
          <cylinderGeometry args={[0.02, 0.02, 0.03, 16]} />
          <primitive object={brassMaterial} attach="material" />
        </mesh>
        <mesh position={[0.12, 0.2, -0.18]}>
          <cylinderGeometry args={[0.02, 0.02, 0.03, 16]} />
          <primitive object={brassMaterial} attach="material" />
        </mesh>
      </group>
    </group>
  );
};
