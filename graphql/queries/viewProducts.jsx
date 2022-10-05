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
            quantityAvailable
            id
            image{
              url
              altText
            }
            selectedOptions{
              name
              value
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
        shortDesc:metafield(namespace:"product",key:"short_description"){
          value
          type
        }
        orderWithin:metafield(namespace:"product",key:"order_within"){
          value
          type
        }
        deliveryBusinessDays:metafield(namespace:"product",key:"delivery_business_days"){
          value
          type
        }
        coupon:metafield(namespace:"product",key:"coupon"){
          value
          type
        }
      }
    }
  }
`