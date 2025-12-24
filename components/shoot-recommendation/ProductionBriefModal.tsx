
import React from 'react';
import { X, ClipboardList, Sparkles, Palette, Type, Send, Users, Camera, Layout, CheckCircle2 } from 'lucide-react';
import { Brand } from '../../types';

interface ProductionBriefModalProps {
  brand: Brand;
  recommendation: {
    title: string;
    desc: string;
    impact: string;
    image: string;
    channels: string[];
    studio: string;
  };
  onClose: () => void;
  onSend: () => void;
}

const ProductionBriefModal: React.FC<ProductionBriefModalProps> = ({ brand, recommendation, onClose, onSend }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-md" onClick={onClose} />
      <div className="bg-white w-full max-w-5xl h-[90vh] rounded-[48px] shadow-2xl relative z-10 overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-500">
        
        {/* Left Side: Visual Context */}
        <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden group">
           <img src={recommendation.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" />
           <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
           <div className="absolute bottom-10 left-10 right-10">
              <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[9px] font-bold uppercase tracking-widest text-charcoal mb-4 inline-block">
                 Impact: {recommendation.impact}
              </span>
              <h3 className="font-serif text-4xl text-white mb-2">{recommendation.title}</h3>
              <p className="text-white/70 text-sm italic">"{recommendation.desc}"</p>
           </div>
        </div>

        {/* Right Side: Briefing Form */}
        <div className="flex-1 flex flex-col h-full bg-white">
           <header className="p-8 border-b border-[#E5E1D8] flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="h-10 w-10 bg-ivory rounded-xl flex items-center justify-center">
                    <ClipboardList size={20} className="text-charcoal" />
                 </div>
                 <h2 className="font-serif text-2xl">Production Brief</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-ivory rounded-full transition-colors">
                 <X size={20} />
              </button>
           </header>

           <div className="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar">
              {/* Strategic Logic Section */}
              <section className="space-y-4">
                 <div className="flex items-center gap-2 text-sage">
                    <Sparkles size={16} />
                    <span className="text-[10px] uppercase font-bold tracking-widest">Neural Strategic Logic</span>
                 </div>
                 <div className="p-6 bg-sage/5 border border-sage/20 rounded-3xl">
                    <p className="text-sm text-charcoal leading-relaxed italic">
                       "This production leverages the 'Architectural Minimalist' trend index, which is currently seeing a 14% uplift in high-net-worth engagement. By aligning with the {brand.name} Heritage pillars of {brand.dna[0]} and {brand.dna[1]}, we minimize aesthetic drift while maximizing SS25 conversion potential."
                    </p>
                 </div>
              </section>

              {/* Style Guide References */}
              <section className="space-y-6">
                 <div className="flex items-center gap-2 text-charcoal">
                    <Palette size={16} />
                    <span className="text-[10px] uppercase font-bold tracking-widest">Digital DNA References</span>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Colors */}
                    <div className="p-6 bg-ivory rounded-3xl border border-[#E5E1D8] space-y-4">
                       <p className="text-[9px] uppercase font-bold text-warmgray tracking-widest">Target Palette</p>
                       <div className="flex gap-3">
                          {['#D9D1C5', '#8FAE9E', '#1E1E1E'].map(hex => (
                            <div key={hex} className="group relative">
                               <div className="h-10 w-10 rounded-lg border border-white shadow-sm" style={{ backgroundColor: hex }} />
                               <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[8px] font-mono text-warmgray opacity-0 group-hover:opacity-100 transition-opacity">{hex}</span>
                            </div>
                          ))}
                       </div>
                       <p className="text-[9px] text-warmgray leading-tight">60/30/10 Ratio enforcement active.</p>
                    </div>

                    {/* Typography */}
                    <div className="p-6 bg-ivory rounded-3xl border border-[#E5E1D8] space-y-4">
                       <p className="text-[9px] uppercase font-bold text-warmgray tracking-widest">Verbal Tone</p>
                       <div className="space-y-1">
                          <p className="font-serif text-lg leading-none">Playfair Display</p>
                          <p className="text-[10px] text-warmgray">Editorial headlines / Precise tone</p>
                       </div>
                    </div>
                 </div>
              </section>

              {/* Team Assignment */}
              <section className="space-y-4">
                 <div className="flex items-center gap-2 text-charcoal">
                    <Users size={16} />
                    <span className="text-[10px] uppercase font-bold tracking-widest">Dispatch to Nodes</span>
                 </div>
                 <div className="flex flex-wrap gap-4">
                    {[
                       { name: 'Elena', role: 'Photographer', active: true },
                       { name: 'Marcus', role: 'Logistics', active: true },
                       { name: 'Sasha', role: 'Casting', active: false }
                    ].map(member => (
                       <button key={member.name} className={`flex items-center gap-3 px-4 py-2 rounded-2xl border transition-all ${member.active ? 'bg-charcoal text-white border-charcoal shadow-lg' : 'bg-white text-warmgray border-[#E5E1D8] hover:border-charcoal'}`}>
                          <div className={`h-2 w-2 rounded-full ${member.active ? 'bg-sage animate-pulse' : 'bg-warmgray'}`} />
                          <div className="text-left">
                             <p className="text-[10px] font-bold uppercase tracking-tight">{member.name}</p>
                             <p className="text-[8px] opacity-60">{member.role}</p>
                          </div>
                       </button>
                    ))}
                 </div>
              </section>
           </div>

           <footer className="p-8 border-t border-[#E5E1D8] flex gap-4 bg-ivory/20">
              <button onClick={onClose} className="flex-1 py-4 border border-[#E5E1D8] bg-white rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-ivory transition-all">
                 Save Draft
              </button>
              <button onClick={onSend} className="flex-[2] py-4 bg-sage text-white rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3 group">
                 <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                 Dispatch Production Brief
              </button>
           </footer>
        </div>
      </div>
    </div>
  );
};

export default ProductionBriefModal;
