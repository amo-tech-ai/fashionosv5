import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, ShieldCheck, Target, Camera, Globe, ChevronRight, BrainCircuit, LayoutGrid, BarChart3, CheckCircle2, XCircle } from 'lucide-react';
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
        title="One Brand Profile. Every Channel Covered." 
        description="FashionOS creates permanent AI context for your brand, then routes one photoshoot to your website, social media, and ecommerce automatically."
      />
      
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden border-b border-[#E5E1D8]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center grayscale opacity-10" />
        <div className="relative z-10 text-center space-y-10 px-6">
          <div className="flex justify-center items-center gap-3 animate-in slide-in-from-top-4 duration-700">
            <Sparkles size={24} className="text-sage" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-sage">The Operating System for Fashion Brands</span>
          </div>
          <h1 className="font-serif text-6xl md:text-8xl tracking-tighter leading-[0.9] animate-in fade-in duration-1000 max-w-5xl mx-auto">
            One Brand Profile.<br /><span className="italic">Every Channel Covered.</span>
          </h1>
          <p className="text-warmgray text-lg md:text-xl max-w-2xl mx-auto leading-relaxed animate-in slide-in-from-bottom-4 duration-700 delay-300">
            FashionOS creates permanent AI context for your brand, then routes one photoshoot to your website, social media, ecommerce, and wholesale catalog—automatically.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4 animate-in slide-in-from-bottom-8 duration-700 delay-500">
            <Link to="/brand/intake" className="px-12 py-6 bg-charcoal text-white rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-2xl flex items-center gap-3">
              Create Brand Profile <ArrowRight size={20} />
            </Link>
            <Link to="/demo" className="px-12 py-6 bg-white border border-[#E5E1D8] text-charcoal rounded-full text-sm font-bold uppercase tracking-widest hover:bg-ivory transition-all">
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Logic components omitted for brevity, keeping existing structure */}
      <section className="py-24 px-8 bg-white border-b border-[#E5E1D8]">
        <div className="max-w-6xl mx-auto text-center">
           <h2 className="font-serif text-5xl tracking-tight leading-none mb-12">Stop Reinventing Your Brand Every Time</h2>
           <p className="text-warmgray max-w-lg mx-auto mb-16 italic">"Neural preservation is the key to heritage longevity in a digital-first era."</p>
           
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
    </div>
  );
};

export default LandingPage;