import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const NoiseOverlay = () => (
  <div 
    className="fixed inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-0" 
    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
  ></div>
);

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#020202] text-gray-300 font-sans selection:bg-cyan-500 selection:text-white relative overflow-hidden">
      <NoiseOverlay />
      <div className="fixed bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-cyan-600/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <nav className="relative z-50 border-b border-white/10 py-6 px-8 flex items-center bg-black/30 backdrop-blur-2xl">
        <Link to="/" className="text-gray-400 hover:text-cyan-400 font-semibold flex items-center gap-2 transition-colors">
          <span>←</span> Back to Storefront
        </Link>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-8 py-20">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">PRIVACY POLICY</h1>
        <p className="text-gray-500 mb-2 uppercase tracking-widest text-sm font-bold">OptiVoic Consulting and Software (d/b/a OptiVoic)</p>
        <p className="text-gray-500 mb-8 uppercase tracking-widest text-sm font-bold">Effective Date: March 1, 2026 | Last Updated: February 27, 2026</p>

        <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-12">
          <p className="font-semibold text-white mb-2">Contact Information:</p>
          <p>Email: <a href="mailto:hello@optivoic.com" className="text-cyan-400 hover:underline">hello@optivoic.com</a></p>
          <p>Website: <a href="https://optivoic.com" className="text-cyan-400 hover:underline">https://optivoic.com</a></p>
        </div>

        <div className="space-y-10 text-lg leading-relaxed font-light">
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p className="mb-4">OptiVoic Consulting and Software ("OptiVoic," "we," "us," or "our") is committed to protecting your privacy and ensuring transparency in how we collect, use, store, and share your personal information. This Privacy Policy applies to all OptiVoic digital properties, including our website at https://optivoic.com and any related services, products, and platforms (collectively, the "Services").</p>
            <p className="mb-4">We provide B2C and B2B template systems designed to help individuals and businesses track various lifestyle and business operations, including tools for gig workers to track revenue and taxes, digital nomad route trackers, and similar workflow solutions primarily built using Excel and Notion. We also offer technology consulting services to B2B customers in the areas of Tech and AI Systems, and E-commerce & Reselling.</p>
            <p className="mb-4">We never sell your personal data to third-party companies. We respect and honor consumer data privacy rights and are committed to complying with all applicable federal, state, and local data protection laws in the United States.</p>
            <p className="mb-2">This Privacy Policy is designed to help you understand:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>What personal information we collect and why we collect it</li>
              <li>How we use, store, and protect your information</li>
              <li>Your rights regarding your personal data</li>
              <li>How to exercise those rights</li>
              <li>Our legal basis for processing your information</li>
            </ul>
            <p className="mb-4">By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with our practices, please do not use our Services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
            <p className="mb-4">We collect various types of information to provide, maintain, improve, and protect our Services. The information we collect falls into the following categories:</p>
            
            <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">2.1 Information You Provide Directly</h3>
            <p className="mb-2"><strong>Account Information:</strong> When you create an account or register for our Services, we may collect:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Name (first and last)</li>
              <li>Email address</li>
              <li>Username and password</li>
              <li>Company name and job title (for B2B customers)</li>
              <li>Professional information related to consulting engagements</li>
            </ul>
            
            <p className="mb-2"><strong>Payment Information (Consulting Services Only):</strong> For our technology consulting services, we collect payment information necessary to process transactions, including:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Credit card or debit card information</li>
              <li>Bank account details for wire transfers or ACH payments</li>
              <li>Billing address</li>
              <li>Payment history and invoice records</li>
            </ul>
            
            <div className="bg-cyan-900/20 border-l-4 border-cyan-500 p-4 mb-4">
              <p className="mb-2"><strong>Important Note:</strong> For customers purchasing template systems through our website or our partner Gumroad, we do NOT collect or store payment information. All payment processing for these transactions is handled securely by PayPal or Gumroad through direct APIs using encrypted workflows and processes.</p>
              <p>For consulting services, payment information is stored in a secure, encrypted CRM environment, and payments are typically processed through PayPal, although we do accept offline payments as well.</p>
            </div>

            <p className="mb-2"><strong>Communications:</strong> When you contact us via email, contact forms, support tickets, or other communication channels, we collect:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>The content of your messages</li>
              <li>Your contact information</li>
              <li>Any attachments or files you send</li>
              <li>Communication preferences</li>
            </ul>

            <p className="mb-2"><strong>Consulting Engagement Information:</strong> For B2B consulting clients, we may collect:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Project requirements and specifications</li>
              <li>Business objectives and goals</li>
              <li>Technical environment details</li>
              <li>Contractual documentation</li>
              <li>Work product and deliverables</li>
            </ul>

            <p className="mb-4"><strong>User-Provided Data for Template Systems:</strong> When you use our template systems, you may input personal data relevant to your use case (e.g., revenue figures, expense tracking, travel routes). This data remains under your control within the templates you download, and we do not automatically collect or access this information unless you share it with us for support purposes.</p>

            <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">2.2 Information Collected Automatically</h3>
            <p className="mb-4"><strong>Google Analytics Data Collection:</strong> We use Google Analytics 4 (GA4) to understand how visitors interact with our Services. This involves several specific data collection methods that you should be aware of:</p>
            
            <p className="mb-2"><strong>Google Signals Data Collection:</strong> We have enabled Google Signals in Google Analytics, which allows us to collect additional data about users who are signed into their Google accounts and have turned on Ads Personalization. Google Signals enables:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Cross-device tracking and reporting</li>
              <li>Remarketing with Google Analytics audiences</li>
              <li>Advertising reporting features including Demographics and Interests reports</li>
              <li>Collection of aggregated demographic data (age, gender, interests)</li>
            </ul>
            <p className="mb-4">When Google Signals is active, Google Analytics associates your activity on our website with your Google account information. This data is used in aggregate form to help us understand user behavior patterns and improve our Services.</p>

            <p className="mb-2"><strong>User-ID Collection:</strong> We may implement User-ID tracking in Google Analytics, which allows us to associate multiple sessions and activity from different devices with a unique, non-personally identifiable ID. This helps us:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Understand user engagement across multiple sessions and devices</li>
              <li>Analyze user behavior patterns more accurately</li>
              <li>Provide a better user experience across platforms</li>
            </ul>
            <p className="mb-4">The User-ID is a unique identifier we assign to users, but it is NOT directly linked to personally identifiable information in our Google Analytics reporting. However, it may be associated with your account information in our internal systems.</p>

            <p className="mb-2"><strong>Granular Location and Device Data Collection:</strong> Through Google Analytics and other technologies, we collect granular location and device information, including:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li><strong>Location Data:</strong> IP address (which can indicate approximate geographic location), City and region-level location data, Language and locale settings, Time zone</li>
              <li><strong>Device Data:</strong> Device type (desktop, mobile, tablet), Operating system and version, Browser type and version, Screen resolution and display settings, Device manufacturer and model, Unique device identifiers, Mobile network information (when applicable)</li>
            </ul>

            <p className="mb-2"><strong>Usage Data and Analytics:</strong> We automatically collect information about how you interact with our Services:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Pages viewed and content accessed</li>
              <li>Time spent on pages</li>
              <li>Navigation paths and click behavior</li>
              <li>Search queries within our Services</li>
              <li>Referring and exit pages</li>
              <li>Date and time stamps of activities</li>
              <li>Error logs and performance data</li>
            </ul>

            <p className="mb-4"><strong>Google Tag Manager:</strong> We use Google Tag Manager (GTM) to manage and deploy analytics and marketing tags on our website. GTM itself does not collect personal data, but it enables other services (like Google Analytics) to collect data. Any data collection performed through tags managed by GTM is subject to the privacy policies of those respective services and this Privacy Policy.</p>

            <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">2.3 Cookies and Similar Technologies</h3>
            <p className="mb-4">We use cookies and similar tracking technologies to collect information and improve your experience. A cookie is a small text file stored on your device that helps us recognize you and remember your preferences.</p>
            
            <p className="mb-2"><strong>Types of Cookies We Use:</strong></p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li><strong>Essential Cookies:</strong> Necessary for the website to function properly, including authentication and security</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our Services through Google Analytics</li>
              <li><strong>Performance Cookies:</strong> Collect information about how you use our Services to improve functionality</li>
            </ul>

            <p className="mb-2"><strong>Cookie Duration:</strong></p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li><strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser</li>
              <li><strong>Persistent Cookies:</strong> Remain on your device for a set period or until manually deleted</li>
            </ul>
            <p className="mb-4">You can control cookie preferences through your browser settings. However, disabling cookies may affect the functionality of our Services.</p>

            <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">2.4 Information from Third-Party Sources</h3>
            <p className="mb-2">We may receive information about you from third-party sources, including:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Payment processors (PayPal, Gumroad) for transaction verification</li>
              <li>Business partners and referral sources for consulting engagements</li>
              <li>Publicly available sources for business contact information</li>
              <li>Service providers that help us verify or supplement information</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">2.5 Information We Do NOT Collect</h3>
            <p className="mb-2">To be clear, we do NOT collect the following types of sensitive personal information:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1 text-red-300">
              <li>Health information or medical records</li>
              <li>Biometric data (fingerprints, facial recognition, etc.)</li>
              <li>Social Security numbers or other government-issued identification numbers</li>
              <li>Personal information from children under 13 years of age</li>
              <li>Precise geolocation data (GPS coordinates)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">We use the personal information we collect for legitimate business purposes, including:</p>
            
            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">3.1 Providing and Managing Services</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Creating and managing user accounts</li>
              <li>Processing transactions and delivering purchased template systems</li>
              <li>Providing technology consulting services to B2B clients</li>
              <li>Responding to inquiries, support requests, and customer service needs</li>
              <li>Authenticating users and preventing unauthorized access</li>
              <li>Delivering product updates, downloads, and access to purchased materials</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">3.2 Improving and Developing Services</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Analyzing usage patterns and user behavior to improve our Services</li>
              <li>Conducting research and development for new products and features</li>
              <li>Testing new features and functionality</li>
              <li>Identifying and fixing technical issues and bugs</li>
              <li>Optimizing website performance and user experience</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">3.3 Communication and Marketing</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Sending transactional emails (order confirmations, receipts, account notifications)</li>
              <li>Providing customer support and responding to communications</li>
              <li>Sending newsletters, product updates, and promotional materials (with your consent)</li>
              <li>Notifying you about changes to our Services, policies, or terms</li>
              <li>Conducting surveys and gathering feedback</li>
            </ul>
            <p className="mb-4">You may opt out of marketing communications at any time by following the unsubscribe instructions in our emails or contacting us directly.</p>

            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">3.4 Analytics and Business Intelligence</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Understanding how users discover and use our Services</li>
              <li>Measuring the effectiveness of our marketing campaigns</li>
              <li>Creating aggregated, de-identified reports and statistics</li>
              <li>Identifying trends and patterns in user behavior</li>
              <li>Making data-driven business decisions</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">3.5 Advanced Settings for Ads Personalization</h3>
            <p className="mb-2"><strong>Google Analytics Advertising Features:</strong> We have enabled certain advertising features in Google Analytics, including:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Remarketing with Google Analytics</li>
              <li>Google Display Network Impression Reporting</li>
              <li>Google Analytics Demographics and Interest Reporting</li>
              <li>Integrated services that require Google Analytics to collect data for advertising purposes</li>
            </ul>
            <p className="mb-2">These features use cookies and similar technologies to collect data about your online activity over time and across different websites. This allows us to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Display relevant advertisements to you on other websites you visit</li>
              <li>Measure the effectiveness of our advertising campaigns</li>
              <li>Understand the demographics and interests of our audience</li>
              <li>Create custom audiences for targeted marketing</li>
            </ul>
            <p className="mb-4"><strong>Your Control Over Ads Personalization:</strong> You can opt out of Google Analytics for Display Advertising and customize Google Display Network ads using the Google Ads Settings page at <a href="https://www.google.com/settings/ads" className="text-cyan-400 hover:underline">https://www.google.com/settings/ads</a>. Additionally, you can opt out of Google Analytics tracking entirely by installing the Google Analytics Opt-out Browser Add-on at <a href="https://tools.google.com/dlpage/gaoptout" className="text-cyan-400 hover:underline">https://tools.google.com/dlpage/gaoptout</a>.</p>
            <p className="mb-4">We may implement ads personalization features in the future, and we will update this Privacy Policy accordingly. Any ads personalization will be subject to your consent where required by applicable law.</p>

            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">3.6 Security and Fraud Prevention</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Protecting against fraud, abuse, and unauthorized access</li>
              <li>Detecting and preventing security incidents</li>
              <li>Monitoring for suspicious or malicious activity</li>
              <li>Enforcing our Terms of Service and other policies</li>
              <li>Investigating and responding to security threats</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">3.7 Legal Compliance and Protection</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Complying with applicable laws, regulations, and legal processes</li>
              <li>Responding to lawful requests from government authorities</li>
              <li>Protecting our legal rights and interests</li>
              <li>Enforcing contracts and agreements</li>
              <li>Resolving disputes and claims</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">3.8 Future Use of AI and Machine Learning</h3>
            <p className="mb-2">While we do not currently use artificial intelligence or machine learning technologies to process personal data, we may implement such technologies in the future to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Provide personalized recommendations for template systems</li>
              <li>Improve customer support through AI-assisted responses</li>
              <li>Enhance our consulting services with data-driven insights</li>
              <li>Automate routine business processes</li>
            </ul>
            <p className="mb-4">Should we implement AI or machine learning that involves personal data processing, we will update this Privacy Policy and obtain any necessary consent required by applicable law. Any AI-driven processing will be conducted in accordance with principles of fairness, transparency, and accountability.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. How We Share Your Information</h2>
            <p className="mb-4">We never sell your personal information to third parties. However, we may share your information in the following limited circumstances:</p>

            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">4.1 Service Providers and Business Partners</h3>
            <p className="mb-2">We may share information with trusted third-party service providers who perform services on our behalf, including:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li><strong>Payment Processors:</strong> PayPal and Gumroad for processing payments</li>
              <li><strong>Analytics Providers:</strong> Google Analytics for website analytics and insights</li>
              <li><strong>Technology Infrastructure:</strong> Hosting providers, content delivery networks, and cloud storage services</li>
              <li><strong>Customer Support Tools:</strong> Email service providers and help desk software</li>
              <li><strong>CRM Systems:</strong> For managing consulting client relationships and project information</li>
            </ul>
            <p className="mb-4">These service providers are contractually obligated to use your information only for the purposes we specify and to maintain appropriate security measures. They are prohibited from selling or using your data for their own purposes.</p>

            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">4.2 Business Transactions</h3>
            <p className="mb-4">If OptiVoic is involved in a merger, acquisition, sale of assets, bankruptcy, or other business transaction, your information may be transferred as part of that transaction. We will notify you via email and/or prominent notice on our website of any change in ownership or use of your personal information, as well as any choices you may have regarding your information.</p>

            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">4.3 Legal Requirements and Protection</h3>
            <p className="mb-2">We may disclose your information when required or permitted by law, including:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>To comply with legal obligations, court orders, subpoenas, or other legal processes</li>
              <li>To respond to lawful requests from government authorities or law enforcement</li>
              <li>To protect the rights, property, or safety of OptiVoic, our users, or the public</li>
              <li>To enforce our Terms of Service or other agreements</li>
              <li>To investigate, prevent, or take action regarding illegal activities, suspected fraud, or security threats</li>
              <li>To exercise or defend legal claims</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">4.4 With Your Consent</h3>
            <p className="mb-4">We may share your information with third parties when you explicitly consent to such sharing. We will clearly disclose the purpose and recipient of the information before obtaining your consent.</p>

            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">4.5 Aggregated and De-Identified Data</h3>
            <p className="mb-4">We may share aggregated, de-identified, or anonymized data that cannot reasonably be used to identify you. This includes statistical information, research findings, and industry benchmarks. Such data is not considered personal information and is not subject to this Privacy Policy.</p>

            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">4.6 No Data Transfers Outside the United States</h3>
            <p className="mb-4">Currently, we do not transfer your personal data outside the United States. All data processing and storage occurs within the United States. Should this change in the future, we will update this Privacy Policy and implement appropriate safeguards to protect your data in accordance with applicable law.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Data Retention</h2>
            
            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">5.1 Retention Policy</h3>
            <p className="mb-4">We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.</p>
            <p className="mb-4"><strong>General Retention:</strong> Personal data collected through our Services is retained in perpetuity or until you request deletion of your data from our systems.</p>
            <p className="mb-2">This retention policy allows us to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Maintain historical records for business continuity</li>
              <li>Provide ongoing support for purchased products</li>
              <li>Preserve data for legal and compliance purposes</li>
              <li>Honor our contractual obligations to consulting clients</li>
            </ul>

            <p className="mb-2"><strong>Specific Retention Periods:</strong></p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li><strong>Account Information:</strong> Retained while your account is active and thereafter until deletion is requested</li>
              <li><strong>Transaction Records:</strong> Retained for a minimum of 7 years for tax and accounting compliance</li>
              <li><strong>Consulting Engagement Records:</strong> Retained for the duration of the engagement plus 7 years for contractual and legal purposes</li>
              <li><strong>Payment Information:</strong> Retained in accordance with payment processor policies and financial record-keeping requirements</li>
              <li><strong>Communication Records:</strong> Retained for customer service purposes and as long as relevant to ongoing relationships</li>
              <li><strong>Analytics Data:</strong> Google Analytics data is retained according to our configured retention settings (currently set to 14 months for user-level and event-level data)</li>
              <li><strong>Marketing Data:</strong> Retained until you opt out of marketing communications or request deletion</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">5.2 Data Deletion</h3>
            <p className="mb-2">You have the right to request deletion of your personal data at any time (subject to legal exceptions described in Section 7). Upon receiving a verified deletion request, we will:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Delete or de-identify your personal information from our active systems</li>
              <li>Notify our service providers to delete your data from their systems</li>
              <li>Retain only what is necessary for legal, tax, audit, or fraud prevention purposes</li>
              <li>Complete the deletion process within a reasonable timeframe (typically 30-45 days)</li>
            </ul>
            
            <p className="mb-2"><strong>Exceptions to Deletion:</strong> We may retain certain information when necessary to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Complete transactions or fulfill services you requested</li>
              <li>Comply with legal obligations, including tax and financial record-keeping requirements</li>
              <li>Detect and prevent fraud, abuse, or security incidents</li>
              <li>Resolve disputes and enforce our agreements</li>
              <li>Exercise or defend legal claims</li>
              <li>Maintain backup systems for disaster recovery (backups are deleted according to our retention schedule)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">5.3 Data Minimization Practices</h3>
            <p className="mb-2">While we retain data in perpetuity by default, we are committed to data minimization principles:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>We only collect data that is necessary for identified purposes</li>
              <li>We regularly review data holdings to identify information no longer needed</li>
              <li>We encourage users to exercise their deletion rights</li>
              <li>We maintain appropriate security measures regardless of retention period</li>
            </ul>
            <p className="mb-4"><strong>Important Note on Retention:</strong> Given that our retention policy is indefinite until deletion is requested, we strongly encourage you to exercise your deletion rights if you no longer wish for us to retain your personal data. You can submit a deletion request at any time by contacting us at hello@optivoic.com.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Data Security</h2>
            <p className="mb-4">We take the security of your personal information seriously and implement reasonable administrative, technical, and physical safeguards designed to protect your data from unauthorized access, disclosure, alteration, and destruction.</p>

            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">6.1 Security Measures</h3>
            <p className="mb-2">Our security practices include:</p>
            
            <p className="mb-1 font-semibold">Technical Safeguards:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Encryption of data in transit using industry-standard SSL/TLS protocols</li>
              <li>Encryption of sensitive data at rest, particularly payment information</li>
              <li>Secure authentication mechanisms and password protection</li>
              <li>Regular security updates and patch management</li>
              <li>Firewalls and intrusion detection systems</li>
              <li>Access controls and activity logging</li>
            </ul>

            <p className="mb-1 font-semibold">Administrative Safeguards:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Employee training on data security and privacy practices</li>
              <li>Confidentiality agreements with employees and contractors</li>
              <li>Defined roles and responsibilities for data handling</li>
              <li>Regular security audits and risk assessments</li>
              <li>Incident response and breach notification procedures</li>
              <li>Vendor management and due diligence processes</li>
            </ul>

            <p className="mb-1 font-semibold">Physical Safeguards:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Secure storage of physical records and devices</li>
              <li>Restricted access to facilities where data is stored</li>
              <li>Secure disposal of physical materials containing personal data</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">6.2 Payment Security</h3>
            <p className="mb-4"><strong>For Consulting Services:</strong> Payment information collected for consulting engagements is stored in a secure, encrypted CRM environment with strict access controls. We use industry-standard payment processing methods and comply with Payment Card Industry Data Security Standard (PCI DSS) requirements when handling credit card information.</p>
            <p className="mb-4"><strong>For Template System Purchases:</strong> We do NOT collect or store payment information for customers purchasing template systems through our website or Gumroad. All payment processing is handled by PayPal or Gumroad, which maintain their own rigorous security standards and compliance certifications.</p>

            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">6.3 Third-Party Security</h3>
            <p className="mb-4">We carefully select service providers and require them to maintain appropriate security measures through contractual agreements. However, we cannot guarantee the security practices of third-party services, and you should review their privacy policies and security practices independently.</p>

            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">6.4 Limitations and Your Responsibilities</h3>
            <p className="mb-2">While we implement robust security measures, no method of electronic transmission or storage is 100% secure. We cannot guarantee absolute security of your information. You are responsible for:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>Using strong, unique passwords</li>
              <li>Notifying us immediately of any unauthorized access</li>
              <li>Keeping your contact information current</li>
              <li>Exercising caution when sharing information online</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">6.5 Data Breach Response</h3>
            <p className="mb-2">In the event of a data breach that affects your personal information, we will:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Conduct a prompt investigation to determine the scope and impact</li>
              <li>Take immediate steps to contain and remediate the breach</li>
              <li>Notify affected individuals within the timeframe required by applicable law (typically within 72 hours of discovery)</li>
              <li>Provide information about the breach, the data affected, and steps you can take to protect yourself</li>
              <li>Notify relevant regulatory authorities as required by law</li>
              <li>Implement additional safeguards to prevent future incidents</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Your Privacy Rights</h2>
            <p className="mb-4">Depending on your location and applicable law, you may have certain rights regarding your personal information. OptiVoic respects these rights and provides mechanisms to exercise them.</p>

            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">7.1 Rights Under State Privacy Laws</h3>
            <p className="mb-2">If you are a resident of California, Virginia, Colorado, Connecticut, Utah, Montana, Oregon, Texas, Delaware, Iowa, Indiana, Tennessee, Nebraska, New Hampshire, New Jersey, Kentucky, Maryland, Minnesota, Rhode Island, or other states with comprehensive privacy laws, you have the following rights:</p>
            
            <p className="mb-2"><strong>Right to Know / Access:</strong> You have the right to request:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Confirmation of whether we process your personal information</li>
              <li>Access to the specific personal information we have collected about you</li>
              <li>Categories of personal information collected</li>
              <li>Categories of sources from which we collected the information</li>
              <li>Business or commercial purposes for collecting the information</li>
              <li>Categories of third parties with whom we share personal information</li>
              <li>How long we retain your personal information</li>
            </ul>

            <p className="mb-2"><strong>Right to Delete:</strong> You have the right to request deletion of your personal information, subject to certain exceptions. We must honor your deletion request unless we need to retain the information to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Complete the transaction or service you requested</li>
              <li>Detect and protect against security incidents, fraud, or illegal activity</li>
              <li>Debug and repair errors in our systems</li>
              <li>Exercise free speech or ensure another's right to free speech</li>
              <li>Comply with legal obligations (e.g., tax records, contractual requirements)</li>
              <li>Use the information internally in a lawful manner compatible with your relationship with us</li>
            </ul>

            <p className="mb-4"><strong>Right to Correct:</strong> You have the right to request correction of inaccurate personal information we maintain about you.</p>
            <p className="mb-4"><strong>Right to Data Portability:</strong> You have the right to receive your personal information in a structured, commonly used, and machine-readable format and to transmit that information to another entity.</p>

            <p className="mb-2"><strong>Right to Opt-Out:</strong> You have the right to opt out of:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>The sale of your personal information (Note: We do not sell personal information)</li>
              <li>Sharing of personal information for cross-context behavioral advertising / targeted advertising</li>
              <li>Processing of personal information for profiling in furtherance of automated decisions with legal or similarly significant effects</li>
            </ul>

            <p className="mb-4"><strong>Right to Limit Use of Sensitive Personal Information:</strong> If we collect sensitive personal information (as defined by applicable state law), you may have the right to limit our use of such information to specific permitted purposes. Currently, we do not collect categories of data defined as "sensitive" under most state privacy laws.</p>

            <p className="mb-2"><strong>Right to Non-Discrimination:</strong> You have the right to not receive discriminatory treatment for exercising your privacy rights. We will not:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Deny you goods or services</li>
              <li>Charge different prices or rates for goods or services</li>
              <li>Provide a different level or quality of goods or services</li>
              <li>Suggest that you will receive a different price, rate, level, or quality of goods or services</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">7.2 California-Specific Rights (CCPA/CPRA)</h3>
            <p className="mb-2">California residents have additional rights under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA):</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li><strong>Shine the Light:</strong> California residents may request information about disclosures of personal information to third parties for direct marketing purposes (once per calendar year).</li>
              <li><strong>Do Not Track:</strong> Our Services do not currently respond to "Do Not Track" (DNT) browser signals. However, we honor the Global Privacy Control (GPC) signal as an opt-out of the sale or sharing of personal information.</li>
              <li><strong>Minors Under 16:</strong> We do not knowingly sell personal information of minors under 16 years of age without affirmative authorization.</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">7.3 Additional State-Specific Provisions</h3>
            <p className="mb-4"><strong>Virginia, Colorado, Connecticut, Utah, Montana, Oregon, Texas, Delaware, Iowa, Indiana, Tennessee, Nebraska, New Hampshire, New Jersey, Kentucky, Maryland, Minnesota, and Rhode Island Residents:</strong> Residents of these states have similar rights to those described above under their respective state privacy laws. You may appeal our decision regarding a consumer rights request by contacting us at hello@optivoic.com with "Privacy Rights Appeal" in the subject line.</p>
            <p className="mb-4"><strong>Universal Opt-Out Mechanisms:</strong> We recognize and honor universal opt-out preference signals, including the Global Privacy Control (GPC), as a valid request to opt out of the sale or sharing of personal information for residents of states that require such recognition.</p>

            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">7.4 How to Exercise Your Rights</h3>
            <p className="mb-2">To exercise any of the rights described above, you may:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Email us at: hello@optivoic.com with "Privacy Rights Request" in the subject line</li>
              <li>Submit a request through our website contact form at https://optivoic.com</li>
              <li>Contact our Data Protection Officer (see Section 14 for contact information)</li>
            </ul>

            <p className="mb-2"><strong>Verification Process:</strong> To protect your privacy and security, we must verify your identity before processing your request. We may ask you to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Provide identifying information (name, email address, account details)</li>
              <li>Confirm recent transactions or interactions with our Services</li>
              <li>Respond to verification emails sent to your registered email address</li>
            </ul>
            <p className="mb-4">For security reasons, we cannot fulfill requests received from unverified sources.</p>

            <p className="mb-2"><strong>Authorized Agents:</strong> You may designate an authorized agent to submit requests on your behalf. We require:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Written authorization signed by you granting the agent authority</li>
              <li>Verification of the agent's identity</li>
              <li>Verification of your identity</li>
            </ul>

            <p className="mb-4"><strong>Response Timeframe:</strong> We will respond to verified requests within 45 days of receipt. If we require additional time (up to 90 days total), we will inform you of the extension and the reason for it.</p>
            <p className="mb-4"><strong>No Fee for Requests:</strong> We do not charge a fee to process or respond to your privacy rights requests unless they are manifestly unfounded, excessive, or repetitive. If we determine a fee is warranted, we will inform you and provide a cost estimate before proceeding.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Cookies and Tracking Technologies</h2>
            
            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">8.1 What Are Cookies?</h3>
            <p className="mb-4">Cookies are small text files placed on your device when you visit our website. They help us recognize you, remember your preferences, and improve your experience. Cookies may be set by us (first-party cookies) or by third-party services we use (third-party cookies).</p>

            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">8.2 Types of Cookies We Use</h3>
            <p className="mb-2"><strong>Essential Cookies (Strictly Necessary):</strong> These cookies are necessary for our website to function properly. They enable core functionality such as security, authentication, and basic navigation. You cannot opt out of these cookies without affecting website functionality.</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Session management cookies</li>
              <li>Authentication and security cookies</li>
              <li>Load balancing cookies</li>
            </ul>
            
            <p className="mb-2"><strong>Analytics and Performance Cookies:</strong> These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. We use Google Analytics 4 for this purpose.</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Google Analytics cookies (_ga, _ga_*, _gid, _gat)</li>
              <li>Page view tracking cookies</li>
              <li>User behavior analysis cookies</li>
            </ul>
            
            <p className="mb-2"><strong>Functionality Cookies:</strong> These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Language preference cookies</li>
              <li>User interface customization cookies</li>
              <li>Recently viewed content cookies</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">8.3 Google Analytics Cookies</h3>
            <p className="mb-2">Our use of Google Analytics involves several specific cookies and data collection mechanisms:</p>
            <p className="mb-2"><strong>Standard Google Analytics Cookies:</strong></p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>_ga: Used to distinguish unique users (expires after 2 years)</li>
              <li>_ga_*: Used to persist session state (expires after 2 years)</li>
              <li>_gid: Used to distinguish users (expires after 24 hours)</li>
              <li>_gat: Used to throttle request rate (expires after 1 minute)</li>
            </ul>
            <p className="mb-4"><strong>Google Signals Cookies:</strong> When Google Signals is enabled, Google Analytics may use additional cookies from Google's advertising services to collect demographic and interest data from users who have enabled Ads Personalization in their Google accounts.</p>
            <p className="mb-4"><strong>IP Anonymization:</strong> We have implemented IP anonymization in Google Analytics, which truncates IP addresses before they are stored or processed, providing an additional layer of privacy protection.</p>

            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">8.4 Managing Cookies and Opt-Out Options</h3>
            <p className="mb-2"><strong>Browser Controls:</strong> Most web browsers allow you to control cookies through their settings. You can:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>View what cookies are stored and delete them individually</li>
              <li>Block third-party cookies</li>
              <li>Block all cookies from specific websites</li>
              <li>Delete all cookies when you close your browser</li>
              <li>Set your browser to notify you when a cookie is set</li>
            </ul>
            <p className="mb-4">Please note that blocking or deleting cookies may impact your ability to use certain features of our Services.</p>

            <p className="mb-2"><strong>Google Analytics Opt-Out:</strong> You can opt out of Google Analytics tracking by:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Installing the Google Analytics Opt-out Browser Add-on: <a href="https://tools.google.com/dlpage/gaoptout" className="text-cyan-400 hover:underline">https://tools.google.com/dlpage/gaoptout</a></li>
              <li>Adjusting your Google Ads Settings: <a href="https://www.google.com/settings/ads" className="text-cyan-400 hover:underline">https://www.google.com/settings/ads</a></li>
              <li>Using browser privacy settings or extensions that block analytics</li>
            </ul>

            <p className="mb-2"><strong>Opting Out of Interest-Based Advertising:</strong> To opt out of interest-based advertising and Google Signals data collection:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Visit Google Ads Settings: <a href="https://www.google.com/settings/ads" className="text-cyan-400 hover:underline">https://www.google.com/settings/ads</a></li>
              <li>Turn off Ads Personalization</li>
              <li>Use the Network Advertising Initiative opt-out tool: <a href="http://www.networkadvertising.org/choices/" className="text-cyan-400 hover:underline">http://www.networkadvertising.org/choices/</a></li>
              <li>Use the Digital Advertising Alliance opt-out tool: <a href="http://www.aboutads.info/choices/" className="text-cyan-400 hover:underline">http://www.aboutads.info/choices/</a></li>
            </ul>

            <p className="mb-4"><strong>Global Privacy Control (GPC):</strong> We recognize and honor the Global Privacy Control signal. If your browser sends a GPC signal, we will treat it as a request to opt out of the sale or sharing of your personal information.</p>

            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">8.5 Third-Party Tracking</h3>
            <p className="mb-4">We use Google Tag Manager to manage tracking tags on our website. While Google Tag Manager itself does not collect personal data, it enables other services (primarily Google Analytics) to do so. Any data collected through tags managed by Google Tag Manager is governed by this Privacy Policy and the privacy policies of the respective services.</p>
            <p className="mb-4">We do not use cookies from social media platforms, advertising networks (beyond Google), or other third-party tracking services at this time.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. International Data Transfers</h2>
            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">9.1 Current Practice</h3>
            <p className="mb-4">OptiVoic operates exclusively in the United States, and all data processing and storage occurs within the United States. We do not currently transfer personal data to countries outside the United States.</p>

            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">9.2 Future International Operations</h3>
            <p className="mb-2">Should we expand our operations internationally in the future, we will implement appropriate safeguards to protect your personal information in accordance with applicable data protection laws, including:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Standard Contractual Clauses (SCCs) approved by relevant authorities</li>
              <li>Adequacy decisions by regulatory authorities</li>
              <li>Binding Corporate Rules (BCRs) where applicable</li>
              <li>Other legally recognized transfer mechanisms</li>
            </ul>
            <p className="mb-4">We will update this Privacy Policy to reflect any changes to our international data transfer practices.</p>

            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">9.3 GDPR Considerations</h3>
            <p className="mb-2">While we do not currently have users in the European Union or European Economic Area, should we expand to serve EU/EEA residents in the future, we will comply with the General Data Protection Regulation (GDPR), including:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Providing appropriate legal basis for data processing</li>
              <li>Implementing GDPR-compliant consent mechanisms</li>
              <li>Honoring GDPR rights (access, rectification, erasure, restriction, portability, objection)</li>
              <li>Appointing a representative in the EU if required</li>
              <li>Conducting Data Protection Impact Assessments (DPIAs) for high-risk processing</li>
              <li>Notifying relevant supervisory authorities of data breaches</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Children's Privacy</h2>
            <p className="mb-4"><strong>10.1 Age Restrictions:</strong> Our Services are not directed to children under 13 years of age (or under 16 in certain jurisdictions). We do not knowingly collect personal information from children under these age thresholds.</p>
            <p className="mb-4"><strong>10.2 Parental Consent:</strong> If we learn that we have collected personal information from a child under 13 (or under 16 where applicable) without parental consent, we will take immediate steps to delete that information from our systems.</p>
            <p className="mb-2"><strong>10.3 Parental Rights:</strong> If you are a parent or guardian and believe your child has provided personal information to us, please contact us immediately at hello@optivoic.com. We will:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Verify the request and your parental relationship</li>
              <li>Provide access to the child's information if requested</li>
              <li>Delete the child's information upon your request</li>
              <li>Cease further collection of the child's information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Changes to This Privacy Policy</h2>
            <p className="mb-2"><strong>11.1 Policy Updates:</strong> We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or business operations. When we make material changes, we will notify you by:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Posting the updated Privacy Policy on our website with a new "Last Updated" date</li>
              <li>Sending an email notification to the address associated with your account (for material changes)</li>
              <li>Displaying a prominent notice on our website</li>
              <li>Obtaining your consent where required by applicable law</li>
            </ul>
            <p className="mb-4"><strong>11.2 Your Acceptance:</strong> Your continued use of our Services after the effective date of any changes constitutes your acceptance of the updated Privacy Policy. If you do not agree with the changes, you should discontinue use of our Services and may request deletion of your account and personal information.</p>
            <p className="mb-4"><strong>11.3 Review Recommendations:</strong> We encourage you to review this Privacy Policy periodically to stay informed about how we collect, use, and protect your information. The "Last Updated" date at the top of this policy indicates when it was most recently revised.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. Third-Party Links and Services</h2>
            <p className="mb-4"><strong>12.1 External Links:</strong> Our Services may contain links to third-party websites, applications, or services that are not operated or controlled by OptiVoic. This Privacy Policy does not apply to those third-party services.</p>
            <p className="mb-4"><strong>12.2 Third-Party Privacy Practices:</strong> We are not responsible for the privacy practices, content, or security of third-party services. We encourage you to review the privacy policies of any third-party services you access through our Services.</p>
            <p className="mb-2"><strong>12.3 Third-Party Services We Use:</strong> We use the following third-party services that have their own privacy policies:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Google Analytics: <a href="https://policies.google.com/privacy" className="text-cyan-400 hover:underline">https://policies.google.com/privacy</a></li>
              <li>Google Tag Manager: <a href="https://policies.google.com/privacy" className="text-cyan-400 hover:underline">https://policies.google.com/privacy</a></li>
              <li>PayPal: <a href="https://www.paypal.com/us/webapps/mpp/ua/privacy-full" className="text-cyan-400 hover:underline">https://www.paypal.com/us/webapps/mpp/ua/privacy-full</a></li>
              <li>Gumroad: <a href="https://gumroad.com/privacy" className="text-cyan-400 hover:underline">https://gumroad.com/privacy</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">13. Data Protection Impact Assessments</h2>
            <p className="mb-2"><strong>13.1 High-Risk Processing Activities:</strong> In accordance with data protection best practices and certain state privacy laws, we conduct Data Protection Impact Assessments (DPIAs) for processing activities that present heightened risks to consumer privacy, including:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Processing that involves targeted advertising</li>
              <li>Sale or sharing of personal information (Note: We do not sell personal information)</li>
              <li>Processing for profiling that may produce legal or similarly significant effects</li>
              <li>Processing of sensitive personal information</li>
              <li>Large-scale processing activities</li>
            </ul>
            <p className="mb-2"><strong>13.2 DPIA Components:</strong> Our Data Protection Impact Assessments evaluate:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>The nature, scope, context, and purposes of processing</li>
              <li>The benefits of processing for our business and users</li>
              <li>The necessity and proportionality of processing in relation to purposes</li>
              <li>Risks to consumer privacy and potential harms</li>
              <li>Safeguards, security measures, and mechanisms to mitigate risks</li>
              <li>Compliance with applicable privacy laws and regulations</li>
            </ul>
            <p className="mb-4"><strong>13.3 Continuous Review:</strong> We regularly review and update our DPIAs as our processing activities evolve, new technologies are implemented, or legal requirements change.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">14. Contact Information and Privacy Officer</h2>
            <p className="mb-4"><strong>14.1 General Privacy Inquiries:</strong> If you have questions, concerns, or complaints about this Privacy Policy or our privacy practices, please contact us:</p>
            <div className="bg-white/5 p-4 rounded-md mb-6 border border-white/10">
              <p>OptiVoic Consulting and Software (d/b/a OptiVoic)</p>
              <p>Email: <a href="mailto:hello@optivoic.com" className="text-cyan-400 hover:underline">hello@optivoic.com</a></p>
              <p>Website: <a href="https://optivoic.com" className="text-cyan-400 hover:underline">https://optivoic.com</a></p>
            </div>
            
            <p className="mb-4"><strong>14.2 Data Protection Officer:</strong> We have designated a Data Protection Officer responsible for overseeing our privacy compliance program and handling privacy-related inquiries:</p>
            <div className="bg-white/5 p-4 rounded-md mb-6 border border-white/10">
              <p>Data Protection Officer</p>
              <p>Email: <a href="mailto:hello@optivoic.com" className="text-cyan-400 hover:underline">hello@optivoic.com</a></p>
              <p>Subject Line: "Attention: Data Protection Officer"</p>
            </div>

            <p className="mb-2"><strong>14.3 Privacy Rights Requests:</strong> To submit a privacy rights request (access, deletion, correction, opt-out, or data portability), please:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Email us at: hello@optivoic.com with "Privacy Rights Request" in the subject line</li>
              <li>Include your full name, email address, and account information (if applicable)</li>
              <li>Clearly describe the request you are making</li>
              <li>Provide sufficient information to verify your identity</li>
            </ul>

            <p className="mb-2"><strong>14.4 Response Commitment:</strong> We are committed to responding to all privacy inquiries promptly and professionally. You can expect:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Acknowledgment of your inquiry within 5 business days</li>
              <li>A substantive response within 45 days (or notification of any extension required)</li>
              <li>Clear communication about the status and resolution of your request</li>
              <li>Respect for your privacy rights and concerns</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">15. State-Specific Disclosures</h2>
            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">15.1 California Residents (CCPA/CPRA Disclosures)</h3>
            <p className="mb-4"><strong>Categories of Personal Information Collected:</strong> In the preceding 12 months, we have collected the following categories of personal information:</p>
            
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border-collapse border border-gray-700 text-sm">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="border border-gray-700 px-4 py-2 text-left text-white">Category</th>
                    <th className="border border-gray-700 px-4 py-2 text-left text-white">Examples</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-900/50 text-gray-300">
                  <tr>
                    <td className="border border-gray-700 px-4 py-2 font-semibold text-white">Identifiers</td>
                    <td className="border border-gray-700 px-4 py-2">Name, email address, IP address, account username</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 px-4 py-2 font-semibold text-white">Commercial Information</td>
                    <td className="border border-gray-700 px-4 py-2">Purchase history, transaction records, consulting contracts</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 px-4 py-2 font-semibold text-white">Internet Activity</td>
                    <td className="border border-gray-700 px-4 py-2">Browsing history, search history, interaction with website</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 px-4 py-2 font-semibold text-white">Geolocation Data</td>
                    <td className="border border-gray-700 px-4 py-2">City and region-level location from IP address</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 px-4 py-2 font-semibold text-white">Professional Information</td>
                    <td className="border border-gray-700 px-4 py-2">Job title, company name, business contact information</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 px-4 py-2 font-semibold text-white">Inferences</td>
                    <td className="border border-gray-700 px-4 py-2">Preferences, characteristics, behavior predictions</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-sm text-gray-500 mt-2">Table 1: Categories of personal information collected</p>
            </div>

            <p className="mb-2"><strong>Sources of Personal Information:</strong></p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Directly from you (account registration, purchases, communications)</li>
              <li>Automatically through your use of our Services (cookies, analytics)</li>
              <li>From third parties (payment processors, business partners)</li>
            </ul>

            <p className="mb-2"><strong>Business or Commercial Purposes for Collection:</strong></p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Providing and managing Services</li>
              <li>Processing transactions</li>
              <li>Customer support and communications</li>
              <li>Marketing and advertising (with consent)</li>
              <li>Analytics and business intelligence</li>
              <li>Security and fraud prevention</li>
              <li>Legal compliance</li>
            </ul>

            <p className="mb-2"><strong>Categories of Third Parties with Whom We Share Information:</strong></p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Service providers (payment processors, analytics providers, hosting providers)</li>
              <li>Professional advisors (legal, accounting, consulting)</li>
              <li>Government authorities (when required by law)</li>
            </ul>

            <p className="mb-4"><strong>Sale of Personal Information:</strong> We do NOT sell personal information as defined by the CCPA/CPRA.</p>
            <p className="mb-4"><strong>Sharing for Cross-Context Behavioral Advertising:</strong> We may share information with Google Analytics for advertising purposes, which may constitute "sharing" under CCPA/CPRA. You can opt out of this sharing by adjusting your Google Ads Settings or using the Google Analytics Opt-out Browser Add-on.</p>
            <p className="mb-4"><strong>Sensitive Personal Information:</strong> We do not collect categories of personal information defined as "sensitive" under the CCPA/CPRA (e.g., Social Security numbers, precise geolocation, health information, biometric data).</p>
            <p className="mb-4"><strong>Retention:</strong> We retain personal information as described in Section 5 of this Privacy Policy (generally in perpetuity unless deletion is requested).</p>
            <p className="mb-4"><strong>Financial Incentives:</strong> We do not currently offer financial incentives for the collection, retention, or sale of personal information.</p>

            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">15.2 Virginia, Colorado, Connecticut, Utah, Montana, Oregon, Texas Residents</h3>
            <p className="mb-2">Residents of these states have rights similar to those described in Section 7, including:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Right to access personal data</li>
              <li>Right to correct inaccuracies</li>
              <li>Right to delete personal data</li>
              <li>Right to obtain a copy of personal data (data portability)</li>
              <li>Right to opt out of targeted advertising (Note: We do not currently engage in targeted advertising that meets the statutory definitions)</li>
              <li>Right to opt out of the sale of personal data (Note: We do not sell personal data)</li>
              <li>Right to opt out of profiling in furtherance of automated decisions with legal or similarly significant effects</li>
            </ul>
            <p className="mb-4"><strong>Appeals Process:</strong> If we deny your privacy rights request, you may appeal the decision by contacting us at hello@optivoic.com with "Privacy Rights Appeal" in the subject line. We will respond to appeals within 60 days.</p>

            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">15.3 Other State Residents</h3>
            <p className="mb-4">If you reside in Delaware, Iowa, Indiana, Tennessee, Nebraska, New Hampshire, New Jersey, Kentucky, Maryland, Minnesota, Rhode Island, or any other state with comprehensive privacy laws, you have rights similar to those described above. Please contact us to exercise your rights or for more information about how state-specific laws apply to you.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">16. Accessibility</h2>
            <p className="mb-4">We are committed to ensuring this Privacy Policy is accessible to individuals with disabilities. If you experience difficulty accessing any portion of this Privacy Policy or would like to request this policy in an alternative format, please contact us at hello@optivoic.com.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">17. Your Consent and Agreement</h2>
            <p className="mb-4">By using our Services, you acknowledge that you have read this Privacy Policy, understand how we collect, use, and share your personal information, and consent to our data practices as described herein.</p>
            <p className="mb-4">If you do not agree with this Privacy Policy, please do not use our Services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">18. Effective Date and Acknowledgment</h2>
            <p className="mb-4">This Privacy Policy is effective as of March 1, 2026, and applies to all information collected by OptiVoic from that date forward. Information collected before this date remains subject to the privacy policy in effect at the time of collection.</p>
            <p className="mb-4 font-semibold text-gray-400">Last Updated: February 27, 2026</p>
            <p className="mb-4 text-cyan-400 font-medium">Thank you for trusting OptiVoic with your information. We are committed to protecting your privacy and earning your continued trust.</p>
            <p className="mb-4">For questions or concerns, please contact us at <a href="mailto:hello@optivoic.com" className="hover:underline">hello@optivoic.com</a>.</p>
          </section>

        </div>
      </main>
      
      {/* Footer */}
      <Footer />  
    </div>
  );
}