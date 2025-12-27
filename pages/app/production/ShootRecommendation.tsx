import React from 'react';
import { Sparkles, Wand2, Camera, ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useIntelligence } from '../../../contexts/IntelligenceContext';
import { useProjects } from '../../../contexts/ProjectContext';

const ShootRecommendation: React.FC = () => {
  const navigate = useNavigate();
  const { openPanel } = useIntelligence();
  const { brands } = useProjects();
  const brand = brands[0];

  const recommendations = [
    { title: 'Architectural Heritage', desc: 'SS25 lines with Milanese facades.', impact: 'High Performance', image: 'https://images.unsplash.com/photo-1550630992-c037bb2f43ca?auto=format&fit=crop&w=800&q=80' }
  ];

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-16 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row justify-between items-end gap-10">
         <div>
            <div className="flex items-center gap-3 mb-4">
               <Sparkles className="text-sage" size={24} />
               <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-sage">Intelligence Driven</span>
            </div>
            <h2 className="font-serif text-6xl tracking-tighter mb-4">AI Recommended Shoots</h2>
         </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
         {recommendations.map((rec, i) => (
           <div key={i} className="bg-white border border-[#E5E1D8] rounded-[48px] overflow-hidden group hover:shadow-2xl transition-all duration-700">
              <div className="aspect-[3/4] relative overflow-hidden">
                 <img src={rec.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                 <div className="absolute bottom-8 left-8 right-8">
                    <h3 className="font-serif text-3xl text-white mb-2">{rec.title}</h3>
                    <p className="text-white/70 text-sm italic">"{rec.desc}"</p>
                 </div>
              </div>
              <div className="p-8 flex items-center justify-between border-t border-[#E5E1D8]">
                 <button onClick={() => navigate(`/brand/${brand.id}/shoots/wizard`)} className="flex items-center gap-2 px-5 py-2.5 bg-charcoal text-white rounded-2xl text-[10px] font-bold uppercase shadow-sm">
                    <ClipboardList size={14} /> Plan Production
                 </button>
                 <button onClick={() => openPanel('booking', { title: rec.title, image: rec.image, impact: rec.impact })} className="p-2.5 bg-ivory rounded-2xl hover:bg-sage hover:text-white transition-all text-warmgray">
                    <Camera size={18} />
                 </button>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};

export default ShootRecommendation;