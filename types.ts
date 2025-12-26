
export type ModuleType = 'home' | 'events' | 'shoots' | 'website' | 'campaigns' | 'designers' | 'sponsors' | 'venues' | 'media' | 'saved' | 'chat' | 'settings';

export interface Persona {
  name: string;
  illustration: string;
  demographics: string;
  psychographics: string;
  lifestyle: string[];
  channels: string[];
}

export interface MarketPosition {
  x: number; // -100 (Street) to 100 (Luxury)
  y: number; // -100 (Minimal) to 100 (Avant-Garde)
}

export interface Brand {
  id: string;
  name: string;
  description: string;
  type: string;
  website: string;
  dnaVersion: string;
  scores: {
    overall: number;
    website: number;
    social: number;
  };
  dna: string[];
  persona: string;
  personas: Persona[];
  marketPosition: MarketPosition;
  styleGuide?: {
    colors: { name: string; hex: string; rule: string }[];
    typography: { heading: string; body: string };
  };
}

export interface ShotItem {
  id: string;
  description: string;
  lighting: string;
  pose: string;
  channel: 'Instagram' | 'TikTok' | 'Pinterest' | 'Amazon' | 'Shopify' | 'Vogue' | 'Web';
  status: 'Pending' | 'Captured' | 'Approved' | 'Flagged';
  complianceScore?: number;
  testImage?: string;
  referenceImage?: string;
  auditFeedback?: string;
  notes?: string;
}

export interface Shoot {
  id: string;
  brandId: string;
  title: string;
  concept: string;
  status: 'Strategy' | 'Planning' | 'Production' | 'Post-Production' | 'Completed';
  dnaSnapshot: {
    version: string;
    pillars: string[];
    styleGuide: any;
  };
  crew: {
    photographer: string;
    stylist: string;
    model: string;
  };
  shotList: ShotItem[];
  preVizVideo?: string;
  scheduledDate: string;
  location: string;
}

export interface ProductMatch {
  color: number;
  lighting: number;
  silhouette: number;
  background: number;
}

export interface ProductPricing {
  brand: number;
  median: number;
  positioning: string;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  img: string;
  category: string;
  match: ProductMatch;
  pricing: ProductPricing;
  storyteller: string;
  status: 'On-brand' | 'Needs review';
}

export interface Post {
  id: string;
  brandId: string;
  platform: 'Instagram' | 'TikTok' | 'Pinterest' | 'Amazon';
  format: 'Reel' | 'Carousel' | 'Story' | 'Video';
  status: 'Draft' | 'Needs Review' | 'Approved' | 'Scheduled';
  caption: string;
  hashtags: string[];
  image: string;
  scheduledTime?: string;
}

export interface FashionItem {
  id: string;
  title: string;
  subtitle: string;
  status: 'In Progress' | 'Planned' | 'Live' | 'Archived';
  progress: number;
  image: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}