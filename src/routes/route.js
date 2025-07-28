let express=require("express");
let router=express.Router();
/*let admincon=require("../controller/adminController");*/
let hrctr=require("../controller/hrController.js");
let jobseekCtr=require("../controller/jobseekerController.js");

 
/*router.get("admin",admincon.admin);*/
router.post("/hrlogin",hrctr.hrLogin);
router.post("/jobseekerLogin",jobseekCtr.jobSeeker);



module.exports=router;

