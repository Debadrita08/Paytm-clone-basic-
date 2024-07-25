const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../routes/config");
exports.authmiddleware = (req,res,next)=>{
    const auth = req.headers.authorization;
    if(!auth || !auth.startsWith("Bearer ")){
        return res.status(411).json({})
    }

    const doc = auth.split(" ")[1];

    try{
        const document = jwt.verify(doc,JWT_SECRET);
        if(document.userId){
            req.userId = document.userId;
            next();
        }
        else{
            return res.status(411).json({
                "message":"Error"
            })
        }
    }
    catch(err){
      return res.status(411).json({
        "message":err
      })
    }
}