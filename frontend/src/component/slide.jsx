import React from "react";
import "../css/slide.css";
import slideimage from "../assets/img/slide1.jpg";

function Slide() {
  return (
    <section
      className="hero-section d-flex align-items-center text-white"
      style={{
        backgroundImage: `url(${slideimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "80vh"
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-lg-6">
            <h1 className="fw-bold display-4">
              Find the most exciting startup jobs
            </h1>
            <p className="lead mt-3">
              Join the best startups and make an impact on the future.
            </p>
            <a href="#jobs" className="btn btn-primary btn-lg mt-3">
              Browse Jobs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Slide;
