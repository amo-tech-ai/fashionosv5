import React from 'react';
import { ShieldCheck, Activity, Zap, Cpu, Camera, Users, Loader2 } from 'lucide-react';

interface ProductionOversightModeProps {
  payload: any;
}

const ProductionOversightMode: React.FC<ProductionOversightModeProps> = ({ payload }) => {
  const shoot = payload?.shootData;

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500 overflow-y-auto custom-scrollbar p-6 space-y-8">
      <header className="space-y-1">
        <div className="flex items-center gap-2 text-sage mb-2">
           <div className="h-2 w-2 rounded-full bg-sage animate-ping" />
           <span className="text-[10px] font-bold uppercase tracking-widest">Live Node Monitoring</span>
        </div>
        <h3 className="font-serif text-2xl">{shoot?.title || 'Active Production'}</h3>
        <p className="text-[10px] uppercase font-bold text-warmgray tracking-widest">{shoot?.location || 'Remote Set'}</p>
      </header>

      <section className="space-y-6">
         <div className="p-5 bg-white border border-[#E5E1D8] rounded-[32px] space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-charcoal">
               <Cpu size={14} className="text-sage" />
               <span className="text-[9px] font-bold uppercase tracking-widest">Neural Link Status</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1">
                  <p className="text-[8px] text-warmgray uppercase font-bold">Latency</p>
                  <p className="text-sm font-bold text-sage">14ms</p>
               </div>
               <div className="space-y-1 text-right">
                  <p className="text-[8px] text-warmgray uppercase font-bold">Sync</p>
                  <p className="text-sm font-bold text-sage">Optimal</p>
               </div>
            </div>
            <div className="pt-2 border-t border-ivory">
               <p className="text-[9px] text-warmgray italic">"Guardian Agent is currently prioritizing silhouette precision for IG portrait targets."</p>
            </div>
         </div>

         <div className="space-y-4">
            <div className="flex items-center gap-2 text-charcoal">
               <Users size={14} />
               <span className="text-[9px] font-bold uppercase tracking-widest">Crew Heartbeats</span>
            </div>
            <div className="space-y-2">
               {[
                 { name: 'Elena M.', role: 'Photo', status: 'Capturing' },
                 { name: 'Sasha V.', role: 'Stylist', status: 'Ready' },
                 { name: 'Marcus L.', role: 'Ops', status: 'Offline' }
               ].map(m => (
                 <div key={m.name} className="flex justify-between items-center p-3 bg-ivory rounded-2xl border border-transparent hover:border-[#E5E1D8] transition-all">
                    <div className="flex items-center gap-2">
                       <div className={`h-1.5 w-1.5 rounded-full ${m.status === 'Capturing' ? 'bg-sage animate-pulse' : m.status === 'Ready' ? 'bg-sage' : 'bg-warmgray/40'}`} />
                       <span className="text-[10px] font-bold text-charcoal">{m.name}</span>
                    </div>
                    <span className="text-[8px] font-bold uppercase text-warmgray">{m.status}</span>
                 </div>
               ))}
            </div>
         </div>
      </section>

      <footer className="pt-4 space-y-3">
         <div className="p-4 bg-charcoal text-white rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-sage">
               <Zap size={14} className="fill-sage" />
               <span className="text-[9px] font-bold uppercase tracking-widest">Global Sync Command</span>
            </div>
            <p className="text-[10px] text-white/60 leading-relaxed">Push current DNA snapshot to all active crew tablets.</p>
            <button className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all">
               Broadcast Handshake
            </button>
         </div>
      </footer>
    </div>
  );
};

export default ProductionOversightMode;