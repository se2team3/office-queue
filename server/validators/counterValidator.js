// import modules
const { body } = require('express-validator');

const checkOperation = () => {
    return [
        body('code').isAlphanumeric().isLength({min:1, max:5}),
        body('name').isLength({min:1, max:255}),
        body('description').optional().isLength({min: 0, max: 255})
    ];
};

const checkCounter = () => {
    return [
        body('id').isInt({min: 0, allow_leading_zeroes: false})
    ];
};

module.exports = { checkOperation, checkCounter };