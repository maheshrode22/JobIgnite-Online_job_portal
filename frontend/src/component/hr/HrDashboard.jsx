import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../hr/sidebar";
import DashboardHome from "../hr/dashboard";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../css/Hr/HrDashboard.css";
import HrNavbar from "./hrNavbar";

export default function HrDashboard() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      }
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

      {/* Main Content */}
      <div className="main-content">
        <HrNavbar 
          toggleSidebar={toggleSidebar} 
          isMobile={isMobile} 
          sidebarOpen={sidebarOpen}
        />
        <div className="dashboard-content">
          {isDashboardRoute ? <DashboardHome /> : <Outlet />}
        </div>
      </div>
    </div>
  );
}
