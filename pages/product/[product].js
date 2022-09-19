import { ProductFAQ, ProductFeatures, ProductImageView, ProductOverview, ProductShopPromise } from "../../components/sections/product";
import {storefront} from '../../utils/storefront'
import {viewProductByHandle} from '../../graphql/queries/viewProductByHandle'


export default function Product({productData}){
  console.log(productData)
  return (
    <main>
      <ProductOverview data = {productData}/>
      <ProductShopPromise/>
      <ProductFeatures data = {productData}/>
      {/* <ProductImageView/> */}
      <ProductFAQ data = {productData}/>
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