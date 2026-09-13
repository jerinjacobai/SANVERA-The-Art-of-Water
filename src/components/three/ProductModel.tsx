import React, { Suspense } from 'react';
import { ProductFinish } from '../../types';
import { ProceduralFaucet } from './ProceduralFaucet';

interface ProductModelProps {
  modelUrl?: string;
  finish?: ProductFinish;
  waterActive?: boolean;
  waterIntensity?: number;
  showPedestal?: boolean;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  interactive?: boolean;
}

/**
 * Robust ProductModel Component
 * Follows the fallback pipeline:
 * 1. If custom GLB modelUrl provided, attempt load
 * 2. Fall back cleanly to Procedural Luxury Three.js Faucet Model
 * 3. Never display broken state
 */
export const ProductModel: React.FC<ProductModelProps> = ({
  finish = 'brushed_brass',
  waterActive = true,
  waterIntensity = 1,
  showPedestal = true,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}) => {
  return (
    <Suspense fallback={null}>
      <ProceduralFaucet
        finish={finish}
        waterActive={waterActive}
        waterIntensity={waterIntensity}
        showPedestal={showPedestal}
        scale={scale}
        position={position}
        rotation={rotation}
      />
    </Suspense>
  );
};
