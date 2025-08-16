import React from "react";
import "../css/footer.css";
import logo1 from "../assets/img/logo2.jpg"
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="bg-dark text-light py-5">
      <div className="container">
        <div className="row">

          {/* About Us */}
          <div className="col-md-4 mb-4 mb-md-0">
            <Link className="fw-bold d-flex align-item-center" to="/">
            <img 
            src={logo1}
            className="me-2 img-fluid blur-edges"
            style={{width:"120px", height:"50px"}}
            >
            </img>
            </Link>
            <p className="small text-white mt-3">
            connect with us
            </p>

          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="fw-bold">CONTACT INFO</h5>
            <p className="small text-secondary mt-3 mb-1">
              <strong>Address:</strong> Sr No 129/3, DANGAT PARK, Opposite CNG pump, Warje Malwadi,
               Pune 411058, Opposite CNG pump, 
              Pune,Maharashtra - 411058
            </p>
            <p className="small text-secondary mb-1">
              <strong>Phone:</strong> +918459525501
            </p>
            <p className="small text-secondary">
              <strong>Email:</strong> JobIgnite@gmail.com
            </p>
          </div>

          {/* Important Links */}
          <div className="col-md-4">
            <h5 className="fw-bold">IMPORTANT LINKS</h5>
            <ul className="list-unstyled mt-3">
              <li><a href="/" className="text-secondary text-decoration-none">Home</a></li>
              <li><a href="/jobs" className="text-secondary text-decoration-none">Find a Job</a></li>
              <li><a href="/about" className="text-secondary text-decoration-none">About Us</a></li>
              <li><a href="/contact" className="text-secondary text-decoration-none">Contact Us</a></li>
              <li><a href="/login" className="text-secondary text-decoration-none">Login</a></li>
            </ul>
          </div>

        </div>
   
      </div>
      <hr></hr>
<p className="text-center">All trademarks are the property of their respective owners
All rights reserved © 2025 JobIgnite (India) Ltd.</p>
    </footer>
  );
}

export default Footer;
