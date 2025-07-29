let express=require("express");
let bodyparser=require("body-parser");
let db=require("../src/config/db");
require("dotenv").config();
let app=express();
let router=require("../src/routes/route.js");

app.set("view engine","ejs");
app.use(express.static("public"));


// inbuild midlware 

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());
app.use("/",router);
module.exports=app;

