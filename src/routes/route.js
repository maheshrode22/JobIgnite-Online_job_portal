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



//job seeker 

router.post("/jobseekerLogin",jobseekCtr.jobSeekerLogin);
router.post("/jobSeekerRegister",jobseekCtr.jobSeekerRegister);
router.post("/jobSeekerProfile",jobseekCtr.jobSeekerProfile);

router.post("/deletejoSeeker",jobseekCtr.deletejobSeeker);



// job post
router.post("/createJobs",jobsPost.createJobs);
router.get("/viewallJobPost",jobsPost.viewallJobPost);



module.exports=router;

