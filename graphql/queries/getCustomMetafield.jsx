
const gql = String.raw

export const getCustomMetafield = gql`
query CollectionMetafield($namespace: String!, $key: String!, $ownerId: ID!) {
  collection(id: $ownerId) {
    id
    handle
    descriptionHtml
    products(first:1){
      nodes{
        id
        handle
      }
    }
    herobanner: metafield(namespace: $namespace, key: $key) {
      value
      reference {
        ... on MediaImage {
          image {
            url
            originalSrc
          }
        }
      }
    }
  }
}
`
