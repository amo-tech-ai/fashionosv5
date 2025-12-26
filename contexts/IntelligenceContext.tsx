import React, { createContext, useContext, useState, ReactNode } from 'react';

export type IntelligenceMode = 'default' | 'booking' | 'inventory_audit' | 'production_oversight';

interface ProductionPayload {
  title: string;
  image: string;
  impact: string;
  suggestedStudio?: string;
  productData?: any;
  shootData?: any;
}

interface IntelligenceContextType {
  isOpen: boolean;
  mode: IntelligenceMode;
  payload: ProductionPayload | null;
  openPanel: (mode?: IntelligenceMode, payload?: ProductionPayload) => void;
  closePanel: () => void;
  setMode: (mode: IntelligenceMode) => void;
}

const IntelligenceContext = createContext<IntelligenceContextType | undefined>(undefined);

export const IntelligenceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 1200);
  const [mode, setMode] = useState<IntelligenceMode>('default');
  const [payload, setPayload] = useState<ProductionPayload | null>(null);

  const openPanel = (newMode: IntelligenceMode = 'default', newPayload: ProductionPayload | null = null) => {
    setMode(newMode);
    setPayload(newPayload);
    setIsOpen(true);
  };

  const closePanel = () => {
    setIsOpen(false);
    setTimeout(() => {
      setMode('default');
      setPayload(null);
    }, 300);
  };

  return (
    <IntelligenceContext.Provider value={{ isOpen, mode, payload, openPanel, closePanel, setMode }}>
      {children}
    </IntelligenceContext.Provider>
  );
};

export const useIntelligence = () => {
  const context = useContext(IntelligenceContext);
  if (!context) throw new Error('useIntelligence must be used within an IntelligenceProvider');
  return context;
};