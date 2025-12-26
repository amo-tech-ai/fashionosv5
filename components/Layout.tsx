import React, { useState, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { Home, Calendar, Camera, MessageSquare, User, Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import IntelligencePanel from './IntelligencePanel';
import Header from './Header';
import { useIntelligence } from '../contexts/IntelligenceContext';
import { useProjects } from '../contexts/ProjectContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isOpen, closePanel, openPanel } = useIntelligence();
  const { brands } = useProjects();
  const activeBrandId = brands[0]?.id || 'default';
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(window.innerWidth < 1024);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarCollapsed(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isFullWidthView = location.pathname.includes('/brand/intake');

  const mobileNavItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Calendar', icon: Calendar, path: `/brand/${activeBrandId}/calendar` },
    { name: 'Shoots', icon: Camera, path: '/shoots' },
    { name: 'Chat', icon: MessageSquare, path: '/chat' },
    { name: 'Profile', icon: User, path: `/brand/${activeBrandId}/profile` },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-ivory font-sans relative">
      {/* Desktop/Tablet Sidebar */}
      {!isFullWidthView && (
        <div className="hidden md:block">
          <Sidebar 
            isCollapsed={isSidebarCollapsed} 
            setIsCollapsed={setIsSidebarCollapsed} 
          />
        </div>
      )}

      <div className={`flex flex-col flex-1 min-w-0 transition-all duration-300 relative`}>
        {!isFullWidthView && (
          <Header 
            toggleIntelligence={() => {
              if (isOpen) closePanel();
              else openPanel('default');
            }} 
          />
        )}
        
        <main className={`flex-1 overflow-y-auto custom-scrollbar pb-24 md:pb-0`}>
          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        {!isFullWidthView && (
          <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E1D8] px-6 flex items-center justify-between z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] pb-[env(safe-area-inset-bottom)] h-[calc(5rem+env(safe-area-inset-bottom))]">
            {mobileNavItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `
                  flex flex-col items-center justify-center gap-1 transition-all duration-300 flex-1 h-20
                  ${isActive ? 'text-charcoal' : 'text-warmgray'}
                `}
              >
                {/* Wrapped children in a function to fix 'isActive' scope error in NavLink */}
                {({ isActive }) => (
                  <>
                    <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                    <span className="text-[9px] font-bold uppercase tracking-widest">{item.name}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        )}
      </div>

      {/* Triptych Right: Intelligence Panel (Desktop Sidebar / Mobile Bottom Sheet) */}
      {!isFullWidthView && (
        <div className={`
          fixed lg:relative inset-y-0 right-0 z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${window.innerWidth < 768 
            ? 'w-full h-[85vh] top-auto bottom-0 translate-y-full rounded-t-[48px] shadow-[0_-20px_50px_rgba(0,0,0,0.1)]' 
            : 'w-80 h-full translate-x-full lg:translate-x-0'}
          ${isOpen ? (window.innerWidth < 768 ? 'translate-y-0' : 'translate-x-0') : (window.innerWidth < 768 ? 'translate-y-full' : 'translate-x-full lg:hidden')}
        `}>
          <IntelligencePanel />
        </div>
      )}
      
      {/* Mobile Backdrop */}
      {isOpen && !isFullWidthView && (
        <div 
          className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={closePanel}
        />
      )}
    </div>
  );
};

export default Layout;