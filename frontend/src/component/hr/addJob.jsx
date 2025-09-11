import React, { useState } from "react";
import "../../css/Hr/addJob.css";
import { addJobPost } from "../../Services/HRService";
import "bootstrap-icons/font/bootstrap-icons.css";
import { jwtDecode } from "jwt-decode";
import { validateJobData } from "../../validation/AddjobValidation";

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

    const token = localStorage.getItem("hr_token");
    let hr_id = null;
    try {
      if (token) {
        const decoded = jwtDecode(token);
        hr_id = decoded?.hr_id || decoded?.id || null;
      }
    } catch (err) {
      console.error("Invalid HR token", err);
    }
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


     const error = validateJobData(jobData);
      if (error) {
      setMsg(error);  // Show validation error
      return;         // Stop submission
      }
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
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xl-8">
          <div className="add-job-container shadow-lg rounded-4">
            <h2 className="text-center mb-4 text-primary fw-bold">
              <i className="bi bi-briefcase-fill me-2"></i> Add New Job
            </h2>
            
            <form className="add-job-form" onSubmit={handleSubmit}>
              {msg && (
                <div className="alert alert-info text-center mb-4" role="alert">
                  {msg}
                </div>
              )}

              {/* Row 1 */}
              <div className="row g-3 mb-3">
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label className="form-label fw-semibold">
                      <i className="bi bi-card-heading me-2 text-primary"></i> Job Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label className="form-label fw-semibold">
                      <i className="bi bi-building me-2 text-primary"></i> Company
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="row g-3 mb-3">
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label className="form-label fw-semibold">
                      <i className="bi bi-people-fill me-2 text-primary"></i> Openings
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      value={opening}
                      onChange={(e) => setOpening(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label className="form-label fw-semibold">
                      <i className="bi bi-mortarboard-fill me-2 text-primary"></i> Experience Required
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Row 3 */}
              <div className="row g-3 mb-3">
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label className="form-label fw-semibold">
                      <i className="bi bi-cash-stack me-2 text-primary"></i> Package
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={pkg}
                      onChange={(e) => setPkg(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label className="form-label fw-semibold">
                      <i className="bi bi-geo-alt-fill me-2 text-primary"></i> Location
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="form-group mb-3">
                <label className="form-label fw-semibold">
                  <i className="bi bi-tools me-2 text-primary"></i> Skills Required
                </label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </div>

              {/* Description */}
              <div className="form-group mb-3">
                <label className="form-label fw-semibold">
                  <i className="bi bi-file-text-fill me-2 text-primary"></i> Description
                </label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Deadline */}
              <div className="form-group mb-4">
                <label className="form-label fw-semibold">
                  <i className="bi bi-calendar-event-fill me-2 text-primary"></i> Deadline
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-100 submit-btn">
                <i className="bi bi-plus-circle me-2"></i> Add Job
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
