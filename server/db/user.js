const Sequelize = require('sequelize');
const db = require('./database');

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: '',
  },
  googleId: {
    type: Sequelize.STRING,
  },
});

module.exports = User;
