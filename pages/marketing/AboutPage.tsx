import React from 'react';
import { ShieldCheck, Globe, Users, Zap, ArrowRight, Sparkles, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';

const AboutPage: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-1000 bg-ivory">
      <SEO 
        title="Our Heritage & Vision" 
        description="FashionOS is the infrastructure for the next generation of luxury Maisons. Learn about our neural grid and ethical commitments."
      />

      {/* Narrative Hero */}
      <section className="pt-32 pb-24 px-8 md:px-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <div className="flex items-center gap-3 text-sage">
            <Sparkles size={20} />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">The Vision Node</span>
          </div>
          <h1 className="font-serif text-6xl md:text-8xl tracking-tighter leading-none">Architecting the<br /><span className="italic">Neural Maison.</span></h1>
          <p className="text-warmgray text-lg md:text-xl leading-relaxed max-w-lg">
            We believe the future of luxury isn't just craftsmanship—it's the synchronization of heritage data with predictive intelligence.
          </p>
        </div>
        <div className="aspect-[4/5] bg-charcoal rounded-[64px] overflow-hidden shadow-2xl relative group">
           <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Vision" />
           <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
        </div>
      </section>

      {/* The Pillars */}
      <section className="py-32 px-8 md:px-16 bg-white border-y border-[#E5E1D8]">
        <div className="max-w-7xl mx-auto space-y-24">
           <div className="text-center space-y-4">
              <h2 className="font-serif text-5xl">The Neural Grid Principles</h2>
              <p className="text-warmgray text-sm uppercase font-bold tracking-widest">Sovereignty • Intelligence • Integrity</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {[
                { title: 'Data Sovereignty', icon: ShieldCheck, desc: 'Every Maison owns its DNA. We use localized RAG to ensure your brand secrets never leak into the global model.' },
                { title: 'Cinematic Logic', icon: Zap, desc: 'We don’t just generate images; we simulate production physics. Our outputs are actionable briefs for human crews.' },
                { title: 'Global Handshake', icon: Globe, desc: 'Connecting Maisons to a verified grid of Tier-1 photographers, studios, and supply chain partners.' }
              ].map((p, i) => (
                <div key={i} className="space-y-6 text-center md:text-left">
                   <div className="h-14 w-14 bg-ivory rounded-2xl flex items-center justify-center mx-auto md:mx-0 text-charcoal">
                      <p.icon size={24} />
                   </div>
                   <h3 className="font-serif text-3xl">{p.title}</h3>
                   <p className="text-warmgray text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 px-8 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
           <div className="space-y-8">
              <h2 className="font-serif text-5xl">Engineered by Artisans.</h2>
              <p className="text-warmgray text-lg leading-relaxed">Our collective consists of former creative directors, data scientists from CERN, and production leads who have orchestrated over 500 global luxury campaigns.</p>
              <div className="pt-4 flex flex-wrap gap-8">
                 <div className="space-y-1">
                    <p className="text-3xl font-serif">14+</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-warmgray">Global Studios</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-3xl font-serif">98%</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-warmgray">DNA Compliance Rate</p>
                 </div>
              </div>
           </div>
           <div className="p-12 bg-charcoal rounded-[48px] text-white space-y-8 shadow-xl">
              <div className="flex items-center gap-3 text-sage">
                 <Target size={20} />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Our Mandate</span>
              </div>
              <p className="text-xl font-medium leading-relaxed italic">"To protect the artistic integrity of the Maison while granting it the computational speed of a global neural network."</p>
              <div className="h-px bg-white/10" />
              <div className="flex items-center gap-4">
                 <div className="h-12 w-12 rounded-full bg-white/10" />
                 <div>
                    <p className="text-sm font-bold">Maison Collective Board</p>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest">System Unit 01</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Final Ramp to Footer */}
      <section className="py-32 px-8 md:px-16 text-center bg-white border-t border-[#E5E1D8]">
         <div className="max-w-4xl mx-auto p-20 bg-charcoal text-white rounded-[64px] space-y-8 relative overflow-hidden shadow-2xl">
            <h2 className="font-serif text-5xl relative z-10">Join the Collective.</h2>
            <p className="text-white/40 max-w-md mx-auto relative z-10">We are currently accepting invitations for Tier-1 Maisons for the SS25 season.</p>
            <Link to="/demo" className="inline-flex items-center gap-4 px-12 py-6 bg-white text-charcoal rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition-all relative z-10 shadow-lg">
               Initialize Handshake <ArrowRight size={20} />
            </Link>
            <div className="absolute -left-20 -bottom-20 h-64 w-64 bg-sage/10 rounded-full blur-[100px]" />
         </div>
      </section>
    </div>
  );
};

export default AboutPage;