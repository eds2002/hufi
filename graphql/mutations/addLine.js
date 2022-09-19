const gql = String.raw

export const addLine = gql`
mutation cartLinesAdd($cartId: ID!, $quantity:Int,$variantId:ID!) {
  cartLinesAdd(cartId: $cartId, lines: [{quantity:$quantity,merchandiseId:$variantId}]) {
    cart {
      id
      checkoutUrl
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                priceV2{
                  currencyCode
                  amount
                }
                product{
                  title
                }
                image{
                  url
                  altText
                }
              }
            }
          }
        }
      }
      cost {
        totalAmount {
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
        totalTaxAmount {
          amount
          currencyCode
        }
        totalDutyAmount {
          amount
          currencyCode
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}
`

// EXAMPLE QUERY

// {
//   "cartId": "gid://shopify/Cart/0e4381174ff07dbbb26539bc1623860f",
//   "lines":{
//     "merchandiseId":"gid://shopify/ProductVariant/43346169659618",
//     "quantity":5
//   }
// }