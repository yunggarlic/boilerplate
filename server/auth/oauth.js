const chalk = require('chalk');
const router = require('express').Router();
const Sequelize = require('sequelize');
const { User } = require('../db');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
if (process.env.NODE_ENV !== 'production') {
  require('../../secret');
}

const verificationCallback = async (token, refreshToken, profile, done) => {
  try {
    // const [user] = await User.findOrCreate({
    //   where: {
    //     googleId: profile.id,
    //   },
    //   defaults: {
    //     email: profile.emails[0].value,
    //     imageUrl: profile.photos[0].value,
    //   },
    // });

    let user = await User.findOne({
      where: {
        [Sequelize.Op.or]: [
          { googleId: profile.id },
          { email: profile.emails[0].value },
        ],
      },
    });
    if (!user) {
      user = await User.create({
        email: profile.emails[0].value,
        imageUrl: profile.photos[0].value,
        googleId: profile.id,
      });
    } else {
      if (!user.googleId) {
        user.googleId = profile.id;
        user.save();
      }
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
};

const strategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:
      process.env.NODE_ENV === 'development'
        ? '/auth/google/callback'
        : process.env.GOOGLE_CALLBACK,
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
