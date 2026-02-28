import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const NoiseOverlay = () => (
  <div className="fixed inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
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
        [cite_start]<h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">PRIVACY POLICY [cite: 1]</h1>
        [cite_start]<p className="text-gray-500 mb-2 uppercase tracking-widest text-sm font-bold">OptiVoic Consulting and Software (d/b/a OptiVoic) [cite: 2]</p>
        <p className="text-gray-500 mb-12 uppercase tracking-widest text-sm font-bold">Effective Date: March 1, 2026 | [cite_start]Last Updated: February 27, 2026 [cite: 3]</p>

        <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-12">
          [cite_start]<p className="font-semibold text-white">Contact Information: [cite: 4]</p>
          [cite_start]<p>Email: hello@optivoic.com [cite: 4]</p>
          [cite_start]<p>Website: https://optivoic.com [cite: 4]</p>
        </div>

        <div className="space-y-10 text-lg leading-relaxed font-light">
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. [cite_start]Introduction [cite: 5]</h2>
            [cite_start]<p className="mb-4">OptiVoic Consulting and Software ("OptiVoic," "we," "us," or "our") is committed to protecting your privacy and ensuring transparency in how we collect, use, store, and share your personal information. [cite: 6] [cite_start]This Privacy Policy applies to all OptiVoic digital properties, including our website at https://optivoic.com and any related services, products, and platforms (collectively, the "Services"). [cite: 7]</p>
            [cite_start]<p className="mb-4">We provide B2C and B2B template systems designed to help individuals and businesses track various lifestyle and business operations, including tools for gig workers to track revenue and taxes, digital nomad route trackers, and similar workflow solutions primarily built using Excel and Notion. [cite: 8] [cite_start]We also offer technology consulting services to B2B customers in the areas of Tech and AI Systems, and E-commerce & Reselling. [cite: 9]</p>
            <p className="mb-4">We never sell your personal data to third-party companies. [cite_start]We respect and honor consumer data privacy rights and are committed to complying with all applicable federal, state, and local data protection laws in the United States. [cite: 10]</p>
            [cite_start]<p className="mb-2">This Privacy Policy is designed to help you understand: [cite: 11]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>What personal information we collect and why we collect it [cite: 12]</li>
              [cite_start]<li>How we use, store, and protect your information [cite: 13]</li>
              [cite_start]<li>Your rights regarding your personal data [cite: 14]</li>
              [cite_start]<li>How to exercise those rights [cite: 15]</li>
              [cite_start]<li>Our legal basis for processing your information [cite: 16]</li>
            </ul>
            [cite_start]<p className="mb-4">By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. [cite: 17] [cite_start]If you do not agree with our practices, please do not use our Services. [cite: 18]</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. [cite_start]Information We Collect [cite: 19]</h2>
            [cite_start]<p className="mb-4">We collect various types of information to provide, maintain, improve, and protect our Services. [cite: 20] [cite_start]The information we collect falls into the following categories: [cite: 21]</p>
            
            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">2.1 Information You Provide Directly [cite: 22]</h3>
            [cite_start]<p className="mb-2"><strong>Account Information:</strong> When you create an account or register for our Services, we may collect: [cite: 23]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Name (first and last) [cite: 24]</li>
              [cite_start]<li>Email address [cite: 25]</li>
              [cite_start]<li>Username and password [cite: 26]</li>
              [cite_start]<li>Company name and job title (for B2B customers) [cite: 27]</li>
              [cite_start]<li>Professional information related to consulting engagements [cite: 28]</li>
            </ul>
            
            [cite_start]<p className="mb-2"><strong>Payment Information (Consulting Services Only):</strong> For our technology consulting services, we collect payment information necessary to process transactions, including: [cite: 29]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Credit card or debit card information [cite: 30]</li>
              [cite_start]<li>Bank account details for wire transfers or ACH payments [cite: 31]</li>
              [cite_start]<li>Billing address [cite: 32]</li>
              [cite_start]<li>Payment history and invoice records [cite: 33]</li>
            </ul>
            
            <div className="bg-cyan-900/20 border-l-4 border-cyan-500 p-4 mb-4">
              [cite_start]<p className="mb-2"><strong>Important Note:</strong> For customers purchasing template systems through our website or our partner Gumroad, we do NOT collect or store payment information. [cite: 34] [cite_start]All payment processing for these transactions is handled securely by PayPal or Gumroad through direct APIs using encrypted workflows and processes. [cite: 35]</p>
              [cite_start]<p>For consulting services, payment information is stored in a secure, encrypted CRM environment, and payments are typically processed through PayPal, although we do accept offline payments as well. [cite: 36]</p>
            </div>

            [cite_start]<p className="mb-2"><strong>Communications:</strong> When you contact us via email, contact forms, support tickets, or other communication channels, we collect: [cite: 37]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>The content of your messages [cite: 38]</li>
              [cite_start]<li>Your contact information [cite: 39]</li>
              [cite_start]<li>Any attachments or files you send [cite: 40]</li>
              [cite_start]<li>Communication preferences [cite: 41]</li>
            </ul>

            [cite_start]<p className="mb-2"><strong>Consulting Engagement Information:</strong> For B2B consulting clients, we may collect: [cite: 42]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Project requirements and specifications [cite: 43]</li>
              [cite_start]<li>Business objectives and goals [cite: 44]</li>
              [cite_start]<li>Technical environment details [cite: 45]</li>
              [cite_start]<li>Contractual documentation [cite: 46]</li>
              [cite_start]<li>Work product and deliverables [cite: 47]</li>
            </ul>

            [cite_start]<p className="mb-4"><strong>User-Provided Data for Template Systems:</strong> When you use our template systems, you may input personal data relevant to your use case (e.g., revenue figures, expense tracking, travel routes). [cite: 48] [cite_start]This data remains under your control within the templates you download, and we do not automatically collect or access this information unless you share it with us for support purposes. [cite: 49]</p>

            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">2.2 Information Collected Automatically [cite: 50]</h3>
            [cite_start]<p className="mb-4"><strong>Google Analytics Data Collection:</strong> We use Google Analytics 4 (GA4) to understand how visitors interact with our Services. [cite: 51] [cite_start]This involves several specific data collection methods that you should be aware of: [cite: 52]</p>
            
            [cite_start]<p className="mb-2"><strong>Google Signals Data Collection:</strong> We have enabled Google Signals in Google Analytics, which allows us to collect additional data about users who are signed into their Google accounts and have turned on Ads Personalization. [cite: 53] [cite_start]Google Signals enables: [cite: 54]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Cross-device tracking and reporting [cite: 55]</li>
              [cite_start]<li>Remarketing with Google Analytics audiences [cite: 56]</li>
              [cite_start]<li>Advertising reporting features including Demographics and Interests reports [cite: 57]</li>
              [cite_start]<li>Collection of aggregated demographic data (age, gender, interests) [cite: 58]</li>
            </ul>
            [cite_start]<p className="mb-4">When Google Signals is active, Google Analytics associates your activity on our website with your Google account information. [cite: 59] [cite_start]This data is used in aggregate form to help us understand user behavior patterns and improve our Services. [cite: 60]</p>

            [cite_start]<p className="mb-2"><strong>User-ID Collection:</strong> We may implement User-ID tracking in Google Analytics, which allows us to associate multiple sessions and activity from different devices with a unique, non-personally identifiable ID. [cite: 61] [cite_start]This helps us: [cite: 62]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Understand user engagement across multiple sessions and devices [cite: 63]</li>
              [cite_start]<li>Analyze user behavior patterns more accurately [cite: 64]</li>
              [cite_start]<li>Provide a better user experience across platforms [cite: 65]</li>
            </ul>
            [cite_start]<p className="mb-4">The User-ID is a unique identifier we assign to users, but it is NOT directly linked to personally identifiable information in our Google Analytics reporting. [cite: 66] [cite_start]However, it may be associated with your account information in our internal systems. [cite: 67]</p>

            [cite_start]<p className="mb-2"><strong>Granular Location and Device Data Collection:</strong> Through Google Analytics and other technologies, we collect granular location and device information, including: [cite: 68]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Location Data: IP address (which can indicate approximate geographic location), City and region-level location data, Language and locale settings, Time zone [cite: 69, 70, 71, 72, 73]</li>
              [cite_start]<li>Device Data: Device type (desktop, mobile, tablet), Operating system and version, Browser type and version, Screen resolution and display settings, Device manufacturer and model, Unique device identifiers, Mobile network information (when applicable) [cite: 74, 75, 76, 77, 78, 79, 80, 81]</li>
            </ul>

            [cite_start]<p className="mb-2"><strong>Usage Data and Analytics:</strong> We automatically collect information about how you interact with our Services: [cite: 82]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Pages viewed and content accessed [cite: 83]</li>
              [cite_start]<li>Time spent on pages [cite: 84]</li>
              [cite_start]<li>Navigation paths and click behavior [cite: 85]</li>
              [cite_start]<li>Search queries within our Services [cite: 86]</li>
              [cite_start]<li>Referring and exit pages [cite: 87]</li>
              [cite_start]<li>Date and time stamps of activities [cite: 88]</li>
              [cite_start]<li>Error logs and performance data [cite: 89]</li>
            </ul>

            [cite_start]<p className="mb-4"><strong>Google Tag Manager:</strong> We use Google Tag Manager (GTM) to manage and deploy analytics and marketing tags on our website. [cite: 90] [cite_start]GTM itself does not collect personal data, but it enables other services (like Google Analytics) to collect data. [cite: 91] [cite_start]Any data collection performed through tags managed by GTM is subject to the privacy policies of those respective services and this Privacy Policy. [cite: 92]</p>

            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">2.3 Cookies and Similar Technologies [cite: 93]</h3>
            [cite_start]<p className="mb-4">We use cookies and similar tracking technologies to collect information and improve your experience. [cite: 94] [cite_start]A cookie is a small text file stored on your device that helps us recognize you and remember your preferences. [cite: 95]</p>
            [cite_start]<p className="mb-2">Types of Cookies We Use: [cite: 96]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Essential Cookies: Necessary for the website to function properly, including authentication and security [cite: 97]</li>
              [cite_start]<li>Analytics Cookies: Help us understand how visitors use our Services through Google Analytics [cite: 98]</li>
              [cite_start]<li>Performance Cookies: Collect information about how you use our Services to improve functionality [cite: 99]</li>
            </ul>
            [cite_start]<p className="mb-2">Cookie Duration: [cite: 100]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Session Cookies: Temporary cookies that expire when you close your browser [cite: 101]</li>
              [cite_start]<li>Persistent Cookies: Remain on your device for a set period or until manually deleted [cite: 102]</li>
            </ul>
            <p className="mb-4">You can control cookie preferences through your browser settings. [cite_start]However, disabling cookies may affect the functionality of our Services. [cite: 103]</p>

            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">2.4 Information from Third-Party Sources [cite: 104]</h3>
            [cite_start]<p className="mb-2">We may receive information about you from third-party sources, including: [cite: 105]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Payment processors (PayPal, Gumroad) for transaction verification [cite: 106]</li>
              [cite_start]<li>Business partners and referral sources for consulting engagements [cite: 107]</li>
              [cite_start]<li>Publicly available sources for business contact information [cite: 108]</li>
              [cite_start]<li>Service providers that help us verify or supplement information [cite: 109]</li>
            </ul>

            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3">2.5 Information We Do NOT Collect [cite: 110]</h3>
            [cite_start]<p className="mb-2">To be clear, we do NOT collect the following types of sensitive personal information: [cite: 111]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1 text-red-300">
              [cite_start]<li>Health information or medical records [cite: 112]</li>
              [cite_start]<li>Biometric data (fingerprints, facial recognition, etc.) [cite: 113]</li>
              [cite_start]<li>Social Security numbers or other government-issued identification numbers [cite: 114]</li>
              [cite_start]<li>Personal information from children under 13 years of age [cite: 115]</li>
              [cite_start]<li>Precise geolocation data (GPS coordinates) [cite: 116]</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. [cite_start]How We Use Your Information [cite: 117]</h2>
            [cite_start]<p className="mb-4">We use the personal information we collect for legitimate business purposes, including: [cite: 118]</p>
            
            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">3.1 Providing and Managing Services [cite: 119]</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Creating and managing user accounts [cite: 120]</li>
              [cite_start]<li>Processing transactions and delivering purchased template systems [cite: 121]</li>
              [cite_start]<li>Providing technology consulting services to B2B clients [cite: 122]</li>
              [cite_start]<li>Responding to inquiries, support requests, and customer service needs [cite: 123]</li>
              [cite_start]<li>Authenticating users and preventing unauthorized access [cite: 124]</li>
              [cite_start]<li>Delivering product updates, downloads, and access to purchased materials [cite: 125]</li>
            </ul>

            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">3.2 Improving and Developing Services [cite: 126]</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Analyzing usage patterns and user behavior to improve our Services [cite: 127]</li>
              [cite_start]<li>Conducting research and development for new products and features [cite: 128]</li>
              [cite_start]<li>Testing new features and functionality [cite: 129]</li>
              [cite_start]<li>Identifying and fixing technical issues and bugs [cite: 130]</li>
              [cite_start]<li>Optimizing website performance and user experience [cite: 131]</li>
            </ul>

            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">3.3 Communication and Marketing [cite: 132]</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Sending transactional emails (order confirmations, receipts, account notifications) [cite: 133]</li>
              [cite_start]<li>Providing customer support and responding to communications [cite: 134]</li>
              [cite_start]<li>Sending newsletters, product updates, and promotional materials (with your consent) [cite: 135]</li>
              [cite_start]<li>Notifying you about changes to our Services, policies, or terms [cite: 136]</li>
              [cite_start]<li>Conducting surveys and gathering feedback [cite: 137]</li>
            </ul>
            [cite_start]<p className="mb-4">You may opt out of marketing communications at any time by following the unsubscribe instructions in our emails or contacting us directly. [cite: 138]</p>

            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">3.4 Analytics and Business Intelligence [cite: 139]</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Understanding how users discover and use our Services [cite: 140]</li>
              [cite_start]<li>Measuring the effectiveness of our marketing campaigns [cite: 141]</li>
              [cite_start]<li>Creating aggregated, de-identified reports and statistics [cite: 142]</li>
              [cite_start]<li>Identifying trends and patterns in user behavior [cite: 143]</li>
              [cite_start]<li>Making data-driven business decisions [cite: 144]</li>
            </ul>

            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">3.5 Advanced Settings for Ads Personalization [cite: 145]</h3>
            [cite_start]<p className="mb-2"><strong>Google Analytics Advertising Features:</strong> We have enabled certain advertising features in Google Analytics, including: [cite: 146]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Remarketing with Google Analytics [cite: 147]</li>
              [cite_start]<li>Google Display Network Impression Reporting [cite: 148]</li>
              [cite_start]<li>Google Analytics Demographics and Interest Reporting [cite: 149]</li>
              [cite_start]<li>Integrated services that require Google Analytics to collect data for advertising purposes [cite: 150]</li>
            </ul>
            [cite_start]<p className="mb-4">These features use cookies and similar technologies to collect data about your online activity over time and across different websites. [cite: 151] [cite_start]This allows us to display relevant advertisements to you on other websites you visit, measure the effectiveness of our advertising campaigns, understand the demographics and interests of our audience, and create custom audiences for targeted marketing. [cite: 152, 153, 154, 155, 156]</p>
            [cite_start]<p className="mb-4"><strong>Your Control Over Ads Personalization:</strong> You can opt out of Google Analytics for Display Advertising and customize Google Display Network ads using the Google Ads Settings page at https://www.google.com/settings/ads. [cite: 157] [cite_start]Additionally, you can opt out of Google Analytics tracking entirely by installing the Google Analytics Opt-out Browser Add-on at https://tools.google.com/dlpage/gaoptout. [cite: 158] [cite_start]We may implement ads personalization features in the future, and we will update this Privacy Policy accordingly. [cite: 159] [cite_start]Any ads personalization will be subject to your consent where required by applicable law. [cite: 160]</p>

            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">3.6 Security and Fraud Prevention [cite: 161]</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Protecting against fraud, abuse, and unauthorized access [cite: 162]</li>
              [cite_start]<li>Detecting and preventing security incidents [cite: 163]</li>
              [cite_start]<li>Monitoring for suspicious or malicious activity [cite: 164]</li>
              [cite_start]<li>Enforcing our Terms of Service and other policies [cite: 165]</li>
              [cite_start]<li>Investigating and responding to security threats [cite: 166]</li>
            </ul>

            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">3.7 Legal Compliance and Protection [cite: 167]</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Complying with applicable laws, regulations, and legal processes [cite: 168]</li>
              [cite_start]<li>Responding to lawful requests from government authorities [cite: 169]</li>
              [cite_start]<li>Protecting our legal rights and interests [cite: 170]</li>
              [cite_start]<li>Enforcing contracts and agreements [cite: 171]</li>
              [cite_start]<li>Resolving disputes and claims [cite: 172]</li>
            </ul>

            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">3.8 Future Use of AI and Machine Learning [cite: 173]</h3>
            [cite_start]<p className="mb-2">While we do not currently use artificial intelligence or machine learning technologies to process personal data, we may implement such technologies in the future to: [cite: 174]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Provide personalized recommendations for template systems [cite: 175]</li>
              [cite_start]<li>Improve customer support through AI-assisted responses [cite: 176]</li>
              [cite_start]<li>Enhance our consulting services with data-driven insights [cite: 177]</li>
              [cite_start]<li>Automate routine business processes [cite: 178]</li>
            </ul>
            [cite_start]<p className="mb-4">Should we implement AI or machine learning that involves personal data processing, we will update this Privacy Policy and obtain any necessary consent required by applicable law. [cite: 179] [cite_start]Any AI-driven processing will be conducted in accordance with principles of fairness, transparency, and accountability. [cite: 180]</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. [cite_start]How We Share Your Information [cite: 181]</h2>
            <p className="mb-4">We never sell your personal information to third parties. [cite_start]However, we may share your information in the following limited circumstances: [cite: 182]</p>

            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">4.1 Service Providers and Business Partners [cite: 183]</h3>
            [cite_start]<p className="mb-2">We may share information with trusted third-party service providers who perform services on our behalf, including: [cite: 184]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Payment Processors: PayPal and Gumroad for processing payments [cite: 185]</li>
              [cite_start]<li>Analytics Providers: Google Analytics for website analytics and insights [cite: 186]</li>
              [cite_start]<li>Technology Infrastructure: Hosting providers, content delivery networks, and cloud storage services [cite: 187]</li>
              [cite_start]<li>Customer Support Tools: Email service providers and help desk software [cite: 188]</li>
              [cite_start]<li>CRM Systems: For managing consulting client relationships and project information [cite: 189]</li>
            </ul>
            [cite_start]<p className="mb-4">These service providers are contractually obligated to use your information only for the purposes we specify and to maintain appropriate security measures. [cite: 190] [cite_start]They are prohibited from selling or using your data for their own purposes. [cite: 191]</p>

            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">4.2 Business Transactions [cite: 192]</h3>
            [cite_start]<p className="mb-4">If OptiVoic is involved in a merger, acquisition, sale of assets, bankruptcy, or other business transaction, your information may be transferred as part of that transaction. [cite: 193] [cite_start]We will notify you via email and/or prominent notice on our website of any change in ownership or use of your personal information, as well as any choices you may have regarding your information. [cite: 194]</p>

            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">4.3 Legal Requirements and Protection [cite: 195]</h3>
            [cite_start]<p className="mb-2">We may disclose your information when required or permitted by law, including: [cite: 196]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>To comply with legal obligations, court orders, subpoenas, or other legal processes [cite: 197]</li>
              [cite_start]<li>To respond to lawful requests from government authorities or law enforcement [cite: 198]</li>
              [cite_start]<li>To protect the rights, property, or safety of OptiVoic, our users, or the public [cite: 199]</li>
              [cite_start]<li>To enforce our Terms of Service or other agreements [cite: 200]</li>
              [cite_start]<li>To investigate, prevent, or take action regarding illegal activities, suspected fraud, or security threats [cite: 201]</li>
              [cite_start]<li>To exercise or defend legal claims [cite: 202]</li>
            </ul>

            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">4.4 With Your Consent [cite: 203]</h3>
            [cite_start]<p className="mb-4">We may share your information with third parties when you explicitly consent to such sharing. [cite: 204] [cite_start]We will clearly disclose the purpose and recipient of the information before obtaining your consent. [cite: 205]</p>

            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">4.5 Aggregated and De-Identified Data [cite: 206]</h3>
            [cite_start]<p className="mb-4">We may share aggregated, de-identified, or anonymized data that cannot reasonably be used to identify you. [cite: 207] This includes statistical information, research findings, and industry benchmarks. [cite_start]Such data is not considered personal information and is not subject to this Privacy Policy. [cite: 208]</p>

            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">4.6 No Data Transfers Outside the United States [cite: 209]</h3>
            [cite_start]<p className="mb-4">Currently, we do not transfer your personal data outside the United States. [cite: 210] [cite_start]All data processing and storage occurs within the United States. [cite: 211] [cite_start]Should this change in the future, we will update this Privacy Policy and implement appropriate safeguards to protect your data in accordance with applicable law. [cite: 212]</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. [cite_start]Data Retention [cite: 213]</h2>
            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">5.1 Retention Policy [cite: 214]</h3>
            [cite_start]<p className="mb-4">We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. [cite: 215] [cite_start]<strong>General Retention:</strong> Personal data collected through our Services is retained in perpetuity or until you request deletion of your data from our systems. [cite: 216]</p>
            
            [cite_start]<p className="mb-2">This retention policy allows us to: [cite: 217]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Maintain historical records for business continuity [cite: 218]</li>
              [cite_start]<li>Provide ongoing support for purchased products [cite: 219]</li>
              [cite_start]<li>Preserve data for legal and compliance purposes [cite: 220]</li>
              [cite_start]<li>Honor our contractual obligations to consulting clients [cite: 221]</li>
            </ul>

            [cite_start]<p className="mb-2">Specific Retention Periods: [cite: 222]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Account Information: Retained while your account is active and thereafter until deletion is requested [cite: 223]</li>
              [cite_start]<li>Transaction Records: Retained for a minimum of 7 years for tax and accounting compliance [cite: 224]</li>
              [cite_start]<li>Consulting Engagement Records: Retained for the duration of the engagement plus 7 years for contractual and legal purposes [cite: 225]</li>
              [cite_start]<li>Payment Information: Retained in accordance with payment processor policies and financial record-keeping requirements [cite: 226]</li>
              [cite_start]<li>Communication Records: Retained for customer service purposes and as long as relevant to ongoing relationships [cite: 227]</li>
              [cite_start]<li>Analytics Data: Google Analytics data is retained according to our configured retention settings (currently set to 14 months for user-level and event-level data) [cite: 228]</li>
              [cite_start]<li>Marketing Data: Retained until you opt out of marketing communications or request deletion [cite: 229]</li>
            </ul>

            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">5.2 Data Deletion [cite: 230]</h3>
            [cite_start]<p className="mb-2">You have the right to request deletion of your personal data at any time (subject to legal exceptions described in Section 7). [cite: 231] [cite_start]Upon receiving a verified deletion request, we will: [cite: 232]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Delete or de-identify your personal information from our active systems [cite: 233]</li>
              [cite_start]<li>Notify our service providers to delete your data from their systems [cite: 234]</li>
              [cite_start]<li>Retain only what is necessary for legal, tax, audit, or fraud prevention purposes [cite: 235]</li>
              [cite_start]<li>Complete the deletion process within a reasonable timeframe (typically 30-45 days) [cite: 236]</li>
            </ul>
            
            [cite_start]<p className="mb-2">Exceptions to Deletion: We may retain certain information when necessary to: [cite: 237]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Complete transactions or fulfill services you requested [cite: 238]</li>
              [cite_start]<li>Comply with legal obligations, including tax and financial record-keeping requirements [cite: 239]</li>
              [cite_start]<li>Detect and prevent fraud, abuse, or security incidents [cite: 240]</li>
              [cite_start]<li>Resolve disputes and enforce our agreements [cite: 241]</li>
              [cite_start]<li>Exercise or defend legal claims [cite: 242]</li>
              [cite_start]<li>Maintain backup systems for disaster recovery (backups are deleted according to our retention schedule) [cite: 243]</li>
            </ul>

            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">5.3 Data Minimization Practices [cite: 244]</h3>
            [cite_start]<p className="mb-2">While we retain data in perpetuity by default, we are committed to data minimization principles: [cite: 245]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>We only collect data that is necessary for identified purposes [cite: 246]</li>
              [cite_start]<li>We regularly review data holdings to identify information no longer needed [cite: 247]</li>
              [cite_start]<li>We encourage users to exercise their deletion rights [cite: 248]</li>
              [cite_start]<li>We maintain appropriate security measures regardless of retention period [cite: 249]</li>
            </ul>
            [cite_start]<p className="mb-4"><strong>Important Note on Retention:</strong> Given that our retention policy is indefinite until deletion is requested, we strongly encourage you to exercise your deletion rights if you no longer wish for us to retain your personal data. [cite: 250] [cite_start]You can submit a deletion request at any time by contacting us at hello@optivoic.com . [cite: 251]</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. [cite_start]Data Security [cite: 252]</h2>
            [cite_start]<p className="mb-4">We take the security of your personal information seriously and implement reasonable administrative, technical, and physical safeguards designed to protect your data from unauthorized access, disclosure, alteration, and destruction. [cite: 253]</p>

            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">6.1 Security Measures [cite: 254]</h3>
            [cite_start]<p className="mb-2">Our security practices include: [cite: 255]</p>
            [cite_start]<p className="mb-1 font-semibold">Technical Safeguards: [cite: 256]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Encryption of data in transit using industry-standard SSL/TLS protocols [cite: 257]</li>
              [cite_start]<li>Encryption of sensitive data at rest, particularly payment information [cite: 258]</li>
              [cite_start]<li>Secure authentication mechanisms and password protection [cite: 259]</li>
              [cite_start]<li>Regular security updates and patch management [cite: 260]</li>
              [cite_start]<li>Firewalls and intrusion detection systems [cite: 261]</li>
              [cite_start]<li>Access controls and activity logging [cite: 262]</li>
            </ul>

            [cite_start]<p className="mb-1 font-semibold">Administrative Safeguards: [cite: 263]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Employee training on data security and privacy practices [cite: 264]</li>
              [cite_start]<li>Confidentiality agreements with employees and contractors [cite: 265]</li>
              [cite_start]<li>Defined roles and responsibilities for data handling [cite: 266]</li>
              [cite_start]<li>Regular security audits and risk assessments [cite: 267]</li>
              [cite_start]<li>Incident response and breach notification procedures [cite: 268]</li>
              [cite_start]<li>Vendor management and due diligence processes [cite: 269]</li>
            </ul>

            [cite_start]<p className="mb-1 font-semibold">Physical Safeguards: [cite: 270]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Secure storage of physical records and devices [cite: 271]</li>
              [cite_start]<li>Restricted access to facilities where data is stored [cite: 272]</li>
              [cite_start]<li>Secure disposal of physical materials containing personal data [cite: 273]</li>
            </ul>

            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">6.2 Payment Security [cite: 274]</h3>
            [cite_start]<p className="mb-4"><strong>For Consulting Services:</strong> Payment information collected for consulting engagements is stored in a secure, encrypted CRM environment with strict access controls. [cite: 275] [cite_start]We use industry-standard payment processing methods and comply with Payment Card Industry Data Security Standard (PCI DSS) requirements when handling credit card information. [cite: 276]</p>
            [cite_start]<p className="mb-4"><strong>For Template System Purchases:</strong> We do NOT collect or store payment information for customers purchasing template systems through our website or Gumroad. [cite: 277] [cite_start]All payment processing is handled by PayPal or Gumroad, which maintain their own rigorous security standards and compliance certifications. [cite: 278]</p>

            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">6.3 Third-Party Security [cite: 279]</h3>
            [cite_start]<p className="mb-4">We carefully select service providers and require them to maintain appropriate security measures through contractual agreements. [cite: 280] [cite_start]However, we cannot guarantee the security practices of third-party services, and you should review their privacy policies and security practices independently. [cite: 281]</p>

            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">6.4 Limitations and Your Responsibilities [cite: 282]</h3>
            [cite_start]<p className="mb-2">While we implement robust security measures, no method of electronic transmission or storage is 100% secure. [cite: 283] We cannot guarantee absolute security of your information. [cite_start]You are responsible for: [cite: 284]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Maintaining the confidentiality of your account credentials [cite: 285]</li>
              [cite_start]<li>Using strong, unique passwords [cite: 286]</li>
              [cite_start]<li>Notifying us immediately of any unauthorized access [cite: 287]</li>
              [cite_start]<li>Keeping your contact information current [cite: 288]</li>
              [cite_start]<li>Exercising caution when sharing information online [cite: 289]</li>
            </ul>

            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">6.5 Data Breach Response [cite: 290]</h3>
            [cite_start]<p className="mb-2">In the event of a data breach that affects your personal information, we will: [cite: 291]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Conduct a prompt investigation to determine the scope and impact [cite: 292]</li>
              [cite_start]<li>Take immediate steps to contain and remediate the breach [cite: 293]</li>
              [cite_start]<li>Notify affected individuals within the timeframe required by applicable law (typically within 72 hours of discovery) [cite: 294]</li>
              [cite_start]<li>Provide information about the breach, the data affected, and steps you can take to protect yourself [cite: 295]</li>
              [cite_start]<li>Notify relevant regulatory authorities as required by law [cite: 296]</li>
              [cite_start]<li>Implement additional safeguards to prevent future incidents [cite: 297]</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. [cite_start]Your Privacy Rights [cite: 298]</h2>
            [cite_start]<p className="mb-4">Depending on your location and applicable law, you may have certain rights regarding your personal information. [cite: 299] [cite_start]OptiVoic respects these rights and provides mechanisms to exercise them. [cite: 300]</p>

            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">7.1 Rights Under State Privacy Laws [cite: 301]</h3>
            [cite_start]<p className="mb-2">If you are a resident of California, Virginia, Colorado, Connecticut, Utah, Montana, Oregon, Texas, Delaware, Iowa, Indiana, Tennessee, Nebraska, New Hampshire, New Jersey, Kentucky, Maryland, Minnesota, Rhode Island, or other states with comprehensive privacy laws, you have the following rights: [cite: 302]</p>
            
            [cite_start]<p className="mb-2"><strong>Right to Know / Access:</strong> You have the right to request: [cite: 303]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Confirmation of whether we process your personal information [cite: 304]</li>
              [cite_start]<li>Access to the specific personal information we have collected about you [cite: 305]</li>
              [cite_start]<li>Categories of personal information collected [cite: 306]</li>
              [cite_start]<li>Categories of sources from which we collected the information [cite: 307]</li>
              [cite_start]<li>Business or commercial purposes for collecting the information [cite: 308]</li>
              [cite_start]<li>Categories of third parties with whom we share personal information [cite: 309]</li>
              [cite_start]<li>How long we retain your personal information [cite: 310]</li>
            </ul>

            [cite_start]<p className="mb-2"><strong>Right to Delete:</strong> You have the right to request deletion of your personal information, subject to certain exceptions. [cite: 311] [cite_start]We must honor your deletion request unless we need to retain the information to: [cite: 312]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Complete the transaction or service you requested [cite: 313]</li>
              [cite_start]<li>Detect and protect against security incidents, fraud, or illegal activity [cite: 314]</li>
              [cite_start]<li>Debug and repair errors in our systems [cite: 315]</li>
              [cite_start]<li>Exercise free speech or ensure another's right to free speech [cite: 316]</li>
              [cite_start]<li>Comply with legal obligations (e.g., tax records, contractual requirements) [cite: 317]</li>
              [cite_start]<li>Use the information internally in a lawful manner compatible with your relationship with us [cite: 318]</li>
            </ul>

            [cite_start]<p className="mb-4"><strong>Right to Correct:</strong> You have the right to request correction of inaccurate personal information we maintain about you. [cite: 319]</p>
            [cite_start]<p className="mb-4"><strong>Right to Data Portability:</strong> You have the right to receive your personal information in a structured, commonly used, and machine-readable format and to transmit that information to another entity. [cite: 320]</p>

            [cite_start]<p className="mb-2"><strong>Right to Opt-Out:</strong> You have the right to opt out of: [cite: 321]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>The sale of your personal information (Note: We do not sell personal information) [cite: 322]</li>
              [cite_start]<li>Sharing of personal information for cross-context behavioral advertising / targeted advertising [cite: 323]</li>
              [cite_start]<li>Processing of personal information for profiling in furtherance of automated decisions with legal or similarly significant effects [cite: 324]</li>
            </ul>

            [cite_start]<p className="mb-4"><strong>Right to Limit Use of Sensitive Personal Information:</strong> If we collect sensitive personal information (as defined by applicable state law), you may have the right to limit our use of such information to specific permitted purposes. [cite: 325] [cite_start]Currently, we do not collect categories of data defined as "sensitive" under most state privacy laws. [cite: 326]</p>

            [cite_start]<p className="mb-2"><strong>Right to Non-Discrimination:</strong> You have the right to not receive discriminatory treatment for exercising your privacy rights. [cite: 327] [cite_start]We will not: [cite: 328]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Deny you goods or services [cite: 329]</li>
              [cite_start]<li>Charge different prices or rates for goods or services [cite: 330]</li>
              [cite_start]<li>Provide a different level or quality of goods or services [cite: 331]</li>
              [cite_start]<li>Suggest that you will receive a different price, rate, level, or quality of goods or services [cite: 332]</li>
            </ul>

            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">7.2 California-Specific Rights (CCPA/CPRA) [cite: 333]</h3>
            [cite_start]<p className="mb-2">California residents have additional rights under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA): [cite: 334]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li><strong>Shine the Light:</strong> California residents may request information about disclosures of personal information to third parties for direct marketing purposes (once per calendar year). [cite: 335]</li>
              [cite_start]<li><strong>Do Not Track:</strong> Our Services do not currently respond to "Do Not Track" (DNT) browser signals. [cite: 336] [cite_start]However, we honor the Global Privacy Control (GPC) signal as an opt-out of the sale or sharing of personal information. [cite: 337]</li>
              [cite_start]<li><strong>Minors Under 16:</strong> We do not knowingly sell personal information of minors under 16 years of age without affirmative authorization. [cite: 338]</li>
            </ul>

            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">7.3 Additional State-Specific Provisions [cite: 339]</h3>
            [cite_start]<p className="mb-4"><strong>Virginia, Colorado, Connecticut, Utah, Montana, Oregon, Texas, Delaware, Iowa, Indiana, Tennessee, Nebraska, New Hampshire, New Jersey, Kentucky, Maryland, Minnesota, and Rhode Island Residents:</strong> Residents of these states have similar rights to those described above under their respective state privacy laws. [cite: 340, 341] [cite_start]You may appeal our decision regarding a consumer rights request by contacting us at hello@optivoic.com with "Privacy Rights Appeal" in the subject line. [cite: 342] [cite_start]Universal Opt-Out Mechanisms: We recognize and honor universal opt-out preference signals, including the Global Privacy Control (GPC), as a valid request to opt out of the sale or sharing of personal information for residents of states that require such recognition. [cite: 343]</p>

            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">7.4 How to Exercise Your Rights [cite: 344]</h3>
            [cite_start]<p className="mb-2">To exercise any of the rights described above, you may: [cite: 345]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Email us at: hello@optivoic.com with "Privacy Rights Request" in the subject line [cite: 346]</li>
              [cite_start]<li>Submit a request through our website contact form at https://optivoic.com [cite: 347]</li>
              [cite_start]<li>Contact our Data Protection Officer (see Section 14 for contact information) [cite: 348]</li>
            </ul>

            [cite_start]<p className="mb-2"><strong>Verification Process:</strong> To protect your privacy and security, we must verify your identity before processing your request. [cite: 349] [cite_start]We may ask you to: [cite: 350]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Provide identifying information (name, email address, account details) [cite: 351]</li>
              [cite_start]<li>Confirm recent transactions or interactions with our Services [cite: 352]</li>
              [cite_start]<li>Respond to verification emails sent to your registered email address [cite: 353]</li>
            </ul>
            [cite_start]<p className="mb-4">For security reasons, we cannot fulfill requests received from unverified sources. [cite: 354]</p>

            <p className="mb-2"><strong>Authorized Agents:</strong> You may designate an authorized agent to submit requests on your behalf. [cite_start]We require: [cite: 355]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Written authorization signed by you granting the agent authority [cite: 356]</li>
              [cite_start]<li>Verification of the agent's identity [cite: 357]</li>
              [cite_start]<li>Verification of your identity [cite: 358]</li>
            </ul>

            [cite_start]<p className="mb-4"><strong>Response Timeframe:</strong> We will respond to verified requests within 45 days of receipt. [cite: 359] [cite_start]If we require additional time (up to 90 days total), we will inform you of the extension and the reason for it. [cite: 360]</p>
            [cite_start]<p className="mb-4"><strong>No Fee for Requests:</strong> We do not charge a fee to process or respond to your privacy rights requests unless they are manifestly unfounded, excessive, or repetitive. [cite: 361] [cite_start]If we determine a fee is warranted, we will inform you and provide a cost estimate before proceeding. [cite: 362]</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. [cite_start]Cookies and Tracking Technologies [cite: 363]</h2>
            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">8.1 What Are Cookies? [cite: 364]</h3>
            [cite_start]<p className="mb-4">Cookies are small text files placed on your device when you visit our website. [cite: 365] [cite_start]They help us recognize you, remember your preferences, and improve your experience. [cite: 366] [cite_start]Cookies may be set by us (first-party cookies) or by third-party services we use (third-party cookies). [cite: 367]</p>

            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">8.2 Types of Cookies We Use [cite: 368]</h3>
            [cite_start]<p className="mb-2"><strong>Essential Cookies (Strictly Necessary):</strong> These cookies are necessary for our website to function properly. [cite: 369] [cite_start]They enable core functionality such as security, authentication, and basic navigation. [cite: 370] [cite_start]You cannot opt out of these cookies without affecting website functionality. [cite: 371] (Includes: Session management cookies, Authentication and security cookies, Load balancing cookies) [cite_start][cite: 372, 373, 374]</p>
            [cite_start]<p className="mb-2"><strong>Analytics and Performance Cookies:</strong> These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. [cite: 375] [cite_start]We use Google Analytics 4 for this purpose. [cite: 376] (Includes: Google Analytics cookies (_ga, _ga_*, _gid, _gat)[cite_start], Page view tracking cookies, User behavior analysis cookies) [cite: 377, 378, 379]</p>
            [cite_start]<p className="mb-4"><strong>Functionality Cookies:</strong> These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings. [cite: 380] (Includes: Language preference cookies, User interface customization cookies, Recently viewed content cookies) [cite_start][cite: 381, 382, 383]</p>

            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">8.3 Google Analytics Cookies [cite: 384]</h3>
            [cite_start]<p className="mb-2">Our use of Google Analytics involves several specific cookies and data collection mechanisms: [cite: 385]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li><strong>Standard Google Analytics Cookies:</strong> _ga: Used to distinguish unique users (expires after 2 years), _ga_*: Used to persist session state (expires after 2 years), _gid: Used to distinguish users (expires after 24 hours), _gat: Used to throttle request rate (expires after 1 minute). [cite: 386, 387, 388, 389, 390]</li>
              [cite_start]<li><strong>Google Signals Cookies:</strong> When Google Signals is enabled, Google Analytics may use additional cookies from Google's advertising services to collect demographic and interest data from users who have enabled Ads Personalization in their Google accounts. [cite: 391]</li>
              [cite_start]<li><strong>IP Anonymization:</strong> We have implemented IP anonymization in Google Analytics, which truncates IP addresses before they are stored or processed, providing an additional layer of privacy protection. [cite: 392]</li>
            </ul>

            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">8.4 Managing Cookies and Opt-Out Options [cite: 393]</h3>
            <p className="mb-2"><strong>Browser Controls:</strong> Most web browsers allow you to control cookies through their settings. [cite_start]You can: [cite: 394]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>View what cookies are stored and delete them individually [cite: 395]</li>
              [cite_start]<li>Block third-party cookies [cite: 396]</li>
              [cite_start]<li>Block all cookies from specific websites [cite: 397]</li>
              [cite_start]<li>Delete all cookies when you close your browser [cite: 398]</li>
              [cite_start]<li>Set your browser to notify you when a cookie is set [cite: 399]</li>
            </ul>
            [cite_start]<p className="mb-4">Please note that blocking or deleting cookies may impact your ability to use certain features of our Services. [cite: 400]</p>

            [cite_start]<p className="mb-2"><strong>Google Analytics Opt-Out:</strong> You can opt out of Google Analytics tracking by: [cite: 401]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Installing the Google Analytics Opt-out Browser Add-on: https://tools.google.com/dlpage/gaoptout [cite: 402]</li>
              [cite_start]<li>Adjusting your Google Ads Settings: https://www.google.com/settings/ads [cite: 403]</li>
              [cite_start]<li>Using browser privacy settings or extensions that block analytics [cite: 404]</li>
            </ul>

            [cite_start]<p className="mb-2"><strong>Opting Out of Interest-Based Advertising:</strong> To opt out of interest-based advertising and Google Signals data collection: [cite: 405]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Visit Google Ads Settings: https://www.google.com/settings/ads [cite: 406]</li>
              [cite_start]<li>Turn off Ads Personalization [cite: 407]</li>
              [cite_start]<li>Use the Network Advertising Initiative opt-out tool: http://www.networkadvertising.org/choices/ [cite: 408]</li>
              [cite_start]<li>Use the Digital Advertising Alliance opt-out tool: http://www.aboutads.info/choices/ [cite: 409]</li>
            </ul>

            [cite_start]<p className="mb-4"><strong>Global Privacy Control (GPC):</strong> We recognize and honor the Global Privacy Control signal. [cite: 410] [cite_start]If your browser sends a GPC signal, we will treat it as a request to opt out of the sale or sharing of your personal information. [cite: 411]</p>

            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">8.5 Third-Party Tracking [cite: 412]</h3>
            [cite_start]<p className="mb-4">We use Google Tag Manager to manage tracking tags on our website. [cite: 413] [cite_start]While Google Tag Manager itself does not collect personal data, it enables other services (primarily Google Analytics) to do so. [cite: 414] [cite_start]Any data collected through tags managed by Google Tag Manager is governed by this Privacy Policy and the privacy policies of the respective services. [cite: 415] [cite_start]We do not use cookies from social media platforms, advertising networks (beyond Google), or other third-party tracking services at this time. [cite: 416]</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. [cite_start]International Data Transfers [cite: 417]</h2>
            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">9.1 Current Practice [cite: 418]</h3>
            [cite_start]<p className="mb-4">OptiVoic operates exclusively in the United States, and all data processing and storage occurs within the United States. [cite: 419] [cite_start]We do not currently transfer personal data to countries outside the United States. [cite: 420]</p>

            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">9.2 Future International Operations [cite: 421]</h3>
            [cite_start]<p className="mb-2">Should we expand our operations internationally in the future, we will implement appropriate safeguards to protect your personal information in accordance with applicable data protection laws, including: [cite: 422]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Standard Contractual Clauses (SCCs) approved by relevant authorities [cite: 423]</li>
              [cite_start]<li>Adequacy decisions by regulatory authorities [cite: 424]</li>
              [cite_start]<li>Binding Corporate Rules (BCRs) where applicable [cite: 425]</li>
              [cite_start]<li>Other legally recognized transfer mechanisms [cite: 426]</li>
            </ul>
            [cite_start]<p className="mb-4">We will update this Privacy Policy to reflect any changes to our international data transfer practices. [cite: 427]</p>

            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">9.3 GDPR Considerations [cite: 428]</h3>
            [cite_start]<p className="mb-2">While we do not currently have users in the European Union or European Economic Area, should we expand to serve EU/EEA residents in the future, we will comply with the General Data Protection Regulation (GDPR), including: [cite: 429]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Providing appropriate legal basis for data processing [cite: 430]</li>
              [cite_start]<li>Implementing GDPR-compliant consent mechanisms [cite: 431]</li>
              [cite_start]<li>Honoring GDPR rights (access, rectification, erasure, restriction, portability, objection) [cite: 432]</li>
              [cite_start]<li>Appointing a representative in the EU if required [cite: 433]</li>
              [cite_start]<li>Conducting Data Protection Impact Assessments (DPIAs) for high-risk processing [cite: 434]</li>
              [cite_start]<li>Notifying relevant supervisory authorities of data breaches [cite: 435]</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. [cite_start]Children's Privacy [cite: 436]</h2>
            [cite_start]<p className="mb-4"><strong>10.1 Age Restrictions:</strong> Our Services are not directed to children under 13 years of age (or under 16 in certain jurisdictions). [cite: 437, 438] [cite_start]We do not knowingly collect personal information from children under these age thresholds. [cite: 439]</p>
            [cite_start]<p className="mb-4"><strong>10.2 Parental Consent:</strong> If we learn that we have collected personal information from a child under 13 (or under 16 where applicable) without parental consent, we will take immediate steps to delete that information from our systems. [cite: 440, 441]</p>
            [cite_start]<p className="mb-2"><strong>10.3 Parental Rights:</strong> If you are a parent or guardian and believe your child has provided personal information to us, please contact us immediately at hello@optivoic.com . [cite: 442, 443] [cite_start]We will: [cite: 444]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Verify the request and your parental relationship [cite: 445]</li>
              [cite_start]<li>Provide access to the child's information if requested [cite: 446]</li>
              [cite_start]<li>Delete the child's information upon your request [cite: 447]</li>
              [cite_start]<li>Cease further collection of the child's information [cite: 448]</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. [cite_start]Changes to This Privacy Policy [cite: 449]</h2>
            [cite_start]<p className="mb-2"><strong>11.1 Policy Updates:</strong> We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or business operations. [cite: 450, 451] [cite_start]When we make material changes, we will notify you by: [cite: 452]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Posting the updated Privacy Policy on our website with a new "Last Updated" date [cite: 453]</li>
              [cite_start]<li>Sending an email notification to the address associated with your account (for material changes) [cite: 454]</li>
              [cite_start]<li>Displaying a prominent notice on our website [cite: 455]</li>
              [cite_start]<li>Obtaining your consent where required by applicable law [cite: 456]</li>
            </ul>
            [cite_start]<p className="mb-4"><strong>11.2 Your Acceptance:</strong> Your continued use of our Services after the effective date of any changes constitutes your acceptance of the updated Privacy Policy. [cite: 457, 458] [cite_start]If you do not agree with the changes, you should discontinue use of our Services and may request deletion of your account and personal information. [cite: 459]</p>
            [cite_start]<p className="mb-4"><strong>11.3 Review Recommendations:</strong> We encourage you to review this Privacy Policy periodically to stay informed about how we collect, use, and protect your information. [cite: 460, 461] [cite_start]The "Last Updated" date at the top of this policy indicates when it was most recently revised. [cite: 462]</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. [cite_start]Third-Party Links and Services [cite: 463]</h2>
            [cite_start]<p className="mb-4"><strong>12.1 External Links:</strong> Our Services may contain links to third-party websites, applications, or services that are not operated or controlled by OptiVoic. [cite: 464, 465] [cite_start]This Privacy Policy does not apply to those third-party services. [cite: 466]</p>
            [cite_start]<p className="mb-4"><strong>12.2 Third-Party Privacy Practices:</strong> We are not responsible for the privacy practices, content, or security of third-party services. [cite: 467, 468] [cite_start]We encourage you to review the privacy policies of any third-party services you access through our Services. [cite: 469]</p>
            [cite_start]<p className="mb-2"><strong>12.3 Third-Party Services We Use:</strong> We use the following third-party services that have their own privacy policies: [cite: 470, 471]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Google Analytics: https://policies.google.com/privacy [cite: 472]</li>
              [cite_start]<li>Google Tag Manager: https://policies.google.com/privacy [cite: 473]</li>
              [cite_start]<li>PayPal: https://www.paypal.com/us/webapps/mpp/ua/privacy-full [cite: 474]</li>
              [cite_start]<li>Gumroad: https://gumroad.com/privacy [cite: 475]</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">13. [cite_start]Data Protection Impact Assessments [cite: 476]</h2>
            [cite_start]<p className="mb-2"><strong>13.1 High-Risk Processing Activities:</strong> In accordance with data protection best practices and certain state privacy laws, we conduct Data Protection Impact Assessments (DPIAs) for processing activities that present heightened risks to consumer privacy, including: [cite: 477, 478]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Processing that involves targeted advertising [cite: 479]</li>
              [cite_start]<li>Sale or sharing of personal information (Note: We do not sell personal information) [cite: 480]</li>
              [cite_start]<li>Processing for profiling that may produce legal or similarly significant effects [cite: 481]</li>
              [cite_start]<li>Processing of sensitive personal information [cite: 482]</li>
              [cite_start]<li>Large-scale processing activities [cite: 483]</li>
            </ul>
            [cite_start]<p className="mb-2"><strong>13.2 DPIA Components:</strong> Our Data Protection Impact Assessments evaluate: [cite: 484, 485]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>The nature, scope, context, and purposes of processing [cite: 486]</li>
              [cite_start]<li>The benefits of processing for our business and users [cite: 487]</li>
              [cite_start]<li>The necessity and proportionality of processing in relation to purposes [cite: 488]</li>
              [cite_start]<li>Risks to consumer privacy and potential harms [cite: 489]</li>
              [cite_start]<li>Safeguards, security measures, and mechanisms to mitigate risks [cite: 490]</li>
              [cite_start]<li>Compliance with applicable privacy laws and regulations [cite: 491]</li>
            </ul>
            [cite_start]<p className="mb-4"><strong>13.3 Continuous Review:</strong> We regularly review and update our DPIAs as our processing activities evolve, new technologies are implemented, or legal requirements change. [cite: 492, 493]</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">14. [cite_start]Contact Information and Privacy Officer [cite: 494]</h2>
            [cite_start]<p className="mb-2"><strong>14.1 General Privacy Inquiries:</strong> If you have questions, concerns, or complaints about this Privacy Policy or our privacy practices, please contact us: [cite: 495, 496]</p>
            <div className="bg-white/5 p-4 rounded-md mb-4 border border-white/10">
              [cite_start]<p>OptiVoic Consulting and Software (d/b/a OptiVoic) [cite: 497]</p>
              [cite_start]<p>Email: hello@optivoic.com [cite: 497]</p>
              [cite_start]<p>Website: https://optivoic.com [cite: 497]</p>
            </div>
            
            [cite_start]<p className="mb-2"><strong>14.2 Data Protection Officer:</strong> We have designated a Data Protection Officer responsible for overseeing our privacy compliance program and handling privacy-related inquiries: [cite: 498, 499]</p>
            <div className="bg-white/5 p-4 rounded-md mb-4 border border-white/10">
              [cite_start]<p>Data Protection Officer [cite: 500]</p>
              [cite_start]<p>Email: hello@optivoic.com [cite: 500]</p>
              [cite_start]<p>Subject Line: "Attention: Data Protection Officer" [cite: 500]</p>
            </div>

            [cite_start]<p className="mb-2"><strong>14.3 Privacy Rights Requests:</strong> To submit a privacy rights request (access, deletion, correction, opt-out, or data portability), please: [cite: 501, 502]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Email us at: hello@optivoic.com with "Privacy Rights Request" in the subject line [cite: 503]</li>
              [cite_start]<li>Include your full name, email address, and account information (if applicable) [cite: 504]</li>
              [cite_start]<li>Clearly describe the request you are making [cite: 505]</li>
              [cite_start]<li>Provide sufficient information to verify your identity [cite: 506]</li>
            </ul>

            <p className="mb-2"><strong>14.4 Response Commitment:</strong> We are committed to responding to all privacy inquiries promptly and professionally. [cite_start]You can expect: [cite: 507, 508]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Acknowledgment of your inquiry within 5 business days [cite: 509]</li>
              [cite_start]<li>A substantive response within 45 days (or notification of any extension required) [cite: 510]</li>
              [cite_start]<li>Clear communication about the status and resolution of your request [cite: 511]</li>
              [cite_start]<li>Respect for your privacy rights and concerns [cite: 512]</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">15. [cite_start]State-Specific Disclosures [cite: 513]</h2>
            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">15.1 California Residents (CCPA/CPRA Disclosures) [cite: 514]</h3>
            [cite_start]<p className="mb-4"><strong>Categories of Personal Information Collected:</strong> In the preceding 12 months, we have collected the following categories of personal information: [cite: 515]</p>
            
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border-collapse border border-gray-700 text-sm">
                <thead>
                  <tr className="bg-gray-800">
                    [cite_start]<th className="border border-gray-700 px-4 py-2 text-left text-white">Category [cite: 516]</th>
                    [cite_start]<th className="border border-gray-700 px-4 py-2 text-left text-white">Examples [cite: 516]</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-900/50 text-gray-300">
                  <tr>
                    [cite_start]<td className="border border-gray-700 px-4 py-2 font-semibold">Identifiers [cite: 516]</td>
                    [cite_start]<td className="border border-gray-700 px-4 py-2">Name, email address, IP address, account username [cite: 516]</td>
                  </tr>
                  <tr>
                    [cite_start]<td className="border border-gray-700 px-4 py-2 font-semibold">Commercial Information [cite: 516]</td>
                    [cite_start]<td className="border border-gray-700 px-4 py-2">Purchase history, transaction records, consulting contracts [cite: 516]</td>
                  </tr>
                  <tr>
                    [cite_start]<td className="border border-gray-700 px-4 py-2 font-semibold">Internet Activity [cite: 516]</td>
                    [cite_start]<td className="border border-gray-700 px-4 py-2">Browsing history, search history, interaction with website [cite: 516]</td>
                  </tr>
                  <tr>
                    [cite_start]<td className="border border-gray-700 px-4 py-2 font-semibold">Geolocation Data [cite: 516]</td>
                    [cite_start]<td className="border border-gray-700 px-4 py-2">City and region-level location from IP address [cite: 516]</td>
                  </tr>
                  <tr>
                    [cite_start]<td className="border border-gray-700 px-4 py-2 font-semibold">Professional Information [cite: 516]</td>
                    [cite_start]<td className="border border-gray-700 px-4 py-2">Job title, company name, business contact information [cite: 516]</td>
                  </tr>
                  <tr>
                    [cite_start]<td className="border border-gray-700 px-4 py-2 font-semibold">Inferences [cite: 516]</td>
                    [cite_start]<td className="border border-gray-700 px-4 py-2">Preferences, characteristics, behavior predictions [cite: 516]</td>
                  </tr>
                </tbody>
              </table>
            </div>
            [cite_start]<p className="text-sm text-gray-500 mb-4">Table 1: Categories of personal information collected [cite: 517]</p>

            [cite_start]<p className="mb-2"><strong>Sources of Personal Information:</strong> [cite: 518]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Directly from you (account registration, purchases, communications) [cite: 519]</li>
              [cite_start]<li>Automatically through your use of our Services (cookies, analytics) [cite: 520]</li>
              [cite_start]<li>From third parties (payment processors, business partners) [cite: 521]</li>
            </ul>

            [cite_start]<p className="mb-2"><strong>Business or Commercial Purposes for Collection:</strong> [cite: 522]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Providing and managing Services [cite: 523]</li>
              [cite_start]<li>Processing transactions [cite: 524]</li>
              [cite_start]<li>Customer support and communications [cite: 525]</li>
              [cite_start]<li>Marketing and advertising (with consent) [cite: 526]</li>
              [cite_start]<li>Analytics and business intelligence [cite: 527]</li>
              [cite_start]<li>Security and fraud prevention [cite: 528]</li>
              [cite_start]<li>Legal compliance [cite: 529]</li>
            </ul>

            [cite_start]<p className="mb-2"><strong>Categories of Third Parties with Whom We Share Information:</strong> [cite: 530]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Service providers (payment processors, analytics providers, hosting providers) [cite: 531]</li>
              [cite_start]<li>Professional advisors (legal, accounting, consulting) [cite: 532]</li>
              [cite_start]<li>Government authorities (when required by law) [cite: 533]</li>
            </ul>

            [cite_start]<p className="mb-4"><strong>Sale of Personal Information:</strong> We do NOT sell personal information as defined by the CCPA/CPRA. [cite: 534]</p>
            [cite_start]<p className="mb-4"><strong>Sharing for Cross-Context Behavioral Advertising:</strong> We may share information with Google Analytics for advertising purposes, which may constitute "sharing" under CCPA/CPRA. [cite: 535] [cite_start]You can opt out of this sharing by adjusting your Google Ads Settings or using the Google Analytics Opt-out Browser Add-on. [cite: 536]</p>
            [cite_start]<p className="mb-4"><strong>Sensitive Personal Information:</strong> We do not collect categories of personal information defined as "sensitive" under the CCPA/CPRA (e.g., Social Security numbers, precise geolocation, health information, biometric data). [cite: 537]</p>
            [cite_start]<p className="mb-4"><strong>Retention:</strong> We retain personal information as described in Section 5 of this Privacy Policy (generally in perpetuity unless deletion is requested). [cite: 538]</p>
            [cite_start]<p className="mb-4"><strong>Financial Incentives:</strong> We do not currently offer financial incentives for the collection, retention, or sale of personal information. [cite: 539]</p>

            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">15.2 Virginia, Colorado, Connecticut, Utah, Montana, Oregon, Texas Residents [cite: 540]</h3>
            [cite_start]<p className="mb-2">Residents of these states have rights similar to those described in Section 7, including: [cite: 541]</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              [cite_start]<li>Right to access personal data [cite: 542]</li>
              [cite_start]<li>Right to correct inaccuracies [cite: 543]</li>
              [cite_start]<li>Right to delete personal data [cite: 544]</li>
              [cite_start]<li>Right to obtain a copy of personal data (data portability) [cite: 545]</li>
              [cite_start]<li>Right to opt out of targeted advertising (Note: We do not currently engage in targeted advertising that meets the statutory definitions) [cite: 546]</li>
              [cite_start]<li>Right to opt out of the sale of personal data (Note: We do not sell personal data) [cite: 547]</li>
              [cite_start]<li>Right to opt out of profiling in furtherance of automated decisions with legal or similarly significant effects [cite: 548]</li>
            </ul>
            [cite_start]<p className="mb-4"><strong>Appeals Process:</strong> If we deny your privacy rights request, you may appeal the decision by contacting us at hello@optivoic.com with "Privacy Rights Appeal" in the subject line. [cite: 549] [cite_start]We will respond to appeals within 60 days. [cite: 550]</p>

            [cite_start]<h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">15.3 Other State Residents [cite: 551]</h3>
            [cite_start]<p className="mb-4">If you reside in Delaware, Iowa, Indiana, Tennessee, Nebraska, New Hampshire, New Jersey, Kentucky, Maryland, Minnesota, Rhode Island, or any other state with comprehensive privacy laws, you have rights similar to those described above. [cite: 552] [cite_start]Please contact us to exercise your rights or for more information about how state-specific laws apply to you. [cite: 553]</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">16. [cite_start]Accessibility [cite: 554]</h2>
            [cite_start]<p className="mb-4">We are committed to ensuring this Privacy Policy is accessible to individuals with disabilities. [cite: 555] [cite_start]If you experience difficulty accessing any portion of this Privacy Policy or would like to request this policy in an alternative format, please contact us at hello@optivoic.com . [cite: 556]</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">17. [cite_start]Your Consent and Agreement [cite: 557]</h2>
            [cite_start]<p className="mb-4">By using our Services, you acknowledge that you have read this Privacy Policy, understand how we collect, use, and share your personal information, and consent to our data practices as described herein. [cite: 558] [cite_start]If you do not agree with this Privacy Policy, please do not use our Services. [cite: 559]</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">18. [cite_start]Effective Date and Acknowledgment [cite: 560]</h2>
            [cite_start]<p className="mb-4">This Privacy Policy is effective as of March 1, 2026, and applies to all information collected by OptiVoic from that date forward. [cite: 561] [cite_start]Information collected before this date remains subject to the privacy policy in effect at the time of collection. [cite: 562]</p>
            [cite_start]<p className="mb-4">Last Updated: February 27, 2026 [cite: 563]</p>
            <p className="mb-4 font-semibold text-cyan-400">Thank you for trusting OptiVoic with your information. [cite_start]We are committed to protecting your privacy and earning your continued trust. [cite: 564]</p>
            [cite_start]<p className="mb-4">For questions or concerns, please contact us at hello@optivoic.com . [cite: 565]</p>
          </section>

        </div>
      </main>
      
      {/* Footer */}
      <Footer />  
    </div>
  );
}