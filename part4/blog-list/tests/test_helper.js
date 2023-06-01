const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'FirstBlog',
    author: 'FirstAuthor',
    url: 'FirstUrl',
    likes: 12,
  },
  {
    title: 'SecondBlog',
    author: 'SecondAuthor',
    url: 'SecondUrl',
    likes: 15,
  },
];

module.exports = {
  initialBlogs
};
