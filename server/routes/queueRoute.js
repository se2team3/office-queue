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
 * RESPONSE CODE: 200 all ok or 500 server
 */
router.put(`/callNextCustomer`,(req,res)=>{
    queue.callNextCustomer(req.body.counterId)
    .then(_ => res.status(200).end())
    .catch((err)=>{
        res.status(400).json({
            errors:[{'msg':err}]
        });
    });
 })

 router.get('/lastCustomers',async (req,res)=>{
    const list = await queue.getLastCustomers();
    res.json(list.map(l => ({
        timeServed: l["time_served"],
        Counter: l["counter"],
        Customer: l["request_type"] + l["ticket_number"],
    })));
    return res.status(200).end();
})

module.exports = router;