import { ProductFAQ, ProductFeatures, ProductImageView, ProductIncentive, ProductOverview, ProductReviews, ProductShopPromise, ProductUse } from "../../components/sections/product";
import {storefront} from '../../utils/storefront'
import {viewProductByHandle} from '../../graphql/queries/viewProductByHandle'
import {Signup} from '../../components/sections'


export default function Product({productData}){
  console.log(productData)
  return (
    <main>
      <ProductOverview data = {productData}/>
      <ProductUse data = {productData?.product?.useCases}/>
      {/* <ProductIncentive data = {productData}/> */}
      {/* <ProductShopPromise/> */}
      {/* <ProductFeatures data = {productData}/> */}
      <ProductImageView data = {productData}/>
      <ProductFAQ data = {productData}/>
      <Signup/>
      {/* <ProductReviews/> */}
    </main>
  )
}

export async function getServerSideProps(context) {
  const { req, query, res, asPath, pathname } = context;
  const {data:product,errors} = await storefront(viewProductByHandle, {handle:query.product})
  return{
    props:{productData:product || errors}
  }
}