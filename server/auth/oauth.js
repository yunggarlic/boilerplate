const chalk = require('chalk');
const bcrypt = require('bcryptjs');
const router = require('express').Router();
const { User } = require('../db');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

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

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    // will mean that `req.user` is equal to the user we just found
    done(null, user);
  } catch (error) {
    done(error);
  }
});

const strategy = new GoogleStrategy(
  {
    clientID:
      '512029508991-kg4l8303gf679rrbqpe8jjaghjp01a3d.apps.googleusercontent.com',
    clientSecret: 'Q9BYhM-KS-J-3WX84IZMsnn8',
    callbackURL: '/auth/google/callback',
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
