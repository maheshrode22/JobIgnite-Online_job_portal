let express=require("express");
let router=express.Router();
let admincon=require("../controller/adminController");
let hrctr=require("../controller/hrController.js");
let jobseekCtr=require("../controller/jobseekerController.js");


router.post("/adminLogin",admincon.adminLogin);



router.post("/hrlogin",hrctr.hrLogin);
router.post("/jobseekerLogin",jobseekCtr.jobSeeker);

router.post("/hrregister",hrctr.hrRegister);

router.get("/viewAllHr",hrctr.AllHr);
router.put("/updateHr",hrctr.updateHr);
router.delete('/deleteHr', hrctr.deleteHr);


module.exports=router;

