import Image from 'next/image'
import React from 'react'

const ProductImageView = ({data}) => {
  return (
    <section className = "w-full px-4 py-24 mx-auto">
      {(data?.product?.mediaOne?.reference?.image?.url && data?.product?.mediaOneText?.value) && (
        <div className = "flex flex-col w-full h-full md:flex-row">
          <div className = "md:flex-1 h-[50vh] md:h-[80vh] relative bg-surface rounded-md overflow-hidden">
            <Image src = {data?.product?.mediaOne.reference.image.url} layout='fill' objectFit='cover' priority/>
          </div>
          <div className = "flex items-center justify-center md:justify-start py-14 md:flex-1">
            <div className = "max-w-sm px-4 text-center md:text-left md:mx-auto ">
              <div
                className="prose-h1:md:text-4xl prose-h1:text-3xl prose-h1:font-medium prose-p:mt-4 prose-p:text-base prose-p:text-onBackground/70 prose-p:xl:text-lg"
                dangerouslySetInnerHTML={{ __html: data?.product?.mediaOneText?.value }}
              />
            </div>
          </div>
        </div>
      )}
      {(data?.product?.mediaTwo?.reference?.image?.url && data?.product?.mediaTwoText?.value) && (
        <div className = "flex flex-col md:flex-row-reverse ">
          <div className = "md:flex-1 h-[50vh] md:h-[80vh] relative bg-surface rounded-md overflow-hidden">
            <Image src = {data?.product?.mediaTwo.reference.image.url} layout='fill' objectFit='cover' priority/>
          </div>
          <div className = "flex items-center justify-center md:justify-end py-14 md:flex-1">
            <div className = "max-w-sm px-4 text-center md:mx-auto md:text-left">
              <div
                className="prose-h1:md:text-4xl prose-h1:text-3xl prose-h1:font-medium prose-p:mt-4 prose-p:text-base prose-p:text-onBackground/70 prose-p:xl:text-lg"
                dangerouslySetInnerHTML={{ __html: data?.product?.mediaTwoText?.value }}
              />
            </div>
          </div>
        </div>
      )}  
      {(data?.product?.mediaThree?.reference?.image?.url && data?.product?.mediaThreeText?.value) && (  
        <div className = "flex flex-col md:flex-row">
          <div className = "md:flex-1 h-[50vh] md:h-[80vh] bg-surface relative rounded-md overflow-hidden">
            <Image src = {data?.product?.mediaThree.reference.image.url} layout='fill' objectFit='cover' priority/>
          </div>
          <div className = "flex items-center justify-center md:justify-start py-14 md:flex-1">
            <div className = "max-w-sm px-4 text-center md:text-left md:mx-auto ">
              <div
                className="prose-h1:md:text-4xl prose-h1:text-3xl prose-h1:font-medium prose-p:mt-4 prose-p:text-base prose-p:text-onBackground/70 prose-p:xl:text-lg"
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