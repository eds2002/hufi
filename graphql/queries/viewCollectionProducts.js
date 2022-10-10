const gql = String.raw
export const viewCollectionProducts = gql`
query viewCollection($handle:String!, $amount:Int){
  collectionByHandle(handle:$handle) {
    products(sortKey:BEST_SELLING, first:$amount){
      nodes{
        id
        title
        handle
        options{
          name
          values
        }
        variants(first:100){
          nodes{
            quantityAvailable
            id
            selectedOptions{
              name
              value
            }
          }
        }
        compareAtPriceRange{
          maxVariantPrice{
            amount
            currencyCode
          }
          minVariantPrice{
            amount
            currencyCode
          }
        }
        priceRange{
          maxVariantPrice{
            amount
            currencyCode
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
        orderWithin:metafield(namespace:"product",key:"order_within"){
          value
          type
        }
      }
    }
  }
}
`