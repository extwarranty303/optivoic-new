import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const NoiseOverlay = () => (
  <div
    className="fixed inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-0"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  ></div>
);

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#020202] text-gray-300 font-sans selection:bg-cyan-500 selection:text-white relative overflow-hidden">
      <NoiseOverlay />
      <div className="fixed bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-cyan-600/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <nav className="relative z-50 border-b border-white/10 py-6 px-8 flex items-center bg-black/30 backdrop-blur-2xl">
        <Link
          to="/"
          className="text-gray-400 hover:text-cyan-400 font-semibold flex items-center gap-2 transition-colors"
        >
          <span>←</span> Back to Storefront
        </Link>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-8 py-20">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-gray-500 mb-12 uppercase tracking-widest text-sm font-bold">
          Effective Date: March 1, 2026 · Last Updated: February 27, 2026
        </p>

        <div className="prose prose-invert max-w-none prose-headings:text-white prose-a:text-cyan-400 prose-strong:text-gray-100 space-y-6 text-base md:text-lg leading-relaxed font-light">
          <h2>PRIVACY POLICY</h2>
          <h3>OptiVoic Consulting and Software (d/b/a OptiVoic)</h3>

          <h4>Contact Information</h4>
          <p>Email: <a href="mailto:hello@optivoic.com">hello@optivoic.com</a></p>
          <p>Website: <a href="https://optivoic.com" target="_blank" rel="noreferrer">https://optivoic.com</a></p>

          <h3>1. Introduction</h3>
          <p>
            OptiVoic Consulting and Software (“OptiVoic,” “we,” “us,” or “our”) is committed to protecting your privacy and
            ensuring transparency in how we collect, use, store, and share your personal information. This Privacy Policy
            applies to all OptiVoic digital properties, including our website at{' '}
            <a href="https://optivoic.com" target="_blank" rel="noreferrer">
              https://optivoic.com
            </a>{' '}
            and any related services, products, and platforms (collectively, the “Services”).
          </p>
          <p>
            We provide B2C and B2B template systems designed to help individuals and businesses track various lifestyle and
            business operations, including tools for gig workers to track revenue and taxes, digital nomad route trackers,
            and similar workflow solutions primarily built using Excel and Notion. We also offer technology consulting
            services to B2B customers in the areas of Tech and AI Systems, and E-commerce &amp; Reselling.
          </p>
          <p>
            <strong>We never sell your personal data to third-party companies.</strong> We respect and honor consumer data
            privacy rights and are committed to complying with all applicable federal, state, and local data protection laws
            in the United States.
          </p>
          <p>This Privacy Policy is designed to help you understand:</p>
          <ol>
            <li>What personal information we collect and why we collect it</li>
            <li>How we use, store, and protect your information</li>
            <li>Your rights regarding your personal data</li>
            <li>How to exercise those rights</li>
            <li>Our legal basis for processing your information</li>
          </ol>
          <p>
            By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by this
            Privacy Policy. If you do not agree with our practices, please do not use our Services.
          </p>

          <h3>2. Information We Collect</h3>
          <p>
            We collect various types of information to provide, maintain, improve, and protect our Services. The information we
            collect falls into the following categories:
          </p>

          <h4>2.1 Information You Provide Directly</h4>
          <p><strong>Account Information:</strong> When you create an account or register for our Services, we may collect:</p>
          <ol>
            <li>Name (first and last)</li>
            <li>Email address</li>
            <li>Username and password</li>
            <li>Company name and job title (for B2B customers)</li>
            <li>Professional information related to consulting engagements</li>
          </ol>

          <p><strong>Payment Information (Consulting Services Only):</strong> For our technology consulting services, we collect payment information necessary to process transactions, including:</p>
          <ol>
            <li>Credit card or debit card information</li>
            <li>Bank account details for wire transfers or ACH payments</li>
            <li>Billing address</li>
            <li>Payment history and invoice records</li>
          </ol>
          <p>
            <strong>Important Note:</strong> For customers purchasing template systems through our website or our partner
            Gumroad, we do NOT collect or store payment information. All payment processing for these transactions is handled
            securely by PayPal or Gumroad through direct APIs using encrypted workflows and processes. For consulting services,
            payment information is stored in a secure, encrypted CRM environment, and payments are typically processed through
            PayPal, although we do accept offline payments as well.
          </p>

          <p><strong>Communications:</strong> When you contact us via email, contact forms, support tickets, or other communication channels, we collect:</p>
          <ol>
            <li>The content of your messages</li>
            <li>Your contact information</li>
            <li>Any attachments or files you send</li>
            <li>Communication preferences</li>
          </ol>

          <p><strong>Consulting Engagement Information:</strong> For B2B consulting clients, we may collect:</p>
          <ol>
            <li>Project requirements and specifications</li>
            <li>Business objectives and goals</li>
            <li>Technical environment details</li>
            <li>Contractual documentation</li>
            <li>Work product and deliverables</li>
          </ol>

          <p><strong>User-Provided Data for Template Systems:</strong> When you use our template systems, you may input personal data relevant to your use case (e.g., revenue figures, expense tracking, travel routes). This data remains under your control within the templates you download, and we do not automatically collect or access this information unless you share it with us for support purposes.</p>

          <h4>2.2 Information Collected Automatically</h4>
          <p><strong>Google Analytics Data Collection:</strong> We use Google Analytics 4 (GA4) to understand how visitors interact with our Services. This involves several specific data collection methods that you should be aware of:</p>

          <p><strong>Google Signals Data Collection:</strong> We have enabled Google Signals in Google Analytics, which allows us to collect additional data about users who are signed into their Google accounts and have turned on Ads Personalization. Google Signals enables:</p>
          <ol>
            <li>Cross-device tracking and reporting</li>
            <li>Remarketing with Google Analytics audiences</li>
            <li>Advertising reporting features including Demographics and Interests reports</li>
            <li>Collection of aggregated demographic data (age, gender, interests)</li>
          </ol>
          <p>
            When Google Signals is active, Google Analytics associates your activity on our website with your Google account information.
            This data is used in aggregate form to help us understand user behavior patterns and improve our Services.
          </p>

          <p><strong>User-ID Collection:</strong> We may implement User-ID tracking in Google Analytics, which allows us to associate multiple sessions and activity from different devices with a unique, non-personally identifiable ID. This helps us:</p>
          <ol>
            <li>Understand user engagement across multiple sessions and devices</li>
            <li>Analyze user behavior patterns more accurately</li>
            <li>Provide a better user experience across platforms</li>
          </ol>
          <p>
            The User-ID is a unique identifier we assign to users, but it is NOT directly linked to personally identifiable information in
            our Google Analytics reporting. However, it may be associated with your account information in our internal systems.
          </p>

          <p><strong>Granular Location and Device Data Collection:</strong> Through Google Analytics and other technologies, we collect granular location and device information, including:</p>
          <p><strong>Location Data:</strong></p>
          <ol>
            <li>IP address (which can indicate approximate geographic location)</li>
            <li>City and region-level location data</li>
            <li>Language and locale settings</li>
            <li>Time zone</li>
          </ol>
          <p><strong>Device Data:</strong></p>
          <ol>
            <li>Device type (desktop, mobile, tablet)</li>
            <li>Operating system and version</li>
            <li>Browser type and version</li>
            <li>Screen resolution and display settings</li>
            <li>Device manufacturer and model</li>
            <li>Unique device identifiers</li>
            <li>Mobile network information (when applicable)</li>
          </ol>

          <p><strong>Usage Data and Analytics:</strong> We automatically collect information about how you interact with our Services:</p>
          <ol>
            <li>Pages viewed and content accessed</li>
            <li>Time spent on pages</li>
            <li>Navigation paths and click behavior</li>
            <li>Search queries within our Services</li>
            <li>Referring and exit pages</li>
            <li>Date and time stamps of activities</li>
            <li>Error logs and performance data</li>
          </ol>

          <p><strong>Google Tag Manager:</strong> We use Google Tag Manager (GTM) to manage and deploy analytics and marketing tags on our website. GTM itself does not collect personal data, but it enables other services (like Google Analytics) to collect data. Any data collection performed through tags managed by GTM is subject to the privacy policies of those respective services and this Privacy Policy.</p>

          <h4>2.3 Cookies and Similar Technologies</h4>
          <p>
            We use cookies and similar tracking technologies to collect information and improve your experience. A cookie is a small text
            file stored on your device that helps us recognize you and remember your preferences.
          </p>
          <p><strong>Types of Cookies We Use:</strong></p>
          <ol>
            <li><strong>Essential Cookies:</strong> Necessary for the website to function properly, including authentication and security</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our Services through Google Analytics</li>
            <li><strong>Performance Cookies:</strong> Collect information about how you use our Services to improve functionality</li>
          </ol>
          <p><strong>Cookie Duration:</strong></p>
          <ol>
            <li><strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser</li>
            <li><strong>Persistent Cookies:</strong> Remain on your device for a set period or until manually deleted</li>
          </ol>
          <p>
            You can control cookie preferences through your browser settings. However, disabling cookies may affect the functionality of
            our Services.
          </p>

          {/* CONTINUE THE PATTERN FOR THE REST OF THE SECTIONS FROM THE DOC:
              2.4 Information from Third-Party Sources
              2.5 Information We Do NOT Collect
              3. How We Use Your Information
              3.1–3.8 (including Advanced Settings for Ads Personalization and Future AI/ML)
              4. How We Share Your Information
              5. Data Retention
              6. Data Security
              7. Your Privacy Rights (state-specific rights, GPC, etc.)
              8. Cookies and Tracking Technologies (detailed GA cookies, opt-out, GPC)
              9. International Data Transfers
              10. Children’s Privacy
              11. Changes to This Privacy Policy
              12. Third-Party Links and Services
              13. Data Protection Impact Assessments
              14. Contact Information and Privacy Officer
              15. State-Specific Disclosures
              16. Accessibility
              17. Your Consent and Agreement
              18. Effective Date and Acknowledgment
          */}

          <p className="mt-8">
            For the full details of each section, please review this Privacy Policy in its entirety. If you have any questions or wish to exercise your privacy rights, contact us at{' '}
            <a href="mailto:hello@optivoic.com">hello@optivoic.com</a>.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
