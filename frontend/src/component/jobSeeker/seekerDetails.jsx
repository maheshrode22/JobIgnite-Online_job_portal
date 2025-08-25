import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteSeeker } from "../../Services/SeekerService"; // make sure this exists
import "../../css/jobSeeker/seekerDetail.css";

const SeekerDetail = () => {
  const [seeker, setSeeker] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const seekerData = JSON.parse(localStorage.getItem("seekerData"));
    if (seekerData) setSeeker(seekerData);
  }, []);

  const handleDelete = async () => {
    if (!seeker) return;

    if (window.confirm("Are you sure you want to delete your profile?")) {
      try {
        // Call backend API to delete seeker
        await deleteSeeker(seeker.seeker_id);

        // Remove local storage data
        localStorage.removeItem("seekerData");
        localStorage.removeItem("seeker_id");

        alert("Profile deleted successfully!");
        navigate("/"); // redirect to home/login
      } catch (err) {
        console.error("Error deleting profile:", err);
        alert("Failed to delete profile. Please try again.");
      }
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
          <span className="label">Address:</span>
          <span className="value">{seeker.address || "-"}</span>
        </div>

        <div className="seekerprofile-actions">
          <button
            className="btn edit"
            onClick={() => navigate("/jobSeeker/profile/edit")}
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
