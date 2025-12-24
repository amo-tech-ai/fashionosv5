
export type ModuleType = 'home' | 'events' | 'shoots' | 'website' | 'campaigns' | 'designers' | 'sponsors' | 'venues' | 'media' | 'saved' | 'chat' | 'settings';

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
