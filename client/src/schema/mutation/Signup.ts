import { gql } from "@apollo/client";

export const SIGN_UP = gql`
mutation SignUp ($user: newUser){
    signUp(user: $user){
              _id
              role
              email
              tokens{
                accessToken
                refreshToken
              }
          }
}
`