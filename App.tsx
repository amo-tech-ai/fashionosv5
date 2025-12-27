import React from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Layouts
import PublicLayout from './components/PublicLayout';
import Layout from './components/Layout';

// Public Marketing Pages
import LandingPage from './pages/marketing/LandingPage';
import PricingPage from './pages/marketing/PricingPage';
import DemoPage from './pages/marketing/DemoPage';
import SolutionsPage from './pages/marketing/SolutionsPage';
import AboutPage from './pages/marketing/AboutPage';
import BlogPage from './pages/marketing/BlogPage';
import PlatformSitemap from './pages/marketing/PlatformSitemap';
import SponsorCategoryPage from './pages/sponsors/SponsorCategoryPage';

// Marketplace & Studio Hire
import ServiceMarketplace from './pages/services/ServiceMarketplace';
import ServiceDetail from './pages/services/ServiceDetail';
import StudioHireLanding from './pages/studio/StudioHireLanding';

// App Pages: Global
import Dashboard from './pages/app/global/Dashboard';
import ChatPage from './pages/app/global/ChatPage';
import MediaPage from './pages/app/global/MediaPage';
import SettingsPage from './pages/app/global/SettingsPage';
import EventsPage from './pages/app/global/EventsPage';

// App Pages: Brand Identity
import BrandIntake from './pages/app/brand/BrandIntake';
import BrandAnalysis from './pages/app/brand/BrandAnalysis';
import BrandProfile from './pages/app/brand/BrandProfile';
import ContentCalendar from './pages/app/brand/ContentCalendar';
import ContentEditor from './pages/app/brand/ContentEditor';
import ChannelHub from './pages/app/brand/ChannelHub';

// App Pages: Production & Shoots
import ShootsPage from './pages/app/production/ShootsPage';
import ProductionBrief from './pages/app/production/ProductionBrief';
import CrewExecution from './pages/app/production/CrewExecution';
import ShootRecommendation from './pages/app/production/ShootRecommendation';
import ShootWizard from './pages/app/production/ShootWizard';

import NotFound from './pages/NotFound';

// Contexts
import { ProjectProvider, useProjects } from './contexts/ProjectContext';
import { IntelligenceProvider } from './contexts/IntelligenceContext';

/**
 * Gated component that redirects to Landing if no brand identity exists.
 */
const ProtectedApp: React.FC = () => {
  const { brands } = useProjects();
  const isAuthenticated = brands.length > 0;
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <Outlet />;
};

const App: React.FC = () => {
  return (
    <ProjectProvider>
      <IntelligenceProvider>
        <HashRouter>
          <Routes>
            {/* PUBLIC DOMAIN — Marketing Nodes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/features" element={<LandingPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/solutions" element={<SolutionsPage />} />
              <Route path="/solutions/:vertical" element={<SolutionsPage />} />
              <Route path="/sponsors" element={<SponsorCategoryPage />} />
              <Route path="/sponsors/:category" element={<SponsorCategoryPage />} />
              <Route path="/demo" element={<DemoPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/platform-overview" element={<PlatformSitemap />} />
              <Route path="/services" element={<ServiceMarketplace />} />
              <Route path="/services/:type" element={<ServiceMarketplace />} />
              <Route path="/services/:type/:packageId" element={<ServiceDetail />} />
              <Route path="/studio-hire" element={<StudioHireLanding />} />
              <Route path="*" element={<NotFound variant="public" />} />
            </Route>

            {/* APP DOMAIN — Gated Workspace */}
            <Route element={<ProtectedApp />}>
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                
                {/* Brand Scoped Routes */}
                <Route path="/brand/intake" element={<BrandIntake />} />
                <Route path="/brand/:brandId/analysis" element={<BrandAnalysis />} />
                <Route path="/brand/:brandId/profile" element={<BrandProfile />} />
                <Route path="/brand/:brandId/calendar" element={<ContentCalendar />} />
                <Route path="/brand/:brandId/content/:postId" element={<ContentEditor />} />
                <Route path="/brand/:brandId/shoots/recommendation" element={<ShootRecommendation />} />
                <Route path="/brand/:brandId/shoots/wizard" element={<ShootWizard />} />
                <Route path="/brand/:brandId/channels" element={<ChannelHub />} />
                
                {/* Production Scoped Routes */}
                <Route path="/shoots" element={<ShootsPage />} />
                <Route path="/shoots/brief/:shootId" element={<ProductionBrief />} />
                <Route path="/shoots/crew/:shootId" element={<CrewExecution />} />
                
                <Route path="/events" element={<EventsPage />} />
                <Route path="/media" element={<MediaPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                
                {/* App Internal Catch-All */}
                <Route path="*" element={<NotFound variant="app" />} />
              </Route>
            </Route>
          </Routes>
        </HashRouter>
      </IntelligenceProvider>
    </ProjectProvider>
  );
};

export default App;