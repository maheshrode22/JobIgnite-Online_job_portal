import React, { useState, useEffect } from "react";
import { jobSeekerProfile, getProfileById, updateProfile } from "../../Services/SeekerService";
import "../../css/jobSeeker/jobseekerProfile.css";

const SeekerProfile = () => {
  const seeker_id = localStorage.getItem("seeker_id");

  const [formData, setFormData] = useState({
    profile_id: "",
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

  // Fetch existing profile
  useEffect(() => {
    if (seeker_id) {
      getProfileById(seeker_id)
        .then((res) => {
          if (res && res.data) {
            const data = { ...res.data };

            // Normalize gender
            if (data.gender) {
              const g = data.gender.trim().toLowerCase();
              if (g === "male") data.gender = "Male";
              else if (g === "female") data.gender = "Female";
              else if (g === "other") data.gender = "Other";
              else data.gender = "";
            } else {
              data.gender = "";
            }

            // Format DOB to yyyy-MM-dd
            if (data.dob) {
              data.dob = new Date(data.dob).toISOString().split("T")[0];
            }

            setProfileExists(true);
            setFormData(data);
          }
        })
        .catch(() => setProfileExists(false));
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

    if (profileExists && isEditing) {
      // Update profile
      updateProfile(profileData)
        .then(() => {
          alert("Profile updated successfully!");
          setIsEditing(false);
        })
        .catch((err) => {
          console.error("Error updating profile:", err);
          alert("Failed to update profile. Please try again.");
        });
    } else {
      // Add new profile
      jobSeekerProfile(profileData)
        .then(() => {
          alert("Profile added successfully!");
          setProfileExists(true);
          setIsEditing(false);
        })
        .catch((err) => {
          console.error("Error saving profile:", err);
          alert("Failed to save profile. Please try again.");
        });
    }
  };

  const handleEdit = () => setIsEditing(true);

  return (
    <div className="seekerprofile-container">
      <div className="seekerprofile-card">
        <h2 className="seeker-profile-title">
          {profileExists ? "Job Seeker Profile" : "Add Job Seeker Profile"}
        </h2>

        <div className="form-grid">
          {Object.keys(formData)
            .filter((key) => key !== "seeker_id" && key !== "profile_id")
            .map((key) => (
              <div className="seekerprofile-item" key={key}>
                <label>
                  {key.replace("_", " ").toUpperCase()}
                  {(key.includes("marks") || key === "cgpa") ? " (%)" : ""} :
                </label>

                {key === "gender" ? (
                  <select
                    name="gender"
                    value={formData.gender || ""}
                    onChange={handleChange}
                    disabled={!isEditing && profileExists}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <input
                    type={key === "dob" ? "date" : "text"}
                    name={key}
                    value={formData[key] || ""}
                    onChange={handleChange}
                    disabled={profileExists && !isEditing}
                  />
                )}
              </div>
            ))}
        </div>

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
