import { gql } from "apollo-boost";

export const typeDefs = gql`
    type Query{
        loggedIn: Boolean
        signedUp: Boolean
    }
`

export const resolvers = {}