import Image from 'next/image'
import React from 'react'

const CollectionBanner = ({data}) => {
  const incentives = data?.collectionByHandle?.incentives?.value ? JSON.parse(data?.collectionByHandle?.incentives?.value) : undefined
  return (
    <section className = "w-full h-[65vh] md:h-[65vh] relative">
      {data?.collectionByHandle?.banner?.reference?.image?.url ? 
      <Image src = {data?.collectionByHandle?.banner?.reference?.image?.url} layout = 'fill' className = "object-cover w-full h-full pointer-events-none select-none" priority altText = {data?.collectionByHandle?.banner?.reference?.image?.altText}/>
      :
      <Image src = {data?.collectionByHandle?.image?.url} layout = 'fill' className = "object-cover w-full h-full pointer-events-none select-none" priority altText = {data?.collectionByHandle?.image?.altText}/>
      }
      <div className = "absolute inset-0 bg-black/25"/>
      <div className = "absolute inset-0 z-10 px-4 pb-16 mx-auto max-w-7xl">
        <div className = "flex items-end justify-start w-full h-full max-w-sm">
          <div
            className="block prose-h1:font-medium prose-h1:text-4xl prose-h1:text-md prose-p:mt-2 prose-h1:text-white prose-p:text-white prose-p:md:text-lg prose-p:text-base prose-p:font-light prose-h6:text-2xl prose-h6:font-medium prose-h3:text-white prose-h6:text-white prose-h3:font-light prose-h3:text-lg"
            dangerouslySetInnerHTML={{ __html: data?.collectionByHandle?.collectionText?.value || data?.collectionByHandle?.descriptionHtml }}
          />
        </div>
      </div>
    </section>
  )
}

export default CollectionBanner