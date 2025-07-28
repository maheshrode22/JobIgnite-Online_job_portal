let express=require("express");
let router=express.Router();
let home=require("../controller/home");
let admincon=require("../controller/adminController");



 
router.get("/",home.Navbar);
router.get("admin",admincon.admin);


module.exports=router;

