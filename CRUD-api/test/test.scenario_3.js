//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../build/index.js').default;
const should = chai.should();

chai.use(chaiHttp);
// Our main block
describe('Scenario 3', () => {
  // Consts
  const user = {
      username: 'Kiryl',
      age: 22,
      hobbies: ['frontEnd', 'backEnd'],
  };
  const fakeUUID = '3';

  describe('/GET/:non-UUID id user ', async () => {
    it('it should GET a user by the given non-UUID id with message: Bad Request - InvalidInput', done => {
      chai.request(server)
        .post('/api/users')
        .send(user)
        .end((err, res) => {
          chai.request(server).get(`/api/users/${fakeUUID}`)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property('message').eql(`Bad Request - InvalidInput`);
            done();
          });
        });
    });
  });
});