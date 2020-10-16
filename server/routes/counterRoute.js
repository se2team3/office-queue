// import modules
const express = require('express');
// import validators
const {validator, countersValidation} = require('../validators/validator');
// import models
const counters = require('../models/counterModel');

const router = express.Router();

//TODO - jsdoc's style comment
router.post('/xxx', countersValidation.checkSomething(), validator, async (req, res) => {
    /* async DB operation (on counters object) */
    return res.end();
});

module.exports = router;