import React, { useState } from "react";
import "../../css/Hr/addJob.css";

export default function AddJob() {
  const [job, setJob] = useState({
    title: "",
    company: "",
    opening: "",
    experience_required: "",
    location: "",
    package: "",
    skills_required: "",
    description: "",
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Submitted:", job);
    // API integration can go here
  };

  return (
    <div className="add-job-container">
      <h2>Add New Job</h2>
      <form className="add-job-form" onSubmit={handleSubmit}>
        {/* Row 1: Job Title & Company */}
        <div className="form-row">
          <div className="form-group">
            <label>Job Title</label>
            <input type="text" name="title" value={job.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Company</label>
            <input type="text" name="company" value={job.company} onChange={handleChange} />
          </div>
        </div>

        {/* Row 2: Openings & Experience */}
        <div className="form-row">
          <div className="form-group">
            <label>Openings</label>
            <input type="number" name="opening" value={job.opening} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Experience Required</label>
            <input type="text" name="experience_required" value={job.experience_required} onChange={handleChange} />
          </div>
        </div>

        {/* Row 3: Package & Location */}
        <div className="form-row">
          <div className="form-group">
            <label>Package</label>
            <input type="text" name="package" value={job.package} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" name="location" value={job.location} onChange={handleChange} />
          </div>
        </div>

        {/* Full-width fields */}
        <div className="form-group">
          <label>Skills Required</label>
          <textarea name="skills_required" value={job.skills_required} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={job.description} onChange={handleChange} />
        </div>

        <button type="submit" className="submit-btn">Add Job</button>
      </form>
    </div>
  );
}
