// JobDetails.js
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function JobDetails() {
  const { id } = useParams(); // get job id from URL
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job; // job data passed from BrowseJobs

  if (!job) {
    return (
      <div className="container p-4">
        <h2>No Job Data Found (ID: {id})</h2>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/browse-jobs")}
        >
          Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="container p-4">
      <h2>{job.title}</h2>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Type:</strong> {job.type}</p>
      <p><strong>Openings:</strong> {job.opening}</p>
      <p><strong>Experience Required:</strong> {job.experience_required}</p>
      <p><strong>Package:</strong> {job.package}</p>
      <p><strong>Skills:</strong> {job.skills_required}</p>
      <p><strong>Description:</strong> {job.description}</p>

      <button
        className="btn btn-secondary mt-3"
        onClick={() => navigate("/browse-jobs")}
      >
        Back
      </button>
    </div>
  );
}
