import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import JsSidebar from "../jobSeeker/jobseekerside";   // ✅ Jobseeker sidebar
import JsNavbar from "../jobSeeker/jsNavbar";         // ✅ Jobseeker navbar
import BrowseJobs from "../jobSeeker/browseJobs";     // ✅ Default dashboard page
import "../../css/jobSeeker/jsDashboard.css";         // ✅ Jobseeker CSS

export default function JsDashboard() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // ✅ default page for jobseeker dashboard → BrowseJobs
  const isDashboardRoute =
    location.pathname === "/jobseeker" ||
    location.pathname === "/jobseeker//browse-jobs";

  return (
    <div className="js-dashboard">
      <JsSidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
      />

      <div className="js-main-content">
        <JsNavbar toggleSidebar={toggleSidebar} />
        <div className="js-dashboard-content">
          {isDashboardRoute ? <BrowseJobs /> : <Outlet />}
        </div>
      </div>

      {isMobile && sidebarOpen && (
        <div className="js-sidebar-overlay" onClick={toggleSidebar} />
      )}
    </div>
  );
}
