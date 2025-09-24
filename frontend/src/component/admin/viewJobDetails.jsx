import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Badge, Card, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function ViewJobDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get job object from navigation state
  const job = location.state?.job;

  if (!job) {
    return (
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <Card className="text-center shadow">
              <Card.Body className="py-5">
                <i className="bi bi-exclamation-triangle display-1 text-warning mb-3"></i>
                <h3>No Job Data Found</h3>
                <p className="text-muted">The job details could not be loaded.</p>
                <Button
                  variant="primary"
                  onClick={() => navigate("/Admin/viewJob")}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Back to Jobs
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="text-primary mb-2">
                <i className="bi bi-briefcase-fill me-2"></i>
                Job Details
              </h2>
              <p className="text-muted">Complete information about this job posting</p>
            </div>
            <Button
              variant="outline-secondary"
              onClick={() => navigate("/Admin/viewJob")}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Back to Jobs
            </Button>
          </div>

          {/* Main Job Details Card */}
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">
                <i className="bi bi-info-circle me-2"></i>
                {job.title}
              </h4>
            </Card.Header>
            <Card.Body className="p-4">
              <Row>
                <Col md={6}>
                  <div className="mb-4">
                    <h6 className="text-primary mb-3">
                      <i className="bi bi-building me-2"></i>
                      Company Information
                    </h6>
                    <div className="ms-3">
                      <p><strong>Company Name:</strong> {job.company}</p>
                      <p><strong>Location:</strong> {job.location}</p>
                      <p><strong>Job ID:</strong> <Badge bg="secondary">{job.job_id}</Badge></p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h6 className="text-primary mb-3">
                      <i className="bi bi-people me-2"></i>
                      Position Details
                    </h6>
                    <div className="ms-3">
                      <p><strong>Number of Openings:</strong> {job.opening}</p>
                      <p><strong>Experience Required:</strong> {job.experience_required}</p>
                      <p><strong>Package:</strong> <span className="text-success fw-bold">{job.package}</span></p>
                    </div>
                  </div>
                </Col>

                <Col md={6}>
                  <div className="mb-4">
                    <h6 className="text-primary mb-3">
                      <i className="bi bi-calendar me-2"></i>
                      Timeline
                    </h6>
                    <div className="ms-3">
                      <p><strong>Application Deadline:</strong> {formatDate(job.deadline)}</p>
                      <p><strong>Posted Date:</strong> {formatDate(job.created_at)}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h6 className="text-primary mb-3">
                      <i className="bi bi-gear me-2"></i>
                      Requirements
                    </h6>
                    <div className="ms-3">
                      <p><strong>Skills Required:</strong></p>
                      <div className="mb-2">
                        {job.skills_required ? (
                          job.skills_required.split(',').map((skill, index) => (
                            <Badge key={index} bg="info" className="me-1 mb-1">
                              {skill.trim()}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-muted">Not specified</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>

              {/* Job Description */}
              <div className="mt-4">
                <h6 className="text-primary mb-3">
                  <i className="bi bi-file-text me-2"></i>
                  Job Description
                </h6>
                <div className="ms-3">
                  <div className="bg-light p-3 rounded">
                    {job.description ? (
                      <p className="mb-0">{job.description}</p>
                    ) : (
                      <p className="text-muted mb-0">No description provided</p>
                    )}
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Additional Information Card */}
          <Card className="shadow-sm">
            <Card.Header className="bg-light">
              <h5 className="mb-0">
                <i className="bi bi-list-ul me-2"></i>
                Additional Information
              </h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <div className="mb-3">
                    <strong>HR ID:</strong> {job.hr_id || "Not available"}
                  </div>
                  <div className="mb-3">
                    <strong>Status:</strong> 
                    <Badge bg={job.status === 'active' ? 'success' : 'secondary'} className="ms-2">
                      {job.status || 'Unknown'}
                    </Badge>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <strong>Last Updated:</strong> {formatDate(job.updated_at)}
                  </div>
                  <div className="mb-3">
                    <strong>Total Applications:</strong> 
                    <Badge bg="info" className="ms-2">
                      {job.total_applications || 0}
                    </Badge>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Action Buttons */}
          <div className="text-center mt-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/Admin/viewJobs")}
              className="me-3"
            >
              <i className="bi bi-arrow-left me-2"></i>
              Back to All Jobs
            </Button>
            <Button
              variant="outline-primary"
              size="lg"
              onClick={() => window.print()}
            >
              <i className="bi bi-printer me-2"></i>
              Print Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
