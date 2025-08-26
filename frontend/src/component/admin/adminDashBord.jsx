import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AdminSidebar from "../admin/adminSideBar";
import DashboardAdmin from "../admin/dashbordAdmin"; // Keep your existing import
import "bootstrap-icons/font/bootstrap-icons.css"; // ✅ Import Bootstrap Icons
import "../../css/Hr/HrDashboard.css";

export default function AdminDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  // Handle window resize for responsive sidebar
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

  // Redirect /admin to /admin/dashboardAdmin
  useEffect(() => {
    if (location.pathname === "/admin") {
      navigate("/admin/dashboardAdmin", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <div className="hr-dashboard">
      {/* Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
      />

      {/* Main Area */}
      <div className="main-content">
        <AdminNavbar toggleSidebar={toggleSidebar} />
        <div className="dashboard-content">
          <Outlet /> {/* Nested routes render here */}
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
function AdminNavbar({ toggleSidebar }) {
  return (
    <div className="hr-navbar">
      {/* Hamburger menu (mobile only) */}
      <button className="menu-btn" onClick={toggleSidebar}>
        <i className="bi bi-list"></i>
      </button>

      <h3 className="title">Admin Dashboard</h3>

      <div className="right-icons">
        <i className="bi bi-bell-fill"></i>
      </div>
    </div>
  );
}
