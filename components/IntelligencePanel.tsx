
import React, { useState } from 'react';
import { Sparkles, ChevronRight, Layout, Zap, Info, Calendar as CalIcon, Image, Clock, Check } from 'lucide-react';

interface IntelligencePanelProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

const Section: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode }> = ({ title, children, icon }) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="border-b border-[#E5E1D8]">
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center justify-between p-4 hover:bg-[#F9F7F2] transition-colors"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-[11px] uppercase tracking-widest font-bold text-[#1A1A1A]">{title}</span>
        </div>
        <ChevronRight size={14} className={`transform transition-transform ${collapsed ? '' : 'rotate-90'} text-[#8C8C8C]`} />
      </button>
      {!collapsed && <div className="p-4 pt-0">{children}</div>}
    </div>
  );
};

const IntelligencePanel: React.FC<IntelligencePanelProps> = ({ isOpen, setIsOpen }) => {
  const [appliedOptimization, setAppliedOptimization] = useState(false);
  const [mediaFilter, setMediaFilter] = useState<'All' | 'SS25' | 'Campaigns' | 'Mood'>('All');

  const mediaItems = [
    { url: "https://images.unsplash.com/photo-1537832816519-689ad163238b?auto=format&fit=crop&w=200&q=80", cat: 'SS25' },
    { url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80", cat: 'Campaigns' },
    { url: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=200&q=80", cat: 'Mood' },
    { url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=200&q=80", cat: 'SS25' }
  ];

  const filteredMedia = mediaFilter === 'All' ? mediaItems : mediaItems.filter(item => item.cat === mediaFilter);

  if (!isOpen) return (
    <button 
      onClick={() => setIsOpen(true)}
      className="fixed right-0 top-1/2 -translate-y-1/2 bg-white border border-r-0 border-[#E5E1D8] p-2 rounded-l-xl shadow-sm z-30 hover:bg-[#F9F7F2] transition-all"
    >
      <Sparkles size={20} className="text-[#1A1A1A]" />
    </button>
  );

  return (
    <aside className="w-80 h-full bg-white border-l border-[#E5E1D8] flex flex-col z-30 overflow-hidden transition-all duration-300">
      <div className="h-20 flex items-center px-6 justify-between bg-white border-b border-[#E5E1D8]">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-[#1A1A1A]" />
          <h2 className="serif text-lg font-medium">Intelligence</h2>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-xs text-[#8C8C8C] hover:text-[#1A1A1A]">Hide</button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <Section title="AI Actions" icon={<Zap size={14} />}>
          <div className="space-y-2">
            <button className="w-full text-left p-3 text-xs bg-[#1A1A1A] text-white rounded-lg font-medium hover:bg-black transition-all">
              Optimize Schedule
            </button>
            <button className="w-full text-left p-3 text-xs border border-[#E5E1D8] rounded-lg font-medium hover:bg-[#F9F7F2] transition-all">
              Draft Press Release
            </button>
          </div>
        </Section>

        <Section title="Smart Optimizations" icon={<Layout size={14} />}>
          {!appliedOptimization ? (
            <div className="p-3 bg-[#F9F7F2] rounded-lg border border-[#E5E1D8] animate-in fade-in slide-in-from-top-2">
              <div className="flex items-start gap-2 mb-2">
                <Info size={14} className="text-[#1A1A1A] mt-0.5" />
                <p className="text-[11px] font-medium leading-relaxed">
                  Lighting peak efficiency at 4PM. Shift shoot 30m earlier to save on HMI rentals.
                </p>
              </div>
              <button 
                onClick={() => setAppliedOptimization(true)}
                className="text-[10px] text-[#1A1A1A] underline font-bold"
              >
                Apply Suggestion
              </button>
            </div>
          ) : (
            <div className="p-3 bg-green-50 rounded-lg border border-green-100 flex items-center gap-2">
              <Check size={14} className="text-green-600" />
              <p className="text-[10px] font-bold text-green-700 uppercase tracking-widest">Schedule Optimized</p>
            </div>
          )}
        </Section>

        <Section title="Media Board" icon={<Image size={14} />}>
           <div className="mb-4 flex gap-2 overflow-x-auto pb-2 custom-scrollbar no-scrollbar">
              {['All', 'SS25', 'Campaigns', 'Mood'].map(filter => (
                <button 
                  key={filter}
                  onClick={() => setMediaFilter(filter as any)}
                  className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border transition-all whitespace-nowrap ${
                    mediaFilter === filter ? 'bg-charcoal text-white border-charcoal' : 'bg-ivory text-warmgray border-[#E5E1D8] hover:border-warmgray'
                  }`}
                >
                  {filter}
                </button>
              ))}
           </div>
           <div className="grid grid-cols-2 gap-2 animate-in fade-in duration-500">
              {filteredMedia.map((item, i) => (
                <div key={i} className="aspect-square bg-[#F9F7F2] rounded overflow-hidden hover:scale-105 transition-transform cursor-pointer relative group">
                   <img src={item.url} className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-[8px] text-white font-bold uppercase tracking-widest">{item.cat}</span>
                   </div>
                </div>
              ))}
           </div>
        </Section>

        <Section title="Timeline" icon={<CalIcon size={14} />}>
           <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-3">
                   <div className="w-10 h-10 bg-[#F9F7F2] flex flex-col items-center justify-center rounded border border-[#E5E1D8]">
                      <span className="text-[8px] font-bold text-[#8C8C8C]">SEP</span>
                      <span className="text-xs font-bold">{12+i}</span>
                   </div>
                   <div>
                      <p className="text-xs font-semibold">Campaign Review</p>
                      <p className="text-[10px] text-[#8C8C8C]">10:00 AM — Studio A</p>
                   </div>
                </div>
              ))}
           </div>
        </Section>
      </div>

      <div className="p-4 border-t border-[#E5E1D8] bg-[#F9F7F2]">
        <p className="text-[10px] font-medium text-[#8C8C8C] leading-relaxed">
          FashionOS Intelligence uses brand guidelines to suggest optimizations.
        </p>
      </div>
    </aside>
  );
};

export default IntelligencePanel;
