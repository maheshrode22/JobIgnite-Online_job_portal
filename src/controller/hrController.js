let hrModel=require("../models/hrModel.js");


exports.hrLogin=(req,res)=>{
    
    let {hrUser,hrPass}=req.body;
    let promise=hrModel.hrLoginMod(hrUser,hrPass);
    promise.then((result)=>{
         
        if(result>0)
            {
                res.send({msg:"HR login succesfully"});
            }else{
                res.send({msg:"HR login faild"});

            }
    });
    promise.catch((err)=>{
        res.send({msg:"login fail"});
    });
}

