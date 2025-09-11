let jobseekerModel = require("../models/jobseekerModel.js");
const { sendMail } = require("../Services/mailService.js");
const { registrationTemplate } = require("../Services/mailTemplates.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.loginJobSeeker = async (req, res) => {
  const { jobUser, jobPass } = req.body;

  try {
    const result = await jobseekerModel.jobSeekerLogin(jobUser);

    if (result.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const user = result[0];

    // bcrypt compare
    const isMatch = await bcrypt.compare(jobPass, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Remove password before sending in token
    const { password, ...safeUser } = user;

    // Generate JWT with complete user data
    const token = jwt.sign(
      { 
        ...safeUser,   // DB ??? complete user data (password ??? ?? ???)
        role: "jobseeker"
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({
      success: true,
      token,
      user: safeUser   // ?? ??? ?? frontend direct use ?? ???
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



exports.jobSeekerRegister = async (req, res) => {
  try {
      const { name, email, password, phone, address } = req.body;
      if (!name || !email || !password || !phone || !address)
        return res.status(400).send({ success: false, message: "All fields required" });

        const exists=await jobseekerModel.findByEmail(email);
        if(exists && exists.length>0)
          return res.status(409).send({success: false, message: "Email already in use"})
       const hashed = await bcrypt.hash(password, 10);

      const result = await jobseekerModel.jobSeekerRegister(name, email, hashed, phone, address, null, null, null, null, null, null);

      res.send({ msg: "Your registration is successful" });

      const { subject, body } = registrationTemplate(name);

      // Use await to catch errors properly
      try {
          await sendMail(email, subject, body);
          console.log("Mail function executed for:", email);
      } catch (err) {
          console.error("Mail sending failed:", err);
      }

  } catch (err) {
      console.error("Registration error:", err);
      res.status(500).send({ message: "Registration failed", error: err });
  }
};



// updated profile creation to handle all fields
exports.jobSeekerProfile=(req,res)=>{
    let {seeker_id,gender,birth_date,resume,profile_image,skills,hobbies,languages,graduation,graduation_university,graduation_year,graduation_cgpa,post_graduation,post_graduation_university,post_graduation_year,post_graduation_cgpa,hsc_year,hsc_marks,ssc_year,ssc_marks}=req.body;

    let promise=jobseekerModel.jobSeekerProfile(seeker_id,gender,birth_date,resume,profile_image,skills,hobbies,languages,graduation,graduation_university,graduation_year,graduation_cgpa,post_graduation,post_graduation_university,post_graduation_year,post_graduation_cgpa,hsc_year,hsc_marks,ssc_year,ssc_marks);

    promise.then((result)=>{
        if(result.affectedRows>0)
        {
            res.send({msg:"Profile is added"});
        }
        else{
            res.send({msg:"profile is not added something error"});
        }
    });
    promise.catch((err)=>{
        res.send(err);
    });
};

exports.getProfile=(req,res)=>{
    let id=req.params.seekerId;
     jobseekerModel.getProfile(id)
    .then((profile) => {
      if (profile) {
        res.status(200).json(profile[0]);
      } else {
        res.status(404).json({ msg: "Profile not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ msg: "Server error", error: err });
    });
}

// new function to get complete profile
exports.getCompleteProfile=(req,res)=>{
    let id=req.params.seekerId;
     jobseekerModel.getCompleteProfile(id)
    .then((profile) => {
      if (profile) {
        res.status(200).json(profile);
      } else {
        res.status(404).json({ msg: "Profile not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ msg: "Server error", error: err });
    });
}

exports.deletejobSeeker=(req,res)=>{
    let id=req.params.seeker_id;
    let promise=jobseekerModel.deletejobSeeker(id);
    promise.then((result)=>{
        if (result.affectedRows > 0)
        {
            res.send({msg:"job seeker is delete sucessfully"});
        }
        else{
            res.send({msg:"jobseeker not delete somthing error"});
        }
    });
    promise.catch((err)=>{
        res.send(err);
    });
}

// updated to handle all address fields
exports.updateSeeker = (req, res) => {
  let { seeker_id, name, email, phone, address_line1, address_line2, landmark, pincode, state_id, district_id, city_id } = req.body;

  jobseekerModel.updateSeeker(seeker_id, name, email, phone, address_line1, address_line2, landmark, pincode, state_id, district_id, city_id)
    .then((result) => {
      if (result.affectedRows > 0) {
        res.send({ msg: "Profile updated successfully" });
      } else {
        res.status(400).send({ msg: "Profile update failed" });
      }
    })
    .catch((err) => {
      console.error(err); // Optional: log error
      res.status(500).send({ error: err.message });
    });
};







exports.savePersonalInfo = async (req, res) => {
  try {
    const userId = req.user.seeker_id;
    const { 
      name, email, phone, 
      address_line1, address_line2, landmark, pincode, 
      state_id, district_id, city_id,
      gender, birth_date 
    } = req.body;

    console.log("Saving complete personal info for user:", userId, req.body);

    // Update job_seekers table (basic info)
    await jobseekerModel.updateSeeker(
      userId, name, email, phone, 
      address_line1, address_line2, landmark, pincode, 
      state_id, district_id, city_id
    );

    // Update job_seeker_profile table (profile info)
    await jobseekerModel.updateProfileInfo(userId, { gender, birth_date });

    res.json({ success: true, message: "Personal information saved successfully" });
  } catch (err) {
    console.error("Error saving personal info:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.saveEducation = async (req, res) => {
  try {
    const userId = req.user.seeker_id;
    const { degree, university, year } = req.body;

    console.log("Saving education for user:", userId, { degree, university, year });

    await jobseekerModel.updateEducation(userId, { degree, university, year });

    res.json({ success: true, message: "Education saved successfully" });
  } catch (err) {
    console.error("Error saving education:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.saveSkills = async (req, res) => {
  try {
    const userId = req.user.seeker_id;
    const { skills, hobbies, languages } = req.body;

    console.log("Saving skills for user:", userId, { skills, hobbies, languages });

    await jobseekerModel.updateSkills(userId, { skills, hobbies, languages });

    res.json({ success: true, message: "Skills saved successfully" });
  } catch (err) {
    console.error("Error saving skills:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.saveExperience = async (req, res) => {
  try {
    const userId = req.user.seeker_id;
    const { company, role, years } = req.body;

    console.log("Saving experience for user:", userId, { company, role, years });

    await jobseekerModel.updateExperience(userId, { company, role, years });

    res.json({ success: true, message: "Experience saved successfully" });
  } catch (err) {
    console.error("Error saving experience:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};





exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No resume uploaded" });

    const resumePath = req.file.filename;
    const seekerId = req.params.seekerId;

    await jobseekerModel.saveResume(seekerId, resumePath);

    res.json({ success: true, message: "Resume uploaded successfully", resume: resumePath });
  } catch (err) {
    console.error("Resume upload error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Upload Profile Image
exports.uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No profile image uploaded" });

    const profilePath = req.file.filename;
    const seekerId = req.params.seekerId;

    await jobseekerModel.saveProfileImage(seekerId, profilePath);

    res.json({ success: true, message: "Profile image uploaded successfully", profile_image: profilePath });
  } catch (err) {
    console.error("Profile image upload error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Combined Resume and Profile Image Upload
exports.updateJobSeekerProfile = async (req, res) => {
  try {
    const seekerId = req.user.seeker_id; // Get from JWT token
    let result = { success: true, message: "", data: {} };

    // Handle resume upload
    if (req.files && req.files.resume) {
      const resumePath = req.files.resume[0].filename;
      await jobseekerModel.saveResume(seekerId, resumePath);
      result.data.resume = resumePath;
      result.message += "Resume uploaded successfully. ";
    }

    // Handle profile image upload  
    if (req.files && req.files.profile_image) {
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
        c o n s o l e . e r r o r ( " P r o f i l e   u p d a t e   e r r o r : " ,   e r r ) ; 
         r e s . s t a t u s ( 5 0 0 ) . j s o n ( {   s u c c e s s :   f a l s e ,   m e s s a g e :   " S e r v e r   e r r o r "   } ) ; 
     } 
 } ;  
 