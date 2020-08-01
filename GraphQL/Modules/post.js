import { gql } from "apollo-server"
import { posts, post, upload, updatePost } from "../Resolvers/post"
//% uploadedBy represents the name of the poster 
const postCommonType = `
    _id: ID!
    post_type: postType!
    title: String!
    description: String!
    uploadedBy: String!
    avatar_url: String
    date: String!
    file: [file]
`
const postSecondaryCommon = `
    class: Int!
    subject: String!
    group: group
`

export const postType = gql`
    extend type Query{
        posts(post_type: postType!): [UPost!]!
        allPost:[AllPost!]!
    }
    extend type Mutation{
        updatePost(post_type: postType! post_id: ID! updates: newPost!): UPost!
        upload: Upload!
        post(post: newPost!): Flash!
    }

    type Flash {
        success: Boolean!
    }
     # For Post
     input newPost{
        post_type: postType! # For now Giving String. Later, will be used enum PostType 
        title: String!
        description: String!
        class: Int
        chapter: String
        group: group # Later, a enum will be used
        subject: String
        section: String
        files: Upload
    }

    type file{
        url: String!
        public_id: ID!
        file_type: String!
    }

    union UPost = AnnouncementsPrincipalActivities | Classes | Examination | Question
    
    type AllPost{
        class: Int
        subject: String
        group: group
        section: String
        class_roll: Int
        chapter: String
        ${postCommonType}
    }
    type AnnouncementsPrincipalActivities {
        ${postCommonType}
    }
    type Classes {
        chapter: String!
        ${postSecondaryCommon}
        ${postCommonType}
    }
    type Examination{
        ${postSecondaryCommon}
        ${postCommonType}
    }
    type Question {
        section: String!
        class_roll: Int!
        ${postSecondaryCommon}
        ${postCommonType}
    }
    # For allowed Post Types
    enum postType{
        announcement
        principal
        activities
        classes
        examination
        question
    }
    # For Science/Commerce/Arts
    enum group{
        Null
        Science
        Business_Studies
        Arts
    }
`
 export const postResolvers =  {
        UPost:{
            __resolveType: (post, _, info)=>{
                switch (post.post_type){
                    case "announcement":
                        return info.schema.getType("AnnouncementsPrincipalActivities")
                    case "principal":
                            return info.schema.getType("AnnouncementsPrincipalActivities")
                    case "activities":
                        return info.schema.getType("AnnouncementsPrincipalActivities")
                    case "classes":
                        return info.schema.getType("Classes")
                    case "examination":
                        return info.schema.getType("Examination")
                    case "question":
                        return  info.schema.getType("Question")
                    default:
                        return null
                    }
            }
        },
        postType: {
            announcement: "announcement",
            principal: "principal",
            activities: "activities",
            classes: "classes",
            examination: "examination",
            question: "question",
        },
        group: {
            Null: null,
            Science: "Science",
            Business_Studies: "Business_Studies",
            Arts: "Arts",
        },
        Query: {
            posts: posts,
            allPost: posts
        },
        Mutation:{
            post: post,
            upload: upload,
            updatePost: updatePost
        }
    }
