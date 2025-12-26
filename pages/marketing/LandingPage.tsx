import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, ShieldCheck, Target, Camera, Globe, ChevronRight } from 'lucide-react';
import SEO from '../../components/SEO';

const LandingPage: React.FC = () => {
  const categories = [
    { name: 'Beauty', path: '/sponsors/beauty', desc: 'Neural fragrance audits.' },
    { name: 'Automotive', path: '/sponsors/automotive', desc: 'Bespoke design fusion.' },
    { name: 'Jewelry', path: '/sponsors/jewelry', desc: 'High-fidelity macro scans.' },
    { name: 'Finance', path: '/sponsors/finance', desc: 'Maison equity hedging.' },
    { name: 'Travel', path: '/sponsors/travel', desc: 'Grounded venue sourcing.' },
    { name: 'Tech', path: '/sponsors/technology', desc: 'System node hardware.' }
  ];

  return (
    <div className="animate-in fade-in duration-1000">
      <SEO 
        title="The Neural Maison Partner" 
        description="FashionOS is the world's most advanced operating system for luxury fashion, powered by Gemini 3 and Veo 3.1."
      />
      
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden border-b border-[#E5E1D8]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center grayscale opacity-10" />
        <div className="relative z-10 text-center space-y-12 px-6">
          <div className="flex justify-center items-center gap-3 animate-in slide-in-from-top-4 duration-700">
            <Sparkles size={24} className="text-sage" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-sage">Grounded with Gemini 3.0</span>
          </div>
          <h1 className="font-serif text-7xl md:text-9xl tracking-tighter leading-none animate-in fade-in duration-1000">
            The Soul of<br />Luxury, <span className="italic">Neural.</span>
          </h1>
          <p className="text-warmgray text-lg md:text-xl max-w-2xl mx-auto leading-relaxed animate-in slide-in-from-bottom-4 duration-700 delay-300">
            FashionOS bridges heritage craftsmanship with cutting-edge intelligence to orchestrate productions, audit brand DNA, and simulate global reach.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8 animate-in slide-in-from-bottom-8 duration-700 delay-500">
            <Link to="/dashboard" className="px-12 py-6 bg-charcoal text-white rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-2xl flex items-center gap-3">
              Enter Maison Terminal <ArrowRight size={20} />
            </Link>
            <Link to="/demo" className="px-12 py-6 bg-white border border-[#E5E1D8] text-charcoal rounded-full text-sm font-bold uppercase tracking-widest hover:bg-ivory transition-all">
              Request Diagnostic
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-32 px-8 md:px-16 max-w-7xl mx-auto space-y-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div className="space-y-8 text-center md:text-left">
            <div className="h-16 w-16 bg-ivory rounded-3xl flex items-center justify-center text-sage shadow-inner border border-[#E5E1D8] mx-auto md:mx-0">
              <ShieldCheck size={32} />
            </div>
            <h2 className="font-serif text-5xl tracking-tight">The Guardian Agent</h2>
            <p className="text-warmgray text-lg leading-relaxed">
              Real-time aesthetic compliance audits. Our vision-native agent scans every pixel of your production to ensure 100% alignment with your brand's digital DNA pillars.
            </p>
            <ul className="space-y-4">
              {['Color Palette Verification', 'Silhouette Integrity Audit', 'Atmospheric Lighting Matching'].map(f => (
                <li key={f} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest justify-center md:justify-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-sage" /> {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="aspect-square bg-charcoal rounded-[64px] overflow-hidden relative group shadow-2xl">
            <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-[2s]" alt="Guardian" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-transparent opacity-60" />
            <div className="absolute bottom-12 left-12 right-12 p-8 glass rounded-[32px] border-white/20">
               <p className="text-white text-sm italic">"System detected 2.1% drift in Milan SS25 captures. Corrective lighting suggested."</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: 'Omnichannel Simulation', icon: Globe, desc: 'Predict reach and engagement across Instagram, TikTok, and Pinterest before you publish.' },
            { title: 'Cinematic Pre-Viz', icon: Camera, desc: 'Generate mood films via Veo 3.1 Fast to align your crew before they even set foot on location.' },
            { title: 'Strategic Grounding', icon: Zap, desc: 'Real-time market signals verified via Google Search to pivot your production strategy instantly.' }
          ].map((item, i) => (
            <div key={i} className="p-12 bg-white border border-[#E5E1D8] rounded-[48px] space-y-6 hover:shadow-2xl transition-all group shadow-sm">
              <div className="h-14 w-14 bg-ivory rounded-2xl flex items-center justify-center text-charcoal group-hover:bg-charcoal group-hover:text-white transition-colors">
                <item.icon size={24} />
              </div>
              <h3 className="font-serif text-3xl">{item.title}</h3>
              <p className="text-warmgray text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The Global Grid - New section for deep links */}
      <section className="bg-white border-y border-[#E5E1D8] py-32 px-8 md:px-16">
        <div className="max-w-7xl mx-auto space-y-24">
           <div className="text-center space-y-6">
              <h2 className="font-serif text-5xl md:text-6xl tracking-tight leading-none">The Neural Grid.</h2>
              <p className="text-warmgray max-w-md mx-auto">Explore high-fidelity partnership verticals across the Maison ecosystem.</p>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.map((cat) => (
                <Link key={cat.name} to={cat.path} className="group p-8 bg-ivory border border-[#E5E1D8] rounded-[32px] hover:border-charcoal transition-all space-y-3">
                   <h4 className="text-[10px] font-bold uppercase tracking-widest text-charcoal flex items-center justify-between">
                     {cat.name} <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                   </h4>
                   <p className="text-[11px] text-warmgray italic leading-tight">{cat.desc}</p>
                </Link>
              ))}
           </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-charcoal text-white py-32 px-8 md:px-16 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-24 text-center">
          <div className="space-y-6">
            <h2 className="font-serif text-5xl md:text-6xl">Trusted by the Global Grid.</h2>
            <p className="text-white/40 uppercase text-[10px] font-bold tracking-[0.5em]">Synchronized with Tier-1 Maisons</p>
          </div>
          <div className="flex flex-wrap justify-center gap-12 md:gap-32 opacity-20 grayscale hover:grayscale-0 transition-all duration-1000">
             <span className="font-serif text-3xl italic tracking-tighter">L'Artisan Paris</span>
             <span className="font-serif text-3xl italic tracking-tighter">Milan Heritage</span>
             <span className="font-serif text-3xl italic tracking-tighter">Tokyo Avant</span>
             <span className="font-serif text-3xl italic tracking-tighter">Desert Noir</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-8 md:px-16 text-center">
        <div className="max-w-4xl mx-auto p-16 bg-sage/10 border border-sage/20 rounded-[64px] space-y-10">
          <h2 className="font-serif text-6xl tracking-tighter leading-tight">Ready to architect your Maison's future?</h2>
          <Link to="/brand/intake" className="inline-flex items-center gap-4 px-12 py-6 bg-charcoal text-white rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
            Begin Neural Intake <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;