import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Camera, Scissors, Video, Home, ArrowRight, Star, ShieldCheck, Zap } from 'lucide-react';
import SEO from '../../components/SEO';

const ServiceMarketplace: React.FC = () => {
  const services = [
    { id: 'photography', title: 'Campaign Photography', icon: Camera, count: 12, desc: 'High-fidelity editorial and lookbook nodes.', color: 'text-sage' },
    { id: 'video', title: 'Cinematography', icon: Video, count: 8, desc: 'Veo-integrated motion production for SS25.', color: 'text-rose-400' },
    { id: 'retouching', title: 'Post-Production', icon: Scissors, count: 24, desc: 'Guardian-verified aesthetic refinement.', color: 'text-champagne' },
    { id: 'studio-hire', title: 'Studio Network', icon: Home, count: 42, desc: 'Grounded Tier-1 venues globally.', color: 'text-charcoal' }
  ];

  return (
    <div className="animate-in fade-in duration-1000 p-8 md:p-16 max-w-7xl mx-auto space-y-16">
      <SEO title="Service Marketplace" description="Connect with vetted production artisans synchronized with your Maison DNA." />
      
      <header className="space-y-6">
        <div className="flex items-center gap-3 text-sage">
          <Sparkles size={24} />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em]">The Maison Network</span>
        </div>
        <h1 className="font-serif text-6xl md:text-8xl tracking-tighter leading-none">Curated Talent.</h1>
        <p className="text-warmgray text-lg max-w-xl leading-relaxed">
          Access a vetted grid of production artisans, studios, and technicians synchronized with your brand’s digital DNA.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map(s => (
          <Link key={s.id} to={`/services/${s.id}`} className="group bg-white border border-[#E5E1D8] rounded-[48px] p-10 space-y-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className={`h-16 w-16 bg-ivory rounded-3xl flex items-center justify-center ${s.color} shadow-inner group-hover:bg-charcoal group-hover:text-white transition-colors`}>
              <s.icon size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-3xl leading-tight">{s.title}</h3>
              <p className="text-warmgray text-sm">{s.desc}</p>
            </div>
            <div className="pt-4 flex items-center justify-between border-t border-ivory">
              <span className="text-[10px] font-bold uppercase text-charcoal">{s.count} Active Nodes</span>
              <ArrowRight size={20} className="text-warmgray group-hover:text-charcoal group-hover:translate-x-2 transition-all" />
            </div>
          </Link>
        ))}
      </div>

      <section className="bg-charcoal text-white rounded-[64px] p-16 relative overflow-hidden group shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-8">
          <div className="flex items-center gap-3 text-sage">
            <Zap size={24} className="fill-sage" />
            <h2 className="font-serif text-5xl">Neural Matching.</h2>
          </div>
          <p className="text-white/40 text-lg leading-relaxed">
            Our Strategy Agent analyzes your "Aesthetic Drift" and suggests retouching packages and cinematographers to correct specific palette deviations for your upcoming SS25 campaigns.
          </p>
          <button className="px-12 py-6 bg-sage text-white rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
            Start Neural Discovery
          </button>
        </div>
        <div className="absolute -right-20 -bottom-20 h-96 w-96 bg-sage/10 rounded-full blur-[120px] group-hover:bg-sage/20 transition-all duration-1000" />
      </section>
    </div>
  );
};

export default ServiceMarketplace;