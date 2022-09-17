import { AppProps } from 'next/app'
import Layout from '../components/global/Layout'
import '../styles/globals.css'
import { storefront } from '../utils/storefront'
import {viewMenu} from '../graphql/queries/viewMenu'
import { LocaleProvider } from '../context/localeContext'
import CartContext, { CartProvider } from '../context/cartContext'

function MyApp({ Component, pageProps }) {
  return (
  <CartProvider>
    <LocaleProvider>
      <Layout {...pageProps}>
        <Component {...pageProps}/>
      </Layout>
    </LocaleProvider>
  </CartProvider>
  )
}

export default MyApp

MyApp.getInitialProps = async ({req,res}) =>{
  let pageProps = {}
  try{
    const {data:headerData} = await storefront(viewMenu,{menuName:"main-menu"})
    const {data:footerData} = await storefront(viewMenu,{menuName:"footer"})
    pageProps["headerData"] = headerData
    pageProps["footerData"] = footerData
  }catch(e) {
    console.log(e)
  }
  return {pageProps}
}
