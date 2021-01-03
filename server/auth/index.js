const User = require('../db/user');
const router = require('express').Router();

router.get('/me', async (req, res, next) => {
  try {
    if (!req.session.userId) {
      res.sendStatus(401);
    } else {
      const user = await User.findById(req.session.userId);
      if (!user) {
        res.sendStatus(401);
      } else {
        res.json(user);
      }
    }
  } catch (error) {
    next(error);
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
    if (!user) {
      res.status(401).send('Forbidden');
    } else {
      res.send(user);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
