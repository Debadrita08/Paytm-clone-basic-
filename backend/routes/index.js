const express = require("express")
const router = express.Router();
const userRouter = require("./user");
const AccountRouter = require("./account");

router.use("/user",userRouter);
router.use("/account",AccountRouter);





module.exports=router