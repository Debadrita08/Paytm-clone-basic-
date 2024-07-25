const mongoose = require("mongoose");
//your mongodb url
mongoose.connect(" ");

const Userschema = new mongoose.Schema({
    username:String,
    firstname:String,
    lastname:String,
    password:String
    
})
const BankSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})

const User = mongoose.model("User",Userschema);
const Account = mongoose.model("Account",BankSchema);

module.exports = {
    User,Account
}


