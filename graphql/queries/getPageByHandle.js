const gql = String.raw

export const getPageByHandle = gql`
  query pageHandle($handle:String!){
    page(handle:$handle){
      body
      title
    }
  }
`