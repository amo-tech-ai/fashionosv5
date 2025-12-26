
import React, { useState, useEffect } from 'react';
import { useLocation, NavLink, Outlet } from 'react-router-dom';
import { Home, Calendar, Camera, MessageSquare, User, Menu, X } from 'lucide-react';
import Sidebar from './Sidebar';
import IntelligencePanel from './IntelligencePanel';
import Header from './Header';
import Footer from './Footer';
import { useIntelligence } from '../contexts/IntelligenceContext';
import { useProjects } from '../contexts/ProjectContext';

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { isOpen, closePanel, openPanel } = useIntelligence();
  const { brands } = useProjects();
  const activeBrandId = brands[0]?.id || 'default';
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(window.innerWidth < 1280);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarCollapsed(window.innerWidth < 1280);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1024) closePanel();
  }, [location.pathname]);

  const isFullWidthView = location.pathname.includes('/brand/intake');

  const mobileNavItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Calendar', icon: Calendar, path: `/brand/${activeBrandId}/calendar` },
    { name: 'Shoots', icon: Camera, path: '/shoots' },
    { name: 'Chat', icon: MessageSquare, path: '/chat' },
    { name: 'Profile', icon: User, path: `/brand/${activeBrandId}/profile` },
  ];

  if (isFullWidthView) {
    return <div className="h-screen w-full overflow-y-auto bg-ivory">{children || <Outlet />}</div>;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-ivory font-sans relative">
      {/* Panel 1: Navigation (Left) */}
      <div className={`hidden lg:block h-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isSidebarCollapsed ? 'w-24' : 'w-72'} flex-shrink-0`}>
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          setIsCollapsed={setIsSidebarCollapsed} 
        />
      </div>

      {/* Panel 2: Human Canvas (Center) */}
      <div className="flex flex-col flex-1 min-w-0 h-full relative">
        <Header 
          toggleIntelligence={() => {
            if (isOpen) closePanel();
            else openPanel('default');
          }} 
        />
        
        <main className="flex-1 overflow-y-auto custom-scrollbar bg-ivory">
          <div className="min-h-full flex flex-col">
            <div className="flex-1 pb-24 md:pb-12">
              {children || <Outlet />}
            </div>
            {/* Unified System Footer */}
            <Footer />
          </div>
        </main>

        {/* Mobile Navigation (Bottom) */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-[#E5E1D8] px-4 flex items-center justify-around z-[40] h-20 shadow-2xl">
          {mobileNavItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `
                flex flex-col items-center justify-center gap-1 transition-all duration-300 flex-1
                ${isActive ? 'text-charcoal' : 'text-warmgray'}
              `}
            >
              {({ isActive }) => (
                <>
                  <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-[8px] font-bold uppercase tracking-widest">{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Panel 3: Intelligence (Right/Drawer) */}
      <aside className={`
        fixed lg:relative inset-y-0 right-0 z-50 bg-white lg:bg-transparent transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${window.innerWidth < 1024 
          ? `w-full md:w-[400px] shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}` 
          : `${isOpen ? 'w-80 border-l border-[#E5E1D8] flex-shrink-0' : 'w-0 invisible'}`}
      `}>
        <IntelligencePanel />
      </aside>

      {/* Overlay Backdrop (Mobile only) */}
      {isOpen && window.innerWidth < 1024 && (
        <div 
          className="fixed inset-0 bg-charcoal/20 backdrop-blur-sm z-[45] lg:hidden"
          onClick={closePanel}
        />
      )}
    </div>
  );
};

export default Layout;
