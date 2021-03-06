// import modules
const express = require('express');
// import validators
const {validator, operationsValidation} = require('../validators/validator');
// import models
const operations = require('../models/operationModel');

const router = express.Router();

/**
 * GET
 * BODY: <empty>
 * RESPONSE BODY: operations list in json
 * RESPONSE CODE: 200 all ok or 500 server
 */
router.get('/operations', (req, res) => {
    operations.getOperations()
        .then((operations) => {
            res.json(operations);
        })
        .catch((err) => {
            res.status(500).json({
                errors: [{'msg': err}],
            });
        });
});

/**
 * POST
 * BODY: {code, name, description}
 * RESPONSE BODY: <empty>
 * RESPONSE CODE: 201 Created or 303 See Other if resource already exists
 */
router.post(`/operations`, operationsValidation.checkOperation(), validator, async(req, res) => {
    const newOperation = {...req.body};
    if (await operations.retrieveOperation(newOperation) !== null)
        return res.status(303).end();
    let jsonObj = await operations.insertOperation(newOperation);
    return res.status(201).json(jsonObj);
});

/**
 * PUT
 * BODY: {code, name, description}
 * RESPONSE BODY: <empty>
 * RESPONSE CODE: 200 Updated, 400 no id in request, 404 Not Found if operation code doesn't exist, 500 internal server error
 */
router.put('/operation/:operation_code', operationsValidation.checkOperation(), validator, async (req,res) => {
    if (!req.body.code) {
        res.status(400).end();
    }   else {
        const operation = req.body;
        const code = req.params.operation_code;
        try{
            if (!await operations.hasOperation(code))
                return res.status(404).end();
            await operations.updateOperation(code, operation);
            res.status(200).end();
        }
        catch(err){
            res.status(500).json({
                errors: [{'param': 'Server', 'msg': err}],
            })
        }
    }
});

// TODO - missing validation on parameter
/**
 * DELETE
 * BODY: <empty>
 * RESPONSE BODY: <empty>
 * RESPONSE CODE: 204 Deleted or 500 internal server error
 */
router.delete('/operation/:operation_code', async (req,res) => {
    try{
        //TODO [THIS has been done on client side, should it be done on server?] delete the many-to-many relationships related to this operation
        //await operations.deleteOperationsByCounter(req.params.counter_id);
        console.log(1);
        await operations.deleteOperation(req.params.operation_code);
        console.log(2)
        res.status(204).end();
    }
    catch(err){
        res.status(500).json({
            errors: [{'param': 'Server', 'msg': err}],
        })
    }
});

module.exports = router;