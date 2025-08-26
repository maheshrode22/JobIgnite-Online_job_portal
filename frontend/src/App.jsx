import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Components
import ScrollToTop from "./component/scrollto";

// Route groups
import HomeRoutes from "./routes/homeRoutes";
import HrRoutes from "./routes/HrRoutes";
import JobSeekerRoutes from "./routes/JobSeekerRoutes";
import AdminRoutes from "./routes/adminRoutes";

// Loader wrapper for pages
function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 150);
    return () => clearTimeout(timeout);
  }, [location]);
}

// Main App
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* General site routes */}
        <Route path="/*" element={<HomeRoutes />} />
        {/* HR-related routes */}
        <Route path="/hr/*" element={<HrRoutes />} />

        <Route path="/jobSeeker/*" element={<JobSeekerRoutes />} />

        <Route path="/Admin/*" element={<AdminRoutes />} />
      </Routes>

    </Router>
  );
}

export default App;