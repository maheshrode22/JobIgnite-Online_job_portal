const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure upload directories exist
const resumeDir = "uploads/resumes/";
const profileDir = "uploads/profile_images/";

if (!fs.existsSync(resumeDir)) fs.mkdirSync(resumeDir, { recursive: true });
if (!fs.existsSync(profileDir)) fs.mkdirSync(profileDir, { recursive: true });

// Storage configurations
const resumeStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, resumeDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, profileDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const combinedStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "resume") cb(null, resumeDir);
    else if (file.fieldname === "profile_image") cb(null, profileDir);
    else cb(new Error("Invalid field"));
  },
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

// File filters
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "resume") {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF files allowed!"), false);
  } else if (file.fieldname === "profile_image") {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files allowed!"), false);
  } else {
    cb(new Error("Invalid field"), false);
  }
};

// Multer instances
const upload = multer({ storage: resumeStorage, fileFilter });
const uploadProfile = multer({ storage: profileStorage, fileFilter });
const uploadCombined = multer({ storage: combinedStorage, fileFilter });

module.exports = { upload, uploadProfile, uploadCombined };
