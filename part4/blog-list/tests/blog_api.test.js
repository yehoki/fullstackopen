const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
mongoose.set('bufferTimeoutMS', 15000);
const Blog = require('../models/blog');
const api = supertest(app);
const logger = require('../utils/logger');
const helper = require('./test_helper');

beforeEach(async () => {
  await Blog.deleteMany({});
  logger.info('Cleared');
  let blog = new Blog(helper.initialBlogs[0]);
  await blog.save();
  logger.info('Saved first');
  blog = new Blog(helper.initialBlogs[1]);
  await blog.save();
  logger.info('Saved second');
}, 11000);

describe('Blog tests GET', () => {
  test('Blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  }, 12000);

  test('Blog identifier is named "id"', async () => {
    const blogs = await api.get('/api/blogs');
    const ids = blogs.body.map((blog) => blog.id);
    ids.forEach((id) => {
      expect(id).toBeDefined();
    });
  });
});

describe('Blog tests POST', () => {
  const newBlog = {
    title: 'NewBlog',
    author: 'NewBlogger',
    url: 'NewUrl',
    likes: 15,
  };
  test('Successfully creates a new blog post', async () => {
    const blogsBefore = await api.get('/api/blogs');
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
