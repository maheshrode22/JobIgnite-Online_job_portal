let express=require("express");
let router=express.Router();
let admincon=require("../controller/adminController");
let hrctr=require("../controller/hrController.js");
let jobseekCtr=require("../controller/jobseekerController.js");

let jobsPost=require("../controller/jobsPostControler.js");

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
router.post("/updateStatusHr",hrctr.updateStatusHr)



//job seekerrouters
// job seeker login
router.post("/jobseekerLogin",jobseekCtr.jobSeeker);
//job seeker register
//job seeker 

router.post("/jobseekerLogin",jobseekCtr.jobSeekerLogin);
router.post("/jobSeekerRegister",jobseekCtr.jobSeekerRegister);
router.post("/jobSeekerProfile",jobseekCtr.jobSeekerProfile);

router.post("/deletejoSeeker",jobseekCtr.deletejobSeeker);



// job post routers 
router.post("/createJobs",jobsPost.createJobs);

// view all job post
router.get("/viewallJobPost",jobsPost.viewallJobPost);

// deleter job post
router.post("/deletePost",jobsPost.deletePost);

// search job post using title
router.post("/searchJob",jobsPost.searchJob);



module.exports=router;

