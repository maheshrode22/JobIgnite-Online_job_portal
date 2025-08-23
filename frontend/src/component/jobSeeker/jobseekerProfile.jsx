import React, { useState, useEffect } from "react";
import { jobSeekerProfile, getProfileById } from "../../Services/SeekerService";
import "../../css/jobSeeker/jobseekerProfile.css";

const SeekerProfile = () => {
  const seeker_id = localStorage.getItem("seeker_id");

  const [formData, setFormData] = useState({
    profile_id: "", // hidden
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

    const profileData = { seeker_id, ...formData }; // include hidden fields
    jobSeekerProfile(profileData)
      .then(() => {
        alert("Profile saved successfully!");
        setProfileExists(true);
        setIsEditing(false);
      })
      .catch((err) => {
        console.error("Error saving profile:", err);
        alert("Failed to save profile. Please try again.");
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

        {/* Form Fields */}
        <div className="form-grid">
  {Object.keys(formData)
    .filter((key) => key !== "seeker_id" && key !== "profile_id") // hide hidden fields
    .map((key) => (
      <div className="seekerprofile-item" key={key}>
        <label>
          {key.replace("_", " ").toUpperCase()}
          {(key.includes("marks")) ? " (%)" : ""} :
        </label>

        {key === "gender" ? (
          !profileExists ? ( // Only show select when adding profile
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <input
              type="text"
              name="gender"
              value={formData.gender}
              disabled // read-only for existing profile
            />
          )
        ) : (
          <input
            type={key === "dob" ? "date" : "text"}
            name={key}
            value={formData[key]}
            onChange={handleChange}
            disabled={profileExists && !isEditing}
          />
        )}
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
