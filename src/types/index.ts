export type ProductFinish = 'brushed_brass' | 'polished_chrome' | 'dark_bronze' | 'matte_stone';

export interface FinishOption {
  id: ProductFinish;
  name: string;
  hex: string;
  metalness: number;
  roughness: number;
  description: string;
}

export interface CollectionItem {
  id: string;
  number: string;
  title: string;
  series: string;
  description: string;
  previewImage: string;
  specs: {
    materials: string;
    flowRate: string;
    cartridge: string;
    dimensions: string;
    warranty: string;
    finishes: ProductFinish[];
  };
  features: string[];
}

export type ProductCategory =
  | 'faucets_mixers'
  | 'showers'
  | 'basins'
  | 'bathtubs'
  | 'toilets'
  | 'mirrors'
  | 'accessories'
  | 'drainage'
  | 'public_area';

export interface SanveraProduct {
  id: string;
  number: string;
  name: string;
  category: ProductCategory;
  categoryName: string;
  family: string;
  series: string;
  sku: string;
  description: string;
  dimensions: string;
  flowRate?: string;
  materials: string;
  cartridge?: string;
  finishes: ProductFinish[];
  spatialZone: number; // 0: Arrival, 1: Faucets, 2: Showers, 3: Basins, 4: Bath, 5: Mirrors & Hardware
  tags: string[];
  featured: boolean;
  image?: string;
  technicalDrawing?: string;
}

export interface JournalArticle {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
  image: string;
}

export interface MaterialPillar {
  id: string;
  name: string;
  kicker: string;
  description: string;
  secondaryText: string;
  colorHex: string;
  properties: {
    origin: string;
    tactility: string;
    resilience: string;
  };
  image: string;
}

export interface ProjectEnquiry {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  location: string;
  requirement: string;
  message: string;
}
