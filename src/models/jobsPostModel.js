const { resource } = require("../app.js");
let db = require("../config/db.js");

exports.createJobs = (...data) => {
    return new Promise((resolve, reject) => {
        db.query(
            "insert into jobs (hr_id, title, company, opening, experience_required, location, package, skills_required, description, deadline) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [...data],
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

exports.viewallJobPost = (() => {
    return new Promise((resolve, reject) => {
        db.query("select *from jobs", (err, result) => {
            if (err) {
                reject({msg:"something wrong"});

            } else {
                resolve(result);

            }
        })
    })
})




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



exports.searchJob=(title)=>{
return new Promise((resolve,reject)=>{
    db.query("select *from jobs where title like ?",[`%${title}%`],(err,result)=>{
        if(err){
            reject(err);

        }else{
            resolve(result);

        }
    })
})
}