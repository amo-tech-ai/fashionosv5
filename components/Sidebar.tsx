
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, Star, BarChart2, Calendar, Target, User, 
  Layers, MapPin, Grid, Bookmark, MessageSquare, Settings, Menu, Sparkles, Activity, Bell, Camera
} from 'lucide-react';
import { useProjects } from '../contexts/ProjectContext';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const { brands } = useProjects();
  const location = useLocation();
  const activeBrandId = brands[0]?.id || 'default';
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    const alerts: Record<string, string> = {
      profile: "Elena updated SS25 Moodboard",
      calendar: "Growth: Optimized 3 post times",
      recommendation: "New high-impact shoot concept ready",
      media: "4 assets awaiting DNA audit",
      campaigns: "Performance lift detected: +14%",
      events: "NYFW Logistics Handshake Secured"
    };

    const path = location.pathname;
    let relevantAlert = null;
    if (path.includes('profile')) relevantAlert = alerts.profile;
    else if (path.includes('calendar')) relevantAlert = alerts.calendar;
    else if (path.includes('recommendation')) relevantAlert = alerts.recommendation;
    else if (path.includes('media')) relevantAlert = alerts.media;
    else if (path.includes('campaigns')) relevantAlert = alerts.campaigns;
    else if (path.includes('events')) relevantAlert = alerts.events;

    if (relevantAlert && !notifications.includes(relevantAlert)) {
      setNotifications(prev => [relevantAlert, ...prev].slice(0, 3));
    }
  }, [location.pathname]);

  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'Analysis', icon: BarChart2, path: `/brand/${activeBrandId}/analysis` },
    { name: 'Profile', icon: User, path: `/brand/${activeBrandId}/profile` },
    { name: 'Calendar', icon: Calendar, path: `/brand/${activeBrandId}/calendar` },
    { name: 'Shoots', icon: Camera, path: '/shoots' },
    { name: 'Events', icon: MapPin, path: '/events' },
    { name: 'Campaigns', icon: Target, path: '/campaigns' },
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
              flex items-center gap-4 px-4 py-3.5 rounded-[20px] text-sm font-medium transition-all duration-300 group
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

      <div className="p-6 border-t border-[#E5E1D8] bg-ivory/30 space-y-6">
        {!isCollapsed && notifications.length > 0 && (
          <div className="space-y-3 animate-in slide-in-from-bottom-2">
             <div className="flex items-center justify-between">
                <p className="text-[9px] uppercase font-bold text-sage tracking-[0.2em] flex items-center gap-1.5">
                  <Bell size={10} className="animate-bounce" /> Neural Pulse
                </p>
                <button onClick={() => setNotifications([])} className="text-[8px] text-warmgray hover:text-charcoal uppercase font-bold">Clear</button>
             </div>
             {notifications.map((note, i) => (
               <div key={i} className="px-3 py-2 bg-white/60 border border-sage/10 rounded-xl text-[10px] text-charcoal font-medium truncate italic shadow-sm">
                  {note}
               </div>
             ))}
          </div>
        )}

        {!isCollapsed ? (
          <div className="p-5 bg-white rounded-3xl border border-[#E5E1D8] shadow-sm relative overflow-hidden group">
            <p className="text-[10px] uppercase tracking-widest text-warmgray font-bold mb-2">Neural Status</p>
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-charcoal flex items-center gap-2">
                <span className="h-2 w-2 bg-sage rounded-full animate-pulse" />
                Synchronized
              </p>
              <Activity size={12} className="text-sage" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="h-3 w-3 bg-sage rounded-full animate-pulse" />
            <div className="relative">
               <Bell size={20} className="text-warmgray" />
               {notifications.length > 0 && <div className="absolute -top-1 -right-1 h-2 w-2 bg-rose-500 rounded-full animate-ping" />}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
