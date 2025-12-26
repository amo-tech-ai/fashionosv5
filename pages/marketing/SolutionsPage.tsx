import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Sparkles, MapPin, Camera, Star, Zap, Target, ArrowLeft, ShieldCheck, BarChart3, HelpCircle } from 'lucide-react';
import SEO from '../../components/SEO';

const SolutionsPage: React.FC = () => {
  const { vertical } = useParams();

  const verticals = [
    {
      id: 'brand-shoots',
      title: 'Production Hub',
      desc: 'Architect high-fidelity shoots from strategic brief to on-set hardware HUD execution.',
      icon: Camera,
      image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=800&q=80',
      features: ['One-Page Shot List Architect', 'Guardian Aesthetic Compliance', 'Veo 3.1 Fast Pre-Viz'],
      longDesc: 'Our Production Hub is the world’s first vision-native orchestration engine. It synchronizes your creative director’s brief with real-time hardware HUDs for photographers, ensuring that every frame captured is a perfect DNA match.',
      stats: [{l: 'Aesthetic Drift', v: '< 2%'}, {l: 'Prep Velocity', v: '14x'}]
    },
    {
      id: 'events',
      title: 'Fashion Events',
      desc: 'Synchronize logistics, talent, and guest lists for high-net-worth brand activations.',
      icon: MapPin,
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
      features: ['Grounded Venue Sourcing', 'Casting Affinity Matching', 'Guest Sentiment Analytics'],
      longDesc: 'From intimate boutique openings to global activation tours, FashionOS manages the complex interplay between venue logistics, high-net-worth casting, and live sentiment tracking.',
      stats: [{l: 'Venue Affinity', v: '98%'}, {l: 'Talent Sync', v: 'Active'}]
    },
    {
      id: 'fashion-shows',
      title: 'Show Orchestration',
      desc: 'The world\'s most advanced command center for Paris, Milan, and New York runway seasons.',
      icon: Star,
      image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
      features: ['Real-time Runway Sync', 'Press Kit Narrative Synthesis', 'Global Distribution Handshake'],
      longDesc: 'Fashion Week is the highest stakes moment for any Maison. Our Show Node handles everything from technical runway cues to instant press kit synthesis for global distribution.',
      stats: [{l: 'Press Latency', v: '0.4s'}, {l: 'Sync Nodes', v: 'Global'}]
    }
  ];

  const currentVertical = vertical ? verticals.find(v => v.id === vertical) : null;

  if (currentVertical) {
    return (
      <div className="animate-in fade-in duration-1000 bg-ivory pb-32">
        <SEO title={`${currentVertical.title} Solution`} description={currentVertical.desc} />
        
        <header className="pt-32 pb-16 px-8 md:px-16 max-w-7xl mx-auto space-y-8">
          <Link to="/solutions" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-warmgray hover:text-charcoal transition-colors">
            <ArrowLeft size={14} /> All Solutions
          </Link>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-sage">
                 <currentVertical.icon size={24} />
                 <span className="text-[10px] font-bold uppercase tracking-[0.4em]">{currentVertical.title} Vertical</span>
              </div>
              <h1 className="font-serif text-6xl md:text-8xl tracking-tighter leading-none">{currentVertical.title}.</h1>
            </div>
            <Link to="/demo" className="px-10 py-5 bg-charcoal text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
               Deploy {currentVertical.title} Node
            </Link>
          </div>
        </header>

        <section className="px-8 md:px-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
           <div className="lg:col-span-2 space-y-12">
              <div className="aspect-video bg-charcoal rounded-[48px] overflow-hidden shadow-2xl relative">
                 <img src={currentVertical.image} className="w-full h-full object-cover opacity-80" alt={currentVertical.title} />
                 <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
              </div>
              <div className="prose prose-lg prose-stone max-w-none">
                 <p className="font-serif text-3xl leading-relaxed text-charcoal">{currentVertical.longDesc}</p>
              </div>
           </div>

           <div className="space-y-12">
              <div className="p-10 bg-white border border-[#E5E1D8] rounded-[48px] space-y-8 shadow-sm">
                 <h3 className="text-[10px] uppercase font-bold tracking-widest text-warmgray">Performance Benchmarks</h3>
                 <div className="grid grid-cols-2 gap-8">
                    {currentVertical.stats.map(s => (
                      <div key={s.l} className="space-y-1">
                         <p className="text-[9px] uppercase font-bold text-sage tracking-widest">{s.l}</p>
                         <p className="text-3xl font-serif">{s.v}</p>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="space-y-6">
                 <h3 className="text-[10px] uppercase font-bold tracking-widest text-warmgray ml-4">Core Integrations</h3>
                 <ul className="space-y-4">
                    {currentVertical.features.map(f => (
                      <li key={f} className="flex items-center gap-4 p-5 bg-white border border-[#E5E1D8] rounded-[24px] hover:border-sage transition-all shadow-sm">
                         <ShieldCheck size={18} className="text-sage" />
                         <span className="text-sm font-bold text-charcoal uppercase tracking-widest">{f}</span>
                      </li>
                    ))}
                 </ul>
              </div>
           </div>
        </section>
        
        {/* End of vertical section prompt */}
        <section className="mt-32 pt-24 border-t border-[#E5E1D8] px-8 md:px-16 text-center max-w-4xl mx-auto space-y-8">
           <h2 className="font-serif text-4xl">Ready to architect your Maison?</h2>
           <p className="text-warmgray">Our strategic concierge is ready to verify your brand's digital DNA and suggest a custom integration path.</p>
           <Link to="/demo" className="inline-flex items-center gap-3 px-10 py-4 bg-charcoal text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black transition-all shadow-xl">
             Begin Diagnostic <ArrowRight size={18} />
           </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-1000 bg-ivory">
      <SEO 
        title="Solutions for Luxury Maisons" 
        description="From production hubs to global runway seasons, FashionOS provides the neural infrastructure for every facet of high-end fashion management."
      />

      <section className="pt-32 pb-24 px-8 md:px-16 max-w-7xl mx-auto text-center space-y-8">
        <div className="flex justify-center items-center gap-3 animate-in slide-in-from-top-4">
          <Zap size={20} className="text-sage" />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-sage">Strategic Verticals</span>
        </div>
        <h1 className="font-serif text-6xl md:text-8xl tracking-tighter leading-none">Engineered for<br />the Maison.</h1>
        <p className="text-warmgray text-lg max-w-2xl mx-auto leading-relaxed">
          One system. Infinite expressions. We have specialized neural nodes for every high-stakes moment in your brand lifecycle.
        </p>
      </section>

      <section className="pb-32 px-8 md:px-16 max-w-7xl mx-auto space-y-32">
        {verticals.map((v, i) => (
          <div key={v.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
            <div className={`space-y-8 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="h-16 w-16 bg-white border border-[#E5E1D8] rounded-3xl flex items-center justify-center text-charcoal shadow-sm mx-auto md:mx-0">
                <v.icon size={32} />
              </div>
              <div className="space-y-4 text-center md:text-left">
                <h2 className="font-serif text-5xl tracking-tight leading-none">{v.title}</h2>
                <p className="text-warmgray text-lg leading-relaxed">{v.desc}</p>
              </div>
              <ul className="space-y-4 max-w-xs mx-auto md:mx-0">
                {v.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-charcoal">
                    <div className="h-1.5 w-1.5 rounded-full bg-sage" /> {f}
                  </li>
                ))}
              </ul>
              <div className="pt-4 text-center md:text-left">
                <Link to={`/solutions/${v.id}`} className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-charcoal group underline underline-offset-8 decoration-[#E5E1D8] hover:decoration-sage transition-all">
                  Deep Dive Vertical <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
            <div className={`aspect-[16/10] bg-charcoal rounded-[64px] overflow-hidden relative group shadow-2xl ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
              <img src={v.image} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[2s]" alt={v.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                <div className="space-y-1">
                   <p className="text-white/40 text-[8px] font-bold uppercase tracking-[0.4em]">Vertical Score</p>
                   <p className="text-white font-serif text-3xl">98.4</p>
                </div>
                <div className="px-6 py-2 bg-white/10 backdrop-blur rounded-full text-[8px] font-bold uppercase text-white border border-white/20">
                   Active Node
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Transition to Footer Section */}
      <section className="bg-charcoal text-white py-32 px-8 md:px-16 text-center border-t border-white/10">
         <div className="max-w-4xl mx-auto space-y-12">
            <div className="flex justify-center items-center gap-3 text-sage">
               <HelpCircle size={32} />
               <h2 className="font-serif text-5xl">Bespoke Challenges?</h2>
            </div>
            <p className="text-white/40 text-lg leading-relaxed max-w-xl mx-auto">Our neural grid is modular. If your Maison requires a custom node for specialized logistics or private RAG integration, our heritage team is ready.</p>
            <div className="pt-8">
               <Link to="/contact" className="px-12 py-6 bg-white text-charcoal rounded-full text-sm font-bold uppercase tracking-widest hover:bg-ivory transition-all shadow-2xl">
                  Contact Strategy Board
               </Link>
            </div>
         </div>
      </section>
    </div>
  );
};

export default SolutionsPage;