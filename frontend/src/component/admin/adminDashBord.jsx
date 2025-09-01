import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AdminSidebar from "../admin/adminSideBar";
import DashboardAdmin from "../admin/dashbordAdmin";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../css/admin/adminDashboard.css"; // New Admin CSS
import "../../css/admin/adminNavbar.css"; // New Admin Navbar CSS

export default function AdminDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
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

  useEffect(() => {
    if (location.pathname === "/admin") {
      navigate("/admin/dashboardAdmin", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <div className="admin-dashboard">
      <AdminSidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
      />

      <div className="main-content">
        <AdminNavbar toggleSidebar={toggleSidebar} />
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>

      {isMobile && sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar} />
      )}
    </div>
  );
}

/* ---------------- Navbar Component ---------------- */
function AdminNavbar({ toggleSidebar }) {
  return (
    <div className="admin-navbar">
      <button className="btn btn-link menu-btn" onClick={toggleSidebar}>
        <i className="bi bi-list fs-4"></i>
      </button>

      <h3 className="title mb-0">Admin Dashboard</h3>

      <div className="right-icons">
        <button className="btn btn-link">
          <i className="bi bi-bell-fill fs-5"></i>
          <span className="notification-badge">3</span>
        </button>
      </div>
    </div>
  );
}


