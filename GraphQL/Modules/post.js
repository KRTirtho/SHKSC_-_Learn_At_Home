import { gql } from "apollo-server"
import { posts, post, upload, updatePost } from "../Resolvers/post"

export const postType = gql`
    extend type Query{
        posts(post_type: postType!): [UPost!]!
        allPost:[AllPost!]!
    }
    extend type Mutation{
        updatePost(post_type: postType! post_id: ID! updates: newPost!): UPost!
        upload: Upload!
        post(post_type: postType! post: newPost!):UPost!
    }
    
     # For Post
     input newPost{
        post_type: postType! # For now Giving String. Later, will be used enum PostType 
        title: String!
        description: String!
        class: Int
        chapter: String
        group: group # Later, a enum will be used
        teacher: String
        subject: String
        section: String
        class_roll: Int
    }

    type file{
        url: String!
    }

    union UPost = AnnouncementsPrincipalActivities | Classes | Examination | Question
    
    type AllPost{
        _id: ID!
        post_type: postType!
        title: String!
        description: String!
        date: String!
        file: [file]
        subject: String
        section: String
        class: String
        group: group
        class_roll: String
        teacher: String
    }
    type AnnouncementsPrincipalActivities {
        _id: ID!
        post_type: postType! #Enum for later
        title: String!
        description: String!
        date: String!
        file: [file]
    }
    type Classes {
        _id: ID!
        post_type: postType!
        title: String!
        description: String!
        date: String!
        class: Int!
        chapter: String!
        group: group! # Later, a enum will be used
        teacher: String!
        subject: String!
        file: [file]
    }
    type Examination{
        _id: ID!
        post_type: postType!
        title: String!
        description: String!
        date: String!
        class: Int!
        subject: String! 
        group: group! 
        file: [file]
    }
    type Question {
        _id: ID!
        post_type: postType!
        title: String!
        description: String!
        date: String!
        class: Int!
        section: String!
        class_roll: Int!
        subject: String!
        group: group!
        file: [file]
    }
    # For allowed Post Types
    enum postType{
        all # For getting all the post
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
            all: "all",
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
