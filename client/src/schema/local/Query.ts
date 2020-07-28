import { gql } from "apollo-boost";

export const LOGIN_LOCAL = gql`
    query LoginLocal{
        loggedIn @client
    }
`

export const SIGNED_UP = gql`
    query SignedUp{
        signedUp @client
    }
`