const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const { dbStore, User } = require('./db');
const apiRoutes = require('./api');
const authRoutes = require('./auth');

if (process.env.NODE_ENV !== 'production') {
  require('../secret');
}

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

app.use(morgan('dev'));

//express-included middleware for json object parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//--------------------Sessions

//Every time a req(uest) is made, a session object is added on as req.session that we can read and manipulate
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: dbStore,
    resave: false,
    saveUninitialized: true,
  })
);
//sessions logging
// app.use((req, res, next) => {
//   console.log(chalk.bgBlueBright.yellow('\n\nNew Request'));
//   console.log(chalk.bgBlueBright.black('Sessions:'), req.session);
//   console.log(chalk.bgBlueBright.black('Sessions ID:'), req.session.id);
//   console.log(chalk.bgBlueBright.black('Headers: '), req.headers);
//   console.log(chalk.bgBlueBright.black('Cookie:'), req.session.cookie);
//   console.log(chalk.bgRedBright.black('User:', req.user));
//   next();
// });

//------------------Passport
//must be introduced after express session middleware
//introduces passport middleware that is preconfigured with express as a part of the package.
app.use(passport.initialize());
app.use(passport.session());

//counts the total number of times people have connected and an individual's (mine) number of times connected
let globalRecCount = 0;
app.use((req, res, next) => {
  globalRecCount++;
  if (!req.session.count) {
    req.session.count = 1;
  } else {
    req.session.count++;
  }
  next();
});

//serving up that good good static from root/public
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

//just gettin it
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

//handles 404s
app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

//error handling general
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500);
  res.send(err.message || 'Internal server error');
});

module.exports = app;
