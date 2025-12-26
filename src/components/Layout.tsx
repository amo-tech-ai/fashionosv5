
import React, { useState, useEffect } from 'react';
import { useLocation, NavLink, Outlet } from 'react-router-dom';
import { Home, Calendar, Camera, MessageSquare, User, Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import IntelligencePanel from './IntelligencePanel';
import Header from './Header';
import { useIntelligence } from '../contexts/IntelligenceContext';
import { useProjects } from '../contexts/ProjectContext';

// Added optional children type and Outlet for React Router compatibility
const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
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
    // Fix: replaced the non-existent removeResizeListener with the correct removeEventListener method
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

      <div className="flex flex-col flex-1 min-w-0 h-full relative overflow-hidden">
        {!isFullWidthView && (
          <Header 
            toggleIntelligence={() => {
              if (isOpen) closePanel();
              else openPanel('default');
            }} 
          />
        )}
        
        <main className="flex-1 overflow-y-auto custom-scrollbar pb-24 md:pb-0 bg-ivory">
          {children || <Outlet />}
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

      {/* Triptych Right: Intelligence Panel */}
      {!isFullWidthView && (
        <div className={`
          fixed lg:relative inset-y-0 right-0 z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${window.innerWidth < 1024 
            ? 'w-full md:w-80 h-[85vh] lg:h-full top-auto bottom-0 lg:top-0 lg:bottom-auto translate-y-full lg:translate-y-0 lg:translate-x-full rounded-t-[48px] lg:rounded-none shadow-2xl' 
            : 'w-80 h-full translate-x-full'}
          ${isOpen ? 'translate-y-0 translate-x-0' : (window.innerWidth < 1024 ? 'translate-y-full lg:translate-x-full' : 'translate-x-full')}
          ${isOpen ? 'block' : 'lg:hidden'}
        `}>
          <IntelligencePanel />
        </div>
      )}
      
      {/* Mobile Backdrop */}
      {isOpen && !isFullWidthView && window.innerWidth < 1024 && (
        <div 
          className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-40"
          onClick={closePanel}
        />
      )}
    </div>
  );
};

export default Layout;
