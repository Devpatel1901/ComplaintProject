var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'theinfinityitsolution@gmail.com',
    pass: 'gxkw jcmd dvxo rhwf'
  }
});

module.exports = transporter;