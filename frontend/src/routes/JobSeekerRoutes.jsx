import React from "react";
import { Routes, Route } from "react-router-dom";
import JsDashboard from "../component/jobSeeker/jsDashboard";
import BrowseJobs from "../component/jobSeeker/browseJobs";
import JobDetails from "../component/jobSeeker/jobDetails";
import SeekerProfileUpdate from "../component/jobSeeker/seekerProfile";

export default function JobSeekerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<JsDashboard />}>
      <Route index element={<BrowseJobs />} />
      <Route path="browse-jobs" element={<BrowseJobs />} />
      <Route path="jobDetail/:id" element={<JobDetails />} />
      <Route path="profile" element={<SeekerProfileUpdate seekerId={4} />} />
</Route>

    </Routes>
  );
}
