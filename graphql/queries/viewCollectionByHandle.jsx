const gql = String.raw
export const viewCollectionByHandle = gql`
query viewCollection($handle:String!, $amount:Int){
  collectionByHandle(handle:$handle) {
    id
    handle
    title
    updatedAt
    descriptionHtml
		image{
      url
      altText
    }
    incentives:metafield(namespace:"collection",key:"incentives"){
      value
      type
    }
    banner:metafield(namespace:"collection",key:"banner_image"){
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

    subCollections:metafield(namespace:"collection",key:"sub_collections"){
      value
      type
    }

    collectionText:metafield(namespace:"collection",key:"collection_text"){
      value
      type
    }
    sortByTags:metafield(namespace:"collection",key:"sortByTags"){
      value
      type
    }
    products(sortKey:BEST_SELLING, first:$amount){
      nodes{
        tags
        id
        title
        handle
        options{
          name
          values
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
        shortDesc:metafield(namespace:"product",key:"short_description"){
          value
          type
        }
      }
    }
  }
}
`