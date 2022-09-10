import { ProductFAQ, ProductFeatures, ProductImageView, ProductOverview } from "../../components/sections/product";


export default function Product(){
  return (
    <main>
      <ProductOverview/>
      <ProductFeatures/>
      <ProductImageView/>
      <ProductFAQ/>
    </main>
  )
}

export async function getServerSideProps(context) {
  const { req, query, res, asPath, pathname } = context;
  return{
    props:{}
  }
}