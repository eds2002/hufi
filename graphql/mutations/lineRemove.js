const gql = String.raw

export const lineRemove = gql`
mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
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
                  coupon:metafield(namespace:"product",key:"coupon"){
                    value
                    type
                  }
                  collections(first:5){
                    nodes{
                      id
                      title
                      handle
                    }
                  }
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
      discountCodes{
        code
        applicable
      }
      discountAllocations{
        discountedAmount{
          amount
          currencyCode
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