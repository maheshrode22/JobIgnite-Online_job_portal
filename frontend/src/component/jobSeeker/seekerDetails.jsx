import React, { useState, useEffect } from "react";
import "../../css/jobSeeker/seekerDetail.css";

const SeekerDetail = () => {
  const [seeker, setSeeker] = useState(null);

  useEffect(() => {
   
    const seekerData = JSON.parse(localStorage.getItem("seekerData"));

    if (seekerData) {
      setSeeker(seekerData);
    }
  }, []);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      localStorage.removeItem("seekerData");
      localStorage.removeItem("seeker_id");

      alert("Profile deleted successfully!");
      window.location.href = "/"; // redirect to home / login
    }
  };

  if (!seeker) return <p className="loading-text">Loading Seeker Profile...</p>;

  return (
    <div className="seekerprofile-container">
      <div className="seekerprofile-card">
        <h2 className="seeker-profile-title">Seeker Profile</h2>

        <div className="seekerprofile-item">
          <span className="label">Name:</span>
          <span className="value">{seeker.name}</span>
        </div>

        <div className="seekerprofile-item">
          <span className="label">Email:</span>
          <span className="value">{seeker.email}</span>
        </div>


        <div className="seekerprofile-item">
          <span className="label">Phone:</span>
          <span className="value">{seeker.phone || "-"}</span>
        </div>

        <div className="seekerprofile-item">
          <span className="label">Address</span>
          <span className="value">{seeker.address}</span>
        </div>

        <div className="seekerprofile-actions">
          <button
            className="btn edit"
            onClick={() => alert("Redirect to Update Page")}
          >
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

export default SeekerDetail;
