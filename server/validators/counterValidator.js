// import modules
const { body } = require('express-validator');

const checkCounter = () => {
    return [
        body('id').isInt({min: 0, allow_leading_zeroes: false})
    ];
};

module.exports = { checkCounter };