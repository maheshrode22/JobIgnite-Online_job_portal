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
  exports.jobSeekerRegister = (...data) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO job_seekers(name,email,password,phone,address_line1,address_line2,landmark,pincode,state_id,district_id,city_id) VALUES(?,?,?,?,?,?,?,?,?,?,?)", [...data], (err, result) => {
            if (err) {
                reject(err);
            } 
            else {
                resolve(result);
            }
        });
    });
}

  
  // Find by email
  exports.findByEmail = (email) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM job_seekers WHERE email=?",
        [email],
        (err, results) => {
          if (err) reject(err);
          else resolve(results[0]);
        }
      );
    });
  };
// make or create job seeker profile - updated to match your database schema
exports.jobSeekerProfile=(...data)=>{

    return new Promise((resolve,reject)=>{
        db.query("insert into job_seeker_profile(seeker_id,gender,birth_date,resume,profile_image,skills,hobbies,languages,graduation,graduation_university,graduation_year,graduation_cgpa,post_graduation,post_graduation_university,post_graduation_year,post_graduation_cgpa,hsc_year,hsc_marks,ssc_year,ssc_marks) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[...data],(err,result)=>{
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

// get complete profile with join
exports.getCompleteProfile=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query("SELECT js.*, jsp.* FROM job_seekers js LEFT JOIN job_seeker_profile jsp ON js.seeker_id = jsp.seeker_id WHERE js.seeker_id = ?",[id],(err,result)=>{
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(result[0]);
            }
        });
    });
};

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

// update seeker - updated to match your database schema
exports.updateSeeker = (seeker_id, name, email, phone, address_line1, address_line2, landmark, pincode, state_id, district_id, city_id) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE job_seekers SET name=?, email=?, phone=?, address_line1=?, address_line2=?, landmark=?, pincode=?, state_id=?, district_id=?, city_id=? WHERE seeker_id=?";
    db.query(sql, [name, email, phone, address_line1, address_line2, landmark, pincode, state_id, district_id, city_id, seeker_id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};



// update job seeker profile - updated to match your database schema
exports.updateJobSeekerProfile=(seeker_id,gender,birth_date,resume,profile_image,skills,hobbies,languages,graduation,graduation_university,graduation_year,graduation_cgpa,post_graduation,post_graduation_university,post_graduation_year,post_graduation_cgpa,hsc_year,hsc_marks,ssc_year,ssc_marks)=>{
    return new Promise((resolve,reject)=>{
        db.query("update job_seeker_profile set gender=?,birth_date=?,resume=?,profile_image=?,skills=?,hobbies=?,languages=?,graduation=?,graduation_university=?,graduation_year=?,graduation_cgpa=?,post_graduation=?,post_graduation_university=?,post_graduation_year=?,post_graduation_cgpa=?,hsc_year=?,hsc_marks=?,ssc_year=?,ssc_marks=? where seeker_id=?",[gender,birth_date,resume,profile_image,skills,hobbies,languages,graduation,graduation_university,graduation_year,graduation_cgpa,post_graduation,post_graduation_university,post_graduation_year,post_graduation_cgpa,hsc_year,hsc_marks,ssc_year,ssc_marks,seeker_id],(err,result)=>{
            if(err){
                reject(err);

            }else{
                resolve(result);
            }
        })
    });
};


