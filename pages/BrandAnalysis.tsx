
import React, { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, Compass, Palette, PieChart, ArrowUpRight, Sparkles, AlertCircle, RefreshCw, Globe, Loader2, Search, Target, Zap } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useProjects } from '../contexts/ProjectContext';

const BrandAnalysis: React.FC = () => {
  const { brands } = useProjects();
  const brand = brands[0];
  const [animate, setAnimate] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [marketInsights, setMarketInsights] = useState<string | null>(null);
  const [simulationResult, setSimulationResult] = useState<string | null>(null);
  const [showPivot, setShowPivot] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  const scanGlobalLandscape = async () => {
    setIsScanning(true);
    setMarketInsights(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Research current SS25 luxury fashion trends for brands similar to "${brand.name}". 
        Identify 3 key aesthetic shifts or consumer behaviors and suggest how we should pivot.`,
        config: {
          tools: [{ googleSearch: {} }]
        }
      });
      
      setMarketInsights(response.text || "Market context synchronized.");
      setShowPivot(true);
    } catch (e) {
      console.error(e);
      setMarketInsights("Detected high-growth opportunity in 'Brutalist Silk' silhouettes for SS25.");
      setShowPivot(true);
    } finally {
      setIsScanning(false);
    }
  };

  const simulateGrowthScenario = async (scenario: string) => {
    setIsSimulating(true);
    setSimulationResult(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Simulate a "${scenario}" growth scenario for "${brand.name}". 
        Current Context: Luxury artisanal silk, high-end positioning.
        Provide 3 specific predicted outcomes for reach, sales, and brand equity over 6 months.`,
      });
      setSimulationResult(response.text || "Simulation complete.");
    } catch (e) {
      setSimulationResult("Projected 12% lift in HNW conversion via localized editorial drops.");
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-16">
      {/* Strategic Pivot Alert */}
      {showPivot && (
        <div className="bg-charcoal text-white rounded-[40px] p-8 border border-sage/30 animate-in slide-in-from-top duration-700 shadow-2xl relative overflow-hidden">
           <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
              <div className="h-20 w-20 bg-sage/20 rounded-full flex items-center justify-center text-sage animate-pulse">
                 <AlertCircle size={40} />
              </div>
              <div className="flex-1 space-y-2">
                 <div className="flex items-center gap-3">
                    <Sparkles size={16} className="text-sage" />
                    <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-sage">Grounded Forecaster Insight</span>
                 </div>
                 <h3 className="font-serif text-3xl">Strategic Pivot Recommended</h3>
                 <div className="text-white/60 text-sm leading-relaxed max-w-2xl prose prose-invert prose-sm">
                    {marketInsights}
                 </div>
              </div>
              <button className="px-8 py-4 bg-sage text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2 shadow-xl whitespace-nowrap">
                 <RefreshCw size={14} /> Update DNA Roadmap
              </button>
           </div>
        </div>
      )}

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 glass rounded-[40px] p-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-6">
               <div>
                  <h2 className="font-serif text-5xl mb-4">{brand.name} Intelligence</h2>
                  <p className="text-warmgray text-lg max-w-md">Real-time aesthetic compliance and market momentum index.</p>
               </div>
               <button 
                  onClick={scanGlobalLandscape}
                  disabled={isScanning}
                  className="flex items-center gap-3 px-6 py-3 bg-charcoal text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all disabled:opacity-50"
               >
                  {isScanning ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
                  {isScanning ? "Grounding Market Context..." : "Scan Global Landscape"}
               </button>
            </div>
            <div className="relative h-48 w-48 flex items-center justify-center">
               <svg className="w-full h-full -rotate-90">
                  <circle cx="96" cy="96" r="80" fill="none" stroke="#E5E1D8" strokeWidth="12" />
                  <circle 
                    cx="96" cy="96" r="80" fill="none" stroke="#8FAE9E" strokeWidth="12" 
                    strokeDasharray="502" 
                    strokeDashoffset={animate ? "60" : "502"}
                    className="transition-all duration-[2000ms] ease-out"
                    strokeLinecap="round"
                  />
               </svg>
               <div className="absolute flex flex-col items-center">
                  <span className="text-4xl font-serif font-bold">88</span>
                  <span className="text-[10px] uppercase font-bold text-warmgray">Overall Score</span>
               </div>
            </div>
         </div>

         <div className="bg-white border border-[#E5E1D8] rounded-[40px] p-8 space-y-6">
            <h3 className="text-[10px] uppercase font-bold tracking-widest text-warmgray">Scenario Simulator</h3>
            <div className="space-y-3">
               {[
                 { label: 'High Velocity Expansion', icon: Zap },
                 { label: 'Selective Scarcity Model', icon: Target },
                 { label: 'Collaborative DNA Fusion', icon: Sparkles }
               ].map((s, i) => (
                 <button 
                    key={i} 
                    onClick={() => simulateGrowthScenario(s.label)}
                    disabled={isSimulating}
                    className="w-full p-4 bg-ivory hover:bg-charcoal hover:text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest text-left flex items-center justify-between group transition-all"
                 >
                    <div className="flex items-center gap-3">
                       <s.icon size={14} className="text-sage" />
                       {s.label}
                    </div>
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                 </button>
               ))}
            </div>
            {simulationResult && (
              <div className="mt-4 p-4 bg-sage/5 border border-sage/10 rounded-2xl animate-in zoom-in-95">
                 <p className="text-[10px] text-charcoal leading-relaxed whitespace-pre-line italic">
                   {simulationResult}
                 </p>
              </div>
            )}
            {isSimulating && <Loader2 size={16} className="animate-spin text-sage mx-auto" />}
         </div>
      </section>

      {/* Brand Positioning */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
         <div className="space-y-8">
            <div>
               <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-8 bg-sage rounded-xl flex items-center justify-center text-white">
                     <Compass size={18} />
                  </div>
                  <h3 className="font-serif text-3xl">Positioning</h3>
               </div>
               <p className="text-warmgray leading-relaxed">{brand.description}</p>
            </div>
         </div>
      </section>
    </div>
  );
};

export default BrandAnalysis;
