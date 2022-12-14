import { storefront } from '../../../utils/storefront';
import { viewCollectionByHandle } from '../../../graphql/queries/viewCollectionByHandle';
import { CollectionBanner, CollectionProducts } from '../../../components/sections/collection';
import Image from 'next/image';
import Link from 'next/link';
import ErrorImg from '../../../assets/404.svg'
import { Button } from '../../../components/elements';
import Head from 'next/head';
import { slugify } from '../../../utils/slugify';
import Layout from '../../../components/global/Layout';
import { viewMenu } from '../../../graphql/queries/viewMenu';
import { getCustomer } from '../../../graphql/queries/getCustomer';

const SubCollectionPage = ({collectionData, urlFilters,pageProps}) => {
  return (
    <>
      {collectionData.collectionByHandle &&
      <>
        <Head>
          <meta charSet='UTF-8'/>
          <meta name = 'viewport' content = 'width=device-width, initial-scale=1.0'/>
          <meta httpEquiv='X-UA-Compatible' content='ie=edge'/>
          <title>Hufi - {collectionData.collectionByHandle.seo.title}</title>
          <meta name = "description" content = {collectionData.collectionByHandle.seo.description}/>
          <meta name = "keywords" content = 'HUFI, TRENDING, PRODUCTS, INNOVATIVE, LIFE, CHANGING'/>

          <meta property="og:title" content="Hufi"/>
          <meta property="og:description" content={collectionData.collectionByHandle.seo.description}/>
          <meta property="og:url" content={`https://www.hufistore.com/collection/col/${slugify(collectionData?.collectionByHandle?.seo?.title)}`}/>
          <meta property="og:locale" content="en_US"/>
          <meta property="og:image" content="https://www.hufistore.com/hufiOG.png"/>
          <meta property="og:type" content="website"/>
          <meta property="og:site_name" content="Hufi"/>


          {/* <!-- Twitter --> */}
          <meta property="twitter:card" content="summary_large_image"/>
          <meta property="twitter:url" content={`https://www.hufistore.com/collection/col/${slugify(collectionData?.collectionByHandle?.seo?.title)}`}/>
          <meta property="twitter:title" content="Hufi"/>
          <meta property="twitter:description" content={collectionData.collectionByHandle.seo.description}/>
          <meta property="twitter:image" content="https://www.hufistore.com/hufiOG.png"/>
        </Head>
        <Layout {...pageProps}>
          <div className = "h-full">
            <CollectionBanner data = {collectionData}/>
            <CollectionProducts data = {collectionData} filters = {urlFilters}/>
          </div>
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
    pageProps["headerData"] = headerData || null
    pageProps["footerData"] = footerData || null
    pageProps["userData"] = userInformation || null
    pageProps["userAccess"] = cookies || null


    const { req, query, res, asPath, pathname } = context;
    const filtersArr = await query?.filterBy?.split(",")
    const {data:collection,errors} = await storefront(viewCollectionByHandle, {handle:query.SubCollection, amount:50})
    if(collection.collectionByHandle){
      return{
        props:{
          collectionData:collection || errors,
          urlFilters:filtersArr || null,
          pageProps:pageProps || null,
        }
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

export default SubCollectionPage