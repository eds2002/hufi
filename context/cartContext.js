import {createContext, useContext, useEffect, useState} from 'react'
import { getCookie,setCookie } from 'cookies-next'
import { storefront } from '../utils/storefront'
import { viewCart } from '../graphql/mutations/viewCart'
import UserContext from './userContext'
import { cartBuyerIdentity } from '../graphql/mutations/cartBuyerIdentity'
import {createCart} from '../graphql/mutations/createCart'

const CartContext = createContext()

export function CartProvider({children}){
  const [openCart,setOpenCart] = useState(false)
  const [cartId,setCartId] = useState()
  const [cartData,setCartData] = useState()
  const [viewedCart,setViewedCart] = useState(false)
  const [checkout,setCheckout] = useState()
  const {currentUser,currentUserACCESS} = useContext(UserContext)
  const [coupons,setCoupons] = useState([])

  useEffect(()=>{
    const checkCart = async () =>{
      if(getCookie('userCart')){
        // TODO, CART COOKIE EXISTS, SET CART DATA
        const cookieCartData = JSON.parse(getCookie('userCart'))
        const {data,errors} = await storefront(viewCart,{id:cookieCartData.cartId})
        setCartData(data.cart)
      }else{
        // TODO, COOKIE DOESNT EXIST, CREATE USER CART
        const {data,errors} = await storefront(createCart)
        const cartCreated = new Date()
        const cartExpires = cartCreated.setDate(cartCreated.getDate() + 8)
        setCookie('userCart', {cartId:data.cartCreate.cart.id, created:data.cartCreate.cart.createdAt}, {maxAge: cartExpires});
        
        const cartId = data.cartCreate.cart.id
        const {data:cartRes, errors:cartErrors} = await storefront(viewCart,{id:cartId})
        setCartData(cartRes.cart)
      }
    } 
    checkCart()
  },[])


  //TODO, If a user is logged in, associate them to the cart 
  // useEffect(()=>{
  //   if(currentUser && cartData){
  //     const associateCustomerToCart = async () =>{
  //       const {data,errors} = await storefront(cartBuyerIdentity,{buyerIdentity:{customerAccessToken:currentUserACCESS,email:currentUser.email},cartId:cartData.id})
  //       console.log(data,errors)
  //     }
  //     associateCustomerToCart()
  //     console.log("works")

  //     return
  //   }
  // },[currentUser,cartData])
  return(
    <CartContext.Provider value={{setCheckout, checkout,openCart,setOpenCart,cartId,setCartId,setCartData,cartData,viewedCart,setViewedCart,coupons,setCoupons}}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext