import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Instagram, Linkedin, Twitter, Youtube, 
  ArrowRight, ShieldCheck, Sparkles, Zap, 
  Globe, MessageSquare, Target
} from 'lucide-react';
import { useProjects } from '../contexts/ProjectContext';

const Footer: React.FC = () => {
  const { brands } = useProjects();
  const isAuthenticated = brands.length > 0;

  const columns = [
    {
      title: "Platform",
      links: [
        { label: "Sitemap", path: "/platform-overview" },
        { label: "AI Agents", path: "/features" },
        { label: "Maison Tiers", path: "/pricing" },
        { label: "Request Demo", path: "/demo" },
      ]
    },
    {
      title: "Services",
      links: [
        { label: "Photography", path: "/services/photography" },
        { label: "Video Production", path: "/services/video" },
        { label: "Studio Hire", path: "/studio-hire" },
        { label: "Retouching Hub", path: "/retouching" },
      ]
    },
    {
      title: "Solutions",
      links: [
        { label: "Fashion Brands", path: "/solutions/fashion-shows" },
        { label: "Beauty Sector", path: "/sponsors/beauty" },
        { label: "Bespoke Travel", path: "/sponsors/travel" },
        { label: "Private Finance", path: "/sponsors/finance" },
      ]
    },
    {
      title: "Workspace",
      links: isAuthenticated ? [
        { label: "Dashboard", path: "/dashboard" },
        { label: "DNA Profile", path: `/brand/${brands[0].id}/profile` },
        { label: "Media Board", path: "/media" },
        { label: "AI Concierge", path: "/chat" },
      ] : [
        { label: "Initialize Brand", path: "/brand/intake" },
        { label: "Privacy Protocol", path: "/security" },
        { label: "System Status", path: "/platform-overview" },
        { label: "Help Center", path: "/blog" },
      ]
    }
  ];

  const socials = [
    { icon: Instagram, href: "#" },
    { icon: Linkedin, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Youtube, href: "#" },
  ];

  return (
    <footer className="bg-charcoal text-white/60 selection:bg-sage selection:text-white">
      <div className="max-w-7xl mx-auto px-8 md:px-12 py-24">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-20 pb-12 border-b border-white/5">
          <div className="space-y-4">
            <Link to="/" className="text-white font-serif text-4xl font-bold tracking-tighter block">FashionOS.</Link>
            <p className="text-sm font-medium italic opacity-80">
              The AI Operating System for the Modern Maison.
            </p>
          </div>
          <div className="flex gap-6">
            {socials.map((social, i) => (
              <a 
                key={i} 
                href={social.href} 
                className="text-white hover:text-sage transition-all duration-300 transform hover:scale-110"
              >
                <social.icon size={20} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {columns.map((col, i) => (
            <div key={i} className="space-y-8">
              <h5 className="text-[10px] uppercase font-bold tracking-widest text-white">{col.title}</h5>
              <ul className="space-y-4">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <Link 
                      to={link.path} 
                      className="text-sm hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 pt-12 border-t border-white/5">
          <p className="text-[10px] font-bold uppercase tracking-widest">© 2025 FashionOS System Unit 01</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {["Privacy", "Terms", "Security", "DNA Policy"].map((legal) => (
              <a key={legal} href="#" className="text-[10px] uppercase font-bold tracking-widest hover:text-white transition-colors">
                {legal}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
             <div className="h-1.5 w-1.5 rounded-full bg-sage animate-pulse" />
             <span className="text-[9px] font-bold uppercase tracking-widest text-white/40">
               Neural Pulse: Operational
             </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;