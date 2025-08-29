import React, { useState, useEffect } from "react";
import "../../css/Hr/hrNavbar.css";
import { jwtDecode } from "jwt-decode";

export default function HrNavbar({ toggleSidebar, isMobile, sidebarOpen }) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [userData, setUserData] = useState({
    name: "HR",
    email: "",
    role: "HR Manager"
  });

  useEffect(() => {
    // Get user data from token
    const token = localStorage.getItem("hr_token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserData({
          name: decoded.name || "HR",
          email: decoded.email || "",
          role: decoded.role || "HR Manager"
        });
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem("hr_token");
    localStorage.removeItem("hr_user");
    window.location.href = "/";
  };

  const handleProfileSettings = () => {
    // Navigate to profile settings
    window.location.href = "/hr/hrprofile";
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-dropdown-container')) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className={`hrnavbar ${sidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Left Section - Sidebar Toggle */}
      <div className="navbar-left">
        {isMobile ? (
          <button 
            className="navbar-toggle-btn" 
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <i className="bi bi-list"></i>
          </button>
        ) : (
          <button 
            className="navbar-toggle-btn" 
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <i className={`bi ${sidebarOpen ? "bi-chevron-right" : "bi-chevron-left"}`}></i>
          </button>
        )}
      </div>

      {/* Center Section - Title */}
      <div className="navbar-center">
        <div className="hr-panel-title">
          <span className="hr-text">HR</span>
          <span className="panel-text">Panel</span>
        </div>
      </div>

      {/* Right Section - Actions */}
      <div className="navbar-right">
        <div className="navbar-actions">
          <button 
            className="navbar-action-btn" 
            title="Notifications"
            aria-label="Notifications"
          >
            <i className="bi bi-bell-fill"></i>
            <span className="notification-badge">3</span>
          </button>
          
          {/* Profile Section */}
          <div className="profile-dropdown-container">
            <button 
              className="profile-btn"
              onClick={handleProfileClick}
              aria-label="Profile menu"
            >
              <div className="profile-avatar">
                <span className="profile-initial">
                  {userData.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="profile-info">
                <span className="profile-name">{userData.name}</span>
                <span className="profile-role">{userData.role}</span>
              </div>
              <i className={`bi bi-chevron-down profile-arrow ${showProfileDropdown ? 'rotated' : ''}`}></i>
            </button>

            {/* Profile Dropdown */}
            {showProfileDropdown && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <div className="dropdown-avatar">
                    <span className="dropdown-initial">
                      {userData.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="dropdown-user-info">
                    <h6 className="dropdown-name">{userData.name}</h6>
                    <p className="dropdown-email">{userData.email}</p>
                    <span className="dropdown-role">{userData.role}</span>
                  </div>
                </div>
                
                <div className="dropdown-divider"></div>
                
                <div className="dropdown-menu">
                  <button 
                    className="dropdown-item"
                    onClick={handleProfileSettings}
                  >
                    <i className="bi bi-person-circle"></i>
                    <span>My Profile</span>
                  </button>
                  
                  <button className="dropdown-item">
                    <i className="bi bi-gear"></i>
                    <span>Settings</span>
                  </button>
                  
                  <button className="dropdown-item">
                    <i className="bi bi-question-circle"></i>
                    <span>Help & Support</span>
                  </button>
                  
                  <div className="dropdown-divider"></div>
                  
                  <button 
                    className="dropdown-item logout-item"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
