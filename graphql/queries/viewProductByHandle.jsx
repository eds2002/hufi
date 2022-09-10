const gql = String.raw

export const viewProductByHandle = gql`
query Product($handle: String!) {
  product(handle: $handle) {
    id
    title
    vendor
    descriptionHtml
    media(first: 7) {
      nodes{
        previewImage{
          originalSrc
          url
        }
      }
    }
    variants(first: 100) {
      nodes {
        id
        availableForSale
        compareAtPriceV2 {
          amount
          currencyCode
        }
        selectedOptions {
          name
          value
        }
        image {
          id
          url
          altText
          width
          height
        }
        priceV2 {
          amount
          currencyCode
        }
        sku
        title
        unitPrice {
          amount
          currencyCode
        }
      }
    }
    seo {
      description
      title
    }
  }
}
`