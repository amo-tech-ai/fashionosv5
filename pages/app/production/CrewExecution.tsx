import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Camera, Zap, ChevronLeft, Mic, PhoneOff, RefreshCw, Maximize2, MessageSquare, Save, Loader2, ShieldCheck, ClipboardList
} from 'lucide-react';
import { useProjects } from '../../../contexts/ProjectContext';
import { useIntelligence } from '../../../contexts/IntelligenceContext';
import { IntelligenceService } from '../../../services/intelligence';

const CrewExecution: React.FC = () => {
  const { shootId } = useParams();
  const navigate = useNavigate();
  const { getShootById, updateShoot } = useProjects();
  const { openPanel } = useIntelligence();
  const intelService = IntelligenceService.getInstance();
  
  const shoot = getShootById(shootId || '');
  const [activeShotId, setActiveShotId] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isLiveVoice, setIsLiveVoice] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [currentNotes, setCurrentNotes] = useState('');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (shoot) {
      openPanel('production_oversight', { shootData: shoot, title: shoot.title, image: '', impact: 'Active' });
    }
  }, [shootId, shoot, openPanel]);

  useEffect(() => {
    if (activeShotId && shoot) {
      const activeShot = shoot.shotList.find(s => s.id === activeShotId);
      setCurrentNotes(activeShot?.notes || '');
    }
  }, [activeShotId, shoot]);

  if (!shoot) return <div className="p-20 text-center font-serif text-warmgray">Shoot Context Lost. Synchronizing with Maison Node...</div>;

  const handleSaveNotes = () => {
    if (!activeShotId) return;
    const updatedShots = shoot.shotList.map(s => 
      s.id === activeShotId ? { ...s, notes: currentNotes } : s
    );
    updateShoot(shoot.id, { shotList: updatedShots });
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error("Hardware HUD: Camera link blocked.", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setIsCameraActive(false);
    }
  };

  const captureAndScan = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setIsScanning(true);
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg');

    try {
      const result = await intelService.scanMediaAsset(dataUrl, shoot.dnaSnapshot.pillars);
      
      const updatedShots = shoot.shotList.map(s => 
        s.id === activeShotId 
          ? { ...s, complianceScore: result.score, auditFeedback: result.audit, status: (result.score > 85 ? 'Approved' : 'Flagged') as 'Approved' | 'Flagged', testImage: dataUrl }
          : s
      );
      updateShoot(shoot.id, { shotList: updatedShots });
    } catch (e) {
      console.error(e);
    } finally {
      setIsScanning(false);
    }
  };

  useEffect(() => {
    if (activeShotId && !isCameraActive) {
      startCamera();
    }
    return () => stopCamera();
  }, [activeShotId, isCameraActive]);

  return (
    <div className="min-h-screen bg-ivory flex flex-col lg:flex-row overflow-hidden relative">
      <canvas ref={canvasRef} className="hidden" />
      
      <aside className="w-full lg:w-96 h-full bg-white border-r border-[#E5E1D8] flex flex-col flex-shrink-0 animate-in slide-in-from-left duration-700">
        <header className="p-8 border-b border-[#E5E1D8]">
           <button onClick={() => navigate('/shoots')} className="flex items-center gap-2 text-warmgray hover:text-charcoal mb-4 transition-colors font-bold text-[10px] uppercase tracking-widest">
              <ChevronLeft size={16} /> Shoot Hub
           </button>
           <h3 className="font-serif text-3xl tracking-tight">{shoot.title}</h3>
           <p className="text-[10px] uppercase font-bold text-sage tracking-[0.2em] mt-1 flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-sage animate-pulse" />
              Hardware HUD Active • {shoot.location}
           </p>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-ivory/20">
           {shoot.shotList.map((shot) => (
             <div 
               key={shot.id} 
               onClick={() => setActiveShotId(shot.id)}
               className={`p-5 rounded-[32px] border transition-all cursor-pointer group ${
                 activeShotId === shot.id ? 'bg-charcoal text-white border-charcoal shadow-2xl scale-[1.02]' : 'bg-white border-[#E5E1D8] hover:border-charcoal'
               }`}
             >
                <div className="flex justify-between items-start mb-3">
                   <span className={`text-[8px] font-bold uppercase px-3 py-1 rounded-full border ${
                     shot.status === 'Approved' ? 'bg-sage/10 border-sage text-sage' : 
                     shot.status === 'Flagged' ? 'bg-rose-500/10 border-rose-500 text-rose-500' : 
                     'bg-ivory border-ivory text-warmgray'
                   }`}>
                      {shot.status}
                   </span>
                   <span className="text-[9px] font-bold opacity-30">#{shot.id}</span>
                </div>
                <h4 className="text-sm font-semibold mb-1 tracking-tight">{shot.description}</h4>
                <p className={`text-[10px] leading-relaxed ${activeShotId === shot.id ? 'text-white/60' : 'text-warmgray'}`}>
                   {shot.lighting} • {shot.pose}
                </p>
             </div>
           ))}
        </div>
      </aside>

      <main className="flex-1 h-full p-6 md:p-10 overflow-y-auto custom-scrollbar flex flex-col gap-8">
         <header className="flex justify-between items-center">
            <div className="flex items-center gap-4">
               <div className={`h-3 w-3 rounded-full ${isLiveVoice ? 'bg-rose-500 animate-ping' : 'bg-sage animate-pulse'}`} />
               <h4 className="font-serif text-4xl tracking-tighter">Production Link</h4>
            </div>
            <button 
              onClick={() => setIsLiveVoice(!isLiveVoice)}
              className={`flex items-center gap-3 px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                isLiveVoice ? 'bg-rose-500 text-white shadow-xl scale-105' : 'bg-white border border-[#E5E1D8] text-warmgray hover:border-charcoal shadow-sm'
              }`}
            >
               {isLiveVoice ? <PhoneOff size={16} /> : <Mic size={16} />}
               {isLiveVoice ? 'Live Link Engaged' : 'Voice Handshake'}
            </button>
         </header>

         {activeShotId ? (
           <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 flex-1 animate-in fade-in duration-500">
              <div className="xl:col-span-2 flex flex-col gap-8">
                 <div className="aspect-[16/10] bg-black rounded-[64px] overflow-hidden relative group shadow-3xl border border-charcoal/20">
                    <div className="absolute inset-0 pointer-events-none z-10 p-10 flex flex-col justify-between">
                       <div className="flex justify-between items-start">
                          <div className="space-y-1">
                             <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                                <span className="text-[10px] font-bold text-white uppercase tracking-[0.4em]">REC_4K_LUX</span>
                             </div>
                             <p className="text-[10px] text-white/40 font-mono">ISO 400 | f/2.8 | 1/125</p>
                          </div>
                          <div className="text-right">
                             <p className="text-[10px] font-bold text-white uppercase tracking-widest">DNA SYNC</p>
                             <p className="text-[10px] text-sage font-bold">V{shoot.dnaSnapshot.version}</p>
                          </div>
                       </div>
                       
                       <div className="flex justify-between items-end">
                          <div className="p-6 bg-black/40 backdrop-blur-xl rounded-[32px] border border-white/10 space-y-2">
                             <p className="text-[8px] font-bold text-white/60 uppercase tracking-widest">Aesthetic Target</p>
                             <div className="flex items-baseline gap-3">
                                <span className="text-3xl font-serif text-white">85.0</span>
                                <span className="text-[8px] text-white/40 uppercase">Baseline</span>
                             </div>
                          </div>
                          <div className="h-14 w-14 border border-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md cursor-pointer hover:bg-white/10 transition-all"><Maximize2 size={20}/></div>
                       </div>
                    </div>

                    {isScanning && (
                      <div className="absolute inset-0 z-20 bg-sage/10 backdrop-blur-md flex items-center justify-center">
                         <div className="flex flex-col items-center gap-4">
                            <Loader2 size={64} className="animate-spin text-white" />
                            <span className="text-[11px] font-bold uppercase text-white tracking-[0.5em]">Guardian Audit In-Progress...</span>
                         </div>
                      </div>
                    )}
                    
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline 
                      className={`w-full h-full object-cover transition-opacity duration-1000 ${isCameraActive ? 'opacity-100' : 'opacity-0'}`}
                    />

                    <button 
                      onClick={captureAndScan}
                      disabled={isScanning || !isCameraActive}
                      className="absolute bottom-12 left-12 right-12 py-6 bg-white text-charcoal rounded-[24px] text-xs font-bold uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-4 disabled:opacity-50 z-20"
                    >
                       <Zap size={20} className="text-sage fill-sage" /> Capture Frame & Audit
                    </button>
                 </div>

                 <div className="bg-white border border-[#E5E1D8] rounded-[48px] p-10 space-y-8 shadow-sm">
                    <div className="flex items-center justify-between">
                       <h5 className="font-serif text-3xl">Feedback Node</h5>
                       {shoot.shotList.find(s => s.id === activeShotId)?.complianceScore && (
                         <div className="px-6 py-3 bg-sage/10 text-sage rounded-full text-lg font-serif border border-sage/20 shadow-inner">
                            {shoot.shotList.find(s => s.id === activeShotId)?.complianceScore}% Match
                         </div>
                       )}
                    </div>
                    <div className="p-8 bg-ivory rounded-[32px] border border-[#E5E1D8] relative group">
                       <p className="text-lg leading-relaxed text-charcoal font-medium italic">
                         "{shoot.shotList.find(s => s.id === activeShotId)?.auditFeedback || 'Awaiting frame capture for #' + activeShotId + '. Guardian Agent ready.'}"
                       </p>
                       <ShieldCheck className="absolute bottom-6 right-6 text-sage opacity-20" size={32} />
                    </div>
                 </div>
              </div>

              <aside className="space-y-10">
                 <div className="bg-charcoal text-white rounded-[48px] p-10 space-y-8 relative overflow-hidden shadow-2xl">
                    <div className="relative z-10 space-y-6">
                       <div className="flex items-center gap-3 text-sage">
                          <ClipboardList size={20} />
                          <span className="text-[10px] uppercase font-bold tracking-widest">Active Instructions</span>
                       </div>
                       <div className="space-y-6">
                          <div className="space-y-2">
                             <p className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Description</p>
                             <p className="text-lg font-serif">{shoot.shotList.find(s => s.id === activeShotId)?.description}</p>
                          </div>
                          <div className="space-y-2">
                             <p className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Lighting & Tone</p>
                             <p className="text-sm text-white/80 leading-relaxed italic">"{shoot.shotList.find(s => s.id === activeShotId)?.lighting}"</p>
                          </div>
                       </div>
                    </div>
                    <div className="absolute -right-20 -bottom-20 h-64 w-64 bg-sage/10 rounded-full blur-[100px]" />
                 </div>

                 <div className="bg-white border border-[#E5E1D8] rounded-[48px] p-10 space-y-6 shadow-sm">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3 text-charcoal">
                          <MessageSquare size={18} />
                          <span className="text-[10px] uppercase font-bold tracking-widest">On-Set Notes</span>
                       </div>
                       <button onClick={handleSaveNotes} className="p-2 hover:bg-ivory rounded-full text-sage transition-all" title="Save Persistence"><Save size={18} /></button>
                    </div>
                    <textarea 
                       className="w-full h-40 bg-ivory rounded-[24px] p-6 text-sm font-medium outline-none focus:border-charcoal border border-transparent transition-all resize-none shadow-inner"
                       placeholder="Enter lens details, talent feedback, or lighting shifts..."
                       value={currentNotes}
                       onChange={(e) => setCurrentNotes(e.target.value)}
                    />
                 </div>
              </aside>
           </div>
         ) : (
           <div className="flex-1 flex flex-col items-center justify-center text-center p-20 space-y-8 bg-white border border-[#E5E1D8] border-dashed rounded-[64px] animate-in zoom-in-95">
              <div className="h-40 w-40 bg-ivory rounded-[48px] flex items-center justify-center text-warmgray shadow-inner border border-ivory">
                 <Camera size={64} className="animate-pulse-slow" />
              </div>
              <div className="max-w-sm space-y-3">
                 <h5 className="font-serif text-4xl tracking-tight">Select Production Node</h5>
                 <p className="text-warmgray text-lg leading-relaxed">Pick a checklist item from the sidebar to initialize the Guardian hardware link.</p>
              </div>
           </div>
         )}
      </main>
    </div>
  );
};

export default CrewExecution;