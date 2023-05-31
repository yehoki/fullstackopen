const blogRouter = require('express').Router();
const Blog = require('../models/blog');

// getAll
// blogRouter.get('/', async (req, res) => {
//   const blogs = await Blog.find({});
//   res.json(blogs);
// });

blogRouter.get('/', (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs);
  });
});

// getOne
// blogRouter.get('/:id', async (req, res) => {
//   const blog = await Blog.findById(req.params.id);
//   if (blog) {
//     res.json(blog)
//   } else {
//     res.status(404).end()
//   }
// })

blogRouter.get('/:id', (req, res, next) => {
  Blog.findById(req.params)
    .then((blog) => {
      if (blog) {
        res.json(blog);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

blogRouter.post('/', (req, res, next) => {
  const { title, author, url, likes } = req.body;
  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
  });
  blog
    .save()
    .then((savedBlog) => {
      res.json(savedBlog);
    })
    .catch((err) => next(err));
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
