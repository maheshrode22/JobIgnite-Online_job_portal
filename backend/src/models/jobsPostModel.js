const { resource } = require("../app.js");
let db = require("../config/db.js");
// post all jobs 
exports.createJobs = (hr_id, title, company, opening, experience_required, location,
    package, skills_required, description, deadline) => {
    return new Promise((resolve, reject) => {
        db.query(
            "insert into jobs (hr_id, title, company, opening, experience_required, location, package, skills_required, description, deadline) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [hr_id, title, company, opening, experience_required, location,
                package, skills_required, description, deadline],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
};

// view all posted jobs using desc 
exports.viewallJobPost = (() => {
    return new Promise((resolve, reject) => {
        db.query("select *from jobs order by created_at desc", (err, result) => {
            if (err) {
                reject({msg:"something wrong"});

            } else {
                resolve(result);

            }
        })
    })

});



// deleted job by using id 
exports.deletePost = (id) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM jobs WHERE job_id = ?", [id], (err, result) => {
            if (err){
                reject(err);
            } 
            else{
                resolve(result);
            } 
        });
    });
};


// search job post using title
exports.searchJob=((title)=>{
return new Promise((resolve,reject)=>{
    db.query("select *from jobs where title like ?",[`%${title}%`],(err,result)=>{
        if(err){
            reject(err);

        }else{
            resolve(result);

        }
    })
})
});

// Get job by ID
exports.getJobById = (job_id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM jobs WHERE job_id = ?", [job_id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};


exports.updateJob = (job_id, {
  title,
  company,
  location,
  package,
  opening,
  experience_required,
  skills_required,
  description,
  deadline
}) => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE jobs SET
        title = ?,
        company = ?,
        location = ?,
        package = ?,
        opening = ?,
        experience_required = ?,
        skills_required = ?,
        description = ?,
        deadline = ?
      WHERE job_id = ?
    `;
    db.query(
      sql,
      [
        title,
        company,
        location,
        package,
        opening,
        experience_required,
        skills_required,
        description,
        deadline,
        job_id
      ],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};
