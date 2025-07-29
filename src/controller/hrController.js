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

exports.hrRegister=(req,res)=>{
    let {name,company,email,password,phone}=req.body;

    let promise=hrModel.hrRegisterMod(name,company,email,password,phone);

    promise.then((result)=>{
        res.send({msg:"wait for hr aprover"});
    });
    promise.catch=((err)=>{
        res.send({msg:"registation fail"});
    });
}

exports.AllHr=(req,res)=>{
    let promise=hrModel.viewHr();

    promise.then((result)=>{
        res.send(result);
    });
    promise.catch((err)=>{
        res.send(err);
    });
}

