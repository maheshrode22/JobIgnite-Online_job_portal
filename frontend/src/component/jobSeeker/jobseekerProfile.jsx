import React, { useState } from "react";
import { jobSeekerProfile } from "../../Services/SeekerService";
import "../../css/jobSeeker/seekerDetail.css";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!seeker_id) {
      alert("Seeker ID not found. Please log in again.");
      return;
    }

    const data = [
      seeker_id,
      formData.gender,
      formData.dob,
      formData.skills,
      formData.degree,
      formData.university,
      formData.cgpa,
      formData.hsc_year,
      formData.hsc_marks,
      formData.ssc_year,
      formData.ssc_marks,
    ];

    jobSeekerProfile(...data)
      .then(() => {
        alert("Profile added successfully!");
        setFormData({
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
      })
      .catch((err) => console.error("Error adding profile:", err));
  };

  return (
    <div className="seekerprofile-container">
      <div className="seekerprofile-card">
        <h2 className="seeker-profile-title">Add Job Seeker Profile</h2>

        <div className="seekerprofile-item">
          <label>Gender:</label>
          <input type="text" name="gender" value={formData.gender} onChange={handleChange} />
        </div>
        <div className="seekerprofile-item">
          <label>Date of Birth:</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
        </div>
        <div className="seekerprofile-item">
          <label>Skills:</label>
          <input type="text" name="skills" value={formData.skills} onChange={handleChange} />
        </div>
        <div className="seekerprofile-item">
          <label>Degree:</label>
          <input type="text" name="degree" value={formData.degree} onChange={handleChange} />
        </div>
        <div className="seekerprofile-item">
          <label>University:</label>
          <input type="text" name="university" value={formData.university} onChange={handleChange} />
        </div>
        <div className="seekerprofile-item">
          <label>CGPA:</label>
          <input type="number" name="cgpa" value={formData.cgpa} onChange={handleChange} />
        </div>
        <div className="seekerprofile-item">
          <label>HSC Year:</label>
          <input type="number" name="hsc_year" value={formData.hsc_year} onChange={handleChange} />
        </div>
        <div className="seekerprofile-item">
          <label>HSC Marks:</label>
          <input type="number" name="hsc_marks" value={formData.hsc_marks} onChange={handleChange} />
        </div>
        <div className="seekerprofile-item">
          <label>SSC Year:</label>
          <input type="number" name="ssc_year" value={formData.ssc_year} onChange={handleChange} />
        </div>
        <div className="seekerprofile-item">
          <label>SSC Marks:</label>
          <input type="number" name="ssc_marks" value={formData.ssc_marks} onChange={handleChange} />
        </div>

        <div className="seekerprofile-actions">
          <button className="btn save" onClick={handleSave}>Add Profile</button>
        </div>
      </div>
    </div>
  );
};

export default SeekerProfile;
