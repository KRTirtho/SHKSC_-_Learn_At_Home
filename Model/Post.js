import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    post_type: {type:String, required: true},
    title: {type:String, required: true},
    description: {type:String, required: true},
    date: {type:Date, required: true, default: Date.now()},
    file: [{
        url: String, 
        public_id: String,
        file_type: String,
        _id: false
     }],
    subject: String,
    chapter: String,
    class: Number,
    group: String,
    section: String,
    uploaderId: {type: mongoose.SchemaTypes.ObjectId, required: true},
    uploadedBy: {type: String, required: true},
    avatar_url: String
})

const Post = mongoose.model("Post", postSchema)

export default Post;