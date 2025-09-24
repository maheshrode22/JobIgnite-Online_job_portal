import React from "react";
import { Routes, Route } from "react-router-dom";
import JsDashboard from "../component/jobSeeker/jsDashboard";
import BrowseJobs from "../component/jobSeeker/browseJobs";
import JobDetails from "../component/jobSeeker/jobDetails";
import SeekerDetail from "../component/jobSeeker/seekerDetails";
import SeekerProfile from "../component/jobSeeker/jobseekerProfile";
import ApplicationHistory from "../component/jobSeeker/appliedHistory";

import Footer from "../component/footer";
import HelpPass from "../component/jobSeeker/helpPass";

export default function JobSeekerRoutes() {
  return (<>
      <Routes>
      <Route path="/" element={<JsDashboard />}>
        <Route index element={<BrowseJobs />} />
        <Route path="browse-jobs" element={<BrowseJobs />} />
        <Route path="jobDetail/:id" element={<JobDetails />} />
        <Route path="seekerDetail" element={<SeekerDetail/>}/>
        <Route path="jobSeekerPro" element={<SeekerProfile />}/>
        <Route path="application-status" element={<ApplicationHistory />}/>
        <Route path="seekerProfile" element={<SeekerProfile/>}/>
       <Route path="/helpPass" element={<HelpPass/>}/>
        
        </Route>
      
    </Routes>
    <Footer />
    </>

  );
}
