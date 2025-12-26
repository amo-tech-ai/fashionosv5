
import React from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import { ArrowRight, Sparkles, Instagram, Globe, MessageCircle } from 'lucide-react';
import Footer from './Footer';

const PublicHeader = () => (
  <nav className="h-24 px-8 md:px-16 flex items-center justify-between border-b border-[#E5E1D8] bg-white/80 backdrop-blur-xl sticky top-0 z-50">
    <div className="flex items-center gap-12">
      <Link to="/" className="font-serif text-3xl font-bold tracking-tighter">FashionOS</Link>
      <div className="hidden lg:flex items-center gap-8">
        <NavLink to="/features" className={({isActive}) => `text-[10px] uppercase font-bold tracking-widest ${isActive ? 'text-charcoal' : 'text-warmgray hover:text-charcoal'}`}>Features</NavLink>
        <NavLink to="/solutions" className={({isActive}) => `text-[10px] uppercase font-bold tracking-widest ${isActive ? 'text-charcoal' : 'text-warmgray hover:text-charcoal'}`}>Solutions</NavLink>
        <NavLink to="/pricing" className={({isActive}) => `text-[10px] uppercase font-bold tracking-widest ${isActive ? 'text-charcoal' : 'text-warmgray hover:text-charcoal'}`}>Pricing</NavLink>
        <NavLink to="/sponsors" className={({isActive}) => `text-[10px] uppercase font-bold tracking-widest ${isActive ? 'text-charcoal' : 'text-warmgray hover:text-charcoal'}`}>Sponsors</NavLink>
      </div>
    </div>
    <div className="flex items-center gap-6">
      <Link to="/demo" className="hidden sm:block text-[10px] uppercase font-bold tracking-widest text-warmgray hover:text-charcoal transition-colors">Book Demo</Link>
      <Link to="/dashboard" className="px-8 py-3.5 bg-charcoal text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl">Enter App</Link>
    </div>
  </nav>
);

const PublicLayout: React.FC = () => {
  return (
    <div className="h-screen w-full overflow-y-auto bg-ivory flex flex-col font-sans selection:bg-sage selection:text-white custom-scrollbar">
      <PublicHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
