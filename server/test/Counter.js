//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let db= require("../models/index")
let counterModel= require("../models/counterModel")


let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../routes/counterRoute');
let should = chai.should();

chai.use(chaiHttp);

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
    it('it should GET counter with ID specified', async ()=>{
     result=await chai.request(server).get('/counters/1')
     result.should.have.status(200);     
     /*.then((err, res) => {
        
        
    done();
  });*/
          
    });
});

//});