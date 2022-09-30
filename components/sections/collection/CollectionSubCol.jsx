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
      <div className = 'mx-auto '>
        {data.map((collectionSet,index)=>(
          <>
            <div className = "">
              {collectionSet?.heading?.title != "" && (
                <h1 className = "px-4 pt-10 mx-auto mb-6 text-2xl font-medium max-w-7xl">{collectionSet?.heading?.title ?? 'Collection Heading'}</h1>
              )}
              <div className = {`
                ${collectionSet.style.type === "Default" && ('grid w-full grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-3 h-screen max-w-7xl px-4 mx-auto pb-10')}
                ${collectionSet.style.type === "Row" && (`grid grid-flow-col auto-cols-[95%] sm:auto-cols-[48%] lg:auto-cols-[32%] w-full h-[50vh] gap-3 max-w-7xl px-4 mx-auto pb-10`)}
                ${collectionSet.style.type === "TwoRow" && (`grid md:grid-cols-2  w-full h-screen gap-3 max-w-7xl px-4 mx-auto pb-10`)}
                ${collectionSet.style.type === "Banner" && (`grid h-[60vh] gap-3 max-w-7xl px-4 mx-auto pb-10`)}
                ${collectionSet.style.type === "Header" && (`h-[80vh]`)}
                overflow-scroll 
              `}>
                {collectionSet.collectionTitles.map((set,index)=>(
                  <CollectionBox set = {set} index = {index} collectionSet = {collectionSet} key = {index}/>
                ))}
              </div>
            </div> 
          </>
        ))}
        <div className = "px-4 mx-auto max-w-7xl">
          <Signup/>
        </div>
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
          <div className="relative flex flex-col items-start justify-end w-full h-full p-8 mx-auto sm:p-12 max-w-7xl">
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
                <Button text = "Shop" CSS = ' mt-3 w-24 py-1 bg-background text-onBackground '/>
              </Link>
            </div>          
          </div>
    </div>
  )
}