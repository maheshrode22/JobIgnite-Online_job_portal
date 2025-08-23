import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import JsSidebar from "../jobSeeker/jobseekerside";  
import JsNavbar from "../jobSeeker/jsNavbar";         
import BrowseJobs from "../jobSeeker/browseJobs";    
import "../../css/jobSeeker/jsDashboard.css";         

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
    location.pathname === "/jobSeeker" ||
    location.pathname === "/jobSeeker/browse-jobs";

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
          {<Outlet />}
        </div>
      </div>

      {isMobile && sidebarOpen && (
        <div className="js-sidebar-overlay" onClick={toggleSidebar} />
      )}
    </div>
  );
}
