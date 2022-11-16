import '../styles/globals.css'
import { LocaleProvider } from '../context/localeContext'
import { UserProvider } from '../context/userContext'
import { CartProvider } from '../context/cartContext'
import NextNProgress from "nextjs-progressbar";
import { ProductProvider } from '../context/productContext'
import TagManager from 'react-gtm-module'
import { useEffect } from 'react'
import {hotjar} from 'react-hotjar'

function MyApp({ Component, pageProps }) {
  // Use hotjar
  useEffect(()=>{
    hotjar.initialize(process.env.NEXT_PUBLIC_HJID,process.env.NEXT_PUBLIC_HSJV)

    hotjar.identify('USER_ID',{userProperty:'value'})

    hotjar.event('button-click')

    // Update SPA state
    hotjar.stateChange('/my/page');

    if(hotjar.initialized()){
      hotjar.identify('USER_ID',{userProperty:'value'})
    }
  },[])


  // Google Tag Manager
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
            <Component {...pageProps}/>
        </ProductProvider>
      </LocaleProvider>
    </CartProvider>
  </UserProvider>
  )
}

export default MyApp

