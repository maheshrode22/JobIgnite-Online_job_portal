let appModel = require("../models/applicationModel.js");
let jobseekerModel = require("../models/jobseekerModel.js");

exports.jobSeekerApply = async (req, res) => {
    try {
        const { seeker_id, job_id } = req.body;
        
        // Check if user has uploaded resume
        const profile = await jobseekerModel.getCompleteProfile(seeker_id);
        
        if (!profile || !profile.resume || profile.resume.trim() === '') {
            return res.status(400).json({
                success: false,
                msg: "Please upload your resume before applying for jobs"
            });
        }
        
        // Check if already applied
        const existingApplication = await appModel.checkExistingApplication(seeker_id, job_id);
        if (existingApplication) {
            return res.status(400).json({
                success: false,
                msg: "You have already applied for this job"
            });
        }
        
        // Proceed with application
        const result = await appModel.jobSeekerApply(seeker_id, job_id);
        
        res.json({
            success: true,
            msg: "Application submitted successfully"
        });
        
    } catch (err) {
        console.error("Application error:", err);
        res.status(500).json({
            success: false,
            msg: "Failed to submit application. Please try again."
        });
    }
};


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