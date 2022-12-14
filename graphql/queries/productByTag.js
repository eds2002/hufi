const gql = String.raw

export const productByTag = gql`
query ProductByTag($tag:String!){
  products(query:$tag, first:10){
    nodes{
     id
      title
      totalInventory
      seo{
        title
        description
      }
      tags
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
      options{
        name
        values
      }
      priceRange{
        maxVariantPrice{
          amount
          currencyCode
        }
      }
      descriptionHtml
      media(first: 3) {
        nodes{
          previewImage{
            url
          }
        }
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
      mediaThreeText:metafield(namespace:"product",key:"showcase_text_3"){
        value
        type
      }
      mediaThree:metafield(namespace:"product",key:"showcase_image_3"){
        value
        type
        reference {
          ... on MediaImage {
            image {
              altText
              url
            }
          }
          ... on Video{
            sources{
              url
            }
          }
        }
      }
      mediaTwoText:metafield(namespace:"product",key:"showcase_text_2"){
        value
        type
      }
      mediaTwo:metafield(namespace:"product",key:"showcase_image_2"){
        value
        type
        reference {
          ... on MediaImage {
            image {
              altText
              url
            }
          }
          ... on Video{
            sources{
              url
            }
          }
        }
      }


      mediaOneText:metafield(namespace:"product",key:"showcase_text_1"){
        value
        type
      }
      mediaOne:metafield(namespace:"product",key:"showcase_image_1"){
        value
        type
        reference {
          ... on MediaImage {
            image {
              altText
              url
            }
          }
          ... on Video{
            sources{
              url
            }
          }
        }
      }

      details: metafield(namespace: "product", key: "details") {
        value
        type
      }
      learnmore: metafield(namespace: "product", key: "learn_more") {
        value
        type
      }
      shortDesc:metafield(namespace:"product",key:"short_description"){
        value
        type
      }
      faqs:metafield(namespace:"product",key:"faqs"){
        value
        type
      }
      useCases:metafield(namespace:"product",key:"use_cases"){
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