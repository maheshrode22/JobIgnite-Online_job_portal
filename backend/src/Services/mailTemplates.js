// Registration Mail Template
function registrationTemplate(name) {
    return {
      subject: "Registration Successful - Waiting for approval",
      body: `Dear ${name},
  
  !!! Greetings for the day !!!
  Thank you for your successful registration.
  Thank you for showing interest in JobIgnite job portal and for your application.
  We will review your account details and approve your application within 24 hours.
  
  Once your account is approved, you will have access to all the features of our job portal.
  
  We appreciate your patience.
  *This is an auto generated email, Please do not reply to this email.*
  
  Thanks & Regards,
  JobIgnite Job Portal
  jobignite22@gmail.com
  +91-8459525501`,
    };
  }
  
  module.exports = { registrationTemplate };
  //
  