import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sparkles, ArrowRight, BarChart3, Globe, ShieldCheck, Zap, Loader2, ArrowLeft } from 'lucide-react';
import SEO from '../../components/SEO';
import { IntelligenceService } from '../../services/intelligence';

const SponsorCategoryPage: React.FC = () => {
  const { category } = useParams();
  const intelService = IntelligenceService.getInstance();
  const [isGrounding, setIsGrounding] = useState(true);
  const [marketStats, setMarketStats] = useState<any>(null);

  const categoryName = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Global';

  useEffect(() => {
    const fetchSectorData = async () => {
      setIsGrounding(true);
      try {
        const result = await intelService.verifyTrend(`${categoryName} luxury fashion partnership trends 2025`);
        setMarketStats(result);
      } catch (e) {
        console.error(e);
      } finally {
        setIsGrounding(false);
      }
    };
    fetchSectorData();
  }, [category]);

  return (
    <div className="animate-in fade-in duration-1000 p-8 md:p-16 max-w-7xl mx-auto space-y-16">
      <SEO 
        title={`${categoryName} Sponsorships`} 
        description={`Explore neural partnership opportunities in the ${categoryName} sector for high-fidelity fashion productions.`}
      />
      
      <header className="space-y-6">
        <Link to="/sponsors" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-warmgray hover:text-charcoal transition-colors">
          <ArrowLeft size={14} /> Back to Hub
        </Link>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sage">
              <Sparkles size={20} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Sector Vertical: {categoryName}</span>
            </div>
            <h2 className="font-serif text-6xl tracking-tighter">{categoryName} x Maison Fusion.</h2>
          </div>
          <button className="px-10 py-4 bg-charcoal text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
            Request Partnership Brief
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Grounded Market Analysis */}
          <section className="bg-white border border-[#E5E1D8] rounded-[48px] p-12 space-y-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-ivory pb-8">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-ivory rounded-2xl flex items-center justify-center text-charcoal">
                  <Globe size={24} />
                </div>
                <h3 className="font-serif text-3xl">Grounded Market Signals</h3>
              </div>
              {isGrounding && (
                <div className="flex items-center gap-2 text-sage animate-pulse">
                  <Loader2 size={14} className="animate-spin" />
                  <span className="text-[10px] font-bold uppercase">Syncing Live Nodes...</span>
                </div>
              )}
            </div>

            <div className="prose prose-sm prose-stone max-w-none">
               <p className="text-warmgray text-lg leading-relaxed italic">
                 {isGrounding ? "Synthesizing sector-specific intelligence..." : marketStats?.text}
               </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8">
               {[
                 { l: 'Affinity Score', v: '94.2%', c: 'text-sage' },
                 { l: 'Growth Velocity', v: '2.4x', c: 'text-charcoal' },
                 { l: 'ROI Potential', v: '+18%', c: 'text-sage' }
               ].map(stat => (
                 <div key={stat.l} className="space-y-1">
                    <p className="text-[9px] uppercase font-bold text-warmgray tracking-widest">{stat.l}</p>
                    <p className={`text-3xl font-serif ${stat.c}`}>{stat.v}</p>
                 </div>
               ))}
            </div>
          </section>

          {/* Active Proposals */}
          <section className="space-y-8">
             <h3 className="font-serif text-3xl">Active Proposals</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2].map(i => (
                  <div key={i} className="bg-charcoal text-white rounded-[40px] p-10 space-y-6 relative overflow-hidden group">
                     <div className="relative z-10 space-y-4">
                        <div className="px-3 py-1 bg-white/10 rounded-full text-[8px] font-bold uppercase tracking-widest inline-block border border-white/10">High Impact</div>
                        <h4 className="font-serif text-2xl">The {categoryName} Edit v{i}</h4>
                        <p className="text-white/40 text-sm leading-relaxed">Strategic placement in SS25 campaign focusing on {categoryName} enthusiasts.</p>
                        <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-sage hover:text-white transition-colors">
                          Review Logic <ArrowRight size={14} />
                        </button>
                     </div>
                     <div className="absolute -right-20 -bottom-20 h-64 w-64 bg-sage/10 rounded-full blur-[80px] group-hover:bg-sage/20 transition-all duration-1000" />
                  </div>
                ))}
             </div>
          </section>
        </div>

        <aside className="space-y-12">
          <div className="bg-ivory border border-[#E5E1D8] rounded-[40px] p-8 space-y-8 shadow-sm">
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-warmgray">Sector Radar</h4>
            <div className="aspect-square relative flex items-center justify-center">
              <div className="absolute inset-0 border border-warmgray/10 rounded-full scale-100" />
              <div className="absolute inset-0 border border-warmgray/10 rounded-full scale-[0.66]" />
              <div className="absolute inset-0 border border-warmgray/10 rounded-full scale-[0.33]" />
              <div className="h-4 w-4 bg-sage rounded-full animate-ping" />
              <div className="absolute top-1/4 right-1/4 h-3 w-3 bg-charcoal rounded-full" />
            </div>
            <p className="text-[10px] text-warmgray leading-relaxed text-center">Market positioning for <strong>{categoryName}</strong> is currently skewed toward <strong>Minimalism</strong>.</p>
          </div>

          <div className="bg-white border border-[#E5E1D8] rounded-[40px] p-8 space-y-6 shadow-sm">
             <div className="flex items-center gap-3 text-charcoal">
                <ShieldCheck size={18} className="text-sage" />
                <span className="text-[10px] uppercase font-bold tracking-widest">Compliance Lock</span>
             </div>
             <p className="text-[11px] leading-relaxed text-warmgray italic">"Guardian Agent ensures all {categoryName} placements adhere to Maison DNA version v2.1_Milan."</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SponsorCategoryPage;