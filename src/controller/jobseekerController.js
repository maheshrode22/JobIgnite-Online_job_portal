let jobseekerModel=require("../models/jobseekerModel");

exports.jobSeeker=(req,res)=>{

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