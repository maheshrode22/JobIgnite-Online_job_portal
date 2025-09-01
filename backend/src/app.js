let express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");   // 🔹 CORS import

require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
let app = express();
let router = require("../src/routes/route.js");

// Middlewares
app.use(cors());   // React frontend  backend access 
app.use(express.json()); // JSON body parse
app.use(bodyParser.urlencoded({ extended: true })); // URL encoded parse

//  View engine + static files
// app.set("view engine", "ejs");
app.use(express.static("public"));

//  Routes
app.use("/", router);

module.exports = app;


