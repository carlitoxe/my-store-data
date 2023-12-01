const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: 'carlosromro.cr@gmail.com', // generated ethereal user
    pass: 'opni reoj tgab gmbt',
  }
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Carlos Romero" <carlosromro.cr@gmail.com>', // sender address
    to: "toxedev@gmail.com", // list of receivers
    subject: "Hello World🌎", // Subject line
    text: "Sending this from backend with SMTP :D", // plain text body
    html: "<h3>Sending this from backend with SMTP :D</h3>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}

sendMail();
