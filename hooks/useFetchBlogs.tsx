import React, { useEffect } from "react"
import { useState } from "react"
import { storefront } from "../utils/storefront"
import {getAllArticles} from '../graphql/queries/blogs/getAllArticles'
export const useFetchBlogs = () =>{
  const [isLoading,setIsLoading] = useState(true)
  const [articles,setArticles] = useState(null)

  useEffect(()=>{
    (async()=>{
      const {data,errors} = await storefront(getAllArticles)
      setArticles(data?.blogs?.nodes[0]?.articles.nodes)
      setIsLoading(false)
    })()
  },[])

  return {isLoading, articles}
}
