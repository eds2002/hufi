import {createContext, useEffect, useState} from 'react'

const CartContext = createContext()

export function CartProvider({children}){
  const [openCart,setOpenCart] = useState(false)
  const [cartId,setCartId] = useState()
  const [cartData,setCartData] = useState()
  return(
    <CartContext.Provider value={{openCart,setOpenCart,cartId,setCartId,setCartData,cartData}}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext