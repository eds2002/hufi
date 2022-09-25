const gql = String.raw


export const viewProductByHandle = gql`
query Product($handle: String!) {
  product(handle:$handle) {
    id
    title
    totalInventory
    compareAtPriceRange{
      maxVariantPrice{
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
  }
}
`