import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../hr/sidebar";
import DashboardHome from "../hr/dashboard";
import HrNavbar from "./hrNavbar";
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
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
      />

      <div className="main-content">
        <HrNavbar toggleSidebar={toggleSidebar} />
        <div className="dashboard-content">
          {isDashboardRoute ? <DashboardHome /> : <Outlet />}
        </div>
      </div>

      {isMobile && sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar} />
      )}
    </div>
  );
}
