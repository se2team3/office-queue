// import modules
const { validationResult } = require('express-validator');

// import validation rules
const countersValidation = require('./counterValidator');
const queueValidation = require('./queueValidator');
const operationsValidation = require('./operationValidator');

// validator Middleware
const validator = (req, res, next) => {
    //console.log(req.body);
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({[err.param]: err.msg}));

    return res.status(422).json({
        errors: extractedErrors
    });
};

module.exports = { validator, countersValidation, queueValidation, operationsValidation };