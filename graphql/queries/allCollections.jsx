const gql = String.raw

export const allCollections = gql`
query viewAllCollections($amount:Int, $queryArgs:String!){
  collections(first:$amount,query: $queryArgs){
    nodes{
      updatedAt
      id
      title
      descriptionHtml
      image{
        originalSrc
        url
        altText
      }
    }
  }
}
`