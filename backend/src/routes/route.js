let express = require("express");
let router = express.Router();
let admincon=require("../controller/adminController");
let hrctr=require("../controller/hrController.js");
let jobseekCtr=require("../controller/jobseekerController.js");
let appCtr=require("../controller/applicationController.js");
let jobsPost=require("../controller/jobsPostControler.js");

let auth = require("../middleware/authMiddleware.js");
let jobseekerAuth = require("../middleware/jobseekerAuth.js");

let verifyAdminToken = require("../middleware/adminmiddle.js");


//admin model
router.post("/adminLogin",admincon.adminLogin);
router.get("/viewAlljobSeeker",verifyAdminToken, admincon.viewAllJobseeker);
router.post("/viewJobSeekerDetailed",admincon.jobseekerDetailed);

router.get("/dashboard-stats", verifyAdminToken,admincon.getDashboardStats);

// Protected example
router.get("/hr/me", auth, hrctr.hrMe);


// hr model
router.post("/hrlogin", hrctr.hrLogin);
router.post("/hrregister", hrctr.hrRegister);

// Admin routes for HR management
router.get("/viewAllHr", verifyAdminToken, admincon.AllHr);


router.put("/updateHr",hrctr.updateHr); // update hr profile 

router.post("/deleteHr",hrctr.delHr);
router.post("/updateStatusHr",hrctr.updateStatusHr);
router.post("/viewAllPostHrById",hrctr.viewAllPostHrById);








//job seeker routers        ////j

router.post("/jobseekerLogin",jobseekCtr.loginJobSeeker); // job seeker Login
router.post("/jobSeekerRegister",jobseekCtr.jobSeekerRegister); // job seeker registation 


// Protected job seeker routes - require JWT authentication
router.post("/jobSeekerProfile", jobseekerAuth, jobseekCtr.jobSeekerProfile);   // make or create job seeker profile
router.get("/getProfile/:seekerId", jobseekerAuth, jobseekCtr.getProfile);
router.get("/getCompleteProfile/:seekerId", jobseekerAuth, jobseekCtr.getCompleteProfile); // get complete profile
router.delete("/deleteSeeker/:seeker_id", jobseekerAuth, jobseekCtr.deletejobSeeker); // delete job seeker profile
router.put("/updateSeeker", jobseekerAuth, jobseekCtr.updateSeeker);
router.put("/updateJobSeekerProfile", jobseekerAuth, jobseekCtr.updateJobSeekerProfile); // update job seeker profile 



// job post routers 


router.post("/createJobs",jobsPost.createJobs);  // post jobs 

router.get("/viewallJobPost",jobsPost.viewallJobPost);     // view all job post

router.post("/deletePost",jobsPost.deletePost);   // deleter job post

router.post("/searchJob",jobsPost.searchJob);     // search job post using title
router.put("/updateJob/:id", jobsPost.updateJobById);
router.get("/getJobById/:id", jobsPost.getJobById);  // get job by ID



// AplicationModel

router.post("/jobSeekerApply", jobseekerAuth, appCtr.jobSeekerApply); // apply job
router.get("/trackApplication/:seeker_id", jobseekerAuth, appCtr.trackApplicationsBySeeker);
router.post("/viewAllApplicationByHR",appCtr.viewAllApplicationByHR);  // view all applied 


module.exports=router;

