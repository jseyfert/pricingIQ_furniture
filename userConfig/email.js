var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://johnseyfertfake%40gmail.com:1982johnfake@smtp.gmail.com');

var SendMail = function(email, link, resetToken){

  if(link){
    var mailOptions = {
      from: '"pricingIQ" <johnseyfert@gmail.com>', // sender address 
      to: email, // list of receivers 
      subject: 'Validate Your Email ✔', // Subject line 
      text: 'please use html format', // plaintext body 
      html : "Please Click the link to verify your email.<br><a href=" + link + ">" + link + "</a>" 
    };
  } else if (resetToken){
    var mailOptions = {
      from: '"pricingIQ" <johnseyfert@gmail.com>', // sender address 
      to: email, // list of receivers 
      subject: 'Reset Your Password ✔', // Subject line 
      text: 'please use html format', // plaintext body 
      html : "Please paste this token in the app to reset your password<br><br>" + resetToken 
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
