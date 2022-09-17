import { storefront } from "./storefront"
import {updateLine} from '../graphql/mutations/updateLine'
export const updateCart = async (cartId,qty,lineId) =>{
  const {data,errors} = await storefront(updateLine,{cartId:cartId.id, lines:{id:lineId.node.id, quantity:qty}})
  return data.cartLinesUpdate.cart
}