let adminModel=require("../models/adminmodel.js");

exports.adminLogin=((req,res)=>{
    let {adusername,adpassword}=req.body;

    let Promise=adminModel.adminLogin(adusername,adpassword);

    Promise.then((result)=>{
      
         
        
                res.send({msg:"admin login succesfully"});
         

    }).catch((err)=>{
        res.send({msg:"login fail"});
    })
});