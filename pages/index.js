import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { storefront } from '../utils/storefront'
import {getCustomMetafield} from '../graphql/queries/getCustomMetafield'
import {storeInformation} from '../graphql/queries/storeInformation'
import {viewProducts} from '../graphql/queries/viewProducts'
import {viewCollectionByHandle} from '../graphql/queries/viewCollectionByHandle'
import {allCollections} from '../graphql/queries/allCollections'
import { Collections, Hero, HorizontalProducts, Incentive, Testimonial, TestimonialsGrid } from '../components/sections'

export default function Home(props) {
  return (
    <>
      <Hero data = {props.heroData}/>
      <Testimonial/>
      <HorizontalProducts data = {props.products}/>
      <Collections data = {props.collectionData}/>
      <Incentive/>
      <TestimonialsGrid/>
    </>
  )
}

export async function getStaticProps(){
  const {data:shopInformation,errors:storeInfoErrors} = await storefront(storeInformation)
  const {data:heroData, errors:heroBannerError} = await storefront(getCustomMetafield,{namespace:"custom",key:"hero_banners",ownerId:"gid://shopify/Collection/412514451682"})
  const {data:products, errors:productsError} = await storefront(viewProducts,{amount:3})

  let collectionArr = []
  const {data:allProdCol, errors:allProdColErr} = await storefront(allCollections,{amount:5, queryArgs:"[title:All Products]" }).then(res=>collectionArr.push(res.data.collections))
  const {data:homeDecorCol, errors:homeDecorColErr} = await storefront(allCollections,{amount:5, queryArgs:"[title:Hufi Home]"}).then(res=>collectionArr.push(res.data.collections))

  return{
    props:{
      shopInformation:shopInformation || storeInfoErrors,
      heroData:heroData || heroBannerError,
      products:products || productsError,
      collectionData:collectionArr || `${allProdColErr} OR ${homeDecorColErr}`,
    }
  }
}

