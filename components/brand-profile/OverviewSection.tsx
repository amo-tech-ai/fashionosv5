
import React, { useState } from 'react';
import { Map as MapIcon, ArrowUpRight, Sparkles, Loader2, Wand2, UserPlus, X, Plus, Edit3 } from 'lucide-react';
import { Brand, Persona } from '../../types';
import { GoogleGenAI } from "@google/genai";
import { useProjects } from '../../contexts/ProjectContext';

interface OverviewSectionProps {
  brand: Brand;
}

const OverviewSection: React.FC<OverviewSectionProps> = ({ brand }) => {
  const { updateBrand } = useProjects();
  const [personas, setPersonas] = useState<Persona[]>(brand.personas);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuggestingPillars, setIsSuggestingPillars] = useState(false);
  const [newPillar, setNewPillar] = useState('');
  const [editingPillarIndex, setEditingPillarIndex] = useState<number | null>(null);

  const addPillar = (pillar: string) => {
    if (!pillar.trim()) return;
    const current = brand.dna || [];
    if (!current.includes(pillar)) {
      updateBrand(brand.id, { dna: [...current, pillar] });
    }
    setNewPillar('');
  };

  const removePillar = (pillar: string) => {
    updateBrand(brand.id, { dna: (brand.dna || []).filter(p => p !== pillar) });
  };

  const updatePillarValue = (index: number, value: string) => {
    const updated = [...(brand.dna || [])];
    updated[index] = value;
    updateBrand(brand.id, { dna: updated });
  };

  const suggestPillars = async () => {
    setIsSuggestingPillars(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const prompt = `Based on the brand description: "${brand.description}", suggest 4 essential DNA Pillars (2-3 words each) that define its luxury position. 
      Return ONLY a JSON array of strings.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      const suggested = JSON.parse(response.text || '[]');
      if (Array.isArray(suggested)) {
        updateBrand(brand.id, { dna: [...new Set([...(brand.dna || []), ...suggested])] });
      }
    } catch (e) {
      console.error("Pillar suggestion failed", e);
    } finally {
      setIsSuggestingPillars(false);
    }
  };

  const generateNewPersona = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const prompt = `Based on the brand DNA: ${brand.dna.join(', ')} and description: ${brand.description}, 
      architect a new luxury audience persona. Return ONLY a JSON object with keys: 
      name, demographics, psychographics, lifestyle (array of 3 strings), channels (array of 3 strings).`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { 
          responseMimeType: "application/json",
          thinkingConfig: { thinkingBudget: 1024 }
        }
      });

      const data = JSON.parse(response.text || '{}');
      const newPersona: Persona = {
        ...data,
        illustration: personas[0].illustration // Reuse for demo
      };

      setPersonas(prev => [newPersona, ...prev]);
    } catch (e) {
      console.error("Persona generation failed", e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 relative aspect-[21/9] rounded-[48px] overflow-hidden group shadow-sm">
          <img 
            src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=1200&q=80" 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" 
            alt="Brand Hero" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
          <div className="absolute bottom-10 left-10">
            <p className="text-white/60 text-[10px] uppercase font-bold tracking-[0.4em] mb-3">Heritage Manifesto</p>
            <h3 className="text-white font-serif text-4xl">Crafted in the heart of Paris.</h3>
          </div>
        </div>

        {/* DNA Pillars - Interactive Card */}
        <div className="bg-white border border-[#E5E1D8] rounded-[48px] p-10 space-y-8 shadow-sm flex flex-col justify-between">
           <div className="space-y-6">
              <div className="flex items-center justify-between">
                 <h4 className="text-[10px] uppercase font-bold tracking-[0.3em] text-warmgray">DNA Pillars</h4>
                 <button 
                   onClick={suggestPillars}
                   disabled={isSuggestingPillars}
                   className="flex items-center gap-2 text-[10px] font-bold uppercase text-sage hover:text-charcoal transition-colors disabled:opacity-50"
                 >
                   {isSuggestingPillars ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                   Suggest AI Pillars
                 </button>
              </div>
              
              <div className="flex flex-wrap gap-3">
                 {brand.dna.map((pillar, idx) => (
                   <div key={idx} className="px-5 py-3 bg-ivory border border-[#E5E1D8] rounded-2xl flex items-center gap-3 group hover:border-charcoal transition-all relative">
                      {editingPillarIndex === idx ? (
                        <input 
                          autoFocus
                          value={pillar}
                          onChange={(e) => updatePillarValue(idx, e.target.value)}
                          onBlur={() => setEditingPillarIndex(null)}
                          onKeyDown={(e) => e.key === 'Enter' && setEditingPillarIndex(null)}
                          className="bg-transparent text-xs font-bold outline-none w-24"
                        />
                      ) : (
                        <span onClick={() => setEditingPillarIndex(idx)} className="text-[12px] font-bold text-charcoal cursor-pointer">{pillar}</span>
                      )}
                      <button onClick={() => removePillar(pillar)} className="opacity-0 group-hover:opacity-100 text-warmgray hover:text-rose-500 transition-all">
                         <X size={14} />
                      </button>
                   </div>
                 ))}
              </div>
           </div>

           <div className="pt-6 border-t border-ivory">
              <div className="flex items-center gap-3">
                 <input 
                   type="text"
                   value={newPillar}
                   onChange={(e) => setNewPillar(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && addPillar(newPillar)}
                   placeholder="Add core pillar..."
                   className="flex-1 bg-ivory border border-[#E5E1D8] rounded-2xl px-6 py-3 text-xs outline-none focus:border-charcoal transition-all"
                 />
                 <button onClick={() => addPillar(newPillar)} className="p-3 bg-charcoal text-white rounded-2xl hover:bg-black transition-all shadow-md">
                    <Plus size={20} />
                 </button>
              </div>
           </div>
        </div>
      </section>

      {/* Market Positioning Map */}
      <section className="bg-white border border-[#E5E1D8] rounded-[48px] p-12 space-y-10 relative overflow-hidden">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-ivory rounded-2xl flex items-center justify-center">
                 <MapIcon size={24} className="text-charcoal" />
              </div>
              <div>
                 <h4 className="font-serif text-3xl">Strategic Positioning</h4>
                 <p className="text-[10px] uppercase font-bold text-warmgray tracking-widest mt-1">Grounded vs Competitor Ecosystem</p>
              </div>
           </div>
           <div className="px-5 py-2 bg-sage/10 text-sage text-[10px] font-bold uppercase tracking-widest rounded-full flex items-center gap-2 border border-sage/20 shadow-sm">
              <Sparkles size={12} />
              Model: High-Premium Hybrid
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
           <div className="lg:col-span-2 relative aspect-video bg-[#F9F7F2] rounded-[40px] border border-[#E5E1D8] flex items-center justify-center shadow-inner group">
              <div className="absolute left-10 right-10 h-px bg-warmgray/20" />
              <div className="absolute left-10 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-[0.2em] text-warmgray">Street</div>
              <div className="absolute right-10 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-[0.2em] text-warmgray">Luxury</div>
              <div className="absolute top-10 bottom-10 w-px bg-warmgray/20" />
              <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.2em] text-warmgray">Avant-Garde</div>
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.2em] text-warmgray">Minimal</div>
              
              <div 
                className="absolute h-10 w-10 bg-charcoal rounded-full border-4 border-white shadow-2xl flex items-center justify-center z-10 animate-pulse cursor-pointer group/node hover:scale-125 transition-transform"
                style={{ 
                   left: `calc(50% + ${brand.marketPosition.x / 2}%)`, 
                   top: `calc(50% - ${brand.marketPosition.y / 2}%)` 
                }}
              >
                 <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-charcoal text-white text-[10px] font-bold px-4 py-2 rounded-xl opacity-0 group-hover/node:opacity-100 transition-all whitespace-nowrap shadow-xl">
                    {brand.name} (Active Node)
                 </span>
                 <div className="h-2.5 w-2.5 bg-sage rounded-full" />
              </div>
           </div>
           <div className="space-y-8">
              <h5 className="text-[12px] uppercase font-bold tracking-[0.2em] text-warmgray border-b border-ivory pb-4">Strategic Forecast</h5>
              <div className="space-y-6">
                 {[
                   { l: 'Pricing Logic', v: 'Maintain 14-18% above median to preserve heritage scarcity.' },
                   { l: 'Visual Tone', v: 'Increase low-contrast wide-angle assets for minimal enthusiasts.' },
                   { l: 'Distribution', v: 'Pivot budget to Tier-1 urban HNW clusters (Milan, Dubai).' }
                 ].map((item, i) => (
                   <div key={i} className="p-6 bg-white border border-[#E5E1D8] rounded-3xl space-y-2 group hover:border-sage transition-all hover:shadow-lg">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-charcoal group-hover:text-sage transition-colors">{item.l}</p>
                      <p className="text-[13px] text-warmgray leading-relaxed">{item.v}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* Target Personas */}
      <section className="space-y-10">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-serif text-4xl">Persona Architecture</h4>
            <p className="text-warmgray text-sm mt-1">Synthetic psychographics for SS25 engagement.</p>
          </div>
          <button 
            onClick={generateNewPersona}
            disabled={isGenerating}
            className="px-8 py-4 bg-charcoal text-white rounded-full text-[10px] uppercase font-bold tracking-widest flex items-center gap-3 hover:bg-black transition-all disabled:opacity-50 shadow-2xl group"
          >
            {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <UserPlus size={14} className="group-hover:scale-110 transition-transform" />}
            Architect New Persona
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           {personas.map((persona, i) => (
             <div key={i} className="bg-white border border-[#E5E1D8] rounded-[48px] overflow-hidden group hover:shadow-3xl transition-all duration-700 animate-in slide-in-from-left-4" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="aspect-[16/7] relative overflow-hidden">
                   <img src={persona.illustration} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" alt={persona.name} />
                   <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/40 to-transparent" />
                   <div className="absolute inset-y-0 left-0 p-12 flex flex-col justify-center max-w-[70%]">
                      <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-sage mb-3">Life-Archetype</span>
                      <h5 className="font-serif text-5xl text-white mb-3">{persona.name}</h5>
                      <p className="text-white/60 text-xs font-medium tracking-[0.1em]">{persona.demographics}</p>
                   </div>
                </div>
                <div className="p-12 space-y-10">
                   <div className="grid grid-cols-2 gap-12">
                      <div className="space-y-4">
                         <span className="text-[11px] uppercase font-bold text-warmgray tracking-widest">Psychographics</span>
                         <p className="text-[13px] leading-relaxed text-charcoal font-medium line-clamp-4 italic">"{persona.psychographics}"</p>
                      </div>
                      <div className="space-y-4">
                         <span className="text-[11px] uppercase font-bold text-warmgray tracking-widest">Lifestyle Anchors</span>
                         <div className="flex flex-wrap gap-2.5">
                            {persona.lifestyle.map(l => (
                              <span key={l} className="px-3 py-1.5 bg-ivory border border-[#E5E1D8] rounded-xl text-[10px] font-bold text-warmgray uppercase tracking-widest">{l}</span>
                            ))}
                         </div>
                      </div>
                   </div>
                   <div className="pt-10 border-t border-ivory flex items-center justify-between">
                      <div className="flex gap-6">
                         {persona.channels.map(c => (
                           <span key={c} className="text-[10px] font-bold uppercase tracking-[0.2em] text-sage">{c}</span>
                         ))}
                      </div>
                      <button className="flex items-center gap-3 text-[11px] uppercase font-bold text-charcoal hover:text-sage transition-all group-hover:translate-x-1">
                         View Creative Brief <ArrowUpRight size={18} className="text-warmgray" />
                      </button>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
};

export default OverviewSection;
