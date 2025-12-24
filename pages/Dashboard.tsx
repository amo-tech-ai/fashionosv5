
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, ArrowUpRight, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { useProjects } from '../contexts/ProjectContext';

const Card: React.FC<{ title: string; subtitle: string; status: string; progress: number; image: string }> = ({ title, subtitle, status, progress, image }) => (
  <div className="bg-white border border-[#E5E1D8] rounded-[32px] overflow-hidden group hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
    <div className="aspect-[16/10] overflow-hidden relative">
      <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]" />
      <div className="absolute top-6 left-6">
        <span className="px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-full glass shadow-sm">
          {status}
        </span>
      </div>
    </div>
    <div className="p-8">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-serif text-2xl font-medium tracking-tight">{title}</h3>
        <ArrowUpRight size={20} className="text-warmgray group-hover:text-charcoal transition-colors group-hover:translate-x-1 group-hover:-translate-y-1 transform" />
      </div>
      <p className="text-xs text-warmgray mb-8 tracking-wide font-medium">{subtitle}</p>
      
      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <span className="text-[9px] uppercase font-bold text-warmgray tracking-[0.2em]">Momentum</span>
          <span className="text-[11px] font-bold">{progress}%</span>
        </div>
        <div className="h-1 bg-ivory rounded-full overflow-hidden">
          <div 
            className="h-full bg-charcoal transition-all duration-[2s] ease-out" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const { projects } = useProjects();

  return (
    <div className="max-w-7xl mx-auto p-8 md:p-12 space-y-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div className="animate-in fade-in slide-in-from-bottom duration-1000">
          <h2 className="font-serif text-6xl md:text-7xl font-medium tracking-tighter mb-4">Maison Julian.</h2>
          <p className="text-warmgray text-lg max-w-lg leading-relaxed">The September cycle is 82% complete. AI suggests prioritizing the Milan venue walk-through.</p>
        </div>
        <Link 
          to="/brand/intake"
          className="flex items-center gap-3 bg-charcoal text-white px-8 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-2xl group"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-500" />
          Initialize Brand
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map(project => (
          <Card 
            key={project.id}
            title={project.title} 
            subtitle={project.subtitle} 
            status={project.status} 
            progress={project.progress} 
            image={project.image} 
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white border border-[#E5E1D8] rounded-[48px] p-10 shadow-sm">
          <div className="flex justify-between items-center mb-10">
             <h3 className="font-serif text-4xl">Critical Path</h3>
             <button className="text-[10px] uppercase font-bold tracking-widest text-warmgray hover:text-charcoal underline">Optimize All</button>
          </div>
          <div className="space-y-4">
            {[
              { t: 'Secure venue for After Party', d: '24h Left', s: 'urgent' },
              { t: 'Finalize talent contracts', d: 'Friday', s: 'pending' },
              { t: 'Review campaign edit v2', d: 'Today', s: 'pending' }
            ].map((task, i) => (
              <div key={i} className="flex items-center justify-between p-6 bg-ivory rounded-[24px] hover:shadow-lg hover:border-sage border border-transparent transition-all cursor-pointer group">
                <div className="flex items-center gap-6">
                  <div className={`h-2.5 w-2.5 rounded-full ${task.s === 'urgent' ? 'bg-red-500 animate-pulse' : 'bg-sage opacity-40'}`} />
                  <span className="text-sm font-semibold tracking-tight group-hover:translate-x-1 transition-transform">{task.t}</span>
                </div>
                <div className="flex items-center gap-3 text-warmgray">
                   <Clock size={16} />
                   <span className="text-[10px] uppercase tracking-widest font-bold">{task.d}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-charcoal text-white rounded-[48px] p-10 flex flex-col justify-between relative overflow-hidden group">
          <div className="relative z-10">
            <div className="h-16 w-16 bg-white/10 backdrop-blur rounded-[20px] flex items-center justify-center mb-8 border border-white/20">
               <Sparkles size={32} className="text-sage" />
            </div>
            <h3 className="font-serif text-4xl mb-4 leading-tight">Weekly Production Insight.</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-10">Efficiency increased by 14% this quarter. Your strongest engagement stems from the "Sustainability Edit" visuals.</p>
          </div>
          <button className="w-full py-5 border border-white/20 rounded-[20px] text-[10px] uppercase tracking-widest font-bold hover:bg-white/10 transition-colors relative z-10">
            View Analytics
          </button>
          <div className="absolute -right-20 -bottom-20 h-64 w-64 bg-sage/10 rounded-full blur-[100px] group-hover:bg-sage/20 transition-all duration-1000" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
