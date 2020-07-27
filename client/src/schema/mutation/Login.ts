import { gql } from "apollo-boost";

export const LOGIN_QUERY = gql`
mutation Login($email:String!, $password: String!){
  login(credentials:{email: $email, password: $password}){
    _id
    role
    email
    token
  }

}
`