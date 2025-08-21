let jobseekerModel=require("../models/jobseekerModel.js");
const { sendMail } = require("../Services/mailService.js");
const { registrationTemplate } = require("../Services/mailTemplates.js");


exports.jobSeekerLogin=(req,res)=>{
    let {jobUser,jobPass}=req.body;
    
    let promise=jobseekerModel.jobSeekerLogin(jobUser,jobPass);
    promise.then((result)=>{
        if(result.length>0){
            res.send({msg:"jobseeker Login"});
        }
        else{
            res.send({msg:"job seeker are not register"});
        }
    });
    promise.catch((err)=>{
        res.send(err);
    });
}

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


exports.deletejobSeeker=(req,res)=>{
    let id=req.body.id;
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

exports.updateJobSeekerPrfile=(req,res)=>{
    let {seeker_id,gender,dob,skills,degree,university,cgpa,hsc_year,hsc_marks,ssc_year,ssc_marks}=req.body;
    
   let promise= jobseekerModel.updateJobSeekerPrfile(seeker_id,gender,dob,skills,degree,university,cgpa,hsc_year,hsc_marks,ssc_year,ssc_marks)
   .then((result)=>{
        if(result.affectedRows>0)
        {
            res.send({msg:"Profile is update"});
        }
        else{
            res.send({msg:"profile is not added something error"});
        }
    }).catch((err)=>{
        res.send(err);
    });
};
