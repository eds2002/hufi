import { storefront } from '../../../utils/storefront';
import { viewCollectionByHandle } from '../../../graphql/queries/viewCollectionByHandle';
import { CollectionBanner, CollectionProducts, CollectionSubCol } from '../../../components/sections/collection';
import { allCollections } from '../../../graphql/queries/allCollections';
import { Signup } from '../../../components/sections';
import ErrorImg from '../../../assets/404.svg'
import Link from 'next/link';
import { Button } from '../../../components/elements';
import Image from 'next/image';
import Head from 'next/head';
import { slugify } from '../../../utils/slugify';
import { useRouter } from 'next/router';
import Layout from '../../../components/global/Layout';
import { viewMenu } from '../../../graphql/queries/viewMenu';
import { getCustomer } from '../../../graphql/queries/getCustomer';

const CollectionPage = ({collectionData, urlFilters,subCollections,collectionName,pageProps}) => {
  const router = useRouter()
  return (
    <>
      {collectionData && subCollections &&
      <>
      <Head>
        <meta charSet='UTF-8'/>
        <meta name = 'viewport' content = 'width=device-width, initial-scale=1.0'/>
        <meta httpEquiv='X-UA-Compatible' content='ie=edge'/>
        <title>Hufi - {collectionData.collectionByHandle.title}</title>
        <meta name = "description" content = {collectionData.collectionByHandle.seo.description}/>
        <meta name = "keywords" content = 'HUFI, TRENDING, PRODUCTS, INNOVATIVE, LIFE, CHANGING'/>

        <meta property="og:title" content="Hufi"/>
        <meta property="og:description" content={collectionData.collectionByHandle.seo.description}/>
        <meta property="og:url" content={`https://www.hufistore.com/product/${slugify(collectionData.collectionByHandle.title)}`}/>
        <meta property="og:locale" content="en_US"/>
        <meta property="og:image" content="https://www.hufistore.com/hufiOG.png"/>
        <meta property="og:type" content="website"/>
        <meta property="og:site_name" content="Hufi"/>


        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content={`https://www.hufistore.com/product/${slugify(collectionData.collectionByHandle.title)}`}/>
        <meta property="twitter:title" content="Hufi"/>
        <meta property="twitter:description" content={collectionData.collectionByHandle.seo.description}/>
        <meta property="twitter:image" content="https://www.hufistore.com/hufiOG.png"/>
      </Head>
      <Layout {...pageProps}>
        <main className = "relative w-full h-full">
          <div className = "sticky z-20 py-2 text-2xl font-medium bg-surface top-16">
            <p className = "px-4 mx-auto max-w-7xl">{collectionData.collectionByHandle.title}</p>
          </div>
          <CollectionSubCol data = {subCollections}/>
        </main>
      </Layout>
      </>
      }
    </>
  )
}

export async function getServerSideProps(context) {
  try{
    // For layout
    const cookies = context?.req?.cookies?.userAccess
    let pageProps = {}
    const {data:headerData} = await storefront(viewMenu,{menuName:"main-menu"})
    const {data:footerData} = await storefront(viewMenu,{menuName:"footer"})
    const {data:userInformation} = await storefront(getCustomer,{token:cookies || "randomletters"})
    pageProps["headerData"] = headerData
    pageProps["footerData"] = footerData
    pageProps["userData"] = userInformation
    pageProps["userAccess"] = cookies


    const { req, query, res, asPath, pathname } = context;
    const filtersArr = await query?.filterBy?.split(",")
    const {data:collection,errors} = await storefront(viewCollectionByHandle, {handle:query.collection, amount:50})
  
    const subCollectionsJSON = collection?.collectionByHandle?.subCollections?.value ? JSON.parse(collection.collectionByHandle.subCollections.value) : undefined
  
    for(const [index,set] of subCollectionsJSON.entries()){
      const queryData = []
      for(const value of set.collectionTitles){
        const {data:collection, errors:collectionError} = await storefront(allCollections,{amount:1, queryArgs:`[${value}]`})
        queryData.push(collection)
      }
      subCollectionsJSON[index].collectionTitles = queryData
    }
    return{
      props:{
        collectionData:collection || errors,
        urlFilters:filtersArr || null,
        subCollections:subCollectionsJSON,
        pageProps:pageProps
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

export default CollectionPage