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

// updated to handle all profile fields
exports.updateJobSeekerProfile = (req, res) => {
    let { seeker_id, gender, birth_date, resume, profile_image, skills, hobbies, languages, graduation, graduation_university, graduation_year, graduation_cgpa, post_graduation, post_graduation_university, post_graduation_year, post_graduation_cgpa, hsc_year, hsc_marks, ssc_year, ssc_marks } = req.body;

    jobseekerModel.updateJobSeekerProfile(seeker_id, gender, birth_date, resume, profile_image, skills, hobbies, languages, graduation, graduation_university, graduation_year, graduation_cgpa, post_graduation, post_graduation_university, post_graduation_year, post_graduation_cgpa, hsc_year, hsc_marks, ssc_year, ssc_marks)
    .then((result) => {
        if (result.affectedRows > 0) {
            res.send({ msg: "Profile updated successfully" });
        } else {
            res.status(400).send({ msg: "Profile update failed" });
        }
    })
    .catch((err) => {
        res.status(500).send({ error: err.message });
    });
};


