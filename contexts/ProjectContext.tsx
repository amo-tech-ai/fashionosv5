import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { FashionItem, Brand, Product, Shoot, ShotItem } from '../types';

interface ProjectContextType {
  projects: FashionItem[];
  brands: Brand[];
  products: Record<string, Product[]>;
  shoots: Shoot[];
  addProject: (project: FashionItem) => void;
  addBrand: (brand: Brand) => void;
  addProduct: (brandId: string, product: Product) => void;
  addShoot: (shoot: Shoot) => void;
  updateProject: (id: string, updates: Partial<FashionItem>) => void;
  updateBrand: (id: string, updates: Partial<Brand>) => void;
  updateProduct: (brandId: string, productId: string, updates: Partial<Product>) => void;
  updateShoot: (id: string, updates: Partial<Shoot>) => void;
  getShootById: (id: string) => Shoot | undefined;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const STORAGE_KEY = 'fashion_os_state_v1';

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initial default state
  const defaultBrands: Brand[] = [
    {
      id: 'default',
      name: 'L’Artisan Paris',
      description: 'Luxury artisanal womenswear focusing on sustainable silk and traditional French craftsmanship.',
      type: 'Luxury',
      website: 'lartisan.paris',
      dnaVersion: 'v2.1_Milan',
      scores: { overall: 88, website: 92, social: 74 },
      dna: ['Sustainability', 'Precision Silhouettes', 'Heritage Narrative'],
      persona: 'The Conscious Epicurean',
      marketPosition: { x: 80, y: -65 },
      personas: [
        {
          name: 'The Silent Curator',
          illustration: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
          demographics: '35-45, Global Citizen, Urban',
          psychographics: 'Values structural integrity and radical transparency.',
          lifestyle: ['Gallery Opening', 'Milan Design Week'],
          channels: ['Instagram', 'Pinterest']
        }
      ],
      styleGuide: {
        colors: [
          { name: 'Silk Ivory', hex: '#D9D1C5', rule: 'Primary Base' },
          { name: 'Heritage Sage', hex: '#8FAE9E', rule: 'Accent' }
        ],
        typography: { heading: 'Playfair Display', body: 'Inter' }
      }
    }
  ];

  const [brands, setBrands] = useState<Brand[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_brands`);
    return saved ? JSON.parse(saved) : defaultBrands;
  });

  const [products, setProducts] = useState<Record<string, Product[]>>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_products`);
    return saved ? JSON.parse(saved) : {
      'default': [
        { 
          id: 'HSB-01', 
          name: 'Heritage Silk Blouse', 
          price: '€840', 
          img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80',
          category: 'Ready-to-Wear',
          match: { color: 98, lighting: 92, silhouette: 85, background: 90 },
          pricing: { brand: 840, median: 790, positioning: '+6% (Premium)' },
          storyteller: "Exploring the architectural lines of silk.",
          status: 'On-brand'
        }
      ]
    };
  });

  const [shoots, setShoots] = useState<Shoot[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_shoots`);
    return saved ? JSON.parse(saved) : [
      {
        id: 'shoot-001',
        brandId: 'default',
        title: 'SS25 Desert Noir',
        concept: 'Sustainable silk against brutalist desert landscape.',
        status: 'Planning',
        dnaSnapshot: { version: 'v2.1_Milan', pillars: ['Sustainability', 'Precision Silhouettes'], styleGuide: {} },
        crew: { photographer: 'Elena M.', stylist: 'Sasha V.', model: 'Anja L.' },
        shotList: [
          { id: 'S1', description: 'Hero Silhouette', lighting: 'Harsh', pose: 'Statuesque', channel: 'Instagram', status: 'Pending' }
        ],
        scheduledDate: '2024-11-12',
        location: 'Al-Hajar Wilds'
      }
    ];
  });

  const [projects, setProjects] = useState<FashionItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_projects`);
    return saved ? JSON.parse(saved) : [
      { id: '1', title: "Paris Fashion Week", subtitle: "Spring/Summer 2025", status: "In Progress", progress: 65, image: "https://images.unsplash.com/photo-1550630992-c037bb2f43ca?auto=format&fit=crop&w=800&q=80" }
    ];
  });

  // Persistence Effects
  useEffect(() => localStorage.setItem(`${STORAGE_KEY}_brands`, JSON.stringify(brands)), [brands]);
  useEffect(() => localStorage.setItem(`${STORAGE_KEY}_products`, JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem(`${STORAGE_KEY}_shoots`, JSON.stringify(shoots)), [shoots]);
  useEffect(() => localStorage.setItem(`${STORAGE_KEY}_projects`, JSON.stringify(projects)), [projects]);

  const addProject = (project: FashionItem) => setProjects(prev => [project, ...prev]);
  const addBrand = (brand: Brand) => setBrands(prev => [brand, ...prev]);
  const addProduct = (brandId: string, product: Product) => setProducts(prev => ({ ...prev, [brandId]: [product, ...(prev[brandId] || [])] }));
  const addShoot = (shoot: Shoot) => setShoots(prev => [shoot, ...prev]);
  
  const updateProject = (id: string, updates: Partial<FashionItem>) => setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  const updateBrand = (id: string, updates: Partial<Brand>) => setBrands(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  const updateProduct = (brandId: string, productId: string, updates: Partial<Product>) => setProducts(prev => ({ ...prev, [brandId]: (prev[brandId] || []).map(p => p.id === productId ? { ...p, ...updates } : p) }));
  const updateShoot = (id: string, updates: Partial<Shoot>) => setShoots(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  
  const getShootById = (id: string) => shoots.find(s => s.id === id);

  return (
    <ProjectContext.Provider value={{ projects, brands, products, shoots, addProject, addBrand, addProduct, addShoot, updateProject, updateBrand, updateProduct, updateShoot, getShootById }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error('useProjects must be used within a ProjectProvider');
  return context;
};