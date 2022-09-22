import { AppProps } from 'next/app'
import Layout from '../components/global/Layout'
import '../styles/globals.css'
import { storefront } from '../utils/storefront'
import {viewMenu} from '../graphql/queries/viewMenu'
import { LocaleProvider } from '../context/localeContext'
import CartContext, { CartProvider } from '../context/cartContext'
import NextNProgress from "nextjs-progressbar";
import Cookies from 'cookies'
import { getCustomer } from '../graphql/queries/getCustomer'

function MyApp({ Component, pageProps }) {
  return (
  <CartProvider>
    <LocaleProvider>
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
    </LocaleProvider>
  </CartProvider>
  )
}

export default MyApp

MyApp.getInitialProps = async (context) =>{
  let pageProps = {}
  try{
    const {data:headerData} = await storefront(viewMenu,{menuName:"main-menu"})
    const {data:footerData} = await storefront(viewMenu,{menuName:"footer"})
    const {data:userInformation} = await storefront(getCustomer,{token:context?.ctx?.req?.cookies?.userAccess || ""})
    pageProps["headerData"] = headerData
    pageProps["footerData"] = footerData
    pageProps["userData"] = userInformation
  }catch(e) {
    console.log(e)
  }
  return {pageProps}
}
