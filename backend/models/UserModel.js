import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    userName: {
        type: String, 
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role:{
        type: String,
        required: true,
        enum: ["User", "Admin"],
        default: "User"
    }
});

const User =  mongoose.model("User", userSchema)
export default User;