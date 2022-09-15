const gql = String.raw

export const createUserAccessToken = gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field 
        message
      }
    }
  }
`

// EXAMPLE VARIABLES
// {
//   "input": {
//     "email": "@gmail.com",
//     "password": ""
//   }
// }