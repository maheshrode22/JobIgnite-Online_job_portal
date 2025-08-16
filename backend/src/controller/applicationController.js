let appModdel=require("../models/applicationModel.js");
exports.jobSeekerApply=((req,res)=>{
    let{seeker_id,job_id}=req.body;
    let Promise=appModdel.jobSeekerApply(seeker_id,job_id);
    Promise.then((result)=>{
        res.send({msg:"apply successfully"})

    }).catch((err)=>{
        res.send("check all details");

    })

});


exports.trackApplication = (req, res) => {
    let { jobseeker_id } = req.body;

    appModdel.trackApplication(jobseeker_id)
        .then((result) => {
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ msg: "No application data found." });
            }
        })
        .catch((err) => {
            res.status(500).send({ error: err.message || "Something went wrong." });
        });
};



exports.viewAllApplicationByHR=((req,res)=>{
    let { hr_id } = req.body;

    appModdel.viewAllApplicationByHR(hr_id)
        .then((result) => {
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ msg: "No application data found." });
            }
        })
        .catch((err) => {
            res.status(500).send({ error: err.message || "Something went wrong." });
        });
})