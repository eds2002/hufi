import Head from 'next/head'
import { storefront } from '../utils/storefront'
import {viewProducts} from '../graphql/queries/viewProducts'
import {allCollections} from '../graphql/queries/allCollections'
import { Collections, Hero, HorizontalProducts, Incentive, Signup, Testimonial, TestimonialsGrid } from '../components/sections'
import { viewIndexMetafields } from '../graphql/queries/viewIndexMetafields'
import CollectionSubCol from '../components/sections/collection/CollectionSubCol'

export default function Home({data,collections,productData}) {
  return (
    <>
      {!data || !collections || !productData ? (
        <div className = "flex items-center justify-center w-full h-full">
          <h1>Oops... This is awkward</h1>
          <h1>Seems like site is under construction right now! Come back later.</h1>
        </div>
      )
      :
      (
        <>
        <Hero data = {data}/>
        <CollectionSubCol data = {collections}/>
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
      if(index < 3){
        for(const value of set.collectionTitles){
          const {data:collection, errors:collectionError} = await storefront(allCollections,{amount:1, queryArgs:`[${value}]`})
          queryData.push(collection)
        }
        collectionsJSON[index].collectionTitles = queryData
      }
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

