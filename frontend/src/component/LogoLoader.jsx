import React from "react";
import "../css/LogoLoader.css";
import logo from "../assets/img/logo.jpg"; 

export default function LogoLoader() {
  return (
    <div className="logo-loader-overlay">
      <div className="rotating-ring"></div>
      <img src={logo}
      
      alt="JobIgnite Logo" className="loader-logo circle-img" />
    </div>
  );
}
