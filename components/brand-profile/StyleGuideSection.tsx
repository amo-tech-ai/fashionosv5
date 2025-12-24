
import React, { useState, useRef } from 'react';
import { Palette, Type, Wind, Check, X, Sparkles, BookOpen, Loader2, Camera, Wand2, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { Brand } from '../../types';
import { GoogleGenAI } from "@google/genai";

interface StyleGuideSectionProps {
  brand: Brand;
}

const StyleGuideSection: React.FC<StyleGuideSectionProps> = ({ brand }) => {
  const [isScanning, setIsScanning] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [visualStandards] = useState([
    { 
      id: 1, 
      img: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=400&q=80', 
      label: 'Editorial Softness', 
      annotation: 'Diffused natural lighting aligns with the "Silent Curator" psychographics, evoking high-trust craftsmanship.' 
    },
    { 
      id: 2, 
      img: 'https://images.unsplash.com/photo-1539109132314-34a9c6ee892b?auto=format&fit=crop&w=400&q=80', 
      label: 'Architectural Form', 
      annotation: 'Sharp geometric silhouettes communicate precision, a core pillar of the L’Artisan DNA.' 
    },
    { 
      id: 3, 
      img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80', 
      label: 'Textural Integrity', 
      annotation: 'Macro focus on sustainable silk weaves validates premium price justification via artisanal proof.' 
    },
    { 
      id: 4, 
      img: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=400&q=80', 
      label: 'Minimalist Space', 
      annotation: 'Negative space in composition appeals to HNW urban enthusiasts seeking mental clarity.' 
    }
  ]);

  const [palette, setPalette] = useState([
    { name: 'Silk Ivory', hex: '#D9D1C5', rule: 'Primary Base (60%)' },
    { name: 'Heritage Sage', hex: '#8FAE9E', rule: 'Accent Focus (30%)' },
    { name: 'Blush Clay', hex: '#E8D6D1', rule: 'Highlight Trim (10%)' },
    { name: 'Charcoal', hex: '#1E1E1E', rule: 'Typography & Line' }
  ]);

  const runVisualAudit = async () => {
    setIsScanning(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const prompt = `Analyze luxury brand style guide based on heritage DNA: ${brand.dna.join(', ')}. Provide 4 precise HEX codes, names, and a usage rule (e.g. 60% base) that reflect this DNA. Format: JSON array of {name, hex, rule}.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      const data = JSON.parse(response.text || '[]');
      if (data.length > 0) setPalette(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsScanning(false);
    }
  };

  const scroll = (dir: 'l' | 'r') => {
    if (scrollRef.current) {
      const offset = dir === 'l' ? -400 : 400;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Visual Standards Carousel */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-ivory rounded-xl flex items-center justify-center">
                 <Camera size={20} className="text-charcoal" />
              </div>
              <div>
                 <h4 className="font-serif text-3xl">Visual Standards</h4>
                 <p className="text-[10px] uppercase font-bold text-warmgray tracking-widest mt-1">AI-Annotated Reference Board</p>
              </div>
           </div>
           <div className="flex gap-2">
              <button onClick={() => scroll('l')} className="p-2 border border-[#E5E1D8] rounded-full hover:bg-ivory transition-all"><ChevronLeft size={16}/></button>
              <button onClick={() => scroll('r')} className="p-2 border border-[#E5E1D8] rounded-full hover:bg-ivory transition-all"><ChevronRight size={16}/></button>
           </div>
        </div>

        <div ref={scrollRef} className="flex gap-6 overflow-x-auto no-scrollbar pb-4 scroll-smooth">
           {visualStandards.map(item => (
             <div key={item.id} className="min-w-[340px] group relative bg-white border border-[#E5E1D8] rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all">
                <div className="aspect-[4/5] relative overflow-hidden">
                   <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                   <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-8 text-center backdrop-blur-[2px]">
                      <div className="bg-white/90 p-4 rounded-2xl shadow-xl animate-in zoom-in-95">
                         <div className="flex items-center gap-2 text-sage mb-2">
                            <Sparkles size={12} />
                            <span className="text-[9px] font-bold uppercase">Neural Analysis</span>
                         </div>
                         <p className="text-[11px] text-charcoal font-medium leading-relaxed italic">"{item.annotation}"</p>
                      </div>
                   </div>
                </div>
                <div className="p-6">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal">{item.label}</span>
                </div>
             </div>
           ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Visual Identity */}
        <div className="bg-white border border-[#E5E1D8] rounded-[48px] p-10 space-y-8 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="h-10 w-10 bg-ivory rounded-xl flex items-center justify-center">
                  <Palette size={20} className="text-charcoal" />
               </div>
               <h4 className="font-serif text-3xl">Atmospheric Palette</h4>
            </div>
            <button 
              onClick={runVisualAudit}
              disabled={isScanning}
              className="flex items-center gap-2 px-4 py-2 bg-charcoal text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all disabled:opacity-50"
            >
              {isScanning ? <Loader2 size={12} className="animate-spin" /> : <Wand2 size={12} />}
              {isScanning ? "Refining DNA..." : "Neural Scan"}
            </button>
          </div>

          {isScanning && (
            <div className="absolute inset-0 bg-sage/5 backdrop-blur-[1px] flex items-center justify-center z-20 pointer-events-none">
              <div className="w-full h-1 bg-sage animate-[scan_2s_ease-in-out_infinite] absolute top-0" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-4">
                <label className="text-[10px] uppercase font-bold tracking-widest text-warmgray">Usage Matrix (60/30/10)</label>
                <div className="space-y-3">
                   {palette.map(c => (
                     <div key={c.hex} className="flex items-center gap-4 group cursor-pointer animate-in fade-in duration-500">
                        <div className="h-12 w-12 rounded-2xl border border-[#E5E1D8] shadow-sm transition-transform group-hover:scale-110 flex-shrink-0" style={{ backgroundColor: c.hex }} />
                        <div>
                           <div className="flex items-center gap-2">
                              <p className="text-[11px] font-bold uppercase text-charcoal">{c.name}</p>
                              <p className="text-[9px] text-warmgray font-mono">{c.hex}</p>
                           </div>
                           <p className="text-[9px] font-bold text-sage uppercase mt-0.5">{c.rule}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
             <div className="space-y-4">
                <label className="text-[10px] uppercase font-bold tracking-widest text-warmgray">Typography Hierarchy</label>
                <div className="p-6 bg-ivory rounded-3xl space-y-6 border border-[#E5E1D8]">
                   <div className="space-y-2">
                      <p className="text-[9px] uppercase font-bold text-sage tracking-widest">Display Primary</p>
                      <p className="font-serif text-3xl leading-none">Playfair Display</p>
                      <p className="text-[10px] text-warmgray leading-relaxed">Used for editorial headlines to emphasize heritage luxury.</p>
                   </div>
                   <div className="space-y-2 border-t border-[#E5E1D8] pt-4">
                      <p className="text-[9px] uppercase font-bold text-sage tracking-widest">Body Secondary</p>
                      <p className="font-sans text-lg font-medium tracking-tight">Inter Sans-Serif</p>
                      <p className="text-[10px] text-warmgray leading-relaxed">Optimized for legibility in product technical specifications.</p>
                   </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-sage/5 border border-sage/20 rounded-xl text-sage">
                   <Info size={14} />
                   <span className="text-[9px] font-bold uppercase tracking-widest text-sage">Pairing logic: Architectural Stability</span>
                </div>
             </div>
          </div>
        </div>

        {/* Brand Voice & Narrative */}
        <div className="bg-charcoal text-white rounded-[48px] p-10 space-y-8 relative overflow-hidden flex flex-col justify-between">
           <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="h-10 w-10 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center border border-white/20">
                    <BookOpen size={20} className="text-sage" />
                 </div>
                 <h4 className="font-serif text-3xl">Editorial Voice</h4>
              </div>
              <p className="text-white/60 leading-relaxed italic text-lg">
                "Our narrative is one of quiet permanence. We don't scream for attention; we wait for the discerning eye to discover the artisanal truth within our seams."
              </p>
           </div>
           
           <div className="relative z-10 grid grid-cols-2 gap-6">
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                 <p className="text-[10px] uppercase font-bold text-sage mb-2">Key Tones</p>
                 <ul className="text-xs space-y-2 text-white/80">
                    <li>• Precise</li>
                    <li>• Sophisticated</li>
                    <li>• Transparent</li>
                 </ul>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                 <p className="text-[10px] uppercase font-bold text-sage mb-2">Lexicon</p>
                 <ul className="text-xs space-y-2 text-white/80">
                    <li>• Heritage</li>
                    <li>• Structural</li>
                    <li>• Artisanal</li>
                 </ul>
              </div>
           </div>
           <div className="absolute -right-20 -bottom-20 h-64 w-64 bg-sage/10 rounded-full blur-[80px]" />
        </div>
      </div>
      <style>{`
        @keyframes scan {
          0% { top: 0; }
          50% { top: 100%; }
          100% { top: 0; }
        }
      `}</style>
    </div>
  );
};

export default StyleGuideSection;
