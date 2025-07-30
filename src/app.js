let express=require("express");
let bodyParser=require("body-parser");

require("dotenv").config();
let app=express();
let router=require("../src/routes/route.js");

app.set("view engine","ejs");
app.use(express.static("public"));




app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // inbuild midlware 

app.use(bodyParser.urlencoded({extended:true}));

app.use("/",router);
module.exports=app;

