import { gql } from "@apollo/client";

export const ALL_POST = gql`
    query AllPost{
        allPost{
        _id
        post_type
        title
        description
        uploadedBy
        avatar_url
        date
        file{
            url
            file_type
        }
        class
        subject
        group
        section
        class_roll
        }
    }
`