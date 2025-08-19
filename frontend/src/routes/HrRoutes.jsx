// src/routes/HrRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import HrDashboard from "../component/hr/HrDashboard";
import dashboard from "../component/hr/dashboard";
import AddJob from "../component/hr/addJob";

export default function HrRoutes() {
  return (
    <Routes>
      <Route path="/hr" element={<HrDashboard />}>
        <Route index element={<dashboard />} />   
        <Route path="add-job" element={<AddJob />} />
      </Route>
    </Routes>
  );
}
