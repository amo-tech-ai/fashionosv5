
import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, UserCheck, Instagram, MessageCircle, MapPin, ExternalLink } from 'lucide-react';
import { IntelligenceService } from '../../services/intelligence';

interface BookingModeProps {
  payload: any;
  onClose: () => void;
}

const BookingMode: React.FC<BookingModeProps> = ({ payload, onClose }) => {
  const intelService = IntelligenceService.getInstance();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isForecasting, setIsForecasting] = useState(false);
  const [performanceForecast, setPerformanceForecast] = useState<any>(null);
  const [studioSuggestions, setStudioSuggestions] = useState<{text: string, places: string[]} | null>(null);

  const bookingData = {
    theme: payload?.title || '',
    studio: payload?.suggestedStudio || 'Studio A (Milan)',
    talent: 'Anja L. (Elite)',
  };

  useEffect(() => {
    if (payload?.title) {
      runSimulations(payload.title);
    }
  }, [payload]);

  const runSimulations = async (theme: string) => {
    setIsForecasting(true);
    try {
      const [forecast, studios] = await Promise.all([
        intelService.simulatePerformance(theme),
        intelService.suggestNearbyStudios(payload?.suggestedStudio?.includes('Milan') ? 'Milan, Italy' : 'Paris, France')
      ]);
      setPerformanceForecast(forecast);
      setStudioSuggestions(studios);
    } catch (e) {
      setPerformanceForecast({ ig_reach: 420000, tiktok_reach: 850000, conversion_lift: '12%', primary_format: 'Short Cinematic Reel' });
    } finally {
      setIsForecasting(false);
    }
  };

  const confirmHandshake = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    onClose();
  };

  if (isProcessing) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-6 h-full">
        <Loader2 size={48} className="animate-spin text-sage" />
        <p className="text-[10px] font-bold uppercase tracking-widest text-warmgray">Synchronizing Production Nodes...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500 overflow-y-auto custom-scrollbar p-6 space-y-8">
      <div className="space-y-6">
         <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-[#E5E1D8] shadow-sm">
            <img src={payload?.image} className="w-full h-full object-cover" alt="Booking Concept" />
         </div>

         <div className="p-4 bg-sage/5 border border-sage/20 rounded-2xl flex items-start gap-3">
            <Sparkles size={16} className="text-sage mt-1" />
            <div className="flex-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-sage">Growth Agent Forecast</p>
              {isForecasting ? (
                <div className="flex items-center gap-2 mt-1">
                  <Loader2 size={12} className="animate-spin text-sage" />
                  <span className="text-[10px] text-warmgray">Simulating reach...</span>
                </div>
              ) : (
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold">
                     <span className="text-charcoal flex items-center gap-1"><Instagram size={10} className="text-rose-500"/> IG REACH</span>
                     <span className="text-sage">~{(performanceForecast?.ig_reach || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold">
                     <span className="text-charcoal flex items-center gap-1"><MessageCircle size={10} className="text-black"/> TIKTOK</span>
                     <span className="text-sage">~{(performanceForecast?.tiktok_reach || 0).toLocaleString()}</span>
                  </div>
                  <p className="text-[10px] text-warmgray leading-relaxed italic border-t border-sage/10 pt-2">
                    Primary Format: {performanceForecast?.primary_format || 'Cinematic Carousel'}
                  </p>
                </div>
              )}
            </div>
         </div>

         {studioSuggestions && (
           <div className="p-4 bg-ivory border border-[#E5E1D8] rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-charcoal">
                 <MapPin size={14} />
                 <span className="text-[10px] uppercase font-bold tracking-widest">Grounded Venue Sourcing</span>
              </div>
              <p className="text-[10px] text-warmgray leading-relaxed italic">"{studioSuggestions.text}"</p>
              {studioSuggestions.places.length > 0 && (
                <div className="flex flex-wrap gap-2">
                   {studioSuggestions.places.slice(0, 2).map((place, i) => (
                     <a key={i} href={place} target="_blank" rel="noreferrer" className="flex items-center gap-1 px-2 py-1 bg-white border border-[#E5E1D8] rounded-lg text-[8px] font-bold text-sage hover:border-sage transition-all">
                        <ExternalLink size={8} /> MAPS LINK
                     </a>
                   ))}
                </div>
              )}
           </div>
         )}

         <div className="space-y-4">
            <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-warmgray">
               <UserCheck size={14} className="text-sage" />
               Casting Suggestion
            </div>
            <div className="p-4 bg-white border border-[#E5E1D8] rounded-2xl flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-[#E5E1D8] overflow-hidden">
                     <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=40&q=80" className="w-full h-full object-cover" alt="Model" />
                  </div>
                  <span className="text-xs font-semibold">{bookingData.talent}</span>
               </div>
               <span className="text-[10px] font-bold text-sage">94% Fit</span>
            </div>
         </div>

         <button 
           onClick={confirmHandshake}
           className="w-full py-4 bg-sage text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-xl"
         >
            Confirm Production Handshake
         </button>
      </div>
    </div>
  );
};

export default BookingMode;
