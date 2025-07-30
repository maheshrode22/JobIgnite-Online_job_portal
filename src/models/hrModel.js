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
exports.updateHr = (hr_name, company_name,  password, phone,hr_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE hr SET hr_name=?, company_name=?,  password=?, phone=? WHERE hr_id=?",
        [hr_name, company_name, password, phone,  hr_id],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  };
  

//   exports.deleteHr=((hr_name)=>{
//     return new Promise((resolve,reject)=>{
//         db.query("delete from hr where hr_name=?",[hr_name],(err,result)=>{
//             if(err){
//                 reject(err);

//             }else{
//                 resolve(result);

//             }
//         })
//     })

//   })


exports.deleteHr=(hr_id)=>{
    return new Promise((resolve ,reject)=>{
        db.query("delete from hr where hr_id=?",[hr_id],(err, result)=>{
            if(err)
            {
                 reject("Hr Not Deleted...");
            }
            else{
             resolve("HR DELETE SuccessFully.........");
            }
        })
    })
}