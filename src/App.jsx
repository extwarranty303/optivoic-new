import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FullscreenNav from "./components/FullscreenNav";
import Storefront from "./components/Storefront";
import TemplateDetails from "./components/TemplateDetails";
import ExecutiveTaxEngine from "./components/ExecutiveTaxEngine";
import Consulting from "./components/Consulting";
import Terms from "./components/Terms";
import Privacy from "./components/Privacy";
import ClientPortal from "./components/ClientPortal";
import AdminDashboard from "./components/AdminDashboard";
import UpdatePassword from "./components/UpdatePassword";
import OptiVoicLanding from "./components/OptiVoicLanding";
import Marketplace from "./components/Marketplace";
import ResellerCommandCenter from "./components/ResellerCommandCenter";
import BlogPage from "./components/BlogPage";
import BlogPost from "./components/BlogPost";
import FaqPage from "./components/FaqPage";
import BlogAdmin from "./components/BlogAdmin";
import DownloadPage from "./components/DownloadPage";


function App() {
  return (
      <Router>
        <FullscreenNav />
        <Routes>
          <Route path="/" element={<Storefront />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/template/:id" element={<TemplateDetails />} />
          <Route path="/reseller-command-center" element={<ResellerCommandCenter />} />
          <Route path="/tax-engine" element={<ExecutiveTaxEngine />} />
          <Route path="/consulting" element={<Consulting />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/portal" element={<ClientPortal />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/blog-admin" element={<BlogAdmin />} />
          <Route path="/download/:purchaseId" element={<DownloadPage />} />
          <Route path="/update-password" element={<UpdatePassword />} /> {/* <-- NEW */}
          <Route path="/aiservice" element={<OptiVoicLanding />} /> {/* <-- NEW */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/faq" element={<FaqPage />} />
        </Routes>
      </Router>
  );
}

export default App;