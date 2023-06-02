const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({}).populate('blogs', {
      title: 1,
      author: 1,
      url: 1,
      likes: 1,
    });
    res.json(users);
  } catch (exc) {
    next(exc);
  }
});

usersRouter.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).end();
    }
  } catch (exc) {
    next(exc);
  }
});

usersRouter.post('/', async (req, res, next) => {
  const { username, name, password } = req.body;
  if (!password) {
    return res.status(400).json({ error: 'The password is missing' });
  }
  if (password.length < 3) {
    return res.status(400).json({ error: 'The password is too short' });
  }
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
