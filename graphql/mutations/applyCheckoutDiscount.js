const gql = String.raw

export const applyCheckoutDiscount = gql`
  mutation checkoutDiscountCodeApplyV2($checkoutId: ID!, $discountCode: String!) {
    checkoutDiscountCodeApplyV2(checkoutId: $checkoutId, discountCode: $discountCode) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        code
        message
      }
    }
  }
`

// {
//   "checkoutId": "",
//   "discountCode": ""
// }