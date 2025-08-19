import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Components
import Navbar from "./component/Navbar";
import Home from "./component/pages/home";
import About from "./component/pages/Reviews";
import Services from "./component/pages/Service";
import Contact from "./component/pages/Contact";
import Footer from "./component/footer";
import LogoLoader from "./component/LogoLoader"; 
import ScrollToTop from "./component/scrollto";
import AdminLogin from "./component/AdminLogin";

// Route groups
import HomeRoutes from "./routes/homeRoutes";
import HrRoutes from "./routes/HrRoutes";
import HRAuth from "./component/hr/HRAuth";

// Loader wrapper for pages
function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 150);
    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <>
      {loading && <LogoLoader />}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/HRAuth" element={<HRAuth/>}/>
      </Routes>
      <Footer />
    </>
  );
}

// Main App
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* General site routes */}
        <Route path="/*" element={<AppContent />} />
        {/* HR-related routes */}
        <Route path="/hr/*" element={<HrRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
