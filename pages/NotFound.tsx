import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search, Sparkles } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] p-8 md:p-12 text-center animate-in fade-in duration-1000">
      <div className="relative mb-12">
        <div className="h-40 w-40 bg-ivory rounded-[48px] flex items-center justify-center text-warmgray border border-[#E5E1D8] shadow-inner relative overflow-hidden">
           <span className="font-serif text-8xl opacity-10 absolute -bottom-4 -right-4">404</span>
           <Search size={64} className="animate-pulse" />
        </div>
        <div className="absolute -top-4 -right-4 h-12 w-12 bg-charcoal rounded-2xl flex items-center justify-center text-sage shadow-xl animate-bounce">
           <Sparkles size={24} />
        </div>
      </div>
      
      <div className="max-w-md space-y-6">
        <h2 className="font-serif text-5xl tracking-tighter">Lost in the Maison.</h2>
        <p className="text-warmgray text-lg leading-relaxed">
          The node you are looking for has been moved or archived. Let's return to the strategic command center.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-8">
           <button 
             onClick={() => navigate(-1)} 
             className="flex-1 px-8 py-4 bg-white border border-[#E5E1D8] rounded-full text-[11px] font-bold uppercase tracking-widest hover:border-charcoal transition-all flex items-center justify-center gap-2 shadow-sm"
           >
              <ArrowLeft size={16} /> Go Back
           </button>
           <button 
             onClick={() => navigate('/')} 
             className="flex-1 px-8 py-4 bg-charcoal text-white rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xl"
           >
              <Home size={16} /> Dashboard
           </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;