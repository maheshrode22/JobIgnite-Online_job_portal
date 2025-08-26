let adminModel = require("../models/adminmodel.js");
const jwt = require("jsonwebtoken");
const Secret_key= "its_mySecrate_Key";

exports.adminLogin = (req, res) => {
    let { username, password } = req.body;

    adminModel.adminLogin(username, password)
        .then((result) => {
            if (result.length > 0) {
                const token = jwt.sign(
                    { username: result[0].username },
                    Secret_key,
                    { expiresIn: "1h" }
                );
                res.json({
                    msg: "Admin Login Successful",
                    token: token,
                    admin: result[0]
                });
            } else {
                return res.status(401).json({ message: "Invalid credentials" });
            }
        })
        .catch(() => {
            return res.status(401).json({ message: "Invalid credentials" });
        });
};


exports.AllHr = (req, res) => {
    let promise = adminModel.AllHr();

    promise.then((result) => {
        res.send(result);
    });
    promise.catch((err) => {
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


exports.viewAllJobseeker = (req,res) => {
  
    adminModel.viewAllJobseeker()
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: err }));
};