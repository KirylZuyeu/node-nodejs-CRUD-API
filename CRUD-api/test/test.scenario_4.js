//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../build/index.js').default;
const should = chai.should();

chai.use(chaiHttp);
// Our main block
describe('Scenario 4', () => {
  // Consts
  const user = {
      username: 'Kiryl',
      age: 22,
      hobbies: ['frontEnd', 'backEnd'],
  };

  describe('404 Error handling - some-non/existing/resource', () => {
    it('it should 404 Error handling with message: Resource Not Found', done => {
      chai.request(server)
        .post('/api/users')
        .send(user)
        .end((err, res) => {
          chai.request(server).get(`/some-non/existing/resource`)
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.have.property('message').eql(`Resource Not Found`);
            done();
          });
        });
    });
  });

  describe('500 Error handling', () => {
    it('it should 500 Error handling with message: Internal server error 500', done => {
      chai.request(server)
        .post('/')
        .send(user)
        .end((err, res) => {
          chai.request(server).get(`/`)
            .end((err, res) => {
              res.should.have.status(500);
              res.body.should.have.property('message').eql(`Internal server error 500`);
            done();
          });
        });
    });
  });
});