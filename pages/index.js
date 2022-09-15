import Head from 'next/head'
import { storefront } from '../utils/storefront'
import {viewProducts} from '../graphql/queries/viewProducts'
import {allCollections} from '../graphql/queries/allCollections'
import { Collections, Hero, HorizontalProducts, Incentive, Signup, Testimonial, TestimonialsGrid } from '../components/sections'
import { viewIndexMetafields } from '../graphql/queries/viewIndexMetafields'

export default function Home({data,collections,productData}) {

  return (
    <>
      <Hero data = {data}/>
      <Collections data = {collections[0]}/>
      {productData != null && (
        <HorizontalProducts data = {productData}/>
      )}
      <Collections data = {collections[1] ?? undefined}/>
      <Signup/>
      <Collections data = {collections[2] ?? undefined} style = "row"/>

    </>
  )
}


export async function getStaticProps(){
  try{

    const {data,errors} = await storefront(viewIndexMetafields, {handle:"home"})
    console.log(errors)
  
    const collectionsJSON = data.page.collections.value ? JSON.parse(data.page.collections.value) : undefined
  
    // TODO, loop through collection sets, query values and rewrite values to collection data
    for(const [index,set] of collectionsJSON.entries()){
      const data = []
      if(index < 3){
        for(const value of set.collectionTitles){
          const {data:collection, errors:collectionError} = await storefront(allCollections,{amount:1, queryArgs:`[title:${value}]`})
          data.push(collection)
        }
        collectionsJSON[index].collectionTitles = data
      }
    }
  
  
    let prods = null;
    if(data.page.displayProducts.value){
      const {data:products, errors:productsError} = await storefront(viewProducts,{amount:3})
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
    console.log('ERROR:',e)
    return{
      props:{
      }
    }
  }
}

