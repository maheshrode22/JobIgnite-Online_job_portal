import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { applyForJob, getAllJobs, getSeekerApplications } from "../../Services/SeekerService";
import { jwtDecode } from "jwt-decode";
import "../../css/jobSeeker/jobDetails.css";

export default function JobDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job;

  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [saved, setSaved] = useState(false);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [loadingRelatedJobs, setLoadingRelatedJobs] = useState(true);

  // Decode token and get user data
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserData(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  // ✅ Check if already applied
  useEffect(() => {
    const checkIfApplied = async () => {
      if (userData && job) {
        const seeker_id = userData.seeker_id || userData.id;
        try {
          const res = await getSeekerApplications(seeker_id);
          const appliedJobs = res.data || [];

          console.log("📌 Applications fetched:", appliedJobs);
          console.log("📌 Current job:", job);

          // Safe check using job_id first, fallback to title
          const alreadyApplied = appliedJobs.some(
            app =>
              (app.job_id && app.job_id === job.job_id) ||
              (app.title && app.title.toLowerCase() === job.title?.toLowerCase())
          );

          if (alreadyApplied) {
            setApplied(true);
          }
        } catch (error) {
          console.error("Error checking applications:", error);
        }
      }
    };

    checkIfApplied();
  }, [userData, job]);

  // Fetch related jobs
  useEffect(() => {
    const fetchRelatedJobs = async () => {
      try {
        setLoadingRelatedJobs(true);
        const res = await getAllJobs();
        const allJobs = res.data;
        const filteredJobs = allJobs.filter(j => j.job_id !== job.job_id);
        const randomJobs = filteredJobs
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);
        setRelatedJobs(randomJobs);
      } catch (error) {
        console.error("Error fetching related jobs:", error);
      } finally {
        setLoadingRelatedJobs(false);
      }
    };

    if (job) {
      fetchRelatedJobs();
    }
  }, [job]);

  // Apply handler
  const handleApply = async () => {
    if (!userData) {
      alert("Please login to apply for jobs!");
      navigate("/jobSeeker");
      return;
    }

    const seeker_id = userData.seeker_id || userData.id;

    try {
      setLoading(true);
      const res = await applyForJob(seeker_id, job.job_id);

      if (res.data.msg === "apply successfully") {
        setApplied(true);
      } else {
        alert(res.data.msg || "Failed to apply. Try again.");
      }
    } catch (err) {
      console.error("Apply error:", err);
      alert("Something went wrong while applying.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  const handleRelatedJobClick = (relatedJob) => {
    navigate(`/jobSeeker/jobDetail/${relatedJob.job_id}`, { state: { job: relatedJob } });
  };

  const getCompanyColor = (companyName) => {
    const colors = [
      '#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b',
      '#ef4444', '#ec4899', '#84cc16', '#f97316', '#6366f1'
    ];
    const index = companyName ? companyName.charCodeAt(0) % colors.length : 0;
    return colors[index];
  };

  const getInitials = (companyName) => {
    if (!companyName) return 'C';
    return companyName.split(' ').map(word => word.charAt(0).toUpperCase()).join('').slice(0, 2);
  };

  if (!job) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card p-4 shadow-sm">
          <h3>No Job Data Found (ID: {id})</h3>
          <button
            className="btn btn-primary btn-sm mt-3"
            onClick={() => navigate("/jobSeeker/browse-jobs")}
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="job-details-container">
      <div className="job-details-content">
        <div className="main-job-section">
          {/* Job Header */}
          <div className="job-header">
            <div className="job-title-section">
              <h1 className="job-title">{job.title}</h1>
              <div className="company-info">
                <span className="company-name">{job.company || 'Company Name'}</span>
              </div>
            </div>
            <div className="company-logo" style={{ backgroundColor: getCompanyColor(job.company) }}>
              {getInitials(job.company)}
            </div>
          </div>

          {/* Key Details */}
          <div className="key-details">
            <div className="detail-item">
              <span className="detail-icon">💼</span>
              <span className="detail-text">{job.experience_required || '0'} - {job.experience_required ? job.experience_required + 2 : '2'} years</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">💰</span>
              <span className="detail-text">{job.package ? `${job.package} LPA` : 'Not Disclosed'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">📍</span>
              <span className="detail-text">{job.location || 'Location'}</span>
            </div>
          </div>

          {/* Application Status */}
          <div className="application-status">
            <div className="status-item">
              <span className="status-label">Openings:</span>
              <span className="status-value">{job.opening || '1'}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button 
              className="back-btn"
              onClick={() => navigate("/jobSeeker/browse-jobs")}
            >
              ← Back to Jobs
            </button>
            <button 
              className={`save-btn ${saved ? 'saved' : ''}`}
              onClick={handleSave}
            >
              {saved ? '✓ Saved' : 'Save'}
            </button>
            {userData ? (
              <button
                className={`apply-btn ${applied ? 'applied' : ''}`}
                onClick={handleApply}
                disabled={applied || loading}
              >
                {applied ? '✓ Applied' : loading ? 'Applying...' : 'Apply'}
              </button>
            ) : (
              <button
                className="apply-btn login-required"
                onClick={() => navigate("/jobSeeker")}
              >
                Login to Apply
              </button>
            )}
          </div>

          {/* Job Description */}
          <div className="job-section">
            <h3 className="section-title">Job description</h3>
            <div className="description-content">
              <p className="description-text">
                {job.description || "We are hiring a fresher Full Stack Developer..."}
              </p>
            </div>
          </div>

          {/* Skills Required */}
          {job.skills_required && (
            <div className="job-section">
              <h3 className="section-title">Skills Required:</h3>
              <div className="skills-content">
                <p className="skills-text">{job.skills_required}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Section: Related Jobs */}
        <div className="related-jobs-section">
          <h3 className="section-title">Jobs you might be interested in</h3>
          <div className="related-jobs-list">
            {relatedJobs.length > 0 ? (
              relatedJobs.map((relatedJob) => (
                <div 
                  key={relatedJob.job_id} 
                  className="related-job-card"
                  onClick={() => handleRelatedJobClick(relatedJob)}
                >
                  <div className="related-job-content">
                    <h4 className="related-job-title">{relatedJob.title}</h4>
                    <div className="related-company">{relatedJob.company || 'Company Name'}</div>
                    <div className="related-location">{relatedJob.location || 'Location'}</div>
                    {relatedJob.package && (
                      <div className="related-salary">{relatedJob.package} LPA</div>
                    )}
                  </div>
                  <div className="related-company-logo" style={{ backgroundColor: getCompanyColor(relatedJob.company) }}>
                    {getInitials(relatedJob.company)}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-related-jobs">
                <p>{loadingRelatedJobs ? 'Loading related jobs...' : 'No related jobs found'}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success Message */}
      {applied && (
        <div className="success-message py-5" >
          <div className="alert alert-success" role="alert">
            🎉 Job Applied Successfully!
          </div>
        </div>
      )}
    </div>
  );
}
