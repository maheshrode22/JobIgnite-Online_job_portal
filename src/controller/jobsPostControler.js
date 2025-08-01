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





exports.deletePost=(req,res)=>{
    let {id}=req.body;
        let promise=jobPostModel.deletePost(id);
        promise.then((result)=>{
            if (result.affectedRows > 0){
                res.send({msg:"delete suceesfull"});
            }
            else{
                res.send({msg:"not delee somting error /id not found"});
            }
        }).catch((err)=>{
            res.send("error"+err);
        })
}


exports.searchJob=(req,res)=>{
    let {title}=req.body;

    let Promise=jobPostModel.searchJob(title)
    .then((result)=>{
        res.send(result);
    }).catch(()=>{
        res.send("something error"+err);
    })
}