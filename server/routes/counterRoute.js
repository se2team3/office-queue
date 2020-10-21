// import modules
const express = require('express');
// import validators
const {validator, countersValidation} = require('../validators/validator');
// import models
const counters = require('../models/counterModel');
const counter_operation = require('../models/counter_operationsModel');
const operations = require('../models/operationModel');

const router = express.Router();


/**
 * GET
 * BODY: <empty>
 * RESPONSE BODY: counters list in json
 * RESPONSE CODE: 200 all ok or 500 server
 */
router.get('/counters', (req, res) => {
    counters.getCounters()
        .then((counters) => {
            res.json(counters);
        })
        .catch((err) => {
            res.status(500).json({
                errors: [{'msg': err}],
            });
        });
});

/**
 * GET
 * BODY: <empty>
 * PARAM: counter_id
 * RESPONSE BODY: counters list in json
 * RESPONSE CODE: 200 all ok, 404 not found or 500 server
 */
router.get('/counters/:counter_id', async (req, res) => {
    const counterId = req.params.counter_id;
    console.log(counterId);
    if (!await counters.hasCounter(counterId))
        return res.status(404).end();
    const operations = await counters.getCounter(counterId);
    return res.status(200).json({
        id: counterId,
        operations: [...operations],
    });
});

/**
 * POST
 * BODY: {id}
 * RESPONSE BODY: <empty>
 * RESPONSE CODE: 201 Created or 303 See Other if resource already exists
 */
router.post(`/counters`, countersValidation.checkCounter(), validator, async(req, res) => {
    const newCounter = {...req.body};
    if (await counters.retrieveCounter(newCounter) !== null)
        return res.status(303).end();
    await counters.insertCounter(newCounter);
    return res.status(201).end();
});

/**
 * DELETE
 * BODY: <empty>
 * RESPONSE BODY: <empty>
 * RESPONSE CODE: 204 Deleted or 500 internal server error
 */
router.delete('/counter/:counter_id', async (req,res) => {
    try{
        await counter_operation.deleteOperationsByCounter(req.params.counter_id);
        await counters.deleteCounter(req.params.counter_id);
        res.status(204).end();
    }
    catch(err){
        res.status(500).json({
            errors: [{'param': 'Server', 'msg': err}],
        })
    }
});

module.exports = router;
