import React from 'react'
import { storefront } from '../../utils/storefront'
import {getPageByHandle} from '../../graphql/queries/getPageByHandle'
import Head from 'next/head'

const PageName = ({pageData}) => {
  return (
    <>
      {pageData.page &&
      <>
      <Head>
        <meta charSet='UTF-8'/>
        <meta name = 'viewport' content = 'width=device-width, initial-scale=1.0'/>
        <meta httpEquiv='X-UA-Compatible' content='ie=edge'/>
        <title>Hufi - {pageData.page.seo.title}</title>
        <meta name = "description" content = {pageData.page.seo.description}/>
        <meta name = "keywords" content = 'HUFI, TRENDING, PRODUCTS, INNOVATIVE, LIFE, CHANGING'/>

        <meta property="og:title" content="Hufi"/>
        <meta property="og:description" content={pageData.page.seo.description}/>
        <meta property="og:url" content={`https://www.hufistore.com/pages/${slugify(pageData.page.seo.title)}`}/>
        <meta property="og:locale" content="en_US"/>
        <meta property="og:image" content="https://www.hufistore.com/hufiOG.png"/>
        <meta property="og:type" content="website"/>
        <meta property="og:site_name" content="Hufi"/>


        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content={`https://www.hufistore.com/pages/${slugify(pageData.page.seo.title)}`}/>
        <meta property="twitter:title" content="Hufi"/>
        <meta property="twitter:description" content={pageData.page.seo.description}/>
        <meta property="twitter:image" content="https://www.hufistore.com/hufiOG.png"/>
      </Head>
      <main>
        <section className = "w-full h-full py-24">
          <h1 className = "px-4 mx-auto text-4xl font-medium max-w-7xl">{pageData.page.title}</h1>
          <div className = "px-4 mx-auto prose max-w-7xl prose-h1:font-semibold prose-h1:text-2xl">
            <div dangerouslySetInnerHTML={{__html: pageData.page.body}}/>
          </div>
        </section>
      </main>
      </>
      }
    </>
  )
}

export default PageName

export async function getServerSideProps(context) {
  try{
    const { req, query, res, asPath, pathname } = context;
    const {data:pageData,errors} = await storefront(getPageByHandle, {handle:query.pageName})
    if(pageData.page){
      return{
        props:{pageData:pageData || errors, title:query.pageName}
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