
import React, { useState } from 'react';
// Added missing BarChart3 icon to the lucide-react imports
import { ChevronLeft, ChevronRight, Filter, Globe, Instagram, MessageCircle, Send, Plus, ArrowRight, BarChart3 } from 'lucide-react';

const ContentCalendar: React.FC = () => {
  const [view, setView] = useState('Month');
  const [animate, setAnimate] = useState(false);

  React.useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const platforms = [
    { name: 'Instagram', icon: Instagram, color: 'text-rose-500' },
    { name: 'TikTok', icon: MessageCircle, color: 'text-black' },
    { name: 'Pinterest', icon: Globe, color: 'text-red-600' },
    { name: 'Amazon', icon: Send, color: 'text-blue-500' }
  ];

  const scheduledPosts = [
    { day: 12, platform: 'Instagram', format: 'Reel', status: 'Approved', img: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=200&q=80' },
    { day: 14, platform: 'TikTok', format: 'Video', status: 'Draft', img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=200&q=80' },
    { day: 15, platform: 'Instagram', format: 'Carousel', status: 'Scheduled', img: 'https://images.unsplash.com/photo-1539109132314-34a9c6ee892b?auto=format&fit=crop&w=200&q=80' },
    { day: 18, platform: 'Pinterest', format: 'Story', status: 'Approved', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80' }
  ];

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto flex flex-col h-full">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
         <div className="animate-in fade-in slide-in-from-bottom duration-700">
            <h2 className="font-serif text-5xl mb-2">Content Strategy</h2>
            <p className="text-warmgray">Optimizing luxury placement across all global channels.</p>
         </div>
         <div className="flex items-center gap-4">
            <div className="flex bg-[#E5E1D8]/30 p-1 rounded-full border border-[#E5E1D8]">
               {['Month', 'Week'].map(v => (
                 <button 
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-6 py-2 rounded-full text-[10px] uppercase font-bold tracking-widest transition-all ${view === v ? 'bg-white shadow-md text-charcoal' : 'text-warmgray'}`}
                 >
                   {v}
                 </button>
               ))}
            </div>
            <button className="bg-charcoal text-white p-3 rounded-full hover:scale-105 transition-transform shadow-xl">
               <Plus size={20} />
            </button>
         </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-12 min-h-[600px]">
         {/* Calendar Grid */}
         <div className="lg:col-span-3 space-y-8">
            <div className="flex items-center justify-between px-4">
               <h3 className="font-serif text-2xl">October 2024</h3>
               <div className="flex gap-4">
                  <button className="p-2 hover:bg-[#E5E1D8]/30 rounded-full"><ChevronLeft size={20} /></button>
                  <button className="p-2 hover:bg-[#E5E1D8]/30 rounded-full"><ChevronRight size={20} /></button>
               </div>
            </div>

            <div className="grid grid-cols-7 gap-px bg-[#E5E1D8] border border-[#E5E1D8] rounded-[32px] overflow-hidden shadow-sm">
               {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                 <div key={d} className="bg-ivory py-4 text-center text-[10px] uppercase font-bold text-warmgray tracking-widest">{d}</div>
               ))}
               {days.map(d => {
                 const post = scheduledPosts.find(p => p.day === d);
                 return (
                   <div key={d} className={`bg-white min-h-[120px] p-2 relative group hover:bg-ivory transition-colors cursor-pointer ${d % 7 === 0 || d % 7 === 6 ? 'bg-[#FAFAF9]' : ''}`}>
                      <span className="text-[10px] font-bold text-warmgray">{d}</span>
                      {post && (
                        <div className="mt-2 space-y-1 animate-in zoom-in-95 duration-500">
                           <div className="aspect-square rounded-xl overflow-hidden relative shadow-sm">
                              <img src={post.img} className="w-full h-full object-cover" />
                              <div className="absolute top-1 right-1 bg-white/90 p-1 rounded-md">
                                 {post.platform === 'Instagram' && <Instagram size={10} className="text-rose-500" />}
                                 {post.platform === 'TikTok' && <MessageCircle size={10} className="text-black" />}
                                 {post.platform === 'Pinterest' && <Globe size={10} className="text-red-600" />}
                              </div>
                           </div>
                           <div className="flex justify-between items-center px-1">
                              <span className="text-[8px] font-bold uppercase text-charcoal">{post.format}</span>
                              <div className={`h-1.5 w-1.5 rounded-full ${post.status === 'Approved' ? 'bg-green-500' : post.status === 'Draft' ? 'bg-warmgray' : 'bg-blue-500'}`} />
                           </div>
                        </div>
                      )}
                      {d === 15 && animate && (
                        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-10">
                           <path d="M 50 100 Q 150 150 250 100" fill="none" stroke="#8FAE9E" strokeWidth="1" strokeDasharray="4 4" className="animate-[dash_2s_linear_infinite]" />
                        </svg>
                      )}
                   </div>
                 );
               })}
            </div>
         </div>

         {/* Strategy Panel */}
         <div className="space-y-8">
            <div className="glass rounded-[40px] p-8 border border-sage/20 bg-sage/5">
               <h4 className="font-serif text-2xl mb-6">Smart Optimizations</h4>
               <div className="space-y-6">
                  <div className="p-4 bg-white/50 rounded-2xl border border-[#E5E1D8]">
                     <div className="flex items-center gap-2 mb-2">
                        <TrendingUp size={14} className="text-sage" />
                        <span className="text-[10px] uppercase font-bold text-warmgray">Posting Time</span>
                     </div>
                     <p className="text-xs font-medium">Tomorrow: 5:14 PM (Golden Hour)</p>
                  </div>

                  <div className="space-y-3">
                     <span className="text-[10px] uppercase font-bold text-warmgray block">Platform Balance</span>
                     <div className="flex h-4 rounded-full overflow-hidden bg-[#E5E1D8]">
                        <div className="bg-rose-500 w-[40%]" />
                        <div className="bg-charcoal w-[30%]" />
                        <div className="bg-red-600 w-[20%]" />
                        <div className="bg-blue-500 w-[10%]" />
                     </div>
                     <div className="grid grid-cols-2 gap-2">
                        {platforms.map(p => (
                          <div key={p.name} className="flex items-center gap-2">
                             <p.icon size={10} className={p.color} />
                             <span className="text-[9px] font-bold text-warmgray uppercase">{p.name}</span>
                          </div>
                        ))}
                     </div>
                  </div>

                  <div className="pt-4 border-t border-[#E5E1D8]">
                     <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] uppercase font-bold text-warmgray">AI Confidence</span>
                        <span className="text-xs font-bold text-sage">94%</span>
                     </div>
                     <button className="w-full bg-charcoal text-white py-3 rounded-xl text-[10px] uppercase font-bold tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2">
                        Auto-Optimize <ArrowRight size={14} />
                     </button>
                  </div>
               </div>
            </div>

            <div className="bg-white border border-[#E5E1D8] rounded-[40px] p-8">
               <h4 className="font-serif text-2xl mb-4">Approvals</h4>
               <div className="space-y-4">
                  {[
                    { t: 'Desert Noir Reel', s: 'Needs Review' },
                    { t: 'Heritage Carousel', s: 'Draft' }
                  ].map((a, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-ivory rounded-2xl border border-[#E5E1D8] group hover:border-sage transition-all cursor-pointer">
                       <span className="text-xs font-medium">{a.t}</span>
                       <span className="text-[8px] uppercase font-bold text-warmgray px-2 py-1 bg-white rounded border border-[#E5E1D8] group-hover:bg-sage group-hover:text-white transition-all">{a.s}</span>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: -20; }
        }
      `}</style>
    </div>
  );
};

// Fixed missing BarChart3 reference by adding it to lucide-react imports above
const TrendingUp = (props: any) => <BarChart3 {...props} />;

export default ContentCalendar;
