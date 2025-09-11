const jobseekerModel = require("../models/jobseekerModel.js");
const { sendMail } = require("../Services/mailService.js");
const { registrationTemplate } = require("../Services/mailTemplates.js");
const { validateJobSeeker } = require("../validation/seekerValidation/SeekerValidation.js");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

// ---------------- Login ----------------
exports.loginJobSeeker = async (req, res) => {
  const { jobUser, jobPass } = req.body;

exports.jobSeekerLogin = (req, res) => {
    const { jobUser, jobPass } = req.body;

    jobseekerModel.jobSeekerLogin(jobUser, jobPass)
      .then((result) => {
        if (result.length > 0) {
          // user found
          const payload = {
            seeker_id: result[0].seeker_id,
            email: result[0].email,
            name: result[0].name
          };

          const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

          res.send({
            success: true,
            token,          // ✅ send token
            user: result[0] // optional
          });
        } else {
          res.send({
            success: false,
            message: "Invalid email or password"
          });
        }
      })
      .catch((err) => res.status(500).send(err));
};
  try {
    const result = await jobseekerModel.jobSeekerLogin(jobUser);

    if (!result || result.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(jobPass, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const { password, ...safeUser } = user;

    const token = jwt.sign(
      { ...safeUser, role: "jobseeker" },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ success: true, token, user: safeUser });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// ---------------- Register ----------------
exports.jobSeekerRegister = async (req, res) => {
  try {

    const { name, email, password, phone, address } = req.body;
    if (!name || !email || !password || !phone || !address)
      return res.status(400).send({ success: false, message: "All fields required" });

      const { name, email, password, phone, address } = req.body;
      
          const validationError = validateJobSeeker({ name, email, password, phone, address });
          if (validationError) {
          return res.status(400).send({ success: false, message: validationError });
        }


    const exists = await jobseekerModel.findByEmail(email);
    if (exists && exists.length > 0)
      return res.status(409).send({ success: false, message: "Email already in use" });

    const hashed = await bcrypt.hash(password, 10);
    const result = await jobseekerModel.jobSeekerRegister(name, email, hashed, phone, address);

    res.send({ success: true, msg: "Your registration is successful" });

    const { subject, body } = registrationTemplate(name);
    try {
      await sendMail(email, subject, body);
    } catch (err) {
      console.error("Mail sending failed:", err);
    }
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).send({ message: "Registration failed", error: err });
  }
};

// ---------------- Profile ----------------
exports.jobSeekerProfile = (req, res) => {
  const data = req.body;
  jobseekerModel.jobSeekerProfile(data)
    .then((result) => {
      if (result.affectedRows > 0) res.send({ msg: "Profile added successfully" });
      else res.status(400).send({ msg: "Profile not added" });
    })
    .catch((err) => res.status(500).send({ error: err.message }));
};

// ---------------- Get Profiles ----------------
exports.getProfile = (req, res) => {
  const id = req.params.seekerId;
  jobseekerModel.getProfile(id)
    .then((profile) => {
      if (profile) res.status(200).json(profile[0]);
      else res.status(404).json({ msg: "Profile not found" });
    })
    .catch((err) => res.status(500).json({ msg: "Server error", error: err.message }));
};

exports.getCompleteProfile = (req, res) => {
  const id = req.params.seekerId;
  jobseekerModel.getCompleteProfile(id)
    .then((profile) => {
      if (profile) res.status(200).json(profile);
      else res.status(404).json({ msg: "Profile not found" });
    })
    .catch((err) => res.status(500).json({ msg: "Server error", error: err.message }));
};

// ---------------- Delete ----------------
exports.deletejobSeeker = (req, res) => {
  const id = req.params.seeker_id;
  jobseekerModel.deletejobSeeker(id)
    .then((result) => {
      if (result.affectedRows > 0) res.send({ msg: "Job seeker deleted successfully" });
      else res.status(400).send({ msg: "Deletion failed" });
    })
    .catch((err) => res.status(500).send({ error: err.message }));
};

// ---------------- Update Basic Info ----------------
exports.updateSeeker = (req, res) => {
  const data = req.body;
  jobseekerModel.updateSeeker(data)
    .then((result) => {
      if (result.affectedRows > 0) res.send({ msg: "Profile updated successfully" });
      else res.status(400).send({ msg: "Profile update failed" });
    })
    .catch((err) => res.status(500).send({ error: err.message }));
};

// ---------------- Save Personal Info (FIXED VERSION) ----------------
exports.savePersonalInfo = async (req, res) => {
  try {
    const userId = req.user.seeker_id;
    const { 
      name, 
      email, 
      phone, 
      address_line1, 
      address_line2, 
      landmark, 
      pincode, 
      state_id, 
      district_id, 
      city_id,
      gender,
      birth_date 
    } = req.body;

    console.log("Saving personal info for user:", userId);
    console.log("Request body:", req.body);

    // Update basic info in job_seekers table
    const basicUpdateResult = await jobseekerModel.updateSeeker(
      userId, name, email, phone, address_line1, address_line2, 
      landmark, pincode, state_id, district_id, city_id
    );

    // Try to update profile info (gender, birth_date) in job_seeker_profile table
    // Only if gender or birth_date are provided
    if (gender !== undefined || birth_date !== undefined) {
      try {
        await jobseekerModel.updateProfileInfo(userId, { gender, birth_date });
        console.log("Profile info updated successfully");
      } catch (profileError) {
        console.error("Profile info update failed:", profileError.message);
        // If profile update fails, we'll still return success for basic info update
        // but log the error for debugging
        if (profileError.message.includes("Unknown column 'gender'")) {
          console.log("Gender column doesn't exist in job_seeker_profile table");
          // You might want to add gender to job_seekers table instead
        }
      }
    }

    res.json({ 
      success: true, 
      message: "Personal information saved successfully",
      updated: basicUpdateResult.affectedRows > 0
    });
  } catch (err) {
    console.error("Save personal info error:", err);
    res.status(500).json({ 
      success: false, 
      message: err.message || "Failed to save personal information" 
    });
  }
};

// ---------------- Save Education (FIXED VERSION) ----------------
exports.saveEducation = async (req, res) => {
  try {
    const userId = req.user.seeker_id;
    
    // Use the comprehensive education update function instead of the simple one
    await jobseekerModel.updateCompleteEducation(userId, req.body);
    
    res.json({ success: true, message: "Education saved successfully" });
  } catch (err) {
    console.error("Education save error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.saveSkills = async (req, res) => {
  try {
    const userId = req.user.seeker_id;
    await jobseekerModel.updateSkills(userId, req.body);
    res.json({ success: true, message: "Skills saved successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------- Save Experience (IMPROVED VERSION) ----------------
exports.saveExperience = async (req, res) => {
  try {
    const userId = req.user.seeker_id;
    const { company, role, years } = req.body;
    
    console.log("=== EXPERIENCE UPDATE DEBUG ===");
    console.log("User ID:", userId);
    console.log("Request body:", req.body);
    console.log("Extracted fields:", { company, role, years });
    
    const result = await jobseekerModel.updateExperience(userId, { company, role, years });
    
    console.log("Update result:", result);
    console.log("Affected rows:", result.affectedRows);
    console.log("=== END EXPERIENCE DEBUG ===");
    
    res.json({ 
      success: true, 
      message: "Experience saved successfully",
      affectedRows: result.affectedRows,
      data: { company, role, years }
    });
  } catch (err) {
    console.error("Experience save error:", err);
    res.status(500).json({ 
      success: false, 
      message: err.message,
      error: err
    });
  }
};

// ---------------- Upload Files ----------------
exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No resume uploaded" });
    await jobseekerModel.saveResume(req.params.seekerId, req.file.filename);
    res.json({ success: true, message: "Resume uploaded successfully", resume: req.file.filename });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No profile image uploaded" });
    await jobseekerModel.saveProfileImage(req.params.seekerId, req.file.filename);
    res.json({ success: true, message: "Profile image uploaded successfully", profile_image: req.file.filename });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------- Combined Update (Resume + Profile Image) ----------------
exports.updateJobSeekerProfile = async (req, res) => {
  try {
    const seekerId = req.user.seeker_id;
    let result = { success: true, message: "", data: {} };

    if (req.files?.resume) {
      const resumePath = req.files.resume[0].filename;
      await jobseekerModel.saveResume(seekerId, resumePath);
      result.data.resume = resumePath;
      result.message += "Resume uploaded successfully. ";
    }

    if (req.files?.profile_image) {
      const profilePath = req.files.profile_image[0].filename;
      await jobseekerModel.saveProfileImage(seekerId, profilePath);
      result.data.profile_image = profilePath;
      result.message += "Profile image uploaded successfully. ";
    }

    if (!req.files || (!req.files.resume && !req.files.profile_image)) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
