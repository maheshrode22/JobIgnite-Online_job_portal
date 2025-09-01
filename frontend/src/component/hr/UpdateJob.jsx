import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateJob } from "../../Services/HRService";
import axios from "axios";
import "../../css/Hr/addJob.css";

const API_URL = "http://localhost:3000"; // your backend

export default function UpdateJobForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams(); // job_id from URL

  const jobFromView = location.state?.job; // modal fallback

  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    package: "",
    opening: "",
    experience_required: "",
    skills_required: "",
    description: "",
    deadline: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        let job = jobFromView;
        
        console.log("=== UPDATE JOB FORM DEBUG ===");
        console.log("Job ID from URL params:", id);
        console.log("Job from location state:", jobFromView);
        console.log("Initial job data:", job);

        if (!job) {
          const token = localStorage.getItem("hr_token");
          console.log("Fetching job from API with ID:", id);
          const res = await axios.post(
            `${API_URL}/getJobById`,
            { id },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          job = res.data?.job;
          console.log("Job data from API:", job);
        }

        if (!job) throw new Error("Job not found");

        const formattedJobData = {
          title: job.title || job.job_title || "",
          company: job.company || "",
          location: job.location || "",
          package: job.package ? job.package.replace(/[^0-9.]/g, '') : "",
          opening: job.opening || "",
          experience_required: job.experience_required || "",
          skills_required: job.skills_required || "",
          description: job.description || "",
          deadline: job.deadline
            ? new Date(job.deadline).toISOString().split("T")[0]
            : "",
        };
        
        console.log("Formatted job data for form:", formattedJobData);
        console.log("All job object keys:", Object.keys(job));
        console.log("=== END DEBUG ===");

        setJobData(formattedJobData);
      } catch (err) {
        console.error("Error fetching job:", err);
        alert("❌ Job data not found. Redirecting...");
        navigate("/hr/view-job");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobFromView, id, navigate]);

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateJob(id, jobData);
      alert("✅ Job updated successfully!");
      navigate("/hr/view-job");
    } catch (err) {
      console.error("❌ Update failed:", err);
      alert("Error while updating job!");
    }
  };

  if (loading)
    return <div className="text-center py-4">Loading job details...</div>;

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xl-8">
          <div className="add-job-container shadow-lg rounded-4">
            <h2 className="text-center mb-4 text-primary fw-bold">
              <i className="bi bi-pencil-square me-2"></i> Update Job
            </h2>
            
            <form className="add-job-form" onSubmit={handleSubmit}>
              {/* Row 1 */}
              <div className="row g-3 mb-3">
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label className="form-label fw-semibold">
                      <i className="bi bi-card-heading me-2 text-primary"></i> Job Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      value={jobData.title}
                      onChange={handleChange}
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
                      name="company"
                      className="form-control"
                      value={jobData.company}
                      onChange={handleChange}
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
                      name="opening"
                      className="form-control"
                      value={jobData.opening}
                      onChange={handleChange}
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
                      name="experience_required"
                      className="form-control"
                      value={jobData.experience_required}
                      onChange={handleChange}
                      required
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
                      name="package"
                      className="form-control"
                      value={jobData.package}
                      onChange={handleChange}
                      required
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
                      name="location"
                      className="form-control"
                      value={jobData.location}
                      onChange={handleChange}
                      required
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
                  name="skills_required"
                  className="form-control"
                  rows="3"
                  value={jobData.skills_required}
                  onChange={handleChange}
                  placeholder="e.g. React, Node.js, SQL"
                  required
                />
              </div>

              {/* Description */}
              <div className="form-group mb-3">
                <label className="form-label fw-semibold">
                  <i className="bi bi-file-text-fill me-2 text-primary"></i> Description
                </label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="4"
                  value={jobData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Deadline */}
              <div className="form-group mb-4">
                <label className="form-label fw-semibold">
                  <i className="bi bi-calendar-event-fill me-2 text-primary"></i> Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  className="form-control"
                  value={jobData.deadline}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="d-flex gap-3">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-lg flex-fill"
                  onClick={() => navigate("/hr/view-job")}
                >
                  <i className="bi bi-x-circle me-2"></i> Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-lg flex-fill submit-btn">
                  <i className="bi bi-check-circle me-2"></i> Update Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
