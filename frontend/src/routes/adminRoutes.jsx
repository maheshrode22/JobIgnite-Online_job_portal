
import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminDashboard from "../component/admin/adminDashBord";
import DashboardAdmin from "../component/admin/dashbordAdmin";
import ViewHR from "../component/admin/viewHr";
import ViewSeeker  from "../component/admin/viewSeeker";
import ViewJobs from "../component/admin/viewJob";
import ViewJobDetails from "../component/admin/viewJobDetails";

export default function AdminRoutes() {
  return (
    <Routes>
     
       <Route path="" element={<AdminDashboard />}>
        <Route path="/dashboardAdmin" element={<DashboardAdmin  />}></Route>
        <Route path="/viewHr" element={<ViewHR  />}></Route>
        <Route path="/viewSeeker" element={<ViewSeeker  />}></Route>
        <Route path="/viewJobs" element={<ViewJobs />}></Route>
         <Route path="/viewJobDetails " element={<ViewJobDetails />}></Route>
      </Route>
    </Routes>
  );
}
