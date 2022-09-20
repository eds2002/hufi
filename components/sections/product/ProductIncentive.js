import React from 'react'
import { Button } from '../../elements'
import Link from 'next/link'
import Image from 'next/image'

const ProductIncentive = () => {
  return (
    <section className = "w-full h-[70vh] px-4 mx-auto  max-w-7xl">
      <div className = "relative w-full h-full">
        <Image src = "https://images.pexels.com/photos/981062/pexels-photo-981062.jpeg?cs=srgb&dl=pexels-dominic-buccilli-981062.jpg&fm=jpg" layout = 'fill' objectFit='cover' className = "rounded-md"/>
        <div className = "absolute inset-0 flex items-center justify-center rounded-md bg-black/40">
          <div className = "flex flex-col items-center justify-center w-full max-w-sm">
            <span className = "text-primaryVariant">~ Hufi</span>
            <h1 className = "text-xl `md:text-2xl text-background">We love our pets.</h1>
            <p className = "text-sm text-center text-background/80 md:text-base">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque, deserunt reiciendis. Velit sunt dolorem debitis eligendi cum dolorum, illum eum modi ea minus voluptate magni similique alias corrupti dolore nostrum!</p>
            <div className = "w-32 mt-4">
              <Button text = 'Learn more' CSS = 'bg-background py-2'/>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductIncentive