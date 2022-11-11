import { NextPage,GetServerSideProps } from 'next'
import React from 'react'
import Layout from '../../components/global/Layout'
import { storefront } from '../../utils/storefront'
import { viewMenu } from '../../graphql/queries/viewMenu'
import { getCustomer } from '../../graphql/queries/getCustomer'
import {viewArticleByHandle} from '../../graphql/queries/blogs/viewArticleByHandle'

interface iArticle {
  contentHtml: string,
  publishedAt:string,
  title:string,
}

const formatDate = (userDate:string,monthAdd:number) =>{
  const num = monthAdd ?? 0

  const removeTime = new Date (new Date(userDate).toDateString())
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const month = new Date(removeTime).getMonth()
  const day = new Date(removeTime).getDate()
  const year = new Date(removeTime).getFullYear()
  return {
    month:months[month + num],
    day:day,
    year:year,
  }
}

const Blog:NextPage<any> = ({pageProps,article}) => {  
  return (
    <Layout {...pageProps}>
      <section className = "bg-secondaryVariant text-onSecondary">
        <div className = "flex flex-col px-4 pb-4 mx-auto md:pb-16 pt-14 sm:flex-row-reverse sm:justify-between max-w-7xl">
          <div className = "flex-1">
            {article.tags.map((tag:string,index:number)=>(
              <span 
                className = "px-3 py-0.5 rounded-full border border-onSecondary/60 text-xs sm:text-sm"
                key = {index}
              >
                {tag}
              </span>
            ))}
            <h1 className = 'my-2 text-3xl font-medium sm:my-0 md:text-4xl lg:text-6xl sm:mt-4'>{article.title}</h1>
          </div>
          <div className = "flex-[0.5] mt-auto mb-1 ">
            <p className = "text-sm font-light">
              {formatDate(article.publishedAt,0).month}
              {' '}
              {formatDate(article.publishedAt,0).day},
              {' '}
              {formatDate(article.publishedAt,0).year}
            </p>
          </div>
        </div>
      </section>
      <section className = "">
        <div className = 'max-w-6xl px-4 py-16 mx-auto text-left'>
          <div
            className = 
            {`
              prose-p:xl:text-xl prose-p:lg:text-lg prose-p:md:text-base prose-p:opacity-70
              prose-h1:xl:text-4xl prose-h1:font-bold prose-h1:md:text-3xl prose-h1:text-2xl prose-h1:my-4
              prose-h2:xl:text-3xl prose-h2:font-bold prose-h2:md:text-2xl prose-h2:text-xl prose-h2:my-4
              prose-h3:xl:text-2xl prose-h3:font-bold prose-h3:md:text-xl prose-h3:text-[19px] prose-h3:my-4
              prose-h4:xl:text-xl prose-h4:font-bold prose-h4:md:text-[19px] prose-h4:text-[18px] prose-h4:my-4
              prose-h5:xl:text-[19px] prose-h5:font-bold prose-h5:md:text-[18px] prose-h5:text-[17px] prose-h5:my-4
              prose-h6:xl:text-[17px] prose-h6:font-bold prose-h6:md:text-[17px] prose-h6:text-[16px] prose-h6:my-4
              prose-blockquote:ml-10 prose-blockquote:my-4
              prose-img:rounded-xl
              prose-img:inline
            `}
            dangerouslySetInnerHTML={{__html: article.contentHtml}}
          />
        </div>
      </section>
    </Layout>
  )
}

export default Blog

export const getServerSideProps: GetServerSideProps = async (context)=>{
  const cookies = context?.req?.cookies?.userAccess
  let pageProps: Record<string,any> = {}
  const {data:headerData} = await storefront(viewMenu,{menuName:"main-menu"})
  const {data:footerData} = await storefront(viewMenu,{menuName:"footer"})
  const {data:userInformation,errors} = await storefront(getCustomer,{token:cookies || "randomletters"})

  const {data:articleData,errors:articleErrors} = await storefront(viewArticleByHandle,{handle:context?.params?.handle})

  if(articleData){
    pageProps["headerData"] = headerData || null
    pageProps["footerData"] = footerData || null
    pageProps["userData"] = userInformation || null
    pageProps["userAccess"] = cookies || null
    return {props:{
      pageProps:pageProps,
      article:articleData?.blog?.articleByHandle
    }}
  }else{
    return{
      redirect: {
        permanent: false,
        destination: `/404`
      }
    }
  }
}