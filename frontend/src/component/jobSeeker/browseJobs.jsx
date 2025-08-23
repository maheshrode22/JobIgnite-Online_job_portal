import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllJobs } from "../../Services/SeekerService"; // service import
import "../../css/jobSeeker/browseJobs.css";

export default function BrowseJobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getAllJobs();
        setJobs(res.data); 
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleViewJob = (job) => {
    navigate(`/jobSeeker/jobDetail/${job.job_id}`, { state: { job } });
  };

  return (
    <div className="browsejobs-container">
      <h2>Browse Jobs</h2>
      <div className="jobcards-container">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.job_id} className="jobcard">
              <h3>{job.title}</h3>
              <p><strong>Company:</strong> {job.company_name}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Package:</strong> {job.package}</p>
              <div className="job-actions">
                <button
                  className="viewjob-btn"
                  onClick={() => handleViewJob(job)}
                >
                  View Job
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No jobs found</p>
        )}
      </div>
    </div>
  );
}
