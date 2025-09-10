let express = require("express");
let router = express.Router();
let admincon=require("../controller/adminController");
let hrctr=require("../controller/hrController.js");
let jobseekCtr=require("../controller/jobseekerController.js");
let appCtr=require("../controller/applicationController.js");
let jobsPost=require("../controller/jobsPostControler.js");

let auth = require("../middleware/authMiddleware.js");
let jobseekerAuth = require("../middleware/jobseekerAuth.js");

let verifyAdminToken = require("../middleware/adminmiddle.js");

// Multer configuration for file uploads
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const uploadsDir = path.join(__dirname, '../../uploads');
const resumesDir = path.join(uploadsDir, 'resumes');
const profileImagesDir = path.join(uploadsDir, 'profile_images');

// Create directories if they don't exist
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
if (!fs.existsSync(resumesDir)) fs.mkdirSync(resumesDir, { recursive: true });
if (!fs.existsSync(profileImagesDir)) fs.mkdirSync(profileImagesDir, { recursive: true });

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("File destination - fieldname:", file.fieldname);
    
    // Store files in specific folders based on type
    if (file.fieldname === 'resume') {
      cb(null, resumesDir);
    } else if (file.fieldname === 'profile_image') {
      cb(null, profileImagesDir);
    } else {
      cb(null, uploadsDir); // fallback
    }
  },
  filename: function (req, file, cb) {
    // Create unique filename with timestamp
    const timestamp = Date.now();
    const originalName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_'); // Sanitize filename
    const filename = `${timestamp}_${originalName}`;
    
    console.log("Generated filename:", filename);
    cb(null, filename);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    console.log("File filter - fieldname:", file.fieldname, "mimetype:", file.mimetype);
    
    // Allow only specific file types
    if (file.fieldname === 'resume') {
      // Allow PDF and DOC files for resume
      if (file.mimetype === 'application/pdf' || 
          file.mimetype === 'application/msword' || 
          file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        console.log("Resume file accepted");
        cb(null, true);
      } else {
        console.log("Resume file rejected - wrong type:", file.mimetype);
        cb(new Error('Only PDF and DOC files are allowed for resume'), false);
      }
    } else if (file.fieldname === 'profile_image') {
      // Allow only image files for profile image
      if (file.mimetype.startsWith('image/')) {
        console.log("Profile image accepted");
        cb(null, true);
      } else {
        console.log("Profile image rejected - wrong type:", file.mimetype);
        cb(new Error('Only image files are allowed for profile image'), false);
      }
    } else {
      console.log("Unexpected field:", file.fieldname);
      cb(new Error('Unexpected field'), false);
    }
  }
});

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error("Multer error:", err);
    return res.status(400).json({ success: false, message: err.message });
  } else if (err) {
    console.error("File upload error:", err);
    return res.status(400).json({ success: false, message: err.message });
  }
  next();
};


//admin model
router.post("/adminLogin",admincon.adminLogin);
router.get("/viewAlljobSeeker",verifyAdminToken, admincon.viewAllJobseeker);
router.post("/viewJobSeekerDetailed",admincon.jobseekerDetailed);

router.get("/dashboard-stats", verifyAdminToken,admincon.getDashboardStats);

// Protected example
router.get("/hr/me", auth, hrctr.hrMe);


// hr model
router.post("/hrlogin", hrctr.hrLogin);
router.post("/hrregister", hrctr.hrRegister);

// Admin routes for HR management
router.get("/viewAllHr", verifyAdminToken, admincon.AllHr);


router.put("/updateHr",hrctr.updateHr); // update hr profile 

router.post("/deleteHr",hrctr.delHr);
router.post("/updateStatusHr",hrctr.updateStatusHr);
router.post("/viewAllPostHrById",hrctr.viewAllPostHrById);








//job seeker routers        ////j

router.post("/jobseekerLogin",jobseekCtr.loginJobSeeker); // job seeker Login
router.post("/jobSeekerRegister",jobseekCtr.jobSeekerRegister); // job seeker registation 


// Protected job seeker routes - require JWT authentication
router.post("/jobSeekerProfile", jobseekerAuth, jobseekCtr.jobSeekerProfile);   // make or create job seeker profile
router.get("/getProfile/:seekerId", jobseekerAuth, jobseekCtr.getProfile);
router.get("/getCompleteProfile/:seekerId", jobseekerAuth, jobseekCtr.getCompleteProfile); // get complete profile
router.delete("/deleteSeeker/:seeker_id", jobseekerAuth, jobseekCtr.deletejobSeeker); // delete job seeker profile
router.put("/updateSeeker", jobseekerAuth, jobseekCtr.updateSeeker);
// Update the route to include multer middleware and error handling
router.put("/updateJobSeekerProfile", jobseekerAuth, upload.fields([
  { name: 'resume', maxCount: 1 },
  { name: 'profile_image', maxCount: 1 }
]), handleMulterError, jobseekCtr.updateJobSeekerProfile); // update job seeker profile 



router.post("/profile/personal", jobseekerAuth, jobseekCtr.savePersonalInfo);

// Education Save
router.post("/profile/education", jobseekerAuth, jobseekCtr.saveEducation);

// Skills Save
router.post("/profile/skills", jobseekerAuth, jobseekCtr.saveSkills);

// Experience Save
router.post("/profile/experience", jobseekerAuth, jobseekCtr.saveExperience);








// job post routers 


router.post("/createJobs",jobsPost.createJobs);  // post jobs 

router.get("/viewallJobPost",jobsPost.viewallJobPost);     // view all job post

router.post("/deletePost",jobsPost.deletePost);   // deleter job post

router.post("/searchJob",jobsPost.searchJob);     // search job post using title
router.put("/updateJob/:id", jobsPost.updateJobById);
router.get("/getJobById/:id", jobsPost.getJobById);  // get job by ID



// AplicationModel

router.post("/jobSeekerApply", jobseekerAuth, appCtr.jobSeekerApply); // apply job
router.get("/trackApplication/:seeker_id", jobseekerAuth, appCtr.trackApplicationsBySeeker);
router.post("/viewAllApplicationByHR",appCtr.viewAllApplicationByHR);  // view all applied 


module.exports=router;

