import React, { useEffect, useState } from "react";
import { getApplicationsByHR }from "../../Services/HRService";
import { Button } from "react-bootstrap";


export default function Applications() {
  const [applications, setApplications] = useState([]);

  const hr_id = localStorage.getItem("hr_id"); 
  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const res = await getApplicationsByHR(hr_id);
        setApplications(res.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } 
    };

    fetchData();
  }, []);

 

  return (
    <div className="container mt-4">
      <div className="text-center mb-4">
        <h2 className="fw-bold text-primary">Applications</h2>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle shadow-sm custom-table">
          <thead className="table-primary">
            <tr>
              <th>Sr No</th>
              <th>Job Title</th>
              <th>Applicant Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Applied At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.length > 0 ? (
              applications.map((app, index) => (
                <tr key={app.application_id}>
                  <td>{index + 1}</td>
                  <td>{app.job_title}</td>
                  <td>{app.seeker_name}</td>
                  <td>{app.seeker_email}</td>
                  <td>{app.seeker_phone}</td>
                  <td>{app.status}</td>
                  <td>{new Date(app.applied_at).toLocaleString()}</td>
                  <td>
                    <Button>
                        Show Details
                    </Button>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No applications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
