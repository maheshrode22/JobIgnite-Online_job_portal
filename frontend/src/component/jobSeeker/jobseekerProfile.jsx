import React, { useState, useEffect } from "react";
import { jobSeekerProfile, getProfileById } from "../../Services/SeekerService";
import "../../css/jobSeeker/jobseekerProfile.css";

const SeekerProfile = () => {
  const seeker_id = localStorage.getItem("seeker_id");

  const [formData, setFormData] = useState({
    gender: "",
    dob: "",
    skills: "",
    degree: "",
    university: "",
    cgpa: "",
    hsc_year: "",
    hsc_marks: "",
    ssc_year: "",
    ssc_marks: "",
  });

  const [profileExists, setProfileExists] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // ✅ Fetch Profile if Exists
  useEffect(() => {
    if (seeker_id) {
      getProfileById(seeker_id)
        .then((res) => {
          if (res && res.data) {
            setProfileExists(true);
            setFormData(res.data);
          }
        })
        .catch(() => {
          setProfileExists(false);
        });
    }
  }, [seeker_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!seeker_id) {
      alert("Seeker ID not found. Please log in again.");
      return;
    }

    const profileData = { seeker_id, ...formData };

    jobSeekerProfile(profileData)
      .then(() => {
        alert("Profile added successfully!");
        setProfileExists(true);
      })
      .catch((err) => {
        console.error("Error adding profile:", err);
        alert("Failed to add profile. Please try again.");
      });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="seekerprofile-container">
      <div className="seekerprofile-card">
        <h2 className="seeker-profile-title">
          {profileExists ? "Job Seeker Profile" : "Add Job Seeker Profile"}
        </h2>

        {/* Two Inputs in One Row */}
        <div className="form-grid">
          {Object.keys(formData).map((key, index) => (
            <div className="seekerprofile-item" key={key}>
              <label>{key.replace("_", " ").toUpperCase()}:</label>
              <input
                type={key === "dob" ? "date" : "text"}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                disabled={profileExists && !isEditing} // Disable if profile exists & not in edit mode
              />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="seekerprofile-actions">
          {!profileExists && (
            <button className="btn save" onClick={handleSave}>
              Add Profile
            </button>
          )}

          {profileExists && !isEditing && (
            <button className="btn edit" onClick={handleEdit}>
              Edit Profile
            </button>
          )}

          {isEditing && (
            <button className="btn save" onClick={handleSave}>
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeekerProfile;
