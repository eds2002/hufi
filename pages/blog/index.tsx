import { GetServerSideProps } from 'next'
import React, { useEffect, useRef,useState } from 'react'
import {storefront} from '../../utils/storefront'
import {viewMenu} from '../../graphql/queries/viewMenu'
import {getCustomer} from '../../graphql/queries/getCustomer'
import Layout from '../../components/global/Layout'
import { useRouter } from 'next/router'
import { useFetchBlogs } from '../../hooks/useFetchBlogs'
import Image from 'next/image'
import Link from 'next/link'


const filters = ["All","Recent","Products","Company"]

const Blog:React.FC<any> = ({pageProps}) => {
  const [selected,setSelected] = useState('All')
  const [paginationLimit] = useState(9)
  const [renderAmount,setRenderAmount] = useState(9)
  const [currentPagination, setCurrentPagination] = useState(1)

  const handlePaginationClick = (value:Number) =>{
    setCurrentPagination(Number(value))
    setRenderAmount(paginationLimit * Number(value))
  }


  const {isLoading,articles} = useFetchBlogs()
  

  let hasMounted = false
  useEffect(()=>{
    hasMounted = true;
    if(hasMounted){
      window.scrollTo({
        top:200,
        behavior:'smooth',
      })
    }
  },[currentPagination])




  return (
    <Layout {...pageProps} theme = {'dark'}>
      <section className = "h-[40vh] relative bg-secondaryVariant">
        <div className = "relative h-full px-4 py-16 mx-auto my-auto max-w-7xl">
          <div className = "flex flex-col items-center justify-center text-center gap-y-3 text-onSecondary">
            <h1 className = "text-6xl font-medium text-center">Hufi Blog</h1>
            <p className = "max-w-sm text-base text-center xl:text-xl md:text-lg opacity-60">In the mood for reading? Take a look at some of our blogs.</p>
          </div>
          <FiltersComponent
            filters = {filters}
            selected = {selected}
            setSelected = {setSelected}
          />
        </div>
      </section>
      <BlogsSection
        renderAmount = {renderAmount}
        paginationLimit = {paginationLimit}
        isLoading = {isLoading}
        articles = {articles}
        selected = {selected}
      />
      <Pagination 
        paginationLimit = {paginationLimit} 
        currentPagination = {currentPagination}
        handlePaginationClick = {handlePaginationClick}
        articles = {articles}
        />
    </Layout>
  )
}


interface FilterProps {
  filters:string[];
  setSelected:React.Dispatch<React.SetStateAction<any>>,
  selected:String,
}

const FiltersComponent:React.FC<FilterProps> = ({filters,setSelected,selected}) =>{
  return(
    <div className = "absolute flex px-4 py-2 rounded-full bottom-4 left-4 bg-onSecondary/20 gap-x-2 w-max">
      {filters.map((filter)=>(
        <li 
          className = {`list-none ${filter === selected ? 'bg-background px-4 py-0.5 rounded-full text-onBackground' : 'bg-transparent px-4 py-0.5 rounded-full text-background '} transition-all select-none cursor-pointer`}
          onClick = {()=>setSelected(filter)}
          key = {filter}
        >
          {filter}
        </li>
      ))}
    </div>
  )
}

interface BlogsSectionProps{
  [key:string]:any;
  renderAmount: number;
  paginationLimit:number;
  isLoading:boolean;
  selected:string;
}

interface iArticle{
  excerpt:string;
  handle:string;
  id:string;
  image:{
    url:string;
  }
  title:string;
  tags:string[];
}

const BlogsSection:React.FC<BlogsSectionProps> = ({renderAmount,paginationLimit, articles, isLoading,selected}) =>{
  return(
    <section className = 'px-4 py-24 mx-auto max-w-7xl' id = "blog">
      <div className = "grid w-full gap-6 divide-y md:grid-cols-2 lg:grid-cols-3 divide-opacity-20 sm:divide-y-0">
        {!isLoading && (
        <>
          {articles.map((article:iArticle,index:number) =>(
            <React.Fragment key = {index}>
              {(index <= renderAmount && index >= renderAmount - paginationLimit) && (
                <>
                  {selected != 'All' ? 
                  <>
                    {article.tags.filter((tag)=>tag === selected).length === 0 ? 
                    <div className = "flex items-center max-w-xs mx-auto font-medium text-center md:col-span-2 lg:col-span-3 h-[50vh] text-2xl">
                      We don&apos;t have any articles for this selected filter, pick another!
                    </div>
                    :
                    <>
                      {article.tags.includes(selected) && (
                      <div className = "flex flex-row-reverse items-center flex-1 px-2 py-4 overflow-hidden rounded-md hover:bg-surface sm:items-start sm:flex-col gap-x-3 ">
                          <div className = "relative flex items-center justify-center overflow-hidden bg-gray-200 rounded-md aspect-video sm:w-full w-52">
                            <Link href = {`/blog/${article.handle}`}>
                              <Image src = {article.image.url} layout = 'fill' className = "cursor-pointer select-none"/>
                            </Link>
                          </div>
                          <div className = "mr-auto sm:pt-4">
                            <Link href = {`/blog/${article.handle}`}>
                              <h6 className = "font-medium cursor-pointer sm:text-lg xl:text-2xl md:text-xl w-max">{article.title}</h6>
                            </Link>
                            <p className = "max-w-sm text-sm sm:text-base xl:text-xl text-onBackground/60 md:text-lg">{article.excerpt}</p>
                          </div>
                        </div> 
                      )}
                    </>
                    }
                  </>
                  :
                  <div className = "flex flex-row-reverse items-center flex-1 px-2 py-4 overflow-hidden rounded-md hover:bg-surface sm:items-start sm:flex-col gap-x-3">
                    <div className = "relative flex items-center justify-center overflow-hidden bg-gray-200 rounded-md aspect-video sm:w-full w-52">
                      <Link href = {`/blog/${article.handle}`}>
                        <Image src = {article.image.url} layout = 'fill' className = "cursor-pointer select-none"/>
                      </Link>
                    </div>
                    <div className = "mr-auto sm:pt-4">
                      <Link href = {`/blog/${article.handle}`}>
                        <h6 className = "font-medium cursor-pointer sm:text-lg xl:text-2xl md:text-xl w-max">{article.title}</h6>
                      </Link>
                      <p className = "max-w-sm text-sm sm:text-base xl:text-xl text-onBackground/60 md:text-lg">{article.excerpt}</p>
                    </div>
                  </div> 
                  }
                </>
              )}
            </React.Fragment>
          ))}
        </>
        )}
      </div>
    </section>
  )
}

interface PaginationProps{
  paginationLimit:Number;
  currentPagination:Number;
  handlePaginationClick: (params:Number) => void;
  [key:string]:any;
}

const Pagination:React.FC<PaginationProps> = ({articles, paginationLimit, currentPagination, handlePaginationClick,}) =>{
  return(
    <div className = "px-4 mx-auto max-w-7xl">
      <div className = "flex items-center justify-center mx-auto w-max gap-x-1">
        {articles && (
          <>
          {Array(Math.ceil(articles?.length/Number(paginationLimit))).fill({}).map((x,i)=>(
            <p 
              className = {`w-8 cursor-pointer h-8 rounded-full flex items-center justify-center ${currentPagination === (i + 1) ? 'bg-secondaryVariant text-onSecondary' : 'bg-transparent text-onBackground'}`}
              onClick = {()=>handlePaginationClick(i+1)}
              key = {i}
            >
              {i + 1}
            </p>
          ))}
          </>
        )}
      </div>
    </div>
  )
}


export default Blog

export const getServerSideProps: GetServerSideProps = async (context)=>{
  const cookies = context?.req?.cookies?.userAccess
  let pageProps: Record<string,any> = {}
  const {data:headerData} = await storefront(viewMenu,{menuName:"main-menu"})
  const {data:footerData} = await storefront(viewMenu,{menuName:"footer"})
  const {data:userInformation,errors} = await storefront(getCustomer,{token:cookies || "randomletters"})
  pageProps["headerData"] = headerData || null
  pageProps["footerData"] = footerData || null
  pageProps["userData"] = userInformation || null
  pageProps["userAccess"] = cookies || null
  return {props:{pageProps:pageProps}}
}