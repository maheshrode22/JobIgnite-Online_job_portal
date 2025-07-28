let jobseekerModel=require("../models/jobseekerModel");

exports.jobSeeker=(req,res)=>{

    let {jobUser,jobPass}=req.body;
    let promise=jobseekerModel.jobSeekerLogin(jobUser,jobPass);
    promise.then((result)=>{
        res.send({mas:"jobseeker Login"});
    });
    promise.catch((err)=>{
        res.send("job seeker are not register");
    });

}