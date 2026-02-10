import jwt from "jsonwebtoken";

function authenticate(req,res,next){
    const cookie =req.headers.cookie;
    console.log(cookie);
    if(cookie){
        const[name,token]=cookie.trim().split('=')
        console.log("name",name);
        console.log("Token",token);
        if(name=='authToken'){
            const decode=jwt.verify(token,process.env.SECRET_KEY)
            console.log(decode);
            req.name=decode.UserName
            req.role=decode.UserRole
            next();
        }
        else{
            res.status(401).json({msg:"Unauthorised access"})
        }
        }
    }
export {authenticate}