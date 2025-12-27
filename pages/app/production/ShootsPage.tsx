import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Plus, Zap, Clock, MapPin, Sparkles } from 'lucide-react';
import { useProjects } from '../../../contexts/ProjectContext';

const ShootsPage: React.FC = () => {
  const { shoots, brands } = useProjects();
  const navigate = useNavigate();
  const activeBrand = brands[0];

  return (
    <div className="max-w-7xl mx-auto p-8 md:p-12 space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
          <h2 className="font-serif text-5xl tracking-tighter mb-4">Production Hub</h2>
          <p className="text-warmgray max-w-lg">Orchestrate high-fidelity shoots.</p>
        </div>
        <button onClick={() => navigate(`/brand/${activeBrand.id}/shoots/wizard`)} className="flex items-center gap-3 bg-charcoal text-white px-8 py-4 rounded-full text-[10px] font-bold uppercase hover:scale-105 transition-all shadow-xl">
          <Plus size={18} /> Plan New Shoot
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {shoots.map(shoot => (
          <div key={shoot.id} className="bg-white border border-[#E5E1D8] rounded-[40px] p-8 space-y-6 hover:shadow-2xl transition-all">
             <div className="flex justify-between items-start">
                <span className="px-4 py-1.5 bg-sage text-white rounded-full text-[9px] font-bold uppercase tracking-widest">{shoot.status}</span>
                <button onClick={() => navigate(`/shoots/crew/${shoot.id}`)} className="p-2.5 bg-ivory rounded-2xl hover:bg-charcoal hover:text-white transition-all"><Camera size={16} /></button>
             </div>
             <h3 className="font-serif text-3xl">{shoot.title}</h3>
             <div className="grid grid-cols-2 gap-4 pt-4 border-t border-ivory">
                <div className="flex items-center gap-2"><Clock size={14} className="text-warmgray" /><span className="text-[10px] font-bold">{shoot.scheduledDate}</span></div>
                <div className="flex items-center gap-2"><MapPin size={14} className="text-warmgray" /><span className="text-[10px] font-bold truncate">{shoot.location}</span></div>
             </div>
             <button onClick={() => navigate(`/shoots/crew/${shoot.id}`)} className="w-full py-4 bg-charcoal text-white rounded-2xl text-[9px] font-bold uppercase hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg">
                <Zap size={14} /> Enter Command HUD
             </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShootsPage;