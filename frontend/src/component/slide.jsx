import React from "react";
import "../css/slide.css";
import slideimage from "../assets/img/slide2.jpg";

function Slide() {
  return (
    <section
      className="hero-section text-white"
      style={{ backgroundImage: `url(${slideimage})` }}
    >
      <div className="hero-content">
        <h1 className="slide-heading">
          Find The Most Exciting Startup Jobs
        </h1>
        <p className="slide-para">
          Join the best startups and make an impact on the future.
        </p>
        <a href="/jobSeekerAuth" className="btn-slide">
          Browse Jobs
        </a>
      </div>
    </section>
  );
}

export default Slide;
