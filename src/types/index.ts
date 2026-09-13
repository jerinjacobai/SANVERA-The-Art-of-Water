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
