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
import UserContext from '../../context/userContext';

const Layout = ({children}) => {
  return (
    <>
      <Header data = {children.props.headerData} user = {children.props.userData}/>
        {children}
      <Footer data = {children.props.footerData}/>
    </>
  )
}

export default Layout