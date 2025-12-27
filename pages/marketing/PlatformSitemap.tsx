import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Layout, Fingerprint, BrainCircuit, 
  Camera, Box, ClipboardList, Calendar, Image, 
  BarChart3, ShieldCheck, Zap, MessageSquare, 
  Star, MapPin, ShoppingBag, Globe, Sparkles 
} from 'lucide-react';
import SEO from '../../components/SEO';

const FeatureCard = ({ icon: Icon, title, desc, link }: { icon: any, title: string, desc: string, link: string }) => (
  <Link to={link} className="group p-10 bg-white border border-[#E5E1D8] rounded-[48px] space-y-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
    <div className="h-14 w-14 bg-ivory rounded-2xl flex items-center justify-center text-charcoal group-hover:bg-charcoal group-hover:text-white transition-colors">
      <Icon size={24} />
    </div>
    <div className="space-y-2">
      <h3 className="font-serif text-2xl group-hover:text-sage transition-colors">{title}</h3>
      <p className="text-warmgray text-sm leading-relaxed">{desc}</p>
    </div>
    <div className="pt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-charcoal group-hover:gap-4 transition-all">
      Deep Dive <ArrowRight size={14} />
    </div>
  </Link>
);

const SectionHeader = ({ label, title }: { label: string, title: string }) => (
  <div className="space-y-4 mb-12">
    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-sage">{label}</span>
    <h2 className="font-serif text-5xl tracking-tight">{title}</h2>
  </div>
);

const PlatformSitemap: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-1000 bg-ivory pb-32">
      <SEO 
        title="Platform Overview" 
        description="Explore the FashionOS ecosystem. Everything you need to design, produce, and scale a fashion brand in one unified system."
      />

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-8 md:px-16 max-w-7xl mx-auto text-center space-y-10">
        <div className="flex justify-center items-center gap-3">
          <Sparkles size={20} className="text-sage" />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-sage">The System Architecture</span>
        </div>
        <h1 className="font-serif text-6xl md:text-8xl tracking-tighter leading-none max-w-5xl mx-auto">
          Explore the <span className="italic">FashionOS</span> Platform.
        </h1>
        <p className="text-warmgray text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Everything you need to design, produce, and scale a fashion brand — in one system. Outcomes focused, human centered, neural powered.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
          <Link to="/demo" className="px-12 py-6 bg-charcoal text-white rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
            Request Demo
          </Link>
          <Link to="/pricing" className="px-12 py-6 bg-white border border-[#E5E1D8] text-charcoal rounded-full text-sm font-bold uppercase tracking-widest hover:bg-ivory transition-all">
            View Pricing
          </Link>
        </div>
      </section>

      {/* SECTION A — Core Platform */}
      <section className="py-24 px-8 md:px-16 max-w-7xl mx-auto">
        <SectionHeader label="Intelligence Foundations" title="Core Platform" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Layout} 
            title="Dashboard" 
            desc="Your command center for brand performance and momentum." 
            link="/dashboard" 
          />
          <FeatureCard 
            icon={Fingerprint} 
            title="Brand Identity" 
            desc="Define your brand DNA, personas, and visual standards." 
            link="/features" 
          />
          <FeatureCard 
            icon={BrainCircuit} 
            title="AI Intelligence" 
            desc="Strategic insights, trend detection, and brand safety." 
            link="/features" 
          />
        </div>
      </section>

      {/* SECTION B — Production & Shoots */}
      <section className="py-24 px-8 md:px-16 max-w-7xl mx-auto border-t border-[#E5E1D8]">
        <SectionHeader label="Maison Execution" title="Production & Shoots" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Camera} 
            title="Shoot Planning" 
            desc="Turn creative ideas into professional photo & video shoots." 
            link="/solutions/brand-shoots" 
          />
          <FeatureCard 
            icon={Box} 
            title="Production Hub" 
            desc="Manage shoots, briefs, and creative teams in one place." 
            link="/shoots" 
          />
          <FeatureCard 
            icon={ClipboardList} 
            title="Creative Briefs" 
            desc="Clear one-page instructions for photographers and crews." 
            link="/shoots" 
          />
        </div>
      </section>

      {/* SECTION C — Distribution & Growth */}
      <section className="py-24 px-8 md:px-16 max-w-7xl mx-auto border-t border-[#E5E1D8]">
        <SectionHeader label="Global Reach" title="Distribution & Growth" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Calendar} 
            title="Content Calendar" 
            desc="Plan and schedule content across all channels." 
            link="/dashboard" 
          />
          <FeatureCard 
            icon={Image} 
            title="Media Library" 
            desc="Store, review, and reuse creative assets." 
            link="/media" 
          />
          <FeatureCard 
            icon={BarChart3} 
            title="Analytics & Insights" 
            desc="See what performs and why across the ecosystem." 
            link="/dashboard" 
          />
        </div>
      </section>

      {/* SECTION D — AI & Brand Safety */}
      <section className="py-24 px-8 md:px-16 max-w-7xl mx-auto border-t border-[#E5E1D8]">
        <SectionHeader label="DNA Preservation" title="AI & Brand Safety" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={ShieldCheck} 
            title="Brand Safety" 
            desc="Ensure every image matches your brand DNA perfectly." 
            link="/features" 
          />
          <FeatureCard 
            icon={Zap} 
            title="Trend Intelligence" 
            desc="Spot opportunities before they hit the mainstream." 
            link="/features" 
          />
          <FeatureCard 
            icon={MessageSquare} 
            title="AI Concierge" 
            desc="Your always-on strategic assistant for production." 
            link="/chat" 
          />
        </div>
      </section>

      {/* SECTION E — Solutions */}
      <section className="py-24 px-8 md:px-16 max-w-7xl mx-auto border-t border-[#E5E1D8]">
        <SectionHeader label="Specialized Vertical Nodes" title="Global Solutions" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            { icon: Star, name: 'Fashion Shows', path: '/solutions/fashion-shows' },
            { icon: Camera, name: 'Brand Shoots', path: '/solutions/brand-shoots' },
            { icon: MapPin, name: 'Events', path: '/solutions/events' },
            { icon: ShoppingBag, name: 'Commerce', path: '/solutions' },
            { icon: Globe, name: 'Sponsors', path: '/sponsors' }
          ].map((sol) => (
            <Link key={sol.name} to={sol.path} className="group p-8 bg-white border border-[#E5E1D8] rounded-[32px] hover:border-charcoal transition-all text-center space-y-4 shadow-sm">
               <div className="mx-auto h-12 w-12 bg-ivory rounded-2xl flex items-center justify-center text-charcoal group-hover:bg-sage group-hover:text-white transition-all">
                  <sol.icon size={20} />
               </div>
               <span className="text-[10px] font-bold uppercase tracking-widest block">{sol.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-8 md:px-16 text-center">
        <div className="max-w-4xl mx-auto p-20 bg-charcoal text-white rounded-[64px] space-y-10 relative overflow-hidden shadow-2xl">
          <h2 className="font-serif text-6xl tracking-tighter leading-tight relative z-10">Ready to experience FashionOS?</h2>
          <p className="text-white/40 max-w-md mx-auto relative z-10">Join the world's most sophisticated Maisons and turn your brand DNA into a system.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8 relative z-10">
            <Link to="/demo" className="px-12 py-6 bg-sage text-white rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
              Request Demo
            </Link>
            <Link to="/pricing" className="px-12 py-6 bg-white/10 backdrop-blur border border-white/20 text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white/20 transition-all">
              View Pricing
            </Link>
            <Link to="/contact" className="px-12 py-6 border border-white/20 text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
              Contact Concierge
            </Link>
          </div>
          <div className="absolute -left-20 -bottom-20 h-96 w-96 bg-sage/5 rounded-full blur-[120px]" />
        </div>
      </section>
    </div>
  );
};

export default PlatformSitemap;