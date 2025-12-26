import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, ArrowUpRight, Clock, Sparkles, Check, Activity, ShieldCheck, Zap, Loader2 } from 'lucide-react';
import { useProjects } from '../contexts/ProjectContext';
import { IntelligenceService } from '../services/intelligence';

const StrategicRadar: React.FC<{ score: number }> = ({ score }) => {
  const [animate, setAnimate] = useState(false);
  useEffect(() => { setAnimate(true); }, []);

  return (
    <div className="relative h-32 w-32 md:h-48 md:w-48 flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#E5E1D8" strokeWidth="0.5" strokeDasharray="2 2" />
        <circle cx="50" cy="50" r="25" fill="none" stroke="#E5E1D8" strokeWidth="0.5" strokeDasharray="2 2" />
        <line x1="50" y1="10" x2="50" y2="90" stroke="#E5E1D8" strokeWidth="0.5" />
        <line x1="10" y1="50" x2="90" y2="50" stroke="#E5E1D8" strokeWidth="0.5" />
        <path 
          d={animate ? "M50,20 L80,50 L50,85 L25,50 Z" : "M50,50 L50,50 L50,50 L50,50 Z"}
          fill="rgba(143, 174, 158, 0.2)"
          stroke="#8FAE9E"
          strokeWidth="1.5"
          className="transition-all duration-[2000ms] ease-in-out"
        />
        <circle cx="50" cy="20" r="2" fill="#8FAE9E" />
        <circle cx="80" cy="50" r="2" fill="#8FAE9E" />
        <circle cx="50" cy="85" r="2" fill="#8FAE9E" />
        <circle cx="25" cy="50" r="2" fill="#8FAE9E" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
        <span className="text-[8px] md:text-[10px] font-bold text-sage uppercase tracking-widest">DNA Index</span>
        <span className="text-sm md:text-lg font-serif">{score}</span>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { projects, brands } = useProjects();
  const brand = brands[0];
  const intelService = IntelligenceService.getInstance();
  
  const [tasks, setTasks] = useState([
    { id: 1, t: 'Secure venue for After Party', d: '24h Left', s: 'urgent', completed: false },
    { id: 2, t: 'Finalize talent contracts', d: 'Friday', s: 'pending', completed: false },
    { id: 3, t: 'Review campaign edit v2', d: 'Today', s: 'pending', completed: false }
  ]);

  const [aiFeed, setAiFeed] = useState<string[]>([
    "Guardian: System integrity is optimal.",
    "Forecast: SS25 planning nodes active."
  ]);
  const [isGroundedLoading, setIsGroundedLoading] = useState(true);

  useEffect(() => {
    if (!brand) return;
    const fetchSignals = async () => {
      try {
        const result = await intelService.verifyTrend(`${brand.name} ${brand.dna[0]} SS25 trends`);
        setAiFeed(prev => [
          `Forecaster: Grounded Scan for ${brand.name} complete.`,
          result.text,
          ...prev
        ].slice(0, 5));
      } catch (e) {
        setAiFeed(prev => ["Signal sync complete.", ...prev]);
      } finally {
        setIsGroundedLoading(false);
      }
    };
    fetchSignals();
  }, [brand]);

  if (!brand) return <div className="p-20 text-center animate-pulse">Synchronizing Brand Data...</div>;

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-12 space-y-12 md:space-y-16 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row justify-between gap-8 md:gap-12">
        <div className="flex-1 space-y-6 md:space-y-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              <span className="px-3 py-1 bg-sage/10 text-sage text-[8px] md:text-[9px] font-bold uppercase tracking-widest rounded-full flex items-center gap-2">
                <Activity size={10} className="animate-pulse" /> System Active
              </span>
              <span className="px-3 py-1 bg-white border border-[#E5E1D8] text-[8px] md:text-[9px] font-bold uppercase tracking-widest rounded-full flex items-center gap-2">
                <ShieldCheck size={10} className="text-sage" /> DNA Sync
              </span>
            </div>
            <h2 className="font-serif text-5xl md:text-7xl font-medium tracking-tighter leading-tight">{brand.name}.</h2>
            <p className="text-warmgray text-base md:text-lg max-w-lg leading-relaxed">System integrity is optimal at {brand.scores.overall}%. Tracking SS25 momentum.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link 
              to="/brand/intake"
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-charcoal text-white px-8 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-2xl group"
            >
              <Plus size={20} className="group-hover:rotate-90 transition-transform duration-500" />
              Initialize
            </Link>
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-10 w-10 md:h-12 md:w-12 rounded-full border-4 border-ivory bg-white overflow-hidden shadow-sm hover:scale-110 transition-transform cursor-pointer">
                  <img src={`https://i.pravatar.cc/100?u=${i + 10}`} className="w-full h-full object-cover" alt="User" />
                </div>
              ))}
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-full border-4 border-ivory bg-sage text-white flex items-center justify-center text-[9px] md:text-[10px] font-bold shadow-sm">+</div>
            </div>
          </div>
        </div>

        {/* System Integrity Widget */}
        <div className="bg-white border border-[#E5E1D8] rounded-[32px] md:rounded-[48px] p-6 md:p-8 flex flex-col items-center justify-center gap-6 shadow-sm min-w-full md:min-w-[320px] hover:shadow-xl transition-all group relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1.5 bg-ivory">
              <div className="h-full bg-sage transition-all duration-1000" style={{ width: `${brand.scores.overall}%` }} />
           </div>
           <StrategicRadar score={brand.scores.overall} />
           <div className="grid grid-cols-2 gap-4 w-full">
              <div className="text-center p-3 bg-ivory rounded-2xl border border-[#E5E1D8]">
                 <p className="text-[7px] md:text-[8px] uppercase font-bold text-warmgray tracking-widest mb-1">Reach</p>
                 <p className="text-xs md:text-sm font-bold text-sage">+22.4%</p>
              </div>
              <div className="text-center p-3 bg-ivory rounded-2xl border border-[#E5E1D8]">
                 <p className="text-[7px] md:text-[8px] uppercase font-bold text-warmgray tracking-widest mb-1">Drift</p>
                 <p className="text-xs md:text-sm font-bold text-charcoal">2.1%</p>
              </div>
           </div>
           <div className="w-full pt-4 border-t border-ivory flex items-center justify-between">
              <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-warmgray">Integrity</span>
              <div className="flex items-center gap-1.5">
                 <div className="h-1.5 w-1.5 rounded-full bg-sage animate-pulse" />
                 <span className="text-[9px] md:text-[10px] font-bold text-sage uppercase">Optimal</span>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        {projects.map(project => (
          <div key={project.id} className="bg-white border border-[#E5E1D8] rounded-[24px] md:rounded-[32px] overflow-hidden group hover:shadow-2xl transition-all duration-700">
            <div className="aspect-[16/10] overflow-hidden relative">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]" />
              <div className="absolute top-4 left-4 md:top-6 md:left-6">
                <span className="px-3 py-1 text-[8px] md:text-[9px] font-bold uppercase tracking-widest rounded-full glass shadow-sm">
                  {project.status}
                </span>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-serif text-xl md:text-2xl font-medium tracking-tight">{project.title}</h3>
                <ArrowUpRight size={20} className="text-warmgray group-hover:text-charcoal transition-colors group-hover:translate-x-1 group-hover:-translate-y-1 transform" />
              </div>
              <p className="text-[10px] md:text-xs text-warmgray mb-6 md:mb-8 tracking-wide font-medium">{project.subtitle}</p>
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-[8px] md:text-[9px] uppercase font-bold text-warmgray tracking-[0.2em]">Momentum</span>
                  <span className="text-[10px] md:text-[11px] font-bold">{project.progress}%</span>
                </div>
                <div className="h-1 bg-ivory rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-charcoal transition-all duration-[2s] ease-out" 
                    style={{ width: `${project.progress}%` }} 
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
        <div className="lg:col-span-2 bg-white border border-[#E5E1D8] rounded-[32px] md:rounded-[48px] p-6 md:p-10 shadow-sm flex flex-col h-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
             <h3 className="font-serif text-3xl md:text-4xl">Critical Path</h3>
             <button 
                onClick={() => setTasks(tasks.map(t => ({ ...t, completed: true })))}
                className="text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-warmgray hover:text-charcoal underline transition-colors"
              >
                Complete All
              </button>
          </div>
          <div className="space-y-4 flex-1">
            {tasks.map((task) => (
              <div 
                key={task.id} 
                onClick={() => toggleTask(task.id)}
                className={`flex items-center justify-between p-4 md:p-6 rounded-[20px] md:rounded-[24px] border transition-all cursor-pointer group min-h-[72px] ${
                  task.completed 
                    ? 'bg-ivory border-[#E5E1D8] opacity-60' 
                    : 'bg-white border-[#E5E1D8] hover:shadow-lg hover:border-sage'
                }`}
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <div className={`h-6 w-6 rounded-full border flex items-center justify-center transition-all flex-shrink-0 ${
                    task.completed ? 'bg-sage border-sage text-white' : 'border-[#E5E1D8] bg-white group-hover:border-sage'
                  }`}>
                    {task.completed && <Check size={12} />}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 md:gap-4">
                    {!task.completed && (
                      <div className={`h-2 w-2 rounded-full hidden sm:block ${task.s === 'urgent' ? 'bg-red-500 animate-pulse' : 'bg-sage opacity-40'}`} />
                    )}
                    <span className={`text-xs md:text-sm font-semibold tracking-tight transition-transform ${task.completed ? 'line-through text-warmgray' : ''}`}>
                      {task.t}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3 text-warmgray flex-shrink-0">
                   <Clock size={14} className="md:size-[16px]" />
                   <span className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold">{task.completed ? 'Done' : task.d}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-charcoal text-white rounded-[32px] md:rounded-[48px] p-6 md:p-10 flex flex-col justify-between relative overflow-hidden group min-h-[350px] md:min-h-[400px]">
          <div className="relative z-10 space-y-6 md:space-y-8">
            <div className="h-12 w-12 md:h-16 md:w-16 bg-white/10 backdrop-blur rounded-[16px] md:rounded-[20px] flex items-center justify-center border border-white/20">
               <Sparkles size={24} className="text-sage" />
            </div>
            <div className="space-y-4">
              <h3 className="font-serif text-3xl md:text-4xl leading-tight">Live Market Signals.</h3>
              <div className="space-y-3 md:space-y-4 pt-4 border-t border-white/10">
                {isGroundedLoading && (
                  <div className="flex items-center gap-3 text-[9px] md:text-[10px] text-white/40">
                    <Loader2 size={12} className="animate-spin" /> Grounding...
                  </div>
                )}
                {aiFeed.map((msg, i) => (
                  <div key={i} className="flex gap-2 md:gap-3 text-[9px] md:text-[10px] font-medium text-white/60 animate-in fade-in slide-in-from-bottom-2">
                    <Zap size={10} className="text-sage flex-shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{msg}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button className="w-full py-4 md:py-5 border border-white/20 rounded-[16px] md:rounded-[20px] text-[9px] md:text-[10px] uppercase tracking-widest font-bold hover:bg-white/10 transition-colors relative z-10 mt-8">
            View Detail
          </button>
          <div className="absolute -right-20 -bottom-20 h-64 w-64 bg-sage/10 rounded-full blur-[100px] group-hover:bg-sage/20 transition-all duration-1000" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;