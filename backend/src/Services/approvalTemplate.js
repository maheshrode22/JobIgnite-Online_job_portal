
// mailTemplates/approvalTemplate.js
function approvalTemplate(name, company, email, password) {
    return {
      subject: `🎉 Welcome ${company} to JobIgnite – Your Account is Approved!`,
      body: `Dear ${name},
  
  We are delighted to inform you that your company *${company}* has been **successfully approved** on JobIgnite Job Portal. 🚀
  
  ✨ From today, you are officially part of the JobIgnite community!  
  
  Your login credentials are as follows:  
  - Email: ${email}  
  - Password: ${password}  
  
  👉 For better security, we strongly recommend changing your password after first login.  
  
  We’re excited to see you hire the brightest minds and grow your team with us.  
  
  *This is an automated email. Please do not reply directly to this mail.*
  
  Best Regards,  
  **JobIgnite Team**  
  jobignite22@gmail.com  
  +91-8459525501`
    };
  }
  module.exports = { approvalTemplate };
  