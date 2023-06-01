const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (exc) {
    next(exc);
  }
});

usersRouter.post('/', async (req, res, next) => {
  const { username, name, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });
  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (exc) {
    next(exc);
  }
});

module.exports = usersRouter;
