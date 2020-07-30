import { gql } from "apollo-boost";

export const POST_UPLOAD = gql`
mutation Post($post: newPost!){
    post(post: $post){
        success
    }
}
`