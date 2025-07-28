let hrModel=require("../models/hrModel.js");


exports.hrLogin=(req,res)=>{
    
    let {hrUser,hrPass}=req.body;
    let promise=hrModel.hrLoginMod(hrUser,hrPass);
    promise.then((result)=>{
        
        res.send({msg:"hr login success"});
    });
    promise.catch((err)=>{
        res.send({msg:"login fail"});
    });
}