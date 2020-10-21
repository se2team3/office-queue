const express = require('express');
const queue = require('../models/queueModel');
const router = express.Router();

router.get('/lastCustomers',async (req,res)=>{
    const list = await queue.getLastCustomers();
    res.json(list);
    return res.status(200).end();
})

module.exports = router;