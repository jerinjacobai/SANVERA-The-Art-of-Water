import { MaterialPillar } from '../types';

export const MATERIALS: MaterialPillar[] = [
  {
    id: 'brass',
    name: 'Solid Brass',
    kicker: '01 / Weight & Metallurgy',
    description: 'Cold-forged from virgin metallurgical brass alloys free of heavy impurities. Every component carries substantial physical mass and conducts the thermal shift of water instantly.',
    secondaryText: 'Hand-finished with directional graining using diamond-carbide abrasive pads, then sealed beneath a microscopic 2-micron inorganic quartz coating.',
    colorHex: '#A8875A',
    properties: {
      origin: 'Brescia, Northern Italy',
      tactility: 'Warm, dense, subtly grained metallic friction',
      resilience: 'Natural antimicrobial properties, 100% recyclable',
    },
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986b88?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'stone',
    name: 'Honed Stone',
    kicker: '02 / Geological Mass',
    description: 'Extracted from selected alpine quarries and reconstituted with plant-derived bio-resins into dense, acoustically inert monolithic forms.',
    secondaryText: 'Matte, light-absorbing, and soft to the skin. Stone anchors the bathroom, grounding the fluid speed of water within timeless geological calm.',
    colorHex: '#B8AEA0',
    properties: {
      origin: 'Carrara & Valser Alpine Quarries',
      tactility: 'Suede-like mineral dryness, warm thermal absorption',
      resilience: 'Non-porous, stain-resistant, zero-radiance mineral matrix',
    },
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'glass',
    name: 'Smoked Glass',
    kicker: '03 / Depth & Refraction',
    description: 'Optically pure low-iron float glass, tempered and tinted with mineral oxides to produce subtle volumetric shadows and gentle light diffusion.',
    secondaryText: 'Used for partition screens, control plates, and shelf planes to layer depth in the room without creating visual boundaries.',
    colorHex: '#4A5259',
    properties: {
      origin: 'Murano & Saint-Gobain specialized kilns',
      tactility: 'Crisp, perfectly planar, low-friction surface',
      resilience: 'Thermally toughened to EN 12150 standard',
    },
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'water',
    name: 'Living Water',
    kicker: '04 / Kinetic Medium',
    description: 'Water is the only material we do not manufacture. Everything else exists to give it an arc worth contemplating and a touch worth remembering.',
    secondaryText: 'Engineered laminar waterways guide the stream without turbulent splashing, presenting water as an uninterrupted, crystalline glass-like column.',
    colorHex: '#8CB8D0',
    properties: {
      origin: 'Atmospheric and municipal hydrological cycle',
      tactility: 'Fluid pressure, temperature envelope, laminar softness',
      resilience: 'Endlessly restorative, cleansing, transformative',
    },
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1000&q=80',
  },
];
