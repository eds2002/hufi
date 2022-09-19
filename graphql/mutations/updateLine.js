const gql = String.raw

export const updateLine = gql`
mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
  cartLinesUpdate(cartId: $cartId, lines: $lines) {
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
