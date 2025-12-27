import React, { useState, useMemo } from 'react';
import { Search, Grid, List, Share2, Plus, ShieldCheck, AlertTriangle, Sparkles, Loader2, CheckCircle2, MoreVertical } from 'lucide-react';
import { useProjects } from '../../../contexts/ProjectContext';
import { IntelligenceService } from '../../../services/intelligence';

const MediaPage: React.FC = () => {
  const { brands, shoots } = useProjects();
  const brand = brands[0];
  const intelService = IntelligenceService.getInstance();
  
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState('All Assets');
  const [selectedIds, setSelectedIds] = useState<Set<number | string>>(new Set());
  const [isBatchScanning, setIsBatchScanning] = useState(false);

  const categories = ['All Assets', 'SS25 Campaign', 'Archives', 'Behind the Scenes', 'Press Kit', 'Live Captures'];

  const initialAssets = [
    { id: 1, name: 'Silk_Flow_01.jpg', size: '4.2 MB', date: 'Oct 12', cat: 'SS25 Campaign', img: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=400&q=80', compliance: 94, persona: 'The Silent Curator', audit: 'Excellent alignment.' },
    { id: 2, name: 'Heritage_Archive_94.jpg', size: '8.1 MB', date: 'Sept 28', cat: 'Archives', img: 'https://images.unsplash.com/photo-1539109132314-34a9c6ee892b?auto=format&fit=crop&w=400&q=80', compliance: 82, persona: 'The Silent Curator', audit: 'Strong heritage tones.' },
    { id: 3, name: 'Production_Milan_04.jpg', size: '4.1 MB', date: 'Oct 04', cat: 'Behind the Scenes', img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80', compliance: 68, persona: 'The Ethical Epicurean', audit: 'Minor lighting drift.' },
  ];

  const liveAssets = useMemo(() => {
    return shoots.flatMap(shoot => 
      shoot.shotList
        .filter(shot => shot.testImage)
        .map(shot => ({
          id: shot.id,
          name: `${shoot.title}_${shot.id}.jpg`,
          size: '1.2 MB',
          date: 'Just Now',
          cat: 'Live Captures',
          img: shot.testImage!,
          compliance: shot.complianceScore || 0,
          persona: brand.personas[0]?.name || 'N/A',
          audit: shot.auditFeedback || 'Awaiting final verification.'
        }))
    );
  }, [shoots, brand.personas]);

  const allAssets = useMemo(() => [...liveAssets, ...initialAssets], [liveAssets, initialAssets]);
  const filteredAssets = allAssets.filter(a => filter === 'All Assets' || a.cat === filter);

  const toggleSelect = (id: number | string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleBatchAudit = async () => {
    if (selectedIds.size === 0) return;
    setIsBatchScanning(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsBatchScanning(false);
    setSelectedIds(new Set());
    alert("Campaign Batch Audit Complete.");
  };

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
         <div>
            <h2 className="font-serif text-5xl tracking-tighter mb-2">Media Board</h2>
            <p className="text-warmgray">Managing global assets for {brand.name}.</p>
         </div>
         <div className="flex items-center gap-4">
            {selectedIds.size > 0 && (
              <button 
                onClick={handleBatchAudit}
                disabled={isBatchScanning}
                className="flex items-center gap-2 bg-sage text-white px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-lg animate-in"
              >
                {isBatchScanning ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                Neural Batch Audit ({selectedIds.size})
              </button>
            )}
            <button className="p-3 bg-white border border-[#E5E1D8] rounded-full hover:bg-ivory transition-all shadow-sm">
               <Share2 size={18} />
            </button>
            <button className="flex items-center gap-2 bg-charcoal text-white px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
               <Plus size={16} /> Upload Asset
            </button>
         </div>
      </header>

      <div className="flex flex-col gap-6 bg-white p-6 border border-[#E5E1D8] rounded-[32px] shadow-sm">
         <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
               {categories.map(c => (
                 <button key={c} onClick={() => setFilter(c)} className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${filter === c ? 'bg-charcoal text-white shadow-lg' : 'text-warmgray hover:bg-ivory'}`}>{c}</button>
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
      </div>

      <div className={`grid ${view === 'grid' ? 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'} gap-8`}>
         {filteredAssets.map((asset, i) => (
           <div key={asset.id} onClick={() => toggleSelect(asset.id)} className={`group bg-white border rounded-[32px] overflow-hidden hover:shadow-2xl transition-all duration-500 relative cursor-pointer ${selectedIds.has(asset.id) ? 'border-sage ring-2 ring-sage/20' : 'border-[#E5E1D8]'} ${view === 'list' ? 'flex items-center p-4' : ''}`}>
              <div className="absolute top-6 right-6 z-20">
                 <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedIds.has(asset.id) ? 'bg-sage border-sage text-white' : 'border-white bg-black/10 backdrop-blur'}`}>
                    {selectedIds.has(asset.id) && <CheckCircle2 size={12} />}
                 </div>
              </div>
              <div className="absolute top-8 left-8 z-10 flex flex-col gap-2">
                 <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full backdrop-blur-md shadow-lg border ${asset.compliance >= 75 ? 'bg-sage/80 text-white' : 'bg-blush/80 text-charcoal'}`}>
                    {asset.compliance >= 75 ? <ShieldCheck size={10} /> : <AlertTriangle size={10} />}
                    <span className="text-[8px] font-bold tracking-tighter">{asset.compliance}% DNA</span>
                 </div>
              </div>
              <div className={`${view === 'grid' ? 'aspect-square' : 'w-24 h-24'} overflow-hidden relative flex-shrink-0 rounded-[20px] m-4 bg-ivory`}>
                 <img src={asset.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" alt={asset.name} />
              </div>
              <div className={`p-6 ${view === 'list' ? 'flex-1 flex items-center justify-between' : 'space-y-4'}`}>
                 <div>
                    <h3 className="font-semibold text-sm truncate max-w-[200px]">{asset.name}</h3>
                    <p className="text-[10px] uppercase font-bold text-sage tracking-widest mt-1">{asset.cat}</p>
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