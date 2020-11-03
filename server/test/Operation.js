const operationModel = require('../models/operationModel');

const chai = require('chai');
let server;
const should = chai.should();
const sinon = require('sinon');
const chaiHttp = require("chai-http");
const middleware = require('../validators/validator');

chai.use(chaiHttp);

describe('Operations - CRUD functions', function() {
    before('stub validator', async function() {
        // TODO - not working
        sinon.stub(middleware, 'validator').callsFake((req, res, next) => next());
        server = require('../index');
    });

    beforeEach('clear Operations table', async function() {
        await operationModel.resetOperations();
    });

    describe('/GET operations', function() {
        it('should respond with an empty list of operations', async function() {
            // TODO - try catch block here?
            const res = await chai.request(server).get(`/api/operations`);
            should.exist(res);
            res.should.have.status(200);
            res.body.should.be.an('array');
            res.body.length.should.be.eql(0);
        });

        it('should respond with a list of operations', async function() {
            const operations = new Array(10)
                .fill('')
                .map((op, idx) => ({
                    code: `OP${idx}`, name: `Operation #${idx}`
                }));
            // insert operations into test db
            await Promise.all(
                operations.map(op => operationModel.insertOperation(op))
            );
            const res = await chai.request(server).get(`/api/operations`);
            should.exist(res);
            res.should.have.status(200);
            res.body.should.be.an('array');
            res.body.length.should.be.eql(10);
            const GET_operations = operations.map(
                op => Object.assign(op, {counters: [], description: ""})
            );
            res.body.should.have.deep.members(GET_operations);
        });
    });

    describe('/POST operation', function() {
        it('should return with 201 Created status', async function() {
            const operation = {code: `OP1`, name: `Operation #1`, counters: []};
            const res = await chai.request(server).post(`/api/operations`).send(operation);
            should.exist(res);
            res.should.have.status(201);
            res.body.should.be.a('number').above(0);
        });

        it('should return with 303 See Other status', async function() {
            const operation = {code: `OP1`, name: `Operation #1`, counters: []};
            await operationModel.insertOperation(operation);
            const res = await chai.request(server).post(`/api/operations`).send(operation);
            should.exist(res);
            res.should.have.status(303);
            res.body.should.be.empty;
        });
    });

    describe('/PUT operation', function() {
        it('should update operation', async function() {
            const operation = {code: `OP1`, name: `Operation #1`, counters: []};
            await operationModel.insertOperation(operation);
            const update = {code: `OP1`, name: `Updated operation #1`, counters: [], description: "desc"};
            const res = await chai.request(server).put(`/api/operation/${operation.code}`).send(update);
            should.exist(res);
            res.should.have.status(200);
            res.body.should.be.empty;
        });

        it('should return 400 on missing code', async function() {
            const operation = {code: `OP1`, name: `Operation #1`, counters: []};
            await operationModel.insertOperation(operation);
            const update = {/*code: `OP1`,*/name: `Updated operation #1`, counters: [], description: "desc"};
            const res = await chai.request(server).put(`/api/operation/${operation.code}`).send(update);
            should.exist(res);
            res.should.have.status(400);
        });

        it('should return 404 on not existing code', async function() {
            const update = {code: `OP1`, name: `Updated operation #1`, counters: [], description: "desc"};
            const res = await chai.request(server).put(`/api/operation/OP1`).send(update);
            should.exist(res);
            res.should.have.status(404);
        });
    });

    describe('/DELETE operation', async function() {
        it('should return 200 on correctly deleted operation', async function() {
            const operation = {code: `OP1`, name: `Updated operation #1`, counters: [], description: "desc"};
            await operationModel.insertOperation(operation);
            const res = await chai.request(server).delete(`/api/operation/OP1`);
            should.exist(res);
            res.should.have.status(204);
        });
    });

    after('clear Operations table', async function() {
        await operationModel.resetOperations();
    });
});