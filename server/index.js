const express = require('express');
const app = express();
const path = require('path');
const chalk = require('chalk');
const morgan = require('morgan');

const apiRoutes = require('./api');

app.use(morgan('dev'));

//express-included middleware for json object parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving up that good good static from root/public
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api', apiRoutes);

//just gettin it
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use((err, req, res, next) => {
  res.status(500).send('Yikes!');
});

module.exports = app;
