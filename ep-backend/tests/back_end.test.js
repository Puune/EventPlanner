/**
 * @module back_end_test
 */


const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../App');
const api = supertest(app);
const helper = require('./test_helper');
const User = require('../models/user');
//const Occasion = require('../models/occasion');
//const secTool = require('../utils/securityTool');

beforeAll(async () => {
  await User.deleteMany({});

  const users = await helper.createInitUsers();
  const objs = users.map((user) => new User(user));
  const promises = objs.map((obj) => obj.save());
  await Promise.all(promises);
})

describe('When users are created', () => {
  test('users exist in db', async () => {
    await api
      .get('/api/users/')
      .expect('Content-Type', /application\/json/);
  })

  test('users are the same as the initial', async () => {
    const init = await helper.createInitUsers();
    init.map((user) => new User(user));

    const users = await api.get('/api/users');
    expect(users.body[0].username).toBe(init[0].username.toString());
  })

  test('creting new user', async () => {
    const user = {
      username: 'khan1',
      name: 'Tshingis',
      password: 'golden orda'
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(200);
  })
})

describe('when logging in', () => {

  test('token is received after successful login', async () => {
    await api.post('/api/login')
      .send({ username: 'firstOne', password: 'short' })
      .expect(200);
  });

  test('error if wrong credential', async () => {
    await api.post('/api/login')
      .send({ username: 'firstOne', password: 'Christ' })
      .expect(401);
  })
})

/*
describe('when PRUD occasions', () => {

  test('posting correctly', async () => {
    const token = await
    const occ = {
      title: 'this',
      description: 'that',
    }
    await api.post('/api/occasions/')
      .set('Authorization', `bearer ${token.body.token}`)
      .send(occ)
      .expect(200);
  })

  test('updating corretly', async () => {
    const token = await getToken();

    const occ = await Occasion.findOne({ title: 'this' });

    await api
      .put(`/api/occasions/${occ._id}`)
      .set('Authorization', `bearer ${token.body.token}`)
      .send({
        title: 'next',
        description: 'that'
      })
      .expect(200);
  })
})

*/

afterAll(() => {
  mongoose.connection.close();
})