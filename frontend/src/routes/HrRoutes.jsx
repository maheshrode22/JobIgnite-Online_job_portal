import React from "react";
import { Routes, Route } from "react-router-dom";
import HrDashboard from "../component/hr/HrDashboard";
import AddJob from "../component/hr/addJob";
import Dashboard from "../component/hr/dashboard";
import HRProfile from "../component/hr/hrprofile";
import ViewJob from "../component/hr/viewJob";
import Applications from "../component/hr/Applications";
export default function HrRoutes() {
  return (
    <Routes>
     
       <Route path="" element={<HrDashboard />}>
       <Route path="/dashboard" element={<Dashboard  />}></Route>
       <Route path="/addJobs" element={<AddJob />}></Route> 
       <Route path="/hrprofile" element={<HRProfile />}></Route> 
       <Route path="/viewJob" element={<ViewJob/>}></Route>
      <Route path="/Applications" element={<Applications/>}></Route>
      </Route>
    </Routes>
  );
}