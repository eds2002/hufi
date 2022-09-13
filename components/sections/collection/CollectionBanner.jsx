import Image from 'next/image'
import React from 'react'

const CollectionBanner = ({data}) => {
  const incentives = data?.collectionByHandle?.incentives?.value ? JSON.parse(data?.collectionByHandle?.incentives?.value) : undefined
  return (
    <section className = "w-full h-[20vh] md:h-[65vh] relative">
      {data?.collectionByHandle?.banner?.reference?.image?.url ? 
      <Image src = {data?.collectionByHandle?.banner?.reference?.image?.url} layout = 'fill' className = "object-cover w-full h-full pointer-events-none select-none" priority altText = {data?.collectionByHandle?.banner?.reference?.image?.altText}/>
      :
      <Image src = {data?.collectionByHandle?.image?.url} layout = 'fill' className = "object-cover w-full h-full pointer-events-none select-none" priority altText = {data?.collectionByHandle?.image?.altText}/>
      }
      <div className = "absolute inset-0 bg-black/25"/>
      <div className = "absolute inset-0 z-10 px-4 mx-auto max-w-7xl">
        <div className = "w-full h-full max-w-sm pt-24">
          <div
            className="hidden md:block prose-h1:font-medium prose-h1:text-4xl prose-h1:text-md prose-p:mt-2 prose-h1:md:text-white prose-p:md:text-white prose-p:md:text-lg prose-p:text-base prose-p:font-light prose-h6:text-2xl prose-h6:font-medium prose-h3:text-white prose-h6:text-white prose-h3:font-light prose-h3:text-lg"
            dangerouslySetInnerHTML={{ __html: data?.collectionByHandle?.collectionText?.value || data?.collectionByHandle?.descriptionHtml }}
          />
        </div>
        <div className = "absolute bottom-[-80px] left-0 right-0 w-full px-4">
          <div className = "w-full h-full p-6 text-center rounded-md shadow-xl bg-background">
            <div
              className="md:hidden prose-h1:font-medium prose-h1:text-2xl prose-h1:text-md prose-p:mt-2 prose-h1:md:text-white prose-p:md:text-white prose-p:sm:text-base prose-p:text-base prose-p:font-light prose-h6:font-medium prose-h6:text-2xl prose-h6:text-md prose-h3:mt-2"
              dangerouslySetInnerHTML={{ __html: data?.collectionByHandle?.collectionText?.value || data?.collectionByHandle?.descriptionHtml}}
            />

            <div className = "items-center hidden gap-3 md:flex justify-evenly">
              {incentives?.map((incentive,key)=>(
                <div className = "flex flex-col items-center max-w-sm" key = {incentive.incentive}>
                  <div className = "relative w-14 h-14">
                    {incentive.icon && (
                      <Image src = {incentive.icon} layout = 'fill' priority className = "w-full h-full" alt = {incentive.altText}/>
                    )}
                  </div>
                  <h3 className = "mt-2 font-medium md:text-lg lg:text-xl text-onBackground">{incentive.incentive}</h3>
                  <p className = "font-light text-onBackground/80 md:text-sm lg:text-base">{incentive.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default CollectionBanner