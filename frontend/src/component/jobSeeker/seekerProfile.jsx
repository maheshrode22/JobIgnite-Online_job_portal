// src/component/jobSeeker/SeekerProfileUpdate.js
import React, { useState, useEffect } from "react";
import { getProfile, seekerProfile, updateProfile } from "../../services/SeekerService";

export default function SeekerProfileUpdate({ seekerId }) {
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(true); // initially adding profile

  useEffect(() => {
    // Fetch existing profile
    getProfile(seekerId).then((res) => {
      if (res.data.profile) {
        setProfile(res.data.profile);
        setIsEditing(false); // profile exists, show view mode
      }
    }).catch((err) => {
      console.error("Error fetching profile:", err);
    });
  }, [seekerId]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const profileData = { seeker_id: seekerId, ...profile }; // include seekerId

    if (isEditing) {
      if (profile.profile_id) {
        // Update existing profile
        updateProfile(profileData).then(() => {
          alert("Profile updated successfully!");
          setIsEditing(false);
        }).catch((err) => console.error(err));
      } else {
        // Add new profile
        seekerProfile(profileData).then(() => {
          alert("Profile added successfully!");
          setIsEditing(false);
        }).catch((err) => console.error(err));
      }
    }
  };

  return (
    <div className="container mt-3">
      <h3>Jobseeker Profile</h3>
      <form onSubmit={handleSubmit}>
        {/* Gender */}
        <div className="mb-3">
          <label>Gender</label>
          <select
            name="gender"
            className="form-control"
            value={profile.gender || ""}
            onChange={handleChange}
            disabled={!isEditing}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Date of Birth */}
        <div className="mb-3">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            className="form-control"
            value={profile.dob || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        {/* Skills */}
        <div className="mb-3">
          <label>Skills</label>
          <textarea
            name="skills"
            className="form-control"
            value={profile.skills || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        {/* Degree */}
        <div className="mb-3">
          <label>Degree</label>
          <input
            type="text"
            name="degree"
            className="form-control"
            value={profile.degree || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        {/* University */}
        <div className="mb-3">
          <label>University</label>
          <input
            type="text"
            name="university"
            className="form-control"
            value={profile.university || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        {/* CGPA */}
        <div className="mb-3">
          <label>CGPA</label>
          <input
            type="number"
            step="0.01"
            name="cgpa"
            className="form-control"
            value={profile.cgpa || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        {/* HSC Year */}
        <div className="mb-3">
          <label>HSC Year</label>
          <input
            type="number"
            name="hsc_year"
            className="form-control"
            value={profile.hsc_year || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        {/* HSC Marks */}
        <div className="mb-3">
          <label>HSC Marks</label>
          <input
            type="number"
            step="0.01"
            name="hsc_marks"
            className="form-control"
            value={profile.hsc_marks || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        {/* SSC Year */}
        <div className="mb-3">
          <label>SSC Year</label>
          <input
            type="number"
            name="ssc_year"
            className="form-control"
            value={profile.ssc_year || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        {/* SSC Marks */}
        <div className="mb-3">
          <label>SSC Marks</label>
          <input
            type="number"
            step="0.01"
            name="ssc_marks"
            className="form-control"
            value={profile.ssc_marks || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        {/* Buttons */}
        {isEditing ? (
          <button type="submit" className="btn btn-primary">
            {profile.profile_id ? "Update Profile" : "Add Profile"}
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        )}
      </form>
    </div>
  );
}
