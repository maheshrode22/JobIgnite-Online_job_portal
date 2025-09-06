import React from "react";
import { Outlet } from "react-router-dom";
import JsNavbar from "../jobSeeker/jsNavbar";         
import "../../css/jobSeeker/jsDashboard.css";         

export default function JsDashboard() {
  return (
    <div className="js-dashboard">
      <JsNavbar />
      
     
        <div className="js-dashboard-content">
          <Outlet />
        </div>
      </div>
  
  );
}
