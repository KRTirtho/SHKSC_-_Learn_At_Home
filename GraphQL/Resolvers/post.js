import Post from "../../Model/Post" 
import { AuthenticationError } from "apollo-server"
import User from "../../Model/User"

export const posts = async (_, {post_type}, context)=>{
    // disabled for development
    if(!context.isAuthenticated)throw new AuthenticationError("User unauthorized")

    /**
     * TODO: Implementation of pagination & sort
     * Info: Default sort date & reviews (this will be addded later)
      */
     
     const findPosts = !post_type? {} : {post_type}
     
     try {
        const posts = await Post.find(findPosts).sort({ date: "asc" }).exec()
        if (!posts)
            throw new Error("No posts available yet!")
        return posts
    }
    catch (err) {
        console.log("POST ERROR: ", err)
        throw err
    }
}

/**
 * TODO: Post Type check + User credentials joining in post()
  */

export const post = async (_, {post}, {isAuthenticated, user})=>{
    if(!isAuthenticated)throw new AuthenticationError("User unauthorized")
    // User credentials achieving
    const fieldSelection = "first_name last_name avatar_url"+user.role==="student"&&post.post_type==="questions"?" class section group class_roll":"";

    try {
        const uploader = await User.findById(user._id).select(fieldSelection).exec()
        if (!user)
            throw new Error("User not found, server error")

        const post_fields = {
            uploaderId: uploader._id,
            uploadedBy: uploader.first_name + " " + uploader.last_name,
            avatar_url: uploader.avatar_url,
            ...post
        }
        if (user.role === "student" && post.post_type === "questions") {
            post_fields.class = uploader.class
            post_fields.subject = uploader.subject
            post_fields.group = uploader.group
            post_fields.class_roll = uploader.class_roll
        }
        const newPost = new Post(post_fields)
        try {
            const posts = await newPost.save()
            if (!posts)
                throw new Error("Failed to post")
            return { success: true }
        }
        catch (err) {
            console.log("POST MUTATION ERROR: ", err)
            throw err
        }
    }
    catch (err_1) {
        console.log("POST ERROR: ", err_1)
        throw err_1
    }
}
            
/* Resolver for uploaded files */
export const upload = (_, args)=>{
    // disabled for development
    // if(!context.isAuthenticated)throw new AuthenticationError("User unauthorized")
    console.log(args)
}

/* For Updating the posts */

export const updatePost = async (_, {updates, post_id})=>{
    // disabled for development
    // if(!context.isAuthenticated)throw new AuthenticationError("User unauthorized")
 const updatedPost = await Post.findByIdAndUpdate(post_id, {
        ...updates
    }, { new: true }).exec()
    if (!updatedPost)
        throw new Error("Post failed to Update")
    return updatedPost
}
