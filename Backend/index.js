import express, { json } from "express";
import dotenv from "dotenv";
import { route } from "./route/userroute.js";
import { admin } from "./route/adminroute.js";
import { authenticate } from "./Middleware/auth.js";
import  admincheck  from "./Middleware/admin.js";
import { user } from "./route/courseroute.js";
import mongoose from 'mongoose';


dotenv.config()
const app=express();
app.use(json())
app.use("/user",route)
app.use("/admin",authenticate,admincheck,admin)
app.use("/",user)


// const port=8000
// app.listen(port,() =>{
//     console.log(`port ${port }`);
    
// })
const mongodbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/KBA-COURSE"
mongoose.connect(mongodbURI).then(() => {
    console.log("MongoDB connected")
}).catch((err) => {
    console.log("MongoDB connection error:", err)
})


app.get("/", (req, res) => {
  res.send(` <h1 style= background-color:pink;text-align:center; color: green; font-size: 3rem;>Welcome to our site</h1>`);});

app.get("/homepage",(req,res) => {
  res.send("Welcome to homepage");
});

app.get("/aboutus",(req,res) => {
  res.send("About my page");
});

app.get("/contactus",(req,res) => {
  res.send("For more information");
});

app.listen(process.env.port,() =>{
    console.log(`Server is running at ${process.env.port }`);
    
})


