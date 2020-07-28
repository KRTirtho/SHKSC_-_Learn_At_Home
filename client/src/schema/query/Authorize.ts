import { gql } from "apollo-boost";

export const AUTHORIZE_USER = gql`
query Authorize{
      authorize{
        login
        credentials{
            role
            _id
            first_name
            }
      }
}
`