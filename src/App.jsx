import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Storefront from "./components/Storefront";
import TemplateDetails from "./components/TemplateDetails";
import Consulting from "./components/Consulting";
import Terms from "./components/Terms";
import Privacy from "./components/Privacy";
import ClientPortal from "./components/ClientPortal";
import AdminDashboard from "./components/AdminDashboard";
import UpdatePassword from "./components/UpdatePassword"; // <-- NEW

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Storefront />} />
        <Route path="/template/:id" element={<TemplateDetails />} />
        <Route path="/consulting" element={<Consulting />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/portal" element={<ClientPortal />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/update-password" element={<UpdatePassword />} /> {/* <-- NEW */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;