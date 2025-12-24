
import React from 'react';
import { BarChart3, TrendingUp, PieChart, ShieldCheck, Target, Zap, Globe, MessageSquare } from 'lucide-react';
import { Brand } from '../../types';

interface ScoresSectionProps {
  brand: Brand;
}

const ScoresSection: React.FC<ScoresSectionProps> = ({ brand }) => {
  const scores = [
    { label: 'Website UX', score: brand.scores.website, icon: Globe, status: '+4% vs Category' },
    { label: 'Social Engagement', score: brand.scores.social, icon: MessageSquare, status: 'Growth Potential' },
    { label: 'DNA Alignment', score: brand.scores.overall, icon: ShieldCheck, status: 'High Compliance' }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {scores.map(s => (
           <div key={s.label} className="bg-white border border-[#E5E1D8] rounded-[32px] p-8 space-y-6 shadow-sm group hover:shadow-xl transition-all">
              <div className="flex justify-between items-start">
                 <div className="h-12 w-12 bg-ivory rounded-2xl flex items-center justify-center text-charcoal group-hover:bg-charcoal group-hover:text-white transition-colors">
                    <s.icon size={20} />
                 </div>
                 <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded ${s.score > 80 ? 'bg-sage/10 text-sage' : 'bg-blush/20 text-charcoal'}`}>
                    {s.status}
                 </span>
              </div>
              <div className="space-y-1">
                 <h5 className="text-[10px] uppercase font-bold text-warmgray tracking-widest">{s.label}</h5>
                 <p className="text-4xl font-serif">{s.score}%</p>
              </div>
              <div className="h-1 w-full bg-ivory rounded-full overflow-hidden">
                 <div 
                   className={`h-full transition-all duration-1000 ${s.score > 80 ? 'bg-sage' : 'bg-charcoal'}`} 
                   style={{ width: `${s.score}%` }} 
                 />
              </div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Sentiment Analysis */}
        <div className="bg-ivory border border-[#E5E1D8] rounded-[48px] p-10 space-y-8">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center border border-[#E5E1D8]">
                    <PieChart size={20} className="text-charcoal" />
                 </div>
                 <h4 className="font-serif text-3xl">Sentiment Logic</h4>
              </div>
              <div className="flex items-center gap-2 text-sage">
                 <Zap size={14} className="animate-pulse" />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Real-time Stream</span>
              </div>
           </div>

           <div className="space-y-8">
              {[
                { l: 'Quality Trust', v: 94, c: 'sage' },
                { l: 'Aesthetic Desire', v: 82, c: 'charcoal' },
                { l: 'Price Justification', v: 76, c: 'warmgray' }
              ].map(stat => (
                <div key={stat.l} className="space-y-3">
                   <div className="flex justify-between items-end">
                      <span className="text-[10px] uppercase font-bold text-charcoal tracking-widest">{stat.l}</span>
                      <span className="text-xs font-bold">{stat.v}%</span>
                   </div>
                   <div className="h-1.5 w-full bg-white rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-[2s]`}
                        style={{ width: `${stat.v}%`, backgroundColor: stat.c === 'sage' ? '#8FAE9E' : stat.c === 'charcoal' ? '#1E1E1E' : '#8B8B8B' }}
                      />
                   </div>
                </div>
              ))}
              <div className="p-6 bg-white border border-[#E5E1D8] rounded-3xl">
                 <p className="text-[9px] uppercase font-bold text-warmgray mb-2">Growth Agent Insight</p>
                 <p className="text-xs leading-relaxed italic text-charcoal">
                   "Sentiment reflects high trust in artisanal quality. However, 'Price Justification' is lagging. AI suggests surfacing more supply chain transparency content to validate the luxury markup."
                 </p>
              </div>
           </div>
        </div>

        {/* Competitor Benchmarking */}
        <div className="bg-white border border-[#E5E1D8] rounded-[48px] p-10 space-y-8">
           <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-ivory rounded-xl flex items-center justify-center">
                 <BarChart3 size={20} className="text-charcoal" />
              </div>
              <h4 className="font-serif text-3xl">Market Velocity</h4>
           </div>

           <div className="aspect-[16/9] relative flex items-end justify-between px-4 pb-8 border-b border-[#E5E1D8]">
              {[35, 65, 45, 85, 75, 95].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-4">
                   <div 
                     className="w-8 bg-charcoal rounded-t-lg transition-all duration-[1.5s] ease-out hover:bg-sage"
                     style={{ height: `${h}%` }}
                   />
                   <span className="text-[9px] font-bold text-warmgray uppercase">{['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'][i]}</span>
                </div>
              ))}
           </div>

           <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                 <div className="flex items-center gap-2">
                    <Target size={14} className="text-sage" />
                    <span className="text-[10px] uppercase font-bold text-warmgray tracking-widest">Share of Voice</span>
                 </div>
                 <p className="text-2xl font-serif">14.2%</p>
                 <p className="text-[9px] text-green-600 font-bold uppercase">+1.2% Gain</p>
              </div>
              <div className="space-y-2">
                 <div className="flex items-center gap-2">
                    <TrendingUp size={14} className="text-charcoal" />
                    <span className="text-[10px] uppercase font-bold text-warmgray tracking-widest">Growth Velocity</span>
                 </div>
                 <p className="text-2xl font-serif">2.4x</p>
                 <p className="text-[9px] text-warmgray font-bold uppercase">Steady Momentum</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ScoresSection;
