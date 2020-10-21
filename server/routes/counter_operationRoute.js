// import modules
const express = require('express');
// import validators
const {validator, operationsValidation} = require('../validators/validator');
// import models
const counter_operations = require('../models/counter_operationsModel');

const router = express.Router();


/**
 * POST
 * BODY: {code, name, description}
 * RESPONSE BODY: <empty>
 * RESPONSE CODE: 201 Created or 303 See Other if resource already exists
 */
router.post(`/counterOperations`, async(req, res) => {
    const {counter_id, operation_code} = {...req.body};

/*    console.log(req.body);
    console.log(req.params);
 */
    counter_operations.insertCounterOperation(counter_id,operation_code)
    .then((newOp)=> res.status(200).json({id: newOp}))
    .catch((err)=> res.status(500).json({ errors: [{ 'param': 'Server', 'msg': err }], }));
});

/**
 * PUT
 * BODY: {code, name, description}
 * RESPONSE BODY: <empty>
 * RESPONSE CODE: 200 Updated, 400 no id in request, 500 internal server error
 */
router.delete('/counterOperations/:operation_code', async (req,res) => {
    //const {counter_id, operation_code} = {...req.body};


    counter_operations.deleteCounterOperation(req.params.operation_code)
    .then((deleted)=> res.status(200).json())
    .catch((err)=> res.status(500).json({ errors: [{ 'param': 'Server', 'msg': err }], }));
});

module.exports = router;