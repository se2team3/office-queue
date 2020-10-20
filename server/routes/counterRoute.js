// import modules
const express = require('express');
// import validators
const {validator, countersValidation} = require('../validators/validator');
// import models
const counters = require('../models/counterModel');
const operations = require('../models/operationModel');

const router = express.Router();

/**
 * POST
 * BODY: {id}
 * RESPONSE BODY: <empty>
 * RESPONSE CODE: 201 Created or 303 See Other if resource already exists
 */
router.post(`/counter`, countersValidation.checkCounter(), validator, async(req, res) => {
    const newCounter = {...req.body};
    if (await counters.retrieveCounter(newCounter) !== null)
        return res.status(303).end();
    await counters.insertCounter(newCounter);
    return res.status(201).end();
});

module.exports = router;

/**
 * DELETE
 * BODY: <empty>
 * RESPONSE BODY: <empty>
 * RESPONSE CODE: 204 Deleted or 500 internal server error
 */
router.delete('/counter/:counter_id', async (req,res) => {
    try{
        await operations.deleteOperationsByCounter(req.params.counter_id);
        await counters.deleteCounter(req.params.counter_id);
        res.status(204).end();
    }
    catch(err){
        res.status(500).json({
            errors: [{'param': 'Server', 'msg': err}],
        })
    }
});