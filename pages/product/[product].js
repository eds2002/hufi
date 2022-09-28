import { ProductFAQ, ProductFeatures, ProductImageView, ProductIncentive, ProductOverview, ProductReviews, ProductShopPromise, ProductUse } from "../../components/sections/product";
import {storefront} from '../../utils/storefront'
import {viewProductByHandle} from '../../graphql/queries/viewProductByHandle'
import {Signup} from '../../components/sections'
import { Button } from "../../components/elements";
import Image from "next/image";
import ErrorImg from '../../assets/404.svg'
import Link from "next/link";
import Head from "next/head";
import { slugify } from "../../utils/slugify";


export default function Product({productData}){
  return (
    <>
      {productData &&
        <>
        <Head>
            <meta charSet='UTF-8'/>
            <meta name = 'viewport' content = 'width=device-width, initial-scale=1.0'/>
            <meta httpEquiv='X-UA-Compatible' content='ie=edge'/>
            <title>Hufi - {productData.product.title}</title>
            <meta name = "description" content = {productData.product.seo.description}/>
            <meta name = "keywords" content = 'HUFI, TRENDING, PRODUCTS, INNOVATIVE, LIFE, CHANGING'/>

            <meta property="og:title" content="Hufi"/>
            <meta property="og:description" content={productData.product.seo.description}/>
            <meta property="og:url" content={`https://www.hufistore.com/product/${slugify(productData.product.title)}`}/>
            <meta property="og:locale" content="en_US"/>
            <meta property="og:image" content="https://www.hufistore.com/hufiOG.png"/>
            <meta property="og:type" content="website"/>
            <meta property="og:site_name" content="Hufi"/>


            {/* <!-- Twitter --> */}
            <meta property="twitter:card" content="summary_large_image"/>
            <meta property="twitter:url" content={`https://www.hufistore.com/product/${slugify(productData.product.title)}`}/>
            <meta property="twitter:title" content="Hufi"/>
            <meta property="twitter:description" content={productData.product.seo.description}/>
            <meta property="twitter:image" content="https://www.hufistore.com/hufiOG.png"/>
        </Head>
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
  try{
    const { req, query, res, asPath, pathname } = context;
    const {data:product,errors} = await storefront(viewProductByHandle, {handle:query.product})
    if(product.product){
      return{
        props:{productData:product || errors}
      }
    }else{
      return{
        redirect: {
          permanent: false,
          destination: "/404"
        }
      }
    }
  }catch(e){
    return{
      redirect: {
        permanent: false,
        destination: "/404"
      }
    }
  }
}