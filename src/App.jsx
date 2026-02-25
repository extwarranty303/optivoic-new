import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Storefront from "./components/Storefront";
import TemplateDetails from "./components/TemplateDetails";
import ExecutiveTaxEngine from "./components/ExecutiveTaxEngine";
import Consulting from "./components/Consulting";
import Terms from "./components/Terms";
import Privacy from "./components/Privacy";
import ClientPortal from "./components/ClientPortal";
import AdminDashboard from "./components/AdminDashboard";
import UpdatePassword from "./components/UpdatePassword"; // <-- NEW
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Storefront />} />
          <Route path="/template/:id" element={<TemplateDetails />} />
          <Route path="/tax-engine" element={<ExecutiveTaxEngine />} />
          <Route path="/consulting" element={<Consulting />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/portal" element={<ClientPortal />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/update-password" element={<UpdatePassword />} /> {/* <-- NEW */}
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;