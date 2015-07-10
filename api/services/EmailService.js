var path = require('path')
  , nodemailer = require('nodemailer');

exports.sendEmail = function (email, token) {
  console.log('#EmailService.sendEmail');
  // create reusable transporter object using SMTP transport
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'dhaw92@gmail.com',
      pass: process.env.PASS
    }
  });

  var link = 'http://localhost:1337/event/confirm?token=' + token;
  var textBody = 'Go to this link to confirm your invitation to the event ' + link;
// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
  var mailOptions = {
    from: 'dhaw92@gmail.com', // sender address
    to: email, // list of receivers
    subject: 'Hello ✔', // Subject line
    text: textBody // plaintext body
  };

// send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);

  });

};
