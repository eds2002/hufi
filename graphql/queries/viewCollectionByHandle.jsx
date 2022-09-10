const gql = String.raw
export const viewCollectionByHandle = gql`
query viewCollection($handle:String!, $amount:Int){
  collectionByHandle(handle:$handle) {
    id
    handle
    title
    updatedAt
		image{
      url
      originalSrc
    }
    products(sortKey:BEST_SELLING, first:$amount){
      nodes{
        id
        title
        handle
        variants(first:100){
          nodes{
            selectedOptions{
              name
            }
          }
        }
        priceRange{
          maxVariantPrice{
            amount
          }
        }
        media(first:1){
          nodes{
            previewImage{
              url
              originalSrc
            }
          }
        }
      }
    }
  }
}
`