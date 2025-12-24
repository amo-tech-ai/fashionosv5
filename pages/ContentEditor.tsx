
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Instagram, Send, Sparkles, Check, Clock, ChevronLeft, Image as ImageIcon, MessageCircle, MoreHorizontal, Loader2 } from 'lucide-react';

const ContentEditor: React.FC = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'Draft' | 'Needs Review' | 'Approved'>('Draft');
  const [isScheduling, setIsScheduling] = useState(false);
  const [schedulingLog, setSchedulingLog] = useState<string[]>([]);
  const [caption, setCaption] = useState("Exploring the architectural lines of silk. Our SS25 collection merges heritage weaving with modern minimalism. #LArtisanParis #LuxurySustainable #SS25");

  const handleSchedule = async () => {
    setIsScheduling(true);
    const logs = [
      "Initiating neural handshake with n8n...",
      "Validating platform API tokens (Instagram Graph)...",
      "Optimizing media delivery payload...",
      "Handing off to Postiz scheduling queue...",
      "Syncing metadata with Brand Profile...",
      "Success: Post queued for Oct 14, 17:14."
    ];

    for (let i = 0; i < logs.length; i++) {
      setSchedulingLog(prev => [...prev, logs[i]]);
      await new Promise(resolve => setTimeout(resolve, 600));
    }

    setTimeout(() => {
      setStatus('Approved');
      setIsScheduling(false);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col md:flex-row bg-white relative">
      {/* Scheduling Overlay */}
      {isScheduling && (
        <div className="absolute inset-0 z-50 glass flex items-center justify-center animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-charcoal text-white rounded-[40px] p-10 shadow-2xl space-y-8">
             <div className="flex items-center gap-4">
                <Loader2 size={32} className="animate-spin text-sage" />
                <h2 className="font-serif text-3xl">Synchronizing...</h2>
             </div>
             <div className="space-y-3 font-mono text-[10px] text-white/40">
                {schedulingLog.map((log, i) => (
                  <p key={i} className="animate-in slide-in-from-left-2 duration-300 flex items-center gap-2">
                    <span className="text-sage">❯</span> {log}
                  </p>
                ))}
             </div>
          </div>
        </div>
      )}

      {/* Main Panel: Editor */}
      <div className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar space-y-12">
        <header className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-warmgray hover:text-charcoal transition-colors font-medium">
            <ChevronLeft size={20} />
            Back to Calendar
          </button>
          <div className="flex items-center gap-3">
             <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${
               status === 'Approved' ? 'bg-sage/10 border-sage text-sage' : 'bg-ivory border-[#E5E1D8] text-warmgray'
             }`}>
               {status}
             </span>
             <button className="p-2 hover:bg-ivory rounded-full"><MoreHorizontal size={20} /></button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Post Preview */}
          <div className="space-y-6">
             <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-warmgray">Platform Preview</h3>
             <div className="glass rounded-[32px] overflow-hidden shadow-2xl border border-[#E5E1D8] max-w-sm mx-auto lg:mx-0">
                <div className="p-4 flex items-center justify-between border-b border-[#E5E1D8]">
                   <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-sage" />
                      <span className="text-sm font-bold">lartisan.paris</span>
                   </div>
                   <Instagram size={18} className="text-rose-500" />
                </div>
                <div className="aspect-square bg-ivory">
                   <img src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" />
                </div>
                <div className="p-4 space-y-2">
                   <div className="flex gap-4">
                      <span className="text-xs font-bold">1,248 likes</span>
                   </div>
                   <p className="text-xs leading-relaxed line-clamp-2">
                      <span className="font-bold mr-2">lartisan.paris</span>
                      {caption}
                   </p>
                </div>
             </div>
          </div>

          {/* Form Controls */}
          <div className="space-y-8">
             <div className="space-y-4">
                <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-warmgray">Post Caption</label>
                <textarea 
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full h-48 p-6 bg-ivory border border-[#E5E1D8] rounded-3xl outline-none focus:border-sage transition-all text-sm leading-relaxed"
                />
             </div>

             <div className="space-y-4">
                <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-warmgray">Shot List Tags</label>
                <div className="flex flex-wrap gap-2">
                   {['Scene: Milan Studio', 'Model: Anja L.', 'Lighting: Warm Diffused'].map(tag => (
                     <span key={tag} className="px-3 py-1 bg-white border border-[#E5E1D8] rounded-full text-[10px] font-bold text-warmgray">{tag}</span>
                   ))}
                </div>
             </div>

             <div className="p-6 bg-ivory border border-[#E5E1D8] rounded-[32px] flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center">
                      <Clock size={20} className="text-warmgray" />
                   </div>
                   <div>
                      <p className="text-[10px] uppercase font-bold text-warmgray">Schedule</p>
                      <p className="text-sm font-semibold">Oct 14, 2024 • 17:14</p>
                   </div>
                </div>
                <button className="text-[10px] uppercase font-bold text-charcoal underline">Change</button>
             </div>
          </div>
        </div>
      </div>

      {/* Right Panel: AI Assistant */}
      <div className="w-full md:w-80 border-l border-[#E5E1D8] flex flex-col p-8 space-y-8 bg-ivory/20">
         <div className="flex items-center gap-3">
            <Sparkles size={20} className="text-sage" />
            <h3 className="font-serif text-2xl">AI Editor</h3>
         </div>

         <div className="space-y-6">
            <div className="p-6 bg-white rounded-3xl border border-[#E5E1D8] shadow-sm">
               <p className="text-[10px] uppercase font-bold text-sage mb-2">Suggestion</p>
               <p className="text-xs leading-relaxed text-warmgray mb-4 italic">"The caption is slightly too formal for Instagram's current luxury engagement trends. Try adding more sensory keywords."</p>
               <button className="w-full py-3 bg-charcoal text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all">
                  Apply Rewrite
               </button>
            </div>

            <div className="space-y-4">
               <h4 className="text-[10px] uppercase font-bold tracking-widest text-warmgray">Optimization</h4>
               <div className="flex items-center justify-between px-2">
                  <span className="text-xs font-medium">Hashtag Score</span>
                  <span className="text-xs font-bold text-green-600">High</span>
               </div>
               <div className="flex items-center justify-between px-2">
                  <span className="text-xs font-medium">Visual Balance</span>
                  <span className="text-xs font-bold text-sage">Optimal</span>
               </div>
            </div>

            <div className="pt-8 space-y-4">
               <button 
                onClick={handleSchedule}
                disabled={status === 'Approved'}
                className={`w-full py-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 ${
                  status === 'Approved' ? 'bg-[#E5E1D8] text-warmgray cursor-default' : 'bg-sage text-white hover:scale-105'
                }`}
               >
                  {status === 'Approved' ? <CheckCircle size={18} /> : <Check size={18} />}
                  {status === 'Approved' ? 'Scheduled Successfully' : 'Approve & Schedule'}
               </button>
               <button className="w-full py-4 border border-[#E5E1D8] bg-white rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-ivory transition-all">
                  Request AI Edit
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

// CheckCircle imported correctly from lucide-react if available, else alias it
import { CheckCircle as CheckCircleIcon } from 'lucide-react';
const CheckCircle = CheckCircleIcon;

export default ContentEditor;
