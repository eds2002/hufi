import dynamic from 'next/dynamic'
export {default as Header} from './Header'
export const Footer = dynamic(
  ()=> import(
    /*webpackChunkName: "Footer" */
    './Footer'
  ),{
    // loading: () => <h1>Loading...</h1>,
    ssr:false,
  }
)

export const CartDrawer = dynamic(
  ()=> import(
    /*webpackChunkName: "CartDrawer" */
    './cart/CartDrawer'
  ),{
    // loading: () => <h1>Loading...</h1>,
    ssr:false,
  }
)
export const CartProduct = dynamic(
  ()=> import(
    /*webpackChunkName: "CartProduct" */
    './cart/CartProduct'
  ),{
    // loading: () => <h1>Loading...</h1>,
    ssr:false,
  }
)

export const MobileNav = dynamic(
  ()=> import(
    /*webpackChunkName: "MobileNav" */
    './mobilenav/MobileNav'
  ),{
    // loading: () => <h1>Loading...</h1>,
    ssr:false,
  }
)


