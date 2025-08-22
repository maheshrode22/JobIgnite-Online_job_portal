import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "../component/Navbar";
import Home from "../component/pages/home";
import About from "../component/pages/Reviews";
import Services from "../component/pages/Service";
import Contact from "../component/pages/Contact";
import Footer from "../component/footer";
import LogoLoader from "../component/LogoLoader";
import ScrollToTop from "../component/scrollto";
import HRAuth from "../component/hr/HRAuth";
import AdminLogin from "../component/AdminLogin";
import JobSeekerAuth from "../component/jobSeeker/JobseekerAuth";

function HomeRoutes() {
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
        <Route path="/HRAuth" element={<HRAuth/>}/>
        <Route path="/AdminLogin" element={<AdminLogin />} />
         <Route path="/jobSeekerAuth" element={<JobSeekerAuth />} />
      </Routes>
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default HomeRoutes;