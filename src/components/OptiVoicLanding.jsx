import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { supabase } from '../supabaseClient';
import emailjs from '@emailjs/browser';

const NoiseOverlay = () => (
  <div
    className="fixed inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-0"
    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
  ></div>
);

const OptiVoicLanding = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    { text: "👋 Hi! Welcome to Thompson Plumbing. I'm here to help schedule your appointment or answer questions about our services. What brings you in today?", sender: 'bot' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    help: ''
  });
  const [formStatus, setFormStatus] = useState(''); // 'success', 'error', or ''

  const conversations = {
    'I have a leaky faucet': {
      bot: 'Got it! A leaky faucet repair. That\'s one of our most common services. Just to help prioritize this—is the leak active right now, or is it intermittent?',
      nextResponses: ['Active leak', 'Intermittent']
    },
    'Active leak': {
      bot: 'I can get someone out to you this week. What day works best for you—Monday, Wednesday, or Thursday between 9am-5pm?'
    },
    'Intermittent': {
      bot: 'Good news—intermittent leaks are usually an easy fix. We can schedule a routine visit. What\'s your availability next week?'
    },
    'Water heater is broken, need emergency service ASAP': {
      bot: '⚠️ Emergency detected—water heater failure. I\'m flagging this as urgent. We have availability TODAY between 2-4pm or tomorrow morning 8-11am. Which works?'
    },
    'Schedule maintenance for Tuesday': {
      bot: 'Perfect! I\'ve got Tuesday open. What time works best—morning (8-12pm) or afternoon (1-5pm)? And what service do you need maintenance on?'
    },
    'morning (8-12pm)': {
      bot: 'Excellent! Let me confirm your appointment:\n\n📅 Tuesday, 8:00 AM\n📍 Your location\n🔧 System maintenance\n\nWe\'ll send you an SMS reminder 24 hours before and again 1 hour before arrival. Sound good?'
    },
    'afternoon (1-5pm)': {
      bot: 'Great! Let me confirm your appointment:\n\n📅 Tuesday, 2:00 PM\n📍 Your location\n🔧 System maintenance\n\nWe\'ll send you an SMS reminder 24 hours before and again 1 hour before arrival. Sound good?'
    },
    'yes': {
      bot: '✅ Appointment confirmed! One of our technicians will be there Tuesday. Check your email for the full confirmation details. Questions? Call us anytime!'
    },
    'no': {
      bot: 'No problem! What time would work better for you? Or would you prefer a different day?'
    }
  };

  const addMessage = (text, sender) => {
    setChatMessages(prev => [...prev, { text, sender }]);
  };

  const sendMessage = () => {
    const text = chatInput.trim();
    if (!text) return;

    addMessage(text, 'user');
    setChatInput('');

    setTimeout(() => {
      const response = conversations[text];
      if (response) {
        addMessage(response.bot, 'bot');
      } else {
        addMessage('I understand you\'re asking about ' + text.toLowerCase() + '. For complex questions, one of our team members can help—would you like us to call you back?', 'bot');
      }
    }, 500);
  };

  const sendPredefinedMessage = (message) => {
    setChatInput(message);
    sendMessage();
  };

  const switchTab = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('');

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
            submitted_at: new Date().toISOString(),
            source: 'optivoic_landing_page'
          }
        ]);

      if (error) throw error;

      // Send email to connect@optivoic.com (admin notification)
      await emailjs.send(
        'service_optivoic', // Replace with your EmailJS service ID
        'template_admin_notification', // Replace with your admin notification template ID
        {
          from_name: contactForm.name,
          from_email: contactForm.email,
          phone: contactForm.phone,
          message: contactForm.help,
          to_email: 'connect@optivoic.com'
        },
        'your_public_key' // Replace with your EmailJS public key
      );

      // Send confirmation email to customer
      await emailjs.send(
        'service_optivoic', // Replace with your EmailJS service ID
        'template_customer_confirmation', // Replace with your customer confirmation template ID
        {
          to_name: contactForm.name,
          to_email: contactForm.email,
          message: contactForm.help
        },
        'your_public_key' // Replace with your EmailJS public key
      );

      // Reset form
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

      {/* Navbar */}
      <nav className="relative z-50 border-b border-white/10 py-6 px-8 flex justify-between items-center bg-black/30 backdrop-blur-2xl shadow-lg">
        <Link to="/aiservice" className="text-gray-400 hover:text-cyan-400 font-semibold flex items-center gap-2 transition-colors">
          <span>←</span> Back to Storefront
        </Link>
        <div className="text-xl font-black text-white tracking-tighter drop-shadow-lg">
          OPTI<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">VÖIC</span>
        </div>
        <div className="text-sm text-gray-400">AI Website Solutions</div>
      </nav>

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
            AI Websites for <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500">Home Service Businesses</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            Convert more leads with intelligent appointment booking, smart qualification, and personalized customer experiences. Built for plumbing, HVAC, electrical, and service professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <button
              className="bg-gradient-to-r from-cyan-400 to-violet-500 text-white font-bold text-lg py-4 px-10 rounded-full hover:shadow-[0_0_40px_rgba(56,182,255,0.4)] transition-all"
              onClick={() => scrollToSection('demo')}
            >
              See AI in Action
            </button>
            <button
              className="bg-white/10 border border-white/20 text-white font-semibold text-lg py-4 px-10 rounded-full hover:bg-white/20 transition-all"
              onClick={() => scrollToSection('contact')}
            >
              Get Started
            </button>
          </div>
        </section>
        </section>

        {/* Platform Section */}
        <section id="platform" className="py-24 px-8 border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-lg">Our Complete Solution</h2>
              <p className="text-xl text-gray-400">Professional websites with AI-powered lead conversion</p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center gap-4 mb-12 flex-wrap">
              <button
                className={`px-6 py-3 rounded-full font-semibold transition-all ${activeTab === 0 ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/30' : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'}`}
                onClick={() => switchTab(0)}
              >
                Platform
              </button>
              <button
                className={`px-6 py-3 rounded-full font-semibold transition-all ${activeTab === 1 ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/30' : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'}`}
                onClick={() => switchTab(1)}
              >
                AI Features
              </button>
              <button
                className={`px-6 py-3 rounded-full font-semibold transition-all ${activeTab === 2 ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/30' : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'}`}
                onClick={() => switchTab(2)}
              >
                Integration
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/10 transition-all">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-xl flex items-center justify-center mb-6">
                    <span className="text-2xl">🎨</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Beautiful Design</h3>
                  <p className="text-gray-400 leading-relaxed">Professional, mobile-optimized websites built with modern tech (React, Vite, Node.js)</p>
                  <ul className="mt-6 space-y-2 text-sm text-gray-300">
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Mobile-first responsive design</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Fast load times (&lt; 2 seconds)</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> SEO-optimized structure</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Accessibility compliant</li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/10 transition-all">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-xl flex items-center justify-center mb-6">
                    <span className="text-2xl">🔐</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Secure Infrastructure</h3>
                  <p className="text-gray-400 leading-relaxed">Enterprise-grade hosting on Supabase with PostgreSQL database</p>
                  <ul className="mt-6 space-y-2 text-sm text-gray-300">
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> 99.9% uptime guarantee</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> SSL/TLS encryption</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Regular backups</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> GDPR compliant</li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/10 transition-all">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-xl flex items-center justify-center mb-6">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Analytics Dashboard</h3>
                  <p className="text-gray-400 leading-relaxed">Real-time insights into visitor behavior and conversion metrics</p>
                  <ul className="mt-6 space-y-2 text-sm text-gray-300">
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Visitor tracking & heatmaps</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Conversion funnel analysis</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Lead source attribution</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Monthly performance reports</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/10 transition-all">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-xl flex items-center justify-center mb-6">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Smart Chatbot</h3>
                  <p className="text-gray-400 leading-relaxed">AI-powered conversational assistant that qualifies leads 24/7</p>
                  <ul className="mt-6 space-y-2 text-sm text-gray-300">
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Natural language understanding</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Service categorization</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Emergency detection</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Human handoff</li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/10 transition-all">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-xl flex items-center justify-center mb-6">
                    <span className="text-2xl">📅</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Appointment Booking</h3>
                  <p className="text-gray-400 leading-relaxed">Intelligent scheduling that reduces no-shows by 30%</p>
                  <ul className="mt-6 space-y-2 text-sm text-gray-300">
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Real-time availability</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Auto-confirmation SMS</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Reminder automation</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Calendar integration</li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/10 transition-all">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-xl flex items-center justify-center mb-6">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Personalization Engine</h3>
                  <p className="text-gray-400 leading-relaxed">Adaptive content that increases conversion by 15-25%</p>
                  <ul className="mt-6 space-y-2 text-sm text-gray-300">
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Behavior-based CTAs</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Dynamic content reordering</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Service recommendations</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Location targeting</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/10 transition-all">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-xl flex items-center justify-center mb-6">
                    <span className="text-2xl">🔗</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">CRM Integration</h3>
                  <p className="text-gray-400 leading-relaxed">Seamlessly sync leads to your existing systems</p>
                  <ul className="mt-6 space-y-2 text-sm text-gray-300">
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> HubSpot integration</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Salesforce compatibility</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Zapier automation</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Webhook support</li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/10 transition-all">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-xl flex items-center justify-center mb-6">
                    <span className="text-2xl">📞</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">SMS & Email</h3>
                  <p className="text-gray-400 leading-relaxed">Automated communication that keeps customers informed</p>
                  <ul className="mt-6 space-y-2 text-sm text-gray-300">
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Appointment reminders</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Follow-up sequences</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Promotional campaigns</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Review requests</li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/10 transition-all">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-xl flex items-center justify-center mb-6">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Review Management</h3>
                  <p className="text-gray-400 leading-relaxed">Manage and display customer reviews across platforms</p>
                  <ul className="mt-6 space-y-2 text-sm text-gray-300">
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Google Reviews sync</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Yelp integration</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Rating aggregation</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Reputation monitoring</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Demo Section */}
        <section id="demo" className="py-24 px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-lg">AI Assistant Demo</h2>
              <p className="text-xl text-gray-400">Click "Try AI Booking" to see our intelligent chatbot in action</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
              <div className="h-96 overflow-y-auto mb-6 bg-black/30 rounded-xl p-6 border border-white/5">
                {chatMessages.map((message, index) => (
                  <div key={index} className={`flex gap-3 mb-4 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                    <div className={`max-w-[70%] p-4 rounded-xl ${message.sender === 'bot' ? 'bg-gradient-to-r from-cyan-400/20 to-violet-500/20 border border-cyan-400/30' : 'bg-white/10 border border-white/20'}`}>
                      <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mb-6">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type a message..."
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                />
                <button
                  onClick={sendMessage}
                  className="bg-gradient-to-r from-cyan-400 to-violet-500 text-white font-semibold px-6 py-3 rounded-xl hover:shadow-[0_0_20px_rgba(56,182,255,0.4)] transition-all"
                >
                  Send
                </button>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="text-sm font-semibold mb-4 text-gray-300">💡 Try these messages:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <button
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:border-cyan-400/30 transition-all"
                    onClick={() => sendPredefinedMessage('I have a leaky faucet')}
                  >
                    I have a leaky faucet
                  </button>
                  <button
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:border-cyan-400/30 transition-all"
                    onClick={() => sendPredefinedMessage('Water heater is broken, need emergency service ASAP')}
                  >
                    Water heater emergency
                  </button>
                  <button
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:border-cyan-400/30 transition-all"
                    onClick={() => sendPredefinedMessage('I want to schedule maintenance for Tuesday')}
                  >
                    Schedule maintenance
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section id="results" className="py-24 px-8 border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-lg">Proven Results</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
              <div className="bg-gradient-to-r from-cyan-400/20 to-violet-500/20 border border-cyan-400/30 rounded-2xl p-8 text-center backdrop-blur-xl">
                <div className="text-4xl font-black mb-2">+210%</div>
                <div className="text-gray-400">Avg. Lead Increase</div>
              </div>
              <div className="bg-gradient-to-r from-cyan-400/20 to-violet-500/20 border border-cyan-400/30 rounded-2xl p-8 text-center backdrop-blur-xl">
                <div className="text-4xl font-black mb-2">15.6%</div>
                <div className="text-gray-400">Conversion Rate</div>
              </div>
              <div className="bg-gradient-to-r from-cyan-400/20 to-violet-500/20 border border-cyan-400/30 rounded-2xl p-8 text-center backdrop-blur-xl">
                <div className="text-4xl font-black mb-2">-30%</div>
                <div className="text-gray-400">No-Show Rate</div>
              </div>
              <div className="bg-gradient-to-r from-cyan-400/20 to-violet-500/20 border border-cyan-400/30 rounded-2xl p-8 text-center backdrop-blur-xl">
                <div className="text-4xl font-black mb-2">23%</div>
                <div className="text-gray-400">AI Conversion Lift</div>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-8 text-center">Industry Benchmarks</h3>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 font-bold">Service Type</th>
                    <th className="text-left py-4 font-bold">Avg. Website Conversion</th>
                    <th className="text-left py-4 font-bold">With OptiVoic AI</th>
                    <th className="text-left py-4 font-bold">Improvement</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-white/5">
                    <td className="py-4 font-semibold">Plumbing</td>
                    <td className="py-4">15.61%</td>
                    <td className="py-4 text-cyan-400 font-semibold">19-22%</td>
                    <td className="py-4 text-green-400 font-semibold">+23%</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 font-semibold">HVAC</td>
                    <td className="py-4">15.11%</td>
                    <td className="py-4 text-cyan-400 font-semibold">18-21%</td>
                    <td className="py-4 text-green-400 font-semibold">+23%</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 font-semibold">Electrical</td>
                    <td className="py-4">12-14%</td>
                    <td className="py-4 text-cyan-400 font-semibold">15-18%</td>
                    <td className="py-4 text-green-400 font-semibold">+23%</td>
                  </tr>
                  <tr>
                    <td className="py-4 font-semibold">General Services</td>
                    <td className="py-4">2-5%</td>
                    <td className="py-4 text-cyan-400 font-semibold">5-8%</td>
                    <td className="py-4 text-green-400 font-semibold">+60%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-lg">Simple, Transparent Pricing</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                <h3 className="text-2xl font-bold mb-4">MVP</h3>
                <div className="text-4xl font-black mb-6 text-cyan-400">$2,500</div>
                <p className="text-gray-400 mb-6">10 days setup</p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Template website</li>
                  <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> AI chatbot</li>
                  <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Basic booking</li>
                  <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Local SEO</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-cyan-400/20 to-violet-500/20 border border-cyan-400/30 rounded-2xl p-8 backdrop-blur-xl relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-violet-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                  RECOMMENDED
                </div>
                <h3 className="text-2xl font-bold mb-4">Custom</h3>
                <div className="text-4xl font-black mb-6 text-cyan-400">$4,500</div>
                <p className="text-gray-400 mb-6">20 days setup</p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Custom design</li>
                  <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Advanced AI</li>
                  <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Full integration</li>
                  <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Analytics</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
                <div className="text-4xl font-black mb-6 text-cyan-400">$6,500+</div>
                <p className="text-gray-400 mb-6">30 days setup</p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Everything in Custom</li>
                  <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> CRM integration</li>
                  <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Mobile app</li>
                  <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Predictive analytics</li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold mb-8">Monthly Support Plans</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                  <h4 className="text-xl font-bold mb-2">Basic</h4>
                  <div className="text-2xl font-black mb-4 text-cyan-400">$199/mo</div>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Hosting & uptime</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Security updates</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> 24/7 monitoring</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Email support</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-cyan-400/20 to-violet-500/20 border border-cyan-400/30 rounded-2xl p-8 backdrop-blur-xl">
                  <h4 className="text-xl font-bold mb-2">Professional</h4>
                  <div className="text-2xl font-black mb-4 text-cyan-400">$399/mo</div>
                  <div className="text-xs text-cyan-400 font-semibold mb-4">⭐ MOST POPULAR</div>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Everything in Basic</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Monthly optimization</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Analytics reviews</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Priority support</li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                  <h4 className="text-xl font-bold mb-2">Enterprise</h4>
                  <div className="text-2xl font-black mb-4 text-cyan-400">$599/mo</div>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Everything in Professional</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Account manager</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Strategy sessions</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> 24/7 phone support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-24 px-8 border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-lg">Why Choose OptiVoic?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/10 transition-all">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Fast Deployment</h3>
                <p className="text-gray-400 leading-relaxed">Your website launches in 10-30 days, not months. We combine templates with custom coding for speed without sacrificing quality.</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/10 transition-all">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Conversion-Focused</h3>
                <p className="text-gray-400 leading-relaxed">Every element is designed to capture leads and book appointments. Our AI learns from visitor behavior to continuously optimize results.</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/10 transition-all">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Smart Pricing</h3>
                <p className="text-gray-400 leading-relaxed">$2,500-$6,500 upfront + monthly support. Transparent costs with guaranteed ROI. No surprise fees or hidden charges.</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/10 transition-all">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Tech Leadership</h3>
                <p className="text-gray-400 leading-relaxed">Built on React, Vite, Supabase, and AI APIs. Modern architecture that scales as your business grows.</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/10 transition-all">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Your Success</h3>
                <p className="text-gray-400 leading-relaxed">Ongoing optimization and support. We don't hand off your site—we partner with you to drive real business results.</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:bg-white/10 transition-all">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Proven Expertise</h3>
                <p className="text-gray-400 leading-relaxed">OptiVoic brings template design expertise + custom development + AI integration. Specialized for high-ROI web solutions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="py-24 px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-lg">Ready to Increase Your Service Appointments?</h2>
              <p className="text-xl text-gray-400">Get a custom AI-powered website designed specifically for home service businesses like yours</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-widest">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-widest">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-widest">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleContactChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-widest">
                    How Can We Help? *
                  </label>
                  <textarea
                    name="help"
                    value={contactForm.help}
                    onChange={handleContactChange}
                    required
                    rows={5}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none resize-none"
                    placeholder="Tell us about your home service business (plumbing, HVAC, electrical, etc.), current challenges with appointment booking, your goals for online lead generation, and any specific features you need..."
                  />
                </div>

                {formStatus === 'success' && (
                  <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4">
                    <p className="text-green-400 font-semibold">✅ Thank you! Your message has been sent successfully.</p>
                    <p className="text-green-300 text-sm mt-1">We'll review your home service business needs and get back to you within 24 hours with a custom AI website proposal. A confirmation email has been sent to {contactForm.email}.</p>
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
                  disabled={formStatus === 'success'}
                >
                  {formStatus === 'success' ? 'Message Sent!' : 'Send Message'}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  By submitting this form, you agree to receive communications from OptiVoic.
                  We'll send a copy of this message to your email address.
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
};

export default OptiVoicLanding;