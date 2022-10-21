const gql = String.raw

export const allProductHandles = gql`
query getAllProducts{
	products(first:100){
		nodes{
      handle
    }
  }
}
`