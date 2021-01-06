const Sequelize = require('sequelize');
const db = require('./database');
const bcrypt = require('bcryptjs');

const User = db.define(
  'user',
  {
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
    salt: {
      type: Sequelize.STRING,
    },
  },
  {
    hooks: {
      beforeCreate: setSaltAndPassword,
      beforeUpdate: setSaltAndPassword,
    },
  }
);

User.generateSalt = () => {
  return bcrypt.genSaltSync(10);
};

User.generateHash = (plainText, salt) => {
  return bcrypt.hashSync(plainText, salt);
};

function setSaltAndPassword(user) {
  if (!user.googleId) {
    if (user.changed('password') || !user.salt) {
      user.salt = User.generateSalt();
      user.password = User.generateHash(user.password, user.salt);
    }
  }
}

module.exports = User;
