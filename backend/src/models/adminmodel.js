let db=require("../config/db.js");
// admin Login
exports.adminLogin = (username,password) => {
   
    return new Promise((resolve, reject) => {
        db.query("select * from admin where username=? AND password=?", [username, password], (err, result) => {
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

// view all job Seeker
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
};



exports.AllHr = () => {
    return new Promise((resolve, reject) => {
        db.query("select * from hr", (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}


// view specific job seeker details 
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
};

// Count functions for dashboard stats
exports.countJobSeekers = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT COUNT(*) as count FROM job_seekers", (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result[0].count);
            }
        });
    });
};

exports.countHRs = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT COUNT(*) as count FROM hr", (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result[0].count);
            }
        });
    });
};

exports.countJobs = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT COUNT(*) as count FROM jobs", (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result[0].count);
            }
        });
    });
};

exports.countPendingApprovals = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT COUNT(*) as count FROM hr WHERE status = 'pending'", (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result[0].count);
            }
        });
    });
};
