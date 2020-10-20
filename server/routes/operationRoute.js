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
router.post(`/createOperation`, operationsValidation.checkOperation(), validator, async(req, res) => {
    const newOperation = {...req.body};
    if (await operations.retrieveOperation(newOperation) !== null)
        return res.status(303).end();
    await operations.insertOperation(newOperation);
    return res.status(201).end();
});

module.exports = router;