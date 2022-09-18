import React from 'react'
import Image from 'next/image'
import { useRef,useEffect,useState } from 'react'
import Link from 'next/link'
import { Button } from '../../elements'
import { Skeleton } from '@mui/material'
import Signup from '../Signup'

const CollectionSubCol = ({data}) => {
  return (
    <section className = "w-full">
      <div className = 'px-4 mx-auto max-w-7xl'>
        {data.map((collectionSet,index)=>(
          <>
            {index === data.length-1 && (<Signup/>)}
            <div className = "py-24 ">
              <h1 className = "mb-6 text-2xl font-medium">{collectionSet.heading.title ?? 'Collection Heading'}</h1>
              <div className = {`
                ${collectionSet.style.type === "Default" && ('grid w-full grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-3 h-screen')}
                ${collectionSet.style.type === "Row" && (`grid grid-flow-col auto-cols-[95%] sm:auto-cols-[48%] lg:auto-cols-[32%] w-full h-[50vh] gap-3`)}
                ${collectionSet.style.type === "TwoRow" && (`grid md:grid-cols-2  w-full h-screen gap-3`)}
                ${collectionSet.style.type === "Banner" && (`grid h-[60vh] gap-3`)}
                overflow-scroll 
              `}>
                {collectionSet.collectionTitles.map((set,index)=>(
                  <CollectionBox set = {set} index = {index} collectionSet = {collectionSet} key = {index}/>
                ))}
              </div>
            </div> 
          </>
        ))}
      </div>
    </section>
  )
}
export default CollectionSubCol

function CollectionBox({set,index,collectionSet}){
  const [handle,setHandle] = useState('/collection/404')
  const aRef = useRef()
  useEffect(()=>{
    const handleFromRef = aRef.current?.getElementsByTagName("a")[0]?.innerText ?? "/404"
    setHandle(handleFromRef)
  },[])
  return(
    <div className = {`
      ${collectionSet.style.type === "Default" && (`${index === 0 && ('md:row-span-2 col-span-1')}`)}
      ${collectionSet.style.type === "Row" && (`col-span-1`)}
      relative w-full h-full rounded-md overflow-hidden aspect-square`}> 
        <Image src = {set?.collections?.nodes[0]?.image?.url} layout = 'fill' objectFit='cover' className = 'object-cover w-full h-full'/>
        <div className = "absolute inset-0 bg-black/40 mix-blend-darken"/>
          <div className="relative flex flex-col items-start justify-end w-full h-full p-8 sm:p-12">
            {/* FORMAT HTML */}
            <div className = {`w-full max-w-xs
            prose-h6:text-sm prose-h6:font-medium prose-h6:text-primary prose-h6:text-opacity-90
            prose-h3:mt-1 prose-h3:text-2xl prose-h3:font-medium prose-h3:text-white
            prose-a:hidden
            `}
            >
              {set?.collections?.nodes[0]?.descriptionHtml ? 
                <div
                  dangerouslySetInnerHTML={{__html: set.collections.nodes[0]?.descriptionHtml}}
                  ref = {aRef}
                />
                :
                <span>
                  <Skeleton animation = "wave" sx={{bgcolor:'grey.500', width:100}}/>
                  <Skeleton animation = "wave" sx={{bgcolor:'grey.500'}}/>
                </span>
              }
              <Link href = {handle}>
                <Button text = "Shop" CSS = ' mt-3 w-24 py-1 bg-secondaryVariant hover:bg-secondary'/>
              </Link>
            </div>          
          </div>
    </div>
  )
}