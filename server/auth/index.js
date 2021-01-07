const User = require('../db/user');
const router = require('express').Router();
const bcrypt = require('bcryptjs');

router.use('/google', require('./oauth'));

const userNotFound = (next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};

router.get('/me', async (req, res, next) => {
  try {
    if (!req.session.userId) {
      if (req.user) {
        res.json(req.user);
      } else {
        res.sendStatus(401);
      }
    } else {
      const user = await User.findByPk(req.session.userId);
      user ? res.json(user) : userNotFound(next);
    }
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.login(user, (err) => (err ? next(err) : res.json(user)));
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraitError') {
      res.status(401).send('User already exists');
    }
    next(error);
  }
});

router.put('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      req.login(user, (err) => (err ? next(err) : res.json(user)));
    } else {
      const err = new Error('Incorrect email or password');
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/logout', (req, res, next) => {
  req.logout();
  req.session.destroy((err) => {
    if (err) return next(err);
    res.status(204).end();
  });
});

module.exports = router;
