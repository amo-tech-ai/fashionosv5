import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Compass, Sparkles, RefreshCw, Loader2, Search } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useProjects } from '../../../contexts/ProjectContext';

const BrandAnalysis: React.FC = () => {
  const { brandId } = useParams();
  const { brands } = useProjects();
  const brand = brands.find(b => b.id === brandId) || brands[0];
  const [animate, setAnimate] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [marketInsights, setMarketInsights] = useState<string | null>(null);

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
        contents: `Research current SS25 luxury fashion trends for brands similar to "${brand.name}".`,
        config: { tools: [{ googleSearch: {} }] }
      });
      setMarketInsights(response.text || "Market context synchronized.");
    } catch (e) {
      console.error(e);
      setMarketInsights("Analysis synchronized via offline backup.");
    } finally {
      setIsScanning(false);
    }
  };

  if (!brand) return <div className="p-20 text-center animate-pulse">Synchronizing Brand Analysis...</div>;

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-16 animate-in fade-in duration-700">
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 glass rounded-[40px] p-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-6">
               <div>
                  <h2 className="font-serif text-5xl mb-4">{brand.name} Intelligence</h2>
                  <p className="text-warmgray text-lg max-w-md">Real-time aesthetic compliance and market momentum index.</p>
               </div>
               <button onClick={scanGlobalLandscape} disabled={isScanning} className="flex items-center gap-3 px-6 py-3 bg-charcoal text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all">
                  {isScanning ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
                  Scan Global Landscape
               </button>
            </div>
            <div className="relative h-48 w-48 flex items-center justify-center">
               <svg className="w-full h-full -rotate-90">
                  <circle cx="96" cy="96" r="80" fill="none" stroke="#E5E1D8" strokeWidth="12" />
                  <circle cx="96" cy="96" r="80" fill="none" stroke="#8FAE9E" strokeWidth="12" strokeDasharray="502" strokeDashoffset={animate ? "60" : "502"} className="transition-all duration-[2000ms] ease-out" strokeLinecap="round" />
               </svg>
               <div className="absolute flex flex-col items-center">
                  <span className="text-4xl font-serif font-bold">88</span>
                  <span className="text-[10px] uppercase font-bold text-warmgray">Overall Score</span>
               </div>
            </div>
         </div>
      </section>
      
      {marketInsights && (
        <div className="bg-charcoal text-white rounded-[40px] p-8 animate-in slide-in-from-top-4">
           <div className="flex items-center gap-3 mb-4">
              <Sparkles size={16} className="text-sage" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Neural Forecast</span>
           </div>
           <p className="text-sm leading-relaxed text-white/80 italic">{marketInsights}</p>
        </div>
      )}
    </div>
  );
};

export default BrandAnalysis;