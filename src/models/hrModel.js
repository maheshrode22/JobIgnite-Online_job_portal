let db=require("../config/db.js");

exports.hrLoginMod=(hrUser,hrPass)=>{
    
    return new Promise((resolve,reject)=>{
            db.query("select * from hr where email=? AND password=?",[hrUser,hrPass],(err,result)=>{
                if(err)
                {
                    reject(err);
                }
                else
                {if(result.length>0)
                    {
                        resolve(result);

                    }else{
                        reject("invalid login");

                    }

                }
        });
    });
}

exports.hrRegisterMod=(...data)=>{
    
    return new Promise((resolve,reject)=>{
        db.query("insert into hr(hr_name,company_name,email,password,phone) values(?,?,?,?,?)",[...data],(err,result)=>{
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

exports.viewHr=(req,res)=>{

    return new Promise((resolve,reject)=>{
        db.query("select * from hr",(err,result)=>{
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