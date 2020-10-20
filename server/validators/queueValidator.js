// import modules
const { body } = require('express-validator');

const checkRequest = () => {
    return [
        body('name').isLength({min:1, max:255}),
    ];
};

module.exports = { checkRequest };