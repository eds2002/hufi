import { Button } from "../elements";
import { slugify } from "../../utils/slugify";
import Link from "next/link";
import { Skeleton } from "@mui/material";
import Image from "next/image";
import { useState,useRef,useEffect } from "react";


export default function Collections({data, style}) {
  return (
    <>
        {data && (
          <section className = "py-24 bg-background">
            <div className = "px-4 mx-auto max-w-7xl">
              <h1 className = "mb-6 text-2xl font-medium">{data.heading.title ?? 'Collection Heading'}</h1>
            </div>
            <div className={`grid gap-6 px-4 mx-auto ${style == "row" ? 'lg:grid-cols-3' : 'lg:grid-cols-2' } max-w-7xl ${style == "row" || data.collectionTitles.length === 2 ? "min-h-[50vh]" : "min-h-[100vh]"} ${style === "row" && ('grid-flow-col auto-cols-[90%] ')} overflow-scroll`}>        
              {data.collectionTitles.map((collection,index)=>(
                <CollectionBox key = {index} collection = {collection} index = {index} data = {data} style = {style}/>
              ))}
            </div>
          </section>
        )}
    </>
  )
}

function CollectionBox({collection,index, data, style}){
  const [handle,setHandle] = useState('/collection/404')
  const aRef = useRef()
  useEffect(()=>{
    const handleFromRef = aRef.current?.getElementsByTagName("a")[0]?.innerText ?? "/404"
    setHandle(handleFromRef)
  },[])
  return(
    <div key = {index} className={`relative flex ${index === 0 && data.collectionTitles.length === 3 && style != "row" && 'md:row-span-2'} h-[60vh] md:h-full rounded-md overflow-hidden `}>
      <Image
        src={collection.collections.nodes[0]?.image.originalSrc}
        alt={collection.collections.nodes[0]?.image.altText}
        className="absolute inset-0 object-cover object-center w-full h-full"
        layout="fill"
        priority
      />
      <div className = "absolute inset-0 bg-black/40 mix-blend-darken"/>
      <div className="relative flex flex-col items-start justify-end w-full p-8 sm:p-12">
        <div className = {`w-full max-w-xs
        prose-h6:text-sm prose-h6:font-medium prose-h6:text-primary prose-h6:text-opacity-90
        prose-h3:mt-1 prose-h3:text-2xl prose-h3:font-medium prose-h3:text-white
        prose-a:hidden
        `}
        >
          {collection.collections.nodes[0]?.descriptionHtml ? 
            <div
              dangerouslySetInnerHTML={{__html: collection.collections.nodes[0]?.descriptionHtml}}
              ref = {aRef}
            />
            :
            <span>
              {/* <Skeleton animation = "wave" sx={{bgcolor:'grey.500', width:100}}/>
              <Skeleton animation = "wave" sx={{bgcolor:'grey.500'}}/> */}
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
