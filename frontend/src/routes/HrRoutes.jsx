import React from "react";
import { Routes, Route } from "react-router-dom";
import HrDashboard from "../component/hr/HrDashboard";
export default function HrRoutes() {
  return (
    <Routes>
      <Route path="" element={<HrDashboard />}>
      </Route>
    </Routes>
  );
}
