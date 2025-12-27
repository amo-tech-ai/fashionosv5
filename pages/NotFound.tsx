import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ArrowLeft, Search, Sparkles, User, Globe } from 'lucide-react';
import { useIntelligence } from '../contexts/IntelligenceContext';
import SEO from '../components/SEO';

interface NotFoundProps {
  variant?: 'public' | 'app';
}

const NotFound: React.FC<NotFoundProps> = ({ variant = 'public' }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { closePanel } = useIntelligence();

  // Close intelligence panel on invalid app routes to prevent context mismatch
  useEffect(() => {
    if (variant === 'app') closePanel();
  }, [variant, closePanel]);

  // Context-aware detection for brand workspace
  const brandMatch = pathname.match(/\/brand\/([^\/]+)/);
  const currentBrandId = brandMatch ? brandMatch[1] : null;

  const isApp = variant === 'app';

  return (
    <div className={`flex flex-col items-center justify-center ${isApp ? 'min-h-[calc(100vh-12rem)]' : 'min-h-[80vh]'} p-8 md:p-12 text-center animate-in fade-in duration-1000`}>
      <SEO title="Node Not Found" description="The requested strategic node could not be synchronized." />
      
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
        <h2 className="font-serif text-5xl tracking-tighter">
          {currentBrandId ? "DNA Link Severed." : isApp ? "Lost in the Maison." : "Node Offline."}
        </h2>
        
        <p className="text-warmgray text-lg leading-relaxed">
          {currentBrandId 
            ? "This page does not exist in the current brand workspace. The DNA link may have shifted."
            : isApp 
              ? "The operational node you are looking for has been moved or archived."
              : "The marketing node you requested is currently unreachable or does not exist."
          }
        </p>
        
        <div className="flex flex-col gap-4 pt-8 w-full max-w-sm mx-auto">
           <div className={`grid grid-cols-1 ${isApp ? 'sm:grid-cols-2' : ''} gap-4 w-full`}>
              <button 
                onClick={() => navigate(isApp ? '/dashboard' : '/')} 
                className="px-6 py-4 bg-charcoal text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xl"
              >
                 {isApp ? <Home size={16} /> : <Globe size={16} />} 
                 {isApp ? "Dashboard" : "Back to Home"}
              </button>
              {isApp && (
                <button 
                  onClick={() => navigate(-1)} 
                  className="px-6 py-4 bg-white border border-[#E5E1D8] rounded-full text-[10px] font-bold uppercase tracking-widest hover:border-charcoal transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                   <ArrowLeft size={16} /> Back
                </button>
              )}
           </div>

           {isApp && currentBrandId && currentBrandId !== 'default' && (
              <button 
                onClick={() => navigate(`/brand/${currentBrandId}/profile`)}
                className="w-full px-8 py-4 bg-ivory border border-[#E5E1D8] rounded-full text-[10px] font-bold uppercase tracking-widest hover:border-charcoal transition-all flex items-center justify-center gap-2 text-charcoal"
              >
                 <User size={16} /> Return to Brand Profile
              </button>
           )}
        </div>
      </div>
    </div>
  );
};

export default NotFound;