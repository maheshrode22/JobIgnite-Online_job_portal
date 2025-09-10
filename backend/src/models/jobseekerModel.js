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
        db.query("insert into job_seeker_profile(seeker_id,gender,birth_date,resume,profile_image,skills,hobbies,languages,graduation,graduation_university,graduation_year,graduation_cgpa,post_graduation,post_graduation_university,post_graduation_year,post_graduation_cgpa,hsc_year,hsc_marks,ssc_year,ssc_marks) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[...data],(err,result)=>{
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

// update seeker - updated to match your database schema with proper data type handling
exports.updateSeeker = (seeker_id, name, email, phone, address_line1, address_line2, landmark, pincode, state_id, district_id, city_id) => {
  return new Promise((resolve, reject) => {
    // Convert pincode to integer if it's a string
    const pincodeInt = pincode ? parseInt(pincode) : null;
    const stateIdInt = state_id ? parseInt(state_id) : null;
    const districtIdInt = district_id ? parseInt(district_id) : null;
    const cityIdInt = city_id ? parseInt(city_id) : null;
    
    console.log("Updating seeker with converted data types:", {
      seeker_id, name, email, phone, address_line1, address_line2, landmark,
      pincode: pincodeInt, state_id: stateIdInt, district_id: districtIdInt, city_id: cityIdInt
    });
    
    const sql = "UPDATE job_seekers SET name=?, email=?, phone=?, address_line1=?, address_line2=?, landmark=?, pincode=?, state_id=?, district_id=?, city_id=? WHERE seeker_id=?";
    db.query(sql, [name, email, phone, address_line1, address_line2, landmark, pincodeInt, stateIdInt, districtIdInt, cityIdInt, seeker_id], (err, result) => {
      if (err) {
        console.error("Error updating seeker:", err);
        reject(err);
      } else {
        console.log("Seeker updated successfully:", result);
        resolve(result);
      }
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





// Personal Info update - updates job_seekers table
exports.updatePersonalInfo = (userId, { name, email, phone }) => {
    return new Promise((resolve, reject) => {
      console.log("=== DEBUGGING MODEL UPDATE ===");
      console.log("Updating personal info in job_seekers table:");
      console.log("userId:", userId, "type:", typeof userId);
      console.log("Data:", { name, email, phone });
      
      // First, check if user exists
      db.query(
        "SELECT * FROM job_seekers WHERE seeker_id = ?",
        [userId],
        (err, userResult) => {
          if (err) {
            console.error("Error checking user existence:", err);
            reject(err);
          } else if (userResult.length === 0) {
            console.error("User not found with seeker_id:", userId);
            console.log("Available users in database:");
            // Let's see what users exist
            db.query("SELECT seeker_id, name, email FROM job_seekers LIMIT 5", (err, allUsers) => {
              if (!err) {
                console.log("Sample users:", allUsers);
              }
            });
            reject(new Error("User not found"));
          } else {
            console.log("User found:", userResult[0]);
            
            // Now update the user
            db.query(
              "UPDATE job_seekers SET name=?, email=?, phone=? WHERE seeker_id=?",
              [name, email, phone, userId],
              (err, result) => {
                if (err) {
                  console.error("Error updating personal info:", err);
                  reject(err);
                } else {
                  console.log("Personal info updated successfully:", result);
                  console.log("Rows affected:", result.affectedRows);
                  if (result.affectedRows === 0) {
                    console.error("No rows were updated! User might not exist.");
                  }
                  resolve(result);
                }
              }
            );
          }
        }
      );
    });
  };
  
  // Education update - updates job_seeker_profile table
  exports.updateEducation = (userId, { degree, university, year }) => {
    return new Promise((resolve, reject) => {
      console.log("Updating education in job_seeker_profile table:", userId, { degree, university, year });
      
      db.query(
        "UPDATE job_seeker_profile SET graduation=?, graduation_university=?, graduation_year=? WHERE seeker_id=?",
        [degree, university, year, userId],
        (err, result) => {
          if (err) {
            console.error("Error updating education:", err);
            reject(err);
          } else {
            console.log("Education updated successfully:", result);
            resolve(result);
          }
        }
      );
    });
  };
  
  // Skills update - updates job_seeker_profile table
  exports.updateSkills = (userId, { skills, hobbies, languages }) => {
    return new Promise((resolve, reject) => {
      console.log("Updating skills in job_seeker_profile table:", userId, { skills, hobbies, languages });
      
      db.query(
        "UPDATE job_seeker_profile SET skills=?, hobbies=?, languages=? WHERE seeker_id=?",
        [skills, hobbies, languages, userId],
        (err, result) => {
          if (err) {
            console.error("Error updating skills:", err);
            reject(err);
          } else {
            console.log("Skills updated successfully:", result);
            resolve(result);
          }
        }
      );
    });
  };
  
  // Experience update - updates job_seeker_profile table
  exports.updateExperience = (userId, { company, role, years }) => {
    return new Promise((resolve, reject) => {
      console.log("Updating experience in job_seeker_profile table:", userId, { company, role, years });
      
      // First, check if profile exists
      db.query(
        "SELECT * FROM job_seeker_profile WHERE seeker_id = ?",
        [userId],
        (err, result) => {
          if (err) {
            console.error("Error checking profile:", err);
            reject(err);
          } else if (result.length === 0) {
            // Create profile if it doesn't exist
            console.log("Profile doesn't exist, creating new one...");
            db.query(
              "INSERT INTO job_seeker_profile (seeker_id, skills, hobbies, languages, company, job_role, experience_years) VALUES (?, '', '', '', ?, ?, ?)",
              [userId, company, role, years],
              (err, insertResult) => {
                if (err) {
                  console.error("Error creating profile:", err);
                  reject(err);
                } else {
                  console.log("Profile created and experience saved:", insertResult);
                  resolve(insertResult);
                }
              }
            );
          } else {
            // Profile exists, update experience fields
            console.log("Profile exists, updating experience...");
            db.query(
              "UPDATE job_seeker_profile SET company=?, job_role=?, experience_years=? WHERE seeker_id=?",
              [company, role, years, userId],
              (err, result) => {
                if (err) {
                  console.error("Error updating experience:", err);
                  reject(err);
                } else {
                  console.log("Experience updated successfully:", result);
                  resolve(result);
                }
              }
            );
          }
        }
      );
    });
  };

// Update profile info (gender, birth_date) in job_seeker_profile table
exports.updateProfileInfo = (userId, { gender, birth_date }) => {
    return new Promise((resolve, reject) => {
      console.log("Updating profile info:", userId, { gender, birth_date });
      
      // Convert gender to integer if it's a string
      const genderInt = gender ? parseInt(gender) : null;
      
      // First, check if profile exists
      db.query(
        "SELECT * FROM job_seeker_profile WHERE seeker_id = ?",
        [userId],
        (err, result) => {
          if (err) {
            console.error("Error checking profile:", err);
            reject(err);
          } else if (result.length === 0) {
            // Create profile if it doesn't exist
            console.log("Profile doesn't exist, creating new one...");
            db.query(
              "INSERT INTO job_seeker_profile (seeker_id, gender, birth_date) VALUES (?, ?, ?)",
              [userId, genderInt, birth_date],
              (err, insertResult) => {
                if (err) {
                  console.error("Error creating profile:", err);
                  reject(err);
                } else {
                  console.log("Profile created successfully:", insertResult);
                  resolve(insertResult);
                }
              }
            );
          } else {
            // Profile exists, update it
            console.log("Profile exists, updating...");
            db.query(
              "UPDATE job_seeker_profile SET gender=?, birth_date=? WHERE seeker_id=?",
              [genderInt, birth_date, userId],
              (err, result) => {
                if (err) {
                  console.error("Error updating profile:", err);
                  reject(err);
                } else {
                  console.log("Profile updated successfully:", result);
                  resolve(result);
                }
              }
            );
          }
        }
      );
    });
  };

// Update complete education info with proper data type handling
exports.updateCompleteEducation = (userId, educationData) => {
    return new Promise((resolve, reject) => {
      console.log("Updating complete education:", userId, educationData);
      
      const {
        degree, university, year, cgpa,
        post_degree, post_university, post_year, post_cgpa,
        hsc_year, hsc_marks, ssc_year, ssc_marks
      } = educationData;
      
      // Convert years to integers and marks to decimals
      const graduationYear = year ? parseInt(year) : null;
      const postGraduationYear = post_year ? parseInt(post_year) : null;
      const hscYear = hsc_year ? parseInt(hsc_year) : null;
      const sscYear = ssc_year ? parseInt(ssc_year) : null;
      
      const graduationCgpa = cgpa ? parseFloat(cgpa) : null;
      const postGraduationCgpa = post_cgpa ? parseFloat(post_cgpa) : null;
      const hscMarks = hsc_marks ? parseFloat(hsc_marks) : null;
      const sscMarks = ssc_marks ? parseFloat(ssc_marks) : null;
      
      console.log("Converted education data:", {
        degree, university, graduationYear, graduationCgpa,
        post_degree, post_university, postGraduationYear, postGraduationCgpa,
        hscYear, hscMarks, sscYear, sscMarks
      });
      
      // First, check if profile exists
      db.query(
        "SELECT * FROM job_seeker_profile WHERE seeker_id = ?",
        [userId],
        (err, result) => {
          if (err) {
            console.error("Error checking profile:", err);
            reject(err);
          } else if (result.length === 0) {
            // Create profile if it doesn't exist
            console.log("Profile doesn't exist, creating new one...");
            db.query(
              "INSERT INTO job_seeker_profile (seeker_id, graduation, graduation_university, graduation_year, graduation_cgpa, post_graduation, post_graduation_university, post_graduation_year, post_graduation_cgpa, hsc_year, hsc_marks, ssc_year, ssc_marks) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
              [userId, degree, university, graduationYear, graduationCgpa, post_degree, post_university, postGraduationYear, postGraduationCgpa, hscYear, hscMarks, sscYear, sscMarks],
              (err, insertResult) => {
                if (err) {
                  console.error("Error creating profile:", err);
                  reject(err);
                } else {
                  console.log("Profile created with education:", insertResult);
                  resolve(insertResult);
                }
              }
            );
          } else {
            // Profile exists, update education
            console.log("Profile exists, updating education...");
            db.query(
              "UPDATE job_seeker_profile SET graduation=?, graduation_university=?, graduation_year=?, graduation_cgpa=?, post_graduation=?, post_graduation_university=?, post_graduation_year=?, post_graduation_cgpa=?, hsc_year=?, hsc_marks=?, ssc_year=?, ssc_marks=? WHERE seeker_id=?",
              [degree, university, graduationYear, graduationCgpa, post_degree, post_university, postGraduationYear, postGraduationCgpa, hscYear, hscMarks, sscYear, sscMarks, userId],
              (err, result) => {
                if (err) {
                  console.error("Error updating education:", err);
                  reject(err);
                } else {
                  console.log("Education updated successfully:", result);
                  resolve(result);
                }
              }
            );
          }
        }
      );
    });
  };