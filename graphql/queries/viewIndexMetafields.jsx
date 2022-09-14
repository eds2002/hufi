const gql = String.raw

export const viewIndexMetafields = gql`
 query getPage($handle:String!){
  page(handle:$handle) {
    heroImageBanner:metafield(namespace:"page",key:"hero_image_banner"){
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
    heroText:metafield(namespace:"page",key:"hero_text"){
      value
      type
    }
    collections:metafield(namespace:"page",key:"collections"){
      value
      type
    }
    displayProducts:metafield(namespace:"page",key:"display_products"){
      value
      type
    }
  }
 }
`