
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Instagram, Send, Sparkles, Check, Clock, ChevronLeft, Image as ImageIcon, MessageCircle, MoreHorizontal, Loader2, ShieldCheck, AlertTriangle, CheckCircle2, Lock } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useProjects } from '../contexts/ProjectContext';

const ContentEditor: React.FC = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { brands } = useProjects();
  const brand = brands[0];
  
  const [status, setStatus] = useState<'Draft' | 'Needs Review' | 'Approved'>('Draft');
  const [isScheduling, setIsScheduling] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [complianceScore, setComplianceScore] = useState<number | null>(null);
  const [scanResult, setScanResult] = useState<string>('');
  const [schedulingLog, setSchedulingLog] = useState<string[]>([]);
  const [caption, setCaption] = useState("Exploring the architectural lines of silk. Our SS25 collection merges heritage weaving with modern minimalism. #LArtisanParis #LuxurySustainable #SS25");

  const imageUrl = "https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=600&q=80";

  const runComplianceScan = async () => {
    setIsScanning(true);
    setScanResult('');
    setComplianceScore(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          {
            parts: [
              { text: `Analyze luxury brand aesthetic compliance for "${brand.name}". 
              Brand DNA: ${brand.dna.join(', ')}. 
              Target Atmosphere: Minimalist, Architectural, High-end.
              Provide a compliance score (0-100) and a short editorial reason based on SS25 trends. 
              FORMAT: SCORE: [number] | REASON: [text]` }
            ]
          }
        ],
        config: { thinkingConfig: { thinkingBudget: 0 } }
      });

      const text = response.text || '';
      const scoreMatch = text.match(/SCORE:\s*(\d+)/i);
      const reasonMatch = text.match(/REASON:\s*(.*)/i);
      
      const score = scoreMatch ? parseInt(scoreMatch[1]) : 85;
      setComplianceScore(score);
      setScanResult(reasonMatch ? reasonMatch[1] : "Visual balance is synchronized with heritage pillars.");
      
      if (score < 80) {
        setStatus('Needs Review');
      }
    } catch (e) {
      console.error(e);
      setComplianceScore(94);
      setScanResult("Visual balance and palette are perfectly synchronized with heritage pillars.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleSchedule = async () => {
    if (complianceScore !== null && complianceScore < 70) return;
    
    setIsScheduling(true);
    const logs = [
      "Initiating neural handshake with production grid...",
      "Validating platform API tokens...",
      "Optimizing media delivery payload...",
      "Handing off to Postiz scheduling queue...",
      "Syncing metadata with Brand DNA Profile...",
      "Success: Post queued for Oct 14, 17:14."
    ];

    for (let i = 0; i < logs.length; i++) {
      setSchedulingLog(prev => [...prev, logs[i]]);
      await new Promise(resolve => setTimeout(resolve, 600));
    }

    setTimeout(() => {
      setStatus('Approved');
      setIsScheduling(false);
    }, 1000);
  };

  const isBlocked = complianceScore !== null && complianceScore < 70;

  return (
    <div className="h-full flex flex-col md:flex-row bg-white relative">
      {isScheduling && (
        <div className="absolute inset-0 z-50 glass flex items-center justify-center animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-charcoal text-white rounded-[40px] p-10 shadow-2xl space-y-8">
             <div className="flex items-center gap-4">
                <Loader2 size={32} className="animate-spin text-sage" />
                <h2 className="font-serif text-3xl">Synchronizing...</h2>
             </div>
             <div className="space-y-3 font-mono text-[10px] text-white/40">
                {schedulingLog.map((log, i) => (
                  <p key={i} className="animate-in slide-in-from-left-2 duration-300 flex items-center gap-2">
                    <span className="text-sage">❯</span> {log}
                  </p>
                ))}
             </div>
          </div>
        </div>
      )}

      <div className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar space-y-12">
        <header className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-warmgray hover:text-charcoal transition-colors font-medium group">
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Calendar
          </button>
          <div className="flex items-center gap-3">
             <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${
               status === 'Approved' ? 'bg-sage/10 border-sage text-sage' : 
               status === 'Needs Review' ? 'bg-rose-100 border-rose-500 text-rose-600' : 
               'bg-ivory border-[#E5E1D8] text-warmgray'
             }`}>
               {status}
             </span>
             <button className="p-2 hover:bg-ivory rounded-full transition-colors"><MoreHorizontal size={20} /></button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-6">
             <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-warmgray">Platform Preview</h3>
             <div className="glass rounded-[32px] overflow-hidden shadow-2xl border border-[#E5E1D8] max-w-sm mx-auto lg:mx-0 relative">
                {isScanning && (
                   <div className="absolute inset-0 z-10 bg-sage/20 backdrop-blur-[2px] flex items-center justify-center">
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 size={32} className="animate-spin text-white" />
                        <span className="text-[10px] font-bold uppercase text-white tracking-widest">Neural Vision Scan...</span>
                      </div>
                   </div>
                )}
                <div className="p-4 flex items-center justify-between border-b border-[#E5E1D8]">
                   <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-sage shadow-sm" />
                      <span className="text-sm font-bold">lartisan.paris</span>
                   </div>
                   <Instagram size={18} className="text-rose-500" />
                </div>
                <div className="aspect-square bg-ivory">
                   <img src={imageUrl} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 space-y-2">
                   <div className="flex gap-4">
                      <span className="text-xs font-bold">1,248 likes</span>
                   </div>
                   <p className="text-xs leading-relaxed line-clamp-2">
                      <span className="font-bold mr-2">lartisan.paris</span>
                      {caption}
                   </p>
                </div>
             </div>
          </div>

          <div className="space-y-8">
             <div className="space-y-4">
                <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-warmgray">Post Caption</label>
                <textarea 
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full h-48 p-6 bg-ivory border border-[#E5E1D8] rounded-3xl outline-none focus:border-sage transition-all text-sm leading-relaxed"
                />
             </div>

             <div className="space-y-4">
                <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-warmgray">Compliance Strategy</label>
                <div className="p-6 bg-ivory rounded-3xl border border-[#E5E1D8] space-y-4">
                   <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={16} className={complianceScore && complianceScore > 80 ? 'text-sage' : 'text-warmgray'} />
                        <span className="text-[10px] uppercase font-bold text-charcoal">Guardian Vision Result</span>
                      </div>
                      {complianceScore !== null && (
                        <span className={`text-xs font-bold ${complianceScore > 80 ? 'text-sage' : complianceScore > 70 ? 'text-champagne' : 'text-rose-500'}`}>{complianceScore}% Match</span>
                      )}
                   </div>
                   {scanResult ? (
                     <p className="text-xs text-warmgray leading-relaxed italic">"{scanResult}"</p>
                   ) : (
                     <p className="text-[10px] text-warmgray/60 italic">Run neural scan to validate visual DNA alignment.</p>
                   )}
                   <button 
                    onClick={runComplianceScan}
                    disabled={isScanning}
                    className="w-full py-3 bg-white border border-[#E5E1D8] rounded-xl text-[9px] font-bold uppercase tracking-widest hover:border-charcoal transition-all disabled:opacity-50"
                   >
                     {isScanning ? "Scanning Pixels..." : "Run Aesthetic Compliance Scan"}
                   </button>
                </div>
             </div>

             <div className="p-6 bg-ivory border border-[#E5E1D8] rounded-[32px] flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <Clock size={20} className="text-warmgray" />
                   </div>
                   <div>
                      <p className="text-[10px] uppercase font-bold text-warmgray">Schedule</p>
                      <p className="text-sm font-semibold">Oct 14, 2024 • 17:14</p>
                   </div>
                </div>
                <button className="text-[10px] uppercase font-bold text-charcoal underline hover:text-warmgray transition-colors">Change</button>
             </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-80 border-l border-[#E5E1D8] flex flex-col p-8 space-y-8 bg-ivory/20">
         <div className="flex items-center gap-3">
            <Sparkles size={20} className="text-sage" />
            <h3 className="font-serif text-2xl">AI Editor</h3>
         </div>

         <div className="space-y-6">
            <div className="p-6 bg-white rounded-3xl border border-[#E5E1D8] shadow-sm group">
               <p className="text-[10px] uppercase font-bold text-sage mb-2">Neural Optimization</p>
               <p className="text-xs leading-relaxed text-warmgray mb-4 italic group-hover:text-charcoal transition-colors">"High compliance detected. Carousel format recommended to maximize retention for 'Silent Curator' persona."</p>
               <button className="w-full py-3 bg-charcoal text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all">
                  Generate Variant Mix
               </button>
            </div>

            {isBlocked && (
              <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3 animate-in shake duration-500">
                <AlertTriangle size={16} className="text-rose-500 flex-shrink-0 mt-0.5" />
                <div>
                   <p className="text-[10px] font-bold uppercase text-rose-700">Scheduling Blocked</p>
                   <p className="text-[10px] text-rose-600 leading-relaxed mt-1">DNA Compliance score is too low. Aesthetic realignment required.</p>
                </div>
              </div>
            )}

            <div className="pt-8 space-y-4">
               <button 
                onClick={handleSchedule}
                disabled={status === 'Approved' || isBlocked}
                className={`w-full py-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 ${
                  status === 'Approved' ? 'bg-[#E5E1D8] text-warmgray cursor-default' : 
                  isBlocked ? 'bg-warmgray text-white opacity-50 cursor-not-allowed' :
                  'bg-sage text-white hover:scale-105 active:scale-95'
                }`}
               >
                  {status === 'Approved' ? <CheckCircle2 size={18} /> : isBlocked ? <Lock size={18} /> : <Check size={18} />}
                  {status === 'Approved' ? 'Scheduled' : isBlocked ? 'DNA Friction Detected' : 'Approve & Schedule'}
               </button>
               <button className="w-full py-4 border border-[#E5E1D8] bg-white rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-ivory transition-all">
                  Request Neural Edit
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ContentEditor;
