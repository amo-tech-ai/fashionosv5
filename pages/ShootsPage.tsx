
import React from 'react';
import { Camera, Layers, Users, Zap } from 'lucide-react';

const ShootsPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-12">
        <h2 className="serif text-4xl font-medium mb-4">Production Shoots</h2>
        <p className="text-[#8C8C8C]">Manage photographers, talent, and post-production workflow.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="bg-white border border-[#E5E1D8] rounded-3xl p-8 hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 bg-[#F9F7F2] rounded-2xl flex items-center justify-center mb-6">
              <Camera className="text-[#1A1A1A]" />
            </div>
            <h3 className="serif text-2xl mb-2">Live View</h3>
            <p className="text-sm text-[#8C8C8C] mb-8">Connect to on-set cameras for real-time review and feedback loops.</p>
            <button className="px-6 py-3 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-black transition-all">
              Launch Direct Link
            </button>
         </div>

         <div className="bg-[#1A1A1A] text-white rounded-3xl p-8 overflow-hidden relative">
            <div className="relative z-10">
               <div className="h-12 w-12 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center mb-6">
                  <Zap className="text-white" />
               </div>
               <h3 className="serif text-2xl mb-2">Auto-Cull Assist</h3>
               <p className="text-sm text-white/60 mb-8">AI analysis of metadata to surface the best frames based on brand aesthetic.</p>
               <button className="px-6 py-3 bg-white text-black text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-white/90 transition-all">
                 Review Suggestions
               </button>
            </div>
            <div className="absolute top-0 right-0 h-full w-48 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
         </div>
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-4 gap-6">
         {[
           { label: 'Talent Confirmed', value: '18/24', icon: Users },
           { label: 'Pending Edits', value: '142', icon: Layers },
           { label: 'Studio Capacity', value: '84%', icon: Camera },
           { label: 'Equipment Health', value: 'Optimal', icon: Zap }
         ].map((stat, i) => (
           <div key={i} className="bg-white border border-[#E5E1D8] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                 <stat.icon size={16} className="text-[#8C8C8C]" />
                 <span className="text-[10px] uppercase tracking-widest font-bold text-[#8C8C8C]">{stat.label}</span>
              </div>
              <p className="text-2xl font-medium tracking-tight">{stat.value}</p>
           </div>
         ))}
      </div>
    </div>
  );
};

export default ShootsPage;
