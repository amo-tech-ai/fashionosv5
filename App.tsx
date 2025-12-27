import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from './components/PublicLayout';
import Layout from './components/Layout'; // Note: Layout acts as AppLayout

// Public Pages
import LandingPage from './pages/marketing/LandingPage';
import PricingPage from './pages/marketing/PricingPage';
import DemoPage from './pages/marketing/DemoPage';
import SolutionsPage from './pages/marketing/SolutionsPage';
import AboutPage from './pages/marketing/AboutPage';
import BlogPage from './pages/marketing/BlogPage';
import SponsorCategoryPage from './pages/sponsors/SponsorCategoryPage';
import PlatformSitemap from './pages/marketing/PlatformSitemap';

// App Pages
import Dashboard from './pages/Dashboard';
import BrandIntake from './pages/BrandIntake';
import BrandAnalysis from './pages/BrandAnalysis';
import BrandProfile from './pages/BrandProfile';
import ContentCalendar from './pages/ContentCalendar';
import ContentEditor from './pages/ContentEditor';
import ShootRecommendation from './pages/ShootRecommendation';
import ShootWizard from './pages/ShootWizard';
import CrewExecution from './pages/CrewExecution';
import ProductionBrief from './pages/ProductionBrief';
import ChatPage from './pages/ChatPage';
import MediaPage from './pages/MediaPage';
import SettingsPage from './pages/SettingsPage';
import EventsPage from './pages/EventsPage';
import ShootsPage from './pages/ShootsPage';
import CampaignsPage from './pages/CampaignsPage';
import NotFound from './pages/NotFound';

// Contexts
import { ProjectProvider } from './contexts/ProjectContext';
import { IntelligenceProvider } from './contexts/IntelligenceContext';

const App: React.FC = () => {
  return (
    <ProjectProvider>
      <IntelligenceProvider>
        <HashRouter>
          <Routes>
            {/* Public/Marketing Domain */}
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
              <Route path="/blog/:slug" element={<BlogPage />} />
              <Route path="/careers" element={<AboutPage />} />
              <Route path="/integrations" element={<AboutPage />} />
              <Route path="/security" element={<AboutPage />} />
              <Route path="/explore" element={<PlatformSitemap />} />
              <Route path="/platform-overview" element={<PlatformSitemap />} />
            </Route>

            {/* Authenticated/App Domain */}
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/brand/intake" element={<BrandIntake />} />
              <Route path="/brand/:brandId/analysis" element={<BrandAnalysis />} />
              <Route path="/brand/:brandId/profile" element={<BrandProfile />} />
              <Route path="/brand/:brandId/calendar" element={<ContentCalendar />} />
              <Route path="/brand/:brandId/content/:postId" element={<ContentEditor />} />
              <Route path="/brand/:brandId/shoots/recommendation" element={<ShootRecommendation />} />
              <Route path="/brand/:brandId/shoots/wizard" element={<ShootWizard />} />
              <Route path="/shoots" element={<ShootsPage />} />
              <Route path="/shoots/brief/:shootId" element={<ProductionBrief />} />
              <Route path="/shoots/crew/:shootId" element={<CrewExecution />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/campaigns" element={<CampaignsPage />} />
              <Route path="/media" element={<MediaPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </HashRouter>
      </IntelligenceProvider>
    </ProjectProvider>
  );
};

export default App;