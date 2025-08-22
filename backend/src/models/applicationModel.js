let db = require("../config/db.js");
exports.jobSeekerApply = (seeker_id, job_id) => {
    return new Promise((resolve, reject) => {
        db.query("insert into applications(seeker_id,job_id) values (?,?)", [seeker_id, job_id], (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });

    });
};


exports.trackApplication = (jobseeker_id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `select a.application_id, j.title, j.description, j.created_at, a.status, a.applied_at 
             FROM applications a 
             JOIN jobs j ON a.job_id = j.job_id 
             WHERE a.seeker_id = ? 
             ORDER BY a.applied_at DESC`,
            [jobseeker_id],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
};


exports.viewAllApplicationByHR = (hr_id) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                a.application_id,
                a.applied_at,
                a.status,
                j.job_id,
                j.title AS job_title,
                js.seeker_id,
                js.name AS seeker_name,
                js.email AS seeker_email,
                js.phone AS seeker_phone
            FROM jobs j
            JOIN applications a ON j.job_id = a.job_id
            JOIN job_seekers js ON a.seeker_id = js.seeker_id
            WHERE j.hr_id = ?
            ORDER BY a.applied_at DESC
        `;

        db.query(query, [hr_id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};
