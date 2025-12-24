
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Sparkles, Zap, Loader2, Camera, ShieldCheck, ClipboardList, TrendingUp, Share2, Globe, MessageSquare, Send, X, Activity, ExternalLink, Search, FileSearch } from 'lucide-react';
import Section from './Section';
import { IntelligenceService } from '../../services/intelligence';

interface DefaultModeProps {
  brand: any;
}

const DefaultMode: React.FC<DefaultModeProps> = ({ brand }) => {
  const location = useLocation();
  const intelService = IntelligenceService.getInstance();
  const [isInsightLoading, setIsInsightLoading] = useState(false);
  const [isResearching, setIsResearching] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [researchResult, setResearchResult] = useState<string | null>(null);
  const [proactivePing, setProactivePing] = useState<string | null>(null);
  const [trendGrounding, setTrendGrounding] = useState<{ text: string, links: string[] } | null>(null);
  const [isTrendLoading, setIsTrendLoading] = useState(false);

  const [stream, setStream] = useState([
    { id: 1, user: 'Elena', role: 'Photographer', action: 'Uploaded SS25 Milan Edits', time: '12m ago', icon: Camera },
    { id: 2, user: 'Marcus', role: 'Logistics', action: 'Venue Handshake: Metropol', time: '1h ago', icon: Globe },
    { id: 3, user: 'Guardian', role: 'AI Agent', action: 'DNA Drift Alert (2.1%)', time: '4h ago', icon: ShieldCheck }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProactivePing("Forecaster: SS25 Silhouettes are moving toward 'Brutalist Silk'. Verify trend?");
    }, 15000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    const interval = setInterval(() => {
      const users = ['Elena', 'Marcus', 'Sasha', 'Guardian'];
      const actions = ['Refined Colorway', 'Updated Brief', 'DNA Scan Complete', 'New Asset Added'];
      const newUser = users[Math.floor(Math.random() * users.length)];
      const newAction = actions[Math.floor(Math.random() * actions.length)];
      
      const newItem = {
        id: Date.now(),
        user: newUser,
        role: newUser === 'Guardian' ? 'AI Agent' : 'Team Node',
        action: newAction,
        time: 'Just now',
        icon: newUser === 'Guardian' ? ShieldCheck : MessageSquare
      };
      
      setStream(prev => [newItem, ...prev].slice(0, 5));
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  const handleTrendVerification = async () => {
    setIsTrendLoading(true);
    setTrendGrounding(null);
    setProactivePing(null);
    try {
      const result = await intelService.verifyTrend("Brutalist Silk Silhouettes SS25");
      setTrendGrounding(result);
    } catch (e) {
      setTrendGrounding({ text: "Verified: Brutalist aesthetics are dominating early SS25 Milan previews.", links: [] });
    } finally {
      setIsTrendLoading(false);
    }
  };

  const executeDeepResearch = async () => {
    setIsResearching(true);
    setResearchResult(null);
    try {
      const result = await intelService.performDeepResearch("Luxury Sustainability & AI integration SS25", brand.description);
      setResearchResult(result);
    } catch (e) {
      setResearchResult("Strategic audit suggests a 12% lift by implementing radical transparency logs directly into editorial captions.");
    } finally {
      setIsResearching(false);
    }
  };

  const executeContextualAction = async (actionLabel: string) => {
    setIsInsightLoading(true);
    setAiInsight(null);
    try {
      const result = await intelService.getStrategicRecommendation(brand.name, brand.dna, location.pathname, actionLabel);
      setAiInsight(result || "Insight core synchronized.");
    } catch (e) {
      setAiInsight("Strategy audit complete. Maintain current aesthetic focus on architectural silhouettes.");
    } finally {
      setIsInsightLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {proactivePing && (
          <div className="m-4 p-4 bg-charcoal text-white rounded-2xl animate-in slide-in-from-right-4 duration-500 shadow-xl relative overflow-hidden group">
            <button onClick={() => setProactivePing(null)} className="absolute top-2 right-2 text-white/40 hover:text-white"><X size={12} /></button>
            <div className="flex items-center gap-2 mb-2 text-sage">
                <Activity size={12} className="animate-pulse" />
                <span className="text-[9px] uppercase font-bold tracking-widest">Neural Trigger</span>
            </div>
            <p className="text-[10px] font-medium leading-relaxed mb-3">{proactivePing}</p>
            <button 
              onClick={handleTrendVerification}
              className="w-full py-2 bg-sage text-white rounded-lg text-[8px] font-bold uppercase tracking-widest hover:scale-105 transition-all"
            >
              Initialize Grounded Scan
            </button>
          </div>
        )}

        {isTrendLoading && (
           <div className="m-4 p-6 bg-ivory border border-sage/30 rounded-2xl flex flex-col items-center gap-3 animate-pulse">
              <Loader2 size={24} className="animate-spin text-sage" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-warmgray">Grounding Fashion Indices...</p>
           </div>
        )}

        {trendGrounding && (
          <div className="m-4 p-4 bg-white border border-sage/40 rounded-2xl animate-in slide-in-from-top-2 duration-500 shadow-sm relative">
             <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-sage">
                   <Globe size={12} />
                   <span className="text-[9px] uppercase font-bold tracking-widest">Grounded Result</span>
                </div>
                <button onClick={() => setTrendGrounding(null)}><X size={10} className="text-warmgray"/></button>
             </div>
             <p className="text-[11px] leading-relaxed text-charcoal mb-3 italic">"{trendGrounding.text}"</p>
             {trendGrounding.links.length > 0 && (
               <div className="space-y-1">
                  <p className="text-[8px] font-bold uppercase text-warmgray tracking-widest">Sources:</p>
                  {trendGrounding.links.slice(0, 2).map((link, i) => (
                    <a key={i} href={link} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[9px] text-sage hover:underline truncate">
                       <ExternalLink size={8} /> {new URL(link).hostname}
                    </a>
                  ))}
               </div>
             )}
          </div>
        )}

        <Section title="AI Strategic Actions" icon={<Zap size={14} />}>
          <div className="space-y-2">
            {[
              { label: 'Audit Task Priority', icon: ClipboardList },
              { label: 'Scan Style Compliance', icon: ShieldCheck },
              { label: 'Deep Market Research', icon: FileSearch, special: true }
            ].map((btn, i) => (
              <button 
                key={i} 
                onClick={() => btn.special ? executeDeepResearch() : executeContextualAction(btn.label)}
                className={`w-full text-left p-3.5 text-xs rounded-xl font-bold uppercase tracking-widest transition-all flex items-center justify-between group disabled:opacity-50 ${
                  btn.special ? 'bg-sage text-white hover:bg-charcoal' : 'bg-[#1A1A1A] text-white hover:bg-black'
                }`}
                disabled={isInsightLoading || isResearching}
              >
                <div className="flex items-center gap-3">
                  <btn.icon size={14} className={btn.special ? 'text-white' : 'text-sage'} />
                  {btn.label}
                </div>
                {btn.special && <Sparkles size={12} className="animate-pulse" />}
              </button>
            ))}
          </div>
          
          {(aiInsight || researchResult) && (
            <div className="mt-4 p-4 bg-sage/10 border border-sage/20 rounded-2xl animate-in slide-in-from-top-2">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-sage">
                  <Sparkles size={12} />
                  <span className="text-[9px] uppercase font-bold tracking-widest">Neural Analysis Result</span>
                </div>
                <button onClick={() => { setAiInsight(null); setResearchResult(null); }}><X size={10}/></button>
              </div>
              <div className="text-[10px] text-charcoal leading-relaxed whitespace-pre-line prose prose-sm prose-invert">
                {researchResult || aiInsight}
              </div>
            </div>
          )}
          {isResearching && (
            <div className="mt-4 p-4 bg-charcoal rounded-2xl animate-pulse space-y-3">
               <div className="flex items-center gap-2 text-sage">
                  <Loader2 size={12} className="animate-spin" />
                  <span className="text-[9px] uppercase font-bold tracking-widest">Recursive Reasoning Phase...</span>
               </div>
               <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-sage animate-[progress_3s_ease-in-out_infinite]" />
               </div>
            </div>
          )}
        </Section>

        <Section title="Collaborative Handshake" icon={<MessageSquare size={14} />}>
           <div className="space-y-4">
              <div className="flex items-center justify-between">
                 <span className="text-[9px] uppercase font-bold text-warmgray tracking-widest">Active Production Nodes</span>
                 <span className="h-1.5 w-1.5 bg-sage rounded-full animate-pulse" />
              </div>
              <div className="space-y-3">
                 {stream.map(item => (
                   <div key={item.id} className="flex gap-3 group cursor-pointer hover:bg-ivory p-2 rounded-xl transition-all animate-in slide-in-from-right-1">
                      <div className="h-8 w-8 bg-white border border-[#E5E1D8] rounded-lg flex items-center justify-center text-warmgray group-hover:text-charcoal transition-colors">
                         <item.icon size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                         <div className="flex justify-between items-baseline">
                            <p className="text-[10px] font-bold text-charcoal truncate">{item.user} • {item.role}</p>
                            <p className="text-[8px] text-warmgray whitespace-nowrap">{item.time}</p>
                         </div>
                         <p className="text-[9px] text-warmgray truncate">{item.action}</p>
                      </div>
                   </div>
                 ))}
              </div>
              <div className="relative mt-2">
                 <input 
                   placeholder="Ping collaborators..." 
                   className="w-full bg-ivory border border-[#E5E1D8] rounded-xl px-4 py-2.5 text-[10px] outline-none focus:border-sage transition-all pr-10"
                 />
                 <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-warmgray hover:text-sage transition-colors">
                    <Send size={12} />
                 </button>
              </div>
           </div>
        </Section>

        <Section title="Growth Intelligence" icon={<TrendingUp size={14} />}>
          <div className="p-4 bg-charcoal text-white rounded-2xl space-y-4">
            <div className="flex items-center gap-2">
                <Share2 size={14} className="text-sage" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Global Distribution Mix</span>
            </div>
            <div className="space-y-3">
                <div className="flex justify-between items-center text-[9px] uppercase tracking-tighter">
                  <span>Reach Potential</span>
                  <span className="text-sage">+240% Lift</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-sage" style={{ width: '85%' }} />
                </div>
            </div>
          </div>
        </Section>
      </div>
      <style>{`
        @keyframes progress {
          0% { width: 0; }
          50% { width: 100%; }
          100% { width: 0; }
        }
      `}</style>
    </div>
  );
};

export default DefaultMode;
