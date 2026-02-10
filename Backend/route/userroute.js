import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";


const route=Router()
const user=new Map()
route.post("/user",(req,res)=>{
    res.send(welcome)
})


route.post('/signup', async (req, res) => {

    // const details = req.body
    // console.log(details.FirstName);
    try {
        const { FirstName, LastName, UserName, Password, UserRole } = req.body
        console.log(FirstName);
        try {
            const newPassword = await bcrypt.hash(Password, 10)
            console.log(newPassword);
            // const result = user.get(UserName)
            const result = await User.findOne({ userName: UserName })
            console.log(result);

            if (result) {
               
                res.status(400).send("Username already exist")
            }
            else {
                // user.set(UserName, { FirstName, LastName, newPassword, UserRole })
                const newUser = new User({
                    firstName: FirstName,
                    lastName: LastName,
                    userName: UserName,
                    password: newPassword,
                    userRole: UserRole
                });
                await newUser.save();
                // res.status(201).json({msg:'Successfullly created'});
                res.status(201).send('Successfully created');
            }
        }
        catch {
            res.status(404).json({ msg: "Something went wrong " })
        }
    }
    catch {
        res.status(500).send(error)
    }
})




route.post("/login",async (req,res)=>{
  const {UserName,Password} = req.body
  console.log(UserName)
  //  console.log(Password)
    
  // const result=user.get(UserName)

   const result = await User.findOne({ userName: UserName })
  if(!result){
    res.status(404).json({msg:"UserName not registered"})
  }
 console.log(result.Password)
  
  const valid=await bcrypt.compare(Password,result.password)
  console.log(valid);

  if(valid){
    const token=jwt.sign({UserName,UserRole:result.userRole},process.env.SECRET_KEY,{expiresIn:'1hr'})
    console.log(token);
    if(token){
      res.cookie('authToken',token,{
        httpOnly:true
      })
      res.json({msg:"Successfully loggedin"})
    }
    else{
      res.json({msg:"Something wrong in token generation"})
    }
  }
  
})

// route.post('/login1',async(req,res)=>{
//     const {UserName,Password} = req.body
//     const result = user.get(UserName)
//     if(!result){
//         res.status(404).json({msg:'UserName not registered'})
//     }
//     const valid =await bcrypt.compare(Password,result.newPassword)
//     console.log(valid);
//     res.status(200).send("signed up successfully")
// })


// route.post("/signup",(req,res) => {
// try{
//      const{username,password,email}=req.body;
// console.log(username);


// console.log(password);


// res.send("Successfully Signup");
// // res.send("Successfully signup");

// }
// catch{
//     res.send("error")

// }
// })

// route.post("/login",(req,res)=>{
//     try{
//         const{username,password}=req.body;
//         console.log(username)
//         if (!username || !password) {
//       return res.send("Username and password required");
//     }
//        res.send("Welcome to the loginpage");

//     }
//     catch{
//      res.send("error")
//     }
// })





route.get("/contact",(req,res) => {
  res.send("For more information");
});

route.get("/about",(req,res) => {
  res.send("About the page");
});

export{route}

