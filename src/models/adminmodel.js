let db=require("../config/db.js");
exports.adminLogin = (adusername,adpassword) => {
   
  return new Promise((resolve, reject) => {
    db.query("select * from admin where username=? AND password=?", [adusername, adpassword], (err, result) => {
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
  };
  