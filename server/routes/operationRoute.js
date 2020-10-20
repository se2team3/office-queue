// import modules
const express = require('express');
// import validators
const {validator, operationsValidation} = require('../validators/validator');
// import models
const operations = require('../models/operationModel');

const router = express.Router();

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