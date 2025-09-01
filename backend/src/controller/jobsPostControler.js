let jobPostModel = require("../models/jobsPostModel");

exports.createJobs = (req, res) => {
    let {hr_id, title, company, opening, experience_required, location,
         package, skills_required, description, deadline} = req.body;

    let promise = jobPostModel.createJobs(hr_id, title, company,
         opening, experience_required, location, package, skills_required, description, deadline);
    
         promise.then((result) => {
            res.json({ msg: "Job posted successfully" });
        }).catch((err) => {
            res.status(500).json({ msg: "Error posting job", error: err });
        });
        
};


exports.viewallJobPost=((req,res)=>{
    let Promise=jobPostModel.viewallJobPost()
    .then((result)=>{
        res.send(result);

    }).catch((err)=>{
        res.send(err);

    })
});






exports.deletePost=(req,res)=>{
    let {id}=req.body;
        let promise=jobPostModel.deletePost(id);
        promise.then((result)=>{
            if (result.affectedRows > 0){
                res.send({msg:"delete suceesfull"});
            }
            else{
                res.send({ msg: "Deletion failed: ID not found or invalid." });

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
    }).catch((err)=>{
        res.send("something error"+err);
    })
};


exports.updateJobById = async (req, res) => {
  const job_id = req.params.id;
  const data = req.body;

  try {
    const result = await jobPostModel.updateJob(job_id, data);
    if (result.affectedRows === 0) return res.status(404).json({ msg: "Job not found" });
    res.json({ msg: "Job updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Database error" });
  }
};

// Get job by ID
exports.getJobById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await jobPostModel.getJobById(id);
    if (result.length === 0) return res.status(404).json({ msg: "Job not found" });
    res.json({ job: result[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Database error" });
  }
};

