
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Star, Globe, Instagram, MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

const BrandIntake: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'Luxury',
    website: '',
    instagram: '',
  });

  const types = ['Womenswear', 'Menswear', 'Swimwear', 'Luxury', 'Streetwear'];

  return (
    <div className="min-h-screen bg-ivory flex flex-col md:flex-row">
      {/* Left Panel: Nav */}
      <div className="w-full md:w-20 border-r border-[#E5E1D8] bg-white flex flex-col items-center py-8 gap-8">
        <div className="font-serif text-2xl font-bold">F.</div>
        <div className="flex flex-col gap-6">
          <Star size={20} className="text-charcoal" />
          <div className="h-10 w-[2px] bg-[#E5E1D8] mx-auto" />
        </div>
      </div>

      {/* Main Panel: Wizard */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-2xl">
          <header className="mb-12">
            <h1 className="font-serif text-5xl font-medium tracking-tight mb-4">Create your brand profile.</h1>
            <p className="text-warmgray text-lg leading-relaxed">Let AI understand your brand to plan content, shoots, and growth strategies.</p>
          </header>

          <div className="glass rounded-[32px] p-8 md:p-12 shadow-2xl space-y-10">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-warmgray">Brand Name</label>
                <input 
                  className="w-full bg-ivory border-b border-[#E5E1D8] py-4 px-2 focus:border-sage outline-none transition-all text-xl font-medium"
                  placeholder="e.g. Maison de Silk"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-warmgray">Brand Description</label>
                <textarea 
                  className="w-full bg-ivory border border-[#E5E1D8] rounded-2xl p-4 focus:border-sage outline-none transition-all h-32 text-sm leading-relaxed"
                  placeholder="Tell AI about your positioning, craftsmanship, and mission..."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] uppercase font-bold tracking-widest text-warmgray">Brand Type</label>
                <div className="flex flex-wrap gap-2">
                  {types.map(t => (
                    <button 
                      key={t}
                      onClick={() => setFormData({...formData, type: t})}
                      className={`px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all border ${formData.type === t ? 'bg-charcoal text-white border-charcoal shadow-lg scale-105' : 'bg-white text-warmgray border-[#E5E1D8] hover:border-warmgray'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="flex items-center gap-3 p-4 bg-ivory border border-[#E5E1D8] rounded-2xl group focus-within:border-sage transition-colors">
                    <Globe size={18} className="text-warmgray group-focus-within:text-sage" />
                    <input 
                      className="bg-transparent border-none outline-none text-sm w-full" 
                      placeholder="Website URL" 
                      value={formData.website}
                      onChange={e => setFormData({...formData, website: e.target.value})}
                    />
                 </div>
                 <div className="flex items-center gap-3 p-4 bg-ivory border border-[#E5E1D8] rounded-2xl group focus-within:border-sage transition-colors">
                    <Instagram size={18} className="text-warmgray group-focus-within:text-sage" />
                    <input 
                      className="bg-transparent border-none outline-none text-sm w-full" 
                      placeholder="Instagram URL" 
                      value={formData.instagram}
                      onChange={e => setFormData({...formData, instagram: e.target.value})}
                    />
                 </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button onClick={() => navigate('/')} className="text-sm font-semibold text-warmgray hover:text-charcoal transition-colors">Save for later</button>
              <button 
                onClick={() => navigate('/brand/default/analysis')}
                className="bg-charcoal text-white px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl flex items-center gap-3 group"
              >
                Run AI Analysis
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: AI Context */}
      <div className="hidden lg:flex w-80 border-l border-[#E5E1D8] bg-white flex-col p-8">
        <h3 className="text-[11px] uppercase tracking-widest font-bold mb-8">What AI will analyze</h3>
        <div className="space-y-8">
          {[
            { label: 'Brand Positioning', desc: 'Analyzing tone and craftsmanship level.' },
            { label: 'Visual Identity', desc: 'Predicting aesthetic trends & mood.' },
            { label: 'Social Performance', desc: 'Audience engagement & reach potential.' },
            { label: 'Market & Competitors', desc: 'Identifying whitespace opportunities.' }
          ].map((item, i) => (
            <div key={i} className="flex gap-4 group">
               <div className="h-6 w-6 rounded-full border border-sage flex items-center justify-center flex-shrink-0">
                  <div className="h-2 w-2 bg-sage rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
               </div>
               <div>
                  <p className="text-xs font-bold uppercase tracking-tight mb-1">{item.label}</p>
                  <p className="text-[10px] text-warmgray leading-relaxed">{item.desc}</p>
               </div>
            </div>
          ))}
        </div>
        <div className="mt-auto p-6 bg-ivory rounded-3xl border border-[#E5E1D8] text-center">
           <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-[#E5E1D8]">
              <span className="text-xs font-bold">0%</span>
           </div>
           <p className="text-[10px] uppercase font-bold text-warmgray">Analysis Progress</p>
        </div>
      </div>
    </div>
  );
};

export default BrandIntake;
