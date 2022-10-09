import '../styles/globals.css'
import { LocaleProvider } from '../context/localeContext'
import { UserProvider } from '../context/userContext'
import { CartProvider } from '../context/cartContext'
import NextNProgress from "nextjs-progressbar";
import { ProductProvider } from '../context/productContext'
import TagManager from 'react-gtm-module'
import { useEffect } from 'react'

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
            <Component {...pageProps}/>
        </ProductProvider>
      </LocaleProvider>
    </CartProvider>
  </UserProvider>
  )
}

export default MyApp

