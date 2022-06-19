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
  const id = '3',
    successCode = 200,
    user = {
      username: 'Kiryl',
      age: 22,
      hobbies: ['frontEnd', 'backEnd'],
    },
    testName = 'Cannon EOS 80D DSLR Camera',
    testPrice = { title: 'hello', price: '778' };

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
  describe('/GET/:id user', () => {
    it('it should GET a book by the given id', done => {
      chai.request(server)
        .get(`/api/users/${id}`)
        .end((err, res) => {
          res.should.have.status(successCode);
          res.body.should.be.a('object');
          res.body.should.have.property('id').eql(id);
          res.body.should.have.property('description');
          res.body.should.have.property('price');
          res.body.should.have.property('name').eql(testName);
          done();
        });
    });
  });
  /*
  * Test for /PUT:id
  */
  describe('/PUT/:id product', () => {
    it('it should UPDATE a product given the id', done => {
      chai.request(server)
        .put(`/api/products/${id}`)
        .send(testPrice)
        .end((err, res) => {
          res.should.have.status(successCode);
          res.body.should.be.a('object');
          res.body.should.have.property('id').eql(id);
          res.body.should.have.property('name').eql(testName);
          res.body.should.have.property('description');
          res.body.should.have.property('price').eql(testPrice.price);
          done();
        });
    });
  });
  /*
  * Test for /DELETE:id
  */
  describe('/DELETE/:id product', () => {
    it('it should DELETE a product given the id', done => {
      chai.request(server)
        .delete(`/api/products/${id}`)
        .end((err, res) => {
          res.should.have.status(successCode);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql(`Product ${id} removed`);
          done();
        });
    });
  });
});
