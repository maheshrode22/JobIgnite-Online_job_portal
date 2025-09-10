let express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "../.env") });
let app = express();
let router = require("../src/routes/route.js");

// 🔹 Middlewares
app.use(cors()); // React frontend access
app.use(express.json()); // JSON body parse
app.use(bodyParser.urlencoded({ extended: true })); // URL encoded parse

// 🔹 Static files
app.use(express.static("public"));

// 🔹 Serve uploaded files
app.use("/uploads/resumes", express.static(path.join(__dirname, "../uploads/resumes")));
app.use("/uploads/profile_images", express.static(path.join(__dirname, "../uploads/profile_images")));

// 🔹 Routes
app.use("/", router);

module.exports = app;
