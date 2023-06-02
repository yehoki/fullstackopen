const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const helper = require('../utils/middleware');
// getAll
blogRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      name: 1,
      username: 1,
    });
    res.json(blogs);
  } catch (exc) {
    next(exc);
  }
});

// getOne
blogRouter.get('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).end();
    }
  } catch (exc) {
    next(exc);
  }
});

// postBlog

blogRouter.post('/', async (req, res, next) => {
  const { title, author, url, likes, userId } = req.body;
  const token = req.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!(decodedToken.id && token)) {
    return res.status(401).json({ error: 'token invalid' });
  }
  const user = await User.findById(decodedToken.id);
  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes || 0,
    user: user.id,
  });
  try {
    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog);
    await user.save();
    res.status(201).json(savedBlog);
  } catch (exc) {
    next(exc);
  }
});

blogRouter.delete('/:id', async (req, res, next) => {
  try {
    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (exc) {
    next(exc);
  }
});

blogRouter.put('/:id', async (req, res, next) => {
  const { title, author, url, likes } = req.body;
  const blog = {
    title: title,
    author: author,
    url: url,
    likes: likes || 0,
  };
  try {
    const newBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
      new: true,
    });
    res.json(newBlog);
  } catch (exc) {
    next(exc);
  }
});

module.exports = blogRouter;
