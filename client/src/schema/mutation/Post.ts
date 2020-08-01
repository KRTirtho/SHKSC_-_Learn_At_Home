import { gql } from "@apollo/client";

export const POST_UPLOAD = gql`
mutation Post($post: newPost!){
    post(post: $post){
        success
    }
}
`