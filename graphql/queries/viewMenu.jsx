const gql = String.raw

export const viewMenu = gql`
query viewMenusQuery($menuName:String!){
  menu(handle:$menuName) {
    title
    handle
    items {
      id
      title
      url
      items{
        title
        id
        url
        items{
          title
          id
          url
				}
      }
    }
  }
}
`