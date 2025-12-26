import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search as SearchIcon, Command, X, Bell } from 'lucide-react';

interface HeaderProps {
  toggleIntelligence: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleIntelligence }) => {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const path = location.pathname.split('/')[1] || 'Dashboard';
  const title = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');

  return (
    <header className="h-20 md:h-24 px-6 md:px-12 bg-ivory/80 backdrop-blur-xl border-b border-[#E5E1D8] flex items-center justify-between sticky top-0 z-40 transition-all duration-500">
      <div className="animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="font-serif text-2xl md:text-3xl font-medium tracking-tight">{title}</h1>
        <p className="hidden md:block text-[10px] text-warmgray font-bold tracking-[0.3em] uppercase mt-1">FashionOS / System Unit 01</p>
      </div>
      
      <div className="flex items-center gap-4 md:gap-8">
        {/* Desktop Search Bar */}
        <button 
          onClick={() => setIsSearchOpen(true)}
          className="hidden md:flex items-center gap-3 px-6 py-2.5 bg-white border border-[#E5E1D8] rounded-full text-warmgray hover:border-charcoal transition-all group"
        >
          <SearchIcon size={16} className="group-hover:text-charcoal" />
          <span className="text-xs font-medium">Search Command</span>
          <span className="flex items-center gap-1 ml-4 px-2 py-0.5 bg-ivory border border-[#E5E1D8] rounded text-[9px] font-bold">
            <Command size={10} /> K
          </span>
        </button>

        {/* Mobile Search Icon */}
        <button 
          onClick={() => setIsSearchOpen(true)}
          className="md:hidden p-3 bg-white border border-[#E5E1D8] rounded-full text-warmgray"
        >
          <SearchIcon size={18} />
        </button>

        <div className="flex items-center gap-3 md:gap-4">
          <button 
            onClick={toggleIntelligence}
            className="px-4 md:px-6 py-2.5 bg-charcoal text-white text-[10px] uppercase tracking-[0.2em] font-bold rounded-full hover:bg-black transition-all shadow-lg shadow-black/10"
          >
            Intel
          </button>
          <div className="h-10 w-10 md:h-12 md:w-12 bg-white rounded-full p-1 border border-[#E5E1D8] cursor-pointer hover:scale-110 transition-transform">
             <img 
               src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" 
               alt="Profile" 
               className="w-full h-full object-cover rounded-full" 
             />
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 md:pt-32 bg-charcoal/40 backdrop-blur-sm animate-in fade-in duration-300 px-4">
          <div className="w-full max-w-2xl bg-white rounded-[32px] md:rounded-[40px] shadow-2xl border border-[#E5E1D8] overflow-hidden">
             <div className="p-6 md:p-8 flex items-center gap-4 md:gap-6 border-b border-[#E5E1D8]">
                <SearchIcon size={24} className="text-warmgray" />
                <input 
                  autoFocus
                  placeholder="Ask FashionOS anything..." 
                  className="flex-1 bg-transparent border-none focus:ring-0 text-lg md:text-xl font-serif outline-none"
                />
                <button onClick={() => setIsSearchOpen(false)} className="p-2 hover:bg-ivory rounded-full">
                   <X size={20} className="text-warmgray" />
                </button>
             </div>
             <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 bg-ivory/30 max-h-[60vh] overflow-y-auto">
                <div className="space-y-4">
                   <h3 className="text-[10px] uppercase font-bold tracking-widest text-warmgray">Suggested Contexts</h3>
                   {['Brand Strategy', 'Shoot Logistics', 'Casting Gallery'].map(c => (
                     <div key={c} className="p-4 bg-white border border-[#E5E1D8] rounded-2xl hover:border-sage transition-all cursor-pointer group">
                        <p className="text-sm font-medium group-hover:text-charcoal">{c}</p>
                     </div>
                   ))}
                </div>
                <div className="space-y-4">
                   <h3 className="text-[10px] uppercase font-bold tracking-widest text-warmgray">Recent Analysis</h3>
                   {['SS25 Momentum', 'Desert Noir Edit'].map(c => (
                     <div key={c} className="p-4 bg-white border border-[#E5E1D8] rounded-2xl hover:border-sage transition-all cursor-pointer group">
                        <p className="text-sm font-medium group-hover:text-charcoal">{c}</p>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;