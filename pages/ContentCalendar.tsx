import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Instagram, MessageCircle, Globe, Send, Sparkles, Loader2, Info, Target, Zap, BarChart3, ArrowRight } from 'lucide-react';
import { useProjects } from '../contexts/ProjectContext';
import { GoogleGenAI } from "@google/genai";

const ContentCalendar: React.FC = () => {
  const { brands } = useProjects();
  const brand = brands[0];
  const [view, setView] = useState('Month');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([]);

  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const platforms = [
    { name: 'Instagram', icon: Instagram, color: 'text-rose-500', share: 40 },
    { name: 'TikTok', icon: MessageCircle, color: 'text-black', share: 30 },
    { name: 'Pinterest', icon: Globe, color: 'text-red-600', share: 20 },
    { name: 'Amazon', icon: Send, color: 'text-blue-500', share: 10 }
  ];

  const initialScheduledPosts = [
    { id: 'post-101', day: 12, platform: 'Instagram', format: 'Reel', status: 'Approved', img: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=200&q=80' },
    { id: 'post-102', day: 14, platform: 'TikTok', format: 'Video', status: 'Draft', img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=200&q=80' },
    { id: 'post-103', day: 15, platform: 'Instagram', format: 'Carousel', status: 'Scheduled', img: 'https://images.unsplash.com/photo-1539109132314-34a9c6ee892b?auto=format&fit=crop&w=200&q=80' },
    { id: 'post-104', day: 18, platform: 'Pinterest', format: 'Story', status: 'Approved', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80' }
  ];

  const [posts, setPosts] = useState(initialScheduledPosts);

  const neuralAutoFill = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Generate a 7-day omnichannel strategy for "${brand.name}". SS25. JSON array of 7 objects: day (20-27), platform, format, concept.`;
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });
      const data = JSON.parse(response.text || '[]');
      const newPosts = data.map((d: any, i: number) => ({
        ...d,
        id: `ai-post-${Date.now()}-${i}`,
        status: 'AI Suggested',
        img: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=200&q=80'
      }));
      setPosts([...posts, ...newPosts]);
      setAiSuggestions(newPosts);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto flex flex-col h-full animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
         <div>
            <h2 className="font-serif text-5xl mb-2">Content Strategy</h2>
            <p className="text-warmgray">Optimizing luxury placement across all global channels.</p>
         </div>
         <div className="flex items-center gap-4">
            <button 
              onClick={neuralAutoFill}
              disabled={isGenerating}
              className="px-6 py-2.5 bg-sage text-white rounded-full text-[10px] uppercase font-bold tracking-[0.2em] flex items-center gap-2 hover:scale-105 transition-all shadow-xl disabled:opacity-50"
            >
               {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
               Neural Auto-Fill
            </button>
            <div className="flex bg-[#E5E1D8]/30 p-1 rounded-full border border-[#E5E1D8]">
               {['Month', 'Week'].map(v => (
                 <button 
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-6 py-2 rounded-full text-[10px] uppercase font-bold tracking-widest transition-all ${view === v ? 'bg-white shadow-md text-charcoal' : 'text-warmgray'}`}
                 >
                   {v}
                 </button>
               ))}
            </div>
         </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-12 min-h-[600px]">
         <div className="lg:col-span-3 space-y-8">
            <div className="flex items-center justify-between px-4">
               <h3 className="font-serif text-2xl">October 2024</h3>
               <div className="flex gap-4">
                  <button className="p-2 hover:bg-[#E5E1D8]/30 rounded-full"><ChevronLeft size={20} /></button>
                  <button className="p-2 hover:bg-[#E5E1D8]/30 rounded-full"><ChevronRight size={20} /></button>
               </div>
            </div>

            <div className="grid grid-cols-7 gap-px bg-[#E5E1D8] border border-[#E5E1D8] rounded-[32px] overflow-hidden shadow-sm">
               {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                 <div key={d} className="bg-ivory py-4 text-center text-[10px] uppercase font-bold text-warmgray tracking-widest">{d}</div>
               ))}
               {days.map(d => {
                 const post = posts.find(p => p.day === d);
                 return (
                   <div key={d} className={`bg-white min-h-[120px] p-2 relative group hover:bg-ivory transition-colors ${d % 7 === 0 || d % 7 === 6 ? 'bg-[#FAFAF9]' : ''}`}>
                      <span className="text-[10px] font-bold text-warmgray">{d}</span>
                      {post && (
                        <Link 
                          to={`/brand/${brand.id}/content/${post.id}`}
                          className="mt-2 block space-y-1 animate-in zoom-in-95 duration-500 hover:scale-95 transition-transform"
                        >
                           <div className="aspect-square rounded-xl overflow-hidden relative shadow-sm">
                              <img src={post.img} className="w-full h-full object-cover" />
                              <div className="absolute top-1 right-1 bg-white/90 p-1 rounded-md">
                                 {post.platform === 'Instagram' && <Instagram size={10} className="text-rose-500" />}
                                 {post.platform === 'TikTok' && <MessageCircle size={10} className="text-black" />}
                                 {post.platform === 'Pinterest' && <Globe size={10} className="text-red-600" />}
                              </div>
                           </div>
                           <div className="flex justify-between items-center px-1">
                              <span className="text-[8px] font-bold uppercase text-charcoal">{post.format}</span>
                              <div className={`h-1.5 w-1.5 rounded-full ${post.status === 'Approved' ? 'bg-sage' : 'bg-warmgray/40'}`} />
                           </div>
                        </Link>
                      )}
                   </div>
                 );
               })}
            </div>
         </div>

         <div className="space-y-8">
            <div className="glass rounded-[40px] p-8 border border-sage/20 bg-sage/5 space-y-6">
               <div className="flex items-center justify-between">
                  <h4 className="font-serif text-2xl flex items-center gap-2">
                     <Sparkles size={18} className="text-sage" />
                     Mix Strategy
                  </h4>
               </div>
               <div className="space-y-4">
                  <div className="p-4 bg-white border border-sage/10 rounded-2xl space-y-3">
                     <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-sage">
                        <Zap size={10} />
                        Neural Recommendation
                     </div>
                     <p className="text-xs text-charcoal font-medium leading-relaxed italic">
                       "AI suggests a 70% tilt toward cinematic Reels for SS25 engagement indices."
                     </p>
                  </div>
                  <div className="space-y-3">
                     <div className="flex h-5 rounded-xl overflow-hidden bg-ivory border border-[#E5E1D8]">
                        <div className="bg-rose-500 w-[40%]" />
                        <div className="bg-charcoal w-[30%]" />
                        <div className="bg-red-600 w-[20%]" />
                        <div className="bg-blue-500 w-[10%]" />
                     </div>
                  </div>
               </div>
               <div className="pt-4 border-t border-sage/10">
                  <div className="flex items-center gap-2 p-3 bg-white/50 border border-sage/5 rounded-xl text-sage">
                    <Info size={14} />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-sage">Golden Hour: 17:00 - 19:30</span>
                  </div>
               </div>
            </div>

            {aiSuggestions.length > 0 && (
              <div className="glass rounded-[40px] p-8 border border-[#E5E1D8] animate-in slide-in-from-right-4">
                 <h4 className="font-serif text-xl mb-4 flex items-center gap-2">
                    <BarChart3 size={18} />
                    Neural Feed
                 </h4>
                 <div className="space-y-4">
                    {aiSuggestions.map((s, i) => (
                      <Link 
                        to={`/brand/${brand.id}/content/${s.id}`}
                        key={i} 
                        className="block text-[10px] p-3 bg-white/50 border border-[#E5E1D8] rounded-xl group hover:border-sage transition-all"
                      >
                        <div className="flex justify-between items-center mb-1">
                           <span className="font-bold text-sage uppercase">Day {s.day} • {s.platform}</span>
                           <ArrowRight size={10} />
                        </div>
                        <p className="text-charcoal font-medium leading-relaxed truncate">{s.concept}</p>
                      </Link>
                    ))}
                 </div>
              </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default ContentCalendar;