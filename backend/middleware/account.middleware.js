const mongoose = require('mongoose');
const Account = require('../models/accouts');

async function transfer(req,res){{

    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to} = req.body;
    console.log(to , 'to')
    const account = await Account.findOne({userId: req.userId}).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({userId: to}).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid User"
        });
    }

      // Perform the transfer
      await Account.updateOne({userId: req.userId}, { $inc : { balance : -amount }}).session(session);
      await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

      await session.commitTransaction();

      return res.json({
        message: "Transfer successful"
    });

}}

module.exports = transfer;