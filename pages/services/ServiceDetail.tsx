import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, ShieldCheck, Sparkles, Star, Zap, ShoppingBag } from 'lucide-react';
import SEO from '../../components/SEO';

const ServiceDetail: React.FC = () => {
  const { type, packageId } = useParams();
  
  return (
    <div className="animate-in fade-in duration-1000 p-8 md:p-16 max-w-7xl mx-auto space-y-16">
      <SEO title={`${packageId || 'Service'} Detail`} description="Detailed service specifications for Maison production." />
      
      <Link to="/services" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-warmgray hover:text-charcoal transition-colors">
        <ArrowLeft size={14} /> Back to Marketplace
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="space-y-12">
          <header className="space-y-4">
            <div className="flex items-center gap-3 text-sage">
              <Star size={20} className="fill-sage" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Premier Artisan Node</span>
            </div>
            <h1 className="font-serif text-6xl tracking-tighter leading-none">Studio Edit v4.</h1>
            <p className="text-warmgray text-xl leading-relaxed">High-fidelity retouching and color-grading optimized for the "Silent Curator" persona.</p>
          </header>

          <div className="space-y-8">
            <h3 className="text-[10px] uppercase font-bold tracking-widest text-charcoal">Neural Capabilities</h3>
            <ul className="space-y-6">
              {[
                { t: 'DNA Consistency Scan', d: 'Guardian-verified color matching for heritage silk.' },
                { t: 'Subliminal Grain Audit', d: 'Noise profile balancing for high-HNW conversion.' },
                { t: 'Omnichannel Resizing', d: 'Auto-mapped ratios for IG, TikTok, and Amazon.' }
              ].map(feat => (
                <li key={feat.t} className="flex gap-4">
                   <div className="h-6 w-6 rounded-full bg-sage/10 flex items-center justify-center flex-shrink-0 text-sage"><Check size={14}/></div>
                   <div>
                      <p className="text-sm font-bold uppercase tracking-tight">{feat.t}</p>
                      <p className="text-sm text-warmgray">{feat.d}</p>
                   </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white border border-[#E5E1D8] rounded-[64px] p-12 space-y-10 shadow-2xl relative overflow-hidden">
          <div className="space-y-2">
            <p className="text-[10px] uppercase font-bold text-warmgray tracking-widest">Investment</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-serif">€2,400</span>
              <span className="text-sm text-warmgray font-medium italic">/ 20 Assets</span>
            </div>
          </div>

          <div className="p-8 bg-ivory rounded-3xl border border-[#E5E1D8] space-y-6">
             <div className="flex items-center gap-3 text-sage">
                <ShieldCheck size={20} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Aesthetic Guarantee</span>
             </div>
             <p className="text-xs text-warmgray leading-relaxed italic">"This node maintains a 98.4% DNA match history with L'Artisan Paris production baselines."</p>
          </div>

          <button className="w-full py-6 bg-charcoal text-white rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-3">
            <ShoppingBag size={20} /> Book Production Slot
          </button>
          
          <div className="absolute -left-10 -bottom-10 h-48 w-48 bg-sage/5 rounded-full blur-[60px]" />
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;