
import React from 'react';
import { Package, X, Loader2, CheckCircle2, Fingerprint, Tag, DollarSign, Camera, Save, RotateCcw, Sparkles } from 'lucide-react';

interface RegistrationModalProps {
  isSyncing: boolean;
  syncLogs: string[];
  newProductData: {
    name: string;
    price: string;
    category: string;
    img: string;
    storyteller: string;
  };
  setNewProductData: (data: any) => void;
  onClose: () => void;
  onGenerateStory: () => void;
  isGeneratingStory: boolean;
  onFinalize: () => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isSyncing,
  syncLogs,
  newProductData,
  setNewProductData,
  onClose,
  onGenerateStory,
  isGeneratingStory,
  onFinalize
}) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
       <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm" onClick={() => !isSyncing && onClose()} />
       <div className="bg-white w-full max-w-4xl rounded-[48px] shadow-2xl relative z-10 overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-500">
          
          {isSyncing && (
            <div className="absolute inset-0 z-50 glass flex items-center justify-center animate-in fade-in duration-300">
               <div className="w-full max-w-md bg-charcoal text-white rounded-[40px] p-10 shadow-2xl space-y-8">
                  <div className="flex items-center gap-4">
                     <Loader2 size={32} className="animate-spin text-sage" />
                     <h2 className="font-serif text-3xl">Neural Sync...</h2>
                  </div>
                  <div className="space-y-3 font-mono text-[10px] text-white/40">
                     {syncLogs.map((log, i) => (
                       <p key={i} className="animate-in slide-in-from-left-2 duration-300 flex items-center gap-2">
                         <span className="text-sage">❯</span> {log}
                       </p>
                     ))}
                  </div>
               </div>
            </div>
          )}

          <div className="md:w-1/3 bg-ivory p-12 flex flex-col justify-center items-center text-center space-y-6 border-r border-[#E5E1D8]">
             <div className="h-20 w-20 bg-charcoal rounded-3xl flex items-center justify-center text-white shadow-xl">
                <Package size={32} />
             </div>
             <div>
                <h3 className="font-serif text-3xl mb-2">Inventory Sync</h3>
                <p className="text-xs text-warmgray leading-relaxed">Registering items triggers the Guardian Agent for visual compliance.</p>
             </div>
             <div className="w-full pt-8 space-y-4">
                <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-sage">
                   <CheckCircle2 size={12} /> Shopify Bridge: Active
                </div>
                <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-sage">
                   <CheckCircle2 size={12} /> Guardian Scan: Ready
                </div>
                <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-sage">
                   <Fingerprint size={12} /> DNA Fingerprinting: On
                </div>
             </div>
          </div>
          
          <div className="flex-1 p-12 space-y-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
             <div className="flex justify-between items-center">
                <h4 className="font-serif text-2xl">Product Registration</h4>
                <button onClick={onClose} className="p-2 hover:bg-ivory rounded-full"><X size={20}/></button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-warmgray">Product Name</label>
                      <div className="flex items-center gap-3 p-4 bg-ivory border border-[#E5E1D8] rounded-2xl focus-within:border-charcoal transition-all">
                         <Tag size={16} className="text-warmgray" />
                         <input 
                           className="bg-transparent border-none outline-none text-sm w-full font-medium" 
                           placeholder="e.g. Scuplted Silk Dress" 
                           value={newProductData.name}
                           onChange={e => setNewProductData({...newProductData, name: e.target.value})}
                         />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-warmgray">Target Price (€)</label>
                      <div className="flex items-center gap-3 p-4 bg-ivory border border-[#E5E1D8] rounded-2xl focus-within:border-charcoal transition-all">
                         <DollarSign size={16} className="text-warmgray" />
                         <input 
                           className="bg-transparent border-none outline-none text-sm w-full font-medium" 
                           placeholder="850" 
                           value={newProductData.price}
                           onChange={e => setNewProductData({...newProductData, price: e.target.value})}
                         />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-warmgray">Category</label>
                      <select 
                        className="w-full bg-ivory border border-[#E5E1D8] rounded-2xl p-4 text-sm font-medium outline-none focus:border-charcoal appearance-none"
                        value={newProductData.category}
                        onChange={e => setNewProductData({...newProductData, category: e.target.value})}
                      >
                         <option>Ready-to-Wear</option>
                         <option>Luxury Tailoring</option>
                         <option>Artisanal Accessories</option>
                         <option>Outerwear</option>
                      </select>
                   </div>
                </div>

                <div className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-warmgray">Visual Preview</label>
                      <div className="aspect-square bg-ivory border-2 border-dashed border-[#E5E1D8] rounded-3xl flex flex-col items-center justify-center text-warmgray group hover:border-charcoal transition-all cursor-pointer relative overflow-hidden">
                         {newProductData.img ? (
                           <img src={newProductData.img} className="w-full h-full object-cover" />
                         ) : (
                           <>
                              <Camera size={32} className="mb-2" />
                              <span className="text-[10px] font-bold uppercase tracking-widest">Upload Campaign Shot</span>
                           </>
                         )}
                      </div>
                   </div>
                </div>
             </div>

             <div className="p-6 bg-charcoal rounded-3xl text-white space-y-4">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2 text-sage">
                      <Sparkles size={16} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">AI Storyteller Preview</span>
                   </div>
                   <button 
                    onClick={onGenerateStory}
                    disabled={isGeneratingStory || !newProductData.name}
                    className="text-[9px] font-bold uppercase tracking-widest text-white/60 hover:text-white flex items-center gap-2 transition-all disabled:opacity-30 group/regen"
                   >
                      {isGeneratingStory ? <Loader2 size={12} className="animate-spin" /> : <RotateCcw size={12} className="group-hover/regen:rotate-180 transition-transform duration-500" />}
                      Generate Draft
                   </button>
                </div>
                <textarea 
                  value={newProductData.storyteller}
                  onChange={(e) => setNewProductData({...newProductData, storyteller: e.target.value})}
                  className="w-full bg-white/5 border-none focus:ring-0 p-2 text-xs leading-relaxed italic text-white/80 font-medium resize-none min-h-[60px] rounded-lg"
                  placeholder={isGeneratingStory ? "Synthesizing luxury narrative..." : "Waiting for product metadata to synthesize description..."}
                />
             </div>

             <div className="flex gap-4 pt-4">
                <button 
                  onClick={onClose}
                  className="flex-1 py-4 border border-[#E5E1D8] rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-ivory transition-all"
                >
                   Discard
                </button>
                <button 
                  onClick={onFinalize}
                  className="flex-[2] py-4 bg-charcoal text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xl"
                >
                   <Save size={16} /> Finalize Registration
                </button>
             </div>
          </div>
       </div>
    </div>
  );
};

export default RegistrationModal;
