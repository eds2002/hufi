import {lineRemove} from '../graphql/mutations/lineRemove'
import {storefront} from '../utils/storefront'
export const removeProduct = async (product,cartData) =>{
  try{
    const {data,errors} = await storefront(lineRemove,{cartId: cartData.id, lineIds:[product.node.id]})
    return data.cartLinesRemove.cart
  }catch(e){
    return e
  }
}