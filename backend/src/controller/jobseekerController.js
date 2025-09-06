let jobseekerModel = require("../models/jobseekerModel.js");
const { sendMail } = require("../Services/mailService.js");
const { registrationTemplate } = require("../Services/mailTemplates.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// exports.loginJobSeeker = async (req, res) => {
//   const { jobUser, jobPass } = req.body;

//   try {
//     const result = await jobseekerModel.jobSeekerLogin(jobUser);

//     if (result.length === 0) {
//       return res.status(401).json({ success: false, message: "Invalid credentials" });
//     }

//     const user = result[0];

//     // bcrypt compare
//     const isMatch = await bcrypt.compare(jobPass, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ success: false, message: "Invalid credentials" });
//     }

//     // Generate JWT with complete user data
//     const token = jwt.sign(
//       { 
//         id: user.seeker_id, 
//         name: user.name,
//         email: user.email, 
//         phone: user.phone,
//         address: user.address,
//         role: "jobseeker",
//         createdAt: user.created_at || new Date()
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "15m" }
//     );

//     res.json({
//       success: true,
//       token
    
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };




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
        ...safeUser,   // ✅ DB मधलं complete user data (password सोडून बाकी सगळं)
        role: "jobseeker"
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({
      success: true,
      token,
      user: safeUser   // ✅ हवं असेल तर frontend direct use करू शकेल
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};




exports.jobSeekerRegister = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        // check user already exists
        const existingUser = await jobseekerModel.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ msg: "Email already registered" });
        }

        // password hash
        const hashedPassword = await bcrypt.hash(password, 10);

        await jobseekerModel.jobSeekerRegister(
            name,
            email,
            hashedPassword,
            phone,
            address
        );

        res.status(201).json({ msg: "Registration successful" });
    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ msg: "Registration failed", error: err });
    }
};

exports.jobSeekerProfile=(req,res)=>{
    let {seeker_id,gender,dob,skills,degree,university,cgpa,hsc_year,hsc_marks,ssc_year,ssc_marks}=req.body;

    let promise=jobseekerModel.jobSeekerProfile(seeker_id,gender,dob,skills,degree,university,cgpa,hsc_year,hsc_marks,ssc_year,ssc_marks);

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
exports.updateSeeker = (req, res) => {
  let { seeker_id, name, email, phone, address } = req.body;

  jobseekerModel.updateSeeker(seeker_id, name, email, phone, address)
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



exports.updateJobSeekerProfile = (req, res) => {
    let { seeker_id, gender, dob, skills, degree, university, cgpa, hsc_year, hsc_marks, ssc_year, ssc_marks } = req.body;

    jobseekerModel.updateJobSeekerProfile(seeker_id, gender, dob, skills, degree, university, cgpa, hsc_year, hsc_marks, ssc_year, ssc_marks )
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

