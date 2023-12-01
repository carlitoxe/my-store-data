const express = require('express');
const passport = require('passport');
// const jwt = require('jsonwebtoken');
// const { config: { jwtSecret } } = require('../config/config');

const AuthService = require('../services/auth.service');
const service = new AuthService();

const router = express.Router();

router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
  try {
    const user = req.user;
    // const payload = {
    //   sub: user.id,
    //   role: user.role,
    // };
    // const token = jwt.sign(payload, jwtSecret);
    res.json(service.signToken(user));
  } catch (error) {
    next(error);
  }
});

router.post('/recovery',
  async (req, res, next) => {
  try {
    const { email } = req.body;
    const rta = await service.sendRecovery(email)
    res.json(rta)
  } catch (error) {
    next(error);
  }
});

router.post('/change-password',
  async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    const rta = await service.changePassword(token, newPassword)
    res.json(rta)
  } catch (error) {
    next(error);
  }
});

module.exports = router;
