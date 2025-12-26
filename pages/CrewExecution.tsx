import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Camera, Upload, ShieldCheck, AlertTriangle, CheckCircle2, 
  Loader2, ChevronLeft, Mic, PhoneOff, Zap, Image as ImageIcon,
  MoreVertical, Share2, ClipboardList, RefreshCw, Maximize2, MessageSquare, Save
} from 'lucide-react';
import { useProjects } from '../contexts/ProjectContext';
import { useIntelligence } from '../contexts/IntelligenceContext';
import { IntelligenceService } from '../services/intelligence';

const CrewExecution: React.FC = () => {
  const { shootId } = useParams();
  const navigate = useNavigate();
  const { getShootById, updateShoot } = useProjects();
  const { openPanel } = useIntelligence();
  const intelService = IntelligenceService.getInstance();
  
  const shoot = getShootById(shootId || '');
  const [activeShotId, setActiveShotId] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{ score: number, audit: string } | null>(null);
  const [isLiveVoice, setIsLiveVoice] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [currentNotes, setCurrentNotes] = useState('');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (shoot) {
      openPanel('production_oversight', { shootData: shoot, title: shoot.title, image: '', impact: 'Active' });
    }
  }, [shootId]);

  useEffect(() => {
    if (activeShotId && shoot) {
      const activeShot = shoot.shotList.find(s => s.id === activeShotId);
      setCurrentNotes(activeShot?.notes || '');
    }
  }, [activeShotId, shoot]);

  if (!shoot) return <div className="p-20 text-center">Shoot context not found.</div>;

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
      console.error("Camera access denied:", err);
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
      setScanResult(result);
      
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
  }, [activeShotId]);

  return (
    <div className="min-h-screen bg-ivory flex flex-col lg:flex-row overflow-hidden relative">
      <canvas ref={canvasRef} className="hidden" />
      
      {/* Left: Shot List Sidebar */}
      <aside className="w-full lg:w-96 h-full bg-white border-r border-[#E5E1D8] flex flex-col flex-shrink-0">
        <header className="p-8 border-b border-[#E5E1D8] flex items-center justify-between">
           <div>
              <button onClick={() => navigate('/shoots')} className="flex items-center gap-2 text-warmgray hover:text-charcoal mb-3 transition-colors">
                <ChevronLeft size={16} /> <span className="text-[10px] font-bold uppercase tracking-widest">Shoot Hub</span>
              </button>
              <h3 className="font-serif text-2xl">{shoot.title}</h3>
              <p className="text-[9px] uppercase font-bold text-warmgray tracking-[0.2em] mt-1">Crew View • {shoot.location}</p>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-ivory/20">
           {shoot.shotList.map((shot) => (
             <div 
               key={shot.id} 
               onClick={() => setActiveShotId(shot.id)}
               className={`p-5 rounded-3xl border transition-all cursor-pointer group ${
                 activeShotId === shot.id ? 'bg-charcoal text-white border-charcoal shadow-xl' : 'bg-white border-[#E5E1D8] hover:border-charcoal'
               }`}
             >
                <div className="flex justify-between items-start mb-3">
                   <span className={`text-[8px] font-bold uppercase px-2 py-1 rounded ${
                     shot.status === 'Approved' ? 'bg-sage text-white' : 
                     shot.status === 'Flagged' ? 'bg-rose-500 text-white' : 
                     'bg-ivory text-warmgray border border-ivory'
                   }`}>
                      {shot.status}
                   </span>
                   <span className="text-[9px] font-bold opacity-40">#{shot.id}</span>
                </div>
                <h4 className="text-sm font-semibold mb-1">{shot.description}</h4>
                <p className={`text-[10px] font-medium leading-relaxed ${activeShotId === shot.id ? 'text-white/60' : 'text-warmgray'}`}>
                   {shot.lighting} • {shot.pose}
                </p>
                {shot.notes && (
                  <div className={`mt-2 flex items-center gap-2 text-[8px] uppercase font-bold tracking-widest ${activeShotId === shot.id ? 'text-white/40' : 'text-warmgray'}`}>
                    <MessageSquare size={10} /> Note Attached
                  </div>
                )}
                {shot.complianceScore && (
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                     <span className="text-[9px] font-bold uppercase">Aesthetic Match</span>
                     <span className={`text-[10px] font-bold ${shot.complianceScore > 85 ? 'text-sage' : 'text-rose-400'}`}>{shot.complianceScore}%</span>
                  </div>
                )}
             </div>
           ))}
        </div>
      </aside>

      {/* Center: Live Action / Hardware HUD */}
      <main className="flex-1 h-full p-6 md:p-10 overflow-y-auto custom-scrollbar flex flex-col gap-8">
         <header className="flex justify-between items-center">
            <div className="flex items-center gap-4">
               <div className={`h-3 w-3 rounded-full ${isLiveVoice ? 'bg-rose-500 animate-ping' : 'bg-sage animate-pulse'}`} />
               <h4 className="font-serif text-3xl">Neural Live View</h4>
            </div>
            <div className="flex items-center gap-3">
               <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-charcoal text-[9px] font-bold uppercase text-white/40 rounded-full border border-white/10">
                  <RefreshCw size={10} className="animate-spin text-sage" />
                  Latency: 14ms
               </div>
               <button 
                 onClick={() => setIsLiveVoice(!isLiveVoice)}
                 className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                   isLiveVoice ? 'bg-rose-500 text-white shadow-lg' : 'bg-white border border-[#E5E1D8] text-warmgray hover:border-charcoal shadow-sm'
                 }`}
               >
                  {isLiveVoice ? <PhoneOff size={14} /> : <Mic size={14} />}
                  {isLiveVoice ? 'Live Link Active' : 'Voice Link'}
               </button>
            </div>
         </header>

         {activeShotId ? (
           <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 flex-1">
              <div className="xl:col-span-2 flex flex-col gap-6">
                 {/* Hardware HUD / Camera View */}
                 <div className="aspect-[16/10] bg-black rounded-[48px] overflow-hidden relative group shadow-2xl border border-charcoal/20">
                    {/* HUD Overlays */}
                    <div className="absolute inset-0 pointer-events-none z-10 p-8 flex flex-col justify-between">
                       <div className="flex justify-between items-start">
                          <div className="space-y-1">
                             <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                                <span className="text-[10px] font-bold text-white uppercase tracking-widest">REC 4K PRO</span>
                             </div>
                             <p className="text-[10px] text-white/40 font-mono">ISO 400 | f/2.8 | 1/125</p>
                          </div>
                          <div className="text-right">
                             <p className="text-[10px] font-bold text-white uppercase tracking-widest">DNA SYNC</p>
                             <p className="text-[10px] text-sage font-bold">V{shoot.dnaSnapshot.version}</p>
                          </div>
                       </div>
                       
                       {/* Center Focus Reticle */}
                       <div className="absolute inset-0 flex items-center justify-center opacity-30">
                          <div className="w-48 h-48 border border-white/50 rounded-full flex items-center justify-center">
                             <div className="w-1 h-1 bg-white rounded-full" />
                          </div>
                       </div>

                       <div className="flex justify-between items-end">
                          <div className="p-4 bg-black/40 backdrop-blur rounded-2xl border border-white/10 space-y-2">
                             <p className="text-[8px] font-bold text-white/60 uppercase">Target Score</p>
                             <div className="flex items-baseline gap-2">
                                <span className="text-xl font-serif text-white">85.0</span>
                                <span className="text-[8px] text-white/40">MIN_MATCH</span>
                             </div>
                          </div>
                          <div className="flex gap-4">
                             <div className="h-10 w-10 border border-white/20 rounded-full flex items-center justify-center text-white"><Maximize2 size={16}/></div>
                          </div>
                       </div>
                    </div>

                    {isScanning && (
                      <div className="absolute inset-0 z-20 bg-sage/10 backdrop-blur-[2px] flex items-center justify-center">
                         <div className="flex flex-col items-center gap-3">
                            <Loader2 size={48} className="animate-spin text-white" />
                            <span className="text-[11px] font-bold uppercase text-white tracking-[0.3em]">Guardian Neural Audit...</span>
                         </div>
                         <div className="neural-scan-line" />
                      </div>
                    )}
                    
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline 
                      className={`w-full h-full object-cover transition-opacity duration-1000 ${isCameraActive ? 'opacity-100' : 'opacity-0'}`}
                    />
                    
                    {!isCameraActive && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12 space-y-6">
                         <div className="h-20 w-20 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 text-white/20">
                            <Camera size={40} />
                         </div>
                         <p className="text-white/40 text-sm italic max-w-xs">Initializing hardware link...</p>
                      </div>
                    )}

                    <button 
                      onClick={captureAndScan}
                      disabled={isScanning || !isCameraActive}
                      className="absolute bottom-10 left-10 right-10 py-5 bg-white text-charcoal rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50 z-20 active:scale-95"
                    >
                       <Zap size={18} className="text-sage fill-sage" /> Capture & Neural Audit
                    </button>
                 </div>

                 <div className="bg-white border border-[#E5E1D8] rounded-[40px] p-8 space-y-8 shadow-sm">
                    <div className="flex items-center justify-between">
                       <h5 className="font-serif text-2xl">DNA Feedback Engine</h5>
                       {shoot.shotList.find(s => s.id === activeShotId)?.complianceScore && (
                         <div className="flex items-center gap-3">
                            <span className="text-[10px] uppercase font-bold text-warmgray">Aesthetic Compliance</span>
                            <div className="px-5 py-2 bg-sage/10 text-sage rounded-full text-[12px] font-bold border border-sage/20 shadow-sm">
                               {shoot.shotList.find(s => s.id === activeShotId)?.complianceScore}%
                            </div>
                         </div>
                       )}
                    </div>
                    <div className="p-6 bg-ivory rounded-3xl border border-[#E5E1D8] relative group">
                       <p className="text-sm leading-relaxed text-charcoal font-medium italic">
                         "{shoot.shotList.find(s => s.id === activeShotId)?.auditFeedback || 'Hardware node synchronized. Awaiting first frame ingestion for ' + activeShotId + '.'}"
                       </p>
                       <ShieldCheck className="absolute bottom-4 right-4 text-sage opacity-20 group-hover:opacity-100 transition-opacity" size={24} />
                    </div>
                 </div>
              </div>

              <div className="space-y-8">
                 <div className="bg-charcoal text-white rounded-[40px] p-8 space-y-8 relative overflow-hidden shadow-xl">
                    <div className="relative z-10 space-y-6">
                       <div className="flex items-center gap-3 text-sage">
                          <ClipboardList size={18} />
                          <span className="text-[10px] uppercase font-bold tracking-widest">Active Brief Node</span>
                       </div>
                       <div className="space-y-6">
                          <div className="space-y-1">
                             <p className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Instruction</p>
                             <p className="text-sm font-semibold">{shoot.shotList.find(s => s.id === activeShotId)?.description}</p>
                          </div>
                          <div className="space-y-1">
                             <p className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Aesthetic Key</p>
                             <p className="text-xs text-white/80 leading-relaxed italic">"{shoot.shotList.find(s => s.id === activeShotId)?.lighting}"</p>
                          </div>
                          <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                             <span className="text-[10px] font-bold uppercase px-3 py-1 bg-white/10 rounded-lg">Target: {shoot.shotList.find(s => s.id === activeShotId)?.channel}</span>
                             <div className="h-2 w-2 rounded-full bg-sage animate-pulse" />
                          </div>
                       </div>
                    </div>
                    <div className="absolute -right-10 -bottom-10 h-48 w-48 bg-sage/10 rounded-full blur-[60px]" />
                 </div>

                 {/* On-Set Notes Section */}
                 <div className="bg-white border border-[#E5E1D8] rounded-[40px] p-8 space-y-6 shadow-sm">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-2 text-charcoal">
                          <MessageSquare size={16} />
                          <span className="text-[10px] uppercase font-bold tracking-widest">Technical Annotations</span>
                       </div>
                       <button onClick={handleSaveNotes} className="p-2 hover:bg-ivory rounded-full text-sage" title="Save Notes"><Save size={16} /></button>
                    </div>
                    <textarea 
                       className="w-full h-32 bg-ivory rounded-2xl p-4 text-xs font-medium outline-none focus:border-charcoal border border-transparent transition-all resize-none"
                       placeholder="Enter lens details, talent feedback, or lighting shifts..."
                       value={currentNotes}
                       onChange={(e) => setCurrentNotes(e.target.value)}
                    />
                    <div className="flex items-center justify-between text-[8px] uppercase font-bold text-warmgray tracking-widest">
                       <span>Real-time persistence</span>
                       <span>Auto-Sync Active</span>
                    </div>
                 </div>

                 <div className="bg-white border border-[#E5E1D8] rounded-[40px] p-8 space-y-6 shadow-sm">
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] uppercase font-bold text-warmgray tracking-widest">Production Pulse</span>
                       <span className="text-[10px] font-bold text-sage uppercase">3 Nodes Active</span>
                    </div>
                    <div className="space-y-3">
                       {shoot.shotList.slice(0, 5).map(s => (
                         <div key={s.id} className="flex items-center justify-between p-3 bg-ivory rounded-xl border border-transparent hover:border-[#E5E1D8] transition-all">
                            <span className="text-[10px] font-bold text-charcoal">#{s.id}</span>
                            <div className={`h-1.5 w-1.5 rounded-full ${s.status === 'Approved' ? 'bg-sage' : s.status === 'Flagged' ? 'bg-rose-500' : 'bg-warmgray/30'}`} />
                         </div>
                       ))}
                       <button className="w-full py-4 border border-[#E5E1D8] rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-ivory transition-all">
                          Full Shoot Stats
                       </button>
                    </div>
                 </div>
              </div>
           </div>
         ) : (
           <div className="flex-1 flex flex-col items-center justify-center text-center p-20 space-y-8 bg-white border border-[#E5E1D8] border-dashed rounded-[48px] animate-in fade-in zoom-in-95">
              <div className="h-32 w-32 bg-ivory rounded-[48px] flex items-center justify-center text-warmgray shadow-inner border border-ivory">
                 <Camera size={48} className="animate-pulse-slow" />
              </div>
              <div className="max-w-xs space-y-3">
                 <h5 className="font-serif text-3xl">Select Production Shot</h5>
                 <p className="text-sm text-warmgray leading-relaxed">Pick a checklist item from the sidebar to initialize the Guardian hardware link and start the neural audit.</p>
              </div>
           </div>
         )}
      </main>
    </div>
  );
};

export default CrewExecution;