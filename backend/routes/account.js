const express = require("express");
const router = express.Router();
const {authmiddleware} = require("../middlewares/Authmiddleware");
const {Account} = require("../db");
const mongoose = require("mongoose");
router.get("/balance",authmiddleware, async function(req,res){
   const val = await Account.findOne({userId:req.userId});
   if(!val){
    return res.status(411).json({
        "message":"Error while displaying the balance"
    })
   }

   res.json({
    balance: val.balance
   })

})

router.post("/transfer",authmiddleware, async function(req,res){
    const session = await mongoose.startSession();
    session.startTransaction();
    const amount = req.body.amount;
    const to = req.body.to;

const fromAccount = await Account.findOne({
    userId:req.userId
}).session(session);


if(!fromAccount || !(fromAccount.balance >= amount)){

    await session.abortTransaction();
  return res.status(411).json({
    message :"Insufficient balance / invalid account"
 })

}

const ToAccount = await Account.findOne({
    userId : to
}).session(session);

if(!ToAccount){
    await session.abortTransaction();
    return res.status(411).json({
        message:"Insufficient amount"
    })
}
await Account.updateOne({userId:req.userId},{$inc:{balance: -amount}}).session(session);
await Account.updateOne({userId:to},{$inc:{balance: amount}}).session(session);

await session.commitTransaction();

res.json({
    message: "Transfer successful"
})

})



module.exports =  router;