import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Sparkles, Zap, ShieldCheck, Camera, HelpCircle } from 'lucide-react';
import SEO from '../../components/SEO';

const PricingPage: React.FC = () => {
  const plans = [
    {
      name: 'The Maison',
      price: '€1,500',
      period: 'per month',
      desc: 'Architect your brand DNA and orchestrate high-fidelity social productions.',
      features: [
        '1 Brand DNA Profile',
        'Guardian Vision Audit (1,000 scans)',
        'Veo 3.1 Pre-Viz (720p)',
        'Omnichannel Calendar Sync',
        'Strategic Forecaster Feed',
        'Standard Concierge Access'
      ],
      cta: 'Initialize Maison',
      featured: false
    },
    {
      name: 'The Collective',
      price: '€4,800',
      period: 'per month',
      desc: 'For multi-label groups requiring cross-maison intelligence and global reach.',
      features: [
        'Up to 5 Brand DNA Profiles',
        'Unlimited Guardian Audits',
        'Veo 3.1 Fast (1080p)',
        'Deep Market Grounding (Pro)',
        'Custom Persona Architecture',
        'Priority Concierge Node'
      ],
      cta: 'Deploy Collective',
      featured: true
    },
    {
      name: 'The Heritage',
      price: 'Custom',
      period: 'enterprise pricing',
      desc: 'Bespoke neural integration for global luxury powerhouses.',
      features: [
        'Unlimited Brand Nodes',
        'Private Neural Link (Local RAG)',
        'Veo 4K Strategic Pre-Viz',
        'White-Glove Set Implementation',
        'Dedicated Strategist Agent',
        'SLA Guaranteed Uptime'
      ],
      cta: 'Contact Partner',
      featured: false
    }
  ];

  return (
    <div className="animate-in fade-in duration-1000 bg-ivory">
      <SEO 
        title="Investment & Tiers" 
        description="Choose the right intelligence tier for your Maison. FashionOS scales from single artisanal brands to global heritage collectives."
      />

      <section className="pt-32 pb-16 px-8 md:px-16 max-w-7xl mx-auto text-center space-y-8">
        <div className="flex justify-center items-center gap-3 animate-in slide-in-from-top-4">
          <Sparkles size={20} className="text-sage" />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-sage">Maison Access Protocol</span>
        </div>
        <h1 className="font-serif text-6xl md:text-8xl tracking-tighter leading-none">Strategic Value.</h1>
        <p className="text-warmgray text-lg max-w-2xl mx-auto leading-relaxed">
          FashionOS is a long-term strategic asset. We provide the neural infrastructure to protect your heritage while accelerating your digital momentum.
        </p>
      </section>

      <section className="pb-32 px-8 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div 
              key={plan.name} 
              className={`relative p-12 rounded-[48px] border transition-all duration-700 flex flex-col justify-between hover:shadow-2xl ${
                plan.featured 
                  ? 'bg-charcoal text-white border-charcoal lg:scale-105 z-10 shadow-xl' 
                  : 'bg-white text-charcoal border-[#E5E1D8]'
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {plan.featured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 bg-sage text-white rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg whitespace-nowrap">
                  Most Synchronized
                </div>
              )}
              
              <div className="space-y-8">
                <div>
                  <h3 className="font-serif text-3xl mb-4">{plan.name}</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-5xl font-serif">{plan.price}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${plan.featured ? 'text-white/40' : 'text-warmgray'}`}>
                      {plan.period}
                    </span>
                  </div>
                  <p className={`text-sm leading-relaxed ${plan.featured ? 'text-white/60' : 'text-warmgray'}`}>
                    {plan.desc}
                  </p>
                </div>

                <div className="space-y-4 pt-8 border-t border-current/10">
                  <p className="text-[10px] font-bold uppercase tracking-widest">Neural Features</p>
                  <ul className="space-y-4">
                    {plan.features.map(feat => (
                      <li key={feat} className="flex items-start gap-3 text-sm font-medium">
                        <Check size={18} className={plan.featured ? 'text-sage' : 'text-charcoal'} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link 
                to={plan.price === 'Custom' ? '/contact' : '/brand/intake'}
                className={`mt-12 w-full py-5 rounded-full text-xs font-bold uppercase tracking-widest text-center transition-all ${
                  plan.featured 
                    ? 'bg-white text-charcoal hover:bg-ivory shadow-lg' 
                    : 'bg-charcoal text-white hover:bg-black shadow-md'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Strategic Comparison Ramp */}
      <section className="bg-white border-y border-[#E5E1D8] py-32 px-8 md:px-16">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-4">
             <h2 className="font-serif text-4xl">Frequently Analyzed</h2>
             <p className="text-warmgray text-sm">Transparency in investment is a Maison core value.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            <div className="space-y-4 p-8 bg-ivory rounded-3xl border border-[#E5E1D8] shadow-sm">
              <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-sage shadow-sm border border-[#E5E1D8] mb-2">
                 <ShieldCheck size={20} />
              </div>
              <h4 className="font-serif text-xl">Can I migrate existing brand data?</h4>
              <p className="text-warmgray text-sm leading-relaxed">Yes. Our Neural Link supports seamless ingestion from Shopify, Instagram, and private heritage archives via PDF/CSV with full metadata preservation.</p>
            </div>
            <div className="space-y-4 p-8 bg-ivory rounded-3xl border border-[#E5E1D8] shadow-sm">
              <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-sage shadow-sm border border-[#E5E1D8] mb-2">
                 <Zap size={20} />
              </div>
              <h4 className="font-serif text-xl">Is my DNA secure?</h4>
              <p className="text-warmgray text-sm leading-relaxed">Absolutely. All brand DNA is encrypted at the node level. Your strategic "Thinking" cycles and localized RAG datasets are never shared or leaked into global models.</p>
            </div>
          </div>
          
          <div className="text-center pt-8">
             <Link to="/demo" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-charcoal hover:text-sage transition-colors group">
               Need a custom diagnostic? <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;