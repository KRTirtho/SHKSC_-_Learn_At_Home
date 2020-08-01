import { gql } from "@apollo/client";

export const typeDefs = gql`
    type Query{
        loggedIn: Boolean
        signedUp: Boolean
    }
`

export const resolvers = {}