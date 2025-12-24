
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FashionItem, Brand } from '../types';

interface ProjectContextType {
  projects: FashionItem[];
  brands: Brand[];
  addProject: (project: FashionItem) => void;
  addBrand: (brand: Brand) => void;
  updateProject: (id: string, updates: Partial<FashionItem>) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [brands, setBrands] = useState<Brand[]>([
    {
      id: 'brand-1',
      name: 'L’Artisan Paris',
      description: 'Luxury artisanal womenswear focusing on sustainable silk.',
      type: 'Luxury',
      website: 'lartisan.paris',
      scores: { overall: 88, website: 92, social: 74 },
      dna: ['Sustainability', 'Precision', 'Heritage'],
      persona: 'The Conscious Epicurean'
    }
  ]);

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

  const updateProject = (id: string, updates: Partial<FashionItem>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  return (
    <ProjectContext.Provider value={{ projects, brands, addProject, addBrand, updateProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error('useProjects must be used within a ProjectProvider');
  return context;
};
