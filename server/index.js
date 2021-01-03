const express = require('express');
const app = express();
const path = require('path');
const chalk = require('chalk');
const morgan = require('morgan');
const session = require('express-session');

const apiRoutes = require('./api');
const authRoutes = require('./auth');

app.use(morgan('dev'));

//express-included middleware for json object parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Sessions

app.use(
  session({
    secret: '17f#jak20',
    resave: false,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  console.log(chalk.bgBlueBright.yellow('\n\nNew Request'));
  console.log(chalk.bgBlueBright.black('Sessions:'), req.session);
  console.log(chalk.bgBlueBright.black('Sessions ID:'), req.session.id);
  console.log(chalk.bgBlueBright.black('Headers: '), req.headers);
  console.log(chalk.bgBlueBright.black('Cookie:'), req.session.cookie);
  next();
});

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
app.get('*', (req, res) => {
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
  res.status(500).send('Yikes!');
});

module.exports = app;
