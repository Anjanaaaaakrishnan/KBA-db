import { Schema } from "mongoose";
import { model } from "mongoose";

const courseSchema = new Schema({
    courseName: { type: String, unique: true },
    courseId: String,
    courseType: String,
    description: String,
    price: Number,
    image: String
});

const Course = model("courses", courseSchema);

export default Course;