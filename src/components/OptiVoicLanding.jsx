import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const OptiVoicLanding = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    { text: "👋 Hi! Welcome to Thompson Plumbing. I'm here to help schedule your appointment or answer questions about our services. What brings you in today?", sender: 'bot' }
  ]);
  const [chatInput, setChatInput] = useState('');

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

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#F5F7FA', color: '#2C3E50', lineHeight: '1.6' }}>
      <style>
        {`
          :root {
            --color-primary: #2180A0;
            --color-primary-dark: #1a6680;
            --color-accent: #E67E22;
            --color-success: #27AE60;
            --color-bg: #F5F7FA;
            --color-surface: #FFFFFF;
            --color-text: #2C3E50;
            --color-text-light: #7F8C8D;
            --color-border: #E1E8ED;
          }

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: var(--color-bg);
            color: var(--color-text);
            line-height: 1.6;
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
          }

          /* Header */
          header {
            background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
            color: white;
            padding: 20px 0;
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }

          .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .logo {
            font-size: 24px;
            font-weight: bold;
            letter-spacing: 1px;
          }

          nav a {
            color: white;
            margin-left: 30px;
            text-decoration: none;
            font-size: 14px;
            transition: opacity 0.3s;
          }

          nav a:hover {
            opacity: 0.8;
          }

          /* Hero Section */
          .hero {
            background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
            color: white;
            padding: 80px 20px;
            text-align: center;
          }

          .hero h1 {
            font-size: 48px;
            margin-bottom: 20px;
            line-height: 1.2;
          }

          .hero-subtitle {
            font-size: 20px;
            margin-bottom: 30px;
            opacity: 0.95;
          }

          .cta-button {
            display: inline-block;
            background: var(--color-accent);
            color: white;
            padding: 15px 40px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            text-decoration: none;
          }

          .cta-button:hover {
            background: #D35400;
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(230, 126, 34, 0.3);
          }

          /* Tabs */
          .tabs {
            display: flex;
            gap: 10px;
            margin: 40px 0 30px 0;
            flex-wrap: wrap;
          }

          .tab-button {
            padding: 12px 24px;
            border: 2px solid var(--color-border);
            background: white;
            color: var(--color-text);
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s;
          }

          .tab-button.active {
            background: var(--color-primary);
            color: white;
            border-color: var(--color-primary);
          }

          .tab-button:hover {
            border-color: var(--color-primary);
          }

          .tab-content {
            display: none;
            animation: fadeIn 0.3s;
          }

          .tab-content.active {
            display: block;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          /* Grid */
          .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin: 40px 0;
          }

          /* Card */
          .card {
            background: white;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            transition: all 0.3s;
            border: 1px solid var(--color-border);
          }

          .card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 24px rgba(0,0,0,0.12);
          }

          .card-header {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
          }

          .card-icon {
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            margin-right: 15px;
            color: white;
          }

          .card h3 {
            color: var(--color-primary);
            margin-bottom: 10px;
          }

          .card p {
            color: var(--color-text-light);
            font-size: 14px;
            line-height: 1.6;
          }

          /* Feature List */
          .feature-list {
            list-style: none;
            margin: 20px 0;
          }

          .feature-list li {
            padding: 10px 0;
            border-bottom: 1px solid var(--color-border);
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .feature-list li:last-child {
            border-bottom: none;
          }

          .feature-list li:before {
            content: "✓";
            color: var(--color-success);
            font-weight: bold;
            font-size: 18px;
          }

          /* AI Chat Demo */
          .chat-demo {
            background: white;
            border-radius: 12px;
            padding: 30px;
            margin: 40px 0;
            border: 1px solid var(--color-border);
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          }

          .chat-messages {
            height: 400px;
            overflow-y: auto;
            margin-bottom: 20px;
            display: flex;
            flex-direction: column;
            gap: 15px;
            background: #F9FAFB;
            padding: 20px;
            border-radius: 8px;
          }

          .message {
            display: flex;
            gap: 10px;
            animation: slideIn 0.3s;
          }

          @keyframes slideIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .message.user {
            justify-content: flex-end;
          }

          .message-bubble {
            max-width: 70%;
            padding: 12px 16px;
            border-radius: 12px;
            font-size: 14px;
            line-height: 1.5;
          }

          .message.bot .message-bubble {
            background: var(--color-primary);
            color: white;
            border-bottom-left-radius: 4px;
          }

          .message.user .message-bubble {
            background: #E8EEF5;
            color: var(--color-text);
            border-bottom-right-radius: 4px;
          }

          .chat-input-area {
            display: flex;
            gap: 10px;
          }

          .chat-input-area input {
            flex: 1;
            padding: 12px;
            border: 1px solid var(--color-border);
            border-radius: 6px;
            font-size: 14px;
          }

          .chat-input-area button {
            padding: 12px 24px;
            background: var(--color-primary);
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s;
          }

          .chat-input-area button:hover {
            background: var(--color-primary-dark);
          }

          /* Pricing Table */
          .pricing-table {
            width: 100%;
            border-collapse: collapse;
            margin: 30px 0;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          }

          .pricing-table th {
            background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
            color: white;
            padding: 20px;
            text-align: left;
            font-weight: 600;
          }

          .pricing-table td {
            padding: 15px 20px;
            border-bottom: 1px solid var(--color-border);
          }

          .pricing-table tbody tr:hover {
            background: var(--color-bg);
          }

          .highlight-cell {
            background: linear-gradient(135deg, rgba(33, 128, 160, 0.1) 0%, rgba(26, 102, 128, 0.1) 100%);
            color: var(--color-primary);
            font-weight: 600;
          }

          /* Metrics */
          .metrics {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 40px 0;
          }

          .metric-card {
            background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
            color: white;
            padding: 30px;
            border-radius: 12px;
            text-align: center;
          }

          .metric-value {
            font-size: 36px;
            font-weight: bold;
            margin-bottom: 5px;
          }

          .metric-label {
            font-size: 14px;
            opacity: 0.9;
          }

          /* Section */
          section {
            padding: 60px 20px;
            background: white;
            margin-bottom: 20px;
          }

          section:nth-child(odd) {
            background: var(--color-bg);
          }

          section h2 {
            color: var(--color-primary);
            font-size: 36px;
            margin-bottom: 30px;
            text-align: center;
          }

          /* Footer */
          footer {
            background: var(--color-text);
            color: white;
            padding: 40px 20px;
            text-align: center;
          }

          footer p {
            margin: 10px 0;
            font-size: 14px;
          }

          /* Responsive */
          @media (max-width: 768px) {
            .hero h1 {
              font-size: 36px;
            }

            .header-content {
              flex-direction: column;
              gap: 15px;
            }

            nav {
              display: flex;
              gap: 15px;
              justify-content: center;
              flex-wrap: wrap;
            }

            nav a {
              margin-left: 0;
            }

            .chat-messages {
              height: 300px;
            }

            .message-bubble {
              max-width: 85%;
            }
          }
        `}
      </style>

      <header>
        <div className="container">
          <div className="header-content">
            <Link to="/" className="text-gray-400 hover:text-cyan-400 font-semibold flex items-center gap-2 transition-colors">
              <span>←</span> Back to Storefront
            </Link>
            <div className="logo">OptiVoic</div>
            <nav>
              <a href="#platform" onClick={(e) => { e.preventDefault(); scrollToSection('platform'); }}>Platform</a>
              <a href="#pricing" onClick={(e) => { e.preventDefault(); scrollToSection('pricing'); }}>Pricing</a>
              <a href="#demo" onClick={(e) => { e.preventDefault(); scrollToSection('demo'); }}>AI Demo</a>
              <a href="#results" onClick={(e) => { e.preventDefault(); scrollToSection('results'); }}>Results</a>
            </nav>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <h1>AI-Powered Websites for Home Service Businesses</h1>
          <p className="hero-subtitle">Convert more leads with intelligent appointment booking, smart qualification, and personalized customer experiences</p>
          <button className="cta-button" onClick={() => scrollToSection('demo')}>See AI in Action</button>
        </div>
      </section>

      <section id="platform">
        <div className="container">
          <h2>Our Complete Solution</h2>

          <div className="tabs">
            <button className={`tab-button ${activeTab === 0 ? 'active' : ''}`} onClick={() => switchTab(0)}>Platform</button>
            <button className={`tab-button ${activeTab === 1 ? 'active' : ''}`} onClick={() => switchTab(1)}>AI Features</button>
            <button className={`tab-button ${activeTab === 2 ? 'active' : ''}`} onClick={() => switchTab(2)}>Integration</button>
          </div>

          {activeTab === 0 && (
            <div className="tab-content active">
              <div className="grid">
                <div className="card">
                  <div className="card-header">
                    <div className="card-icon">🎨</div>
                    <h3>Beautiful Design</h3>
                  </div>
                  <p>Professional, mobile-optimized websites built with modern tech (React, Vite, Node.js)</p>
                  <ul className="feature-list">
                    <li>Mobile-first responsive design</li>
                    <li>Fast load times (&lt; 2 seconds)</li>
                    <li>SEO-optimized structure</li>
                    <li>Accessibility compliant</li>
                  </ul>
                </div>

                <div className="card">
                  <div className="card-header">
                    <div className="card-icon">🔐</div>
                    <h3>Secure Infrastructure</h3>
                  </div>
                  <p>Enterprise-grade hosting on Supabase with PostgreSQL database</p>
                  <ul className="feature-list">
                    <li>99.9% uptime guarantee</li>
                    <li>SSL/TLS encryption</li>
                    <li>Regular backups</li>
                    <li>GDPR compliant</li>
                  </ul>
                </div>

                <div className="card">
                  <div className="card-header">
                    <div className="card-icon">📊</div>
                    <h3>Analytics Dashboard</h3>
                  </div>
                  <p>Real-time insights into visitor behavior and conversion metrics</p>
                  <ul className="feature-list">
                    <li>Visitor tracking &amp; heatmaps</li>
                    <li>Conversion funnel analysis</li>
                    <li>Lead source attribution</li>
                    <li>Monthly performance reports</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 1 && (
            <div className="tab-content active">
              <div className="grid">
                <div className="card">
                  <div className="card-header">
                    <div className="card-icon">🤖</div>
                    <h3>Smart Chatbot</h3>
                  </div>
                  <p>AI-powered conversational assistant that qualifies leads 24/7</p>
                  <ul className="feature-list">
                    <li>Natural language understanding</li>
                    <li>Service categorization</li>
                    <li>Emergency detection</li>
                    <li>Human handoff</li>
                  </ul>
                </div>

                <div className="card">
                  <div className="card-header">
                    <div className="card-icon">📅</div>
                    <h3>Appointment Booking</h3>
                  </div>
                  <p>Intelligent scheduling that reduces no-shows by 30%</p>
                  <ul className="feature-list">
                    <li>Real-time availability</li>
                    <li>Auto-confirmation SMS</li>
                    <li>Reminder automation</li>
                    <li>Calendar integration</li>
                  </ul>
                </div>

                <div className="card">
                  <div className="card-header">
                    <div className="card-icon">🎯</div>
                    <h3>Personalization Engine</h3>
                  </div>
                  <p>Adaptive content that increases conversion by 15-25%</p>
                  <ul className="feature-list">
                    <li>Behavior-based CTAs</li>
                    <li>Dynamic content reordering</li>
                    <li>Service recommendations</li>
                    <li>Location targeting</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div className="tab-content active">
              <div className="grid">
                <div className="card">
                  <div className="card-header">
                    <div className="card-icon">🔗</div>
                    <h3>CRM Integration</h3>
                  </div>
                  <p>Seamlessly sync leads to your existing systems</p>
                  <ul className="feature-list">
                    <li>HubSpot integration</li>
                    <li>Salesforce compatibility</li>
                    <li>Zapier automation</li>
                    <li>Webhook support</li>
                  </ul>
                </div>

                <div className="card">
                  <div className="card-header">
                    <div className="card-icon">📞</div>
                    <h3>SMS &amp; Email</h3>
                  </div>
                  <p>Automated communication that keeps customers informed</p>
                  <ul className="feature-list">
                    <li>Appointment reminders</li>
                    <li>Follow-up sequences</li>
                    <li>Promotional campaigns</li>
                    <li>Review requests</li>
                  </ul>
                </div>

                <div className="card">
                  <div className="card-header">
                    <div className="card-icon">⭐</div>
                    <h3>Review Management</h3>
                  </div>
                  <p>Manage and display customer reviews across platforms</p>
                  <ul className="feature-list">
                    <li>Google Reviews sync</li>
                    <li>Yelp integration</li>
                    <li>Rating aggregation</li>
                    <li>Reputation monitoring</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="demo">
        <div className="container">
          <h2>AI Assistant Demo</h2>
          <p style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--color-text-light)' }}>
            Click "Try AI Booking" to see our intelligent chatbot in action. This simulates how customers interact with your site 24/7.
          </p>

          <div className="chat-demo">
            <div className="chat-messages" style={{ height: '400px', overflowY: 'auto', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '15px', background: '#F9FAFB', padding: '20px', borderRadius: '8px' }}>
              {chatMessages.map((message, index) => (
                <div key={index} className={`message ${message.sender}`}>
                  <div className="message-bubble">
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="chat-input-area">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type a message..."
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button onClick={sendMessage}>Send</button>
            </div>

            <div style={{ marginTop: '20px', padding: '15px', background: 'var(--color-bg)', borderRadius: '8px' }}>
              <p style={{ marginBottom: '10px', fontWeight: '600' }}>💡 Try these messages:</p>
              <button style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', margin: '5px 0', background: 'white', border: '1px solid var(--color-border)', borderRadius: '6px', cursor: 'pointer' }} onClick={() => sendPredefinedMessage('I have a leaky faucet')}>I have a leaky faucet</button>
              <button style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', margin: '5px 0', background: 'white', border: '1px solid var(--color-border)', borderRadius: '6px', cursor: 'pointer' }} onClick={() => sendPredefinedMessage('Water heater is broken, need emergency service ASAP')}>Water heater emergency - need service ASAP</button>
              <button style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', margin: '5px 0', background: 'white', border: '1px solid var(--color-border)', borderRadius: '6px', cursor: 'pointer' }} onClick={() => sendPredefinedMessage('I want to schedule maintenance for Tuesday')}>Schedule maintenance for Tuesday</button>
            </div>
          </div>
        </div>
      </section>

      <section id="results">
        <div className="container">
          <h2>Proven Results</h2>

          <div className="metrics">
            <div className="metric-card">
              <div className="metric-value">+210%</div>
              <div className="metric-label">Avg. Lead Increase</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">15.6%</div>
              <div className="metric-label">Conversion Rate</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">-30%</div>
              <div className="metric-label">No-Show Rate</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">23%</div>
              <div className="metric-label">AI Conversion Lift</div>
            </div>
          </div>

          <h3 style={{ marginTop: '40px', marginBottom: '20px', color: 'var(--color-primary)' }}>Industry Benchmarks</h3>

          <table className="pricing-table">
            <thead>
              <tr>
                <th>Service Type</th>
                <th>Avg. Website Conversion</th>
                <th>With OptiVoic AI</th>
                <th>Improvement</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Plumbing</strong></td>
                <td>15.61%</td>
                <td className="highlight-cell">19-22%</td>
                <td><strong style={{ color: 'var(--color-success)' }}>+23%</strong></td>
              </tr>
              <tr>
                <td><strong>HVAC</strong></td>
                <td>15.11%</td>
                <td className="highlight-cell">18-21%</td>
                <td><strong style={{ color: 'var(--color-success)' }}>+23%</strong></td>
              </tr>
              <tr>
                <td><strong>Electrical</strong></td>
                <td>12-14%</td>
                <td className="highlight-cell">15-18%</td>
                <td><strong style={{ color: 'var(--color-success)' }}>+23%</strong></td>
              </tr>
              <tr>
                <td><strong>General Services</strong></td>
                <td>2-5%</td>
                <td className="highlight-cell">5-8%</td>
                <td><strong style={{ color: 'var(--color-success)' }}>+60%</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="pricing">
        <div className="container">
          <h2>Simple, Transparent Pricing</h2>

          <table className="pricing-table">
            <thead>
              <tr>
                <th>Package</th>
                <th>Price</th>
                <th>Setup Time</th>
                <th>Included</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>MVP</strong></td>
                <td className="highlight-cell">$2,500</td>
                <td>10 days</td>
                <td>Template, AI chatbot, basic booking, local SEO</td>
              </tr>
              <tr>
                <td><strong>Custom (Recommended)</strong></td>
                <td className="highlight-cell">$4,500</td>
                <td>20 days</td>
                <td>Custom design, advanced AI, full integration, analytics</td>
              </tr>
              <tr>
                <td><strong>Enterprise</strong></td>
                <td className="highlight-cell">$6,500+</td>
                <td>30 days</td>
                <td>Everything + CRM integration, mobile app, predictive analytics</td>
              </tr>
            </tbody>
          </table>

          <h3 style={{ marginTop: '40px', marginBottom: '20px', color: 'var(--color-primary)', textAlign: 'center' }}>Monthly Support Plans</h3>

          <div className="grid">
            <div className="card">
              <h3>Basic - $199/mo</h3>
              <p style={{ color: 'var(--color-text-light)', marginBottom: '20px' }}>Essential care</p>
              <ul className="feature-list">
                <li>Hosting &amp; uptime</li>
                <li>Security updates</li>
                <li>24/7 monitoring</li>
                <li>Email support</li>
              </ul>
            </div>

            <div className="card">
              <h3>Professional - $399/mo</h3>
              <p style={{ color: 'var(--color-text-light)', marginBottom: '20px', fontWeight: '600', color: 'var(--color-primary)' }}>⭐ Most Popular</p>
              <ul className="feature-list">
                <li>Everything in Basic</li>
                <li>Monthly optimization</li>
                <li>Analytics reviews</li>
                <li>Priority support</li>
              </ul>
            </div>

            <div className="card">
              <h3>Enterprise - $599/mo</h3>
              <p style={{ color: 'var(--color-text-light)', marginBottom: '20px' }}>Full-service growth</p>
              <ul className="feature-list">
                <li>Everything in Professional</li>
                <li>Account manager</li>
                <li>Strategy sessions</li>
                <li>24/7 phone support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <h2>Why Choose OptiVoic?</h2>

          <div className="grid">
            <div className="card">
              <div className="card-header">
                <div className="card-icon">⚡</div>
                <h3>Fast Deployment</h3>
              </div>
              <p>Your website launches in 10-30 days, not months. We combine templates with custom coding for speed without sacrificing quality.</p>
            </div>

            <div className="card">
              <div className="card-header">
                <div className="card-icon">🎯</div>
                <h3>Conversion-Focused</h3>
              </div>
              <p>Every element is designed to capture leads and book appointments. Our AI learns from visitor behavior to continuously optimize results.</p>
            </div>

            <div className="card">
              <div className="card-header">
                <div className="card-icon">💰</div>
                <h3>Smart Pricing</h3>
              </div>
              <p>$2,500-$6,500 upfront + monthly support. Transparent costs with guaranteed ROI. No surprise fees or hidden charges.</p>
            </div>

            <div className="card">
              <div className="card-header">
                <div className="card-icon">🚀</div>
                <h3>Tech Leadership</h3>
              </div>
              <p>Built on React, Vite, Supabase, and AI APIs. Modern architecture that scales as your business grows.</p>
            </div>

            <div className="card">
              <div className="card-header">
                <div className="card-icon">🤝</div>
                <h3>Your Success</h3>
              </div>
              <p>Ongoing optimization and support. We don't hand off your site—we partner with you to drive real business results.</p>
            </div>

            <div className="card">
              <div className="card-header">
                <div className="card-icon">🏆</div>
                <h3>Proven Expertise</h3>
              </div>
              <p>OptiVoic brings template design expertise + custom development + AI integration. Specialized for high-ROI web solutions.</p>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <p>&copy; 2026 OptiVoic. AI-Enhanced Web Solutions for Home Service Businesses.</p>
          <p>Built for plumbing, HVAC, electrical, and service-based businesses.</p>
          <p style={{ marginTop: '20px', opacity: '0.7' }}><strong>Derek Crosby</strong> - Founder | derek@optivoic.com</p>
        </div>
      </footer>
    </div>
  );
};

export default OptiVoicLanding;