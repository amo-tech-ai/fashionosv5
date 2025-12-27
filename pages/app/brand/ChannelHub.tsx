import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Globe, Instagram, ShoppingBag, MessageCircle, ArrowRight, TrendingUp } from 'lucide-react';
import SEO from '../../../components/SEO';

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
          <p className="text-warmgray max-w-lg leading-relaxed">Orchestrate assets across global nodes.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {channels.map(channel => (
          <div key={channel.id} className="group bg-white border border-[#E5E1D8] rounded-[48px] p-10 space-y-8 hover:shadow-2xl transition-all duration-500">
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
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelHub;