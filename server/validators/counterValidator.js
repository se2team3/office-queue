// import modules
const { body } = require('express-validator');

const checkOperation = () => {
    return [
        body('description').isAscii().isLength({min: 0, max: 255})
    ];
};

const checkCounter = () => {
    return [
        body('id').isInt({min: 0, allow_leading_zeroes: false})
    ];
};

module.exports = { checkOperation, checkCounter };