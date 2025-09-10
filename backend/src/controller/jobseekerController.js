let jobseekerModel=require("../models/jobseekerModel.js");
const { sendMail } = require("../Services/mailService.js");
const { registrationTemplate } = require("../Services/mailTemplates.js");
const jwt = require("jsonwebtoken");


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

exports.jobSeekerRegister = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        const result = await jobseekerModel.jobSeekerRegister(name, email, password, phone, address);

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

