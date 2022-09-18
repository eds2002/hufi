import {createContext, useEffect, useState} from 'react'

const CartContext = createContext()

export function CartProvider({children}){
  const [openCart,setOpenCart] = useState(false)
  const [cartId,setCartId] = useState()
  const [cartData,setCartData] = useState()
  const [viewedCart,setViewedCart] = useState(false)
  return(
    <CartContext.Provider value={{openCart,setOpenCart,cartId,setCartId,setCartData,cartData,viewedCart,setViewedCart}}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext