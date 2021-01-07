const chalk = require('chalk');
const bcrypt = require('bcryptjs');
const router = require('express').Router();
const { User } = require('../db');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require('../../secret');

const verificationCallback = async (token, refreshToken, profile, done) => {
  console.log(chalk.bgRedBright.black('Token'), token);
  try {
    const [user] = await User.findOrCreate({
      where: {
        googleId: profile.id,
      },
      defaults: {
        email: profile.emails[0].value,
        imageUrl: profile.photos[0].value,
      },
    });
    done(null, user);
  } catch (error) {
    done(error);
  }
};

const strategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
  },
  verificationCallback
);

passport.use(strategy);

// path is /google
router.get('/', passport.authenticate('google', { scope: 'email' }));

router.get(
  '/callback',
  passport.authenticate('google', {
    successRedirect: '/home',
    failureRedirect: '/',
  })
);

module.exports = router;
