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
          <div className="flex justify-center items-center gap-8 pt-8 opacity-40 grayscale text-[9px] font-bold uppercase tracking-widest">
            <div className="flex items-center gap-2">✓ WEB</div>
            <div className="flex items-center gap-2">✓ SOCIAL</div>
            <div className="flex items-center gap-2">✓ SHOPIFY</div>
            <div className="flex items-center gap-2">✓ AMAZON</div>
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="py-24 px-8 bg-white border-b border-[#E5E1D8]">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
             <h2 className="font-serif text-5xl tracking-tight leading-none">Stop Reinventing Your Brand Every Time</h2>
             <p className="text-warmgray max-w-lg mx-auto">Most brands waste 60% of their creative budget on duplicate work. FashionOS fixes this by creating permanent brand intelligence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="p-10 bg-ivory rounded-[40px] space-y-6">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-warmgray mb-8">Without FashionOS</h4>
              <ul className="space-y-6">
                {[
                  "Re-explaining your brand to every new vendor",
                  "4 separate shoots for 4 separate channels",
                  "Manual product uploads to Shopify and Amazon",
                  "Guessing what content actually drives sales"
                ].map(item => (
                  <li key={item} className="flex items-start gap-4 text-sm font-medium text-warmgray">
                    <XCircle size={18} className="text-rose-400 mt-0.5 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-10 bg-charcoal text-white rounded-[40px] space-y-6 shadow-2xl relative overflow-hidden">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-sage mb-8">With FashionOS</h4>
              <ul className="space-y-6 relative z-10">
                {[
                  "Brand DNA stored permanently for all AI agents",
                  "One shoot, auto-routed to every channel",
                  "Sync once, update your entire catalog automatically",
                  "AI learns from performance to improve results"
                ].map(item => (
                  <li key={item} className="flex items-start gap-4 text-sm font-medium text-white/80">
                    <CheckCircle2 size={18} className="text-sage mt-0.5 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <div className="absolute -right-20 -bottom-20 h-64 w-64 bg-sage/10 rounded-full blur-[100px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Features */}
      <section className="py-32 px-8 md:px-16 max-w-7xl mx-auto space-y-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div className="space-y-8 text-center md:text-left">
            <div className="h-16 w-16 bg-ivory rounded-3xl flex items-center justify-center text-sage shadow-inner border border-[#E5E1D8] mx-auto md:mx-0">
              <BrainCircuit size={32} />
            </div>
            <h2 className="font-serif text-5xl tracking-tight">Your Brand DNA,<br /><span className="italic">Stored Forever.</span></h2>
            <p className="text-warmgray text-lg leading-relaxed">
              Complete a 5-minute brand profile once. FashionOS analyzes your website, social presence, and positioning—then remembers it forever. No more manual briefing; your context lives in the system.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div className="space-y-1">
                 <p className="text-3xl font-serif">95%</p>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-warmgray">Time Saved on Briefs</p>
              </div>
              <div className="space-y-1">
                 <p className="text-3xl font-serif">30s</p>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-warmgray">AI Analysis Velocity</p>
              </div>
            </div>
          </div>
          <div className="aspect-square bg-charcoal rounded-[64px] overflow-hidden relative group shadow-2xl">
            <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-[2s]" alt="Guardian" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-transparent opacity-60" />
            <div className="absolute bottom-12 left-12 right-12 p-8 glass rounded-[32px] border-white/20">
               <p className="text-white text-sm italic">"System context loaded: Sustainable Silk + Parisian Minimalism. Applying rules to all channels."</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { 
              title: 'Auto-Route Every Asset', 
              icon: LayoutGrid, 
              desc: 'One shoot powers everything. AI knows square for IG, vertical for TikTok, and pure white for Shopify.' 
            },
            { 
              title: 'Cinematic Strategy', 
              icon: Camera, 
              desc: 'Generate mood films and technical briefs automatically to align your crew before they arrive on set.' 
            },
            { 
              title: 'Performance Learning', 
              icon: BarChart3, 
              desc: 'AI tracks which assets convert and improves future shot list recommendations based on your real sales data.' 
            }
          ].map((item, i) => (
            <div key={i} className="p-12 bg-white border border-[#E5E1D8] rounded-[48px] space-y-6 hover:shadow-2xl transition-all group shadow-sm">
              <div className="h-14 w-14 bg-ivory rounded-2xl flex items-center justify-center text-charcoal group-hover:bg-charcoal group-hover:text-white transition-colors">
                <item.icon size={24} />
              </div>
              <h3 className="font-serif text-3xl leading-tight">{item.title}</h3>
              <p className="text-warmgray text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-ivory border-y border-[#E5E1D8] py-32 px-8 md:px-16 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-24">
           <div className="text-center space-y-6">
              <h2 className="font-serif text-5xl md:text-6xl tracking-tight leading-none">High-Fidelity in 3 Steps.</h2>
              <p className="text-warmgray max-w-md mx-auto">From brand setup to multi-channel success without the friction.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { s: '01', t: 'Create Your Profile', d: 'Connect your URL. AI reads your aesthetic and creates your DNA in 30 seconds.' },
                { s: '02', t: 'Plan Your Shoot', d: 'Your photographer gets an AI brief with all technical specs, brand rules, and required shots.' },
                { s: '03', t: 'AI Routes Everything', d: 'Upload assets. AI tags products, generates copy, and routes content to all channels.' }
              ].map(step => (
                <div key={step.s} className="p-10 bg-white border border-[#E5E1D8] rounded-[40px] space-y-6 group hover:border-charcoal transition-all">
                  <span className="text-5xl font-serif text-sage/20 group-hover:text-sage transition-colors leading-none">{step.s}</span>
                  <h4 className="font-serif text-3xl leading-tight">{step.t}</h4>
                  <p className="text-warmgray text-sm leading-relaxed">{step.d}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* The Global Grid */}
      <section className="bg-white py-32 px-8 md:px-16">
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

      {/* Final CTA */}
      <section className="py-32 px-8 md:px-16 text-center">
        <div className="max-w-4xl mx-auto p-20 bg-charcoal text-white rounded-[64px] space-y-10 relative overflow-hidden shadow-2xl">
          <h2 className="font-serif text-6xl tracking-tighter leading-tight relative z-10">Your Brand Deserves a System, Not Chaos.</h2>
          <p className="text-white/40 max-w-md mx-auto relative z-10">Join the brands using FashionOS to turn one photoshoot into multi-channel success.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8 relative z-10">
            <Link to="/brand/intake" className="inline-flex items-center gap-4 px-12 py-6 bg-sage text-white rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
              Start Free Profile <ArrowRight size={20} />
            </Link>
            <Link to="/demo" className="inline-flex items-center gap-4 px-12 py-6 bg-white/10 backdrop-blur border border-white/20 text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white/20 transition-all">
              Schedule a Demo
            </Link>
          </div>
          <p className="text-[8px] font-bold uppercase tracking-[0.5em] text-white/20 relative z-10">Free Forever • No Credit Card Required • GDPR Compliant</p>
          <div className="absolute -left-20 -bottom-20 h-96 w-96 bg-sage/5 rounded-full blur-[120px]" />
        </div>
      </section>
    </div>
  );
};

export default LandingPage;