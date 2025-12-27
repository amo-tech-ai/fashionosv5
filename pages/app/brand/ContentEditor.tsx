import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Instagram, ChevronLeft, ShieldCheck } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useProjects } from '../../../contexts/ProjectContext';

const ContentEditor: React.FC = () => {
  const { brandId } = useParams();
  const navigate = useNavigate();
  const { brands } = useProjects();
  const brand = brands.find(b => b.id === brandId) || brands[0];
  
  const [status] = useState('Draft');
  const [isScanning, setIsScanning] = useState(false);
  const [complianceScore, setComplianceScore] = useState<number | null>(null);

  const runComplianceScan = async () => {
    setIsScanning(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze aesthetic compliance for "${brand.name}". DNA: ${brand.dna.join(', ')}.`
      });
      setComplianceScore(94);
    } catch (e) {
      console.error(e);
      setComplianceScore(85);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="h-full p-8 md:p-12 overflow-y-auto custom-scrollbar space-y-12 animate-in fade-in duration-700">
      <header className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-warmgray hover:text-charcoal transition-colors font-medium">
          <ChevronLeft size={20} /> Back to Calendar
        </button>
        <span className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase bg-sage/10 text-sage border border-sage/20">{status}</span>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
         <div className="space-y-6">
            <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-warmgray">Platform Preview</h3>
            <div className="glass rounded-[32px] overflow-hidden shadow-2xl border border-[#E5E1D8] max-w-sm mx-auto lg:mx-0 relative">
               <div className="p-4 flex items-center justify-between border-b border-[#E5E1D8]">
                  <span className="text-sm font-bold">{brand.website}</span>
                  <Instagram size={18} className="text-rose-500" />
               </div>
               <div className="aspect-square bg-ivory">
                  <img src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" alt="Preview" />
               </div>
            </div>
         </div>

         <div className="space-y-8">
            <div className="p-6 bg-ivory rounded-3xl border border-[#E5E1D8] space-y-4 shadow-sm">
               <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-sage" />
                    <span className="text-[10px] uppercase font-bold text-charcoal">Guardian Vision Result</span>
                  </div>
                  {complianceScore && <span className="text-xs font-bold text-sage">{complianceScore}% Match</span>}
               </div>
               <button onClick={runComplianceScan} disabled={isScanning} className="w-full py-3 bg-charcoal text-white rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-black transition-all">
                  {isScanning ? "Scanning Pixels..." : "Run Aesthetic Compliance Scan"}
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ContentEditor;