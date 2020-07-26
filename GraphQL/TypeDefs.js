import { queryUser, signUp, login, authorize } from "./Resolvers/user"
import { gql } from "apollo-server"
import { post, posts } from "./Resolvers/post"

export const typeDefs = gql`
    type Query{
        users: [User]
        login(credentials: authUser):User
        authorize: authorizeUser
        posts(post_type: postType): [IPost]
    }
    type Mutation{
        signUp(user: newUser):User
        post(post: newPost):IPost
    }
    # For user return type
    type User {
        _id: ID!
        role: roleValue
        first_name: String
        last_name: String
        email: String
        password: String
        class_roll: Int
        class: Int
        section: String
        teacher_roll: Int
        shift: shiftValue
        avatar_uri: String
        avatar_id: String
        token: String
    }
    # For signing up new user
    input newUser{
        role: String!
        first_name: String!
        last_name: String!
        email: String!
        password: String!
        class_roll: Int
        class: Int
        section: String
        teacher_roll: Int
        shift: shiftValue
        avatar_uri: String
        avatar_id: String
    }
    # login input
    input authUser{
        email: String!
        password: String!
    }
    # authorization return type 
    type authorizeUser{
        login: Boolean
        credentials: User
    }
    enum shiftValue{
        Day
        Morning
    }
    enum roleValue{
        teacher 
        student
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
        student_name: String
        section: String
        class_roll: Int
    }
    # All post Types
    type file{
        url: String
    }
    
    interface IPost{
        _id: ID!
        post_type: postType! # For now Giving String. Later, will be used enum PostType 
        title: String!
        description: String!
        date: String!
        file: [file]
    } 
    type AllPost implements IPost{
        _id: ID!
        post_type: postType!
        title: String!
        description: String!
        date: String!
        file: [file]
        subject: String
        class: String
        group: group
        class_roll: String
        student_name: String
        teacher: String
    }
    type AnnouncementsPrincipalActivities implements IPost {
        _id: ID!
        post_type: postType! #Enum for later
        title: String!
        description: String!
        date: String!
        file: [file]
    }
    type Classes implements IPost {
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
    type Examination implements IPost{
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
    type Question implements IPost {
        _id: ID!
        post_type: postType!
        title: String!
        description: String!
        date: String!
        student_name: String!
        class: Int!
        section: String!
        class_roll: Int!
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

export const resolvers = {
    IPost:{
        __resolveType: (post)=>{
            switch (post.post_type){
                case "all":
                    return "AllPost"
                case "announcement":
                    return "AnnouncementsPrincipalActivities"
                case "principal":
                    return "AnnouncementsPrincipalActivities"
                case "activities":
                    return "AnnouncementsPrincipalActivities"
                case "classes":
                    return "Classes"
                case "examination":
                    return "Examination"
                case "question":
                    return  "Question"
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
    shiftValue:{
        Day: "Day",
        Morning: "Morning"
    },
    roleValue: {
        teacher: "teacher",
        student: "student"
    },
    Query: {
        users: queryUser,
        login: login,
        authorize: authorize,
        posts: posts
    },
    Mutation:{
        signUp: signUp,
        post: post
    }
}