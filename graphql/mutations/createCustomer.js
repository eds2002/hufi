const gql = String.raw

const createCustomer = gql`
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
      }
      customerUserErrors {
        code
        field message
      }
    }
  }
`

// EXAMPLE INPUT
// {
//   "input": {
//     "firstName":"",
//     "lastName":"",
//     "email": "@gmail.com",
//     "password": "",
//     "acceptsMarketing":true
//   }
// }