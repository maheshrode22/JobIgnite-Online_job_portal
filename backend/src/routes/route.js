let express=require("express");
let router=express.Router();
let admincon=require("../controller/adminController");
let hrctr=require("../controller/hrController.js");
let jobseekCtr=require("../controller/jobseekerController.js");
let appCtr=require("../controller/applicationController.js");
let jobsPost=require("../controller/jobsPostControler.js");
let verifyAdminToken = require("../middleware/adminmiddle.js");

//admin model
router.post("/adminLogin",admincon.adminLogin);
router.get("/viewAlljobSeeker",verifyAdminToken, admincon.viewAllJobseeker);
router.post("/viewJobSeekerDetailed",admincon.jobseekerDetailed);
router.get("/viewAllHr", verifyAdminToken, admincon.AllHr);


// hr model
router.post("/hrlogin",hrctr.hrLogin);
router.post("/hrregister",hrctr.hrRegister);

router.put("/updateHr",hrctr.updateHr);
router.post("/deleteHr",hrctr.delHr);
router.post("/updateStatusHr",hrctr.updateStatusHr);
router.post("/viewAllPostHrById",hrctr.viewAllPostHrById);




//job seeker routers        ////j

router.post("/jobseekerLogin",jobseekCtr.jobSeekerLogin); // job seeker Login
router.post("/jobSeekerRegister",jobseekCtr.jobSeekerRegister); // job seeker registation 
router.post("/jobSeekerProfile",jobseekCtr.jobSeekerProfile);   //   // make or  create job seeker profile
router.get("/getProfile/:seekerId",jobseekCtr.getProfile);
router.delete("/deleteSeeker/:seeker_id",jobseekCtr.deletejobSeeker);// // delete job seeker profile
router.put("/updateSeeker",jobseekCtr.updateSeeker);

router.put("/updateJobSeekerProfile",jobseekCtr.updateJobSeekerProfile); // update job seeker profile 
// job post routers 


router.post("/createJobs",jobsPost.createJobs);  // post jobs 

router.get("/viewallJobPost",jobsPost.viewallJobPost);     // view all job post

router.post("/deletePost",jobsPost.deletePost);   // deleter job post

router.post("/searchJob",jobsPost.searchJob);     // search job post using title


// AplicationModel

router.post("/jobSeekerApply",appCtr.jobSeekerApply); // apply job
router.get("/trackApplication/:seeker_id",appCtr.trackApplicationsBySeeker);
router.post("/viewAllApplicationByHR",appCtr.viewAllApplicationByHR);  // view all applied 


module.exports=router;

