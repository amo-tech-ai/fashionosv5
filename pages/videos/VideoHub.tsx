import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Video, Play, Plus, ArrowUpRight, Zap, Sparkles, BarChart2 } from 'lucide-react';
import SEO from '../../components/SEO';

const VideoHub: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-16 animate-in fade-in duration-700">
      <SEO title="Motion Hub" description="Orchestrating high-fidelity cinematic campaigns." />
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
          <h2 className="font-serif text-6xl tracking-tighter mb-4">Motion Hub.</h2>
          <p className="text-warmgray max-w-lg leading-relaxed">From AI pre-viz to global cinematic execution. Movement is the ultimate brand expression.</p>
        </div>
        <button 
          onClick={() => navigate('/videos/wizard')}
          className="flex items-center gap-3 bg-charcoal text-white px-10 py-5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl group"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform" />
          Plan New Motion
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
         {[
           { title: 'SS25 Desert Noir', status: 'Pre-Viz', img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80' },
           { title: 'Architectural Silk', status: 'Rough Cut', img: 'https://images.unsplash.com/photo-1550630992-c037bb2f43ca?auto=format&fit=crop&w=800&q=80' }
         ].map((video, i) => (
           <div key={i} className="bg-white border border-[#E5E1D8] rounded-[48px] overflow-hidden group hover:shadow-2xl transition-all duration-700 relative flex flex-col">
              <div className="aspect-[4/5] relative overflow-hidden bg-charcoal">
                 <img src={video.img} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-[2s]" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-20 w-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform cursor-pointer">
                       <Play size={32} className="fill-white" />
                    </div>
                 </div>
                 <div className="absolute top-8 left-8">
                    <span className="px-4 py-1.5 bg-sage text-white rounded-full text-[9px] font-bold uppercase tracking-widest">{video.status}</span>
                 </div>
              </div>
              <div className="p-10 space-y-6 flex-1">
                 <h3 className="font-serif text-3xl leading-tight">{video.title}</h3>
                 <div className="flex justify-between items-center pt-6 border-t border-ivory">
                    <button onClick={() => navigate('/videos/edit/1')} className="text-[10px] font-bold uppercase tracking-widest text-charcoal hover:text-sage transition-all">Enter Studio</button>
                    <ArrowUpRight size={20} className="text-warmgray" />
                 </div>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};

export default VideoHub;