const gql = String.raw

export const viewProductByHandle = gql`
query Product($handle: String!) {
  product(handle:$handle) {
    id
    title
    compareAtPriceRange{
      maxVariantPrice{
        amount
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
        id
        selectedOptions{
          name
          value
        }
			}
    }
    imageThreeText:metafield(namespace:"product",key:"showcase_text_3"){
      value
      type
    }
    imageThree:metafield(namespace:"product",key:"showcase_image_3"){
      value
      type
      reference {
        ... on MediaImage {
          image {
            altText
            url
          }
        }
      }
    }
    imageTwoText:metafield(namespace:"product",key:"showcase_text_2"){
      value
      type
    }
    imageTwo:metafield(namespace:"product",key:"showcase_image_2"){
      value
      type
      reference {
        ... on MediaImage {
          image {
            altText
            url
          }
        }
      }
    }
    
    
    imageOneText:metafield(namespace:"product",key:"showcase_text_1"){
      value
      type
    }
    imageOne:metafield(namespace:"product",key:"showcase_image_1"){
      value
      type
      reference {
        ... on MediaImage {
          image {
            altText
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
  }
}
`