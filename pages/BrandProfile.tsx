
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Fingerprint, Edit2, Sparkles, Upload, Camera, Check, X, Save, ShieldAlert, FileText, Search } from 'lucide-react';
import { useProjects } from '../contexts/ProjectContext';
import { useIntelligence } from '../contexts/IntelligenceContext';
import { Product } from '../types';
import { IntelligenceService } from '../services/intelligence';

// Modular Components
import OverviewSection from '../components/brand-profile/OverviewSection';
import ProductCard from '../components/brand-profile/ProductCard';
import RegistrationModal from '../components/brand-profile/RegistrationModal';
import StyleGuideSection from '../components/brand-profile/StyleGuideSection';
import ScoresSection from '../components/brand-profile/ScoresSection';
import TransparencySection from '../components/brand-profile/TransparencySection';

const BrandProfile: React.FC = () => {
  const { id = 'default' } = useParams();
  const { brands, products, addProduct, updateProduct, updateBrand } = useProjects();
  const { openPanel } = useIntelligence();
  const intelService = IntelligenceService.getInstance();
  const brand = brands.find(b => b.id === id) || brands[0];
  const brandProducts = products[id] || [];

  const tabs = ['Overview', 'Scores', 'Style Guide', 'Products', 'Transparency'];
  const [activeTab, setActiveTab] = useState('Overview');
  
  const [isEditingIdentity, setIsEditingIdentity] = useState(false);
  const [tempDescription, setTempDescription] = useState(brand.description);

  const [isRegistering, setIsRegistering] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncLogs, setSyncLogs] = useState<string[]>([]);
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);
  const [isGeneratingMood, setIsGeneratingMood] = useState<string | null>(null);
  const [moodPreviews, setMoodPreviews] = useState<Record<string, string>>({});
  const [newProductData, setNewProductData] = useState({
    name: '',
    price: '',
    category: 'Ready-to-Wear',
    img: 'https://images.unsplash.com/photo-1539109132314-34a9c6ee892b?auto=format&fit=crop&w=400&q=80',
    storyteller: ''
  });

  const saveIdentity = () => {
    updateBrand(brand.id, { description: tempDescription });
    setIsEditingIdentity(false);
  };

  const generateMoodHallucination = async (product: Product) => {
    setIsGeneratingMood(product.id);
    try {
        const result = await intelService.generateMoodboardPreview(product.name);
        if (result) {
            setMoodPreviews(prev => ({ ...prev, [product.id]: result }));
        }
    } catch (e) { console.error(e); } finally { setIsGeneratingMood(null); }
  };

  const generateProductStory = async (product: Product) => {
    try {
      const responseText = await intelService.getStrategicRecommendation(
        brand.name, 
        brand.dna, 
        `Product: ${product.name}, Category: ${product.category}`,
        "Synthesize Luxury Product Story"
      );
      const story = responseText || "Synchronizing heritage narrative...";
      updateProduct(id, product.id, { storyteller: story, status: 'Needs review' });
    } catch (e) {
      console.error("AI Story Generation Failed:", e);
    }
  };

  const handleManualStoryEdit = (productId: string, text: string) => {
    updateProduct(id, productId, { storyteller: text });
  };

  const handleApproveStory = (productId: string) => {
    updateProduct(id, productId, { status: 'On-brand' });
  };

  const registerProduct = async () => {
    setIsSyncing(true);
    const logs = [
      "Establishing handshake with Shopify HQ...",
      "Guardian Agent: Aesthetic Compliance Scan...",
      "Guardian Agent: Style Guide Match [94%]...",
      "Neural Sync: Global inventory updated."
    ];

    for (let i = 0; i < logs.length; i++) {
      setSyncLogs(prev => [...prev, logs[i]]);
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    const prodId = `PROD-${Math.floor(Math.random() * 900) + 100}`;
    const priceVal = parseInt(newProductData.price.replace(/[^0-9]/g, '')) || 500;
    
    const product: Product = {
      id: prodId,
      name: newProductData.name || 'Untitled Piece',
      price: `€${priceVal}`,
      img: newProductData.img,
      category: newProductData.category,
      match: { color: 92, lighting: 88, silhouette: 95, background: 82 },
      pricing: { brand: priceVal, median: priceVal - 50, positioning: '+12% (Premium)' },
      storyteller: newProductData.storyteller || 'A new exploration into form and function.',
      status: 'On-brand'
    };

    addProduct(id, product);
    setIsSyncing(false);
    setIsRegistering(false);
    setSyncLogs([]);
    
    // Handshake with Intelligence Panel - Premium animation delay
    setTimeout(() => {
        openPanel('inventory_audit', {
          title: product.name,
          image: product.img,
          impact: 'High ROI Potential',
          productData: product
        });
    }, 400);

    setNewProductData({
      name: '',
      price: '',
      category: 'Ready-to-Wear',
      img: 'https://images.unsplash.com/photo-1539109132314-34a9c6ee892b?auto=format&fit=crop&w=400&q=80',
      storyteller: ''
    });
  };

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-12 animate-in fade-in duration-1000 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
        <div className="flex items-start gap-8">
           <div className="group relative h-32 w-32 bg-white border border-[#E5E1D8] rounded-[32px] flex items-center justify-center overflow-hidden shadow-sm hover:border-charcoal transition-all">
              <img src="https://images.unsplash.com/photo-1550630992-c037bb2f43ca?auto=format&fit=crop&w=150&q=80" className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform" alt="Logo" />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity cursor-pointer">
                 <Upload size={20} className="text-charcoal" />
                 <span className="text-[9px] font-bold uppercase mt-2 tracking-widest">Update Logo</span>
              </div>
           </div>

           <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <Fingerprint className="text-sage" size={24} />
                 <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-sage">Identity Core</span>
              </div>
              <h2 className="font-serif text-6xl tracking-tighter">{brand.name}</h2>
              {isEditingIdentity ? (
                <div className="space-y-4">
                  <textarea value={tempDescription} onChange={(e) => setTempDescription(e.target.value)} className="w-full bg-white border border-[#E5E1D8] rounded-2xl p-4 text-sm leading-relaxed outline-none focus:border-charcoal min-h-[100px]" />
                  <div className="flex gap-3">
                    <button onClick={saveIdentity} className="flex items-center gap-2 px-6 py-2 bg-charcoal text-white rounded-full text-[10px] uppercase font-bold tracking-widest hover:bg-black transition-all"><Save size={14} /> Save</button>
                    <button onClick={() => setIsEditingIdentity(false)} className="px-6 py-2 border border-[#E5E1D8] rounded-full text-[10px] uppercase font-bold tracking-widest hover:bg-ivory transition-all">Cancel</button>
                  </div>
                </div>
              ) : (
                <p className="text-warmgray text-lg max-w-xl leading-relaxed">{brand.description}</p>
              )}
           </div>
        </div>
        {!isEditingIdentity && (
          <button onClick={() => setIsEditingIdentity(true)} className="flex items-center gap-2 bg-charcoal text-white px-8 py-4 rounded-full text-[10px] uppercase font-bold tracking-widest hover:scale-105 transition-all shadow-xl group">
             <Edit2 size={16} className="group-hover:rotate-12 transition-transform" /> Edit Identity
          </button>
        )}
      </header>

      <div className="flex border-b border-[#E5E1D8] mb-12 overflow-x-auto no-scrollbar">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-10 py-5 text-[10px] uppercase font-bold tracking-[0.2em] border-b-2 transition-all whitespace-nowrap ${activeTab === tab ? 'border-charcoal text-charcoal' : 'border-transparent text-warmgray hover:text-charcoal'}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-12 transition-all duration-700">
        {activeTab === 'Overview' && <OverviewSection brand={brand} />}
        {activeTab === 'Scores' && <ScoresSection brand={brand} />}
        {activeTab === 'Style Guide' && <StyleGuideSection brand={brand} />}
        {activeTab === 'Products' && (
          <div className="space-y-12 pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {brandProducts.map((product, i) => (
                <div key={product.id} className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${i * 100}ms` }}>
                  <ProductCard 
                    product={product} 
                    moodPreview={moodPreviews[product.id]} 
                    isGeneratingMood={isGeneratingMood === product.id} 
                    onMoodClick={() => generateMoodHallucination(product)} 
                    onRegenerateStory={() => generateProductStory(product)} 
                    onStoryEdit={(text) => handleManualStoryEdit(product.id, text)} 
                    onApproveStory={() => handleApproveStory(product.id)} 
                    onBriefShoot={() => openPanel('booking', { title: product.name, image: product.img, impact: 'High Conversion' })} 
                  />
                </div>
              ))}
            </div>
            <button onClick={() => setIsRegistering(true)} className="w-full py-12 border-2 border-dashed border-[#E5E1D8] rounded-[48px] text-warmgray hover:border-charcoal hover:text-charcoal hover:bg-white transition-all font-bold uppercase tracking-[0.3em] text-[11px] flex flex-col items-center justify-center gap-4 group">
               <div className="h-12 w-12 bg-ivory rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"><Upload size={24} /></div>
               <span>+ Register Collection Inventory</span>
            </button>
          </div>
        )}
        {activeTab === 'Transparency' && <TransparencySection brand={brand} />}
      </div>

      {isRegistering && (
        <RegistrationModal isSyncing={isSyncing} syncLogs={syncLogs} newProductData={newProductData} setNewProductData={setNewProductData} onClose={() => setIsRegistering(false)} onGenerateStory={() => {}} isGeneratingStory={false} onFinalize={registerProduct} />
      )}
    </div>
  );
};

export default BrandProfile;
