let db = require("../config/db.js");
// hr Login
exports.hrLoginMod = (hrUser, hrPass) => {

    return new Promise((resolve, reject) => {
        db.query("select * from hr where email=? AND password=?", [hrUser, hrPass], (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                if (result.length > 0) {
                    resolve(result);

                } else {
                    reject("invalid login");

                }

            }
        });
    });
}
// register Hr 
exports.hrRegisterMod = (...data) => {

    return new Promise((resolve, reject) => {
        db.query("insert into hr(hr_name,company_name,email,password,phone) values(?,?,?,?,?)", [...data], (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}
// view alll hr list
exports.viewHr = () => {

    return new Promise((resolve, reject) => {
        db.query("select * from hr", (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}

// update hr details
exports.updateHr = (hr_name, company_name, password, phone, hr_id) => {
    return new Promise((resolve, reject) => {
        db.query(
            "UPDATE hr SET hr_name=?, company_name=?,  password=?, phone=? WHERE hr_id=?",
            [hr_name, company_name, password, phone, hr_id],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }
        );
    });
};
// delete hr account 
exports.deleteHr = (id) => {
    return new Promise((resolve, reject) => {
        db.query("delete from hr where hr_id=?", [id], (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        })
    })
}

// update hr status 
exports.updateStatusHr = (id, status) => {
    return new Promise((resolve, reject) => {
        db.query("update hr set status=? where hr_id=?", [status, id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);

            }
        })
    })
};
