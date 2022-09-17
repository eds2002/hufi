const gql = String.raw

export const viewCart = gql`
query getShopifyCart($id:ID!) {
  cart(
    id: $id
  ) {
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
    attributes {
      key
      value
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
`