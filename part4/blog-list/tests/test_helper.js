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

const initialUsers = [
  {
    username: 'TestUser',
    name: 'Test',
    password: 'TestPassword',
  },
  {
    username: 'TestUser2',
    name: 'Test',
    password: 'TestPassword',
  },
];

module.exports = {
  initialBlogs,
  initialUsers
};
