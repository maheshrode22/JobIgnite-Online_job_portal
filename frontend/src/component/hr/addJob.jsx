import React, { useState } from "react";
import "../../css/Hr/addJob.css";
import { addJobPost } from "../../services/HRService";

export default function AddJob() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [opening, setOpening] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [pkg, setPkg] = useState("");
  const [skills, setSkills] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(""); 
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hr_id = localStorage.getItem("hr_id"); // HRAuth saved hrid
    console.log("HR ID:", hr_id);

    if (!hr_id) {
      alert("HR not logged in!");
      return;
    }

    const jobData = {
      title,
      company,
      opening,
      experience_required: experience,
      location,
      package: pkg,
      skills_required: skills,
      description,
      deadline,  // ✅ added
      hr_id,
    };

    console.log("Sending Job Data:", jobData);

    try {
      const result = await addJobPost(jobData);
      setMsg(result.data.msg || "Job added successfully!"); // backend "msg" पाठवतंय

      // Reset form
      setTitle("");
      setCompany("");
      setOpening("");
      setExperience("");
      setLocation("");
      setPkg("");
      setSkills("");
      setDescription("");
      setDeadline("");
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setMsg(err.response?.data?.message || "Failed to add job!");
    }
  };

  return (
    <div className="add-job-container">
      <h2>Add New Job</h2>
      <form className="add-job-form" onSubmit={handleSubmit}>
      {msg && <p className="text-primary" style={{ marginTop: "10px" }}>{msg}</p>}
        {/* Row 1: Job Title & Company */}
        <div className="form-row">
          <div className="form-group">
            <label>Job Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Company</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Row 2: Openings & Experience */}
        <div className="form-row">
          <div className="form-group">
            <label>Openings</label>
            <input
              type="number"
              value={opening}
              onChange={(e) => setOpening(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Experience Required</label>
            <input
              type="text"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>
        </div>

        {/* Row 3: Package & Location */}
        <div className="form-row">
          <div className="form-group">
            <label>Package</label>
            <input
              type="text"
              value={pkg}
              onChange={(e) => setPkg(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        {/* Full-width fields */}
        <div className="form-group">
          <label>Skills Required</label>
          <textarea
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Deadline */}
        <div className="form-group">
          <label>Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Add Job</button>
      </form>

    
    </div>
  );
}
