let db = require("../config/db.js");

// Email ने HR fetch
exports.hrFindByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT hr_id, hr_name, company_name, email, password, phone, status FROM hr WHERE email = ? LIMIT 1",
      [email],
      (err, result) => (err ? reject(err) : resolve(result))
    );
  });
};

// ID ने HR fetch
exports.hrFindById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT hr_id, hr_name, company_name, email, phone, status FROM hr WHERE hr_id = ? LIMIT 1",
      [id],
      (err, result) => (err ? reject(err) : resolve(result))
    );
  });
};

// Password update (plaintext -> hash migration)
exports.hrUpdatePassword = (hr_id, newHash) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE hr SET password = ? WHERE hr_id = ?",
      [newHash, hr_id],
      (err, result) => (err ? reject(err) : resolve(result))
    );
  });
};

// Register (unchanged signature)
exports.hrRegisterMod = (...data) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO hr(hr_name,company_name,email,password,phone) VALUES(?,?,?,?,?)",
      [...data],
      (err, result) => (err ? reject(err) : resolve(result))
    );
  });
};

  //*********************************************************************************************************** */
  
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


exports.viewAllPostHrById=(hr_id)=>{
    return new Promise((resolve, reject) => {
        db.query("select *from jobs where hr_id=?",[hr_id],(err,result)=>{
            if (err) {
                reject(err);
            } else {
                resolve(result);

            }
        })
    })
}