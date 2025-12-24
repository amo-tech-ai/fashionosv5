
import React, { useState } from 'react';
import { Target, BarChart, Globe, Zap, Play, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { IntelligenceService } from '../services/intelligence';

const CampaignsPage: React.FC = () => {
  const intelService = IntelligenceService.getInstance();
  const [isGeneratingVideo, setIsGeneratingVideo] = useState<string | null>(null);
  const [campaignVideos, setCampaignVideos] = useState<Record<string, string>>({});

  const campaignImages = [
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=800&q=80"
  ];

  const handleGenerateVideo = async (title: string) => {
    setIsGeneratingVideo(title);
    try {
      const url = await intelService.generateCinematicVideo(title);
      setCampaignVideos(prev => ({ ...prev, [title]: url }));
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingVideo(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 md:p-12 space-y-12 animate-in fade-in duration-1000">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h2 className="font-serif text-5xl font-medium mb-6">Omnichannel Strategy</h2>
        <p className="text-warmgray">Orchestrate global campaigns with cinematic intelligence.</p>
      </div>

      <div className="space-y-8">
         {[
           { title: 'Holiday 2024 Bloom', channels: ['Instagram', 'TikTok'], reach: '1.2M', growth: '+14%' },
           { title: 'Sustainability Edit', channels: ['Web', 'Print'], reach: '420K', growth: '+8%' },
           { title: 'Core Collection v2', channels: ['Retail', 'DOOH'], reach: '2.8M', growth: '+22%' }
         ].map((campaign, i) => (
           <div key={i} className="bg-white border border-[#E5E1D8] rounded-[32px] p-8 flex flex-col md:flex-row items-center gap-10 hover:shadow-xl transition-all group relative overflow-hidden">
              <div className="h-64 w-64 rounded-2xl flex-shrink-0 flex items-center justify-center border border-[#E5E1D8] overflow-hidden relative">
                 {campaignVideos[campaign.title] ? (
                   <video src={campaignVideos[campaign.title]} autoPlay loop muted className="w-full h-full object-cover" />
                 ) : (
                   <img src={campaignImages[i]} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                 )}
                 {isGeneratingVideo === campaign.title && (
                   <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm flex flex-col items-center justify-center text-white p-4">
                      <Loader2 size={32} className="animate-spin text-sage mb-2" />
                      <span className="text-[9px] font-bold uppercase text-center tracking-widest">Veo 3.1: Synthesizing Cinema...</span>
                   </div>
                 )}
              </div>
              <div className="flex-1">
                 <div className="flex items-center gap-2 mb-2">
                    <Target size={16} className="text-warmgray" />
                    <span className="text-[10px] uppercase font-bold tracking-widest text-warmgray">Active Campaign</span>
                 </div>
                 <h3 className="font-serif text-3xl mb-4">{campaign.title}</h3>
                 <div className="flex flex-wrap gap-2 mb-6">
                    {campaign.channels.map(c => (
                      <span key={c} className="px-3 py-1 bg-ivory text-[10px] font-bold uppercase tracking-wider rounded-full border border-[#E5E1D8]">{c}</span>
                    ))}
                 </div>
                 <button 
                   onClick={() => handleGenerateVideo(campaign.title)}
                   disabled={isGeneratingVideo !== null}
                   className="flex items-center gap-2 text-sage text-[10px] font-bold uppercase tracking-[0.2em] hover:text-charcoal transition-colors disabled:opacity-30"
                 >
                   <Sparkles size={14} /> 
                   {campaignVideos[campaign.title] ? 'Regenerate Vision' : 'Generate Cinematic Mood (Veo 3.1)'}
                 </button>
              </div>
              <div className="w-full md:w-auto space-y-3">
                 <button className="w-full px-8 py-4 bg-charcoal text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-black transition-all">
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
