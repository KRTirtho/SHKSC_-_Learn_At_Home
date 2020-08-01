import { gql } from "@apollo/client";

export const SET_AVATAR = gql`
    mutation SetAvatar($file: Upload!){
        setAvatar(file: $file){
            mimetype,
            size
        }
    }
`