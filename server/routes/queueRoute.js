// import modules
const express = require('express');
// import validators
const {validator} = require('../validators/validator');
// import models
const queue = require('../models/queueModel');
const counter = require('../models/counterModel');

const router = express.Router();

/**
 * POST
 * BODY: {operationType}
 * RESPONSE BODY: {type, numberInQueue}
 * RESPONSE CODE: 201 Created on success, 404 Not Found if operationType not present, 500 Internal Server Error on db error
 */
router.post(`/createRequest`, async(req, res) => {
    const operationID = await counter.retrieveOperations(req.body.description);
    if (operationID === null)
        return res.status(404).end();

    let numberInQueue = await queue.peopleWaiting(operationID);

    const ticketID = await queue.addCustomer(operationID);
    if (!ticketID)
        return res.status(500).end();

    return res.status(201).json({
        "type": operationID,
        "numberInQueue": ++numberInQueue
    });
});


module.exports = router;