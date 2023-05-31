const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
mongoose.set('bufferTimeoutMS', 15000);

const api = supertest(app);
describe('Blog tests', () => {
  test('Blogs are returned as JSON', async () => {
    console.log('Begin');
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  },12000);
});

afterAll(async () => {
  await mongoose.connection.close();
});
