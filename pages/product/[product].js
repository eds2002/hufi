import { ProductFAQ, ProductFeatures, ProductImageView, ProductIncentive, ProductOverview, ProductReviews, ProductShopPromise, ProductUse } from "../../components/sections/product";
import {storefront} from '../../utils/storefront'
import {viewProductByHandle} from '../../graphql/queries/viewProductByHandle'
import {Signup} from '../../components/sections'
import { Button } from "../../components/elements";
import Image from "next/image";
import ErrorImg from '../../assets/404.svg'
import Link from "next/link";
import Head from "next/head";


export default function Product({productData}){
  return (
    <>
      {productData ? 
        <>
          <main className = "w-full h-screen ">
            <div className = "flex flex-col items-center w-full h-full px-4 pt-24">
              <div className = "relative w-full h-[325px] pointer-events-none select-none">
                <Image src = {ErrorImg} layout='fill' objectFit="cover"/>
              </div>
              <h1 className = "max-w-sm text-3xl font-medium text-center">Hmmm, it seems like this product doesn&lsquo;t exist.</h1>
              <Link href = "/">
                <Button text = 'Back to home' CSS = 'w-auto px-4 bg-secondaryVariant py-2 mt-6 hover:bg-secondary transition'/>
              </Link>
            </div>
          </main>
        </>
      :
      <>
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
      </>
      }
    </>
  )
}

export async function getServerSideProps(context) {
  const { req, query, res, asPath, pathname } = context;
  const {data:product,errors} = await storefront(viewProductByHandle, {handle:query.product})
  return{
    props:{productData:product || errors}
  }
}