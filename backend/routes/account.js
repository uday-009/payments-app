const express = require('express');
const zod = require('zod');
const User = require('../models/user');
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config');
const authMiddleware = require('../middleware/auth.middleware');
const Account = require('../models/accouts');
const transfer = require('../middleware/account.middleware');

const router = express.Router();

router.get('/balance', authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    })

    res.json({
        balance: account?.balance
    })
});

const transferSchema = zod.object({ 
        to: zod.string(),
        amount: zod.number()
})

router.get('/transfer', authMiddleware, async (req, res) => {

    const { success } = transferSchema.safeParse(req.body);

    if(!success){
        res.json({
            message: "Invalid inputs"
        })
    }
    
    transfer(req,res);

});



module.exports = router;