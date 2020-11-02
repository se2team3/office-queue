//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const chaiHttp = require("chai-http")

const chai = require('chai');
const server = require('../index'); 
const should = chai.should();
chai.use(chaiHttp);
const expect = chai.expect;


/*describe('counterModels', () => {
    beforeEach((done) => { //Before each test we empty the database
        counterModel.deleteCounter({}, (err) => {
           done();
        });
    });
/*
  * Test the /GET route
  */
 describe('/GET counter with ID', () => {
    it('it should GET counter with ID specified',  (done)=>{
        

     chai.request(server).get('/api/counters/1')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });

          
    });
});

//});