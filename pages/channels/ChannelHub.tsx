import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Globe, Instagram, ShoppingBag, MessageCircle, ArrowRight, Zap, TrendingUp, ShieldCheck } from 'lucide-react';
import SEO from '../../components/SEO';

const ChannelHub: React.FC = () => {
  const { brandId } = useParams();
  
  const channels = [
    { id: 'instagram', name: 'Instagram', icon: Instagram, reach: '1.2M', sync: 'Optimal', color: 'text-rose-500' },
    { id: 'shopify', name: 'Shopify Store', icon: ShoppingBag, reach: '840K', sync: 'Syncing...', color: 'text-sage' },
    { id: 'tiktok', name: 'TikTok', icon: MessageCircle, reach: '2.8M', sync: 'Lagging', color: 'text-charcoal' },
    { id: 'wholesale', name: 'Wholesale Port', icon: Globe, reach: '140', sync: 'Static', color: 'text-champagne' }
  ];

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-16 animate-in fade-in duration-700">
      <SEO title="Channel Hub" description="Synchronizing Maison assets across the global distribution grid." />
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
          <h2 className="font-serif text-6xl tracking-tighter mb-4">Channel Hub.</h2>
          <p className="text-warmgray max-w-lg leading-relaxed">Orchestrate your captured assets across every global distribution node with 100% DNA compliance.</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="px-5 py-2 bg-sage/10 text-sage rounded-full text-[10px] font-bold uppercase tracking-widest border border-sage/20">
             Neural Sync Active
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {channels.map(channel => (
          <Link key={channel.id} to={`/brand/${brandId}/channels/${channel.id}`} className="group bg-white border border-[#E5E1D8] rounded-[48px] p-10 space-y-8 hover:shadow-2xl transition-all duration-500">
             <div className="flex justify-between items-start">
                <div className={`h-16 w-16 bg-ivory rounded-3xl flex items-center justify-center ${channel.color} group-hover:bg-charcoal group-hover:text-white transition-colors shadow-inner`}>
                   <channel.icon size={32} />
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-bold uppercase text-warmgray tracking-widest">Status</p>
                   <p className={`text-xs font-bold ${channel.sync === 'Optimal' ? 'text-sage' : 'text-charcoal'}`}>{channel.sync}</p>
                </div>
             </div>
             <div>
                <h3 className="font-serif text-4xl mb-2">{channel.name}</h3>
                <div className="flex items-center gap-6 pt-4 border-t border-ivory">
                   <div className="space-y-1">
                      <p className="text-[8px] font-bold uppercase text-warmgray tracking-widest">Global Reach</p>
                      <p className="text-xl font-serif">{channel.reach}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[8px] font-bold uppercase text-warmgray tracking-widest">DNA Index</p>
                      <p className="text-xl font-serif text-sage">94.2%</p>
                   </div>
                </div>
             </div>
             <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-charcoal group-hover:gap-4 transition-all">
                Platform Optimization <ArrowRight size={16} />
             </div>
          </Link>
        ))}
      </div>

      <section className="bg-charcoal text-white rounded-[64px] p-12 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden shadow-2xl">
         <div className="flex-1 space-y-6 relative z-10">
            <div className="flex items-center gap-3 text-sage">
               <TrendingUp size={24} />
               <span className="text-[10px] font-bold uppercase tracking-widest">Growth Forecast</span>
            </div>
            <h3 className="font-serif text-4xl">SS25 Omnichannel Momentum.</h3>
            <p className="text-white/40 text-lg leading-relaxed italic">"Projected 22% conversion lift by pivoting 40% of campaign spend toward architectural video assets for TikTok HNW clusters."</p>
         </div>
         <button className="px-12 py-6 bg-white text-charcoal rounded-full text-xs font-bold uppercase tracking-widest hover:bg-ivory transition-all shadow-xl relative z-10 whitespace-nowrap">
            Generate Strategy Brief
         </button>
         <div className="absolute -left-20 -bottom-20 h-64 w-64 bg-sage/5 rounded-full blur-[100px]" />
      </section>
    </div>
  );
};

export default ChannelHub;