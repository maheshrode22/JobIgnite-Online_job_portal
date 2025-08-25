import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../hr/sidebar";
import DashboardHome from "../hr/dashboard";
import "bootstrap-icons/font/bootstrap-icons.css"; // ✅ Import Bootstrap Icons
import "../../css/Hr/HrDashboard.css";

export default function HrDashboard() {
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

  const isDashboardRoute =
    location.pathname === "/hr/dashboard" || location.pathname === "/hr";

  return (
    <div className="hr-dashboard">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
      />

      {/* Main Area */}
      <div className="main-content">
        <HrNavbar toggleSidebar={toggleSidebar} />
        <div className="dashboard-content">
          {isDashboardRoute ? <DashboardHome /> : <Outlet />}
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar} />
      )}
    </div>
  );
}

/* ---------------- Navbar Component ---------------- */
function HrNavbar({ toggleSidebar }) {
  return (
    <div className="hr-navbar">
      {/* Hamburger menu (mobile only) */}
      <button className="menu-btn" onClick={toggleSidebar}>
        <i className="bi bi-list"></i>
      </button>

      <h3 className="title">HR Dashboard</h3>

      <div className="right-icons">
        <i className="bi bi-bell-fill"></i>
      </div>
    </div>
  );
}
