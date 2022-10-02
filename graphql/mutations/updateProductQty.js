const gql = String.raw

export const updateProductQty = gql`
mutation updateLine($cartId:ID!, $lineId:ID!, $amount: Int!){
  cartLinesUpdate(
    cartId: $cartId
    lines: {
      id: $lineId
      quantity: $amount
    }
  ) {
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
  }
}
`