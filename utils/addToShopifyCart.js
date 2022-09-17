import { storefront } from "./storefront"
import { addLine } from "../graphql/mutations/addLine"

export const addToShopifyCart = async (cartData, productId) =>{
  // const prodId = productId
  // const qty = 1
  const {data,errors} = await storefront(addLine,{cartId: cartData.id, quantity:1, variantId:productId})
  console.log(data,errors)
  return data.cartLinesAdd.cart || errors
}