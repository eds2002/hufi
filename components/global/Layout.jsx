import React from 'react'
import { Footer, Header } from '.'
import { getCookie, setCookie } from 'cookies-next';
import { useEffect } from 'react'
import { createCart } from '../../graphql/mutations/createCart'
import { useContext } from 'react'
import { useState } from 'react'
import {viewCart} from '../../graphql/mutations/viewCart'
import CartContext from '../../context/cartContext';
import { storefront } from '../../utils/storefront';

const Layout = ({children}) => {
  const {setCartData,cartData} = useContext(CartContext)
  useEffect(()=>{
    const checkCart = async () =>{
      if(getCookie('userCart')){
        // TODO, COOKIE EXISTS
        const cookieCartData = JSON.parse(getCookie('userCart'))
        const {data,errors} = await storefront(viewCart,{id:cookieCartData.cartId})
        setCartData(data.cart)
      }else{
        // TODO, COOKIE DOESNT EXIST, CREATE USER CART
        const {data,errors} = await storefront(createCart)
        setCookie('userCart', {cartId:data.cartCreate.cart.id, created:data.cartCreate.cart.createdAt});

        const cartId = data.cartCreate.cart.id
        const {data:cartRes, errors:cartErrors} = await storefront(viewCart,{id:cartId})
        setCartData(cartRes.cart)
      }
    } 
    checkCart()
  },[])
  return (
    <>
      <Header data = {children.props.headerData}/>
        {children}
      <Footer data = {children.props.footerData}/>
    </>
  )
}

export default Layout