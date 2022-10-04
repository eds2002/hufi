const gql = String.raw

export const addCartDiscountCode = gql`
mutation cartDiscountCodesUpdate($cartId: ID!, $discountCodes:[String!]!) {
  cartDiscountCodesUpdate(cartId: $cartId, discountCodes:$discountCodes) {
    cart {
      checkoutUrl
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
      id
      createdAt
      updatedAt
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