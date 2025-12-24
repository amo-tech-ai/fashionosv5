
import React from 'react';
import { ShieldCheck, TrendingUp, Camera, Box } from 'lucide-react';
import { IntelligenceMode } from '../../contexts/IntelligenceContext';

interface InventoryAuditModeProps {
  payload: any;
  setMode: (mode: IntelligenceMode) => void;
}

const InventoryAuditMode: React.FC<InventoryAuditModeProps> = ({ payload, setMode }) => {
  const product = payload?.productData;

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500 overflow-y-auto custom-scrollbar p-6 space-y-8">
      <header className="space-y-4">
        <div className="aspect-square rounded-3xl overflow-hidden border border-[#E5E1D8] shadow-sm">
           <img src={product?.img} className="w-full h-full object-cover" alt="Audit Target" />
        </div>
        <div className="flex items-center justify-between">
           <h3 className="font-serif text-2xl">{product?.name}</h3>
           <span className="text-sm font-bold">{product?.price}</span>
        </div>
      </header>

      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sage">
           <ShieldCheck size={16} />
           <span className="text-[10px] uppercase font-bold tracking-widest">Guardian Aesthetic Audit</span>
        </div>
        <div className="p-5 bg-white border border-[#E5E1D8] rounded-[32px] space-y-4">
           <div className="flex justify-between items-end">
              <span className="text-[9px] uppercase font-bold text-warmgray tracking-widest">DNA Compliance</span>
              <span className="text-xl font-serif text-sage">{product?.match?.color || 0}%</span>
           </div>
           <div className="h-1 bg-ivory rounded-full overflow-hidden">
              <div className="h-full bg-sage" style={{ width: `${product?.match?.color || 0}%` }} />
           </div>
           <p className="text-[10px] text-warmgray italic leading-relaxed">
             "Product silhouettes align with SS25 'Heritage' pillars. Minimal palette drift detected. Ready for editorial placement."
           </p>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2 text-charcoal">
           <TrendingUp size={16} />
           <span className="text-[10px] uppercase font-bold tracking-widest">Market Potential</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
           <div className="p-4 bg-ivory rounded-2xl border border-[#E5E1D8]">
              <p className="text-[8px] uppercase font-bold text-warmgray tracking-widest mb-1">Positioning</p>
              <p className="text-xs font-bold">{product?.pricing?.positioning || 'Standard'}</p>
           </div>
           <div className="p-4 bg-ivory rounded-2xl border border-[#E5E1D8]">
              <p className="text-[8px] uppercase font-bold text-warmgray tracking-widest mb-1">Sell-Through</p>
              <p className="text-xs font-bold text-sage">High (+14%)</p>
           </div>
        </div>
      </section>

      <footer className="pt-4 space-y-3">
         <button 
           onClick={() => setMode('booking')}
           className="w-full py-4 bg-charcoal text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-lg flex items-center justify-center gap-2"
         >
            <Camera size={14} /> Schedule Production Shoot
         </button>
         <button 
           onClick={() => setMode('default')}
           className="w-full py-4 border border-[#E5E1D8] text-warmgray rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-ivory transition-all"
         >
            Back to Strategic Overview
         </button>
      </footer>
    </div>
  );
};

export default InventoryAuditMode;
