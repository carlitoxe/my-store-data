const { Strategy, ExtractJwt } = require('passport-jwt');
const { config: { jwtSecret } } = require('../../../config/config');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret
}

const JwtStrategy = new Strategy(options, async(payload, done) => {
  return done(null, payload);
});


module.exports = JwtStrategy;
