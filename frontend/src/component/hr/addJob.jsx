import React, { useState } from "react";
import "../../css/Hr/addJob.css";
import { addJobPost } from "../../services/HRService";
import "bootstrap-icons/font/bootstrap-icons.css"; // ✅ Bootstrap Icons

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

    const hr_id = localStorage.getItem("hr_id");
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
      deadline,
      hr_id,
    };

    try {
      const result = await addJobPost(jobData);
      setMsg(result.data.msg || "Job added successfully!");

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
      setMsg(err.response?.data?.message || "Failed to add job!");
    }
  };

  return (
    <div className="add-job-container">
      <h2>
        <i className="bi bi-briefcase-fill me-2"></i> Add New Job
      </h2>
      <form className="add-job-form" onSubmit={handleSubmit}>
        {msg && (
          <p className="text-primary fw-semibold text-center mb-3">{msg}</p>
        )}

        {/* Row 1 */}
        <div className="form-row">
          <div className="form-group">
            <label>
              <i className="bi bi-card-heading me-2"></i> Job Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>
              <i className="bi bi-building me-2"></i> Company
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="form-row">
          <div className="form-group">
            <label>
              <i className="bi bi-people-fill me-2"></i> Openings
            </label>
            <input
              type="number"
              value={opening}
              onChange={(e) => setOpening(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>
              <i className="bi bi-mortarboard-fill me-2"></i> Experience Required
            </label>
            <input
              type="text"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="form-row">
          <div className="form-group">
            <label>
              <i className="bi bi-cash-stack me-2"></i> Package
            </label>
            <input
              type="text"
              value={pkg}
              onChange={(e) => setPkg(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>
              <i className="bi bi-geo-alt-fill me-2"></i> Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        {/* Skills */}
        <div className="form-group">
          <label>
            <i className="bi bi-tools me-2"></i> Skills Required
          </label>
          <textarea
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label>
            <i className="bi bi-file-text-fill me-2"></i> Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Deadline */}
        <div className="form-group">
          <label>
            <i className="bi bi-calendar-event-fill me-2"></i> Deadline
          </label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          <i className="bi bi-plus-circle me-2"></i> Add Job
        </button>
      </form>
    </div>
  );
}
