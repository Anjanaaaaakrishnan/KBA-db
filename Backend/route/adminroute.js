import { json, Router } from "express";
import Course from "../Models/courseModel.js";
import upload from "../Middleware/upload.js"

const admin = Router()
const course = new Map()
const carts=new Map()

admin.post("/addcourse",async (req, res) => {
    try {
        const { CourseName, CourseId, CourseType, Description, Price } = req.body
        // if (course.get(CourseName)) {
        console.log(CourseName)

        if (await Course.findOne({ courseName: CourseName })){

        
            res.status(400).json({ msg: "Course already exist" })
        }
        else {
           
            
                const newCourse = new Course({
                    courseName: CourseName,
                    courseId: CourseId,
                    courseType: CourseType,
                    description: Description,
                    price: Number(Price)
                });

                await newCourse.save();

                res.status(201).json({ msg: "Course successfully entered" })
            }}
            catch(error) {
                console.error(error);
                res.status(201).json({ msg: "something went wrong" })

            }     
        
    })


  
            




    admin.post("/addcoursewithimage",upload.single('courseimage'),async (req, res) => {
    try {
        const { CourseName, CourseId, CourseType, Description, Price } = req.body
        // if (course.get(CourseName)) {
        console.log(CourseName)

        if (await Course.findOne({ courseName: CourseName })){

        
            res.status(400).json({ msg: "Course already exist" })
        }
        else {
             let imageBase64 = null;
      if (req.file) {
        imageBase64 = req.file.buffer.toString('base64');
      }
            
                const newCourse = new Course({
                    courseName: CourseName,
                    courseId: CourseId,
                    courseType: CourseType,
                    description: Description,
                    price: Number(Price),
                     image: imageBase64

                });

                await newCourse.save();

                res.status(201).json({ msg: "Course successfully entered" })
            }}
            catch(error) {
                console.error(error);
                res.status(201).json({ msg: "something went wrong added image" })

            }     
        
    })






admin.post("/addcart", (req, res) => {
    try {
        const { CourseName, Price } = req.body;
        const UserName = req.name

        if (!CourseName || !Price || !UserName) {
            return res.status(400).json({ msg: "CourseName and price are required" })
        }

        if (!carts.has(UserName)) {
            carts.set(UserName, new Map());
        }

        const UserCart = carts.get(UserName);

        if (UserCart.has(CourseName)) {
            const item = UserCart.get(CourseName);
            item.quantity += 1;
            UserCart.set(CourseName, item);
        }
        else {
            UserCart.set(CourseName, { CourseName, Price, quantity: 1 });

        }
        res.status(200).json({ msg: "item added to cart",

        cart: Object.fromEntries(UserCart)
    });

        } catch (error) {
    res.status(500).json({ msg: "Something went wrong" })
}
        });





admin.put("/UpdateCourse",async (req, res) => {
    try {
        const { CourseName, CourseId, CourseType, Description, Price } = req.body

        // if (course.get(CourseName)) {
            // course.set(CourseName, { CourseId, CourseType, Description, Price });
            if (await Course.findOne({ courseName: CourseName })) {
          
                await Course.updateOne({ courseName: CourseName }, {
        courseId: CourseId,
        courseType: CourseType,
        description: Description,
        price: Number(Price)
      });
            res.status(200).json({ msg: "Course successfully Updated" })

        }
        else {

            res.status(404).json({ msg: "Course not found" })
        }
    }
    catch {
        res.status(201).json({ msg: "error" })
    }
})



admin.patch('/:courseName', async (req, res) => {
    try {
        const student = await Course.findOne({ courseName: req.params.courseName});
        console.log(student);
        if (!student) {
            return res.status(404).json({ error: 'Course not found' });
        }
        if (req.body.courseName !== undefined) student.courseName = req.body.courseName;
        if (req.body.courseId !== undefined) student.courseId = req.body.courseId;
        if (req.body.courseType !== undefined) student.courseType = req.body.courseType;
        if (req.body.description !== undefined) student.description = req.body.description;
        if(req.body.price !== undefined) student.price = req.body.price;

        await student.save();
        res.json(student);
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(400).json({ error: 'Bad Request' });
    }
});



admin.delete("/:CourseName", async (req, res) => {

    try {
        const { CourseName } = req.params.CourseName;

        const result = await Course.findOne({ courseName: CourseName });

        if (result) {
            await Course.deleteOne({ courseName: CourseName });

            res.status(200).json({ msg: "Course deleted" })

        }
        else {

            res.status(404).json({ msg: "course not found" })

        }
    }
    catch {
        res.status(500).json({ msg: "error" })
    }
})











export { course, admin }