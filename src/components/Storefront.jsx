import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthModal from './AuthModal';
import SpaceBackground from './SpaceBackground';
import { usePageMeta } from '../utils/usePageMeta';
import Footer from './Footer';

// IMPORTANT: Ensure this path matches your global Tailwind CSS file!
// If your css is in the src folder, it might be import '../index.css' or import './index.css'
// import '../index.css'; 

// ==========================================
// 1. DATA STORE 
// ==========================================
const templates = [
  { id: "36a7cc71-0c17-4530-a653-e59a8dbda7a3", categoryName: "Essential Trackers", title: "E-Commerce Reseller Profit & COGS Tracker", desc: "Track inventory cost, shipping, platform fees, and final profit margins.", price: 19.99, status: "READY" },
  { id: "526dcf30-0990-458e-bba7-b9f1c7e99078", categoryName: "Essential Trackers", title: "Optivoic Executive Tax Engine", desc: "Business-in-a-Box spreadsheet for 1099 pros. Track income, calculate quarterly taxes, and map deductions automatically.", price: 19.99, status: "READY", route: "/tax-engine" },
  { id: 2, categoryName: "Essential Trackers", title: "Options Trading & Premium Journal", desc: "Log strike prices, premiums, expiration dates, and win/loss ratios.", price: 14.99, status: "COMING SOON" },
  { id: 3, categoryName: "Essential Trackers", title: "The 'Story Bible' for Fiction", desc: "Centralized Notion workspace for writers to track character arcs and world-building.", price: 19.99, status: "COMING SOON" },
  { id: 4, categoryName: "Essential Trackers", title: "Collectibles Portfolio Valuation Tracker", desc: "Track acquisition costs and market values for high-end collectibles.", price: 14.99, status: "COMING SOON" },
  { id: 5, categoryName: "Essential Trackers", title: "Digital Nomad Route Planner", desc: "Notion/Sheets budgeter for campground reservations and connectivity ratings.", price: 24.99, status: "COMING SOON" },
  { id: 6, categoryName: "Professional Hubs", title: "AI Prompt Testing Sandbox", desc: "Workspace for prompt engineers to track versions and rate efficiency.", price: 29.99, status: "COMING SOON" },
  { id: 7, categoryName: "Professional Hubs", title: "Freelance Tax Allocator", desc: "Input multiple income streams and auto-calculate estimated quarterly taxes.", price: 24.99, status: "READY", route: "/tax-engine" },
  { id: 8, categoryName: "Professional Hubs", title: "CS Degree Organizer", desc: "Notion hub featuring syllabus mapping, code snippet storage, and GPA calculation.", price: 29.99, status: "COMING SOON" },
  { id: 9, categoryName: "Professional Hubs", title: "Agile Sprint Planning Hub", desc: "Template including a product backlog, active sprint board, and retrospectives.", price: 34.99, status: "COMING SOON" },
  { id: 10, categoryName: "Professional Hubs", title: "30-60-90 Day Onboarding Portal", desc: "Notion HR template with department intros, access checklists, and milestones.", price: 34.99, status: "COMING SOON" },
  { id: 11, categoryName: "Enterprise B2B", title: "Software RFP Vendor Matrix", desc: "Complex, weighted Excel matrix for evaluating software vendors.", price: 49.99, status: "COMING SOON" },
  { id: 12, categoryName: "Enterprise B2B", title: "Product Launch Roadmap", desc: "Framework to align stakeholders, map dependencies, and track GTM strategies.", price: 54.99, status: "COMING SOON" },
  { id: 13, categoryName: "Enterprise B2B", title: "IT Change Management Playbook", desc: "Step-by-step framework for rolling out enterprise software and training.", price: 59.99, status: "COMING SOON" }
];

// ==========================================
// 2. MODULAR COMPONENTS
// ==========================================

const AmbientBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#020202]">
    <SpaceBackground /> 
    <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay z-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
    <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-violet-600/20 blur-[120px] rounded-full mix-blend-screen animate-pulse duration-10000 z-0"></div>
    <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-cyan-600/10 blur-[150px] rounded-full mix-blend-screen z-0"></div>
  </div>
);

const Navbar = ({ onOpenAuth }) => (
  <nav className="fixed w-full border-b border-white/10 py-4 px-8 flex justify-between items-center bg-black/30 backdrop-blur-2xl z-50 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
    <div className="text-2xl font-black text-white tracking-tighter drop-shadow-lg">
      OPTI<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">VÖIC</span>
    </div>
    <div className="hidden md:flex space-x-8 font-medium text-sm text-gray-300">
      <a href="#marketplace" className="hover:text-white transition-all">Marketplace</a>
      <Link to="/consulting" className="hover:text-white transition-all">Consulting</Link>
    </div>
    <button 
      onClick={onOpenAuth} 
      className="bg-white/10 border border-white/20 hover:bg-white/20 text-white text-sm font-semibold px-6 py-2 rounded-full transition-all duration-300 backdrop-blur-md"
    >
      Client Login
    </button>
  </nav>
);

const Hero = () => (
  <section className="relative pt-48 pb-32 px-8 flex flex-col items-center text-center z-10 border-b border-white/5">
    <div className="inline-flex items-center mb-8 px-5 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl">
      <span className="text-xs font-bold tracking-widest uppercase text-gray-300 flex items-center">
        <span className="w-2.5 h-2.5 inline-block rounded-full bg-cyan-400 mr-3 animate-pulse"></span>
        Accepting New Clients
      </span>
    </div>

    <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[1.1] max-w-5xl">
      Elite Technology Consulting & <br/>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500">Operational Frameworks</span>
    </h1>
    
    <p className="text-xl md:text-2xl text-gray-400 mb-14 max-w-3xl font-light leading-relaxed">
      Optivoic delivers high-velocity business automation, AI prompt engineering, and scalable e-commerce strategies for modern digital enterprises.
    </p>
    
    <div className="flex flex-col sm:flex-row gap-6">
      <a href="#marketplace" className="bg-white text-black font-bold text-lg py-4 px-10 rounded-full hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all">
        Browse Frameworks
      </a>
      <Link to="/consulting" className="bg-white/[0.05] border border-white/20 backdrop-blur-xl text-white font-bold text-lg py-4 px-10 rounded-full hover:bg-white/10 transition-all">
        Hire the Agency
      </Link>
    </div>
  </section>
);

const BentoServices = () => (
  <section className="py-32 px-8 max-w-7xl mx-auto z-10 relative">
    <div className="mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">Agency Capabilities</h2>
      <p className="text-xl text-gray-400">Targeted expertise to remove operational bottlenecks.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
      <div className="md:col-span-2 bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-3xl p-10 hover:bg-white/[0.04] hover:border-violet-500/50 hover:shadow-[0_0_50px_-10px_rgba(139,92,246,0.3)] hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/20 blur-[80px] group-hover:bg-violet-500/30 transition-all duration-500"></div>
        <h3 className="text-3xl font-bold text-white mb-4 relative z-10 drop-shadow-md">AI Evaluation & Prompt Engineering</h3>
        <p className="text-gray-300 text-lg leading-relaxed max-w-lg relative z-10">
          Rigorous human evaluation for companies training AI models. We test prompts, grade responses, and provide actionable feedback to refine your systems.
        </p>
      </div>

      <div className="bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-3xl p-10 hover:bg-white/[0.04] hover:border-cyan-500/50 transition-all duration-500">
        <h3 className="text-xl font-bold text-white mb-3 drop-shadow-md">Custom Python Automation</h3>
        <p className="text-gray-300 leading-relaxed">
          Single-purpose scripts designed to automate tedious workflows, data processing, and repetitive operational loops.
        </p>
      </div>

      <div className="bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-3xl p-10 hover:bg-white/[0.04] hover:border-cyan-500/50 transition-all duration-500">
        <h3 className="text-xl font-bold text-white mb-3 drop-shadow-md">Web & Database Fixes</h3>
        <p className="text-gray-300 leading-relaxed">
          Isolated bug fixes and architecture assistance for Next.js and React. Rapid backend database configuration via Supabase.
        </p>
      </div>

      <div className="md:col-span-2 bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-3xl p-10 hover:bg-white/[0.04] hover:border-blue-500/50 transition-all duration-500 relative">
        <h3 className="text-2xl font-bold text-white mb-6 relative z-10 drop-shadow-md">E-Commerce Market Strategy</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <div>
            <h4 className="text-cyan-400 font-bold mb-2">SEO Copywriting</h4>
            <p className="text-gray-300 text-sm leading-relaxed">Highly descriptive, search-optimized product titles for platforms like eBay and Depop. Specializing in luxury and vintage.</p>
          </div>
          <div>
            <h4 className="text-cyan-400 font-bold mb-2">Valuation & Research</h4>
            <p className="text-gray-300 text-sm leading-relaxed">Leverage deep analytical skills to evaluate market trends and determine optimal pricing for collectibles and luxury goods.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const SEOCopySection = () => (
  <section className="py-24 px-8 max-w-7xl mx-auto z-10 relative">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
        Scaling Digital Infrastructure
      </h2>
      <p className="text-xl text-gray-400 max-w-3xl mx-auto">
        In the landscape of 2026, technology consulting is about <strong>engineering velocity</strong>. 
        We bridge the gap between complex architecture and profitable operations.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
      
      {/* Card 1 with Custom Saved Image */}
      <div className="bg-white/[0.03] border border-white/10 p-6 rounded-3xl backdrop-blur-md hover:border-cyan-500/50 transition-colors group flex flex-col">
        <div className="w-full h-48 rounded-2xl mb-6 overflow-hidden bg-black/50 border border-white/5 relative">
          <img 
            src="/assets/image1.png" 
            alt="AI Evaluation and Prompt Engineering Services" 
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
          />
        </div>
        <h3 className="text-xl font-bold text-white mb-3">AI & Prompt Engineering</h3>
        <p className="text-gray-400 text-sm leading-relaxed flex-grow">
          The quality of your "AI workforce" depends on the rigor of your testing. We provide 
          <strong> human-in-the-loop evaluation</strong> for custom GPTs and agentic workflows, 
          ensuring your systems are accurate, safe, and enterprise-ready.
        </p>
      </div>

      {/* Card 2 with Custom Saved Image */}
      <div className="bg-white/[0.03] border border-white/10 p-6 rounded-3xl backdrop-blur-md hover:border-violet-500/50 transition-colors group flex flex-col">
        <div className="w-full h-48 rounded-2xl mb-6 overflow-hidden bg-black/50 border border-white/5 relative">
          <img 
            src="/assets/image2.png" 
            alt="E-Commerce Market Strategy and Inventory Management" 
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
          />
        </div>
        <h3 className="text-xl font-bold text-white mb-3">E-Commerce Market Strategy</h3>
        <p className="text-gray-400 text-sm leading-relaxed flex-grow">
          Data is the lifeblood of retail. Our <strong>inventory management templates</strong> 
          and COGS trackers help high-volume resellers on eBay, Depop, and Shopify maximize 
          margins through <strong>SEO-optimized copywriting</strong> and valuation models.
        </p>
      </div>

      {/* Card 3 with Custom Saved Image */}
      <div className="bg-white/[0.03] border border-white/10 p-6 rounded-3xl backdrop-blur-md hover:border-blue-500/50 transition-colors group flex flex-col">
        <div className="w-full h-48 rounded-2xl mb-6 overflow-hidden bg-black/50 border border-white/5 relative">
          <img 
            src="/assets/image3.png" 
            alt="Expert Designed Templates and Frameworks" 
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
          />
        </div>
        <h3 className="text-xl font-bold text-white mb-3">Expert-Designed Templates</h3>
        <p className="text-gray-400 text-sm leading-relaxed flex-grow">
          We bridge the gap between complex software and everyday usability. By providing <strong>expert-designed templates</strong> 
          and scalable digital workspaces, we build "business-in-a-box" systems tailored for consumers, freelancers, and growing entrepreneurs.
        </p>
      </div>

    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white/[0.02] border border-white/5 rounded-[40px] p-12 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] pointer-events-none"></div>
      
      <div className="relative z-10">
        <h3 className="text-3xl font-bold text-white mb-6">Why Optivoic for Digital Transformation?</h3>
        <p className="text-gray-400 mb-6 leading-relaxed">
          Professional success is a byproduct of systems. Every <strong>B2B software template</strong> 
          in our marketplace is a battle-tested asset used in real-world engagements. 
          When you invest in an Optivoic framework, you are acquiring years of 
          <strong> codified operational expertise</strong>.
        </p>
        <ul className="space-y-4 mb-10">
          {[
            "Focus on immediate ROI and scalability",
            "Battle-tested B2B operational frameworks",
            "Seamless Supabase & React integration",
            "Automated solutions for 1099 professionals"
          ].map((item, i) => (
            <li key={i} className="flex items-center text-sm text-gray-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-3"></span>
              {item}
            </li>
          ))}
        </ul>

        <a 
          href="https://calendly.com/YOUR_LINK" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(56,182,255,0.3)] hover:shadow-[0_0_30px_rgba(56,182,255,0.5)] hover:-translate-y-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Schedule a Strategy Call
        </a>
      </div>

      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 space-y-6 relative z-10">
        <p className="text-sm italic text-gray-400 leading-relaxed">
          "By digitizing your route planning, tax allocation, and product roadmaps, 
          you free up the mental bandwidth required for high-level creative decisions."
        </p>
        <div className="flex gap-4">
           <a href="#marketplace" className="text-cyan-400 font-bold text-sm hover:underline">Explore Hubs →</a>
           <Link to="/consulting" className="text-white font-bold text-sm hover:underline">Hire the Agency →</Link>
        </div>
      </div>
    </div>
  </section>
);

const InteractiveMarketplace = () => {
  const [activeTab, setActiveTab] = useState("All");
  const navigate = useNavigate(); 
  const categories = ["All", "Essential Trackers", "Professional Hubs", "Enterprise B2B"];
  const filteredTemplates = activeTab === "All" ? templates : templates.filter(t => t.categoryName === activeTab);

  return (
    <section id="marketplace" className="py-32 px-8 max-w-7xl mx-auto border-t border-white/5 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div className="mb-8 md:mb-0">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">Digital Marketplace</h2>
          <p className="text-xl text-gray-400">Turnkey frameworks for instant operational ROI.</p>
        </div>
        <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden bg-white/[0.02] border border-white/10 rounded-full p-2 mb-12 backdrop-blur-md gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all whitespace-nowrap shrink-0 ${
                activeTab === category
                  ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTemplates.map((item) => (
          <div 
            key={item.id} 
            className={`group relative flex flex-col p-8 rounded-3xl border transition-all duration-500 ${
              item.status === 'READY' 
                ? 'bg-white/[0.03] backdrop-blur-xl border-white/10 hover:bg-white/[0.06] hover:border-cyan-400/40 hover:-translate-y-3' 
                : 'bg-black/50 border-white/5 opacity-60 grayscale cursor-not-allowed'
            }`}
          >
            <div className="flex justify-between items-start mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{item.categoryName}</span>
              {item.status === 'READY' ? (
                <span className="bg-cyan-400/10 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full border border-cyan-400/30">Available</span>
              ) : (
                <span className="bg-white/5 text-gray-500 text-xs font-bold px-3 py-1 rounded-full border border-white/10">In Dev</span>
              )}
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
            <p className="text-gray-300 leading-relaxed mb-10 flex-grow">{item.desc}</p>
            <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10">
              <span className="text-2xl font-light text-white">${item.price}</span>
              <button 
                disabled={item.status !== 'READY'}
                onClick={() => navigate(item.route || `/template/${item.id}`)}
                className={`px-5 py-2 text-sm rounded-full font-semibold transition-all ${
                  item.status === 'READY' ? 'bg-white text-black hover:bg-cyan-400' : 'bg-white/5 text-gray-500'
                }`}
              >
                {item.status === 'READY' ? 'View Details' : 'Waitlist'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ==========================================
// 3. MAIN EXPORT
// ==========================================
export default function Storefront() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Fallback to inject Tailwind specifically for the Canvas environment preview
  // This ensures CSS works here, but won't break your local Vite config
  useEffect(() => {
    if (!window.tailwind && !document.getElementById('tailwind-cdn')) {
      const script = document.createElement('script');
      script.id = 'tailwind-cdn';
      script.src = 'https://cdn.tailwindcss.com';
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500 selection:text-white relative">
      {usePageMeta({
        title: 'Optivoic | Tech Consulting, AI Frameworks & Business Automation',
        description: 'Elite technology consulting and operational frameworks. Specialists in AI prompt engineering, Python automation, and e-commerce growth strategies.',
        ogTitle: 'Optivoic | Engineering Velocity',
        ogDescription: 'Professional-grade operational frameworks and AI system evaluation built to scale your revenue.',
        ogType: 'website',
        ogUrl: 'https://optivoic.com'
      })}

      <AmbientBackground />
      <Navbar onOpenAuth={() => setIsAuthOpen(true)} />
      <Hero />
      <BentoServices />
      <SEOCopySection /> 
      <InteractiveMarketplace />
      
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <Footer />
    </div>
  );
}