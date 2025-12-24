
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, Star, BarChart2, Calendar, Target, User, 
  Layers, MapPin, Grid, Bookmark, MessageSquare, Settings, Menu, Sparkles
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const collaborators = [
    { name: 'Elena', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=40&q=80', status: 'active' },
    { name: 'Marcus', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=40&q=80', status: 'idle' },
    { name: 'Sasha', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=40&q=80', status: 'active' },
  ];

  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'Intake', icon: Star, path: '/brand/intake' },
    { name: 'Analysis', icon: BarChart2, path: '/brand/default/analysis' },
    { name: 'Profile', icon: User, path: '/brand/default/profile' },
    { name: 'Calendar', icon: Calendar, path: '/brand/default/calendar' },
    { name: 'Recommendations', icon: Sparkles, path: '/brand/default/shoots/recommendation' },
    { name: 'Media', icon: Grid, path: '/media' },
    { name: 'Concierge', icon: MessageSquare, path: '/chat' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <aside className={`${isCollapsed ? 'w-24' : 'w-72'} h-full border-r border-[#E5E1D8] bg-white flex flex-col transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-50`}>
      <div className="h-24 flex items-center px-8 justify-between">
        {!isCollapsed && <span className="font-serif text-2xl font-bold tracking-tighter">FashionOS</span>}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="p-2 hover:bg-ivory rounded-xl transition-all hover:scale-110 active:scale-90"
        >
          <Menu size={20} className="text-warmgray" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-2 custom-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-4 px-4 py-3.5 rounded-[20px] text-sm font-medium transition-all duration-300
              ${isActive 
                ? 'bg-charcoal text-white shadow-xl shadow-charcoal/10 translate-x-1' 
                : 'text-warmgray hover:bg-ivory hover:text-charcoal hover:translate-x-1'}
            `}
          >
            {({ isActive }) => (
              <>
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 1.5} className="transition-transform duration-300 group-hover:scale-110" />
                {!isCollapsed && <span className="tracking-tight">{item.name}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-6 border-t border-[#E5E1D8] bg-ivory/30">
        {!isCollapsed ? (
          <div className="space-y-4">
             <div className="p-5 bg-white rounded-3xl border border-[#E5E1D8] shadow-sm relative overflow-hidden group">
                <p className="text-[10px] uppercase tracking-widest text-warmgray font-bold mb-2">Neural Link</p>
                <p className="text-xs font-bold text-charcoal flex items-center gap-2">
                  <span className="h-2 w-2 bg-sage rounded-full animate-pulse" />
                  Live Production
                </p>
                <div className="absolute -right-4 -bottom-4 h-12 w-12 bg-sage/10 rounded-full blur-xl group-hover:scale-150 transition-transform" />
             </div>
             
             <div className="px-2">
                <p className="text-[9px] uppercase font-bold text-warmgray tracking-widest mb-3">Presence</p>
                <div className="flex -space-x-2">
                   {collaborators.map((c, i) => (
                     <div key={i} className="relative group cursor-pointer">
                        <img 
                          src={c.img} 
                          alt={c.name} 
                          className={`h-8 w-8 rounded-full border-2 border-white object-cover ${c.status === 'idle' ? 'grayscale opacity-70' : ''}`}
                        />
                        <div className={`absolute bottom-0 right-0 h-2 w-2 rounded-full border border-white ${c.status === 'active' ? 'bg-sage' : 'bg-warmgray'}`} />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-charcoal text-white text-[8px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                           {c.name} • {c.status}
                        </div>
                     </div>
                   ))}
                   <div className="h-8 w-8 rounded-full border-2 border-dashed border-[#E5E1D8] bg-white flex items-center justify-center text-warmgray text-[10px] cursor-pointer hover:border-charcoal hover:text-charcoal transition-all">
                      +
                   </div>
                </div>
             </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="h-3 w-3 bg-sage rounded-full shadow-[0_0_15px_rgba(143,174,158,0.5)] animate-pulse" />
            <div className="h-8 w-8 rounded-full bg-ivory border border-[#E5E1D8] flex items-center justify-center text-warmgray text-[10px]">
              3
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
