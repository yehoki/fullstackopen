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

describe('When there are some initial blogs', () => {
  test('Blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  }, 12000);

  test('All the blogs are returned', async () => {
    const blogs = await api.get('/api/blogs');
    expect(blogs.body).toHaveLength(helper.initialBlogs.length);
  });

  test('Blog identifier is named "id"', async () => {
    const blogs = await api.get('/api/blogs');
    const ids = blogs.body.map((blog) => blog.id);
    ids.forEach((id) => {
      expect(id).toBeDefined();
    });
  });
});

describe('When adding a new blog post', () => {
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

  test('It succeeds with valid data', async () => {
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

  test('with no likes, it defaults to 0 likes', async () => {
    await api.post('/api/blogs').send(noLikesBlog);
    const blogsAfter = await api.get('/api/blogs');
    const savedBlog = blogsAfter.body.at(-1);
    expect(savedBlog.title).toEqual('NoLikes');
    expect(savedBlog.likes).toEqual(0);
  });

  test('with no title blog responds with 400 code', async () => {
    await api.post('/api/blogs').send(noTitleBlog).expect(400);
  });

  test('with no Url blog responds with 400 code', async () => {
    await api.post('/api/blogs').send(noUrlBlog).expect(400);
  });
});

describe('When deleting a blog post', () => {
  test('which exists, is removed correctly with status code 204', async () => {
    const blogs = await api.get('/api/blogs');
    const blogToDelete = await blogs.body[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
    const blogsAfter = await api.get('/api/blogs');

    expect(blogsAfter.body).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAfter.body.map((blog) => blog.title);
    expect(titles).toContain('SecondBlog');
  });
});

describe('When editing a blog', () => {
  test('which exists, correctly returns the editted blog', async () => {
    const blogs = await api.get('/api/blogs');
    const blogToUpdate = blogs.body[0];
    const update = {
      likes: blogToUpdate.likes + 1,
    };
    const newBlog = await api.put(`/api/blogs/${blogToUpdate.id}`).send(update);
    expect(newBlog.body.likes).toEqual(blogToUpdate.likes + 1);
  });

  test('which does not exist, it returns correct 404 code and does not make a new entry', async () => {
    const id = '647791b641c116de1af1a2b6';
    await api.put(`/api/blogs${id}`, { likes: 14 }).expect(404);
    const blogs = await api.get('/api/blogs');
    expect(blogs.body).toHaveLength(helper.initialBlogs.length);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
