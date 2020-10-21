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
 * BODY: {code (of the requested operation)}
 * RESPONSE BODY: {type, numberInQueue}
 * RESPONSE CODE: 201 Created on success, 404 Not Found if operationType not present, 500 Internal Server Error on db error
 */
router.post(`/createRequest`, async(req, res) => {
    const operationID = req.body.code;
    if (operationID === null || !await operations.hasOperation(operationID))
        return res.status(404).end();

    const ticketID = await queue.addCustomer(operationID);
    if (!ticketID)
        return res.status(500).end();

    return res.status(201).json({
        "code": operationID,
        "number": ticketID
    });
});


module.exports = router;