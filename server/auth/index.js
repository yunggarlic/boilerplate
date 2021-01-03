const User = require('../db/user');
const router = require('express').Router();

const userNotFound = (next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};

router.get('/me', async (req, res, next) => {
  try {
    if (!req.session.userId) {
      userNotFound(next);
    } else {
      const user = await User.findByPk(req.session.userId);
      user ? res.json(user) : userNotFound(next);
    }
  } catch (err) {
    next(err);
  }
});

router.put('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password,
      },
    });
    if (user) {
      req.session.userId = user.id;
      res.json(user);
    } else {
      const err = new Error('Incorrect email or password');
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
