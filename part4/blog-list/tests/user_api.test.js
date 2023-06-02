const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
mongoose.set('bufferTimeoutMS', 20000);
const api = supertest(app);
const helper = require('./test_helper');
const User = require('../models/user');
const bcrypt = require('bcrypt');

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(helper.initialUsers);
}, 20000);

describe('When there are some initial users', () => {
  test('Users are returned as JSON', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('All users are returned', async () => {
    const users = await api.get('/api/users');
    expect(users.body).toHaveLength(helper.initialUsers.length);
  });

  test('User identifier is named "id"', async () => {
    const users = await api.get('/api/users');
    const ids = users.body.map((user) => user.id);
    ids.forEach((id) => {
      expect(id).toBeDefined();
    });
  });
});

describe('When requesting a unique user', () => {
  test('finds the user successfully when they exist', async () => {
    const users = await api.get('/api/users');
    const firstUser = await users.body[0];
    const resultUser = await api
      .get(`/api/users/${firstUser.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(resultUser.body).toEqual(firstUser);
  });

  test('fails with code 404 when the user does not exist', async () => {
    const id = '111111b641c906de7af8a2b6';
    await api.get(`/api/users/${id}`).expect(404);
  });

  test('fails with code 400, when the id is invalid', async () => {
    const id = '01111b641c906de7af8a2b6';
    await api.get(`/api/users/${id}`).expect(400);
  });
});

describe('When adding a new user', () => {
  const newUser = {
    username: 'newUser',
    name: 'newName',
    password: 'newPassword',
  };

  const shortPassword = {
    username: 'shortPass',
    name: 'shortPass',
    password: 'Sh',
  };

  const shortUsername = {
    username: 'Sh',
    name: 'shortPass',
    password: 'ShortPassword',
  };

  const noPassword = {
    username: 'noPass',
    name: 'NoPass',
  };

  const noUsername = {
    name: 'noUsername',
    password: 'noUsername',
  };

  test('it succeeds with valid data', async () => {
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const usersAfter = await api.get('/api/users');
    const usernames = usersAfter.body.map((user) => user.username);
    expect(usersAfter.body).toHaveLength(helper.initialUsers.length + 1);
    expect(usernames).toContain('newUser');
  }, 10000);

  test('it fails when the password is too short (3)', async () => {
    await api.post('/api/users').send(shortPassword).expect(400);
  }, 10000);

  test('it fails when the username is too short (3)', async () => {
    await api.post('/api/users').send(shortUsername).expect(400);
  }, 10000);

  test('it fails when the password is not passed in', async () => {
    await api.post('/api/users').send(noPassword).expect(400);
  }, 10000);

  test('it fails when the username is not passed in', async () => {
    await api.post('/api/users').send(noUsername).expect(400);
  }, 10000);
});
afterAll(async () => {
  await mongoose.connection.close();
});
