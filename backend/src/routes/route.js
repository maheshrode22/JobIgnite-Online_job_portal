let express=require("express");
let router=express.Router();
let admincon=require("../controller/adminController");
let hrctr=require("../controller/hrController.js");
let jobseekCtr=require("../controller/jobseekerController.js");
let appCtr=require("../controller/applicationController.js");
let jobsPost=require("../controller/jobsPostControler.js");
const { route } = require("../app.js");



//admin model
router.post("/adminLogin",admincon.adminLogin);
router.get("/viewAlljobSeeker",admincon.viewAllJobseeker);
router.post("/viewJobSeekerDetailed",admincon.jobseekerDetailed);



// hr model
router.post("/hrlogin",hrctr.hrLogin);
router.post("/hrregister",hrctr.hrRegister);
router.get("/viewAllHr",hrctr.AllHr);
router.put("/updateHr",hrctr.updateHr);
router.post("/deleteHr",hrctr.delHr);
router.post("/updateStatusHr",hrctr.updateStatusHr);
router.post("/viewAllPostHrById",hrctr.viewAllPostHrById);




//job seeker routers

router.post("/jobseekerLogin",jobseekCtr.jobSeekerLogin); // job seeker Login
router.post("/jobSeekerRegister",jobseekCtr.jobSeekerRegister); // job seeker registation 
router.post("/jobSeekerProfile",jobseekCtr.jobSeekerProfile);   //   // make or  create job seeker profile

router.post("/deletejoSeeker",jobseekCtr.deletejobSeeker);    // // delete job seeker profile
router.post("/updateJobSeekerPrfile",jobseekCtr.updateJobSeekerPrfile); // update job seeker profile 

// job post routers 
router.post("/createJobs",jobsPost.createJobs);  // post jobs 

router.get("/viewallJobPost",jobsPost.viewallJobPost);     // view all job post

router.post("/deletePost",jobsPost.deletePost);   // deleter job post

router.post("/searchJob",jobsPost.searchJob);     // search job post using title


// AplicationModel

router.post("/jobSeekerApply",appCtr.jobSeekerApply); // apply job
router.post("/trackApplication",appCtr.trackApplication); // track job aplication specific job seeker 
router.post("/viewAllApplicationByHR",appCtr.viewAllApplicationByHR);  // view all applied 


module.exports=router;

