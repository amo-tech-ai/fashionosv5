
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Command, Loader2, Target, Calendar, BarChart2, MessageCircle, BrainCircuit, Mic, MicOff, PhoneOff, Zap } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useProjects } from '../contexts/ProjectContext';
import { IntelligenceService } from '../services/intelligence';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const ChatPage: React.FC = () => {
  const { brands } = useProjects();
  const brand = brands[0];
  const intelService = IntelligenceService.getInstance();
  
  const [activeTab, setActiveTab] = useState('Brand');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: `Hello Julian. I have analyzed the SS25 trajectory for ${brand.name}. How can I assist with your strategy today?` }
  ]);
  const [loading, setLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);
  
  // Live API Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  // Audio Encoding/Decoding Helpers
  const decodeBase64 = (base64: string) => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = binaryString.charCodeAt(i);
    return bytes;
  };

  const decodeAudioData = async (data: Uint8Array, ctx: AudioContext) => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length;
    const buffer = ctx.createBuffer(1, frameCount, 24000);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < frameCount; i++) channelData[i] = dataInt16[i] / 32768.0;
    return buffer;
  };

  const startLiveSession = async () => {
    try {
      if (!audioContextRef.current) audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      setIsLive(true);

      const sessionPromise = intelService.connectLive({
        onopen: () => console.log('Live link open'),
        onmessage: async (message: any) => {
          const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
          if (audioData && audioContextRef.current) {
            const ctx = audioContextRef.current;
            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
            const buffer = await decodeAudioData(decodeBase64(audioData), ctx);
            const source = ctx.createBufferSource();
            source.buffer = buffer;
            source.connect(ctx.destination);
            source.start(nextStartTimeRef.current);
            nextStartTimeRef.current += buffer.duration;
            sourcesRef.current.add(source);
            source.onended = () => sourcesRef.current.delete(source);
          }
          if (message.serverContent?.interrupted) {
            sourcesRef.current.forEach(s => s.stop());
            sourcesRef.current.clear();
            nextStartTimeRef.current = 0;
          }
        },
        onerror: (e: any) => console.error(e),
        onclose: () => setIsLive(false)
      });

      sessionRef.current = await sessionPromise;
      setMessages(prev => [...prev, { role: 'assistant', content: "[VOICE MODE ACTIVE] Listening for strategy inputs..." }]);
    } catch (e) {
      console.error(e);
      setIsLive(false);
    }
  };

  const stopLiveSession = () => {
    if (sessionRef.current) sessionRef.current.close();
    setIsLive(false);
    setMessages(prev => [...prev, { role: 'assistant', content: "[VOICE MODE ENDED] Session summary synchronized." }]);
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const msg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: msg }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: msg,
        config: { thinkingConfig: { thinkingBudget: 4096 } }
      });
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "Synchronizing..." }]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full max-w-6xl mx-auto gap-8 p-8 md:p-12 overflow-hidden animate-in fade-in duration-700">
      <div className="flex-1 flex flex-col min-w-0 bg-white border border-[#E5E1D8] rounded-[48px] shadow-sm overflow-hidden">
        <header className="p-8 border-b border-[#E5E1D8] flex items-center justify-between bg-ivory/30">
           <div>
              <h2 className="font-serif text-3xl">AI Concierge</h2>
              <div className="flex items-center gap-2 mt-1">
                 <span className={`h-1.5 w-1.5 rounded-full ${isLive ? 'bg-rose-500 animate-ping' : 'bg-sage animate-pulse'}`} />
                 <span className="text-[10px] uppercase font-bold text-warmgray tracking-widest">
                   {isLive ? 'Live Voice Session' : 'Grounded Context: SS25'}
                 </span>
              </div>
           </div>
           <button 
             onClick={isLive ? stopLiveSession : startLiveSession}
             className={`flex items-center gap-2 px-6 py-2 rounded-full text-[10px] uppercase font-bold tracking-widest transition-all ${isLive ? 'bg-rose-500 text-white animate-pulse' : 'bg-ivory border border-[#E5E1D8] text-warmgray hover:border-charcoal'}`}
           >
             {isLive ? <PhoneOff size={14} /> : <Mic size={14} />}
             {isLive ? 'End Meeting' : 'Voice Link'}
           </button>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
           {messages.map((msg, i) => (
             <div key={i} className={`flex gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center flex-shrink-0 border ${msg.role === 'assistant' ? 'bg-charcoal text-white' : 'bg-[#E5E1D8] overflow-hidden'}`}>
                  {msg.role === 'assistant' ? <Sparkles size={20} /> : <img src="https://i.pravatar.cc/100?u=12" className="w-full h-full object-cover" />}
                </div>
                <div className={`rounded-3xl p-6 text-sm leading-relaxed max-w-[85%] ${msg.role === 'assistant' ? 'bg-ivory border border-[#E5E1D8] rounded-tl-none' : 'bg-charcoal text-white rounded-tr-none'}`}>
                   {msg.content}
                </div>
             </div>
           ))}
           {loading && (
             <div className="flex gap-6 animate-pulse">
                <div className="h-12 w-12 rounded-2xl bg-charcoal text-white flex items-center justify-center"><BrainCircuit size={20} /></div>
                <div className="bg-ivory border border-[#E5E1D8] rounded-3xl p-6 min-w-[200px] text-[10px] uppercase font-bold tracking-widest text-warmgray">
                   Synthesizing strategy...
                </div>
             </div>
           )}
        </div>

        <div className="p-8 border-t border-[#E5E1D8] bg-ivory/20">
           <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-4 bg-white border border-[#E5E1D8] rounded-[32px] p-2 pl-6 shadow-xl">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask for strategic guidance..."
                className="flex-1 bg-transparent border-none outline-none text-sm font-medium"
              />
              <button type="submit" disabled={loading} className="h-12 w-12 bg-charcoal text-white rounded-full flex items-center justify-center shadow-lg"><Send size={18} /></button>
           </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
