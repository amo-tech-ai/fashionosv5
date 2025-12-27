import React, { useState } from 'react';
import { Settings as SettingsIcon, Shield, User, Bell, Cpu, Globe, ArrowRight, Loader2, Zap, CheckCircle2, AlertCircle } from 'lucide-react';
import { IntelligenceService } from '../../../services/intelligence';

const SettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('Workspace');
  const [isDiagnosticRunning, setIsDiagnosticRunning] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<any>(null);
  const intelService = IntelligenceService.getInstance();

  const runDiagnostics = async () => {
    setIsDiagnosticRunning(true);
    setDiagnosticResult(null);
    try {
      const result = await intelService.checkConnectivity();
      setDiagnosticResult(result);
    } catch (e) {
      setDiagnosticResult({ status: 'Error', error: 'Internal Handshake Failure' });
    } finally {
      setIsDiagnosticRunning(false);
    }
  };

  const menuItems = [
    { name: 'Workspace', icon: SettingsIcon },
    { name: 'Identity', icon: User },
    { name: 'Security', icon: Shield },
    { name: 'Intelligence', icon: Cpu },
    { name: 'Notifications', icon: Bell },
  ];

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto flex flex-col md:flex-row gap-12 animate-in fade-in duration-700">
      <div className="w-full md:w-64 space-y-2">
         <h2 className="font-serif text-4xl tracking-tighter mb-8">System Control</h2>
         {menuItems.map(item => (
           <button key={item.name} onClick={() => setActiveSection(item.name)} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] uppercase font-bold tracking-widest transition-all ${activeSection === item.name ? 'bg-charcoal text-white shadow-xl translate-x-1' : 'text-warmgray hover:bg-ivory'}`}>
             <item.icon size={16} /> {item.name}
           </button>
         ))}
      </div>

      <div className="flex-1 space-y-12">
         <section className="bg-white border border-[#E5E1D8] rounded-[48px] p-10 space-y-8 shadow-sm">
            <div className="flex justify-between items-start border-b border-[#F9F7F2] pb-8">
               <div>
                  <h3 className="font-serif text-3xl mb-2">{activeSection} Preferences</h3>
                  <p className="text-warmgray text-sm">Customize how FashionOS optimizes your production environment.</p>
               </div>
               <button className="px-8 py-3 bg-charcoal text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-lg">Save Changes</button>
            </div>

            <div className="space-y-6">
               <div className="flex items-center justify-between p-6 bg-ivory rounded-3xl border border-[#E5E1D8]">
                  <div className="space-y-1">
                     <p className="font-semibold text-sm">Neural Link Optimization</p>
                     <p className="text-xs text-warmgray">Allow AI to auto-adjust production schedules.</p>
                  </div>
                  <div className="h-6 w-12 bg-sage rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full" /></div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-2">
                     <label className="text-[10px] uppercase font-bold tracking-widest text-warmgray ml-2">Locale</label>
                     <div className="flex items-center justify-between p-4 bg-white border border-[#E5E1D8] rounded-2xl"><span className="text-sm font-medium">Paris (GMT+2)</span><Globe size={16} className="text-warmgray" /></div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] uppercase font-bold tracking-widest text-warmgray ml-2">Core</label>
                     <div className="flex items-center justify-between p-4 bg-white border border-[#E5E1D8] rounded-2xl"><span className="text-sm font-medium">Gemini 3 Pro</span><Cpu size={16} className="text-sage" /></div>
                  </div>
               </div>
            </div>
         </section>

         <section className="bg-charcoal text-white rounded-[48px] p-10 flex flex-col md:flex-row items-center gap-10 shadow-2xl relative overflow-hidden group">
            <div className="flex-1 space-y-4 relative z-10">
               <h4 className="font-serif text-3xl">Neural Link Status</h4>
               {diagnosticResult && (
                 <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
                    <div className="flex items-center gap-2 mb-2">
                       {diagnosticResult.status === 'Operational' ? <CheckCircle2 size={14} className="text-sage" /> : <AlertCircle size={14} className="text-rose-500" />}
                       <span className="text-[10px] font-bold uppercase tracking-widest">Handshake: {diagnosticResult.status}</span>
                    </div>
                 </div>
               )}
            </div>
            <button onClick={runDiagnostics} disabled={isDiagnosticRunning} className="px-10 py-5 bg-white text-charcoal rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-3 relative z-10 disabled:opacity-50">
               {isDiagnosticRunning ? <Loader2 size={16} className="animate-spin" /> : <Zap size={16} className="fill-charcoal" />}
               {isDiagnosticRunning ? 'Validating...' : 'Run Diagnostics'} <ArrowRight size={16} />
            </button>
            <div className="absolute -right-10 -bottom-10 h-64 w-64 bg-sage/10 rounded-full blur-[80px] group-hover:bg-sage/20 transition-all duration-1000" />
         </section>
      </div>
    </div>
  );
};

export default SettingsPage;