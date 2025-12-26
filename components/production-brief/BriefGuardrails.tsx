import React from 'react';
import { ShieldCheck, Film } from 'lucide-react';
import { Shoot } from '../../types';

interface BriefGuardrailsProps {
  shoot: Shoot;
}

const BriefGuardrails: React.FC<BriefGuardrailsProps> = ({ shoot }) => {
  return (
    <section className="space-y-8 print:space-y-4">
      <div className="flex items-center gap-3">
        <ShieldCheck size={20} className="text-sage" />
        <h3 className="font-serif text-3xl print:text-xl">Neural Guardrails</h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 print:grid-cols-2 print:gap-6">
        <div className="p-10 bg-ivory border border-sage/20 rounded-[48px] space-y-6 print:p-6 print:rounded-2xl">
          <p className="text-[10px] uppercase font-bold text-sage tracking-widest">LOCKED DNA VERSION: {shoot.dnaSnapshot.version}</p>
          <div className="flex flex-wrap gap-2">
            {shoot.dnaSnapshot.pillars.map(p => (
              <span key={p} className="px-4 py-2 bg-white border border-sage/10 rounded-xl text-[10px] font-bold text-charcoal uppercase tracking-widest">{p}</span>
            ))}
          </div>
          <p className="text-sm leading-relaxed text-warmgray italic print:text-[10px]">"Guardian Agent is active for this production. Any asset with a DNA compliance score below 85% will be flagged for immediate on-set realigment."</p>
        </div>
        <div className="aspect-video bg-charcoal rounded-[48px] overflow-hidden relative group print:rounded-2xl">
          {shoot.preVizVideo ? (
            <video src={shoot.preVizVideo} autoPlay loop muted className="w-full h-full object-cover opacity-60" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-white/20">
              <Film size={40} className="mb-4" />
              <p className="text-[10px] uppercase font-bold tracking-widest">Pre-Viz Video Attached</p>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
          <div className="absolute bottom-10 left-10">
            <span className="px-3 py-1 bg-white/10 backdrop-blur rounded-full text-[9px] font-bold uppercase tracking-widest text-white border border-white/20">
              Cinematic Pre-Viz
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BriefGuardrails;