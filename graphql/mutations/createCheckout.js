const gql = String.raw

export const createCheckout = gql`
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        webUrl
        id
        discountApplications(first:50){
          nodes{
            value
          }
        }
      }
      checkoutUserErrors {
        code
        message
      }
    }
  }
`

// {
//   "input": {
//     "email": "",
//     "lineItems": [
//       {
//         "quantity": 1,
//         "variantId": ""
//       }
//     ]
//   }
// }