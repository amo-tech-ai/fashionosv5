import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Globe, Sparkles, BookOpen, Search, Mail } from 'lucide-react';
import SEO from '../../components/SEO';

const BlogPage: React.FC = () => {
  const posts = [
    {
      title: "The Rise of Brutalist Silk: SS25 Trend Analysis",
      category: "Trend Intelligence",
      date: "Oct 12, 2024",
      excerpt: "How architectural silhouettes are reclaiming the luxury market from minimalist fluid drapery.",
      image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Neural Production: Cutting Pre-Viz Costs by 80%",
      category: "Case Study",
      date: "Oct 08, 2024",
      excerpt: "A deep dive into how L'Artisan Paris used Veo 3.1 to orchestrate their latest desert campaign.",
      image: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Data Sovereignty in the Age of AI Creative",
      category: "Platform",
      date: "Sep 28, 2024",
      excerpt: "Protecting Maison DNA through localized RAG and encrypted neural nodes.",
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="animate-in fade-in duration-1000 bg-ivory min-h-screen">
      <SEO 
        title="Strategic Intelligence" 
        description="Grounded trend reports and Maison case studies from the FashionOS intelligence grid."
      />

      <section className="pt-32 pb-16 px-8 md:px-16 max-w-7xl mx-auto space-y-8 text-center md:text-left">
        <div className="flex justify-center md:justify-start items-center gap-3 text-sage">
          <BookOpen size={20} />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em]">The Intelligence Feed</span>
        </div>
        <h1 className="font-serif text-6xl md:text-8xl tracking-tighter leading-none">Strategic Intel.</h1>
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between pt-4">
           <p className="text-warmgray text-lg max-w-md">The world's most sophisticated fashion-tech journal.</p>
           <div className="relative w-full max-w-sm">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-warmgray" size={16} />
              <input className="w-full bg-white border border-[#E5E1D8] rounded-full px-12 py-3.5 text-sm outline-none focus:border-charcoal transition-all shadow-sm" placeholder="Search reports..." />
           </div>
        </div>
      </section>

      <section className="pb-32 px-8 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map((post, i) => (
            <Link key={i} to={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`} className="group space-y-6">
              <div className="aspect-[16/10] bg-charcoal rounded-[32px] overflow-hidden relative shadow-sm transition-all group-hover:shadow-2xl">
                 <img src={post.image} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105" alt={post.title} />
                 <div className="absolute top-6 left-6 px-3 py-1 bg-white/10 backdrop-blur rounded-full text-[8px] font-bold uppercase text-white border border-white/20">
                    {post.category}
                 </div>
              </div>
              <div className="space-y-3 px-2">
                 <p className="text-[10px] font-bold text-warmgray uppercase tracking-widest">{post.date}</p>
                 <h3 className="font-serif text-3xl group-hover:text-sage transition-colors leading-tight">{post.title}</h3>
                 <p className="text-warmgray text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                 <div className="pt-2 flex items-center gap-2 text-[10px] font-bold uppercase text-charcoal group-hover:gap-4 transition-all">
                    Read Full Report <ArrowRight size={14} />
                 </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter / CTA Section to Footer */}
      <section className="bg-white border-t border-[#E5E1D8] py-32 px-8 md:px-16">
         <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="flex justify-center items-center gap-2 text-sage">
               <Mail size={24} />
               <h2 className="font-serif text-5xl">The Weekly Signal</h2>
            </div>
            <p className="text-warmgray max-w-md mx-auto text-lg">Receive grounded market signals and neural strategy direct to your terminal every Monday at 08:00 AM.</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
               <input className="flex-1 bg-ivory border border-[#E5E1D8] rounded-full px-8 py-5 outline-none focus:border-charcoal transition-all text-sm shadow-inner" placeholder="maison@heritage.com" required />
               <button className="px-10 py-5 bg-charcoal text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-lg whitespace-nowrap active:scale-95">
                  Subscribe Node
               </button>
            </form>
         </div>
      </section>
    </div>
  );
};

export default BlogPage;