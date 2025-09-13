const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const hrModel = require("../models/hrModel.js");
const { sendMail } = require("../Services/mailService");
const { registrationTemplate } = require("../Services/mailTemplates.js");
const { approvalTemplate } = require("../Services/approvalTemplate.js");
const { rejectionTemplate } = require("../Services/rejectionTemplate.js");
const { validateHRData } = require("../validation/hrValidation/hrValidation.js");

const signToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
  });

const sanitize = (row) => ({
  hr_id: row.hr_id,
  hr_name: row.hr_name,
  company_name: row.company_name,
  email: row.email,
  phone: row.phone,
  status: row.status,
});
console.log(sanitize);

// LOGIN (email + password) with auto-migration to hash
exports.hrLogin = async (req, res) => {
  try {
    const { hrUser, hrPass } = req.body;
    if (!hrUser || !hrPass)
      return res.status(400).send({ success: false, msg: "Email & password required" });

    const rows = await hrModel.hrFindByEmail(hrUser);
    if (!rows || rows.length === 0)
      return res.status(401).send({ success: false, msg: "Invalid email or password" });

    const user = rows[0];
    
    // Check if HR account is approved
    if (user.status === "pending") {
      return res.status(403).send({ 
        success: false, 
        msg: "Your account is pending approval. Please wait for admin approval before logging in." 
      });
    }
    
    if (user.status === "rejected") {
      return res.status(403).send({ 
        success: false, 
        msg: "Your account has been rejected. Please contact admin for more information." 
      });
    }

    const dbPwd = user.password || "";
    let ok = false;

    if (dbPwd.startsWith("$2")) {
      ok = await bcrypt.compare(hrPass, dbPwd);
    } else {
      ok = hrPass === dbPwd;
      if (ok) {
        const newHash = await bcrypt.hash(hrPass, 10);
        await hrModel.hrUpdatePassword(user.hr_id, newHash);
      }
    }

    if (!ok)
      return res.status(401).send({ success: false, msg: "Invalid email or password" });

    // Sign token with HR info
    const payload = {
      id: user.hr_id,
      role: "HR",
      name: user.hr_name,   
      email: user.email,
      phone:user.phone,
      company_name:user.company_name,
      status:user.status,

    };

    const token = signToken(payload);

    return res.status(200).send({
      success: true,
      msg: "HR login successfully",
      token,
      user: sanitize(user),
    });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).send({ success: false, msg: "Server error" });
  }
};

// REGISTER (hash password) + optional token + mail
exports.hrRegister = async (req, res) => {
  try {
    const { name, company, email, password, phone } = req.body;

   const validationMsg = validateHRData({ name, company, email, password, phone });
      if (validationMsg) {
      return res.status(400).send({ success: false, message: validationMsg });
  }

    const exists = await hrModel.hrFindByEmail(email);
    if (exists && exists.length > 0)
      return res.status(409).send({ success: false, message: "Email already in use" });

    const hashed = await bcrypt.hash(password, 10);
    const result = await hrModel.hrRegisterMod(name, company, email, hashed, phone);

    const token = signToken({ id: result.insertId, role: "HR" });

    res.status(201).send({
      success: true,
      message: "Wait for HR approval",
      token,
      user: {
        hr_id: result.insertId,
        hr_name: name,
        company_name: company,
        email,
        phone,
        status: "pending",
      },
    });


    // send mail in background
    try {
      const { subject, body } = registrationTemplate(name);
      await sendMail(email, subject, body);
    } catch (mailErr) {
      console.error("Mail error:", mailErr);
    }
  } catch (err) {
    console.error("Error in hrRegister:", err);
    res.status(500).send({ success: false, message: "Registration failed" });
  }
};

// PROTECTED: current HR info from token
exports.hrMe = async (req, res) => {
  try {
    const rows = await hrModel.hrFindById(req.user.id);
    if (!rows || rows.length === 0)
      return res.status(404).send({ success: false, message: "HR not found" });
    res.send({ success: true, user: rows[0] });
  } catch (err) {
    console.error("hrMe error:", err);
    res.status(500).send({ success: false, message: "Server error" });
  }
};




exports.updateHr = (req, res) => {
    const { hr_id, hr_name, company_name, password, phone } = req.body;

    let Promise = hrModel.updateHr(hr_name, company_name, phone, hr_id)
        .then(() => {
            res.send({ msg: "HR profile updated successfully" });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send({ msg: "Update failed", error: err });
        });
};
//delete

exports.delHr = (req, res) => {
    let { id } = req.body;
    let promise = hrModel.deleteHr(id);
    promise.then((result) => {
        if (result.affectedRows > 0) {
            res.send({ msg: "delete suceesfull" });
        }
        else {
            res.send({ msg: "not delee somting error /id not found" });
        }
    }).catch((err) => {
        res.send(err);
    })

}


// update hr status 
exports.updateStatusHr = async (req, res) => {
  try {
    let { id, status } = req.body;

    // step 1: update
    await hrModel.updateStatusHr(id, status);

    // step 2: find HR details
    let data = await hrModel.hrFindById(id);
    if (!data || data.length === 0) {
      return res.send({ msg: "HR not found" });
    }

    // Fix: data is an array, so get the first element
    let { hr_name, company_name, email, password } = data[0];

    if (status === "approved") {
      const { subject, body } = approvalTemplate(hr_name, company_name, email, password);
      await sendMail(email, subject, body);
    } else if (status === "rejected") {
      const { subject, body } = rejectionTemplate(hr_name, company_name);
      await sendMail(email, subject, body);
    }

    res.send({ msg: "Status updated successfully and email sent" });

  } catch (err) {
    console.error("Error:", err);
    res.send({ msg: "status not updated / id not found" });
  }
};



// List all HRs
exports.AllHr = (req, res) => {
  hrModel.viewHr()
    .then((result) => res.send(result))
    .catch((err) => res.status(500).send(err));
};

// View all posts created by a specific HR
exports.viewAllPostHrById = (req, res) => {
  const { hr_id } = req.body;
  console.log("Fetching jobs for HR ID:", hr_id); // Debug log
  hrModel.viewAllPostHrById(hr_id)
    .then((result) => {
      console.log("Jobs data:", result); // Debug log
      res.send(result);
    })
    .catch((err) => res.status(500).send(err));
};
