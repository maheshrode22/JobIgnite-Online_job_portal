import React, { useState, useEffect } from "react";
import "../../css/Hr/hrprofile.css";

const HRProfile = () => {
  const [hr, setHr] = useState(null);

  // Mock HR data
  useEffect(() => {
    const mockData = {
      hr_name: "John Doe",
      company_name: "Tech Solutions",
      email: "john.doe@example.com",
      phone: "9876543210",
      status: "approved"
    };
    setTimeout(() => setHr(mockData), 500);
  }, []);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      alert("Profile deleted successfully!");
      window.location.href = "/";
    }
  };

  if (!hr) return <p className="loading-text">Loading HR Profile...</p>;

  return (
    <div className="hr-profile-container">
      <div className="profile-card">
        <h2 className="profile-title">HR Profile</h2>

        <div className="profile-item">
          <span className="label">Name:</span>
          <span className="value">{hr.hr_name}</span>
        </div>

        <div className="profile-item">
          <span className="label">Company:</span>
          <span className="value">{hr.company_name}</span>
        </div>

        <div className="profile-item">
          <span className="label">Email:</span>
          <span className="value">{hr.email}</span>
        </div>

        <div className="profile-item">
          <span className="label">Phone:</span>
          <span className="value">{hr.phone || "-"}</span>
        </div>

        <div className="profile-item">
          <span className="label">Status:</span>
          <span className={`value status ${hr.status.toLowerCase()}`}>
            {hr.status}
          </span>
        </div>

        <div className="profile-actions">
          <button className="btn edit" onClick={() => alert("Redirect to Update Page")}>
            Edit Profile
          </button>
          <button className="btn delete" onClick={handleDelete}>
            Delete Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default HRProfile;
