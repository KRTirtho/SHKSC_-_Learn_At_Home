import { gql } from "apollo-server"
import { queryUser, login, authorize, signUp, setAvatar } from "../Resolvers/user"

export const userTypes = gql`
    type AvatarTypes{
        mimetype: String!
        size: Int!
    }

    type Query{
        users: [User]
        authorize: authorizeUser
    }
    type Mutation{
        signUp(user: newUser):User
        login(credentials: authUser):User
        setAvatar(file: Upload!): AvatarTypes!
    }
    type Tokens{
        accessToken: String!
        refreshToken: String!
    }
    
    # For user return type
    type User {
        _id: ID!
        role: roleValue
        first_name: String
        last_name: String
        email: String
        # password: String
        class_roll: Int
        class: Int
        section: String
        teacher_roll: Int
        shift: shiftValue
        avatar_uri: String
        avatar_id: String
        tokens: Tokens 
    }
    # For signing up new user
    input newUser{
        role: roleValue
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
        login: Boolean!
        credentials: User
        tokens: Tokens
        expired: Boolean
    }
    enum shiftValue{
        Day
        Morning
    }
    enum roleValue{
        teacher 
        student
    }
`;

export  const userResolvers =  {
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
            authorize: authorize,
        },
        Mutation:{
            login: login,
            signUp: signUp,
            setAvatar: setAvatar
        }
    };
