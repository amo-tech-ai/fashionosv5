
import React from 'react';
import { Sparkles, ArrowRight, Zap, Target, Camera, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ShootRecommendation: React.FC = () => {
  const navigate = useNavigate();

  const recommendations = [
    {
      title: 'Architectural Heritage',
      desc: 'Merging SS25 lines with Neoclassical Milanese facades.',
      impact: 'High Performance',
      image: 'https://images.unsplash.com/photo-1550630992-c037bb2f43ca?auto=format&fit=crop&w=800&q=80',
      channels: ['Instagram', 'Print']
    },
    {
      title: 'Desert Noir',
      desc: 'Sustainable silk against brutalist desert landscape.',
      impact: 'Viral Potential',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      channels: ['TikTok', 'Web']
    },
    {
      title: 'Studio Minimalism',
      desc: 'Ethereal lighting highlighting artisanal precision.',
      impact: 'E-com Conversion',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80',
      channels: ['Amazon', 'Web']
    }
  ];

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-16 pb-24">
      <header className="flex flex-col md:flex-row justify-between items-end gap-10">
         <div className="animate-in fade-in slide-in-from-left duration-1000">
            <div className="flex items-center gap-3 mb-4">
               <Sparkles className="text-sage" size={24} />
               <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-sage">Intelligence Driven</span>
            </div>
            <h2 className="font-serif text-6xl tracking-tighter mb-4">AI Recommended Shoots</h2>
            <p className="text-warmgray text-lg max-w-xl">Based on your brand scores and SS25 trajectory, we recommend these high-impact productions.</p>
         </div>
         <button className="bg-charcoal text-white px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-2xl flex items-center gap-3">
            Book Production <ArrowRight size={20} />
         </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
         {recommendations.map((rec, i) => (
           <div key={i} className="bg-white border border-[#E5E1D8] rounded-[48px] overflow-hidden group hover:shadow-2xl transition-all duration-700">
              <div className="aspect-[3/4] overflow-hidden relative">
                 <img src={rec.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                 <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                 <div className="absolute top-8 left-8">
                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur rounded-full text-[9px] font-bold uppercase tracking-widest text-charcoal shadow-sm">
                       {rec.impact}
                    </span>
                 </div>
                 <div className="absolute bottom-8 left-8 right-8">
                    <h3 className="font-serif text-3xl text-white mb-2">{rec.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-6">{rec.desc}</p>
                    <div className="flex gap-2">
                       {rec.channels.map(c => (
                         <span key={c} className="px-3 py-1 bg-white/10 backdrop-blur rounded-full text-[8px] font-bold uppercase text-white tracking-widest">{c}</span>
                       ))}
                    </div>
                 </div>
              </div>
              <div className="p-8 flex items-center justify-between border-t border-[#E5E1D8]">
                 <span className="text-[10px] uppercase font-bold text-warmgray tracking-widest">Confidence: 94%</span>
                 <button className="p-3 bg-ivory rounded-full hover:bg-sage hover:text-white transition-all">
                    <Camera size={20} />
                 </button>
              </div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16 pt-16 border-t border-[#E5E1D8]">
         <div className="space-y-6">
            <div className="h-12 w-12 bg-sage rounded-2xl flex items-center justify-center text-white">
               <Zap size={24} />
            </div>
            <h4 className="font-serif text-3xl">AI Strategic Logic</h4>
            <p className="text-warmgray leading-relaxed text-sm">Our neural engine maps your "Heritage" DNA against the rising "Brutalist Silk" trend index. These scenes are projected to increase your engagement by 22% among high-net-worth conscious consumers.</p>
         </div>
         <div className="lg:col-span-2 glass rounded-[40px] p-10 flex flex-col md:flex-row gap-10">
            <div className="flex-1 space-y-6">
               <h4 className="font-serif text-2xl">Visual Match Score</h4>
               <div className="space-y-4">
                  {[
                    { l: 'Color Palette Sync', s: 98 },
                    { l: 'Lighting Atmosphere', s: 92 },
                    { l: 'Talent Alignment', s: 87 }
                  ].map(stat => (
                    <div key={stat.l} className="space-y-2">
                       <div className="flex justify-between text-[10px] uppercase font-bold text-warmgray tracking-widest">
                          <span>{stat.l}</span>
                          <span>{stat.s}%</span>
                       </div>
                       <div className="h-1 bg-ivory rounded-full">
                          <div className="h-full bg-sage rounded-full" style={{ width: `${stat.s}%` }} />
                       </div>
                    </div>
                  ))}
               </div>
            </div>
            <div className="w-full md:w-48 aspect-square bg-charcoal rounded-3xl p-8 flex flex-col justify-between text-white">
               <Target size={32} className="text-sage" />
               <p className="text-xs font-bold uppercase tracking-widest leading-relaxed">Optimal ROI for Q4 Brand Equity</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ShootRecommendation;
