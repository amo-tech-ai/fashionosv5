
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FashionItem, Brand, Product } from '../types';

interface ProjectContextType {
  projects: FashionItem[];
  brands: Brand[];
  products: Record<string, Product[]>;
  addProject: (project: FashionItem) => void;
  addBrand: (brand: Brand) => void;
  addProduct: (brandId: string, product: Product) => void;
  updateProject: (id: string, updates: Partial<FashionItem>) => void;
  updateBrand: (id: string, updates: Partial<Brand>) => void;
  updateProduct: (brandId: string, productId: string, updates: Partial<Product>) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [brands, setBrands] = useState<Brand[]>([
    {
      id: 'default',
      name: 'L’Artisan Paris',
      description: 'Luxury artisanal womenswear focusing on sustainable silk and traditional French craftsmanship. Targeting high-net-worth conscious consumers who value heritage and transparency.',
      type: 'Luxury',
      website: 'lartisan.paris',
      scores: { overall: 88, website: 92, social: 74 },
      dna: ['Sustainability', 'Precision Silhouettes', 'Heritage Narrative'],
      persona: 'The Conscious Epicurean',
      marketPosition: { x: 80, y: -65 }, // Luxury + Minimalist
      personas: [
        {
          name: 'The Silent Curator',
          illustration: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
          demographics: '35-45, Global Citizen, Urban',
          psychographics: 'Values structural integrity, radical transparency, and the "forever" purchase.',
          lifestyle: ['Gallery Opening', 'Milan Design Week', 'Organic Vineyard'],
          channels: ['Vogue Print', 'Instagram', 'Pinterest']
        },
        {
          name: 'The Ethical Epicurean',
          illustration: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
          demographics: '28-40, Tech Professional, Conscious',
          psychographics: 'Seeks tactile sensory experiences and ethical craftsmanship narratives.',
          lifestyle: ['Slow Coffee Rituals', 'Architectural Tours', 'Eco-Retreats'],
          channels: ['TikTok', 'Substack', 'HighSnobiety']
        }
      ]
    }
  ]);

  const [products, setProducts] = useState<Record<string, Product[]>>({
    'default': [
      { 
        id: 'HSB-01', 
        name: 'Heritage Silk Blouse', 
        price: '€840', 
        img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80',
        category: 'Ready-to-Wear',
        match: { color: 98, lighting: 92, silhouette: 85, background: 90 },
        pricing: { brand: 840, median: 790, positioning: '+6% (Premium)' },
        storyteller: "Exploring the architectural lines of silk. Our SS25 collection merges heritage weaving with modern minimalism.",
        status: 'On-brand'
      },
      { 
        id: 'AB-22', 
        name: 'Architectural Blazer', 
        price: '€1,250', 
        img: 'https://images.unsplash.com/photo-1539109132314-34a9c6ee892b?auto=format&fit=crop&w=400&q=80',
        category: 'Luxury Tailoring',
        match: { color: 94, lighting: 88, silhouette: 92, background: 85 },
        pricing: { brand: 1250, median: 1100, positioning: '+13% (Ultra-Luxury)' },
        storyteller: "Structural precision meets artisanal softness. A core silhouette for the modern Maison.",
        status: 'Needs review'
      }
    ]
  });

  const [projects, setProjects] = useState<FashionItem[]>([
    { 
      id: '1', 
      title: "Paris Fashion Week", 
      subtitle: "Spring/Summer 2025", 
      status: "In Progress", 
      progress: 65, 
      image: "https://images.unsplash.com/photo-1550630992-c037bb2f43ca?auto=format&fit=crop&w=800&q=80" 
    },
    { 
      id: '2', 
      title: "Vogue Editorial", 
      subtitle: "Desert Noir Shoot", 
      status: "Planned", 
      progress: 20, 
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80" 
    }
  ]);

  const addProject = (project: FashionItem) => {
    setProjects(prev => [project, ...prev]);
  };

  const addBrand = (brand: Brand) => {
    setBrands(prev => [brand, ...prev]);
  };

  const addProduct = (brandId: string, product: Product) => {
    setProducts(prev => ({
      ...prev,
      [brandId]: [product, ...(prev[brandId] || [])]
    }));
  };

  const updateProject = (id: string, updates: Partial<FashionItem>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const updateBrand = (id: string, updates: Partial<Brand>) => {
    setBrands(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const updateProduct = (brandId: string, productId: string, updates: Partial<Product>) => {
    setProducts(prev => ({
      ...prev,
      [brandId]: prev[brandId].map(p => p.id === productId ? { ...p, ...updates } : p)
    }));
  };

  return (
    <ProjectContext.Provider value={{ projects, brands, products, addProject, addBrand, addProduct, updateProject, updateBrand, updateProduct }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error('useProjects must be used within a ProjectProvider');
  return context;
};
