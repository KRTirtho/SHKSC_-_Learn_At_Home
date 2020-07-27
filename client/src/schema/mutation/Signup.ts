import { gql } from "apollo-boost";

export const SIGN_UP = gql`
mutation SignUp ($user: newUser){
    signUp(user: $user){
              _id
              role
              email
              token
          }
}
`