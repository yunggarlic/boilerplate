const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/boilerplate', {
  logging: console.log,
});

module.exports = db;
