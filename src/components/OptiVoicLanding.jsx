import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import emailjs from '@emailjs/browser';
import { usePageMeta } from '../utils/usePageMeta';

const NoiseOverlay = () => (
  <div
    className="fixed inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-0"
    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
  ></div>
);

const OptiVoicLanding = () => {
  const [activeTab, setActiveTab] = useState(0);

  usePageMeta({
    title: 'Optivoic | Technology Consulting Agency, AI Automation & Reseller Templates',
    description: 'Optivoic is a premier technology consulting agency and AI automation firm. Discover turnkey reseller command center templates, 1099 tax calculators, and custom software solutions.',
    keywords: 'technology consulting agency, AI automation agency, reseller command center, reseller templates, 1099 tax estimation template, business automation frameworks, custom software development',
    canonical: 'https://www.optivoic.com/',
    robots: 'index, follow',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Optivoic',
      url: 'https://www.optivoic.com',
      logo: 'https://www.optivoic.com/assets/favicon-32x32.png',
      description: 'Technology consulting agency for AI automation, custom web systems, reseller templates, and business frameworks.'
    }
  });

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    help: ''
  });
  const [formStatus, setFormStatus] = useState(''); // 'success', 'error', 'loading', or ''
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const emailjsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const emailjsAdminTemplateId = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID;
  const emailjsCustomerTemplateId = import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID;
  const emailjsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const emailjsAdminRecipient = import.meta.env.VITE_EMAILJS_ADMIN_TO || 'connect@optivoic.com';
  const isEmailjsConfigured = Boolean(
    emailjsServiceId &&
    emailjsAdminTemplateId &&
    emailjsCustomerTemplateId &&
    emailjsPublicKey
  );

  const switchTab = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('loading'); // Add loading state
    setEmailSent(false);

    try {
      // Store contact form submission in Supabase
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: contactForm.name,
            email: contactForm.email,
            phone: contactForm.phone,
            help_request: contactForm.help,
            source: 'optivoic_landing_page'
          }
        ]);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      if (!isEmailjsConfigured) {
        console.warn('EmailJS is not fully configured. Skipping email sends.');
      } else {
        try {
          // Send email to connect@optivoic.com (admin notification)
          await emailjs.send(
            emailjsServiceId,
            emailjsAdminTemplateId,
            {
              from_name: contactForm.name,
              from_email: contactForm.email,
              phone: contactForm.phone,
              message: contactForm.help,
              to_email: emailjsAdminRecipient
            },
            emailjsPublicKey
          );

          // Send confirmation email to customer
          await emailjs.send(
            emailjsServiceId,
            emailjsCustomerTemplateId,
            {
              to_name: contactForm.name,
              to_email: contactForm.email,
              message: contactForm.help
            },
            emailjsPublicKey
          );
          setEmailSent(true);
        } catch (emailError) {
          console.warn('Email sending failed:', emailError);
          // Continue with success - data is still stored in database
        }
      }

      setSubmittedEmail(contactForm.email);
      setContactForm({ name: '', email: '', phone: '', help: '' });
      setFormStatus('success');

    } catch (error) {
      console.error('Error submitting contact form:', error);
      setFormStatus('error');
    }
  };

  const handleContactChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-cyan-500 selection:text-white relative overflow-hidden">
      <NoiseOverlay />

      {/* Ambient Background Orbs */}
      <div className="fixed top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-blue-600/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-violet-600/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none z-0"></div>

      <main className="relative z-10">

        {/* Hero Section */}
        <section className="px-8 pt-32 pb-20 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center mb-8 px-5 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-xl">
            <span className="text-xs font-bold tracking-widest uppercase text-violet-300 flex items-center">
              <span className="w-2.5 h-2.5 inline-block rounded-full bg-cyan-400 mr-3 animate-pulse"></span>
              AI-Powered Web Solutions
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-tight drop-shadow-2xl">
            AI Templates <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500">for Work & Life.</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            The marketplace to discover, customize, and deploy AI-powered templates for business, productivity, and personal use. Or, have our experts build a custom solution for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
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
        </section>

        {/* Platform Section */}
        <section id="platform" className="py-24 px-8 border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-lg">A Template for Every Need</h2>
              <p className="text-xl text-gray-400">High-quality, AI-enhanced templates to kickstart any project.</p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center gap-4 mb-12 flex-wrap">
              <button
                className={`px-6 py-3 rounded-full font-semibold transition-all ${activeTab === 0 ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/30' : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'}`}
                onClick={() => switchTab(0)}
              >
                For Business
              </button>
              <button
                className={`px-6 py-3 rounded-full font-semibold transition-all ${activeTab === 1 ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/30' : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'}`}
                onClick={() => switchTab(1)}
              >
                For Personal Use
              </button>
              <button
                className={`px-6 py-3 rounded-full font-semibold transition-all ${activeTab === 2 ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/30' : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'}`}
                onClick={() => switchTab(2)}
              >
                For Developers
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/10 transition-all">
                  <h3 className="text-xl font-bold mb-4">AI-Powered Service Sites</h3>
                  <p className="text-gray-400 leading-relaxed">Templates for service businesses with built-in lead qualification and appointment booking.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/10 transition-all">
                  <h3 className="text-xl font-bold mb-4">E-commerce Stores</h3>
                  <p className="text-gray-400 leading-relaxed">Beautifully designed storefronts with AI-driven product recommendations and analytics.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/10 transition-all">
                  <h3 className="text-xl font-bold mb-4">Agency & Portfolio</h3>
                  <p className="text-gray-400 leading-relaxed">Showcase your work with stunning, professional templates for creatives and agencies.</p>
                </div>
              </div>
            )}

            {activeTab === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/10 transition-all">
                  <h3 className="text-xl font-bold mb-4">Personal Budgeting</h3>
                  <p className="text-gray-400 leading-relaxed">AI-assisted budget trackers that analyze spending and provide financial insights.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/10 transition-all">
                  <h3 className="text-xl font-bold mb-4">Project Planners</h3>
                  <p className="text-gray-400 leading-relaxed">Organize your life and projects with intelligent planners and task managers.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/10 transition-all">
                  <h3 className="text-xl font-bold mb-4">Blogs & Personal Sites</h3>
                  <p className="text-gray-400 leading-relaxed">Launch your personal brand with SEO-optimized and easy-to-manage blog templates.</p>
                </div>
              </div>
            )}

            {activeTab === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/10 transition-all">
                  <h3 className="text-xl font-bold mb-4">API Starter Kits</h3>
                  <p className="text-gray-400 leading-relaxed">Jumpstart your next backend project with pre-configured API templates for Node.js, Python, and Go.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/10 transition-all">
                  <h3 className="text-xl font-bold mb-4">React Component Libraries</h3>
                  <p className="text-gray-400 leading-relaxed">Collections of beautifully crafted, accessible, and reusable React components.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/10 transition-all">
                  <h3 className="text-xl font-bold mb-4">AI Integration Boilerplates</h3>
                  <p className="text-gray-400 leading-relaxed">Quickly add AI features to your apps with templates for popular models and services.</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-lg">Simple, Flexible Pricing</h2>
              <p className="text-xl text-gray-400">Choose the option that's right for you.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {/* Personal Templates */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl text-center flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Personal Templates</h3>
                  <p className="text-gray-400 mb-6 min-h-[48px]">For individual projects, budgeting, and personal sites.</p>
                </div>
                <div>
                  <div className="text-4xl font-black mb-6 text-cyan-400">from $19</div>
                  <Link to="/marketplace?category=personal" className="inline-block w-full bg-white/10 border border-white/20 text-white font-semibold py-3 px-8 rounded-full hover:bg-white/20 transition-all">
                    Browse Personal
                  </Link>
                </div>
              </div>

              {/* Business Templates */}
              <div className="bg-gradient-to-r from-cyan-400/20 to-violet-500/20 border border-cyan-400/30 rounded-2xl p-8 backdrop-blur-xl relative text-center flex flex-col justify-between h-full">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-violet-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Business Templates</h3>
                  <p className="text-gray-400 mb-6 min-h-[48px]">For service businesses, e-commerce, agencies, and startups.</p>
                </div>
                <div>
                  <div className="text-4xl font-black mb-6 text-cyan-400">from $99</div>
                  <Link to="/marketplace?category=business" className="inline-block w-full bg-gradient-to-r from-cyan-400 to-violet-500 text-white font-bold py-3 px-8 rounded-full hover:shadow-[0_0_20px_rgba(56,182,255,0.4)] transition-all">
                    Browse Business
                  </Link>
                </div>
              </div>

              {/* Custom Solutions */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl text-center flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Custom Solutions</h3>
                  <p className="text-gray-400 mb-6 min-h-[48px]">A completely bespoke website or application built by our expert team.</p>
                </div>
                <div>
                  <div className="text-4xl font-black mb-6 text-cyan-400">Let's Talk</div>
                  <button onClick={() => scrollToSection('contact')} className="w-full bg-white/10 border border-white/20 text-white font-semibold py-3 px-8 rounded-full hover:bg-white/20 transition-all cursor-pointer">
                    Request a Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-24 px-8 border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-lg">Why Choose the OptiVoic Marketplace?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/10 hover:border-cyan-500/30 transition-all group">
                <div className="w-14 h-14 mb-6 rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-3xl shadow-[0_0_15px_rgba(56,182,255,0.25)] group-hover:scale-110 transition-transform">
                  🤖
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">AI-Powered from the Start</h3>
                <p className="text-gray-400 leading-relaxed">Our templates come with AI features baked in, from intelligent chatbots to data analysis tools, giving you a competitive edge.</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/10 hover:border-emerald-500/30 transition-all group">
                <div className="w-14 h-14 mb-6 rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center text-3xl shadow-[0_0_15px_rgba(52,211,153,0.25)] group-hover:scale-110 transition-transform">
                  🛡️
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Quality & Vetted</h3>
                <p className="text-gray-400 leading-relaxed">Every template is reviewed by our team for code quality, security, and performance, ensuring you start with a solid foundation.</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/10 hover:border-amber-500/30 transition-all group">
                <div className="w-14 h-14 mb-6 rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center text-3xl shadow-[0_0_15px_rgba(251,191,36,0.25)] group-hover:scale-110 transition-transform">
                  ⚡
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Easy to Customize</h3>
                <p className="text-gray-400 leading-relaxed">Built with modern, developer-friendly technologies like React and Tailwind CSS, making customization straightforward.</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/10 hover:border-violet-500/30 transition-all group">
                <div className="w-14 h-14 mb-6 rounded-2xl border border-violet-400/30 bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center text-3xl shadow-[0_0_15px_rgba(167,139,250,0.25)] group-hover:scale-110 transition-transform">
                  🚀
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">For Every Use Case</h3>
                <p className="text-gray-400 leading-relaxed">From complex business websites to simple personal tools, find the perfect starting point for any project.</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/10 hover:border-cyan-500/30 transition-all group">
                <div className="w-14 h-14 mb-6 rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 flex items-center justify-center text-3xl shadow-[0_0_15px_rgba(56,182,255,0.25)] group-hover:scale-110 transition-transform">
                  🎧
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Expert Support Available</h3>
                <p className="text-gray-400 leading-relaxed">Get stuck? Our team of experts is available for custom modifications, feature additions, or full-scale custom builds.</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/10 hover:border-pink-500/30 transition-all group">
                <div className="w-14 h-14 mb-6 rounded-2xl border border-pink-400/30 bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center text-3xl shadow-[0_0_15px_rgba(244,114,182,0.25)] group-hover:scale-110 transition-transform">
                  📈
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Growing Library</h3>
                <p className="text-gray-400 leading-relaxed">We're constantly adding new and innovative templates to the marketplace, so you'll always have fresh options.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="py-24 px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-lg">Have a Custom Project in Mind?</h2>
              <p className="text-xl text-gray-400">If our templates don't fit your needs, our experts can build a bespoke solution just for you.</p>
            </div>

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
                    value={contactForm.help}
                    id="help"
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
                      We'll review your project needs and get back to you within 24 hours with a custom proposal.
                      {emailSent && ` A confirmation email has been sent to ${submittedEmail}.`}
                    </p>
                  </div>
                )}

                {formStatus === 'error' && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4">
                    <p className="text-red-400 font-semibold">❌ Sorry, there was an error sending your message.</p>
                    <p className="text-red-300 text-sm mt-1">Please try again or contact us directly at connect@optivoic.com</p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-400 to-violet-500 text-white font-bold text-lg py-4 px-8 rounded-xl hover:shadow-[0_0_40px_rgba(56,182,255,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={formStatus === 'success' || formStatus === 'loading'}
                >
                  {formStatus === 'loading' ? 'Sending...' : formStatus === 'success' ? 'Message Sent!' : 'Send Message'}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  By submitting this form, you agree to receive communications from OptiVoic.
                  We'll send a copy of this message to your email address.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default OptiVoicLanding;