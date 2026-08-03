import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Storefront from "./components/Storefront"; // Your homepage component
import ResellerCommandCenterPage from "./pages/ResellerCommandCenterPage";
import ExecutiveTaxEngine from "./components/ExecutiveTaxEngine"; // Specific template page
import Consulting from "./components/Consulting"; // Your consulting page
import Terms from "./components/Terms"; // Terms page
import Privacy from "./components/Privacy"; // Privacy policy page
import ClientPortal from "./components/ClientPortal"; // User client portal
import AdminDashboard from "./components/AdminDashboard"; // Admin dashboard
import UpdatePassword from "./components/UpdatePassword"; // Password update page
import OptiVoicLanding from "./components/OptiVoicLanding"; // AI Service landing page
import Marketplace from "./components/Marketplace"; // Your marketplace listing page
import ResellerCommandCenter from "./components/ResellerCommandCenter"; // Your specific Reseller Command Center detail page
import BlogPage from "./components/BlogPage"; // Blog listing page
import BlogPost from "./components/BlogPost"; // Individual blog post page
import FaqPage from "./components/FaqPage"; // FAQ page
import BlogAdmin from "./components/BlogAdmin"; // Blog admin page
import DownloadPage from "./components/DownloadPage"; // Download page for purchased items
import ScrollToTop from "./utils/ScrollToTop"; // Utility to scroll to top on route change


function App() {
  return (
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Storefront />} />
            <Route path="/marketplace" element={<Marketplace />} />
            {/* The page for this route was not provided, so using ResellerCommandCenterPage as a placeholder for a dynamic template page */}
            <Route path="/template/:templateId" element={<ResellerCommandCenterPage />} />
            <Route path="/reseller-command-center" element={<ResellerCommandCenter />} />
            <Route path="/tax-engine" element={<ExecutiveTaxEngine />} />
            <Route path="/consulting" element={<Consulting />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/portal" element={<ClientPortal />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/blog-admin" element={<BlogAdmin />} />
            <Route path="/download/:purchaseId" element={<DownloadPage />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            <Route path="/aiservice" element={<OptiVoicLanding />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/faq" element={<FaqPage />} />
          </Routes>
        </Layout>
      </Router>
  );
}

export default App;