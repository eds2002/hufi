import dynamic from 'next/dynamic'
export {default as ProductOverview} from './ProductOverview'

export const ProductIncentive = dynamic(
  ()=> import(
    /*webpackChunkName: "ProductIncentive" */
    './ProductIncentive'
  ),{
    // loading: () => <h1>Loading...</h1>,
    ssr:false,
  }
)

export const ProductRecommended = dynamic(
  ()=> import(
    /*webpackChunkName: "ProductIncentive" */
    './ProductRecommended'
  ),{
    ssr:false,
  }
)

export const ProductFeatures = dynamic(
  ()=> import(
    /*webpackChunkName: "ProductFeatures" */
    './ProductFeatures'
  ),{
    // loading: () => <h1>Loading...</h1>,
    ssr:false,
  }
)

export const ProductImageView = dynamic(
  ()=> import(
    /*webpackChunkName: "ProductShopPromise" */
    './ProductImageView'
  ),{
    // loading: () => <h1>Loading...</h1>,
    ssr:false,
  }
)

export const ProductFAQ = dynamic(
  ()=> import(
    /*webpackChunkName: "ProductFAQ" */
    './ProductFAQ'
  ),{
    // loading: () => <h1>Loading...</h1>,
    ssr:false,
  }
)

export const ProductShopPromise = dynamic(
  ()=> import(
    /*webpackChunkName: "ProductShopPromise" */
    './ProductShopPromise'
  ),{
    // loading: () => <h1>Loading...</h1>,
    ssr:false,
  }
)

export const ProductReviews = dynamic(
  ()=> import(
    /*webpackChunkName: "ProductReviews" */
    './ProductReviews'
  ),{
    // loading: () => <h1>Loading...</h1>,
    ssr:false,
  }
)

export const ProductUse = dynamic(
  ()=> import(
    /*webpackChunkName: "ProductUse" */
    './ProductUse'
  ),{
    // loading: () => <h1>Loading...</h1>,
    ssr:false,
  }
)

export const ProductExpandImage = dynamic(
  ()=> import(
    /*webpackChunkName: "ProductExpandImage" */
    './ProductExpandImage'
  ),{
    // loading: () => <h1>Loading...</h1>,
    ssr:false,
  }
)