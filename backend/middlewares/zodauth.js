const zod = require("zod");
const authzod = zod.object({
    username:zod.string().email(),
    firstname:zod.string(),
    lastname:zod.string(),
    password:zod.string().min(6)
})

exports.zodauthmiddleware = (req,res,next)=>{
      const username = req.body.username;
      const firstname = req.body.firstname;
      const lastname = req.body.lastname;
      const password = req.body.password;

      const ifauth = authzod.safeParse({
        username:username,
        firstname:firstname,
        lastname:lastname,
        password:password
      })

      if(ifauth.success==true){
        next();
      }

      else{
        return res.status(411).json({
            "message":"Email already taken/Incorrect inputs"
        })
      }
}


