
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Sparkles, Check, Info, Target, Calendar, DollarSign, Image as ImageIcon } from 'lucide-react';
import { useProjects } from '../contexts/ProjectContext';

const steps = [
  { id: 1, name: 'Basics' },
  { id: 2, name: 'Intent' },
  { id: 3, name: 'Analysis' },
  { id: 4, name: 'Plan' },
  { id: 5, name: 'Review' }
];

const Wizard: React.FC = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const { addProject } = useProjects();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    budget: '50,000',
    deadline: '2025-09-12',
    goal: 'Brand Exposure'
  });

  const next = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const back = () => {
    if (currentStep === 1) navigate('/');
    else setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleFinish = () => {
    addProject({
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title || 'Untitled Project',
      subtitle: formData.subtitle || 'Custom Production',
      status: 'Planned',
      progress: 0,
      image: "https://images.unsplash.com/photo-1539109132314-34a9c6ee892b?auto=format&fit=crop&w=800&q=80"
    });
    navigate('/');
  };

  return (
    <div className="fixed inset-0 bg-[#F9F7F2] z-50 flex flex-col">
      <div className="h-20 bg-white border-b border-[#E5E1D8] flex items-center justify-between px-8">
        <div className="flex items-center gap-4">
           <button onClick={back} className="p-2 hover:bg-[#F9F7F2] rounded-full transition-colors">
              <ChevronLeft />
           </button>
           <h2 className="serif text-xl font-medium">Create {type}</h2>
        </div>
        <div className="hidden md:flex items-center gap-3">
           {steps.map(step => (
             <div key={step.id} className="flex items-center">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all ${currentStep >= step.id ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white' : 'border-[#E5E1D8] text-[#8C8C8C]'}`}>
                   {currentStep > step.id ? <Check size={14} /> : step.id}
                </div>
                {step.id < 5 && <div className={`w-8 h-[2px] mx-1 ${currentStep > step.id ? 'bg-[#1A1A1A]' : 'bg-[#E5E1D8]'}`} />}
             </div>
           ))}
        </div>
        <button onClick={() => navigate('/')} className="text-xs uppercase tracking-widest font-bold text-[#8C8C8C] hover:text-[#1A1A1A]">Exit</button>
      </div>

      <div className="flex-1 overflow-y-auto p-12 flex justify-center">
         <div className="w-full max-w-2xl">
            {currentStep === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                   <h3 className="serif text-4xl mb-2">The Basics</h3>
                   <p className="text-[#8C8C8C]">Define the core identity of this project.</p>
                </div>
                <div className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-[#8C8C8C]">Project Title</label>
                      <input 
                        className="w-full bg-white border border-[#E5E1D8] rounded-2xl p-4 focus:ring-1 focus:ring-black outline-none transition-all"
                        placeholder="e.g. Milan Spring Showcase"
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-[#8C8C8C]">Subtitle / Season</label>
                      <input 
                        className="w-full bg-white border border-[#E5E1D8] rounded-2xl p-4 focus:ring-1 focus:ring-black outline-none transition-all"
                        placeholder="e.g. SS 2026"
                        value={formData.subtitle}
                        onChange={e => setFormData({...formData, subtitle: e.target.value})}
                      />
                   </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                   <h3 className="serif text-4xl mb-2">Intent & Goals</h3>
                   <p className="text-[#8C8C8C]">What are we aiming to achieve?</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {['Brand Awareness', 'Sales Conversion', 'Editorial Placement', 'Creative Portfolio'].map(goal => (
                    <button 
                      key={goal}
                      onClick={() => setFormData({...formData, goal})}
                      className={`p-6 rounded-3xl border text-left transition-all ${formData.goal === goal ? 'border-black bg-white shadow-xl ring-1 ring-black' : 'border-[#E5E1D8] bg-white/50 hover:bg-white'}`}
                    >
                      <Target size={24} className="mb-4 text-[#8C8C8C]" />
                      <p className="font-semibold text-sm">{goal}</p>
                    </button>
                  ))}
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-[#8C8C8C]">Estimated Budget (USD)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-[#8C8C8C]">$</span>
                      <input 
                        type="text"
                        className="w-full bg-white border border-[#E5E1D8] rounded-2xl p-4 pl-8 focus:ring-1 focus:ring-black outline-none transition-all"
                        value={formData.budget}
                        onChange={e => setFormData({...formData, budget: e.target.value})}
                      />
                    </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
                <div className="p-8 bg-white border border-[#E5E1D8] rounded-3xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4">
                      <Sparkles className="text-[#D1CDC2]" size={32} />
                   </div>
                   <h3 className="serif text-3xl mb-4">Intelligence Analysis</h3>
                   <p className="text-[#8C8C8C] text-sm leading-relaxed mb-8">Analysis of "{formData.title}" complete. Based on current SS2025 trends, here is your path.</p>
                   
                   <div className="space-y-4">
                      <div className="p-4 bg-[#F9F7F2] rounded-2xl border border-[#E5E1D8] flex gap-4">
                         <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                            <Info size={16} className="text-[#1A1A1A]" />
                         </div>
                         <div>
                            <p className="text-xs font-bold uppercase tracking-widest mb-1">Efficiency Boost</p>
                            <p className="text-sm text-[#8C8C8C]">By shifting from traditional venues to a digital-first studio, we can allocate 25% more to talent.</p>
                         </div>
                      </div>
                      <div className="p-4 bg-green-50 rounded-2xl border border-green-100 flex gap-4">
                         <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                            <Check size={16} className="text-green-600" />
                         </div>
                         <div>
                            <p className="text-xs font-bold uppercase tracking-widest mb-1 text-green-700">Market Fit</p>
                            <p className="text-sm text-green-800">Your chosen aesthetic aligns with "Modern Minimalism" currently trending in Europe.</p>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                   <h3 className="serif text-4xl mb-2">Plan Builder</h3>
                   <p className="text-[#8C8C8C]">Automatic task generation for your project timeline.</p>
                </div>
                <div className="space-y-3">
                  {[
                    { t: 'Moodboard Finalization', d: 'Day 1-2' },
                    { t: 'Talent Sourcing', d: 'Day 3-7' },
                    { t: 'Venue Walkthrough', d: 'Day 8' },
                    { t: 'Production Launch', d: 'Day 12' }
                  ].map((task, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white border border-[#E5E1D8] rounded-2xl">
                      <div className="flex items-center gap-3">
                        <div className="h-4 w-4 rounded border border-[#E5E1D8]" />
                        <span className="text-sm font-medium">{task.t}</span>
                      </div>
                      <span className="text-[10px] font-bold text-[#8C8C8C] uppercase tracking-widest">{task.d}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                   <h3 className="serif text-4xl mb-2">Ready to Launch?</h3>
                   <p className="text-[#8C8C8C]">Review your project configuration before initialization.</p>
                </div>
                <div className="bg-white border border-[#E5E1D8] rounded-3xl p-8 space-y-6">
                  <div className="flex justify-between items-center border-b border-[#F9F7F2] pb-4">
                    <div className="flex items-center gap-3 text-[#8C8C8C]">
                      <ImageIcon size={18} />
                      <span className="text-xs font-bold uppercase tracking-widest">Title</span>
                    </div>
                    <p className="font-semibold">{formData.title || 'Untitled'}</p>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#F9F7F2] pb-4">
                    <div className="flex items-center gap-3 text-[#8C8C8C]">
                      <Calendar size={18} />
                      <span className="text-xs font-bold uppercase tracking-widest">Deadline</span>
                    </div>
                    <p className="font-semibold">{formData.deadline}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3 text-[#8C8C8C]">
                      <DollarSign size={18} />
                      <span className="text-xs font-bold uppercase tracking-widest">Budget</span>
                    </div>
                    <p className="font-semibold text-green-600">${formData.budget}</p>
                  </div>
                </div>
              </div>
            )}
         </div>
      </div>

      <div className="h-24 bg-white border-t border-[#E5E1D8] flex items-center justify-between px-12">
         <button onClick={back} className="text-sm font-medium hover:text-[#8C8C8C] transition-colors">
            Back
         </button>
         <button 
           onClick={currentStep === 5 ? handleFinish : next}
           className="bg-[#1A1A1A] text-white px-10 py-4 rounded-full text-sm font-medium hover:scale-105 transition-all shadow-lg flex items-center gap-2"
         >
            {currentStep === 5 ? 'Launch Project' : 'Continue'}
            {currentStep !== 5 && <ChevronRight size={18} />}
         </button>
      </div>
    </div>
  );
};

export default Wizard;
