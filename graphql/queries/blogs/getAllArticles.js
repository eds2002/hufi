const gql = String.raw

export const getAllArticles = gql`
query getAllBlogs{
	blogs(first:50){
    nodes{
      id
      title
      handle
      articles(first:50){
        nodes{
          id
          image{
            url
          }
          title
          handle
          excerpt
          tags
        }
      }
    }
	}
}
`