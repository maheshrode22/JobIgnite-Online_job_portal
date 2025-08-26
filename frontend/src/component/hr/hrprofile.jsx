import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../css/Hr/hrprofile.css";
import { jwtDecode } from "jwt-decode"; // named import (for v4)

const HRProfile = () => {
  const [hr, setHr] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("hr_token"); // token save kelay login la
    if (token) {
      const decoded = jwtDecode(token); // decode HR data from token
      console.log("Decoded HR Data:", decoded); // 👀 check all fields
      setHr(decoded);
    }
  }, []);

  if (!hr) return <p className="text-center mt-5">Loading HR Profile...</p>;

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow-lg p-4 rounded-4 hr-profile-card">
        {/* Header with avatar and name */}
        <div className="d-flex align-items-center border-bottom pb-3 mb-3">
          <div className="avatar rounded-circle d-flex align-items-center justify-content-center me-3">
            {hr.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="mb-1">
              <i className="bi bi-person-fill me-2 text-primary"></i>
              {hr.name}
            </h3>
            <p className="mb-0 text-muted">
              <i className="bi bi-envelope-fill me-2 text-danger"></i>
              {hr.email}
            </p>
            <p className="mb-0 text-muted">
              <i className="bi bi-telephone-fill me-2 text-success"></i>
              {hr.phone || "-"}
            </p>
          </div>
        </div>

        {/* Company Info */}
        <div className="mb-3">
          <h5 className="fw-bold mb-3">Company Details</h5>
          <div className="d-flex justify-content-between border-bottom py-2">
            <span className="fw-semibold">
              <i className="bi bi-building me-2 text-primary"></i>
              Company:
            </span>
            <span>{hr.company_name}</span>
          </div>
          <div className="d-flex justify-content-between border-bottom py-2">
            <span className="fw-semibold">
              <i className="bi bi-check-circle-fill me-2 text-success"></i>
              Status:
            </span>
            <span className={`status ${hr.status?.toLowerCase()}`}>
              {hr.status}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="d-flex justify-content-end gap-2 mt-3">
          <button
            className="btn btn-primary d-flex align-items-center"
            onClick={() => alert("Redirect to Update Page")}
          >
            <i className="bi bi-pencil-square me-2"></i> Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default HRProfile;
