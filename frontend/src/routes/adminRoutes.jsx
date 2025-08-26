
import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminDashboard from "../component/admin/adminDashBord";
import DashboardAdmin from "../component/admin/dashbordAdmin";


export default function AdminRoutes() {
  return (
    <Routes>
     
       <Route path="" element={<AdminDashboard />}>
        <Route path="/dashboardAdmin" element={<DashboardAdmin  />}></Route>
        
      </Route>
    </Routes>
  );
}



