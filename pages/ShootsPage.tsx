import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Layers, Users, Zap, Plus, ArrowUpRight, Clock, MapPin, Sparkles, BarChart2 } from 'lucide-react';
import { useProjects } from '../contexts/ProjectContext';

const ShootsPage: React.FC = () => {
  const { shoots, brands } = useProjects();
  const navigate = useNavigate();
  const activeBrand = brands[0];

  const handlePlanNew = () => {
    if (activeBrand) {
      navigate(`/brand/${activeBrand.id}/shoots/wizard`);
    } else {
      navigate('/brand/intake');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8 md:p-12 space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
          <h2 className="font-serif text-5xl tracking-tighter mb-4">Production Hub</h2>
          <p className="text-warmgray max-w-lg">Orchestrate high-fidelity shoots from strategic brief to on-set execution.</p>
        </div>
        <button 
          onClick={handlePlanNew}
          className="flex items-center gap-3 bg-charcoal text-white px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl group"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform" />
          Plan New Shoot
        </button>
      </header>

      {shoots.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {shoots.map(shoot => {
            const capturedCount = shoot.shotList.filter(s => s.status === 'Captured' || s.status === 'Approved').length;
            const totalShots = shoot.shotList.length;
            const progress = totalShots > 0 ? Math.round((capturedCount / totalShots) * 100) : 0;
            const avgCompliance = shoot.shotList.reduce((acc, s) => acc + (s.complianceScore || 0), 0) / (shoot.shotList.filter(s => s.complianceScore).length || 1);

            return (
              <div key={shoot.id} className="bg-white border border-[#E5E1D8] rounded-[40px] overflow-hidden group hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
                <div className="p-8 space-y-6 flex-1">
                  <div className="flex justify-between items-start">
                    <div className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                      shoot.status === 'Production' ? 'bg-sage text-white' : 
                      shoot.status === 'Planning' ? 'bg-ivory text-warmgray border border-[#E5E1D8]' : 
                      'bg-charcoal text-white'
                    }`}>
                      {shoot.status}
                    </div>
                    <div className="flex gap-2">
                       <button 
                         onClick={() => navigate(`/shoots/brief/${shoot.id}`)}
                         className="p-2.5 bg-ivory rounded-2xl hover:bg-charcoal hover:text-white transition-all"
                         title="View Brief"
                       >
                         <BarChart2 size={16} />
                       </button>
                       <button 
                         onClick={() => navigate(`/shoots/crew/${shoot.id}`)}
                         className="p-2.5 bg-sage/10 text-sage rounded-2xl hover:bg-sage hover:text-white transition-all"
                         title="Launch HUD"
                       >
                         <Camera size={16} />
                       </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-3xl mb-2">{shoot.title}</h3>
                    <p className="text-xs text-warmgray line-clamp-2 italic">"{shoot.concept}"</p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-ivory">
                     <div className="flex justify-between items-end">
                        <span className="text-[9px] font-bold uppercase text-warmgray tracking-widest">Execution Progress</span>
                        <span className="text-[10px] font-bold text-charcoal">{capturedCount}/{totalShots} Captured</span>
                     </div>
                     <div className="h-1 bg-ivory rounded-full overflow-hidden">
                        <div 
                           className="h-full bg-sage transition-all duration-1000" 
                           style={{ width: `${progress}%` }} 
                        />
                     </div>
                     <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-warmgray">
                        <span>Aesthetic Drift</span>
                        <span className={avgCompliance > 85 ? 'text-sage' : 'text-rose-500'}>
                          {avgCompliance > 0 ? `${(100 - avgCompliance).toFixed(1)}%` : 'N/A'}
                        </span>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-ivory">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-warmgray" />
                      <span className="text-[10px] font-bold text-charcoal">{shoot.scheduledDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-warmgray" />
                      <span className="text-[10px] font-bold text-charcoal truncate">{shoot.location}</span>
                    </div>
                  </div>
                </div>
                <div className="px-8 pb-8">
                  <button 
                    onClick={() => navigate(`/shoots/crew/${shoot.id}`)}
                    className="w-full py-4 bg-charcoal text-white rounded-2xl text-[9px] font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-3 shadow-lg group"
                  >
                    <Zap size={14} className="text-sage fill-sage group-hover:animate-pulse" />
                    Enter Command HUD
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white border border-[#E5E1D8] border-dashed rounded-[48px] p-20 flex flex-col items-center justify-center text-center space-y-8">
           <div className="h-24 w-24 bg-ivory rounded-[32px] flex items-center justify-center text-warmgray border border-ivory shadow-inner">
              <Camera size={40} className="animate-pulse" />
           </div>
           <div className="max-w-sm space-y-3">
              <h3 className="font-serif text-3xl">No Productions Scheduled</h3>
              <p className="text-sm text-warmgray leading-relaxed">Initialize your brand identity or click the "Plan New Shoot" button to begin architecting high-fidelity campaigns.</p>
           </div>
           <button 
             onClick={handlePlanNew}
             className="px-10 py-4 bg-charcoal text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-xl flex items-center gap-2"
           >
              <Sparkles size={14} className="text-sage" /> Begin Strategic Planning
           </button>
        </div>
      )}
    </div>
  );
};

export default ShootsPage;