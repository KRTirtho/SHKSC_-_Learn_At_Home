import { gql } from "apollo-boost";

export const SET_AVATAR = gql`
    mutation SetAvatar($file: Upload!){
        setAvatar(file: $file){
            mimetype,
            size
        }
    }
`