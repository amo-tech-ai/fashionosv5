
import React from 'react';
import { Sparkles, Loader2, Camera, Box, Activity } from 'lucide-react';
import { useProjects } from '../contexts/ProjectContext';
import { useIntelligence } from '../contexts/IntelligenceContext';

// Modular Components
import DefaultMode from './intelligence/DefaultMode';
import BookingMode from './intelligence/BookingMode';
import InventoryAuditMode from './intelligence/InventoryAuditMode';

const IntelligencePanel: React.FC = () => {
  const { brands } = useProjects();
  const brand = brands[0];
  const { isOpen, closePanel, mode, payload, setMode } = useIntelligence();

  if (!isOpen) return null;

  const renderContent = () => {
    switch (mode) {
      case 'inventory_audit':
        return <InventoryAuditMode payload={payload} setMode={setMode} />;
      case 'booking':
        return <BookingMode payload={payload} onClose={closePanel} />;
      default:
        return <DefaultMode brand={brand} />;
    }
  };

  const getHeaderInfo = () => {
    switch (mode) {
      case 'booking':
        return { icon: <Camera size={18} className="text-sage" />, title: 'Production Orchestrator' };
      case 'inventory_audit':
        return { icon: <Box size={18} className="text-sage" />, title: 'Inventory Auditor' };
      default:
        return { icon: <Sparkles size={18} className="text-[#1A1A1A]" />, title: 'Intelligence' };
    }
  };

  const header = getHeaderInfo();

  return (
    <aside className="w-80 h-full bg-white border-l border-[#E5E1D8] flex flex-col z-30 overflow-hidden transition-all duration-500 ease-in-out shadow-2xl animate-in slide-in-from-right duration-500">
      <div className="h-20 flex items-center px-6 justify-between bg-white border-b border-[#E5E1D8] flex-shrink-0 relative">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="transition-transform group-hover:rotate-12 duration-500">
            {header.icon}
          </div>
          <h2 className="font-serif text-lg font-medium tracking-tight">
            {header.title}
          </h2>
        </div>
        <button 
          onClick={closePanel} 
          className="text-[10px] text-[#8C8C8C] hover:text-[#1A1A1A] font-bold uppercase tracking-[0.2em] transition-colors"
        >
          {mode === 'default' ? 'Hide' : 'Close'}
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>

      <div className="p-4 border-t border-[#E5E1D8] bg-[#F9F7F2] flex-shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-2">
           <Activity size={10} className="text-sage animate-pulse" />
           <p className="text-[9px] font-bold text-[#8C8C8C] uppercase tracking-widest">
             Neural Sync Active
           </p>
        </div>
        <div className="flex -space-x-1.5">
           {[1, 2, 3].map(i => (
             <div key={i} className="h-4 w-4 rounded-full border border-white bg-ivory" />
           ))}
        </div>
      </div>
    </aside>
  );
};

export default IntelligencePanel;
