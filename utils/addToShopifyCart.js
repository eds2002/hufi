import { storefront } from "./storefront"
import { addLine } from "../graphql/mutations/addLine"

export const addToShopifyCart = async (cartData, productId) =>{
  const {data,errors} = await storefront(addLine,{cartId: cartData.id, quantity:1, variantId:productId})
  return data.cartLinesAdd.cart || errors
}