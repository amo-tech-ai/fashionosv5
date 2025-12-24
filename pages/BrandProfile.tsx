
import React, { useState } from 'react';
import { 
  Target, User, Image as ImageIcon, Check, Edit2, 
  ChevronLeft, ChevronRight, BarChart3, Palette, 
  Package, ShieldCheck, Zap, TrendingUp, Info, 
  CheckCircle, DollarSign, Eye, Scissors, Sparkles 
} from 'lucide-react';

const carouselImages = [
  '1539109132314-34a9c6ee892b',
  '1537832816519-689ad163238b',
  '1524504388940-b1c1722653e1',
  '1515886657613-9f3515b0c78f',
  '1496747611176-843222e1e57c',
  '1490481651871-ab68de25d43d'
];

const BrandProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const tabs = ['Overview', 'Scores', 'Style Guide', 'Products'];

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % (carouselImages.length - 2));
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + (carouselImages.length - 2)) % (carouselImages.length - 2));
  };

  const renderOverview = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section className="relative aspect-[21/9] rounded-[40px] overflow-hidden group">
        <img src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Brand Hero" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
        <div className="absolute bottom-8 left-8">
          <p className="text-white/60 text-[10px] uppercase font-bold tracking-[0.3em] mb-2">Heritage Manifesto</p>
          <h3 className="text-white font-serif text-3xl">Crafted in the heart of Paris.</h3>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-[#E5E1D8] rounded-[32px] p-8 space-y-4">
          <div className="h-10 w-10 bg-ivory rounded-xl flex items-center justify-center">
            <Target size={20} className="text-sage" />
          </div>
          <h4 className="font-serif text-2xl">Brand DNA</h4>
          <ul className="space-y-3">
            {['Sustainable Craft', 'Precision Silhouettes', 'Heritage Narrative'].map(dna => (
              <li key={dna} className="flex items-center gap-2 text-sm text-warmgray">
                <Check size={14} className="text-sage" />
                {dna}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white border border-[#E5E1D8] rounded-[32px] p-8 space-y-4">
          <div className="h-10 w-10 bg-ivory rounded-xl flex items-center justify-center">
            <User size={20} className="text-blush" />
          </div>
          <h4 className="font-serif text-2xl">Target Audience</h4>
          <p className="text-sm text-warmgray leading-relaxed">Conscious luxury seekers who value ethical origins and timeless, minimalist aesthetics.</p>
        </div>
      </div>

      <section className="space-y-6">
        <h4 className="font-serif text-3xl">Target Personas</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {[
             { 
               name: 'The Silent Curator', 
               demo: '35-45, Global Citizen', 
               psycho: 'Values structural integrity, radical transparency, and the "forever" purchase.',
               gradient: 'from-[#D9D1C5]/20 to-transparent'
             },
             { 
               name: 'The Ethical Epicurean', 
               demo: '28-40, Urban Professional', 
               psycho: 'Seeks tactile sensory experiences and ethical craftsmanship narrative.',
               gradient: 'from-[#8FAE9E]/20 to-transparent'
             }
           ].map(persona => (
             <div key={persona.name} className={`bg-white border border-[#E5E1D8] rounded-[32px] p-8 relative overflow-hidden group hover:shadow-xl transition-all`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${persona.gradient}`} />
                <div className="relative z-10">
                   <p className="text-[10px] uppercase font-bold tracking-widest text-sage mb-2">Persona Detail</p>
                   <h5 className="font-serif text-2xl mb-4">{persona.name}</h5>
                   <div className="space-y-4">
                      <div>
                         <span className="text-[10px] uppercase font-bold text-warmgray tracking-widest">Demographics</span>
                         <p className="text-sm font-medium mt-1">{persona.demo}</p>
                      </div>
                      <div>
                         <span className="text-[10px] uppercase font-bold text-warmgray tracking-widest">Psychographics</span>
                         <p className="text-xs leading-relaxed text-warmgray mt-1">{persona.psycho}</p>
                      </div>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </section>
    </div>
  );

  const renderScores = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Website UX', score: 92, status: 'Optimal' },
          { label: 'Social Sentiment', score: 74, status: 'Growing' },
          { label: 'Sustainability', score: 88, status: 'Leading' }
        ].map(item => (
          <div key={item.label} className="bg-white border border-[#E5E1D8] rounded-[32px] p-8">
            <p className="text-[10px] uppercase font-bold tracking-widest text-warmgray mb-4">{item.label}</p>
            <div className="flex items-end justify-between">
              <span className="text-5xl font-serif">{item.score}%</span>
              <span className="text-[10px] font-bold text-sage uppercase">{item.status}</span>
            </div>
            <div className="h-1.5 bg-ivory rounded-full mt-6 overflow-hidden">
               <div className="h-full bg-sage" style={{ width: `${item.score}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-charcoal text-white rounded-[40px] p-10 flex flex-col md:flex-row gap-10 items-center">
        <div className="flex-1 space-y-4">
           <div className="flex items-center gap-2 text-sage">
              <ShieldCheck size={20} />
              <span className="text-[10px] uppercase font-bold tracking-[0.2em]">AI Intelligence Report</span>
           </div>
           <h4 className="font-serif text-3xl">Strategy Gap Analysis</h4>
           <p className="text-white/60 leading-relaxed">Your brand is currently under-utilizing short-form video for heritage storytelling. Increasing TikTok placement by 12% could unlock a younger affluent demographic.</p>
        </div>
        <button className="px-10 py-5 bg-sage text-white rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all">
           Generate Pivot Plan
        </button>
      </div>
    </div>
  );

  const renderStyleGuide = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="font-serif text-3xl">Visual Standards</h4>
          <div className="flex items-center gap-2">
            <button 
              onClick={prevSlide}
              className="p-2 border border-[#E5E1D8] rounded-full bg-white hover:bg-charcoal hover:text-white hover:-translate-y-1.5 hover:shadow-[0_0_20px_rgba(143,174,158,0.4)] transition-all duration-500 shadow-sm"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={nextSlide}
              className="p-2 border border-[#E5E1D8] rounded-full bg-white hover:bg-charcoal hover:text-white hover:-translate-y-1.5 hover:shadow-[0_0_20px_rgba(143,174,158,0.4)] transition-all duration-500 shadow-sm"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
            style={{ transform: `translateX(-${carouselIndex * (100 / 3)}%)` }}
          >
            {carouselImages.map((id, i) => (
              <div key={i} className="w-1/3 flex-shrink-0 px-2">
                <div className="group aspect-square rounded-[32px] overflow-hidden border border-[#E5E1D8] cursor-pointer shadow-sm">
                  <img 
                    src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=80`} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                    alt={`Standard ${i}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="bg-white border border-[#E5E1D8] rounded-[32px] p-8">
            <h5 className="font-serif text-xl mb-6 flex items-center gap-2">
               <Palette size={18} className="text-warmgray" />
               Verbal Tone
            </h5>
            <div className="space-y-4">
               {[
                 { label: 'Voice', value: 'Sophisticated & Precise' },
                 { label: 'POV', value: 'First Person Collective' },
                 { label: 'Primary Adjective', value: 'Timeless' }
               ].map(item => (
                 <div key={item.label} className="flex justify-between border-b border-ivory pb-2">
                    <span className="text-[10px] uppercase font-bold text-warmgray tracking-widest">{item.label}</span>
                    <span className="text-xs font-semibold">{item.value}</span>
                 </div>
               ))}
            </div>
         </div>
         <div className="bg-white border border-[#E5E1D8] rounded-[32px] p-8">
            <h5 className="font-serif text-xl mb-6 flex items-center gap-2">
               <ImageIcon size={18} className="text-warmgray" />
               Asset Guidelines
            </h5>
            <div className="space-y-4">
               {[
                 { label: 'Lighting', value: 'Diffused Daylight' },
                 { label: 'Crop Style', value: 'Architectural / Wide' },
                 { label: 'Filter Profile', value: 'Neutral High-End' }
               ].map(item => (
                 <div key={item.label} className="flex justify-between border-b border-ivory pb-2">
                    <span className="text-[10px] uppercase font-bold text-warmgray tracking-widest">{item.label}</span>
                    <span className="text-xs font-semibold">{item.value}</span>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { 
            name: 'Heritage Silk Blouse', 
            price: '€840', 
            id: 'HSB-01', 
            img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80',
            match: { color: 98, light: 92, silh: 85 },
            pricing: { market: '€790', position: '+6% (Premium)' }
          },
          { 
            name: 'Architectural Blazer', 
            price: '€1,250', 
            id: 'AB-22', 
            img: 'https://images.unsplash.com/photo-1539109132314-34a9c6ee892b?auto=format&fit=crop&w=400&q=80',
            match: { color: 94, light: 88, silh: 92 },
            pricing: { market: '€1,100', position: '+13% (Luxury)' }
          },
          { 
            name: 'Minimalist Trousers', 
            price: '€620', 
            id: 'MT-04', 
            img: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=400&q=80',
            match: { color: 89, light: 95, silh: 82 },
            pricing: { market: '€580', position: '+7% (Premium)' }
          }
        ].map(product => (
          <div key={product.id} className="bg-white border border-[#E5E1D8] rounded-[32px] overflow-hidden group hover:shadow-2xl transition-all duration-500">
            <div className="aspect-[3/4] overflow-hidden relative">
               <img src={product.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={product.name} />
               <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[9px] font-bold uppercase tracking-widest shadow-sm">{product.id}</span>
                  <div className="px-3 py-1 bg-charcoal/90 backdrop-blur rounded-full flex items-center gap-2 shadow-sm">
                     <div className="h-1.5 w-1.5 bg-sage rounded-full" />
                     <span className="text-[9px] font-bold uppercase tracking-widest text-white">94% DNA Match</span>
                  </div>
               </div>
            </div>
            <div className="p-8 space-y-6">
               <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-serif text-xl">{product.name}</h5>
                    <p className="text-[10px] uppercase font-bold text-warmgray tracking-widest mt-1">Ready-to-Wear</p>
                  </div>
                  <span className="text-sm font-bold">{product.price}</span>
               </div>

               {/* Pricing Intelligence */}
               <div className="p-4 bg-ivory rounded-2xl border border-[#E5E1D8] space-y-3">
                  <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-warmgray tracking-widest mb-1">
                     <DollarSign size={12} className="text-sage" />
                     Pricing Intelligence
                  </div>
                  <div className="flex justify-between items-center text-xs">
                     <span className="text-warmgray">Market Benchmark</span>
                     <span className="font-bold">{product.pricing.market}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                     <span className="text-warmgray">Positioning</span>
                     <span className="font-bold text-sage">{product.pricing.position}</span>
                  </div>
               </div>

               {/* DNA Match Breakdown */}
               <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-warmgray tracking-widest mb-1">
                     <Eye size={12} className="text-sage" />
                     Aesthetic Alignment
                  </div>
                  {[
                    { label: 'Color Sync', value: product.match.color, icon: Palette },
                    { label: 'Lighting', value: product.match.light, icon: Zap },
                    { label: 'Silhouette', value: product.match.silh, icon: Scissors }
                  ].map(stat => (
                    <div key={stat.label} className="space-y-1">
                       <div className="flex justify-between text-[9px] font-bold uppercase tracking-tighter">
                          <span className="text-warmgray">{stat.label}</span>
                          <span className="text-charcoal">{stat.value}%</span>
                       </div>
                       <div className="h-1 bg-ivory rounded-full overflow-hidden">
                          <div className="h-full bg-sage transition-all duration-1000" style={{ width: `${stat.value}%` }} />
                       </div>
                    </div>
                  ))}
               </div>

               <div className="flex items-center gap-2 pt-2 border-t border-ivory">
                  <div className="h-6 w-6 bg-sage/10 rounded flex items-center justify-center text-sage">
                     <Sparkles size={12} />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-warmgray tracking-widest">AI Storytelling Active</span>
               </div>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full py-6 border-2 border-dashed border-[#E5E1D8] rounded-[32px] text-warmgray hover:border-charcoal hover:text-charcoal transition-all font-bold uppercase tracking-[0.2em] text-[10px]">
         + Add Collection Item
      </button>
    </div>
  );

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
         <div className="animate-in fade-in slide-in-from-left duration-700">
            <h2 className="font-serif text-6xl tracking-tighter mb-4">L’Artisan Paris</h2>
            <p className="text-sage font-medium tracking-widest uppercase text-xs">Maison de Couture — Since 1994</p>
         </div>
         <div className="flex gap-2 bg-[#E5E1D8]/30 p-1.5 rounded-full border border-[#E5E1D8]">
            {tabs.map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-[10px] uppercase font-bold tracking-widest transition-all ${activeTab === tab ? 'bg-white shadow-lg text-charcoal' : 'text-warmgray hover:text-charcoal'}`}
              >
                {tab}
              </button>
            ))}
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Main Panel */}
         <div className="lg:col-span-2">
            {activeTab === 'Overview' && renderOverview()}
            {activeTab === 'Scores' && renderScores()}
            {activeTab === 'Style Guide' && renderStyleGuide()}
            {activeTab === 'Products' && renderProducts()}
         </div>

         {/* Side Panel: AI Assistant */}
         <div className="space-y-8">
            <div className="glass rounded-[32px] p-8 border border-sage/20 bg-sage/5">
               <div className="flex items-center gap-3 mb-6">
                  <div className="h-8 w-8 bg-charcoal rounded-xl flex items-center justify-center text-white">
                     <Edit2 size={16} />
                  </div>
                  <h5 className="font-serif text-xl">AI Assistant</h5>
               </div>
               <div className="space-y-4">
                  <button className="w-full p-4 bg-white border border-[#E5E1D8] rounded-2xl text-[10px] uppercase font-bold tracking-widest hover:border-sage transition-all text-left flex justify-between items-center group">
                     Rewrite Brand Bio
                     <Check size={14} className="opacity-0 group-hover:opacity-100 text-sage" />
                  </button>
                  <button className="w-full p-4 bg-white border border-[#E5E1D8] rounded-2xl text-[10px] uppercase font-bold tracking-widest hover:border-sage transition-all text-left flex justify-between items-center group">
                     Adjust Tone of Voice
                     <Check size={14} className="opacity-0 group-hover:opacity-100 text-sage" />
                  </button>
                  <button className="w-full p-4 bg-white border border-[#E5E1D8] rounded-2xl text-[10px] uppercase font-bold tracking-widest hover:border-sage transition-all text-left flex justify-between items-center group">
                     Refresh Intelligence Scores
                     <Check size={14} className="opacity-0 group-hover:opacity-100 text-sage" />
                  </button>
               </div>
            </div>

            <div className="bg-charcoal text-white rounded-[32px] p-8">
               <div className="h-12 w-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                  <Package size={24} />
               </div>
               <h5 className="font-serif text-2xl mb-2">Inventory Sync</h5>
               <p className="text-white/50 text-xs leading-relaxed mb-6">Your products are currently synced with Shopify and Farfetch global catalogues.</p>
               <div className="flex gap-2 mb-8">
                  <div className="h-8 w-8 rounded bg-[#D9D1C5]" />
                  <div className="h-8 w-8 rounded bg-[#8FAE9E]" />
                  <div className="h-8 w-8 rounded bg-[#E8D6D1]" />
               </div>
               <button className="w-full py-4 border border-white/20 rounded-xl text-[10px] uppercase tracking-widest font-bold hover:bg-white/10 transition-colors">
                  Export PDF Lookbook
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default BrandProfile;
