const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
mongoose.set('bufferTimeoutMS', 15000);

const api = supertest(app);

describe('Blog tests', () => {
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
    })
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
