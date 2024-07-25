const express = require("express");
const zod = require("zod");
const router = express.Router();
const { zodauthmiddleware } = require( "../middlewares/zodauth");
const {zodsigninmiddleware} = require("../middlewares/zodsignin");
const {authmiddleware} = require("../middlewares/Authmiddleware");
const {JWT_SECRET} = require("./config");
const {User,Account} = require("../db");
const jwt = require("jsonwebtoken");

router.post("/signup",zodauthmiddleware,async function(req,res){
    const username = req.body.username;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const password = req.body.password;

     const ifexists = await User.findOne({
       username:username
     })
     if(ifexists){
        return res.status(411).json({
            "message":"Email already taken/Incorrect inputs"
        })
     }

     const user = await User.create({
        username : username,
        firstname:firstname,
        lastname:lastname,
        password:password
     })

     const userId = user._id;
     const useraccount = await Account.create({
        userId:userId,
        balance: 1 + Math.random()*10000
     })
     const token = jwt.sign({userId},JWT_SECRET);

     res.json({
        "message" : "User created successfully",
        token:token
     })

   

})

router.post("/signin",zodsigninmiddleware,async function(req,res){
    const username = req.body.username;
    const password = req.body.password;
  

    const ifexists = await User.findOne({
        username:username,
        password:password
    })
 
    if(!ifexists){
        return res.status(411).json({
            "message":"Error while logging in"
        })
    }

    const userId = ifexists._id;
    const token = jwt.sign({userId},JWT_SECRET);

    res.json({
        token:token
    })

       



})

const zodbody = zod.object({
 password:zod.string().min(6),
 firstname:zod.string(),
 lastname:zod.string()  
})
router.put("/",authmiddleware,async function(req,res){
const ifexists = zodbody.safeParse(req.body);
if(ifexists.success!=true){
    return res.status(411).json({
       
            message: "Error while updating information"
        
    })

    
}

      await User.updateOne({_id : req.userId},req.body)
    
     res.json({
        message:"Updated successfully"
     })

})

router.get("/bulk",authmiddleware,async function(req,res){
    const filter = req.query.filter || " ";
    
    
    if(filter!=" "){
    const users = await User.find({
      $or:  [
            {firstname :{
                "$regex": new RegExp(filter,"i")
            }},
            {lastname :{
                "$regex":new RegExp(filter,"i")
            }}
        ]
    })

    res.json({
        user:users.map(user =>(
            {
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                _id:user._id

            }
        )
        )
    })
}
else{
    const users = await User.find({});
    //const {id} = req.query;
    const finalusers = users.filter(user =>
        user._id != req.userId
    )
    //console.log(req.userId);
    //const finalUsers = await User.find({ _id: { $ne: id } });
    console.log(req.userId);
      
    console.log(finalusers);
    
    res.json({
        user:finalusers.map(user =>(
            {   
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                _id:user._id
            

            }
        )
        )
    })

}

})
router.post("/me",authmiddleware, async(req,res)=>{
 const user = await User.findOne({_id:req.userId});
 if(!user){
    return res.status(411).json({
        "message":"Error"
    })
 }
 return res.json({
    firstname:user.firstname,
    lastname:user.lastname,
    id:user._id
 })
})

module.exports=router;