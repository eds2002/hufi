const gql = String.raw

export const viewArticleByHandle = gql`
  query getBlogByHandle($handle:String!){
    blog(handle:"News"){
      articleByHandle(handle:$handle){
        title
        contentHtml
        publishedAt
        tags
      }
    }
  }
`