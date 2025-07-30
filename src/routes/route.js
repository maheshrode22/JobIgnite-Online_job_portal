let express=require("express");
let router=express.Router();
let admincon=require("../controller/adminController");
let hrctr=require("../controller/hrController.js");
let jobseekCtr=require("../controller/jobseekerController.js");
const { route } = require("../app.js");

let jobsPost=require("../controller/jobsPostControler.js");

//admin model
router.post("/adminLogin",admincon.adminLogin);


// hr model
router.post("/hrlogin",hrctr.hrLogin);


router.post("/hrregister",hrctr.hrRegister);

router.get("/viewAllHr",hrctr.AllHr);
router.put("/updateHr",hrctr.updateHr);
router.post("/deleteHr",hrctr.delHr);
router.post("/updateStatusHr",hrctr.updateStatusHr)



//job seeker 

router.post("/jobseekerLogin",jobseekCtr.jobSeekerLog);
router.post("/jobSeekerRegister",jobseekCtr.jobSeekerRegister);



// job post
router.post("/createJobs",jobsPost.createJobs);
router.get("/viewallJobPost",jobsPost.viewallJobPost);



module.exports=router;

