import Post from "../../Model/Post" 
import { AuthenticationError } from "apollo-server"

export const posts = (_, {post_type}, context)=>{
    // disabled for development
    // if(!context.isAuthenticated)throw new AuthenticationError("User unauthorized")
    
    const findPosts = !post_type? {} : {post_type}
    
    return Post.find(findPosts).exec()
    .then(posts=>{
        if(!posts)throw new Error("No posts available yet!")
        return posts;
    })
    .catch(err=>{
        console.log("POST ERROR: ", err)
        throw err
    })
}

export const post = (_, {post}, context, info)=>{
    // disabled for development
    // if(!context.isAuthenticated)throw new AuthenticationError("User unauthorized")
    const newPost = new Post({...post});
    
    return newPost.save()
    .then(posts=>{
        if(!posts)throw new Error("Failed to post")
        return posts
    })
                .catch(err=>{
                    console.log("Post Mutating Error: ", err)
                    throw err
                })
            }
            
/* Resolver for uploaded files */
export const upload = (_, args)=>{
    // disabled for development
    // if(!context.isAuthenticated)throw new AuthenticationError("User unauthorized")
    console.log(args)
}

/* For Updating the posts */

export const updatePost = (_, {updates, post_id})=>{
    // disabled for development
    // if(!context.isAuthenticated)throw new AuthenticationError("User unauthorized")
 return Post.findByIdAndUpdate(post_id, {
     ...updates
 }, {new: true}).exec()
    .then(updatedPost=>{
        if(!updatedPost)throw new Error("Post failed to Update")
        return updatedPost;
    })
}