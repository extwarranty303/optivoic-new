import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Storefront from './components/Storefront';
import Consulting from './pages/Consulting';
import ScrollToTop from './utils/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Storefront />} />
        <Route path="/consulting" element={<Consulting />} />
      </Routes>
    </Router>
  );
}

export default App;