const gql = String.raw


export const updateCustomer = gql`
  mutation customerUpdate($customer: CustomerUpdateInput!, $customerAccessToken: String!) {
    customerUpdate(customer: $customer, customerAccessToken: $customerAccessToken) {
      customer {
        id
      }
      customerAccessToken {
        accessToken
      }
      customerUserErrors {
        code
      }
    }
  }
`