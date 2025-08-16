let adminModel = require("../models/adminmodel.js");

exports.adminLogin = (req, res) => {
    let { adusername, adpassword } = req.body;

    let Promise = adminModel.adminLogin(adusername, adpassword);

    Promise.then((result)=>{
            if(result.length>0){
                res.send({msg:"admin login succesfully"});
            }
            else{
                res.send({msg:"login fail"});
            }
    }).catch((err)=>{
       res.send(err);
        });
}


exports.viewAllJobseeker=(req,res)=>{
        
    let promise =adminModel.viewAllJobseeker();
    promise.then((result)=>{
        res.send(result);
    });
    promise.catch((err)=>{
        res.send(err);
    });

}


exports.jobseekerDetailed=(req,res)=>{

        let id=req.body.id;
        let promise=adminModel.jobseekerDetailed(id);
        
        promise.then((result)=>{
            res.send(result);
        });
        promise.catch((err)=>{
            res.send(err);
        });
}
