const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const { config: { smtpEmail, smtpPassword, jwtSecret } } = require('../config/config');

const UserService = require('./user.service');
const service = new UserService();

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, jwtSecret);
    return { user, token };
  }

  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = { sub: user.id };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '15min' });
    const link = process.env.NODE_ENV === 'production'
    ? `https://ecommerce-nextjs-carlitoxe.vercel.app/recovery?token=${token}`
    : `http://localhost:3000/recovery?token=${token}`;

    await service.update(user.id, { recoveryToken: token });
    const mail = {
      from: `"Shopi" <${smtpEmail}>`, // sender address
      to: `${user.email}`, // list of receivers
      subject: "Password Recovery. Shopi", // Subject line
      // text: "Sending this from backend with SMTP :D", // plain text body
      html: `<b>Enter this link to recover your password: ${link} </b>`, // html body
    }
    const res = this.sendMail(mail);
    return res;
  }

  async changePassword(token, newPassword) {
     try {
        const payload = jwt.verify(token, jwtSecret);
        const user = await service.findOne(payload.sub);
        if (user.recoveryToken !== token) {
          throw boom.unauthorized();
        }
        const hash = await bcrypt.hash(newPassword, 10);
        await service.update(user.id, { recoveryToken: null, password: hash });
        return { message: 'password has been changed successfully' }
     } catch (error) {
       throw boom.unauthorized();
     }
  }

  async sendMail(infoMail) {
    // const user = await service.findByEmail(email);
    // if (!user) {
    //   throw boom.unauthorized();
    // }
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: smtpEmail, // generated ethereal user
        pass: smtpPassword,
      }
    });
    await transporter.sendMail(infoMail);
    return { message: 'Mail sent' }
  }
}

module.exports = AuthService;