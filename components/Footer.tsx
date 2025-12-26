import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Twitter, Youtube, ArrowRight, ShieldCheck, Sparkles, Zap, Globe, MessageSquare } from 'lucide-react';
import { useProjects } from '../contexts/ProjectContext';

const Footer: React.FC = () => {
  const { brands, shoots } = useProjects();
  
  // Use presence of brands as auth proxy
  const isAuthenticated = brands.length > 0;
  const activeBrandId = brands[0]?.id || 'default';
  const latestShootId = shoots[0]?.id || '';

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com' },
    { icon: Linkedin, href: 'https://linkedin.com' },
    { icon: Twitter, href: 'https://twitter.com' },
    { icon: Youtube, href: 'https://youtube.com' },
  ];

  const sectorLinks = [
    { name: 'Beauty & Fragrance', path: '/sponsors/beauty' },
    { name: 'Automotive Design', path: '/sponsors/automotive' },
    { name: 'Fine Jewelry', path: '/sponsors/jewelry' },
    { name: 'Bespoke Travel', path: '/sponsors/travel' },
    { name: 'Private Finance', path: '/sponsors/finance' },
    { name: 'Neural Tech', path: '/sponsors/technology' },
  ];

  return (
    <footer className="bg-charcoal text-white border-t border-white/5 pt-24 pb-12 px-8 md:px-16 selection:bg-sage">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-12 pb-16">
        
        {/* SECTION 1 — Brand */}
        <div className="lg:col-span-1 space-y-6">
          <Link to="/" className="font-serif text-3xl font-bold tracking-tighter block">FashionOS.</Link>
          <p className="text-white/40 text-[13px] leading-relaxed max-w-xs font-medium italic">
            The Neural Maison Partner. Strategic AI for high-fidelity luxury fashion.
          </p>
          <div className="flex gap-4 pt-2">
            {socialLinks.map((social, i) => (
              <a 
                key={i} 
                href={social.href} 
                target="_blank" 
                rel="noreferrer" 
                className="text-white/20 hover:text-sage transition-all duration-300 transform hover:scale-110"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* SECTION 2 — Product */}
        <div className="space-y-8">
          <h5 className="text-[10px] uppercase font-bold tracking-[0.3em] text-sage">Platform</h5>
          <ul className="space-y-4 text-[13px] font-medium text-white/50">
            <li><Link to="/features" className="hover:text-white transition-colors">AI Agents</Link></li>
            <li><Link to="/solutions" className="hover:text-white transition-colors">Strategy Nodes</Link></li>
            <li><Link to="/pricing" className="hover:text-white transition-colors">Maison Tiers</Link></li>
            <li><Link to="/demo" className="hover:text-white transition-colors">Request Diagnostic</Link></li>
            {isAuthenticated && (
              <li className="pt-2 border-t border-white/5">
                <Link to="/dashboard" className="text-white hover:text-sage transition-colors flex items-center gap-2">
                  Launch Terminal <Sparkles size={10} className="text-sage" />
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* SECTION 3 — Sectors */}
        <div className="space-y-8">
          <h5 className="text-[10px] uppercase font-bold tracking-[0.3em] text-sage">Sectors</h5>
          <ul className="space-y-4 text-[13px] font-medium text-white/50">
            {sectorLinks.map(sector => (
              <li key={sector.name}>
                <Link to={sector.path} className="hover:text-white transition-colors">{sector.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* SECTION 4 — Workflows */}
        <div className="space-y-8">
          <h5 className="text-[10px] uppercase font-bold tracking-[0.3em] text-sage">Workflows</h5>
          {isAuthenticated ? (
            <ul className="space-y-4 text-[13px] font-medium text-white/50">
              <li><Link to={`/brand/${activeBrandId}/shoots/wizard`} className="hover:text-white transition-colors">Plan a Shoot</Link></li>
              <li><Link to="/shoots" className="hover:text-white transition-colors">Production HUD</Link></li>
              <li><Link to={latestShootId ? `/shoots/brief/${latestShootId}` : '/shoots'} className="hover:text-white transition-colors">Brief Editor</Link></li>
              <li><Link to="/chat" className="hover:text-white transition-colors">Open Concierge</Link></li>
            </ul>
          ) : (
            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-4">
              <p className="text-[10px] leading-relaxed text-white/30 uppercase tracking-[0.2em] font-bold">Maison Only</p>
              <p className="text-[11px] text-white/50 leading-relaxed">Initialize your brand to access high-fidelity production tools.</p>
              <Link to="/brand/intake" className="inline-flex items-center gap-2 text-[10px] font-bold text-sage hover:text-white transition-colors uppercase tracking-widest">
                Initialize <ArrowRight size={10} />
              </Link>
            </div>
          )}
        </div>

        {/* SECTION 5 — Resources */}
        <div className="space-y-8">
          <h5 className="text-[10px] uppercase font-bold tracking-[0.3em] text-sage">Intel</h5>
          <ul className="space-y-4 text-[13px] font-medium text-white/50">
            <li><Link to="/blog" className="hover:text-white transition-colors">Intelligence Feed</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">Case Studies</Link></li>
            <li><Link to="/security" className="hover:text-white transition-colors flex items-center gap-2">DNA Security <ShieldCheck size={12} /></Link></li>
            <li><Link to="/integrations" className="hover:text-white transition-colors">Integrations</Link></li>
          </ul>
        </div>

        {/* SECTION 6 — Company */}
        <div className="space-y-8">
          <h5 className="text-[10px] uppercase font-bold tracking-[0.3em] text-sage">Heritage</h5>
          <ul className="space-y-4 text-[13px] font-medium text-white/50">
            <li><Link to="/about" className="hover:text-white transition-colors">Our Vision</Link></li>
            <li><Link to="/careers" className="hover:text-white transition-colors">The Grid</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">Privacy Protocol</Link></li>
            <li><Link to="/demo" className="text-white font-bold hover:text-sage transition-colors underline underline-offset-4 decoration-white/20">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">
          © 2024 FashionOS Technology — Unit 01
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8">
           <div className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-sage animate-pulse" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
                <Zap size={10} className="text-sage" /> Neural Sync Active
              </span>
           </div>
           <span className="text-[9px] font-bold uppercase tracking-widest text-white/20 border border-white/10 px-3 py-1 rounded-full">
             ISO 27001 Certified
           </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;