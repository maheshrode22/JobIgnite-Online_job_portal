let jobPostModel = require("../models/jobsPostModel");

exports.createJobs = (req, res) => {
    let { hr_id, title, company, opening, experience_required, location,
         package, skills_required, description, deadline } = req.body;

    let promise = jobPostModel.createJobs(hr_id, title, company,
         opening, experience_required, location, package, skills_required, description, deadline);
    

    promise.then((result) => {
        res.send({ msg: "Job posted successfully" });
    }).catch((err) => {
        res.send(err);
    });
};


exports.viewallJobPost=((req,res)=>{
    let Promise=jobPostModel.viewallJobPost()
    .then((result)=>{
        res.send(result);

    }).catch((err)=>{
        res.send(err);

    })
})
