// import modules
const express = require('express');
// import validators
const {validator, countersValidation} = require('../validators/validator');
// import models
const counters = require('../models/counterModel');

const router = express.Router();

/**
 * POST
 * BODY: {description}
 * RESPONSE BODY: <empty>
 * RESPONSE CODE: 201 Created or 303 See Other if resource already exists
 */
router.post(`/createOperation`, countersValidation.checkOperation(), validator, async(req, res) => {
    const newOperation = {...req.body};
    if (await counters.retrieveOperation(newOperation) !== null)
        return res.status(303).end();
    await counters.insertOperation(newOperation);
    return res.status(201).end();
});

/**
 * POST
 * BODY: {id}
 * RESPONSE BODY: <empty>
 * RESPONSE CODE: 201 Created or 303 See Other if resource already exists
 */
router.post(`/createCounter`, countersValidation.checkCounter(), validator, async(req, res) => {
    const newCounter = {...req.body};
    if (await counters.retrieveCounter(newCounter) !== null)
        return res.status(303).end();
    await counters.insertCounter(newCounter);
    return res.status(201).end();
});

module.exports = router;