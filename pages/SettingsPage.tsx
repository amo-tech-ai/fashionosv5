
import React, { useState } from 'react';
import { Settings as SettingsIcon, Shield, User, Bell, Palette, Cpu, Globe, ArrowRight, Check } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('Workspace');

  const menuItems = [
    { name: 'Workspace', icon: SettingsIcon },
    { name: 'Identity', icon: User },
    { name: 'Security', icon: Shield },
    { name: 'Intelligence', icon: Cpu },
    { name: 'Notifications', icon: Bell },
  ];

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto flex flex-col md:flex-row gap-12 animate-in fade-in duration-700">
      {/* Sidebar Nav */}
      <div className="w-full md:w-64 space-y-2">
         <h2 className="font-serif text-4xl tracking-tighter mb-8">System Control</h2>
         {menuItems.map(item => (
           <button 
            key={item.name}
            onClick={() => setActiveSection(item.name)}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] uppercase font-bold tracking-widest transition-all ${
              activeSection === item.name ? 'bg-charcoal text-white shadow-xl translate-x-1' : 'text-warmgray hover:bg-ivory'
            }`}
           >
             <item.icon size={16} />
             {item.name}
           </button>
         ))}
      </div>

      {/* Settings Content */}
      <div className="flex-1 space-y-12">
         <section className="bg-white border border-[#E5E1D8] rounded-[48px] p-10 space-y-8">
            <div className="flex justify-between items-start border-b border-[#F9F7F2] pb-8">
               <div>
                  <h3 className="font-serif text-3xl mb-2">{activeSection} Preferences</h3>
                  <p className="text-warmgray text-sm">Customize how FashionOS optimizes your production environment.</p>
               </div>
               <button className="px-8 py-3 bg-charcoal text-white rounded-full text-[10px] uppercase font-bold tracking-widest hover:scale-105 transition-all shadow-lg">
                  Save Changes
               </button>
            </div>

            <div className="space-y-6">
               <div className="flex items-center justify-between p-6 bg-ivory rounded-3xl border border-[#E5E1D8]">
                  <div className="space-y-1">
                     <p className="font-semibold text-sm">Neural Link Optimization</p>
                     <p className="text-xs text-warmgray">Allow AI to auto-adjust production schedules based on stakeholder availability.</p>
                  </div>
                  <div className="h-6 w-12 bg-sage rounded-full relative cursor-pointer">
                     <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full shadow-sm" />
                  </div>
               </div>

               <div className="flex items-center justify-between p-6 bg-ivory rounded-3xl border border-[#E5E1D8]">
                  <div className="space-y-1">
                     <p className="font-semibold text-sm">Brand Voice Guardrails</p>
                     <p className="text-xs text-warmgray">Enforce Style Guide compliance on all automated content generations.</p>
                  </div>
                  <div className="h-6 w-12 bg-sage rounded-full relative cursor-pointer">
                     <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full shadow-sm" />
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-2">
                     <label className="text-[10px] uppercase font-bold tracking-widest text-warmgray ml-2">Primary Locale</label>
                     <div className="flex items-center justify-between p-4 bg-white border border-[#E5E1D8] rounded-2xl">
                        <span className="text-sm font-medium">Paris (GMT+2)</span>
                        <Globe size={16} className="text-warmgray" />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] uppercase font-bold tracking-widest text-warmgray ml-2">Intelligence Core</label>
                     <div className="flex items-center justify-between p-4 bg-white border border-[#E5E1D8] rounded-2xl">
                        <span className="text-sm font-medium">Gemini 3 Pro / Flash</span>
                        <Cpu size={16} className="text-sage" />
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <section className="bg-charcoal text-white rounded-[48px] p-10 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 space-y-4">
               <h4 className="font-serif text-3xl">Neural Link Status</h4>
               <p className="text-white/50 leading-relaxed text-sm">System Unit 01 is currently synchronized with the global production grid. Running on Gemini 3.0 Series.</p>
            </div>
            <button className="px-10 py-5 bg-white text-charcoal rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-3">
               Run Diagnostics <ArrowRight size={16} />
            </button>
         </section>
      </div>
    </div>
  );
};

export default SettingsPage;
