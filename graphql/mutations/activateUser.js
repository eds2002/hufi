const gql = String.raw

export const activateUser = gql`
  mutation customerActivate($id: ID!, $input: CustomerActivateInput!) {
    customerActivate(id: $id, input: $input) {
      customer {
        id
      }
      customerAccessToken {
        accessToken
      }
      customerUserErrors {
        code
      }
    }
  }
`
