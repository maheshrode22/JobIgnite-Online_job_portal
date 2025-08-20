const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// generic mail sender
async function sendMail(to, subject, text) {
  try {
    let info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    console.log("Mail sent:", info.response);
  } catch (error) {
    console.error("Error sending mail:", error);
    throw error;
  }
}

module.exports = { sendMail };
