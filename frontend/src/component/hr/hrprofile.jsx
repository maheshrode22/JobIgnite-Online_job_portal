import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../css/Hr/hrprofile.css";
import { jwtDecode } from "jwt-decode";

const HRProfile = () => {
  const [hr, setHr] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("hr_token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setHr(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className={`profile-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="loading-section">
          <div className="loading-spinner">
            <i className="bi bi-arrow-clockwise"></i>
          </div>
          <h3>Loading Profile...</h3>
          <p>Please wait while we fetch your information</p>
        </div>
      </div>
    );
  }

  if (!hr) {
    return (
      <div className={`profile-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="error-section">
          <div className="error-icon">
            <i className="bi bi-exclamation-triangle"></i>
          </div>
          <h3>Profile Not Found</h3>
          <p>Unable to load HR profile information</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            <i className="bi bi-arrow-clockwise me-2"></i>Try Again
          </button>
        </div>
      </div>
    );
  }

  const profileStats = [
    { label: "Jobs Posted", value: "24", icon: "bi-briefcase", color: "primary" },
    { label: "Applications", value: "156", icon: "bi-file-earmark-text", color: "info" },
    { label: "Interviews", value: "18", icon: "bi-calendar-event", color: "success" },
    { label: "Hires", value: "12", icon: "bi-person-check", color: "warning" }
  ];

  const recentActivities = [
    { action: "Posted new job: Frontend Developer", time: "2 hours ago", type: "job" },
    { action: "Shortlisted 5 candidates", time: "1 day ago", type: "shortlist" },
    { action: "Scheduled interview with John Doe", time: "2 days ago", type: "interview" },
    { action: "Updated company profile", time: "3 days ago", type: "update" }
  ];

  return (
    <div className={`profile-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-main">
          <div className="profile-picture-section">
            <div className="profile-picture-container">
              <div className="profile-picture">
                <span className="profile-initial">{hr.name?.charAt(0).toUpperCase()}</span>
              </div>
              <div className="completion-ring">
                <svg className="progress-ring" width="120" height="120">
                  <circle
                    className="progress-ring-circle-bg"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="transparent"
                    r="52"
                    cx="60"
                    cy="60"
                  />
                  <circle
                    className="progress-ring-circle"
                    stroke="#10b981"
                    strokeWidth="8"
                    fill="transparent"
                    r="52"
                    cx="60"
                    cy="60"
                    strokeDasharray="326.73"
                    strokeDashoffset="35.94"
                  />
                </svg>
              </div>
              <div className="completion-percentage">89%</div>
            </div>
          </div>
          
          <div className="profile-details">
            <div className="name-section">
              <h1 className="profile-name">{hr.name}</h1>
              <button className="edit-name-btn">
                <i className="bi bi-pencil"></i>
              </button>
            </div>
            
            <div className="qualification-section">
              <p className="qualification">HR Manager</p>
              <p className="institution">{hr.company_name || "Company Name"}</p>
            </div>
            
            <div className="divider"></div>
            
            <div className="contact-details">
              <div className="detail-item">
                <i className="bi bi-geo-alt"></i>
                <span>Pune</span>
              </div>
              <div className="detail-item">
                <i className="bi bi-gender-male"></i>
                <span>Male</span>
              </div>
              <div className="detail-item">
                <i className="bi bi-calendar-event"></i>
                <span>23rd January 2003</span>
              </div>
              <div className="detail-item">
                <i className="bi bi-telephone"></i>
                <span>{hr.phone || "Phone Number"}</span>
                <i className="bi bi-check-circle-fill verified-icon"></i>
              </div>
              <div className="detail-item">
                <i className="bi bi-envelope"></i>
                <span>{hr.email}</span>
                <i className="bi bi-check-circle-fill verified-icon"></i>
              </div>
            </div>
          </div>
        </div>
        

      </div>

      {/* Profile Stats */}
      <div className="profile-stats">
        {profileStats.map((stat, index) => (
          <div key={index} className={`stat-card stat-${stat.color}`}>
            <div className="stat-icon">
              <i className={`bi ${stat.icon}`}></i>
            </div>
            <div className="stat-content">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Profile Content */}
      <div className="profile-content">
        <div className="content-grid">
          {/* Main Profile Information */}
          <div className="profile-section">
            <div className="section-header">
              <h3>Profile Information</h3>
              <p>Your personal and professional details</p>
            </div>
            
            <div className="info-grid">
              <div className="info-card">
                <div className="info-icon">
                  <i className="bi bi-building"></i>
                </div>
                <div className="info-content">
                  <label>Company Name</label>
                  <span>{hr.company_name || "Not specified"}</span>
                </div>
              </div>
              
              <div className="info-card">
                <div className="info-icon">
                  <i className="bi bi-person-badge"></i>
                </div>
                <div className="info-content">
                  <label>Role</label>
                  <span>HR Manager</span>
                </div>
              </div>
              
              <div className="info-card">
                <div className="info-icon">
                  <i className="bi bi-calendar-check"></i>
                </div>
                <div className="info-content">
                  <label>Member Since</label>
                  <span>{new Date().getFullYear()}</span>
                </div>
              </div>
              
              <div className="info-card">
                <div className="info-icon">
                  <i className="bi bi-check-circle"></i>
                </div>
                <div className="info-content">
                  <label>Status</label>
                  <span className={`status-badge ${hr.status?.toLowerCase() === 'active' ? 'active' : 'pending'}`}>
                    {hr.status || "Pending"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="profile-section">
            <div className="section-header">
              <h3>Recent Activity</h3>
              <p>Your latest actions and updates</p>
            </div>
            
            <div className="activity-list">
              {recentActivities.map((activity, index) => (
                <div key={index} className={`activity-item activity-${activity.type}`}>
                  <div className="activity-icon">
                    <i className={`bi ${getActivityIcon(activity.type)}`}></i>
                  </div>
                  <div className="activity-content">
                    <div className="activity-text">{activity.action}</div>
                    <div className="activity-time">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get activity icons
function getActivityIcon(type) {
  const icons = {
    job: 'bi-briefcase',
    shortlist: 'bi-person-check',
    interview: 'bi-calendar-event',
    update: 'bi-pencil-square'
  };
  return icons[type] || 'bi-info-circle';
}

export default HRProfile;