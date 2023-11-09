const { Sequelize } = require('sequelize');

const { config: { dbHost, dbPort, dbName, dbUser, dbPassword } } = require('../config/config');
const setupModels = require('../db/models');

const USER = encodeURIComponent(dbUser);
const PASSWORD = encodeURIComponent(dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${dbHost}:${dbPort}/${dbName}`;

const sequelize = new Sequelize(URI);

setupModels(sequelize);

// sequelize.sync();

module.exports = sequelize;