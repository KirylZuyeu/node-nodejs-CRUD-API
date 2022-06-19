//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../build/index.js').default;
const should = chai.should();


chai.use(chaiHttp);
// Our main block
describe('Users', () => {
  // Consts
  const successCode = 200;
  const deleteCode = 204;
  const user = {
      username: 'Kiryl',
      age: 22,
      hobbies: ['frontEnd', 'backEnd'],
  };
  const testUser = {
    username: 'Roman',
    age: 23,
    hobbies: ['java', 'js'],
};

  const testPrice = { title: 'hello', price: '778' };
  /*
  * Test for /GET
  */
  describe('/GET product', () => {
    it('it should GET all the products', done => {
      chai.request(server)
        .get('/api/users')
        .end((err, res) => {
          res.should.have.status(successCode);
          res.body.should.be.a('array');
          done();
        });
    });
  });
  /*
  * Test for /POST
  */
  describe('/POST user', () => {
    it('it should POST a user ', done => {
      chai.request(server)
        .post('/api/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('username');
          res.body.should.have.property('age');
          res.body.should.have.property('hobbies');
          done();
        });
    });
  });
  /*
  * Test for /GET:id
  */
  describe('/GET/:id user', async () => {
    it('it should GET a user by the given id', done => {
      chai.request(server)
        .post('/api/users')
        .send(user)
        .end((err, res) => {
          let testId = res.body.id;
          const testUsername = user.username;
          const testAge = user.age;
          const testHobbies = user.hobbies;
          chai.request(server).get(`/api/users/${testId}`)
            .end((err, res) => {
              res.should.have.status(successCode);
              res.body.should.be.a('object');
              res.body.should.have.property('id').eql(testId);
              res.body.should.have.property('username').eql(testUsername);
              res.body.should.have.property('age').eql(testAge);
              res.body.should.have.property('hobbies').eql(testHobbies);
            done();
          });
        });
    });
  });
  /*
  * Test for /PUT:id
  */
  describe('/PUT/:id user', () => {
    it('it should UPDATE a user given the id', done => {
      chai.request(server)
        .post('/api/users')
        .send(user)
        .end((err, res) => {
          let testId = res.body.id;
          chai.request(server)
              .put(`/api/users/${testId}`)
              .send(testUser)
              .end((err, res) => {
                res.should.have.status(successCode);
                res.body.should.be.a('object');
                res.body.should.have.property('id').eql(testId);
                res.body.should.have.property('username').eql(testUser.username);
                res.body.should.have.property('age').eql(testUser.age);;
                res.body.should.have.property('hobbies').eql(testUser.hobbies);
                done();
              });
        });
    });
  });
  /*
  * Test for /DELETE:id
  */
  describe('/DELETE/:id user', () => {
    it('it should DELETE a user given the id', done => {
      chai.request(server)
        .post('/api/users')
        .send(user)
        .end((err, res) => {
          let testId = res.body.id;
          console.log(testId)
          chai.request(server)
              .delete(`/api/users/${testId}`)
              .end((err, res) => {
                res.should.have.status(deleteCode);
                done();
              });
        });
    });
  });
});
