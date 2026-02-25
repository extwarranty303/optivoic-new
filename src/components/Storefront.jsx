import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthModal from './AuthModal';
import SpaceBackground from './SpaceBackground';

// ==========================================
// 1. DATA STORE 
// ==========================================
const templates = [
  { id: "36a7cc71-0c17-4530-a653-e59a8dbda7a3", categoryName: "Essential Trackers", title: "E-Commerce Reseller Profit & COGS Tracker", desc: "Track inventory cost, shipping, platform fees, and final profit margins.", price: 19.99, status: "READY" },
  { id: "executive-tax-engine", categoryName: "Essential Trackers", title: "Optivoic Executive Tax Engine", desc: "Business-in-a-Box spreadsheet for 1099 pros. Track income, calculate quarterly taxes, and map deductions automatically.", price: 19.99, status: "READY", route: "/tax-engine" },
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
    {/* 1. The new Space Particle System */}
    <SpaceBackground /> 

    {/* 2. The Noise Texture (Matte Finish) */}
    <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay z-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
    
    {/* 3. The Giant Ambient Orbs (Color Gradients) */}
    <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-violet-600/20 blur-[120px] rounded-full mix-blend-screen animate-pulse duration-10000 z-0"></div>
    <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-cyan-600/10 blur-[150px] rounded-full mix-blend-screen z-0"></div>
  </div>
);

// We pass the function prop here so the button can trigger the state in the parent
const Navbar = ({ onOpenAuth }) => (
  <nav className="fixed w-full border-b border-white/10 py-4 px-8 flex justify-between items-center bg-black/30 backdrop-blur-2xl z-50 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
    <div className="text-2xl font-black text-white tracking-tighter drop-shadow-lg">
      OPTI<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">VÖIC</span>
    </div>
    <div className="hidden md:flex space-x-8 font-medium text-sm text-gray-300">
      <Link to="/consulting" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">Consulting</Link>
      <a href="#marketplace" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">Marketplace</a>
    </div>
    <button 
      onClick={onOpenAuth} 
      className="bg-white/10 border border-white/20 hover:bg-white/20 text-white text-sm font-semibold px-6 py-2 rounded-full transition-all duration-300 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.2)]"
    >
      Client Login
    </button>
  </nav>
);

const Hero = () => (
  <section className="relative pt-48 pb-32 px-8 flex flex-col items-center text-center z-10 border-b border-white/5">
    <div className="inline-flex items-center mb-8 px-5 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]">
      <span className="text-xs font-bold tracking-widest uppercase text-gray-300 flex items-center">
        <span className="w-2.5 h-2.5 inline-block rounded-full bg-cyan-400 mr-3 shadow-[0_0_10px_rgba(56,182,255,0.8)] animate-pulse"></span>
        Accepting New Clients
      </span>
    </div>

    <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[1.1] max-w-5xl drop-shadow-2xl">
      Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 drop-shadow-[0_0_30px_rgba(56,182,255,0.3)]">Velocity.</span>
    </h1>
    
    <p className="text-xl md:text-2xl text-gray-300 mb-14 max-w-2xl font-light leading-relaxed drop-shadow-md">
      Elite technology consulting, AI system evaluation, and professional-grade operational frameworks built to scale your revenue.
    </p>
    
    <div className="flex flex-col sm:flex-row gap-6">
      <a href="#marketplace" className="bg-white text-black font-bold text-lg py-4 px-10 rounded-full hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] transition-all duration-300">
        Browse Frameworks
      </a>
      <Link to="/consulting" className="bg-white/[0.05] border border-white/20 backdrop-blur-xl text-white font-bold text-lg py-4 px-10 rounded-full hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300">
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

      <div className="bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-3xl p-10 hover:bg-white/[0.04] hover:border-cyan-500/50 hover:shadow-[0_0_40px_-10px_rgba(56,182,255,0.2)] hover:-translate-y-2 transition-all duration-500">
        <h3 className="text-xl font-bold text-white mb-3 drop-shadow-md">Custom Python Automation</h3>
        <p className="text-gray-300 leading-relaxed">
          Single-purpose scripts designed to automate tedious workflows, data processing, and repetitive operational loops.
        </p>
      </div>

      <div className="bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-3xl p-10 hover:bg-white/[0.04] hover:border-cyan-500/50 hover:shadow-[0_0_40px_-10px_rgba(56,182,255,0.2)] hover:-translate-y-2 transition-all duration-500">
        <h3 className="text-xl font-bold text-white mb-3 drop-shadow-md">Web & Database Fixes</h3>
        <p className="text-gray-300 leading-relaxed">
          Isolated bug fixes and architecture assistance for Next.js and React. Rapid backend database configuration via Supabase.
        </p>
      </div>

      <div className="md:col-span-2 bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-3xl p-10 hover:bg-white/[0.04] hover:border-blue-500/50 hover:shadow-[0_0_50px_-10px_rgba(59,130,246,0.3)] hover:-translate-y-2 transition-all duration-500 overflow-hidden relative">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-900/20 to-transparent blur-[40px]"></div>
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
        
        <div className="flex space-x-2 bg-white/[0.03] backdrop-blur-xl p-2 rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] overflow-x-auto">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                activeTab === cat 
                  ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]' 
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
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
                ? 'bg-white/[0.03] backdrop-blur-xl border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:bg-white/[0.06] hover:border-cyan-400/40 hover:-translate-y-3 hover:shadow-[0_20px_50px_-10px_rgba(56,182,255,0.25)]' 
                : 'bg-black/50 backdrop-blur-md border-white/5 opacity-60 grayscale hover:grayscale-0 cursor-not-allowed'
            }`}
          >
            {item.status === 'READY' && (
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"></div>
            )}

            <div className="flex justify-between items-start mb-6 relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400 drop-shadow-md">
                {item.categoryName}
              </span>
              {item.status === 'READY' ? (
                <span className="bg-cyan-400/10 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full border border-cyan-400/30 shadow-[0_0_10px_rgba(56,182,255,0.2)]">Available</span>
              ) : (
                <span className="bg-white/5 text-gray-500 text-xs font-bold px-3 py-1 rounded-full border border-white/10">In Dev</span>
              )}
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4 relative z-10 drop-shadow-md">{item.title}</h3>
            <p className="text-gray-300 leading-relaxed mb-10 flex-grow relative z-10">
              {item.desc}
            </p>
            
            <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10 relative z-10">
              <span className="text-2xl font-light text-white drop-shadow-md">${item.price}</span>
              <button 
                disabled={item.status !== 'READY'}
                onClick={() => navigate(item.route || `/template/${item.id}`)}
                className={`px-5 py-2 text-sm rounded-full font-semibold transition-all duration-300 ${
                  item.status === 'READY'
                    ? 'bg-white text-black hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(56,182,255,0.4)]'
                    : 'bg-white/5 text-gray-500'
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
  const [isAuthOpen, setIsAuthOpen] = useState(false); // Controls modal visibility

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500 selection:text-white relative">
      export default function Storefront() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500 selection:text-white relative">
      
      {/* --- NEW: Global SEO Metadata --- */}
      <Helmet>
        <title>OptiVöic | Elite Technology Consulting & Frameworks</title>
        <meta name="description" content="Engineering Velocity. Elite technology consulting, AI system evaluation, and professional-grade operational frameworks built to scale your revenue." />
        
        {/* OpenGraph Tags for nice link previews on Twitter/LinkedIn/Discord */}
        <meta property="og:title" content="OptiVöic Consulting & Software" />
        <meta property="og:description" content="Turnkey frameworks and custom automation for instant operational ROI." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://optivoic.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <AmbientBackground />
      <Navbar onOpenAuth={() => setIsAuthOpen(true)} />
      <AmbientBackground />
      <Navbar onOpenAuth={() => setIsAuthOpen(true)} /> {/* Triggers state change */}
      <Hero />
      <BentoServices />
      <InteractiveMarketplace />
      
      <footer className="border-t border-white/10 py-12 px-8 text-center text-gray-500 text-sm bg-black/50 backdrop-blur-xl relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 OptiVöic Consulting & Software. All rights reserved.</p>
          <div className="flex space-x-6 font-medium">
            <Link to="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </footer>

      {/* Render the Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}