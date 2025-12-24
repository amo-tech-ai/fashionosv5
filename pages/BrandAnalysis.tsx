
import React, { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, Compass, Palette, PieChart, ArrowUpRight, Sparkles } from 'lucide-react';

const BrandAnalysis: React.FC = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-16">
      {/* Hero Scorecard */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 glass rounded-[40px] p-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div>
               <h2 className="font-serif text-5xl mb-4">L’Artisan Analysis</h2>
               <p className="text-warmgray text-lg max-w-md">Your brand shows high technical proficiency with a distinct opportunity in sustainable lifestyle storytelling.</p>
            </div>
            <div className="relative h-48 w-48 flex items-center justify-center">
               <svg className="w-full h-full -rotate-90">
                  <circle cx="96" cy="96" r="80" fill="none" stroke="#E5E1D8" strokeWidth="12" />
                  <circle 
                    cx="96" cy="96" r="80" fill="none" stroke="#8FAE9E" strokeWidth="12" 
                    strokeDasharray="502" 
                    strokeDashoffset={animate ? "60" : "502"}
                    className="transition-all duration-[2000ms] ease-out"
                    strokeLinecap="round"
                  />
               </svg>
               <div className="absolute flex flex-col items-center">
                  <span className="text-4xl font-serif font-bold">88</span>
                  <span className="text-[10px] uppercase font-bold text-warmgray">Overall Score</span>
               </div>
            </div>
         </div>

         <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-[#E5E1D8] rounded-[32px] p-6 flex flex-col justify-between">
               <span className="text-[10px] uppercase font-bold text-warmgray">Website</span>
               <div className="space-y-1">
                  <p className="text-3xl font-serif">92%</p>
                  <p className="text-[10px] text-green-600 font-bold">+4% Optimizable</p>
               </div>
            </div>
            <div className="bg-white border border-[#E5E1D8] rounded-[32px] p-6 flex flex-col justify-between">
               <span className="text-[10px] uppercase font-bold text-warmgray">Social</span>
               <div className="space-y-1">
                  <p className="text-3xl font-serif">74%</p>
                  <p className="text-[10px] text-orange-600 font-bold">Growth Potential</p>
               </div>
            </div>
            <div className="col-span-2 bg-charcoal text-white rounded-[32px] p-6 flex items-center justify-between group cursor-pointer hover:bg-black transition-colors">
               <div>
                  <p className="text-sm font-medium">Generate Content Plan</p>
                  <p className="text-[10px] text-white/50 uppercase tracking-widest">Based on gap analysis</p>
               </div>
               <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
         </div>
      </section>

      {/* Brand Positioning */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
         <div className="space-y-8">
            <div>
               <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-8 bg-sage rounded-xl flex items-center justify-center text-white">
                     <Compass size={18} />
                  </div>
                  <h3 className="font-serif text-3xl">Positioning</h3>
               </div>
               <p className="text-warmgray leading-relaxed">Luxury artisanal womenswear focusing on sustainable silk and traditional French craftsmanship. Targeting high-net-worth conscious consumers.</p>
            </div>

            <div className="glass rounded-3xl p-8 relative overflow-hidden group">
               <div className="relative z-10">
                  <p className="text-[10px] uppercase font-bold text-sage mb-2">Persona</p>
                  <h4 className="text-2xl font-serif mb-4">The Conscious Epicurean</h4>
                  <p className="text-xs text-warmgray leading-relaxed mb-6">Values heritage over trends. Seeks tactile luxury and radical transparency in the supply chain.</p>
                  <div className="flex flex-wrap gap-2">
                     {['35-50 years', 'Urban Global', 'Ethical Value'].map(tag => (
                       <span key={tag} className="px-3 py-1 bg-white border border-[#E5E1D8] text-[9px] font-bold uppercase rounded-full">{tag}</span>
                     ))}
                  </div>
               </div>
               <div className="absolute -right-8 -bottom-8 h-48 w-48 bg-sage/5 rounded-full blur-3xl group-hover:bg-sage/10 transition-colors" />
            </div>
         </div>

         <div className="space-y-8">
            <div className="flex items-center gap-3 mb-4">
               <div className="h-8 w-8 bg-blush rounded-xl flex items-center justify-center text-charcoal">
                  <Palette size={18} />
               </div>
               <h3 className="font-serif text-3xl">Visual Style</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="aspect-square bg-[#F5F1E9] rounded-3xl border border-[#E5E1D8] flex flex-col p-6 items-center justify-center text-center">
                  <span className="text-[10px] uppercase font-bold text-warmgray mb-2">Atmosphere</span>
                  <p className="text-sm font-medium">Ethereal, Soft, Architectural</p>
               </div>
               <div className="aspect-square bg-charcoal rounded-3xl p-6 flex flex-col justify-end text-white">
                  <span className="text-[10px] uppercase font-bold text-white/50 mb-2">Lighting</span>
                  <p className="text-sm font-medium">Natural Diffused, Golden Hour</p>
               </div>
            </div>

            <div className="p-6 bg-ivory border border-[#E5E1D8] rounded-3xl">
               <span className="text-[10px] uppercase font-bold text-warmgray block mb-4">Palette Detection</span>
               <div className="flex gap-2 h-12">
                  <div className="flex-1 bg-[#D9D1C5] rounded" />
                  <div className="flex-1 bg-[#8FAE9E] rounded" />
                  <div className="flex-1 bg-[#E8D6D1] rounded" />
                  <div className="flex-1 bg-[#1E1E1E] rounded" />
                  <div className="flex-1 border border-dashed border-warmgray rounded flex items-center justify-center">
                     <span className="text-[10px] font-bold">+2</span>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Performance Snapshot */}
      <section className="bg-white border border-[#E5E1D8] rounded-[48px] p-12">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
               <h3 className="font-serif text-4xl mb-2">Growth Trajectory</h3>
               <p className="text-warmgray">Historical performance vs AI projection.</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-ivory rounded-full border border-[#E5E1D8]">
               <PieChart size={16} className="text-sage" />
               <span className="text-xs font-bold uppercase tracking-widest">Live Benchmarks</span>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="h-64 flex items-end gap-4 px-4">
               {[40, 65, 55, 85, 75, 95].map((h, i) => (
                 <div key={i} className="flex-1 flex flex-col items-center gap-4">
                    <div 
                      className="w-full bg-sage rounded-t-xl transition-all duration-1000 ease-out"
                      style={{ height: animate ? `${h}%` : '0%' }}
                    />
                    <span className="text-[10px] font-bold text-warmgray uppercase">{['M', 'J', 'J', 'A', 'S', 'O'][i]}</span>
                 </div>
               ))}
            </div>

            <div className="space-y-6">
               <div className="p-6 bg-ivory rounded-3xl border border-[#E5E1D8] flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <TrendingUp size={20} className="text-sage" />
                     </div>
                     <div>
                        <p className="text-[10px] uppercase font-bold text-warmgray">Viral Probability</p>
                        <p className="text-xl font-medium">High (72%)</p>
                     </div>
                  </div>
                  <Sparkles size={20} className="text-sage animate-pulse" />
               </div>
               <div className="p-6 bg-ivory rounded-3xl border border-[#E5E1D8] flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <BarChart3 size={20} className="text-charcoal" />
                     </div>
                     <div>
                        <p className="text-[10px] uppercase font-bold text-warmgray">Engagement Rate</p>
                        <p className="text-xl font-medium">4.2%</p>
                     </div>
                  </div>
                  <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded font-bold">+1.2%</span>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default BrandAnalysis;
