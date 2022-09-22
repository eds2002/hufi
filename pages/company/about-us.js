import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../../components/elements'

const AboutUs = () => {
  return (
    <main>
      <section>
        <div className = "w-full bg-surface">
          <div className=  "flex flex-col items-center justify-center w-full px-4 py-24 mx-auto max-w-7xl">
            <h1 className = "text-2xl font-medium">
              We are hufi
            </h1>
            <p className = "text-center xl:text-lg text-onSurface/60">Making products our customers are bound to love.</p>
          </div>  
        </div>
      </section>
      <section className = "flex flex-col w-full h-screen md:flex-row md:items-center md:justify-center">
        <div className = "relative w-full h-full md:flex-1">
          <Image src = "https://images.pexels.com/photos/8213243/pexels-photo-8213243.jpeg?cs=srgb&dl=pexels-dziana-hasanbekava-8213243.jpg&fm=jpg" layout = 'fill' objectFit='cover'/>
        </div>
        <div className = "w-full h-auto px-4 py-20 md:flex-1 md:px-0">
          <h3 className = "text-2xl font-medium md:max-w-sm md:ml-8">Our objective is to create a happy atmosphere.</h3>
          <p className = "mt-5 text-light text-onBackground/60 md:max-w-sm md:ml-8">
            We believe you should be able to shop with trust and confidence. The anxiety of wondering
            if what you bought is durable, or even high quality. We understand the worries and is why we created Hufi.
            We believe in strong, durable products that our customers are going to love. We also really value customer satisafciton,
            which is why we always hold on to our beliefs.
          </p>

        </div>
      </section>
      <section className = "flex flex-col w-full h-screen bg-surface md:flex-row-reverse md:items-center">
        <div className = "relative w-full h-full md:flex-1">
          <Image src = "https://images.pexels.com/photos/1595388/pexels-photo-1595388.jpeg?cs=srgb&dl=pexels-fox-1595388.jpg&fm=jpg" layout = 'fill' objectFit='cover'/>
        </div>
        <div className = "w-full h-auto px-4 py-20 md:flex-1 md:flex md:flex-col md:items-end md:px-0">
          <h3 className = "w-full text-xl font-medium md:max-w-sm md:mr-8">Our contributions to better the world we live in.</h3>
          <p className = "mt-5 text-light text-onBackground/60 md:max-w-sm md:mr-8">
          We believe in bettering the world by doing our part to make a difference. We want to be able to provide quality products and exceptional customer service while also giving something back to the community. Thanks to you, we&apos;re able to help others through causes related to your purchase category.
          </p>
        </div>
      </section>
      <section className = "flex flex-col items-center justify-center py-24 text-center">
        <div className = "max-w-sm px-4 mx-auto">
          <h1 className = "text-2xl font-medium">~ Special thanks to you.</h1>
          <p className = "mt-2 text-onBackground/70">We wouldn&apos;t be where we are today if it werent for the thousands of customers purchasing everyday.</p>
          <p className = "mt-5 mb-2 text-onBackground/70">Enough emotions from us, let&apos;s help you find your next favorite product.</p>
          <Link href = "/">
            <Button text = 'Start browsing' />
          </Link>
        </div>
      </section>
    </main>
  )
}

export default AboutUs