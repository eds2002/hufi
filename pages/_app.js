import { AppProps } from 'next/app'
import Layout from '../components/global/Layout'
import '../styles/globals.css'
import { storefront } from '../utils/storefront'
import {viewMenu} from '../graphql/queries/viewMenu'
import { LocaleProvider } from '../context/localeContext'
import { UserProvider } from '../context/userContext'
import CartContext, { CartProvider } from '../context/cartContext'
import NextNProgress from "nextjs-progressbar";
import Cookies from 'cookies'
import { getCustomer } from '../graphql/queries/getCustomer'
import { ProductProvider } from '../context/productContext'
import TagManager, {TagManagerArgs} from 'react-gtm-module'
import { useEffect } from 'react'
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
  useEffect(()=>{
    const gtmId = process.env.NEXT_PUBLIC_GTM_ID || ''
    const tagManagerArgs = {
      gtmId: gtmId
    }
    TagManager.initialize(tagManagerArgs)
  },[])
  return (
  <UserProvider props = {pageProps}>
    <CartProvider>
      <LocaleProvider>
        <ProductProvider>
          <NextNProgress
            color="#7fa353"
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow={true}
          />
          <Layout {...pageProps}>
            <Component {...pageProps}/>
          </Layout>
        </ProductProvider>
      </LocaleProvider>
    </CartProvider>
  </UserProvider>
  )
}

export default MyApp

MyApp.getInitialProps = async (context) =>{
  let pageProps = {}
  try{
    const {data:headerData} = await storefront(viewMenu,{menuName:"main-menu"})
    const {data:footerData} = await storefront(viewMenu,{menuName:"footer"})
    const {data:userInformation} = await storefront(getCustomer,{token:context?.ctx?.req?.cookies?.userAccess || "randomletters"})
    pageProps["headerData"] = headerData
    pageProps["footerData"] = footerData
    pageProps["userData"] = userInformation
    pageProps["userAccess"] = context?.ctx?.req?.cookies?.userAccess
  }catch(e) {
    console.log(e)
  }
  return {pageProps}
}
