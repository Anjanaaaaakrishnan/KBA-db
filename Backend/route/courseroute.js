import { Router } from "express";
import {course} from "./adminroute.js";
import Course from "../Models/courseModel.js";
import sharp from 'sharp';

const user=Router()



user.get("/getAllcourses",async(req,res) => {
    try{
        const allcourses=await Course.find();
// res.status(200).json(Object.fromEntries(course))
res.status(200).json(allcourses)
    }
    catch(error){
        console.error(error);
        res.status(500).json("Internal sever error")
    }
})

user.get('/getCourseImage', async (req, res) => {
    try {
        const CourseName = req.query.CourseName;
        if (!CourseName) {
            return res.status(400).json({
                msg: "CourseName query parameter required"
            });
        }

        const result = await Course.findOne({ courseName: CourseName });
        if (!result) {
            return res.status(404).json({
                msg: "Course not found"
            });
        }

        if (!result.image) {
            return res.status(404).json({
                msg: "Image not found for this course"
            });
        }

        const imageBuffer = Buffer.from(result.image, "base64");
        const compressedImage = await sharp(imageBuffer).resize({ width: 300 }).jpeg({ quality: 70 }).toBuffer();
        res.set({
            "Content-Type": "image/png",
        });

        res.send(compressedImage);
        // res.status(200).json({ result })

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server error" })
    }
})

user.get("/getCourseByName",async (req,res)=>{
    try{
        console.log(req.query);

        const key=req.query.CourseName;

        try{
            const result= await Course.findOne({courseName:key});
            if(result){
                res.status(200).json(result)
            }
            else{
                res.status(400).json({msg:"Course Not Found"})

            }
        }
        catch(error){
                res.status(400).json({msg:"Something Went Wrong", error:error.message})

        }
        
    }
    catch{
                res.status(500).json({msg:"Internal Servor Error"})

    }
})



//using CourseType

user.get("/getCourseByType",(req,res)=>{
    try{
        console.log(req.query);

        const key=req.query.CourseName;

        try{
            const result=course.get(key.CourseType);
            console.log(result);
            
            if(result){
                res.status(200).json({result})
            }
            else{
                res.status(400).json({msg:"Course Not Found"})

            }
        }
        catch{
                res.status(400).json({msg:"Something Went Wrong"})

        }
        
    }
    catch{
                res.status(500).json({msg:"Internal Servor Error"})

    }
})

//using params

user.get("/getCourseByName/:name",(req,res)=>{
    try{
        console.log(req.params);

        const key=req.params.name;

        try{
            const result=course.get(key);
            if(result){
                res.status(200).json(result)
            }
            else{
                res.status(400).json({msg:"Course Not Found"})

            }
        }
        catch{
                res.status(400).json({msg:"Something Went Wrong"})

        }
        
    }
    catch{
                res.status(500).json({msg:"Internal Servor Error"})

    }
})



export {user}
