import React from "react";
import { Routes, Route } from "react-router-dom";
import JsDashboard from "../component/jobSeeker/jsDashboard";
import BrowseJobs from "../component/jobSeeker/browseJobs";

export default function JobSeekerRoutes() {
  return (
    <Routes>
      <Route path="" element={<JsDashboard />}>
        <Route path="/browse-jobs" element={<BrowseJobs />} />
      </Route>
    </Routes>
  );
}
