import React from 'react';
import { Sparkles, Loader2, Camera, Box, Activity, ChevronDown } from 'lucide-react';
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
        return { icon: <Sparkles size={18} className="text-charcoal" />, title: 'Intelligence' };
    }
  };

  const header = getHeaderInfo();

  return (
    <aside className="w-full h-full bg-white lg:border-l border-[#E5E1D8] flex flex-col z-30 overflow-hidden shadow-2xl relative">
      {/* Mobile Drag Indicator */}
      <div className="flex justify-center p-2 lg:hidden">
        <div className="w-12 h-1 bg-[#E5E1D8] rounded-full" />
      </div>

      <div className="h-20 flex items-center px-6 justify-between bg-white border-b border-[#E5E1D8] flex-shrink-0 relative">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="transition-transform group-hover:rotate-12 duration-500">
            {header.icon}
          </div>
          <h2 className="font-serif text-lg font-medium tracking-tight">
            {header.title}
          </h2>
        </div>
        <button 
          onClick={closePanel} 
          className="flex items-center gap-1 text-[10px] text-warmgray hover:text-charcoal font-bold uppercase tracking-[0.2em] transition-colors"
        >
          {mode === 'default' ? 'Hide' : 'Close'}
          <ChevronDown size={14} className="lg:hidden" />
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>

      <div className="p-4 border-t border-[#E5E1D8] bg-ivory/50 flex-shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-2">
           <Activity size={10} className="text-sage animate-pulse-slow" />
           <p className="text-[9px] font-bold text-warmgray uppercase tracking-[0.3em]">
             Neural Sync Active
           </p>
        </div>
        <div className="flex -space-x-1.5">
           {[1, 2, 3].map(i => (
             <div key={i} className="h-4 w-4 rounded-full border border-white bg-ivory shadow-sm" />
           ))}
        </div>
      </div>
    </aside>
  );
};

export default IntelligencePanel;