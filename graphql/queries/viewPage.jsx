const gql = String.raw

export const viewPage = gql`
query($pageName:String!){
  page(handle:$pageName) {
    title
    body
  }
}
`