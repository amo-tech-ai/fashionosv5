import React from 'react';
import { Link } from 'react-router-dom';
import { Home, MapPin, Sparkles, ArrowRight, Star, ShieldCheck, Zap } from 'lucide-react';
import SEO from '../../components/SEO';

const StudioHireLanding: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-1000">
      <SEO title="Studio Hire Network" description="Direct access to the world's most sophisticated production studios." />
      
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden border-b border-[#E5E1D8]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center grayscale opacity-10" />
        <div className="relative z-10 text-center space-y-10 px-6">
          <div className="flex justify-center items-center gap-3">
            <Home size={24} className="text-sage" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-sage">Physical Nodes</span>
          </div>
          <h1 className="font-serif text-6xl md:text-9xl tracking-tighter leading-[0.85] max-w-4xl mx-auto">
            Spaces for<br /><span className="italic">Visionaries.</span>
          </h1>
          <p className="text-warmgray text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Direct access to the world's most sophisticated production studios, synchronized with our neural hardware.
          </p>
          <div className="flex gap-6 justify-center pt-8">
            <Link to="/demo" className="px-12 py-6 bg-charcoal text-white rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-2xl flex items-center gap-3">
              Browse Locations <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-32 px-8 md:px-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          { city: 'Paris', name: 'Studio Lumière', desc: 'Natural light masterpiece in the 1er.', img: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=800&q=80' },
          { city: 'Milan', name: 'The Brera Node', desc: 'Neoclassical architectural purity.', img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80' },
          { city: 'New York', name: 'Chelsea Grid', desc: 'Industrial brutalist expanse.', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80' }
        ].map((studio, i) => (
          <div key={i} className="group space-y-6">
            <div className="aspect-video bg-ivory rounded-[48px] overflow-hidden shadow-sm relative group-hover:shadow-2xl transition-all duration-700">
               <img src={studio.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
               <div className="absolute top-8 left-8">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur rounded-full text-[8px] font-bold uppercase text-white border border-white/20">{studio.city}</span>
               </div>
            </div>
            <div className="px-4 space-y-2">
               <h3 className="font-serif text-3xl group-hover:text-sage transition-colors">{studio.name}</h3>
               <p className="text-warmgray text-sm leading-relaxed">{studio.desc}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default StudioHireLanding;