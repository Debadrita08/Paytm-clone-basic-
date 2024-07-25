const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://debadritachakraborty1912:Debadrita2024@cluster0.2pfpmes.mongodb.net/Userforpaytm?retryWrites=true&w=majority&appName=Cluster0");

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


