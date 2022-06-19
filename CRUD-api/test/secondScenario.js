//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../build/index.js').default;
const should = chai.should();

chai.use(chaiHttp);
// Our main block
describe('Scenario 2', () => {
  // Consts
  const user1 = {
      username: 22,
      age: 22,
      hobbies: ['frontend', 'backend'],
  };
  const user2 = {
    username: 'Kiryl',
    age: '22',
    hobbies: ['frontend', 'backend'],
  };
  const user3 = {
    username: 'Roman',
    age: 22,
    hobbies: 22,
  };

  /*
  * Test for /POST
  */
  describe('/POST incorrect data for username', () => {
    it('it should message - Incorrect type of mandatory value for username in POST a user ', done => {
      chai.request(server)
        .post('/api/users')
        .send(user1)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message').eql('Incorrect type of mandatory value username field - it must be a string');
          done();
        });
    });
  });
   /*
  * Test for /POST
  */
   describe('/POST incorrect data for user age', () => {
    it('it should message - Incorrect type of mandatory value for age in POST a user ', done => {
      chai.request(server)
        .post('/api/users')
        .send(user2)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message').eql('Incorrect type of mandatory value age field - it must be a number');
          done();
        });
    });
  });
     /*
  * Test for /POST
  */
    describe('/POST incorrect data for user hobbies', () => {
    it('it should message - Incorrect type of mandatory value for hobbies in POST a user ', done => {
        chai.request(server)
        .post('/api/users')
        .send(user3)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('message').eql('Incorrect type of mandatory value hobbies field - it must be array of strings');
            done();
        });
    });
  });

});
