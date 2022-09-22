const gql = String.raw

export const accessTokenRenew = gql`
mutation customerAccessTokenRenew($customerAccessToken: String!) {
  customerAccessTokenRenew(customerAccessToken: $customerAccessToken) {
    customerAccessToken {
      accessToken
      expiresAt
    }
    userErrors {
      field
      message
    }
  }
}
`