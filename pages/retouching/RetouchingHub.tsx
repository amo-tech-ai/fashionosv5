import React from 'react';
import { Scissors, ShieldCheck, Zap, ArrowRight, Grid, Filter, Search } from 'lucide-react';
import SEO from '../../components/SEO';

const RetouchingHub: React.FC = () => {
  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-16 animate-in fade-in duration-700">
      <SEO title="Retouching Hub" description="Post-production queue and DNA verification." />
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
          <div className="flex items-center gap-3 text-sage mb-4">
             <Scissors size={24} />
             <span className="text-[10px] font-bold uppercase tracking-widest">Guardian Post-Audit</span>
          </div>
          <h2 className="font-serif text-6xl tracking-tighter">Retouching Hub.</h2>
        </div>
        <div className="flex gap-4">
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-warmgray" size={16} />
              <input className="w-full bg-white border border-[#E5E1D8] rounded-full pl-12 pr-6 py-4 text-sm outline-none focus:border-charcoal transition-all shadow-sm" placeholder="Search batch..." />
           </div>
           <button className="p-4 bg-white border border-[#E5E1D8] rounded-full hover:bg-ivory shadow-sm transition-all"><Filter size={20}/></button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
         {[
           { title: 'SS25 Milan Edit', count: 124, drift: '2.1%' },
           { title: 'Hero Silk v2', count: 12, drift: '0.4%' },
           { title: 'Desert Noir Raw', count: 48, drift: 'Lagging' }
         ].map((batch, i) => (
           <div key={i} className="bg-white border border-[#E5E1D8] rounded-[48px] p-10 space-y-8 hover:shadow-2xl transition-all duration-500">
              <div className="flex justify-between items-start">
                 <div className="h-14 w-14 bg-ivory rounded-2xl flex items-center justify-center text-charcoal shadow-inner">
                    <Grid size={24} />
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] font-bold uppercase text-warmgray tracking-widest">Aesthetic Drift</p>
                    <p className={`text-xs font-bold ${batch.drift === 'Lagging' ? 'text-rose-500' : 'text-sage'}`}>{batch.drift}</p>
                 </div>
              </div>
              <h3 className="font-serif text-3xl leading-tight">{batch.title}</h3>
              <p className="text-warmgray text-sm">{batch.count} Assets awaiting final DNA handshake.</p>
              <button className="w-full py-4 bg-charcoal text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2">
                 Begin Audit <ArrowRight size={16} />
              </button>
           </div>
         ))}
      </div>
    </div>
  );
};

export default RetouchingHub;