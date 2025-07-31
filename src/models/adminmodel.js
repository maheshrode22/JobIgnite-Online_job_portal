let db=require("../config/db.js");

exports.adminLogin = (adusername,adpassword) => {
   
    return new Promise((resolve, reject) => {
        db.query("select * from admin where username=? AND password=?", [adusername, adpassword], (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                if (result.length > 0) {
                    resolve(result);
                } else {
                    reject("invalid login");   
                }

            }
        });
    });
}


exports.viewAllJobseeker=()=>{
    return new Promise((resolve,reject)=>{
        db.query("select * from job_seekers",(err,result)=>{
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(result);
            }
        });
    });
}


exports.jobseekerDetailed=(id)=>{

    return new Promise((resolve,reject)=>{
        db.query("SELECT js.seeker_id,js.name,js.email,js.phone,js.address,js.created_at,jsp.gender,jsp.dob,jsp.skills,jsp.degree,jsp.university, jsp.cgpa,jsp.hsc_year,jsp.hsc_marks,jsp.ssc_year,jsp.ssc_marks FROM job_seekers js JOIN job_seeker_profile jsp  ON js.seeker_id = jsp.seeker_id WHERE js.seeker_id = ? ",[id],(err,result)=>{
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(result);
            }
        });
    });
}