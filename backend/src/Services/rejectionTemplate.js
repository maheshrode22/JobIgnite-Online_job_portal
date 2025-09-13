

// mailTemplates/rejectionTemplate.js
function rejectionTemplate(name, company) {
    return {
      subject: `⚠️ Account Status Update – ${company} on JobIgnite`,
      body: `Dear ${name},
  
  Thank you for showing interest in joining JobIgnite Job Portal.  
  
  After reviewing your registration details for *${company}*, we regret to inform you that your account has been **rejected** at this stage.  
  
  Possible reasons could include:  
  - Incomplete or invalid information  
  - Company details not meeting our verification criteria  
  
  You are welcome to register again with correct/updated information.  
  If you believe this decision was made in error, please reach out to our support team for further clarification.  
  
  We appreciate your effort and wish you success ahead.  
  
  *This is an automated email. Please do not reply directly to this mail.*
  
  Best Regards,  
  **JobIgnite Team**  
  jobignite22@gmail.com  
  +91-8459525501`
    };
  }
  module.exports = { rejectionTemplate };
  