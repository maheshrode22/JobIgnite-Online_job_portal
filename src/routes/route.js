let express=require("express");
let router=express.Router();
let admincon=require("../controller/adminController");
let hrctr=require("../controller/hrController.js");
let jobseekCtr=require("../controller/jobseekerController.js");


router.post("/adminLogin",admincon.adminLogin);
// router.post("/makeHr",hrctr.makeHr);


router.post("/hrlogin",hrctr.hrLogin);
router.post("/jobseekerLogin",jobseekCtr.jobSeeker);



module.exports=router;

