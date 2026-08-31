import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabaseClient';
import emailjs from '@emailjs/browser';
import { usePageMeta } from '../utils/usePageMeta';

// ---------------------------------------------------------------------------
// Helpers & micro-components
// ---------------------------------------------------------------------------

const NoiseOverlay = () => (
  <div
    className="fixed inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-0"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  />
);

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ---------------------------------------------------------------------------
// Hero Video Showcase — Cutting Edge Muted Video Display
// ---------------------------------------------------------------------------

const HeroVideoShowcase = () => (
  <motion.div
    className="mt-14 max-w-5xl mx-auto px-2 sm:px-4"
    initial={{ opacity: 0, y: 30, scale: 0.96 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.2 }}
  >
    <div className="relative rounded-[28px] md:rounded-[36px] border border-cyan-400/30 bg-black/60 p-2 md:p-3 shadow-[0_0_80px_rgba(56,182,255,0.2)] backdrop-blur-2xl group overflow-hidden">
      
      {/* Outer Glow & Ambient Tech Accents */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/20 blur-[90px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-violet-600/20 blur-[90px] rounded-full pointer-events-none" />

      {/* Cybernetic Glass Container */}
      <div className="relative rounded-[22px] md:rounded-[30px] overflow-hidden bg-[#090a0f] aspect-[16/9] border border-white/10 flex items-center justify-center">
        
        {/* Futuristic Top HUD Bar */}
        <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center pointer-events-none">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-cyan-400/30 backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]" />
            <span className="text-[11px] font-mono font-bold tracking-widest text-cyan-300 uppercase">
              AI ENGINE // LIVE DEMO
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-[11px] font-mono text-gray-300">
            <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 1 1 0-2h1.586l4.707-4.707C10.923 7.663 12 8.109 12 9v6c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l2 2" />
            </svg>
            <span className="uppercase tracking-widest text-gray-400">SILENT PLAYBACK</span>
          </div>
        </div>

        {/* Video Element */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/reseller-command-center-preview.jpg"
          className="w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover:scale-[1.02]"
        >
          <source src="/assets/hero-showcase.mp4" type="video/mp4" />
          <source src="/assets/hero-showcase.webm" type="video/webm" />
          Your browser does not support HTML5 video.
        </video>

        {/* Bottom Ambient Gradient Mask & Cyber Badge */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#020202] via-[#020202]/60 to-transparent z-15 pointer-events-none" />
        
        <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-semibold backdrop-blur-md">
              ⚡ OptiVoic Framework
            </span>
          </div>
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest bg-black/40 px-2.5 py-1 rounded border border-white/5">
            HIGH PERFORMANCE • MUTED
          </span>
        </div>

      </div>
    </div>
  </motion.div>
);

// ---------------------------------------------------------------------------
// Section 2 — Social Proof Strip
// ---------------------------------------------------------------------------

const STATS = [
  { value: '5+', label: 'Years in Business', icon: '🗓' },
  { value: '24hr', label: 'Response Guaranteed', icon: '⚡' },
  { value: '100%', label: 'Client Satisfaction', icon: '★' },
  { value: 'AI‑First', label: 'Systems & Templates', icon: '🤖' },
];

const SocialProofStrip = () => (
  <section className="py-12 px-8 border-y border-white/5 bg-white/[0.015]">
    <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
      {STATS.map((stat, i) => (
        <motion.div
          key={stat.label}
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          viewport={{ once: true }}
        >
          <span className="text-2xl mb-2">{stat.icon}</span>
          <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500 leading-none">
            {stat.value}
          </span>
          <span className="mt-1 text-xs text-gray-400 uppercase tracking-widest font-semibold">
            {stat.label}
          </span>
        </motion.div>
      ))}
    </div>
  </section>
);

// ---------------------------------------------------------------------------
// Section 5 — Featured Product Spotlight
// ---------------------------------------------------------------------------

const RESELLER_FEATURES = [
  'Full inventory & profit tracking spreadsheet',
  'Comprehensive PDF user guide & FAQ',
  'Slide deck for onboarding & training',
  'Built-in 1099 tax estimation framework',
  'Lifetime access with free updates',
];

const FeaturedProductSection = () => (
  <section className="py-24 px-8 border-y border-white/5">
    <div className="max-w-6xl mx-auto">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center mb-4 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10">
          <span className="text-xs font-bold tracking-widest uppercase text-cyan-300">
            ⭐ Flagship Product
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
          Our Most Popular Template
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Trusted by resellers, retailers, and entrepreneurs to manage operations end-to-end.
        </p>
      </motion.div>

      <motion.div
        className="bg-gradient-to-br from-white/[0.06] to-black/40 border border-cyan-400/20 rounded-[32px] overflow-hidden"
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image */}
          <div className="relative overflow-hidden min-h-[280px] lg:min-h-[440px]">
            <img
              src="/reseller-command-center-preview.jpg"
              alt="Reseller Command Center dashboard preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/50 hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
            <div className="absolute top-5 left-5 bg-gradient-to-r from-cyan-400 to-violet-500 text-black text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
              Most Popular
            </div>
          </div>

          {/* Copy */}
          <div className="p-10 lg:p-14 flex flex-col justify-center">
            <div className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">
              Professional Hub
            </div>
            <h3 className="text-3xl font-black mb-3 leading-tight">
              Reseller Command Center
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6 text-sm">
              The ultimate operational framework for managing inventory, tracking profits, and scaling
              your reselling enterprise — all in one cohesive, AI-enhanced system.
            </p>
            <ul className="space-y-3 mb-8">
              {RESELLER_FEATURES.map((feat) => (
                <li key={feat} className="flex items-start gap-3 text-sm text-gray-300">
                  <span className="mt-[5px] w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                  {feat}
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <span className="text-4xl font-black text-cyan-400">$99</span>
              <Link
                to="/reseller-command-center"
                className="flex-1 text-center bg-gradient-to-r from-cyan-400 to-violet-500 text-white font-bold py-3 px-8 rounded-full hover:shadow-[0_0_30px_rgba(56,182,255,0.4)] transition-all"
              >
                View Details →
              </Link>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Includes PDF guide, slide deck & comprehensive FAQ
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

// ---------------------------------------------------------------------------
// Section 7 — Closing CTA Banner
// ---------------------------------------------------------------------------

const ClosingCTABanner = ({ onContactClick }) => (
  <section className="py-20 px-8">
    <motion.div
      className="max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="relative rounded-[32px] overflow-hidden border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-black/50 p-12 md:p-16 text-center backdrop-blur-xl">
        {/* Glow blobs */}
        <div className="absolute top-[-30%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-30%] left-[-10%] w-[40%] h-[40%] bg-violet-600/20 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center mb-6 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10">
            <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2 animate-pulse" />
            <span className="text-xs font-bold tracking-widest uppercase text-violet-300">
              Ready to Start?
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            Stop Improvising.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
              Start Operating with a System.
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Whether you need a turnkey template today or a fully custom solution, we have
            the tools and the team to make it happen — fast.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/marketplace"
              className="bg-gradient-to-r from-cyan-400 to-violet-500 text-white font-bold text-lg py-4 px-10 rounded-full hover:shadow-[0_0_40px_rgba(56,182,255,0.4)] transition-all"
            >
              Browse All Templates
            </Link>
            <button
              onClick={onContactClick}
              className="bg-white/10 border border-white/20 text-white font-semibold text-lg py-4 px-10 rounded-full hover:bg-white/20 transition-all"
            >
              Talk to an Expert
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);

// ---------------------------------------------------------------------------
// Floating sticky CTA
// ---------------------------------------------------------------------------

const FloatingCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            to="/marketplace"
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-violet-500 text-white font-bold text-sm py-3 px-6 rounded-full shadow-[0_0_30px_rgba(56,182,255,0.4)] hover:shadow-[0_0_50px_rgba(56,182,255,0.6)] hover:scale-105 transition-all"
          >
            Browse Products <span>→</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ---------------------------------------------------------------------------
// Why Choose cards data (full static class strings so Tailwind can extract them)
// ---------------------------------------------------------------------------

const WHY_CARDS = [
  {
    icon: '🤖',
    hoverBorder: 'hover:border-cyan-500/30',
    iconBorder: 'border-cyan-400/30',
    iconBg: 'from-cyan-500/20 to-blue-500/20',
    title: 'AI-Powered from the Start',
    desc: 'Our templates come with AI features baked in — from intelligent chatbots to data analysis tools — giving you a competitive edge from day one.',
  },
  {
    icon: '🛡️',
    hoverBorder: 'hover:border-emerald-500/30',
    iconBorder: 'border-emerald-400/30',
    iconBg: 'from-emerald-500/20 to-teal-500/20',
    title: 'Quality & Vetted',
    desc: 'Every template is reviewed by our team for code quality, security, and performance, ensuring you start with a solid, trustworthy foundation.',
  },
  {
    icon: '⚡',
    hoverBorder: 'hover:border-amber-500/30',
    iconBorder: 'border-amber-400/30',
    iconBg: 'from-amber-500/20 to-orange-500/20',
    title: 'Easy to Customize',
    desc: 'Built with modern, developer-friendly technologies like React and Tailwind CSS — making customization approachable even for non-developers.',
  },
  {
    icon: '🚀',
    hoverBorder: 'hover:border-violet-500/30',
    iconBorder: 'border-violet-400/30',
    iconBg: 'from-violet-500/20 to-purple-500/20',
    title: 'For Every Use Case',
    desc: 'From complex business websites to simple personal finance tools, find the perfect starting point for any project or industry.',
  },
  {
    icon: '🎧',
    hoverBorder: 'hover:border-cyan-500/30',
    iconBorder: 'border-cyan-400/30',
    iconBg: 'from-cyan-500/20 to-indigo-500/20',
    title: 'Expert Support Available',
    desc: 'Get stuck? Our team is available for custom modifications, feature additions, or full-scale custom builds — within 24 hours.',
  },
  {
    icon: '📈',
    hoverBorder: 'hover:border-pink-500/30',
    iconBorder: 'border-pink-400/30',
    iconBg: 'from-pink-500/20 to-rose-500/20',
    title: 'Growing Library',
    desc: "We're constantly adding new templates and frameworks to the marketplace — so you'll always have fresh, modern options.",
  },
];

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const OptiVoicLanding = () => {
  const [activeTab, setActiveTab] = useState(0);

  usePageMeta({
    title: 'Optivoic — AI Automation & Technology Consulting',
    description:
      'Optivoic is a premier technology consulting agency and AI automation firm. Discover turnkey reseller command center templates, 1099 tax calculators, and custom software solutions.',
    keywords:
      'technology consulting agency, AI automation agency, reseller command center, reseller templates, 1099 tax estimation template, business automation frameworks, custom software development',
    canonical: 'https://www.optivoic.com/',
    robots: 'index, follow',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Optivoic',
      url: 'https://www.optivoic.com',
      logo: 'https://www.optivoic.com/assets/favicon-32x32.png',
      description:
        'Technology consulting agency for AI automation, custom web systems, reseller templates, and business frameworks.',
    },
  });

  // Contact form state
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', help: '' });
  const [formStatus, setFormStatus] = useState(''); // 'success' | 'error' | 'loading' | ''
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const emailjsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const emailjsAdminTemplateId = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID;
  const emailjsCustomerTemplateId = import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID;
  const emailjsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const emailjsAdminRecipient = import.meta.env.VITE_EMAILJS_ADMIN_TO || 'connect@optivoic.com';
  const isEmailjsConfigured = Boolean(
    emailjsServiceId && emailjsAdminTemplateId && emailjsCustomerTemplateId && emailjsPublicKey
  );

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('loading');
    setEmailSent(false);

    try {
      const { error } = await supabase.from('contact_submissions').insert([
        {
          name: contactForm.name,
          email: contactForm.email,
          phone: contactForm.phone,
          help_request: contactForm.help,
          source: 'optivoic_landing_page',
        },
      ]);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      if (!isEmailjsConfigured) {
        console.warn('EmailJS is not fully configured. Skipping email sends.');
      } else {
        try {
          await emailjs.send(
            emailjsServiceId,
            emailjsAdminTemplateId,
            {
              from_name: contactForm.name,
              from_email: contactForm.email,
              phone: contactForm.phone,
              message: contactForm.help,
              to_email: emailjsAdminRecipient,
            },
            emailjsPublicKey
          );
          await emailjs.send(
            emailjsServiceId,
            emailjsCustomerTemplateId,
            { to_name: contactForm.name, to_email: contactForm.email, message: contactForm.help },
            emailjsPublicKey
          );
          setEmailSent(true);
        } catch (emailError) {
          console.warn('Email sending failed:', emailError);
        }
      }

      setSubmittedEmail(contactForm.email);
      setContactForm({ name: '', email: '', phone: '', help: '' });
      setFormStatus('success');
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setFormStatus('error');
    }
  };

  const handleContactChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-cyan-500 selection:text-white relative overflow-hidden">
      <NoiseOverlay />

      {/* Ambient background orbs */}
      <div className="fixed top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-blue-600/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-violet-600/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none z-0" />

      <main className="relative z-10">

        {/* ================================================================
            SECTION 1 — Hero
        ================================================================ */}
        <section className="px-8 pt-32 pb-20 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center mb-8 px-5 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-xl">
              <span className="text-xs font-bold tracking-widest uppercase text-violet-300 flex items-center">
                <span className="w-2.5 h-2.5 inline-block rounded-full bg-cyan-400 mr-3 animate-pulse" />
                AI-Powered Web Solutions
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-tight drop-shadow-2xl">
              AI Automation Templates &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500">
                Technology Consulting.
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
              The marketplace to discover, customize, and deploy AI-powered templates for business,
              productivity, and personal use. Or, have our experts build a custom solution for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
              <Link
                to="/marketplace"
                className="bg-gradient-to-r from-cyan-400 to-violet-500 text-white font-bold text-lg py-4 px-10 rounded-full hover:shadow-[0_0_40px_rgba(56,182,255,0.4)] transition-all"
              >
                Explore Marketplace
              </Link>
              <button
                className="bg-white/10 border border-white/20 text-white font-semibold text-lg py-4 px-10 rounded-full hover:bg-white/20 transition-all"
                onClick={() => scrollToSection('contact')}
              >
                Request Custom Build
              </button>
            </div>

            {/* Video Showcase Visual Anchor */}
            <HeroVideoShowcase />

            {/* Scroll indicator */}
            <div className="mt-16 flex flex-col items-center gap-2 text-gray-600">
              <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ================================================================
            SECTION 2 — Social Proof Strip
        ================================================================ */}
        <SocialProofStrip />

        {/* ================================================================
            SECTION 3 — Feature Tabs ("A Template for Every Need")
        ================================================================ */}
        <section id="platform" className="py-24 px-8 border-b border-white/5 bg-white/[0.01]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-lg">
                A Template for Every Need
              </h2>
              <p className="text-xl text-gray-400">
                High-quality, AI-enhanced templates to kickstart any project.
              </p>
            </motion.div>

            {/* Tab buttons */}
            <div className="flex justify-center gap-4 mb-12 flex-wrap">
              {['For Business', 'For Personal Use', 'For Developers'].map((label, idx) => (
                <button
                  key={label}
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    activeTab === idx
                      ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/30'
                      : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'
                  }`}
                  onClick={() => setActiveTab(idx)}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {activeTab === 0 && (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {[
                  { title: 'AI-Powered Service Sites', desc: 'Templates for service businesses with built-in lead qualification and appointment booking.' },
                  { title: 'E-commerce Stores', desc: 'Beautifully designed storefronts with AI-driven product recommendations and analytics.' },
                  { title: 'Agency & Portfolio', desc: 'Showcase your work with stunning, professional templates for creatives and agencies.' },
                ].map((card) => (
                  <div key={card.title} className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/10 transition-all">
                    <h3 className="text-xl font-bold mb-4">{card.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{card.desc}</p>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 1 && (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {[
                  { title: 'Personal Budgeting', desc: 'AI-assisted budget trackers that analyze spending and provide actionable financial insights.' },
                  { title: 'Project Planners', desc: 'Organize your life and projects with intelligent planners and task managers.' },
                  { title: 'Blogs & Personal Sites', desc: 'Launch your personal brand with SEO-optimized and easy-to-manage blog templates.' },
                ].map((card) => (
                  <div key={card.title} className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/10 transition-all">
                    <h3 className="text-xl font-bold mb-4">{card.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{card.desc}</p>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 2 && (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {[
                  { title: 'API Starter Kits', desc: 'Jumpstart your next backend project with pre-configured API templates for Node.js, Python, and Go.' },
                  { title: 'React Component Libraries', desc: 'Collections of beautifully crafted, accessible, and reusable React components.' },
                  { title: 'AI Integration Boilerplates', desc: 'Quickly add AI features to your apps with templates for popular models and services.' },
                ].map((card) => (
                  <div key={card.title} className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/10 transition-all">
                    <h3 className="text-xl font-bold mb-4">{card.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{card.desc}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* ================================================================
            SECTION 4 — Why Choose OptiVoic
        ================================================================ */}
        <section className="py-24 px-8 border-b border-white/5 bg-white/[0.01]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-lg">
                Everything You Need to Operate Like a Pro
              </h2>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              variants={staggerContainer}
              viewport={{ once: true }}
            >
              {WHY_CARDS.map((card) => (
                <motion.div
                  key={card.title}
                  variants={fadeUp}
                  className={`bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/10 ${card.hoverBorder} transition-all group`}
                >
                  <div
                    className={`w-14 h-14 mb-6 rounded-2xl border ${card.iconBorder} bg-gradient-to-br ${card.iconBg} flex items-center justify-center text-3xl shadow-[0_0_15px_rgba(56,182,255,0.2)] group-hover:scale-110 transition-transform`}
                  >
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{card.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ================================================================
            SECTION 5 — Featured Product Spotlight
        ================================================================ */}
        <FeaturedProductSection />

        {/* ================================================================
            SECTION 6 — Pricing / Purchase Cards
        ================================================================ */}
        <section id="pricing" className="py-24 px-8 border-b border-white/5">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-lg">
                Simple, Flexible Pricing
              </h2>
              <p className="text-xl text-gray-400">
                Choose the option that's right for you. Every purchase includes full documentation.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">

              {/* Starter Pack */}
              <motion.div
                className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl text-center flex flex-col justify-between h-full"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0 }}
                viewport={{ once: true }}
              >
                <div>
                  <h3 className="text-2xl font-bold mb-4">Starter Pack</h3>
                  <p className="text-gray-400 mb-6 min-h-[48px]">
                    For individual projects, budgeting, and personal use.
                  </p>
                  <ul className="text-left space-y-2 mb-6">
                    {['Instant digital download', 'PDF user guide included', 'Personal use license'].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-4xl font-black mb-6 text-cyan-400">from $19</div>
                  <Link
                    to="/marketplace?category=personal"
                    className="inline-block w-full bg-white/10 border border-white/20 text-white font-semibold py-3 px-8 rounded-full hover:bg-white/20 transition-all"
                  >
                    Browse Starter
                  </Link>
                </div>
              </motion.div>

              {/* Business Templates */}
              <motion.div
                className="bg-gradient-to-r from-cyan-400/20 to-violet-500/20 border border-cyan-400/30 rounded-2xl p-8 backdrop-blur-xl relative text-center flex flex-col justify-between h-full"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-violet-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Business Templates</h3>
                  <p className="text-gray-400 mb-6 min-h-[48px]">
                    For service businesses, e-commerce, agencies, and startups.
                  </p>
                  <ul className="text-left space-y-2 mb-6">
                    {[
                      'Premium template files',
                      'PDF guide + FAQ document',
                      'Slide deck included',
                      'Commercial use license',
                      'Priority email support',
                    ].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-4xl font-black mb-6 text-cyan-400">from $99</div>
                  <Link
                    to="/marketplace?category=business"
                    className="inline-block w-full bg-gradient-to-r from-cyan-400 to-violet-500 text-white font-bold py-3 px-8 rounded-full hover:shadow-[0_0_20px_rgba(56,182,255,0.4)] transition-all"
                  >
                    Browse Business
                  </Link>
                </div>
              </motion.div>

              {/* Custom Solutions */}
              <motion.div
                className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl text-center flex flex-col justify-between h-full"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div>
                  <h3 className="text-2xl font-bold mb-4">Custom Solutions</h3>
                  <p className="text-gray-400 mb-6 min-h-[48px]">
                    A completely bespoke website or application built by our expert team.
                  </p>
                  <ul className="text-left space-y-2 mb-6">
                    {[
                      'Dedicated project manager',
                      'Custom design & development',
                      'Full source code ownership',
                      'Post-launch support included',
                    ].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                        <span className="w-2 h-2 rounded-full bg-violet-400 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-4xl font-black mb-6 text-cyan-400">Let's Talk</div>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="w-full bg-white/10 border border-white/20 text-white font-semibold py-3 px-8 rounded-full hover:bg-white/20 transition-all cursor-pointer"
                  >
                    Request a Quote
                  </button>
                </div>
              </motion.div>
            </div>

            <p className="text-center text-xs text-gray-500 mt-8">
              All purchases include a comprehensive PDF guide & user documentation. 100% client satisfaction guaranteed.
            </p>
          </div>
        </section>

        {/* ================================================================
            SECTION 7 — Closing CTA Banner
        ================================================================ */}
        <ClosingCTABanner onContactClick={() => scrollToSection('contact')} />

        {/* ================================================================
            SECTION 8 — Contact Form
        ================================================================ */}
        <section id="contact" className="py-24 px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-lg">
                Have a Custom Project in Mind?
              </h2>
              <p className="text-xl text-gray-400">
                If our templates don't fit your needs, our experts can build a bespoke solution just
                for you.
              </p>
            </motion.div>

            {/* 2-col: form + sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 items-start">

              {/* Form */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-widest">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={contactForm.name}
                        onChange={handleContactChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-widest">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={contactForm.email}
                        onChange={handleContactChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-widest">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={contactForm.phone}
                      onChange={handleContactChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label htmlFor="help" className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-widest">
                      How Can We Help? *
                    </label>
                    <textarea
                      name="help"
                      id="help"
                      value={contactForm.help}
                      onChange={handleContactChange}
                      required
                      rows={5}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none resize-none"
                      placeholder="Tell us about your project. What are your goals? What specific features do you need? The more detail, the better!"
                    />
                  </div>

                  {formStatus === 'success' && (
                    <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4">
                      <p className="text-green-400 font-semibold">✅ Thank you! Your message has been sent successfully.</p>
                      <p className="text-green-300 text-sm mt-1">
                        We'll review your project needs and get back to you within 24 hours with a
                        custom proposal.
                        {emailSent && ` A confirmation email has been sent to ${submittedEmail}.`}
                      </p>
                    </div>
                  )}

                  {formStatus === 'error' && (
                    <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4">
                      <p className="text-red-400 font-semibold">❌ Sorry, there was an error sending your message.</p>
                      <p className="text-red-300 text-sm mt-1">
                        Please try again or contact us directly at connect@optivoic.com
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-400 to-violet-500 text-white font-bold text-lg py-4 px-8 rounded-xl hover:shadow-[0_0_40px_rgba(56,182,255,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={formStatus === 'success' || formStatus === 'loading'}
                  >
                    {formStatus === 'loading'
                      ? 'Sending...'
                      : formStatus === 'success'
                      ? 'Message Sent!'
                      : 'Send Message'}
                  </button>

                  <p className="text-xs text-gray-400 text-center">
                    By submitting this form, you agree to receive communications from OptiVoic. We'll
                    send a copy of this message to your email address.
                  </p>
                </form>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                {/* What happens next */}
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
                  <h3 className="text-base font-bold mb-5 text-white">What happens next?</h3>
                  <div className="space-y-5">
                    {[
                      {
                        step: '01',
                        title: 'Submit Your Request',
                        desc: 'Fill out the form with your project goals and details.',
                      },
                      {
                        step: '02',
                        title: 'We Review & Respond',
                        desc: 'Our team reviews your needs and replies within 24 hours — guaranteed.',
                      },
                      {
                        step: '03',
                        title: 'Receive a Custom Proposal',
                        desc: "We'll send a tailored quote and project plan. No obligation.",
                      },
                    ].map((item) => (
                      <div key={item.step} className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 text-xs font-black shrink-0">
                          {item.step}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white mb-0.5">{item.title}</p>
                          <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct contact */}
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
                    Direct Contact
                  </p>
                  <a
                    href="mailto:connect@optivoic.com"
                    className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-semibold"
                  >
                    <span>✉️</span>
                    connect@optivoic.com
                  </a>
                  <p className="text-xs text-gray-500 mt-2">100% response within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating sticky CTA */}
      <FloatingCTA />
    </div>
  );
};

export default OptiVoicLanding;