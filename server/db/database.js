const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/boilerplate', {
  logging: false,
});

module.exports = db;
