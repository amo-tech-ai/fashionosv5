
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
  scores: {
    overall: number;
    website: number;
    social: number;
  };
  dna: string[];
  persona: string;
  personas: Persona[];
  marketPosition: MarketPosition;
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

export interface ShootRecommendation {
  id: string;
  title: string;
  reason: string;
  channels: string[];
  impact: string;
  image: string;
}

export interface FashionItem {
  id: string;
  title: string;
  subtitle: string;
  status: 'In Progress' | 'Planned' | 'Live' | 'Archived';
  progress: number;
  image: string;
}

export interface Task {
  id: string;
  title: string;
  status: 'pending' | 'completed';
  dueDate: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
