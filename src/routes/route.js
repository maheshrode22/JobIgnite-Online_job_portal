let express=require("express");
let router=express.Router();
let home=require("../controller/home");
let hrctr=require("../controller/hrController.js");


 
router.get("/",home.Navbar);

router.post("/hrlogin",hrctr.);


module.exports=router;

