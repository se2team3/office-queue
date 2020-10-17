// import modules
const express = require('express');
// import validators
const {validator, countersValidation} = require('../validators/validator');
// import models
const counters = require('../models/counterModel');

const router = express.Router();

/**
 * Route serving login form.
 * @name post/insert
 * @function
 * @param {string} path - Express path
 * @params {callback} Validator rules - Express middleware.
 * @param {callback} Validator middleware - Express middleware.
 * @param {callback} Callback middleware - Express middleware.
 */
router.post('/insert', countersValidation.checkOperation(), validator, insertOperation);


/* ------------------------ */
/**
 *
 * @function
 * @param req {Object} The request.
 * @param res {Object} The response.
 * @param req.body {Object} The JSON payload.
 * @param req.body.description {String} The Operation Description value
 * @return {}
 */
const insertOperation = async(req, res) => {
    const id = 1;
    const description = "SPID";
    //await counters.insertOperations(id, description);

    return res.end();
};

module.exports = router;