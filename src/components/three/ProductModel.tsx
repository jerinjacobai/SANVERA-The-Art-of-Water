import React, { Suspense } from 'react';
import { ProductFinish, ProductCategory } from '../../types';
import { ProceduralFaucet } from './ProceduralFaucet';
import { BathtubModel } from './BathtubModel';
import { ShowerModel } from './ShowerModel';
import { BasinModel } from './BasinModel';
import { ToiletModel } from './ToiletModel';
import { MirrorModel } from './MirrorModel';
import { AccessoryModel } from './AccessoryModel';
import { DrainageModel } from './DrainageModel';

export interface ProductModelProps {
  category?: ProductCategory | string;
  productId?: string;
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
 * Robust Category-Aware ProductModel Dispatcher
 * Automatically renders high-fidelity procedural 3D models for:
 * - Bathtubs (freestanding oval soaking bath & floor spout)
 * - Showers (concealed thermostatic valve, 300mm rain head, waterfall)
 * - Basins (vessel countertop/pedestal basin & mounted mixer)
 * - Toilets (wall-hung rimless toilet & dual-flush plate)
 * - Mirrors (floating ambient LED backlit smart mirror)
 * - Accessories (Series 73/88 towel bar, robe hooks, shelf)
 * - Drainage (architectural linear tile-in drain)
 * - Faucets & Mixers (661-666 series precision brass mixers)
 */
export const ProductModel: React.FC<ProductModelProps> = ({
  category = 'faucets_mixers',
  productId,
  finish = 'brushed_brass',
  waterActive = true,
  waterIntensity = 1,
  showPedestal = true,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}) => {
  // Normalize category string in case of ID-based inference
  const cat = category?.toLowerCase();

  return (
    <Suspense fallback={null}>
      {cat === 'bathtubs' || productId?.includes('bathtub') ? (
        <BathtubModel
          finish={finish}
          waterActive={waterActive}
          waterIntensity={waterIntensity}
          showPedestal={showPedestal}
          scale={scale * 0.72}
          position={position}
          rotation={rotation}
        />
      ) : cat === 'showers' || productId?.includes('shower') ? (
        <ShowerModel
          finish={finish}
          waterActive={waterActive}
          waterIntensity={waterIntensity}
          showPedestal={showPedestal}
          scale={scale * 0.78}
          position={position}
          rotation={rotation}
        />
      ) : cat === 'basins' || productId?.includes('basin') || productId?.includes('sink') ? (
        <BasinModel
          finish={finish}
          waterActive={waterActive}
          waterIntensity={waterIntensity}
          showPedestal={showPedestal}
          scale={scale * 0.95}
          position={position}
          rotation={rotation}
        />
      ) : cat === 'toilets' || productId?.includes('toilet') ? (
        <ToiletModel
          finish={finish}
          showPedestal={showPedestal}
          scale={scale * 0.95}
          position={position}
          rotation={rotation}
        />
      ) : cat === 'mirrors' || productId?.includes('mirror') ? (
        <MirrorModel
          finish={finish}
          showPedestal={showPedestal}
          scale={scale * 0.95}
          position={position}
          rotation={rotation}
        />
      ) : cat === 'accessories' || productId?.includes('acc') || productId?.includes('accessory') ? (
        <AccessoryModel
          finish={finish}
          showPedestal={showPedestal}
          scale={scale * 1.1}
          position={position}
          rotation={rotation}
        />
      ) : cat === 'drainage' || productId?.includes('drain') ? (
        <DrainageModel
          finish={finish}
          showPedestal={showPedestal}
          scale={scale * 1.1}
          position={position}
          rotation={rotation}
        />
      ) : (
        <ProceduralFaucet
          finish={finish}
          waterActive={waterActive}
          waterIntensity={waterIntensity}
          showPedestal={showPedestal}
          scale={scale}
          position={position}
          rotation={rotation}
        />
      )}
    </Suspense>
  );
};
