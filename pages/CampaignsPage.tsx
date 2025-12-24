
import React from 'react';
import { Target, BarChart, Globe, Zap } from 'lucide-react';

const CampaignsPage: React.FC = () => {
  const campaignImages = [
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=800&q=80"
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h2 className="serif text-5xl font-medium mb-6">Omnichannel Strategy</h2>
        <p className="text-[#8C8C8C]">Orchestrate global campaigns across web, social, and retail channels with intelligent placement.</p>
      </div>

      <div className="space-y-8">
         {[
           { title: 'Holiday 2024 Bloom', channels: ['Instagram', 'TikTok', 'Email'], reach: '1.2M', growth: '+14%', color: 'bg-rose-50' },
           { title: 'Sustainability Edit', channels: ['Web', 'Print'], reach: '420K', growth: '+8%', color: 'bg-emerald-50' },
           { title: 'Core Collection v2', channels: ['Retail', 'DOOH'], reach: '2.8M', growth: '+22%', color: 'bg-indigo-50' }
         ].map((campaign, i) => (
           <div key={i} className="bg-white border border-[#E5E1D8] rounded-3xl p-8 flex flex-col md:flex-row items-center gap-10 hover:shadow-lg transition-all group">
              <div className={`h-48 w-48 ${campaign.color} rounded-2xl flex-shrink-0 flex items-center justify-center border border-[#E5E1D8] overflow-hidden`}>
                 <img src={campaignImages[i]} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="flex-1">
                 <div className="flex items-center gap-2 mb-2">
                    <Target size={16} className="text-[#8C8C8C]" />
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#8C8C8C]">Active Campaign</span>
                 </div>
                 <h3 className="serif text-3xl mb-4">{campaign.title}</h3>
                 <div className="flex flex-wrap gap-2 mb-6">
                    {campaign.channels.map(c => (
                      <span key={c} className="px-3 py-1 bg-[#F9F7F2] text-[10px] font-bold uppercase tracking-wider rounded-full border border-[#E5E1D8]">{c}</span>
                    ))}
                 </div>
                 <div className="grid grid-cols-2 gap-8">
                    <div>
                       <p className="text-[10px] text-[#8C8C8C] uppercase font-bold tracking-widest mb-1">Projected Reach</p>
                       <p className="text-xl font-medium">{campaign.reach}</p>
                    </div>
                    <div>
                       <p className="text-[10px] text-[#8C8C8C] uppercase font-bold tracking-widest mb-1">Conversion lift</p>
                       <p className="text-xl font-medium text-green-600">{campaign.growth}</p>
                    </div>
                 </div>
              </div>
              <div className="w-full md:w-auto">
                 <button className="w-full md:w-auto px-8 py-4 bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-black transition-all">
                    View Performance
                 </button>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};

export default CampaignsPage;
