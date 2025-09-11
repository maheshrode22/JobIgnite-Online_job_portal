let express = require("express");
let router = express.Router();

let admincon = require("../controller/adminController");
let hrctr = require("../controller/hrController.js");
let jobseekCtr = require("../controller/jobseekerController.js");
let appCtr = require("../controller/applicationController.js");
let jobsPost = require("../controller/jobsPostControler.js");

let auth = require("../middleware/authMiddleware.js");
let jobseekerAuth = require("../middleware/jobseekerAuth.js");
let verifyAdminToken = require("../middleware/adminmiddle.js");

// ⬇️ New upload middleware import
let { upload, uploadProfile, uploadCombined } = require("../middleware/upload.js");


// ---------------- Admin Routes ----------------
router.post("/adminLogin", admincon.adminLogin);
router.get("/viewAlljobSeeker", verifyAdminToken, admincon.viewAllJobseeker);
router.post("/viewJobSeekerDetailed", admincon.jobseekerDetailed);
router.get("/dashboard-stats", verifyAdminToken, admincon.getDashboardStats);

// Protected example
router.get("/hr/me", auth, hrctr.hrMe);

// HR Routes
router.post("/hrlogin", hrctr.hrLogin);
router.post("/hrregister", hrctr.hrRegister);
router.get("/viewAllHr", verifyAdminToken, admincon.AllHr);
router.put("/updateHr", hrctr.updateHr);
router.post("/deleteHr", hrctr.delHr);
router.post("/updateStatusHr", hrctr.updateStatusHr);
router.post("/viewAllPostHrById", hrctr.viewAllPostHrById);

// ---------------- Job Seeker Routes ----------------
router.post("/jobseekerLogin", jobseekCtr.loginJobSeeker);
router.post("/jobSeekerRegister", jobseekCtr.jobSeekerRegister);

router.post("/jobSeekerProfile", jobseekerAuth, jobseekCtr.jobSeekerProfile);
router.get("/getProfile/:seekerId", jobseekerAuth, jobseekCtr.getProfile);
router.get("/getCompleteProfile/:seekerId", jobseekerAuth, jobseekCtr.getCompleteProfile);
router.delete("/deleteSeeker/:seeker_id", jobseekerAuth, jobseekCtr.deletejobSeeker);
router.put("/updateSeeker", jobseekerAuth, jobseekCtr.updateSeeker);
router.put("/updateJobSeekerProfile", jobseekerAuth, upload.fields([{ name: "resume", maxCount: 1 }, { name: "profile_image", maxCount: 1 }]), jobseekCtr.updateJobSeekerProfile);

router.post("/profile/personal", jobseekerAuth, jobseekCtr.savePersonalInfo);
router.post("/profile/education", jobseekerAuth, jobseekCtr.saveEducation);
router.post("/profile/skills", jobseekerAuth, jobseekCtr.saveSkills);
router.post("/profile/experience", jobseekerAuth, jobseekCtr.saveExperience);

// ---------------- File Upload Routes ----------------
router.post(
  "/uploadResume/:seekerId",
  jobseekerAuth,
  upload.single("resume"),
  jobseekCtr.uploadResume
);

router.post(
  "/uploadProfileImage/:seekerId",
  jobseekerAuth,
  uploadProfile.single("profile_image"),
  jobseekCtr.uploadProfileImage
);

// ---------------- Job Post Routes ----------------
router.post("/createJobs", jobsPost.createJobs);
router.get("/viewallJobPost", jobsPost.viewallJobPost);
router.post("/deletePost", jobsPost.deletePost);
router.post("/searchJob", jobsPost.searchJob);
router.put("/updateJob/:id", jobsPost.updateJobById);
router.get("/getJobById/:id", jobsPost.getJobById);

// ---------------- Application Routes ----------------
router.post("/jobSeekerApply", jobseekerAuth, appCtr.jobSeekerApply);
router.get("/trackApplication/:seeker_id", jobseekerAuth, appCtr.trackApplicationsBySeeker);
router.post("/viewAllApplicationByHR", appCtr.viewAllApplicationByHR);

module.exports = router;
