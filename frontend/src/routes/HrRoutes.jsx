import React from "react";
import { Routes, Route } from "react-router-dom";
import HrDashboard from "../component/hr/HrDashboard";
import AddJob from "../component/hr/addJob";
import Dashboard from "../component/hr/dashboard";
import HRProfile from "../component/hr/hrprofile";
export default function HrRoutes() {
  return (
    <Routes>
     
       <Route path="" element={<HrDashboard />}>
       <Route path="/dashboard" element={<Dashboard  />}></Route>
       <Route path="/addJobs" element={<AddJob />}></Route> 
       <Route path="/hrprofile" element={<HRProfile />}></Route> 
      </Route>
    </Routes>
  );
}
