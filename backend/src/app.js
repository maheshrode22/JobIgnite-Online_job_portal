require("dotenv").config();
let express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");
const path = require("path");

let app = express();
let router = require("./routes/route.js");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use(express.static("public"));
app.use("/uploads/resumes", express.static(path.join(__dirname, "../uploads/resumes")));
app.use("/uploads/profile_images", express.static(path.join(__dirname, "../uploads/profile_images")));

// Debug check
console.log("ENV DB CHECK:", process.env.DB_HOST, process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_DBNAME);
console.log("ENV SERVER CHECK:", process.env.SERVER_PORT);

// Routes
app.use("/", router);

module.exports = app;
