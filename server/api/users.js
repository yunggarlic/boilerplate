const express = require('express');
const router = express.Router();
const User = require('../db/user');

router.get('/', async (req, res, next) => {
  const users = await User.findAll();
  res.status(200).send(users);
});

router.post('/', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.put('/:userId', (req, res, next) => {
  res.send('uhhh');
});

router.delete('/:userId', async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.userId,
      },
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
