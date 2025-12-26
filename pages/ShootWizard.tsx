import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { 
  ChevronRight, ChevronLeft, Sparkles, Check, 
  Calendar, Users, Loader2, Wand2, ShieldCheck, ListChecks, 
  MapPin, Film
} from 'lucide-react';
import { useProjects } from '../contexts/ProjectContext';
import { IntelligenceService } from '../services/intelligence';
import { Shoot, ShotItem } from '../types';

const steps = [
  { id: 1, name: 'Identity Lock' },
  { id: 2, name: 'Mood & Pre-Viz' },
  { id: 3, name: 'Strategy Map' },
  { id: 4, name: 'Shot List Synthesis' },
  { id: 5, name: 'Dispatch' }
];

const ShootWizard: React.FC = () => {
  const { brandId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { brands, addShoot } = useProjects();
  const intelService = IntelligenceService.getInstance();
  const brand = brands.find(b => b.id === brandId) || brands[0];
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [preVizUrl, setPreVizUrl] = useState<string | null>(null);
  const [generatedShots, setGeneratedShots] = useState<ShotItem[]>([]);
  
  const [formData, setFormData] = useState({
    title: location.state?.title || '',
    concept: location.state?.concept || '',
    date: '2024-11-20',
    location: location.state?.location || 'Paris Studio A',
    photographer: 'Elena M.',
    stylist: 'Sasha V.',
    model: 'Anja L.',
    platforms: ['Instagram', 'Shopify', 'TikTok']
  });

  const next = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const back = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const generatePreViz = async () => {
    setIsProcessing(true);
    try {
      const url = await intelService.generateCinematicVideo(`${formData.concept} for ${brand.name}`);
      setPreVizUrl(url);
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  const synthesizeShotList = async () => {
    setIsProcessing(true);
    try {
      const data = await intelService.architectShotList(formData.concept, brand.dna, formData.platforms);
      setGeneratedShots(data.map((d: any) => ({ ...d, status: 'Pending' })));
      next();
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  const finalizeShoot = () => {
    const newShoot: Shoot = {
      id: `shoot-${Math.random().toString(36).substr(2, 5)}`,
      brandId: brand.id,
      title: formData.title || 'Untitled Shoot',
      concept: formData.concept,
      status: 'Planning',
      dnaSnapshot: {
        version: brand.dnaVersion,
        pillars: brand.dna,
        styleGuide: brand.styleGuide
      },
      crew: {
        photographer: formData.photographer,
        stylist: formData.stylist,
        model: formData.model
      },
      shotList: generatedShots,
      preVizVideo: preVizUrl || undefined,
      scheduledDate: formData.date,
      location: formData.location
    };

    addShoot(newShoot);
    navigate('/shoots');
  };

  if (!brand) return <div className="p-20 text-center animate-pulse">Establishing Identity Lock...</div>;

  return (
    <div className="fixed inset-0 bg-[#F9F7F2] z-[60] flex flex-col">
      <header className="h-24 bg-white border-b border-[#E5E1D8] flex items-center justify-between px-12">
        <div className="flex items-center gap-6">
           <button onClick={() => navigate(-1)} className="p-3 hover:bg-ivory rounded-full transition-colors">
              <ChevronLeft />
           </button>
           <div>
              <h2 className="font-serif text-2xl font-medium">Production Wizard</h2>
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-warmgray">Brand Lock: {brand.name} ({brand.dnaVersion})</p>
           </div>
        </div>
        <div className="hidden lg:flex items-center gap-4">
           {steps.map(step => (
             <div key={step.id} className="flex items-center">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center text-[11px] font-bold border-2 transition-all ${currentStep >= step.id ? 'bg-charcoal border-charcoal text-white' : 'border-[#E5E1D8] text-warmgray'}`}>
                   {currentStep > step.id ? <Check size={16} /> : step.id}
                </div>
                {step.id < 5 && <div className={`w-8 h-[2px] mx-2 ${currentStep > step.id ? 'bg-charcoal' : 'bg-[#E5E1D8]'}`} />}
             </div>
           ))}
        </div>
        <button onClick={() => navigate('/shoots')} className="text-[10px] uppercase font-bold tracking-widest text-warmgray hover:text-charcoal transition-colors">Exit Wizard</button>
      </header>

      <div className="flex-1 overflow-y-auto flex justify-center py-16 px-8 custom-scrollbar">
         <div className="w-full max-w-3xl space-y-12">
            
            {currentStep === 1 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <header className="space-y-2">
                   <h3 className="font-serif text-5xl tracking-tight">Identity Lock</h3>
                   <p className="text-warmgray">Verifying DNA version for SS25 Production consistency.</p>
                </header>
                <div className="bg-white border border-[#E5E1D8] rounded-[48px] p-10 space-y-8 shadow-sm">
                   <div className="p-6 bg-ivory rounded-3xl border border-sage/20 flex items-center gap-4">
                      <ShieldCheck size={24} className="text-sage" />
                      <div>
                        <p className="text-[10px] uppercase font-bold text-sage tracking-widest">Grounded DNA Version</p>
                        <p className="font-bold text-charcoal">{brand.dnaVersion}</p>
                      </div>
                   </div>
                   <div className="space-y-6">
                      <div className="space-y-2">
                         <label className="text-[10px] uppercase font-bold tracking-widest text-warmgray">Production Title</label>
                         <input 
                           value={formData.title}
                           onChange={e => setFormData({...formData, title: e.target.value})}
                           className="w-full bg-ivory border border-[#E5E1D8] rounded-2xl p-4 focus:border-charcoal outline-none transition-all text-lg font-medium"
                           placeholder="e.g. Milan Brutalist SS25"
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] uppercase font-bold tracking-widest text-warmgray">Core Narrative Concept</label>
                         <textarea 
                           value={formData.concept}
                           onChange={e => setFormData({...formData, concept: e.target.value})}
                           className="w-full h-32 bg-ivory border border-[#E5E1D8] rounded-2xl p-4 focus:border-charcoal outline-none transition-all text-sm leading-relaxed"
                           placeholder="Describe the aesthetic direction, lighting, and movement..."
                         />
                      </div>
                   </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <header className="space-y-2">
                   <h3 className="font-serif text-5xl tracking-tight">Cinematic Pre-Viz</h3>
                   <p className="text-warmgray">Synthesizing reference motion via Veo 3.1 Fast.</p>
                </header>
                <div className="aspect-video bg-charcoal rounded-[48px] relative overflow-hidden flex flex-col items-center justify-center text-center p-12 border border-white/10 group shadow-2xl">
                   {preVizUrl ? (
                     <video src={preVizUrl} autoPlay loop muted className="absolute inset-0 w-full h-full object-cover" />
                   ) : (
                     <div className="space-y-6 z-10">
                        <div className="h-20 w-20 bg-white/10 backdrop-blur rounded-3xl flex items-center justify-center mx-auto border border-white/20">
                           <Film size={32} className="text-sage" />
                        </div>
                        <h4 className="font-serif text-3xl text-white">Synthesize Mood Video</h4>
                        <p className="text-white/40 text-sm max-w-sm mx-auto italic">"Visualizing {formData.concept || 'Production Vision'}..."</p>
                        <button 
                          onClick={generatePreViz}
                          disabled={isProcessing}
                          className="px-10 py-4 bg-sage text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl disabled:opacity-50 flex items-center gap-3 mx-auto"
                        >
                           {isProcessing ? <Loader2 size={16} className="animate-spin" /> : <Wand2 size={16} />}
                           Generate Vision (Veo 3.1)
                        </button>
                     </div>
                   )}
                   {preVizUrl && (
                     <button onClick={() => setPreVizUrl(null)} className="absolute top-8 right-8 p-3 bg-black/40 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronLeft size={20} />
                     </button>
                   )}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <header className="space-y-2">
                   <h3 className="font-serif text-5xl tracking-tight">Strategy Map</h3>
                   <p className="text-warmgray">Configure logistics and omnichannel distribution mix.</p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="bg-white border border-[#E5E1D8] rounded-[40px] p-8 space-y-6 shadow-sm">
                      <div className="flex items-center gap-3 text-charcoal">
                         <Calendar size={18} />
                         <span className="text-[10px] uppercase font-bold tracking-widest">Timing & Venue</span>
                      </div>
                      <div className="space-y-4">
                         <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-ivory border border-[#E5E1D8] rounded-2xl p-4 text-sm font-medium" />
                         <div className="flex items-center gap-3 p-4 bg-ivory border border-[#E5E1D8] rounded-2xl">
                            <MapPin size={16} className="text-warmgray" />
                            <input value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="bg-transparent border-none outline-none text-sm w-full font-medium" />
                         </div>
                      </div>
                   </div>
                   <div className="bg-white border border-[#E5E1D8] rounded-[40px] p-8 space-y-6 shadow-sm">
                      <div className="flex items-center gap-3 text-charcoal">
                         <Users size={18} />
                         <span className="text-[10px] uppercase font-bold tracking-widest">Node Assignment</span>
                      </div>
                      <div className="space-y-4">
                         {['photographer', 'stylist', 'model'].map(role => (
                           <div key={role} className="flex items-center gap-3 p-3 bg-ivory border border-[#E5E1D8] rounded-xl">
                              <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center text-[10px] font-bold text-warmgray uppercase">{role[0]}</div>
                              <input 
                                value={(formData as any)[role]}
                                onChange={e => setFormData({...formData, [role]: e.target.value})}
                                className="bg-transparent border-none outline-none text-xs w-full font-medium"
                              />
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <header className="space-y-2">
                   <h3 className="font-serif text-5xl tracking-tight">Shot List Architect</h3>
                   <p className="text-warmgray">Synthesizing technical checklist items via Gemini Flash 3.</p>
                </header>
                <div className="bg-white border border-[#E5E1D8] rounded-[48px] p-10 min-h-[400px] flex flex-col justify-center text-center relative overflow-hidden shadow-sm">
                   {isProcessing ? (
                     <div className="space-y-6">
                        <Loader2 size={48} className="animate-spin text-sage mx-auto" />
                        <div>
                          <p className="font-serif text-2xl">Generating technical list...</p>
                          <p className="text-[10px] uppercase font-bold text-warmgray tracking-widest mt-2">Mapping to IG, Shopify, and Vogue aspect ratios</p>
                        </div>
                     </div>
                   ) : (
                     <div className="space-y-8">
                        <div className="h-24 w-24 bg-ivory rounded-[40px] flex items-center justify-center mx-auto border border-[#E5E1D8] text-warmgray shadow-inner">
                           <ListChecks size={40} />
                        </div>
                        <h4 className="font-serif text-3xl">Neural Synthesis Ready</h4>
                        <p className="text-sm text-warmgray max-w-sm mx-auto">Click below to generate the structured checklist for your crew based on the "{brand.dnaVersion}" DNA Snapshot.</p>
                        <button 
                          onClick={synthesizeShotList}
                          className="px-10 py-4 bg-charcoal text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl flex items-center gap-3 mx-auto"
                        >
                           <Sparkles size={16} className="text-sage" />
                           Architect Shot List
                        </button>
                     </div>
                   )}
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <header className="space-y-2">
                   <h3 className="font-serif text-5xl tracking-tight">Dispatch Brief</h3>
                   <p className="text-warmgray">Reviewing finalized neural brief before crew notification.</p>
                </header>
                <div className="bg-white border border-[#E5E1D8] rounded-[48px] overflow-hidden shadow-2xl">
                   <div className="p-10 space-y-8">
                      <div className="flex justify-between items-center border-b border-ivory pb-6">
                         <div>
                            <p className="text-[10px] uppercase font-bold text-warmgray tracking-widest">Shoot Title</p>
                            <h4 className="font-serif text-3xl">{formData.title}</h4>
                         </div>
                         <div className="text-right">
                            <p className="text-[10px] uppercase font-bold text-warmgray tracking-widest">Target Date</p>
                            <p className="font-bold">{formData.date}</p>
                         </div>
                      </div>
                      <div className="grid grid-cols-3 gap-6">
                         {[
                           { l: 'Shots', v: generatedShots.length },
                           { l: 'Nodes', v: 3 },
                           { l: 'Compliance', v: '98%' }
                         ].map(stat => (
                           <div key={stat.l} className="p-4 bg-ivory rounded-3xl text-center shadow-sm">
                              <p className="text-[9px] uppercase font-bold text-warmgray tracking-widest">{stat.l}</p>
                              <p className="text-2xl font-serif text-charcoal">{stat.v}</p>
                           </div>
                         ))}
                      </div>
                      <div className="p-6 bg-charcoal rounded-3xl text-white flex items-center justify-between shadow-xl">
                         <div className="flex items-center gap-4">
                            <div className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                               <ShieldCheck size={20} className="text-sage" />
                            </div>
                            <div>
                               <p className="text-[10px] font-bold uppercase tracking-widest text-sage">Guardian Lock Active</p>
                               <p className="text-xs text-white/60">Aesthetic compliance monitored for all captured assets.</p>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            )}

         </div>
      </div>

      <footer className="h-28 bg-white border-t border-[#E5E1D8] flex items-center justify-between px-16">
         <button onClick={back} className="text-[11px] font-bold uppercase tracking-widest text-warmgray hover:text-charcoal transition-colors">
            {currentStep === 1 ? 'Discard' : 'Back'}
         </button>
         <div className="flex gap-4">
            {currentStep < 5 && currentStep !== 4 && (
              <button 
                onClick={next}
                className="px-10 py-5 bg-charcoal text-white rounded-full text-[11px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl flex items-center gap-3"
              >
                 Continue <ChevronRight size={18} />
              </button>
            )}
            {currentStep === 5 && (
              <button 
                onClick={finalizeShoot}
                className="px-12 py-5 bg-sage text-white rounded-full text-[11px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-2xl flex items-center gap-3"
              >
                 Dispatch Brief to Crew <Sparkles size={18} />
              </button>
            )}
         </div>
      </footer>
    </div>
  );
};

export default ShootWizard;