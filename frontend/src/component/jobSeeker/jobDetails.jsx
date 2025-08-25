import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { applyForJob } from "../../services/SeekerService"; //  use your function
import "../../css/jobSeeker/jobDetails.css";

export default function JobDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job;
  console.log("Job object:", job);

  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log("company name: "+job.company);
  //  Apply handler
  const handleApply = async () => {
    const seeker = JSON.parse(localStorage.getItem("jobSeeker")); // full object
    const seeker_id = seeker?.seeker_id;

    if (!seeker_id) {
      alert(" Please login to apply!");
      navigate("/jobSeeker/auth");
      return;
    }

    
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
    <div className="container my-5">
      <div className="card shadow-sm p-4 bg-white">
        <h2 className="card-title mb-3" text-primary>Job Title: {job.title}</h2>
        <ul className="list-group list-group-flush">
          <li className="list-group-item text-primary"><strong className="text-dark">Company:</strong> {job.company}</li>
         

          <li className="list-group-item text-primary"><strong className="text-dark">Location:</strong> {job.location}</li>
         
          <li className="list-group-item text-primary"><strong className="text-dark">Openings:</strong> {job.opening}</li>
          <li className="list-group-item text-primary"><strong className="text-dark">Experience Required:</strong> {job.experience_required}</li>
          <li className="list-group-item text-primary"><strong className="text-dark">Package:</strong> {job.package}</li>
          <li className="list-group-item text-primary"><strong className="text-dark">Skills:</strong> {job.skills_required}</li>
          <li className="list-group-item text-primary"><strong className="text-dark">Description:</strong> {job.description}</li>
        </ul>

        {/* Buttons */}
        <div className="mt-4 d-flex justify-content-center gap-3 button-group">
          <button
            className="backjob"
            onClick={() => navigate("/jobSeeker/browse-jobs")}
          >
            Back Job
          </button>

          <button
            className="applyjob"
            onClick={handleApply}
            disabled={applied || loading}
          >
            {applied ? " Applied" : loading ? "Applying..." : "Apply"}
          </button>
        </div>

        {/* Success Message */}
        {applied && (
          <div className="text-center mt-3">
            <div className="alert alert-success" role="alert">
              🎉 Job Applied Successfully!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
