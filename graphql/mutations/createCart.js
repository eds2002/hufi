const gql = String.raw

export const createCart = gql`
mutation cartCreate {
  cartCreate {
    cart {
      id
      checkoutUrl
      createdAt
      updatedAt
    }
    userErrors {
      field
      message
    }
  }
}
`