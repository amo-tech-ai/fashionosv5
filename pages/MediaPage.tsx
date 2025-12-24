
import React, { useState } from 'react';
import { Search, Filter, Image as ImageIcon, Grid, List, Download, Share2, MoreVertical, Plus, ShieldCheck, AlertTriangle, Sparkles, User, BrainCircuit, Loader2 } from 'lucide-react';
import { useProjects } from '../contexts/ProjectContext';
import { IntelligenceService } from '../services/intelligence';

const MediaPage: React.FC = () => {
  const { brands } = useProjects();
  const brand = brands[0];
  const intelService = IntelligenceService.getInstance();
  
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState('All Assets');
  const [personaFilter, setPersonaFilter] = useState<string | null>(null);
  const [isScanningId, setIsScanningId] = useState<number | null>(null);

  const categories = ['All Assets', 'SS25 Campaign', 'Archives', 'Behind the Scenes', 'Press Kit'];

  const [assets, setAssets] = useState([
    { id: 1, name: 'Silk_Flow_01.jpg', size: '4.2 MB', date: 'Oct 12', cat: 'SS25 Campaign', img: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=400&q=80', compliance: 94, persona: 'The Silent Curator', audit: 'Excellent alignment.' },
    { id: 2, name: 'Heritage_Archive_94.jpg', size: '8.1 MB', date: 'Sept 28', cat: 'Archives', img: 'https://images.unsplash.com/photo-1539109132314-34a9c6ee892b?auto=format&fit=crop&w=400&q=80', compliance: 82, persona: 'The Silent Curator', audit: 'Strong heritage tones.' },
    { id: 3, name: 'Production_Milan_04.jpg', size: '4.1 MB', date: 'Oct 04', cat: 'Behind the Scenes', img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80', compliance: 68, persona: 'The Ethical Epicurean', audit: 'Minor lighting drift.' },
    { id: 4, name: 'Lookbook_SS25.jpg', size: '2.4 MB', date: 'Oct 10', cat: 'SS25 Campaign', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80', compliance: 91, persona: 'The Ethical Epicurean', audit: 'Verified DNA compliant.' },
  ]);

  const handleNeuralScan = async (asset: any) => {
    setIsScanningId(asset.id);
    try {
      // Logic: Convert URL to base64 or proxy. For demo, we trigger the Vision API.
      const result = await intelService.scanMediaAsset(asset.img, brand.dna);
      setAssets(prev => prev.map(a => a.id === asset.id ? { ...a, compliance: result.score, audit: result.audit } : a));
    } catch (e) {
      console.error(e);
    } finally {
      setIsScanningId(null);
    }
  };

  const filteredAssets = assets.filter(a => {
    const catMatch = filter === 'All Assets' || a.cat === filter;
    const personaMatch = !personaFilter || a.persona === personaFilter;
    return catMatch && personaMatch;
  });

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
         <div>
            <h2 className="font-serif text-5xl tracking-tighter mb-2">Media Board</h2>
            <p className="text-warmgray">Your global asset repository for {brand.name}.</p>
         </div>
         <div className="flex items-center gap-4">
            <button className="p-3 bg-white border border-[#E5E1D8] rounded-full hover:bg-ivory transition-all">
               <Share2 size={18} />
            </button>
            <button className="flex items-center gap-2 bg-charcoal text-white px-8 py-4 rounded-full text-[10px] uppercase font-bold tracking-widest hover:scale-105 transition-all shadow-xl">
               <Plus size={16} /> Upload Asset
            </button>
         </div>
      </header>

      {/* Intelligence Filters Bar */}
      <div className="flex flex-col gap-6 bg-white p-6 border border-[#E5E1D8] rounded-[32px] shadow-sm">
         <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
               {categories.map(c => (
                 <button 
                   key={c}
                   onClick={() => setFilter(c)}
                   className={`px-6 py-2 rounded-full text-[10px] uppercase font-bold tracking-widest transition-all whitespace-nowrap ${
                     filter === c ? 'bg-charcoal text-white shadow-lg' : 'text-warmgray hover:bg-ivory'
                   }`}
                 >
                   {c}
                 </button>
               ))}
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
               <div className="flex bg-ivory p-1 rounded-full border border-[#E5E1D8]">
                  <button onClick={() => setView('grid')} className={`p-2 rounded-full ${view === 'grid' ? 'bg-white shadow-sm' : ''}`}><Grid size={16} /></button>
                  <button onClick={() => setView('list')} className={`p-2 rounded-full ${view === 'list' ? 'bg-white shadow-sm' : ''}`}><List size={16} /></button>
               </div>
               <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-warmgray" size={14} />
                  <input className="w-full bg-ivory border border-[#E5E1D8] rounded-full pl-10 pr-4 py-2 text-xs outline-none focus:border-charcoal transition-all" placeholder="Search assets..." />
               </div>
            </div>
         </div>

         <div className="pt-4 border-t border-ivory flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-warmgray">
               <User size={14} /> Persona Alignment
            </div>
            <div className="flex flex-wrap gap-2">
               <button 
                 onClick={() => setPersonaFilter(null)}
                 className={`px-4 py-1.5 rounded-xl text-[9px] font-bold uppercase tracking-widest border transition-all ${!personaFilter ? 'bg-sage text-white border-sage' : 'bg-white text-warmgray border-ivory hover:border-warmgray'}`}
               >
                 All Personas
               </button>
               {brand.personas.map(p => (
                 <button 
                   key={p.name}
                   onClick={() => setPersonaFilter(p.name)}
                   className={`px-4 py-1.5 rounded-xl text-[9px] font-bold uppercase tracking-widest border transition-all ${personaFilter === p.name ? 'bg-sage text-white border-sage' : 'bg-white text-warmgray border-ivory hover:border-warmgray'}`}
                 >
                   {p.name}
                 </button>
               ))}
            </div>
         </div>
      </div>

      <div className={`grid ${view === 'grid' ? 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'} gap-8`}>
         {filteredAssets.map(asset => (
           <div key={asset.id} className={`group bg-white border border-[#E5E1D8] rounded-[32px] overflow-hidden hover:shadow-2xl transition-all duration-500 relative ${view === 'list' ? 'flex items-center p-4' : ''}`}>
              <div className="absolute top-8 left-8 z-10 flex flex-col gap-2">
                 <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full backdrop-blur-md shadow-lg border ${
                   asset.compliance >= 90 ? 'bg-sage/80 border-sage/20 text-white' : 
                   asset.compliance >= 75 ? 'bg-white/80 border-[#E5E1D8] text-charcoal' : 
                   'bg-blush/80 border-blush/20 text-charcoal'
                 }`}>
                    {asset.compliance >= 75 ? <ShieldCheck size={10} /> : <AlertTriangle size={10} />}
                    <span className="text-[8px] font-bold tracking-tighter">{asset.compliance}% DNA</span>
                 </div>
                 <button 
                    onClick={() => handleNeuralScan(asset)}
                    disabled={isScanningId === asset.id}
                    className="px-3 py-1 bg-charcoal text-white rounded-full text-[7px] font-bold uppercase tracking-widest border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                 >
                    {isScanningId === asset.id ? <Loader2 size={8} className="animate-spin" /> : <Sparkles size={8} />}
                    Neural Scan
                 </button>
              </div>

              <div className={`${view === 'grid' ? 'aspect-square' : 'w-24 h-24'} overflow-hidden relative flex-shrink-0 rounded-[20px] m-4`}>
                 <img src={asset.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" alt={asset.name} />
              </div>
              <div className={`p-6 ${view === 'list' ? 'flex-1 flex items-center justify-between' : 'space-y-4'}`}>
                 <div>
                    <h3 className="font-semibold text-sm truncate max-w-[200px]">{asset.name}</h3>
                    <p className="text-[10px] uppercase font-bold text-warmgray tracking-widest mt-1">{asset.cat}</p>
                    {asset.audit && (
                      <p className="text-[9px] text-warmgray italic mt-2 line-clamp-1">"{asset.audit}"</p>
                    )}
                 </div>
                 <div className={`flex items-center justify-between ${view === 'list' ? 'gap-12' : 'pt-4 border-t border-ivory'}`}>
                    <span className="text-[10px] font-bold text-warmgray">{asset.size}</span>
                    <button className="p-2 hover:bg-ivory rounded-full"><MoreVertical size={16} className="text-warmgray" /></button>
                 </div>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};

export default MediaPage;
