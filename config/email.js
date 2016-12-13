var nodemailer = require('nodemailer');

var SendMail = function(name, email, link, passwordResetToken){

  var transporter = nodemailer.createTransport('smtps://' + process.env.GOOGLE_ID + '%40pricingiq.io:' + process.env.GOOGLE_SECRET + '@smtp.gmail.com');

  var htmlValidate = "<div style='margin: 0; padding: 0; width: 100%; font-family: Trebuchet MS, sans-serif;'>" +
    "<div style='background-color: #f2f2f2; padding: 45px;'>" +
    "<div style='background-color: #ffffff; padding: 40px; text-align: center;'>" +
    "<h1 style='color: #5f5f5f; margin-bottom: 30px;'>Hi, " + name + "</h1>" +
    "<p style='color: #5f5f5f;'>Click the big button below to activate your account.</p>" +
    "<a href='" + link + "' style='background-color: #288feb; color: #fff; padding: 14px; text-decoration: none; border-radius: 5px; margin-top: 20px; display: inline-block;'>Activate Account</a>" +
    "</div> <h3 style='color: #5f5f5f; text-align: center; margin-top: 30px;'>pricingIQ</h3></div></div>";

  var textValidate = "Hi " + name + ", use the following link to activate your account. " + link

  var htmlReset = "<div style='margin: 0; padding: 0; width: 100%; font-family: Trebuchet MS, sans-serif;'>" +
    "<div style='background-color: #f2f2f2; padding: 45px;'>" +
    "<div style='background-color: #ffffff; padding: 40px; text-align: center;'>" +
    "<h1 style='color: #5f5f5f; margin-bottom: 30px;'>Hi, " + name + "</h1>" +
    "<p style='color: #5f5f5f; line-height: 22px;'>We've received a request to reset your password. If you didn't make the request, just ignore this email. Otherwise, you can reset your password using this token(expires in one hour)</p>" +
    passwordResetToken + "</div> <h3 style='color: #5f5f5f; text-align: center; margin-top: 30px;'>pricingIQ</h3></div></div>";

  var textReset = "Hi " + name + ", we've received a request to reset your password. If you didn't make the request, just ignore this email. Otherwise, you can reset your password using this token(expires in one hour) " + passwordResetToken

  var htmlResetNotify = "<div style='margin: 0; padding: 0; width: 100%; font-family: Trebuchet MS, sans-serif;'>" +
    "<div style='background-color: #f2f2f2; padding: 45px;'>" +
    "<div style='background-color: #ffffff; padding: 40px; text-align: center;'>" +
    "<h1 style='color: #5f5f5f; margin-bottom: 30px;'>Hi, " + name + "</h1>" +
    "<p style='color: #5f5f5f; line-height: 22px;'>Your password has been reset for pricingIQ.</p></div> <h3 style='color: #5f5f5f; text-align: center; margin-top: 30px;'>pricingIQ</h3></div></div>";

  var textResetNotify = "Hi " + name + ", your password has been reset for pricingIQ."


  if(link){
    var mailOptions = {
      from: '"pricingIQ" <johnseyfert@gmail.com>',
      to: email,
      subject: 'Validate Your Email ✔',
      html : htmlValidate,
      text: textValidate,
    };
  } else if (passwordResetToken){
    var mailOptions = {
      from: '"pricingIQ" <johnseyfert@gmail.com>', 
      to: email,
      subject: 'Reset Your Password ✔',
      html : htmlReset,
      text: textReset,
    };
  } else {
    var mailOptions = {
      from: '"pricingIQ" <johnseyfertfake@gmail.com>',
      to: email,
      subject: 'Your password has been reset ✔',
      html : htmlResetNotify,
      text: textResetNotify,
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


