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
    const blog = await Blog.findById(req.params.id).populate('user', {
      name: 1,
      username: 1,
    });
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
  const { title, author, url, likes } = req.body;
  const user = req.user;
  const userId = user._id.toString();
  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes || 0,
    user: userId,
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

blogRouter.post('/:id/comments', async (req, res, next) => {
  const { comment } = req.body;
  try {
    const blog = await Blog.findById(req.params.id);
    blog.comments = blog.comments.concat(comment);
    await blog.save();
    res.status(201).json(blog);
  } catch (exc) {
    next(exc);
  }
});

blogRouter.delete('/:id', async (req, res, next) => {
  const user = req.user;
  const token = req.token;
  const blog = await Blog.findById(req.params.id);
  const blogUserId = blog.user.toString();
  if (blogUserId !== user.id.toString()) {
    return res.status(401).json({
      error: 'Invalid token: You cannot delete other users blog posts',
    });
  }
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
    }).populate('user', {
      name: 1,
      username: 1,
    });
    res.json(newBlog);
  } catch (exc) {
    next(exc);
  }
});

module.exports = blogRouter;
