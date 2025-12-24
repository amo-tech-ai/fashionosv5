
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
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
import EventsPage from './pages/EventsPage';
import ShootsPage from './pages/ShootsPage';
import CampaignsPage from './pages/CampaignsPage';
import { ProjectProvider } from './contexts/ProjectContext';
import { IntelligenceProvider } from './contexts/IntelligenceContext';

const App: React.FC = () => {
  return (
    <ProjectProvider>
      <IntelligenceProvider>
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
              <Route path="/events" element={<EventsPage />} />
              <Route path="/shoots" element={<ShootsPage />} />
              <Route path="/campaigns" element={<CampaignsPage />} />
              <Route path="/media" element={<MediaPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Layout>
        </HashRouter>
      </IntelligenceProvider>
    </ProjectProvider>
  );
};

export default App;
