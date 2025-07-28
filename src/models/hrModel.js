let db=require("../config/db.js");

exports.hrLoginMod=(hrUser,hrPass)=>{
    
    return new Promise((resolve,reject)=>{
            db.query("select * from hr where email=? AND password=?",[hrUser,hrPass],(err,result)=>{
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