import React, { useEffect, useState } from "react";
import { getApplicationsByHR } from "../../Services/HRService";
import { Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { jwtDecode } from "jwt-decode";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [searchJob, setSearchJob] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;

  // Derive hr_id from token
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
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const res = await getApplicationsByHR(hr_id);

        // Normalize response to always be an array
        if (Array.isArray(res.data)) {
          setApplications(res.data);
        } else if (res.data?.applications) {
          setApplications(res.data.applications);
        } else {
          setApplications([]);
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [hr_id]);

  const handleShow = (id) => {
    alert("Seeker ID: " + id);
  };

  // Safe filter
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

  if (loading) {
    return (
      <div className="container-fluid py-4">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2 text-muted">Loading applications...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-12">
          {/* Header */}
          <div className="text-center mb-4">
            <h2 className="fw-bold text-primary">
              <i className="bi bi-people-fill me-2"></i>Applications
            </h2>
            <p className="text-muted">Manage and review job applications</p>
          </div>

          {/* Search and Stats */}
          <div className="row align-items-center mb-4">
            <div className="col-12 col-md-6 mb-3 mb-md-0">
              <div className="d-flex align-items-center">
                <span className="badge bg-primary me-2 fs-6">
                  {filteredApplications.length}
                </span>
                <span className="text-muted">Total Applications</span>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="input-group">
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
          </div>

          {/* Table */}
          <div className="card shadow-sm">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-primary">
                    <tr>
                      <th className="text-center" style={{width: '60px'}}>#</th>
                      <th>
                        <i className="bi bi-briefcase-fill me-2"></i>Job Title
                      </th>
                      <th>
                        <i className="bi bi-person-fill me-2"></i>Applicant Name
                      </th>
                      <th className="d-none d-md-table-cell">
                        <i className="bi bi-envelope-fill me-2"></i>Email
                      </th>
                      <th className="d-none d-lg-table-cell">
                        <i className="bi bi-telephone-fill me-2"></i>Phone
                      </th>
                      <th>
                        <i className="bi bi-check-circle-fill me-2"></i>Status
                      </th>
                      <th className="d-none d-md-table-cell">
                        <i className="bi bi-calendar-event-fill me-2"></i>Applied At
                      </th>
                      <th className="text-center" style={{width: '100px'}}>
                        <i className="bi bi-gear-fill me-2"></i>Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentApplications.length > 0 ? (
                      currentApplications.map((app, index) => (
                        <tr key={app.application_id}>
                          <td className="text-center fw-bold">
                            {indexOfFirst + index + 1}
                          </td>
                          <td>
                            <div className="fw-semibold">{app.job_title}</div>
                            <small className="text-muted d-md-none">
                              {app.seeker_email}
                            </small>
                          </td>
                          <td>{app.seeker_name}</td>
                          <td className="d-none d-md-table-cell">{app.seeker_email}</td>
                          <td className="d-none d-lg-table-cell">{app.seeker_phone}</td>
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
                          <td className="d-none d-md-table-cell">
                            <small>{new Date(app.applied_at).toLocaleDateString()}</small>
                          </td>
                          <td className="text-center">
                            <Button
                              size="sm"
                              variant="outline-primary"
                              onClick={() => handleShow(app.seeker_id)}
                              className="btn-sm"
                            >
                              <i className="bi bi-eye-fill me-1"></i>
                              <span className="d-none d-sm-inline">View</span>
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center text-muted py-5">
                          <i className="bi bi-inbox display-4 d-block mb-3"></i>
                          <h5>No applications found</h5>
                          <p className="text-muted">Try adjusting your search criteria</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <nav aria-label="Applications pagination">
                <ul className="pagination pagination-sm">
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                      disabled={currentPage === 1}
                    >
                      <i className="bi bi-chevron-left"></i>
                      <span className="d-none d-sm-inline ms-1">Previous</span>
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
                      disabled={currentPage === totalPages}
                    >
                      <span className="d-none d-sm-inline me-1">Next</span>
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
