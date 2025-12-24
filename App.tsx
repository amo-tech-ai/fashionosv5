
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import IntelligencePanel from './components/IntelligencePanel';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import BrandIntake from './pages/BrandIntake';
import BrandAnalysis from './pages/BrandAnalysis';
import BrandProfile from './pages/BrandProfile';
import ContentCalendar from './pages/ContentCalendar';
import ContentEditor from './pages/ContentEditor';
import ShootRecommendation from './pages/ShootRecommendation';
import ChatPage from './pages/ChatPage';
import MediaPage from './pages/MediaPage';
import SettingsPage from './pages/SettingsPage';
import { ProjectProvider } from './contexts/ProjectContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isIntelligenceOpen, setIsIntelligenceOpen] = useState(window.innerWidth > 1200);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(window.innerWidth < 1024);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarCollapsed(true);
      }
      if (window.innerWidth < 1200) {
        setIsIntelligenceOpen(false);
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
        {!isFullWidthView && <Header toggleIntelligence={() => setIsIntelligenceOpen(!isIntelligenceOpen)} />}
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </main>
      </div>

      {!isFullWidthView && (
        <div className={`fixed inset-y-0 right-0 z-50 transform transition-transform duration-500 lg:relative lg:translate-x-0 ${
          isIntelligenceOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <IntelligencePanel 
            isOpen={isIntelligenceOpen} 
            setIsOpen={setIsIntelligenceOpen} 
          />
        </div>
      )}
      
      {/* Mobile Backdrop */}
      {isIntelligenceOpen && window.innerWidth < 1024 && !isFullWidthView && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsIntelligenceOpen(false)}
        />
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ProjectProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/brand/intake" element={<BrandIntake />} />
            <Route path="/brand/:id/analysis" element={<BrandAnalysis />} />
            <Route path="/brand/:id/profile" element={<BrandProfile />} />
            <Route path="/brand/:id/calendar" element={<ContentCalendar />} />
            <Route path="/brand/:id/content/:postId" element={<ContentEditor />} />
            <Route path="/brand/:id/shoots/recommendation" element={<ShootRecommendation />} />
            <Route path="/media" element={<MediaPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </HashRouter>
    </ProjectProvider>
  );
};

export default App;
