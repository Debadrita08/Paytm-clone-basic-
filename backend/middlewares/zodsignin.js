const zod = require("zod");

const zodsignin = zod.object({
    username:zod.string().email(),
    password:zod.string().min(6)
})

exports.zodsigninmiddleware = (req,res,next)=>{
    const username = req.body.username;
    const password = req.body.password;

    const ifexists = zodsignin.safeParse({
        username:username,
        password:password
    })
  
    if(ifexists.success==true){
        next();
    }
    else{
        return res.status(411).json({
            "message":"Error while logging in"
        })
    }
}
