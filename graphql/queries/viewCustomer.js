const gql = String.raw

const viewCustomer = gql`
  query viewUser($accessToken:String!){
    customer(customerAccessToken:$accessToken){
        displayName
        email
        firstName
    }
  }
`