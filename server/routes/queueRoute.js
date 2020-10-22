// import modules
const express = require('express');
// import validators
const {validator, queueValidation} = require('../validators/validator');
// import models
const queue = require('../models/queueModel');
const operations = require('../models/operationModel');

const router = express.Router();

// TODO - missing validation
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

    const ticketNumber = await queue.getNextTicket(operationID);
    console.log(`ticketNumber = ${ticketNumber}`);
    await queue.addCustomer(operationID, ticketNumber);

    return res.status(201).json({
        "code": operationID,
        "number": ticketNumber
    });
});

// TODO - missing validation
/**
 * PUT
 * BODY: <counterId>
 * RESPONSE BODY: 
 * RESPONSE CODE: 200 all ok or 204 no content
 */
router.put(`/callNextCustomer`,async (req,res)=>{
    const counterID = req.body.counterId;
    const next = await queue.whoIsNextCustomer(counterID);
    if (!next)
        return res.send(204).end();
    await queue.callNextCustomer(counterID, next["ID"]);
    res.status(200).json({
        "code": next["request_type"],
        "number": next["ticket_number"],
    });
})

 router.get('/lastCustomers',async (req,res)=>{
    const list = await queue.getLastCustomers();
    console.log(list)
    res.json(list);
    return res.status(200).end();
})

module.exports = router;