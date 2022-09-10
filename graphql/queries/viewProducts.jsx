const gql = String.raw

export const viewProducts = gql`
  query viewProd($amount:Int)
  {
    products(first: $amount, sortKey:BEST_SELLING) {
      edges {
        node {
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
          metafield(namespace:"product",key:"short_description"){
            value
          }
          variants(first:100){
            nodes{
              product{
                title
                options{
                  name
                  values
                }
                priceRange{
                  maxVariantPrice{
                    amount
                    currencyCode
                  }
                  minVariantPrice{
                    amount
                    currencyCode
                  }
                }
              }
            }
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
  } 
`