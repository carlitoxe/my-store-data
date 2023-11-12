const { config: { dbUrl } } = require('../config/config');

// const USER = encodeURIComponent(dbUser);
// const PASSWORD = encodeURIComponent(dbPassword);
// const URI = `postgres://${USER}:${PASSWORD}@${dbHost}:${dbPort}/${dbName}`;

module.exports = {
  development: {
    url: dbUrl,
    dialect: 'postgres'
  },
  production: {
    url: dbUrl,
    dialect: 'postgres',
    ssl: {
      rejectUnauthorized: false
    }
  }
}