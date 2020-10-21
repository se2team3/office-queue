const express = require('express');
const queue = require('../models/queueModel');
const router = express.Router();

router.get('/lastCustomers',async (req,res)=>{
    await queue.getLastCustomers().then((list)=>{
        res.json(list);
    });
    return res.status(200).end();
})

module.exports = router;