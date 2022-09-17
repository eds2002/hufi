const gql = String.raw

export const createCart = gql`
mutation cartCreate {
  cartCreate {
    cart {
      id
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