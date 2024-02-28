const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');
const { Transfer } = require('../auth');
const mongoose = require('mongoose')

const router = express.Router()

router.get("/balance",authMiddleware,async (req,res)=>{
    const {balance} = await Account.findOne({
        userId : req.userId
    })
    res.json({
        balance:balance
    })
})

router.post("/transfer",authMiddleware,async (req,res)=>{

    const transferPayload = req.body;
    const session = await mongoose.startSession();
    session.startTransaction();

    const fromAccount = await Account.findOne({
        userId : req.userId
    }).session(session)

    if(!fromAccount || fromAccount.balance<transferPayload.amount){
        session.abortTransaction();
        res.status(400).json({
            message: "Insufficient balance"
        })
    }
    
    /* const {success} = Transfer.safeParse(transferPayload)
    if(!success){
        res.status(400).json({
            message: "Invalid account"
        })
    } */
    const toAccount = await Account.findOne({
        userId:transferPayload.to
    }).session(session)
    if(!toAccount){
        session.abortTransaction()
        res.status(400).json({
            message: "Invalid account"
        })
    }
    const amount = transferPayload.amount

    await Account.updateOne({
        userId:fromAccount.userId
    },{
        $inc : {balance:-amount}
    }).session(session)

    await Account.updateOne({
        userId:toAccount.userId
    },{
        $inc : {balance:amount}
    }).session(session)

    await session.commitTransaction()

    res.json({
        message: "Transfer successful"
    })

})

module.exports = router;