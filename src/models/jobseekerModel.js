let db=require("../config/db.js");

exports.jobSeekerLogin=(jobUser,jobPass)=>{

    return new Promise((resolve,reject)=>{
        db.query("select * from job_seekers where email=? AND password=?",[jobUser,jobPass],(err,result)=>{
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

exports.jobSeekerRegister=((...data)=>{
    return new Promise((resolve,reject)=>{
        db.query("insert into hr(name,email,password,phone,address) values(?,?,?,?,?)",[...data],(err,result)=>{
            if(err){
                reject(err);

            }else{
                resolve(result);

            };
        });
    });
});