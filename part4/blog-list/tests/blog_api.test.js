const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
mongoose.set('bufferTimeoutMS', 15000);
const Blog = require('../models/blog');
const api = supertest(app);
const helper = require('./test_helper');

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArr = blogObjects.map((blog) => {
    blog.save();
  });
  await Promise.all(promiseArr);
}, 11000);

describe('Blog tests GET', () => {
  test('Blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  }, 12000);

  test('Exactly two blogs at the beginning after initial insert', async () => {
    const blogs = await api.get('/api/blogs');
    expect(blogs.body.length).toEqual(2);
  });

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
  const noLikesBlog = {
    title: 'NoLikes',
    author: 'Someone',
    url: 'Url',
  };
  const noTitleBlog = {
    author: 'NoTitleAuthor',
    url: 'NoTitleUrl',
    likes: 1,
  };
  const noUrlBlog = {
    title: 'NoUrl',
    author: 'NoUrlAuthor',
    likes: 1,
  };

  test('Successfully creates a new blog post', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const blogsAfter = await api.get('/api/blogs');
    const titles = blogsAfter.body.map((blog) => blog.title);

    expect(blogsAfter.body).toHaveLength(helper.initialBlogs.length + 1);
    expect(titles).toContain('NewBlog');
  });

  test('When no likes in the request, defaults to 0', async () => {
    await api.post('/api/blogs').send(noLikesBlog);
    const blogsAfter = await api.get('/api/blogs');
    const savedBlog = blogsAfter.body.at(-1);
    expect(savedBlog.title).toEqual('NoLikes');
    expect(savedBlog.likes).toEqual(0);
  });

  test('No title blog responds with 400 code', async () => {
    await api.post('/api/blogs').send(noTitleBlog).expect(400);
  });

  test('No Url blog responds with 400 code', async () => {
    await api.post('/api/blogs').send(noUrlBlog).expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
