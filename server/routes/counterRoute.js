// import modules
const express = require('express');
// import validators
const {validator, countersValidation} = require('../validators/validator');
// import models
const counters = require('../models/counterModel');

const router = express.Router();

const log = async(req, res, next) => {
    console.log(req);
    next();
}

/**
 * POST
 * BODY: {description}
 * RESPONSE: 201 Created    // TODO - check for duplicates (maybe 303 See Other)
 */
router.post(`/operations/insert`, log, countersValidation.checkOperation(), validator, async(req, res) => {
    await counters.insertOperations(req.body.description);
    return res.status(201).end();
});

/**
 * POST
 * BODY: {id}
 * RESPONSE: 201 Created    // TODO - check for duplicates (maybe 303 See Other)
 */
router.post(`/counters/insert`, log, countersValidation.checkCounter(), validator, async(req, res) => {
    await counters.insertCounters(req.body.id);
    return res.status(201).end();
});

module.exports = router;