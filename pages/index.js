import Head from 'next/head'
import { storefront } from '../utils/storefront'
import {viewProducts} from '../graphql/queries/viewProducts'
import {allCollections} from '../graphql/queries/allCollections'
import { Collections, Hero, HorizontalProducts, Incentive, Signup, Testimonial, TestimonialsGrid } from '../components/sections'
import { viewIndexMetafields } from '../graphql/queries/viewIndexMetafields'
import CollectionSubCol from '../components/sections/collection/CollectionSubCol'
import img from '../assets/abstractBlocks.svg'
import Image from 'next/image'

export default function Home({data,collections,productData}) {
  return (
    <>
      {!data || !collections || !productData ? (
        <div className = "fixed inset-0 z-[999999999999999999999] bg-background w-full h-full">
          <div className = "flex flex-col items-center justify-center w-full h-full pb-16">
            <div className = "w-screen h-[50vh] relative">
              <Image src = {img} layout = 'fill' objectFit = 'contain'/>
            </div>
            <div>
              <h1 className = "max-w-md text-2xl font-medium">Hm, it seems like we&apos;re undergoing construction right now.</h1>
              <p className = "max-w-md mt-4 text-base text-onBackground/70 text-light">We apologize for this mistake, we are so embarassed.</p>
              <p className = "max-w-md text-base text-onBackground/70 text-light">Come back soon to shop all the all new trending products.</p>
            </div>
          </div>
        </div>
      )
      :
      (
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
            <meta property="og:image" content="https://www.hufistore.com/hufiOG.png"/>
            <meta property="og:type" content="website"/>
            <meta property="og:site_name" content="Hufi"/>


            {/* <!-- Twitter --> */}
            <meta property="twitter:card" content="summary_large_image"/>
            <meta property="twitter:url" content="https://www.hufistore.com/"/>
            <meta property="twitter:title" content="Hufi"/>
            <meta property="twitter:description" content="Selling innovative, life changing products."/>
            <meta property="twitter:image" content="https://www.hufistore.com/hufiOG.png"/>
        </Head>
        <main>
          <Hero data = {data}/>
          <HorizontalProducts data = {productData}/>
          <CollectionSubCol data = {collections}/>
        </main>
        </>
      )}
    </>
  )
}


export async function getStaticProps(){
  try{
    const {data,errors} = await storefront(viewIndexMetafields, {handle:"home"})
  
    const collectionsJSON = data.page.collections.value ? JSON.parse(data.page.collections.value) : undefined
  
    // TODO, loop through collection sets, query values and rewrite values to collection data
    for(const [index,set] of collectionsJSON.entries()){
      const queryData = []
      for(const value of set.collectionTitles){
        const {data:collection, errors:collectionError} = await storefront(allCollections,{amount:1, queryArgs:`[${value}]`})
        queryData.push(collection)
      }
      collectionsJSON[index].collectionTitles = queryData
    }
  
  
    let prods = null;
    if(data.page.displayProducts.value){
      const {data:products, errors:productsError} = await storefront(viewProducts,{amount:10})
      prods = products
    }
  
  
  
    return{
      props:{
        data:data,
        collections:collectionsJSON,
        productData:prods,
      }
    }
  }catch(e){
    return{
      props:{
      }
    }
  }
}

