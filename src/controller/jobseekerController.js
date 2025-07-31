let jobseekerModel=require("../models/jobseekerModel.js");


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

exports.jobSeekerRegister=(req,res)=>{
    let {name,email,password,phone,address}=req.body;
    
    
    let Promise=jobseekerModel.jobSeekerRegister(name,email,password,phone,address);
    Promise.then((result)=>{
        res.send({msg:"your Registration is successfully"});

    }).catch((err)=>{
        res.send(err);
        
    })
    }

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
}
