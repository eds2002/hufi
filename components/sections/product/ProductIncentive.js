import React from 'react'
import { Button } from '../../elements'
import Link from 'next/link'
import Image from 'next/image'

const ProductIncentive = ({data}) => {
  const incentiveJSON = data?.product?.incentive?.value ? JSON.parse(data.product.incentive.value) : undefined
  return (
    <>
      {(data && incentiveJSON) && (
        <section className = "relative w-full h-[50vh] md:h-[70vh] ">
          <div className = "relative w-full h-full">
            {incentiveJSON.imageUrl ? 
              <Image src = {incentiveJSON.imageUrl} alt = {incentiveJSON.alt} layout = 'fill' objectFit='cover' className = ""/>
            :
              <div className = "w-full h-full bg-surface" />
            }          
            <div className = "absolute inset-0 flex items-center justify-center bg-black/25">
              <div className = "flex flex-col items-center justify-center w-full max-w-xs">
                <span className = "text-primaryVariant">~ Hufi</span>
                <h1 className = "text-xl font-medium md:text-2xl text-background">{incentiveJSON.heading}</h1>
                <p className = "mt-3 text-sm text-center text-background/80 md:text-base">{incentiveJSON.paragraph}</p>
                {incentiveJSON.link != '' && (
                  <Link>
                    <div className = "w-32 mt-4">
                      <Button text = 'Learn more' CSS = 'bg-background py-1'/>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default ProductIncentive