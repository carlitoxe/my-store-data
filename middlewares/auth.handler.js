const boom = require('@hapi/boom');
const { config: { apiKey } } = require('../config/config')

function checkApikey(req, res, next) {
  const apiKeyHeader = req.headers['api'];
  if (apiKeyHeader === apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

function checkAdminRole(req, res, next) {
  console.log(req.user);
  const user = req.user;
  if (user.role === 'admin') {
    next();
  } else {
    next(boom.unauthorized());
  }
}

function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    console.log('roles',  roles);
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized());
    }
  }
}



module.exports = { checkApikey, checkAdminRole, checkRoles }