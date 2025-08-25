let appModel=require("../models/applicationModel.js");
exports.jobSeekerApply=((req,res)=>{
    let{seeker_id,job_id}=req.body;
    let Promise=appModel.jobSeekerApply(seeker_id,job_id);
    Promise.then((result)=>{
        res.send({msg:"apply successfully"})

    }).catch((err)=>{
        res.send("check all details");

    })

});


exports.trackApplicationsBySeeker = (req, res) => {
    const { seeker_id } = req.params;

    appModel.getApplicationsBySeeker(seeker_id)
        .then((result) => {
            if (result.length > 0) {
                res.json(result);
            } else {
                res.json({ msg: "No application data found." });
            }
        })
        .catch((err) => {
            console.error("SQL Error:", err);
            res.status(500).json({ error: err.message || "Something went wrong." });
        });
};



exports.viewAllApplicationByHR=((req,res)=>{
    let { hr_id } = req.body;

    appModel.viewAllApplicationByHR(hr_id)
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