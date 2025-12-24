
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import IntelligencePanel from './IntelligencePanel';
import Header from './Header';
import { useIntelligence } from '../contexts/IntelligenceContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isOpen, closePanel, openPanel } = useIntelligence();
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

  return (
    <div className="flex h-screen w-full overflow-hidden bg-ivory font-sans relative">
      {!isFullWidthView && (
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          setIsCollapsed={setIsSidebarCollapsed} 
        />
      )}

      <div className={`flex flex-col flex-1 min-w-0 transition-all duration-300`}>
        {!isFullWidthView && (
          <Header 
            toggleIntelligence={() => {
              if (isOpen) closePanel();
              else openPanel('default');
            }} 
          />
        )}
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </main>
      </div>

      {!isFullWidthView && (
        <div className={`fixed inset-y-0 right-0 z-50 transform transition-transform duration-500 lg:relative lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <IntelligencePanel />
        </div>
      )}
      
      {/* Mobile Backdrop */}
      {isOpen && window.innerWidth < 1024 && !isFullWidthView && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={closePanel}
        />
      )}
    </div>
  );
};

export default Layout;
