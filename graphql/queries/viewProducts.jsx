const gql = String.raw

export const viewProducts = gql`
  query viewProd($amount:Int)
  {
    products(first: $amount, sortKey:BEST_SELLING) {
      nodes {
        id
        title
        handle
        description
        priceRange{
          maxVariantPrice{
            amount
            currencyCode
          }
        }
        options{
          name
          values
        }
        variants(first:100){
          nodes{
            selectedOptions{
              name
              value
            }
          }
        }
        metafield(namespace:"product",key:"short_description"){
          value
        }
        media(first:2){
          nodes{
            previewImage{
              originalSrc
              url
            }
          }
        }
      }
    }
  }
`