let db = require("../config/db.js");
// jobSeekerModel.js
exports.jobSeekerLogin = (jobUser) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM job_seekers WHERE email=?",
        [jobUser],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  };

  
//register job seeker
exports.jobSeekerRegister = (...data) => {
    return new Promise((resolve, reject) => {
        db.query("insert into job_seekers(name,email,password,phone,address) values(?,?,?,?,?)", [...data], (err, result) => {
            if (err) {
                reject(err);
            } 
            else {
                resolve(result);
            }
        });
    });
}




// Find user by email
exports.findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM job_seekers WHERE email = ?",
            [email],
            (err, results) => {
                if (err) reject(err);
                else resolve(results[0]);
            }
        );
    });
};

// make or  create job seeker profile
exports.jobSeekerProfile=(...data)=>{

    return new Promise((resolve,reject)=>{
        db.query("insert into job_seeker_profile(seeker_id,gender,dob,skills,degree,university,cgpa,hsc_year,hsc_marks,ssc_year,ssc_marks) values(?,?,?,?,?,?,?,?,?,?,?)",[...data],(err,result)=>{
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

exports.getProfile=(id)=>{
    return new Promise((resolve,reject)=>{
         db.query("SELECT * FROM job_seeker_profile WHERE seeker_id = ?",[id],(err,result)=>{
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

// delete job seeker profile
exports.deletejobSeeker=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query("delete from job_seekers where seeker_id=?",[id],(err,result)=>{
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

exports.updateSeeker = (seeker_id, name, email, phone, address) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE job_seekers SET name=?, email=?, phone=?, address=? WHERE seeker_id=?";
    db.query(sql, [name, email, phone, address, seeker_id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};



// update job seeker profile
exports.updateJobSeekerProfile=(seeker_id,gender,dob,skills,degree,university,cgpa,hsc_year,hsc_marks,ssc_year,ssc_marks)=>{
    return new Promise((resolve,reject)=>{
        db.query("update job_seeker_profile set gender=?,dob=?,skills=?,degree=?,university=?,cgpa=?,hsc_year=?,hsc_marks=?,ssc_year=?,ssc_marks=? where seeker_id=?",[gender,dob,skills,degree,university,cgpa,hsc_year,hsc_marks,ssc_year,ssc_marks,seeker_id],(err,result)=>{
            if(err){
                reject(err);

            }else{
                resolve(result);
            }
        })
    });
};
