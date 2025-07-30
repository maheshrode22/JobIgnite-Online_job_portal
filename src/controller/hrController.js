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

exports.updateHr = (req, res) => {
  const { hr_id, hr_name, company_name,  password, phone} = req.body;

  let Promise=hrModel.updateHr(hr_name, company_name,  password, phone, hr_id)
    .then(() => {
      res.send({ msg: "HR profile updated successfully" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ msg: "Update failed", error: err });
    });
};




// exports.deleteHr = (req, res) => {
//     let {hr_name}=req.body;
//     console.log(hr_name);
//     let Promise= hrModel.deleteHr(hr_name);
//         Promise.then((result)=>{
//         res.send(result);
//         }).catch((err)=>{
//         res.send(err);
//     });

// }; 


exports.deleteHr=(req,res)=>{
    let {hr_id}=req.body;
    let Promice=hrModel.deleteHr(hr_id);
    Promice.then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.send(err);
    })

}
