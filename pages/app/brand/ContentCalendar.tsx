import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Instagram, Sparkles, Loader2 } from 'lucide-react';
import { useProjects } from '../../../contexts/ProjectContext';
import { GoogleGenAI } from "@google/genai";

const ContentCalendar: React.FC = () => {
  const { brandId } = useParams();
  const { brands } = useProjects();
  const brand = brands.find(b => b.id === brandId) || brands[0];
  const [isGenerating, setIsGenerating] = useState(false);
  const [posts, setPosts] = useState([
    { id: 'post-101', day: 12, platform: 'Instagram', format: 'Reel', status: 'Approved', img: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=200&q=80' }
  ]);

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const neuralAutoFill = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a 7-day strategy for "${brand.name}". SS25.`
      });
      const newPost = { id: `ai-${Date.now()}`, day: 20, platform: 'Instagram', format: 'Video', status: 'AI Suggested', img: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=200&q=80' };
      setPosts([...posts, newPost]);
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
            <p className="text-warmgray">Optimizing luxury placement across global channels.</p>
         </div>
         <div className="flex items-center gap-4">
            <button onClick={neuralAutoFill} disabled={isGenerating} className="px-6 py-2.5 bg-sage text-white rounded-full text-[10px] uppercase font-bold tracking-[0.2em] flex items-center gap-2 hover:scale-105 transition-all shadow-xl">
               {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
               Neural Auto-Fill
            </button>
         </div>
      </header>

      <div className="grid grid-cols-7 gap-px bg-[#E5E1D8] border border-[#E5E1D8] rounded-[32px] overflow-hidden shadow-sm">
         {days.map(d => {
           const post = posts.find(p => p.day === d);
           return (
             <div key={d} className="bg-white min-h-[120px] p-2 hover:bg-ivory transition-colors">
                <span className="text-[10px] font-bold text-warmgray">{d}</span>
                {post && (
                  <Link to={`/brand/${brand.id}/content/${post.id}`} className="mt-2 block space-y-1">
                     <div className="aspect-square rounded-xl overflow-hidden relative shadow-sm">
                        <img src={post.img} className="w-full h-full object-cover" alt="Post" />
                     </div>
                  </Link>
                )}
             </div>
           );
         })}
      </div>
    </div>
  );
};

export default ContentCalendar;