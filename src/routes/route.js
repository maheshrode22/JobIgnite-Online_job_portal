let express=require("express");
let router=express.Router();
let home=require("../controller/home");



 
router.get("/",home.Navbar);


module.exports=router;

