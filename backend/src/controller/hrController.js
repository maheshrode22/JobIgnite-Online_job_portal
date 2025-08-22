const hrModel = require("../models/hrModel.js");
// const { sendRegistrationMail } = require("../Services/mailService");
const { sendMail } = require("../Services/mailService");
const { registrationTemplate } = require("../Services/mailTemplates");

exports.hrLogin = (req, res) => {
  let { hrUser, hrPass } = req.body;
  let promise = hrModel.hrLoginMod(hrUser, hrPass);

  promise.then((result) => {
    if (result > 0) {
      res.send({ msg: "HR login successfully" });
    } else {
      res.send({ msg: "HR login failed" });
    }
  });

  promise.catch((err) => {
    res.send({ msg: "login fail" });
  });
};



exports.hrRegister = (req, res) => {
    const { name, company, email, password, phone } = req.body;
  
    hrModel
      .hrRegisterMod(name, company, email, password, phone)
      .then((result) => {
        // response 
        res.status(201).send({ message: "Wait for HR approval", data: result });
  
        // send mail in bg
        const { subject, body } = registrationTemplate(name);
        sendMail(email, subject, body).catch((err) => {
          console.error("Mail error:", err);
        });
      })
      .catch((err) => {
        console.error("Error in hrRegister:", err);
        res.status(500).send({ message: "Registration failed", error: err });
      });
  };

// view all post
exports.viewAllPostHrById=(req,res)=>{
  const{hr_id}=req.body;

  hrModel.viewAllPostHrById(hr_id)
  .then((result)=>{
    res.send(result);
  }).catch((err) => {
    res.send(err);
});

}
exports.AllHr = (req, res) => {
    let promise = hrModel.viewHr();

    promise.then((result) => {
        res.send(result);
    });
    promise.catch((err) => {
        res.send(err);
    });
}

exports.updateHr = (req, res) => {
    const { hr_id, hr_name, company_name, password, phone } = req.body;

    let Promise = hrModel.updateHr(hr_name, company_name, password, phone, hr_id)
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

exports.updateStatusHr = ((req, res) => {
    let { id, status } = req.body;
    let Promise = hrModel.updateStatusHr(id, status);
    Promise.then((result) => {
        res.send({ msg: "status updated" });

    }).catch((err) => {
        res.send({ msg: "status not updated / id not found" });

    })

})

