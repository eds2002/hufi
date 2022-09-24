const gql = String.raw

export const cartBuyerIdentity = gql`
  mutation cartBuyerIdentityUpdate($buyerIdentity: CartBuyerIdentityInput!, $cartId: ID!) {
    cartBuyerIdentityUpdate(buyerIdentity: $buyerIdentity, cartId: $cartId) {
      cart {
        checkoutUrl
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`

// {
//   "buyerIdentity": {
//     "countryCode": "",
//     "customerAccessToken": "",
//     "email": "",
//     "phone": ""
//   },
//   "cartId": ""
// }