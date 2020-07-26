import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    role: {type: String, required: true},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    class_roll: {type: Number},
    class: {type: Number},
    section: {type: String},
    teacher_roll: {type: Number},
    shift: {type: String, required: true},
    avatar_uri: {type: String},
    avatar_id: {type: String}
})

const User = mongoose.model("User", userSchema)

export default User;