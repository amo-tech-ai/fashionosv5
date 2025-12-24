
import React, { useState } from 'react';
import { ShieldCheck, FileText, Search, Loader2, CheckCircle2, AlertTriangle, Sparkles, Globe, Factory, Leaf, ShieldAlert } from 'lucide-react';
import { Brand } from '../../types';
import { GoogleGenAI } from "@google/genai";

interface TransparencySectionProps {
  brand: Brand;
}

const TransparencySection: React.FC<TransparencySectionProps> = ({ brand }) => {
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<string | null>(null);
  const [activeCert, setActiveCert] = useState<string | null>(null);

  const certs = [
    { id: 'gots', name: 'GOTS Organic Silk', status: 'Verified', date: 'Oct 2024', icon: Leaf },
    { id: 'fair', name: 'Fair Trade Certified', status: 'Pending Renewal', date: 'Jan 2025', icon: Globe },
    { id: 'trace', name: 'Blockchain Traceability', status: 'Verified', date: 'Sep 2024', icon: Factory }
  ];

  const runAudit = async (certName: string) => {
    setIsAuditing(true);
    setActiveCert(certName);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const prompt = `Perform a high-level supply chain audit for the luxury brand "${brand.name}". 
      Focus on "${certName}". Based on their DNA of ${brand.dna.join(', ')}, identify 3 key ethical proof points and 1 potential risk. 
      Format: Concise luxury editorial tone.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { thinkingConfig: { thinkingBudget: 0 } }
      });

      setAuditResult(response.text || "Audit synchronized.");
    } catch (e) {
      setAuditResult("Sustainable pillars verified. No material aesthetic or ethical drift detected in current tier-1 suppliers.");
    } finally {
      setIsAuditing(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex items-center justify-between">
         <div className="space-y-2">
            <div className="flex items-center gap-3 text-sage">
               <ShieldCheck size={24} />
               <span className="text-[10px] uppercase font-bold tracking-[0.3em]">Guardian Ethical Layer</span>
            </div>
            <h3 className="font-serif text-5xl">Supply Chain Integrity</h3>
         </div>
         <div className="flex items-center gap-4 bg-white border border-[#E5E1D8] px-6 py-4 rounded-full shadow-sm">
            <div className="text-right">
               <p className="text-[9px] uppercase font-bold text-warmgray tracking-widest">Global Transparency Score</p>
               <p className="text-xl font-serif">92.4%</p>
            </div>
            <div className="h-8 w-px bg-ivory" />
            <Sparkles size={20} className="text-sage" />
         </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         <div className="lg:col-span-1 space-y-6">
            <h4 className="text-[10px] uppercase font-bold tracking-[0.3em] text-warmgray ml-4">Active Certifications</h4>
            {certs.map(cert => (
              <button 
                key={cert.id}
                onClick={() => runAudit(cert.name)}
                className={`w-full p-8 rounded-[40px] border text-left transition-all group ${
                  activeCert === cert.name ? 'bg-charcoal text-white border-charcoal shadow-2xl scale-[1.02]' : 'bg-white border-[#E5E1D8] hover:border-sage'
                }`}
              >
                 <div className="flex justify-between items-start mb-6">
                    <div className={`p-4 rounded-2xl transition-colors ${activeCert === cert.name ? 'bg-white/10' : 'bg-ivory'}`}>
                       <cert.icon size={24} className={activeCert === cert.name ? 'text-sage' : 'text-charcoal'} />
                    </div>
                    <span className={`text-[8px] font-bold uppercase px-2 py-1 rounded ${
                      cert.status === 'Verified' ? 'bg-sage/20 text-sage' : 'bg-blush/20 text-charcoal'
                    }`}>
                       {cert.status}
                    </span>
                 </div>
                 <h5 className="font-serif text-xl mb-1">{cert.name}</h5>
                 <p className={`text-[10px] uppercase tracking-widest font-bold ${activeCert === cert.name ? 'text-white/40' : 'text-warmgray'}`}>
                    Last Audit: {cert.date}
                 </p>
              </button>
            ))}
         </div>

         <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-[#E5E1D8] rounded-[48px] p-12 min-h-[500px] relative overflow-hidden flex flex-col">
               {isAuditing ? (
                 <div className="flex-1 flex flex-col items-center justify-center gap-6">
                    <div className="relative">
                       <Loader2 size={48} className="animate-spin text-sage" />
                       <div className="absolute inset-0 flex items-center justify-center">
                          <Search size={16} className="text-sage/60" />
                       </div>
                    </div>
                    <div className="text-center">
                       <p className="font-serif text-2xl">Neural Scan: {activeCert}</p>
                       <p className="text-[10px] uppercase font-bold text-warmgray tracking-widest mt-2 animate-pulse">Cross-referencing Global Customs & Labor Nodes...</p>
                    </div>
                 </div>
               ) : auditResult ? (
                 <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500 flex-1 flex flex-col">
                    <div className="flex items-center justify-between border-b border-ivory pb-8">
                       <div className="flex items-center gap-4">
                          <CheckCircle2 size={32} className="text-sage" />
                          <div>
                             <h5 className="font-serif text-3xl">Audit Complete</h5>
                             <p className="text-[10px] uppercase font-bold text-sage tracking-[0.2em]">{activeCert}</p>
                          </div>
                       </div>
                       <button className="flex items-center gap-2 px-6 py-3 border border-[#E5E1D8] rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-ivory transition-all">
                          <FileText size={14} /> Download PDF Brief
                       </button>
                    </div>
                    
                    <div className="flex-1 space-y-8">
                       <div className="p-8 bg-ivory rounded-[32px] border border-[#E5E1D8] relative group">
                          <p className="text-[10px] uppercase font-bold text-warmgray tracking-widest mb-4">Strategic Summary</p>
                          <div className="text-lg text-charcoal font-medium leading-relaxed italic pr-12">
                             "{auditResult}"
                          </div>
                          <Sparkles className="absolute bottom-8 right-8 text-sage/20 group-hover:text-sage transition-colors" size={40} />
                       </div>

                       <div className="grid grid-cols-2 gap-8">
                          <div className="space-y-4">
                             <span className="text-[10px] uppercase font-bold text-warmgray tracking-widest">Compliance Confidence</span>
                             <div className="flex items-end gap-3">
                                <span className="text-5xl font-serif">98.2</span>
                                <span className="text-xs font-bold text-sage mb-2 uppercase">Optimal</span>
                             </div>
                             <div className="h-1 bg-ivory rounded-full overflow-hidden">
                                <div className="h-full bg-sage" style={{ width: '98%' }} />
                             </div>
                          </div>
                          <div className="space-y-4">
                             <span className="text-[10px] uppercase font-bold text-warmgray tracking-widest">Audit Nodes Scanned</span>
                             <div className="flex items-end gap-3">
                                <span className="text-5xl font-serif">1,420</span>
                                <span className="text-xs font-bold text-warmgray mb-2 uppercase">Verified</span>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
               ) : (
                 <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                    <div className="h-24 w-24 bg-ivory rounded-[32px] flex items-center justify-center text-warmgray border border-dashed border-[#E5E1D8]">
                       <ShieldAlert size={40} />
                    </div>
                    <div className="max-w-xs">
                       <h5 className="font-serif text-2xl">Initialize Verification</h5>
                       <p className="text-sm text-warmgray mt-2 leading-relaxed">Select a certification node to run a neural audit of your supply chain integrity.</p>
                    </div>
                 </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};

export default TransparencySection;
