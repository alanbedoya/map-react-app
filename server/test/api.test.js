const request = require('supertest');

const app = require('../src/app');

// eslint-disable-next-line no-undef
describe('GET /api/v1', () => {
  // eslint-disable-next-line no-undef
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'API - 👋🌎🌍🌏'
      }, done);
  });
});

// eslint-disable-next-line no-undef
describe('Post /api/v1/messages', () => {
  // eslint-disable-next-line no-undef
  it('responds with inserted message', (done) => {
    const requestObj = {
      name: 'Alan',
      message: 'Hello there.',
      latitude: -90,
      longitude: 180
    };

    const responseObj = {
      ...requestObj,
      _id: '5cdb7b23b40e15f09bce0429',
      date: '2019-05-15T04:57:49.796Z'
    };
    request(app)
      .post('/api/v1/messages')
      .send(requestObj)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        res.body._id = '5cdb7b23b40e15f09bce0429';
        res.body.data = '2019-05-15T04:57:49.796Z';
      })
      .expect(200, responseObj, done);
  });

  // eslint-disable-next-line no-undef
  it('can signup with a name that has diacritics', (done) => {
    const requestObj = {
      name: 'Ÿööhöö',
      message: 'This app is so cool!',
      latitude: -90,
      longitude: 180
    };

    const responseObj = {
      ...requestObj,
      _id: '5cdb7b23b40e15f09bce0429',
      date: '2019-05-15T04:57:49.796Z'
    };

    request(app)
      .post('/api/v1/messages')
      .send(requestObj)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        res.body._id = '5cdb7b23b40e15f09bce0429';
        res.body.date = '2019-05-15T04:57:49.796Z';
      })
      .expect(200, responseObj, done);
  });
});
