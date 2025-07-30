let db=require("../config/db.js");
exports.updateHr = (hr_name, company_name, email, password, phone, status, hr_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "update hr SET hr_name=?, company_name=?, email=?, password=?, phone=?, status=? WHERE hr_id=?",
        [hr_name, company_name, email, password, phone, status, hr_id],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  };
  