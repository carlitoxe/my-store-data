const { Sequelize } = require('sequelize');

const { config: { dbUrl, isProd } } = require('../config/config');
const setupModels = require('../db/models');

// const USER = encodeURIComponent(dbUser);
// const PASSWORD = encodeURIComponent(dbPassword);
// const URI = `postgres://${USER}:${PASSWORD}@${dbHost}:${dbPort}/${dbName}`;

const options = {
  dialect: 'postgres'
}
if (isProd) {
  options.ssl = {
    rejectUnauthorized: false
  }
}

const sequelize = new Sequelize(dbUrl, options);

setupModels(sequelize);

// sequelize.sync();

module.exports = sequelize;