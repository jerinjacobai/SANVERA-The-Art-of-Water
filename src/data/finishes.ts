import { FinishOption } from '../types';

export const FINISH_OPTIONS: FinishOption[] = [
  {
    id: 'brushed_brass',
    name: 'Brushed Brass',
    hex: '#A8875A',
    metalness: 0.88,
    roughness: 0.26,
    description: 'Precision hand-brushed solid brass sealed with an ultra-thin microscopic ceramic coating for lifelong warmth and patina resistance.',
  },
  {
    id: 'polished_chrome',
    name: 'Polished Chrome',
    hex: '#D8DEE4',
    metalness: 0.95,
    roughness: 0.08,
    description: 'Triple-plated mirror chrome providing crisp, liquid reflections that visually dissolve against polished stone surfaces.',
  },
  {
    id: 'dark_bronze',
    name: 'Dark Bronze',
    hex: '#231E1B',
    metalness: 0.75,
    roughness: 0.38,
    description: 'Deep architectural graphite bronze with warm earthen undertones, offering a quiet, monolithic presence.',
  },
  {
    id: 'matte_stone',
    name: 'Honed Stone',
    hex: '#8A857B',
    metalness: 0.05,
    roughness: 0.82,
    description: 'Ground composite volcanic mineral stone offering an organic, matte tactile texture with acoustic dampening.',
  },
];
