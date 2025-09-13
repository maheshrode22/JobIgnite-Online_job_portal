import React, { useState, useEffect } from "react";
import { Modal, Button, Spinner, Alert, Row, Col, Badge } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import axiosInstance from "../../Services/axiosInstance";

export default function ViewSeekerDetails({ show, onHide, seekerId }) {
  const [seekerData, setSeekerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (show && seekerId) {
      fetchSeekerDetails();
    }
  }, [show, seekerId]);

  const fetchSeekerDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("Fetching seeker details for ID:", seekerId);
      
      // Use the correct HR endpoint - FIXED
      const response = await axiosInstance.get(`/hr/getSeekerProfile/${seekerId}`);
      
      console.log("Seeker data response:", response.data);
      setSeekerData(response.data);
    } catch (err) {
      console.error("Error fetching seeker details:", err);
      setError(`Failed to load seeker details: ${err.response?.data?.msg || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not provided";
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      "Pending": "warning",
      "Accepted": "success", 
      "Rejected": "danger"
    };
    return statusColors[status] || "secondary";
  };

  if (!show) return null;

  return (
    <Modal show={show} onHide={onHide} size="xl" centered className="view-seeker-modal">
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>
          <i className="bi bi-person-fill me-2"></i>
          Job Seeker Details
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="p-4">
        {loading && (
          <div className="text-center py-4 loading-container">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2 text-muted">Loading seeker details...</p>
          </div>
        )}

        {error && (
          <Alert variant="danger" className="error-container">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </Alert>
        )}

        {seekerData && !loading && (
          <div>
            {/* Personal Information */}
            <div className="card mb-4">
              <div className="card-header bg-light">
                <h5 className="mb-0">
                  <i className="bi bi-person-circle me-2"></i>
                  Personal Information
                </h5>
              </div>
              <div className="card-body">
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <strong>Name:</strong> {seekerData.name || "Not provided"}
                    </div>
                    <div className="mb-3">
                      <strong>Email:</strong> {seekerData.email || "Not provided"}
                    </div>
                    <div className="mb-3">
                      <strong>Phone:</strong> {seekerData.phone || "Not provided"}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <strong>Gender:</strong> {seekerData.gender === 1 ? "Male" : seekerData.gender === 0 ? "Female" : "Not provided"}
                    </div>
                    <div className="mb-3">
                      <strong>Birth Date:</strong> {formatDate(seekerData.birth_date)}
                    </div>
                    <div className="mb-3">
                      <strong>Member Since:</strong> {formatDate(seekerData.created_at)}
                    </div>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={12}>
                    <div className="mb-3">
                      <strong>Address:</strong> {seekerData.address_line1 || "Not provided"}, {seekerData.address_line2 || ""}
                    </div>
                    <div className="mb-3">
                      <strong>Landmark:</strong> {seekerData.landmark || "Not provided"}
                    </div>
                    <div className="mb-3">
                      <strong>Pincode:</strong> {seekerData.pincode || "Not provided"}
                    </div>
                  </Col>
                </Row>
              </div>
            </div>

            {/* Education Information */}
            <div className="card mb-4">
              <div className="card-header bg-light">
                <h5 className="mb-0">
                  <i className="bi bi-mortarboard-fill me-2"></i>
                  Education Details
                </h5>
              </div>
              <div className="card-body">
                <Row>
                  <Col md={6}>
                    <h6 className="text-primary">Graduation</h6>
                    <div className="mb-2">
                      <strong>Degree:</strong> {seekerData.graduation || "Not provided"}
                    </div>
                    <div className="mb-2">
                      <strong>University:</strong> {seekerData.graduation_university || "Not provided"}
                    </div>
                    <div className="mb-2">
                      <strong>Year:</strong> {seekerData.graduation_year || "Not provided"}
                    </div>
                    <div className="mb-2">
                      <strong>CGPA:</strong> {seekerData.graduation_cgpa || "Not provided"}
                    </div>
                  </Col>
                  <Col md={6}>
                    <h6 className="text-primary">Post Graduation</h6>
                    <div className="mb-2">
                      <strong>Degree:</strong> {seekerData.post_graduation || "Not provided"}
                    </div>
                    <div className="mb-2">
                      <strong>University:</strong> {seekerData.post_graduation_university || "Not provided"}
                    </div>
                    <div className="mb-2">
                      <strong>Year:</strong> {seekerData.post_graduation_year || "Not provided"}
                    </div>
                    <div className="mb-2">
                      <strong>CGPA:</strong> {seekerData.post_graduation_cgpa || "Not provided"}
                    </div>
                  </Col>
                </Row>
                
                <hr />
                
                <Row>
                  <Col md={6}>
                    <h6 className="text-primary">HSC Details</h6>
                    <div className="mb-2">
                      <strong>Year:</strong> {seekerData.hsc_year || "Not provided"}
                    </div>
                    <div className="mb-2">
                      <strong>Marks:</strong> {seekerData.hsc_marks || "Not provided"}
                    </div>
                  </Col>
                  <Col md={6}>
                    <h6 className="text-primary">SSC Details</h6>
                    <div className="mb-2">
                      <strong>Year:</strong> {seekerData.ssc_year || "Not provided"}
                    </div>
                    <div className="mb-2">
                      <strong>Marks:</strong> {seekerData.ssc_marks || "Not provided"}
                    </div>
                  </Col>
                </Row>
              </div>
            </div>

            {/* Skills & Experience */}
            <div className="card mb-4">
              <div className="card-header bg-light">
                <h5 className="mb-0">
                  <i className="bi bi-tools me-2"></i>
                  Skills & Experience
                </h5>
              </div>
              <div className="card-body">
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <strong>Skills:</strong> 
                      <div className="mt-1">
                        {seekerData.skills ? (
                          seekerData.skills.split(' ').map((skill, index) => (
                            <Badge key={index} bg="primary" className="me-1 mb-1">
                              {skill.trim()}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-muted">Not provided</span>
                        )}
                      </div>
                    </div>
                    <div className="mb-3">
                      <strong>Hobbies:</strong> {seekerData.hobbies || "Not provided"}
                    </div>
                    <div className="mb-3">
                      <strong>Languages:</strong> {seekerData.languages || "Not provided"}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <strong>Company:</strong> {seekerData.company || "Not provided"}
                    </div>
                    <div className="mb-3">
                      <strong>Job Role:</strong> {seekerData.job_role || "Not provided"}
                    </div>
                    <div className="mb-3">
                      <strong>Experience Years:</strong> {seekerData.experience_years || "Not provided"}
                    </div>
                  </Col>
                </Row>
              </div>
            </div>

            {/* Documents */}
            <div className="card mb-4">
              <div className="card-header bg-light">
                <h5 className="mb-0">
                  <i className="bi bi-file-earmark-fill me-2"></i>
                  Documents
                </h5>
              </div>
              <div className="card-body">
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <strong>Resume:</strong>
                      {seekerData.resume ? (
                        <div className="mt-1">
                          <a 
                            href={`http://localhost:3000/uploads/resumes/${seekerData.resume}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline-primary btn-sm"
                          >
                            <i className="bi bi-download me-1"></i>
                            Download Resume
                          </a>
                        </div>
                      ) : (
                        <span className="text-muted ms-2">Not uploaded</span>
                      )}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <strong>Profile Image:</strong>
                      {seekerData.profile_image ? (
                        <div className="mt-1">
                          <img 
                            src={`http://localhost:3000/uploads/profile_images/${seekerData.profile_image}`}
                            alt="Profile"
                            className="img-thumbnail"
                            style={{ width: "100px", height: "100px", objectFit: "cover" }}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'inline';
                            }}
                          />
                          <span style={{ display: 'none' }} className="text-muted">Image not found</span>
                        </div>
                      ) : (
                        <span className="text-muted ms-2">Not uploaded</span>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        )}
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          <i className="bi bi-x-circle me-1"></i>
          Close
        </Button>
        <Button variant="primary" onClick={onHide}>
          <i className="bi bi-check-circle me-1"></i>
          Done
        </Button>
      </Modal.Footer>
    </Modal>
  );
} 