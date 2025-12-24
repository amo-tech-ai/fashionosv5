
import React from 'react';
import { Sparkles, Check, RotateCcw, AlertTriangle, CheckCircle2, Info, Camera, Loader2, Wand2, BarChart2, TrendingUp } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  moodPreview?: string;
  isGeneratingMood: boolean;
  onMoodClick: () => void;
  onRegenerateStory: () => void;
  onStoryEdit: (text: string) => void;
  onApproveStory: () => void;
  onBriefShoot: () => void;
}

const MiniSparkline: React.FC<{ value: number; color: string }> = ({ value, color }) => {
  // Generate a slightly random path for a cinematic "live data" feel
  const h1 = 10 + (value * 0.4);
  const h2 = 20 + (value * 0.5);
  const h3 = 15 + (value * 0.45);
  const h4 = 25 + (value * 0.55);
  const h5 = value * 0.6;
  
  return (
    <div className="flex items-end gap-1 h-8 w-14">
      {[h1, h2, h3, h4, h5].map((h, i) => (
        <div 
          key={i} 
          className="w-1.5 rounded-full transition-all duration-1000 ease-out" 
          style={{ 
            height: `${h}%`, 
            backgroundColor: i === 4 ? color : `${color}33`,
            boxShadow: i === 4 ? `0 0 8px ${color}66` : 'none'
          }} 
        />
      ))}
    </div>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  moodPreview, 
  isGeneratingMood, 
  onMoodClick, 
  onRegenerateStory, 
  onStoryEdit, 
  onApproveStory, 
  onBriefShoot 
}) => {
  const alignmentScore = Math.round(
    (product.match.color + product.match.lighting + product.match.silhouette + product.match.background) / 4
  );

  const priceDiff = product.pricing.brand - product.pricing.median;
  const isPremium = priceDiff > 0;
  const percentage = Math.abs(Math.round((priceDiff / product.pricing.median) * 100));

  return (
    <div className="bg-white border border-[#E5E1D8] rounded-[48px] overflow-hidden group shadow-sm hover:shadow-3xl transition-all duration-700 animate-in fade-in zoom-in-95">
      <div className="flex flex-col lg:flex-row h-full">
         <div className="w-full lg:w-2/5 aspect-[4/5] lg:aspect-auto overflow-hidden relative group/img">
            <img 
              src={moodPreview || product.img} 
              className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-[2.5s] ease-out" 
              alt={product.name} 
            />
            <div className="absolute top-8 left-8 flex flex-col gap-3">
               <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl border border-white/20">
                 {product.id}
               </span>
            </div>
            
            <button 
              onClick={onMoodClick}
              disabled={isGeneratingMood}
              className="absolute bottom-8 right-8 p-4 bg-white/90 backdrop-blur-md rounded-full shadow-2xl hover:bg-white transition-all group/mood scale-90 group-hover/img:scale-100 duration-500"
              title="Generate Mood Hallucination"
            >
              {isGeneratingMood ? (
                  <Loader2 size={20} className="animate-spin text-sage" />
              ) : (
                  <Wand2 size={20} className="text-charcoal group-hover/mood:text-sage transition-colors" />
              )}
            </button>
         </div>

         <div className="flex-1 p-8 lg:p-12 flex flex-col justify-between space-y-10">
            <header className="flex justify-between items-start">
               <div>
                  <h5 className="font-serif text-3xl tracking-tight leading-none mb-2">{product.name}</h5>
                  <p className="text-[10px] uppercase font-bold text-warmgray tracking-widest">{product.category}</p>
               </div>
               <div className="text-right">
                  <span className="text-2xl font-bold block">{product.price}</span>
                  <span className="text-[9px] uppercase font-bold text-sage tracking-widest">In Stock</span>
               </div>
            </header>

            <div className="space-y-10">
               {/* AI Storyteller Block */}
               <div className="p-8 bg-ivory/50 rounded-[32px] border border-[#E5E1D8] space-y-5 transition-all focus-within:ring-2 focus-within:ring-sage/10 group/story">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2.5 text-sage">
                        <Sparkles size={16} />
                        <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Neural Storyteller</span>
                     </div>
                     <div className="flex gap-3 items-center">
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all ${
                          product.status === 'On-brand' ? 'bg-sage text-white shadow-lg shadow-sage/20' : 'bg-blush text-charcoal animate-pulse'
                        }`}>
                          {product.status === 'On-brand' ? <Check size={10} /> : <AlertTriangle size={10} />}
                          {product.status}
                        </div>
                        <button 
                          onClick={onRegenerateStory} 
                          className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all group/regen" 
                          title="Regenerate Narrative"
                        >
                           <RotateCcw size={14} className="text-warmgray group-hover/regen:text-charcoal transition-transform group-active/regen:rotate-90" />
                        </button>
                        {product.status === 'Needs review' && (
                          <button 
                            onClick={onApproveStory} 
                            className="p-2 bg-sage text-white rounded-full shadow-lg hover:bg-black transition-all" 
                            title="Approve for Catalog"
                          >
                             <Check size={14} />
                          </button>
                        )}
                     </div>
                  </div>
                  <textarea 
                    value={product.storyteller}
                    onChange={(e) => onStoryEdit(e.target.value)}
                    className="w-full bg-transparent border-none focus:ring-0 p-0 text-sm leading-relaxed text-charcoal italic font-serif font-medium resize-none min-h-[80px]"
                    placeholder="Synthesizing description..."
                  />
                  <div className="flex items-center gap-2 text-[9px] text-warmgray uppercase tracking-[0.2em] pt-2 border-t border-[#E5E1D8]">
                     {product.status === 'On-brand' ? <CheckCircle2 size={12} className="text-sage" /> : <Info size={12} />}
                     {product.status === 'On-brand' ? 'DNA Integrity Verified' : 'Awaiting Aesthetic Validation'}
                  </div>
               </div>
               
               {/* Refined Visual Match Score Breakdown */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                     <div className="flex items-center gap-3">
                        <BarChart2 size={16} className="text-charcoal" />
                        <span className="text-[10px] uppercase font-bold text-charcoal tracking-widest">Aesthetic Metrics</span>
                     </div>
                     
                     <div className="space-y-6">
                        {[
                          { label: 'Palette', value: product.match.color, color: '#8FAE9E' },
                          { label: 'Lighting', value: product.match.lighting, color: '#C9A86A' },
                          { label: 'Silhouette', value: product.match.silhouette, color: '#1E1E1E' }
                        ].map(stat => (
                          <div key={stat.label} className="flex items-center justify-between group/stat">
                             <div className="flex-1 space-y-2">
                                <div className="flex items-center justify-between">
                                   <span className="text-[9px] font-bold uppercase tracking-widest text-warmgray group-hover/stat:text-charcoal transition-colors">
                                     {stat.label}
                                   </span>
                                   <span className="text-[10px] font-bold text-charcoal">{stat.value}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-ivory rounded-full overflow-hidden border border-[#E5E1D8]/30">
                                   <div 
                                     className="h-full transition-all duration-1000 ease-out" 
                                     style={{ width: `${stat.value}%`, backgroundColor: stat.color }} 
                                   />
                                </div>
                             </div>
                             <div className="pl-6">
                                <MiniSparkline value={stat.value} color={stat.color} />
                             </div>
                          </div>
                        ))}
                     </div>
                  </div>

                  {/* Pricing Intelligence Widget */}
                  <div className="p-8 bg-white border border-[#E5E1D8] rounded-[32px] space-y-6 shadow-sm">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <TrendingUp size={16} className="text-sage" />
                           <span className="text-[10px] uppercase font-bold text-charcoal tracking-widest">Pricing Intelligence</span>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${isPremium ? 'bg-sage/10 border-sage/20 text-sage' : 'bg-charcoal/5 border-charcoal/10 text-charcoal'}`}>
                           {product.pricing.positioning}
                        </div>
                     </div>

                     <div className="space-y-5">
                        <div className="relative h-2.5 bg-ivory rounded-full overflow-hidden border border-[#E5E1D8]">
                           <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-warmgray/20 z-0" />
                           <div 
                              className={`absolute top-0 bottom-0 transition-all duration-[1.5s] ease-out z-10 ${isPremium ? 'bg-sage shadow-[0_0_10px_rgba(143,174,158,0.5)]' : 'bg-charcoal'}`}
                              style={{ 
                                 left: isPremium ? '50%' : `${50 - Math.min(percentage, 50)}%`,
                                 width: `${Math.min(percentage, 50)}%`
                              }}
                           />
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                           <div className="space-y-1">
                              <p className="text-warmgray">Market Median</p>
                              <p className="text-charcoal">€{product.pricing.median}</p>
                           </div>
                           <div className="text-right space-y-1">
                              <p className="text-warmgray">Brand Equity</p>
                              <p className="text-sage">€{product.pricing.brand}</p>
                           </div>
                        </div>
                        <p className="text-[10px] text-warmgray italic leading-relaxed pt-2 border-t border-[#E5E1D8]/50">
                           "Strategic {percentage}% premium justified by high DNA alignment and SS25 scarcity forecast."
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            <footer className="pt-8 border-t border-ivory flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full border border-[#E5E1D8] flex items-center justify-center text-charcoal font-serif text-lg">
                     {alignmentScore}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-warmgray">Composite AI Fit</span>
               </div>
               <button 
                 onClick={onBriefShoot}
                 className="px-10 py-4 bg-charcoal text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center gap-3 shadow-xl group/btn"
               >
                  <Camera size={16} className="group-hover/btn:rotate-12 transition-transform" /> Brief Creative Production
               </button>
            </footer>
         </div>
      </div>
    </div>
  );
};

export default ProductCard;
