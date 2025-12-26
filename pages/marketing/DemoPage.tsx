import React, { useState } from 'react';
// Added ShieldCheck to imports to resolve line 113 error
import { ArrowRight, Sparkles, Loader2, CheckCircle2, Globe, MessageSquare, Zap, ShieldCheck } from 'lucide-react';
import SEO from '../../components/SEO';

const DemoPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="animate-in fade-in duration-1000 min-h-[90vh] bg-ivory flex items-center justify-center p-8">
      <SEO 
        title="Experience the Future" 
        description="Book a strategic diagnostic of FashionOS. See how neural intelligence can orchestrate your next global campaign."
      />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sage">
              <Sparkles size={20} />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Live Handshake Session</span>
            </div>
            <h1 className="font-serif text-6xl md:text-8xl tracking-tighter leading-none">Request a Diagnostic.</h1>
            <p className="text-warmgray text-lg max-w-md leading-relaxed">
              We don't just demo software. We perform a live neural audit of your current digital footprint to show you the power of the Guardian Agent.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
             <div className="space-y-2">
                <div className="flex items-center gap-2 text-charcoal">
                  <Globe size={18} className="text-sage" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Global Sourcing</span>
                </div>
                <p className="text-xs text-warmgray">Learn how we source Tier-1 venues and models for global productions.</p>
             </div>
             <div className="space-y-2">
                <div className="flex items-center gap-2 text-charcoal">
                  <Zap size={18} className="text-sage" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Neural Speed</span>
                </div>
                <p className="text-xs text-warmgray">See how Veo 3.1 cuts pre-production time by 80% with high-fidelity pre-viz.</p>
             </div>
          </div>
        </div>

        <div className="bg-white border border-[#E5E1D8] rounded-[64px] p-12 md:p-16 shadow-2xl relative overflow-hidden">
          {isSuccess ? (
            <div className="py-20 text-center space-y-6 animate-in zoom-in-95">
               <div className="h-20 w-20 bg-sage rounded-3xl flex items-center justify-center text-white mx-auto shadow-xl">
                  <CheckCircle2 size={40} />
               </div>
               <h2 className="font-serif text-4xl">Handshake Sent.</h2>
               <p className="text-warmgray text-sm max-w-xs mx-auto">A strategic concierge will reach out within 4 hours to confirm your Maison diagnostic.</p>
               <button 
                 onClick={() => setIsSuccess(false)}
                 className="text-[10px] font-bold uppercase tracking-widest text-sage underline"
               >
                 Send another request
               </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-warmgray ml-2">Name</label>
                    <input required className="w-full bg-ivory border border-[#E5E1D8] rounded-2xl p-4 outline-none focus:border-charcoal transition-all text-sm font-medium" placeholder="Julien Lebrun" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-warmgray ml-2">Brand</label>
                    <input required className="w-full bg-ivory border border-[#E5E1D8] rounded-2xl p-4 outline-none focus:border-charcoal transition-all text-sm font-medium" placeholder="Maison de Silk" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-warmgray ml-2">Maison Email</label>
                  <input required type="email" className="w-full bg-ivory border border-[#E5E1D8] rounded-2xl p-4 outline-none focus:border-charcoal transition-all text-sm font-medium" placeholder="julien@maison.paris" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-warmgray ml-2">Strategic Focus</label>
                  <select className="w-full bg-ivory border border-[#E5E1D8] rounded-2xl p-4 outline-none focus:border-charcoal transition-all text-sm font-medium appearance-none">
                    <option>Omnichannel Growth</option>
                    <option>Production Compliance</option>
                    <option>Heritage DNA Preservation</option>
                    <option>Global Scaling</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-warmgray ml-2">Message (Optional)</label>
                  <textarea className="w-full h-24 bg-ivory border border-[#E5E1D8] rounded-2xl p-4 outline-none focus:border-charcoal transition-all text-sm font-medium resize-none" placeholder="Tell us about your next global campaign..." />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-6 bg-charcoal text-white rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : 'Confirm Live Handshake'}
                {!isSubmitting && <ArrowRight size={20} />}
              </button>

              <div className="flex items-center gap-2 justify-center text-[8px] font-bold uppercase text-warmgray tracking-widest">
                <ShieldCheck size={12} className="text-sage" />
                DNA SECURED • END-TO-END ENCRYPTED
              </div>
            </form>
          )}
          
          <div className="absolute -right-20 -bottom-20 h-64 w-64 bg-sage/5 rounded-full blur-[100px]" />
        </div>
      </div>
    </div>
  );
};

export default DemoPage;