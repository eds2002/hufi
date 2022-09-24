import Image from 'next/image'
import React from 'react'

const ProductImageView = ({data}) => {
  return (
    <section className = "w-full py-24 sm:py-0">
      {(data?.product?.mediaOne?.reference?.image?.url && data?.product?.mediaOneText?.value) && (
        <div className = "flex flex-col w-full h-full md:flex-row">
          <div className = "md:flex-1 h-[30vh] md:h-[50vh] relative">
            <Image src = {data?.product?.mediaOne.reference.image.url} layout='fill' objectFit='cover'/>
          </div>
          <div className = "flex items-center justify-center md:justify-start py-14 md:flex-1">
            <div className = "max-w-sm px-4 ml-0 text-center md:ml-10 md:text-left">
              <div
                className="prose-h1:md:text-4xl prose-h1:text-xl prose-h1:font-medium prose-p:mt-4 prose-p:text-base prose-p:text-onBackground/70 prose-p:lg:text-lg"
                dangerouslySetInnerHTML={{ __html: data?.product?.mediaOneText?.value }}
              />
            </div>
          </div>
        </div>
      )}
      {(data?.product?.mediaTwo?.reference?.image?.url && data?.product?.mediaTwoText?.value) && (
        <div className = "flex flex-col md:flex-row-reverse ">
          <div className = "md:flex-1 h-[30vh] md:h-[50vh] relative">
            <Image src = {data?.product?.mediaTwo.reference.image.url} layout='fill' objectFit='cover'/>
          </div>
          <div className = "flex items-center justify-center md:justify-end py-14 md:flex-1">
            <div className = "max-w-sm px-4 text-center md:mr-10 md:text-left">
              <div
                className="prose-h1:md:text-4xl prose-h1:text-xl prose-h1:font-medium prose-p:mt-4 prose-p:text-base prose-p:text-onBackground/70 prose-p:lg:text-lg"
                dangerouslySetInnerHTML={{ __html: data?.product?.mediaTwoText?.value }}
              />
            </div>
          </div>
        </div>
      )}  
      {(data?.product?.mediaThree?.reference?.image?.url && data?.product?.mediaThreeText?.value) && (  
        <div className = "flex flex-col md:flex-row">
          <div className = "md:flex-1 h-[30vh] md:h-[50vh]  relative">
            <Image src = {data?.product?.mediaThree.reference.image.url} layout='fill' objectFit='cover'/>
          </div>
          <div className = "flex items-center justify-center md:justify-start py-14 md:flex-1">
            <div className = "max-w-sm px-4 text-center md:ml-10 md:text-left">
              <div
                className="prose-h1:text-5xl prose-h1:font-medium prose-p:mt-4 prose-p:text-base prose-p:text-onBackground/70 prose-p:lg:text-lg"
                dangerouslySetInnerHTML={{ __html: data?.product?.mediaThreeText?.value }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default ProductImageView