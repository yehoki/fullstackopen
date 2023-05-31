const blogRouter = require('express').Router();
const Blog = require('../models/blog');

// getAll
blogRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({});
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
  const { title, author, url, likes } = req.body;
  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
  });
  const savedBlog = await blog.save();
  res.json(savedBlog);
});

blogRouter.delete('/:id', (req, res, next) => {
  Blog.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => next(err));
});

blogRouter.put('./:id', (req, res, next) => {
  const { title, author, url, likes } = req.body;

  const blog = {
    title: title,
    author: author,
    url: url,
    likes: likes,
  };

  Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    .then((updatedBlog) => {
      res.json(updatedBlog);
    })
    .catch((err) => next(err));
});

module.exports = blogRouter;
