const express = require('express');
const queue = require('../models/queueModel');
const router = express.Router();


const log = async(req, res, next) => {
    console.log(req);
    next();
}

router.get('/LastCustomers',log,async (req,res)=>{
    await queue.getLastCustomers().then((list)=>{
        res.json(list);
    });
    return res.status(201).end();
})

module.exports = router;