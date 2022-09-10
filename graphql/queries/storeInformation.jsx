const gql = String.raw

export const storeInformation = gql`
  query shopInfo {
    shop {
      name
      description
    }
}
`