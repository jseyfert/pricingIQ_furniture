var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://johnseyfertfake%40gmail.com:1982johnfake@smtp.gmail.com');

console.log('process.env', process.env.GOOGLE_ID);

var SendMail = function(name, email, link, resetToken){

var htmlValidate = "<div style='margin: 0; padding: 0; width: 100%; font-family: Trebuchet MS, sans-serif;'>" +
  "<div style='background-color: #f2f2f2; padding: 45px;'>" +
  "<div style='background-color: #ffffff; padding: 40px; text-align: center;'>" +
  "<h1 style='color: #5f5f5f; margin-bottom: 30px;'>Hi, " + name + "</h1>" +
  "<p style='color: #5f5f5f;'>Click the big button below to activate your account.</p>" +
  "<a href='" + link + "' style='background-color: #288feb; color: #fff; padding: 14px; text-decoration: none; border-radius: 5px; margin-top: 20px; display: inline-block;'>Activate Account</a>" +
  "</div> <h3 style='color: #5f5f5f; text-align: center; margin-top: 30px;'>pricingIQ</h3></div></div>";

var htmlReset = "<div style='margin: 0; padding: 0; width: 100%; font-family: Trebuchet MS, sans-serif;'>" +
  "<div style='background-color: #f2f2f2; padding: 45px;'>" +
  "<div style='background-color: #ffffff; padding: 40px; text-align: center;'>" +
  "<h1 style='color: #5f5f5f; margin-bottom: 30px;'>Hi, " + name + "</h1>" +
  "<p style='color: #5f5f5f; line-height: 22px;'>We've received a request to reset your password. if you didn't make the request, just ignore this email. Otherwise, you can reset your password using this token:</p>" +
  resetToken + "</div> <h3 style='color: #5f5f5f; text-align: center; margin-top: 30px;'>pricingIQ</h3></div></div>";

  if(link){
    var mailOptions = {
      from: '"pricingIQ" <johnseyfert@gmail.com>', // sender address 
      to: email, // list of receivers 
      subject: 'Validate Your Email ✔', // Subject line 
      text: 'please use html format', // plaintext body 
      html : htmlValidate
    };
  } else if (resetToken){
    var mailOptions = {
      from: '"pricingIQ" <johnseyfert@gmail.com>', // sender address 
      to: email, // list of receivers 
      subject: 'Reset Your Password ✔', // Subject line 
      text: 'please use html format', // plaintext body 
      html : htmlReset
    };
  } else {
    var mailOptions = {
      from: '"pricingIQ" <johnseyfertfake@gmail.com>', // sender address 
      to: email, // list of receivers 
      subject: 'Your password has been reset ✔', // Subject line 
      text: 'please use html format', // plaintext body 
      html : "your password has been reset for pricingIQ" 
    };
  }

  transporter.sendMail(mailOptions, function(error, info){
      if(error){
        return done(err);
      }
      console.log('Message sent: ' + info.response);
  });

}

module.exports = SendMail;


