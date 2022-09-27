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
        <Head>
          <meta charSet='UTF-8'/>
          <meta name = 'viewport' content = 'width=device-width, initial-scale=1.0'/>
          <meta httpEquiv='X-UA-Compatible' content='ie=edge'/>
          <title>Hufi</title>
          <meta name = "description" content = "Selling innovative, life changing products."/>
          <meta name = "keywords" content = 'HUFI, TRENDING, PRODUCTS, INNOVATIVE, LIFE, CHANGING'/>

          <meta property="og:title" content="Hufi"/>
          <meta property="og:description" content="Selling innovative, life changing products."/>
          <meta property="og:url" content="https://www.hufistore.com/"/>
          <meta property="og:locale" content="en_US"/>
          <meta property="og:image" content="http://www.hufistore.com/hufiLogo.svg"/>
          <meta property="og:type" content="website"/>
          <meta property="og:site_name" content="Hufi"/>


          {/* <!-- Twitter --> */}
          <meta property="twitter:card" content="summary_large_image"/>
          <meta property="twitter:url" content="https://www.hufistore.com/"/>
          <meta property="twitter:title" content="Hufi"/>
          <meta property="twitter:description" content="Selling innovative, life changing products."/>
          <meta property="twitter:image" content="http://www.hufistore.com/hufiLogo.svg"/>
        </Head>
          <main className = "w-full h-screen ">
            <div className = "flex flex-col items-center w-full h-full px-4 pt-24">
              <div className = "relative w-full h-[325px] pointer-events-none select-none">
                <Image src = {ErrorImg} layout='fill' objectFit="cover"/>
              </div>
              <h1 className = "max-w-sm text-3xl font-medium text-center">Hmmm, it seems like this product doesn't exist.</h1>
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