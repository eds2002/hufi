const gql = String.raw


export const getCustomer = gql`
query customer($token:String!){
  customer(customerAccessToken: $token) {
    id
    firstName
    lastName
    acceptsMarketing
    email
    orders(first:50){
      nodes{
        id
        orderNumber
        totalShippingPriceV2{
          amount
          currencyCode
        }
        processedAt
        currentSubtotalPrice{
          amount
          currencyCode
        }
        canceledAt
      }
    }
  }
}
`