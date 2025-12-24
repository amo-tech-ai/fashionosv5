
import React, { useState, useRef, useEffect } from 'react';
// Added missing MessageCircle icon to the lucide-react imports
import { Send, Sparkles, Command, Loader2, Target, Calendar, BarChart2, MessageCircle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const ChatPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Production');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Hello Julian. I have analyzed the SS25 trajectory for L’Artisan Paris. How can I assist with your strategy today?' }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { name: 'Brand', icon: Target },
    { name: 'Calendar', icon: Calendar },
    { name: 'Performance', icon: BarChart2 },
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `You are the FashionOS Intelligence Concierge. You are helping a high-end fashion producer manage 'L’Artisan Paris', a luxury artisanal brand.
          Your tone is sophisticated, precise, and visionary. You have deep knowledge of SS2025 luxury trends, supply chain transparency, and multi-channel content strategy.
          Format your responses with clear bullet points where appropriate and keep the editorial voice of FashionOS.`
        }
      });

      const assistantText = response.text || "I apologize, my analysis link is currently refreshing. Please restate your inquiry.";
      setMessages(prev => [...prev, { role: 'assistant', content: assistantText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "The intelligence core is momentarily busy. Please try again shortly." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full max-w-6xl mx-auto gap-8 p-8 md:p-12 overflow-hidden">
      {/* Main Chat Thread */}
      <div className="flex-1 flex flex-col min-w-0 bg-white border border-[#E5E1D8] rounded-[48px] shadow-sm overflow-hidden">
        <header className="p-8 border-b border-[#E5E1D8] flex items-center justify-between bg-ivory/30">
           <div>
              <h2 className="font-serif text-3xl">AI Concierge</h2>
              <div className="flex items-center gap-2 mt-1">
                 <span className="h-1.5 w-1.5 bg-sage rounded-full animate-pulse" />
                 <span className="text-[10px] uppercase font-bold text-warmgray tracking-widest">Brand Context Active: L’Artisan</span>
              </div>
           </div>
           <div className="flex bg-[#E5E1D8]/30 p-1 rounded-full border border-[#E5E1D8]">
             {['Production', 'Shoots', 'Casting'].map(t => (
               <button 
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-4 py-1.5 text-[10px] uppercase font-bold tracking-widest rounded-full transition-all ${activeTab === t ? 'bg-white shadow-sm text-charcoal' : 'text-warmgray'}`}
               >
                 {t}
               </button>
             ))}
           </div>
        </header>

        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar"
        >
           {messages.map((msg, i) => (
             <div key={i} className={`flex gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center flex-shrink-0 border ${msg.role === 'assistant' ? 'bg-charcoal text-white' : 'bg-[#E5E1D8] overflow-hidden'}`}>
                  {msg.role === 'assistant' ? <Sparkles size={20} /> : <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" className="w-full h-full object-cover" />}
                </div>
                <div className={`rounded-3xl p-6 text-sm leading-relaxed max-w-[85%] ${msg.role === 'assistant' ? 'bg-ivory border border-[#E5E1D8] rounded-tl-none shadow-sm' : 'bg-charcoal text-white rounded-tr-none'}`}>
                   {msg.content}
                </div>
             </div>
           ))}
           {loading && (
             <div className="flex gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="h-12 w-12 rounded-2xl bg-charcoal text-white flex items-center justify-center animate-pulse">
                  <Sparkles size={20} />
                </div>
                <div className="bg-ivory border border-[#E5E1D8] rounded-3xl rounded-tl-none p-6 flex items-center gap-3 text-warmgray">
                   <Loader2 size={16} className="animate-spin" />
                   <span className="text-[10px] uppercase font-bold tracking-widest">Synthesizing strategy...</span>
                </div>
             </div>
           )}
        </div>

        <div className="p-8 border-t border-[#E5E1D8] bg-ivory/20">
           <form 
             onSubmit={(e) => { e.preventDefault(); handleSend(); }}
             className="flex items-center gap-4 bg-white border border-[#E5E1D8] rounded-[32px] p-2 pl-6 shadow-xl"
           >
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Brief the concierge on your next move..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm outline-none font-medium"
              />
              <div className="flex items-center gap-2">
                 <span className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-ivory border border-[#E5E1D8] rounded-full text-[9px] font-bold text-warmgray uppercase tracking-widest">
                    <Command size={10} /> ENTER
                 </span>
                 <button 
                   type="submit"
                   disabled={loading}
                   className="h-12 w-12 bg-charcoal text-white rounded-full hover:bg-black transition-all disabled:opacity-50 flex items-center justify-center shadow-lg group"
                 >
                    <Send size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                 </button>
              </div>
           </form>
           <p className="text-center mt-4 text-[9px] text-warmgray uppercase tracking-[0.3em] font-bold">Encrypted Intelligence Session</p>
        </div>
      </div>

      {/* Suggested Actions Panel */}
      <div className="hidden lg:flex w-80 flex-col gap-6">
         <div className="glass rounded-[40px] p-8 border border-[#E5E1D8]">
            <h3 className="text-[11px] uppercase tracking-widest font-bold mb-6">Suggested Actions</h3>
            <div className="space-y-4">
               {[
                 { label: 'Create SS25 Shoot', icon: Sparkles },
                 { label: 'Generate TikTok Posts', icon: MessageCircle },
                 { label: 'Optimize Calendar', icon: Calendar }
               ].map((item, i) => (
                 <button key={i} className="w-full p-4 bg-white border border-[#E5E1D8] rounded-2xl text-[10px] uppercase font-bold tracking-widest hover:border-sage transition-all text-left flex items-center gap-3 group">
                    <item.icon size={14} className="text-sage" />
                    {item.label}
                 </button>
               ))}
            </div>
         </div>

         <div className="flex-1 glass rounded-[40px] p-8 border border-[#E5E1D8]">
            <h3 className="text-[11px] uppercase tracking-widest font-bold mb-6">Context View</h3>
            <div className="space-y-6">
               {tabs.map(tab => (
                 <div key={tab.name} className="flex items-center gap-4 group cursor-pointer">
                    <div className="h-10 w-10 bg-ivory rounded-xl flex items-center justify-center group-hover:bg-charcoal group-hover:text-white transition-all">
                       <tab.icon size={18} />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-warmgray group-hover:text-charcoal transition-all">{tab.name}</span>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default ChatPage;
