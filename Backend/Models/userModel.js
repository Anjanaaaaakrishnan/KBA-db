import { Schema } from "mongoose";
import { model } from "mongoose";

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: { type: String, required: true, unique: true },
    password: String,
    userRole: { type: String, enum: ['admin', 'user'], required: true }
});
const User = model("User", userSchema);
export default User;