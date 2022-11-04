const gql = String.raw


export const viewProductByHandle = gql`
query Product($handle: String!) {
  product(handle:$handle) {
    id
    title
    totalInventory
    handle
    collections(first:10){
      nodes{
        id
        handle
        title
      }
    }
    tags
    seo{
      title
      description
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
    descriptionHtml
    media(first: 5) {
      nodes{
        ...on MediaImage{
          image{
            url
            altText
          }
        }
        ... on Video{
					sources{
            url
          }
          previewImage{
            url
            altText
          }
        }
      }
    }
    variants(first:100){
      nodes{
        quantityAvailable
        id
        priceV2{
          amount
          currencyCode
        }
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
    crossSell:metafield(namespace:"product",key:"cross_sell"){
      value
      type
    }
    seoTags:metafield(namespace:"product",key:"seo_tags"){
      value
      type
    }
    sizeGuide:metafield(namespace:"product",key:"sizeguide"){
      value
      type
    }
    bannerImage:metafield(namespace:"product",key:"banner_image"){
      value
      type
    }
  }
}
`