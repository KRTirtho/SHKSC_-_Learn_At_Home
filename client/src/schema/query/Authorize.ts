import { gql } from "@apollo/client";

export const AUTHORIZE_USER = gql`
query Authorize{
      authorize{
        login
        credentials{
            role
            _id
            first_name
            last_name
            email
            }
         expired
         tokens{
            accessToken
            refreshToken
         }
      }
}
`