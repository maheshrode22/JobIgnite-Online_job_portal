import React, { useEffect, useState } from "react";
import { getApplicationsByHR } from "../../Services/HRService";
import { Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css"; // ✅ Bootstrap Icons
import { jwtDecode } from "jwt-decode";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [searchJob, setSearchJob] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Derive hr_id from token (same approach as dashboard)
  const token = localStorage.getItem("hr_token");
  let hr_id = null;
  try {
    if (token) {
      const decoded = jwtDecode(token);
      hr_id = decoded?.hr_id || decoded?.id || null;
    }
  } catch {
    hr_id = null;
  }

 

  useEffect(() => {
    const fetchData = async () => {
      if (!hr_id) {
        setApplications([]);
        return;
      }
      try {
        const res = await getApplicationsByHR(hr_id);

        console.log("API Response:", res.data);

        // ✅ Normalize response to always be an array
        if (Array.isArray(res.data)) {
          setApplications(res.data);
        } else if (res.data?.applications) {
          setApplications(res.data.applications);
        } else {
          setApplications([]);
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
        setApplications([]); // fallback
      }
    };
    fetchData();
  }, [hr_id]);

  const handleShow = (id) => {
    alert("Seeker ID: " + id);
  };

  // ✅ Safe filter
  const filteredApplications = applications.filter(
    (app) =>
      app?.job_title?.toLowerCase().includes(searchJob.toLowerCase())
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentApplications = filteredApplications.slice(
    indexOfFirst,
    indexOfLast
  );
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

  return (
    <div className="container mt-4">
      <div className="text-center mb-4">
        <h2 className="fw-bold text-primary">
          <i className="bi bi-people-fill me-2"></i>Applications
        </h2>
      </div>

      {/* 🔹 Search Box */}
      <div className="d-flex justify-content-end mb-3">
        <div className="input-group w-25">
          <span className="input-group-text bg-light">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search by Job Title..."
            value={searchJob}
            onChange={(e) => {
              setSearchJob(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* 🔹 Table */}
      <div className="table-responsive">
        <table className="table table-hover align-middle shadow-sm">
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>
                <i className="bi bi-briefcase-fill me-2"></i>Job Title
              </th>
              <th>
                <i className="bi bi-person-fill me-2"></i>Applicant Name
              </th>
              <th>
                <i className="bi bi-envelope-fill me-2"></i>Email
              </th>
              <th>
                <i className="bi bi-telephone-fill me-2"></i>Phone
              </th>
              <th>
                <i className="bi bi-check-circle-fill me-2"></i>Status
              </th>
              <th>
                <i className="bi bi-calendar-event-fill me-2"></i>Applied At
              </th>
              <th>
                <i className="bi bi-gear-fill me-2"></i>Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentApplications.length > 0 ? (
              currentApplications.map((app, index) => (
                <tr key={app.application_id}>
                  <td>{indexOfFirst + index + 1}</td>
                  <td>{app.job_title}</td>
                  <td>{app.seeker_name}</td>
                  <td>{app.seeker_email}</td>
                  <td>{app.seeker_phone}</td>
                  <td>
                    <span
                      className={`badge ${
                        app.status === "Pending"
                          ? "bg-warning text-dark"
                          : app.status === "Accepted"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td>{new Date(app.applied_at).toLocaleString()}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="info"
                      onClick={() => handleShow(app.seeker_id)}
                    >
                      <i className="bi bi-eye-fill me-1"></i> Show
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-muted">
                  <i className="bi bi-inbox me-2"></i>No applications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔹 Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-3">
          <nav>
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  <i className="bi bi-chevron-left"></i> Previous
                </button>
              </li>

              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i}
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}

              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next <i className="bi bi-chevron-right"></i>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
