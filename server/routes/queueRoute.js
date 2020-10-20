// import modules
const express = require('express');
// import validators
const {validator, queueValidation} = require('../validators/validator');
// import models
const queue = require('../models/queueModel');
const operations = require('../models/operationModel');

const router = express.Router();

/**
 * POST
 * BODY: {name (of the requested operation)}
 * RESPONSE BODY: {type, numberInQueue}
 * RESPONSE CODE: 201 Created on success, 404 Not Found if operationType not present, 500 Internal Server Error on db error
 */
router.post(`/createRequest`, async(req, res) => {
    /* const newRequest = {...req.body};
    const operationID = await operations.retrieveOperation(newRequest); */
    const operationID = req.body.code;
    if (operationID === null)
        return res.status(404).end();

    let numberInQueue = await queue.getTicketNumber(operationID);

    const ticketID = await queue.addCustomer(operationID, ++numberInQueue);
    if (!ticketID)
        return res.status(500).end();

    return res.status(201).json({
        "code": operationID,
        "number": numberInQueue
    });
    return {code: 'A', number: 43};
});


module.exports = router;