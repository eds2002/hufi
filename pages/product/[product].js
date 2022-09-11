import { ProductFAQ, ProductFeatures, ProductImageView, ProductOverview } from "../../components/sections/product";
import {storefront} from '../../utils/storefront'
import {viewProductByHandle} from '../../graphql/queries/viewProductByHandle'


export default function Product({productData}){
  return (
    <main>
      <ProductOverview data = {productData}/>
      <ProductFeatures data = {productData}/>
      {/* <ProductImageView/> */}
      {/* <ProductFAQ/> */}
    </main>
  )
}

export async function getServerSideProps(context) {
  const { req, query, res, asPath, pathname } = context;
  const {data:product,errors} = await storefront(viewProductByHandle, {handle:query.product})
  return{
    props:{productData:product || errors,}
  }
}