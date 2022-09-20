import React from 'react'
import { storefront } from '../../utils/storefront'
import {getPageByHandle} from '../../graphql/queries/getPageByHandle'

const PageName = ({pageData:{page:{body,title}}}) => {
  return (
    <main>
      <section className = "w-full h-full py-24">
        <h1 className = "px-4 mx-auto text-4xl font-medium max-w-7xl">{title}</h1>
        <div className = "px-4 mx-auto prose max-w-7xl prose-h1:font-semibold prose-h1:text-2xl">
          <div dangerouslySetInnerHTML={{__html: body}}/>
        </div>
      </section>
    </main>
  )
}

export default PageName

export async function getServerSideProps(context) {
  const { req, query, res, asPath, pathname } = context;
  const {data:pageData,errors} = await storefront(getPageByHandle, {handle:query.pageName})
  return{
    props:{pageData:pageData || errors, title:query.pageName}
  }
}