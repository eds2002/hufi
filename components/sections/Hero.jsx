import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from '../elements'
import { useRef } from 'react'
import Image from 'next/image'

const Hero = ({data}) => {
  const [handle,setHandle] = useState()
  const textRef = useRef()
  useEffect(()=>{
    const tagHandle = textRef.current.getElementsByTagName("a")[0].innerText
    setHandle(tagHandle)
  },[])
  return (
    <section className="relative bg-background">
      <div className = "relative z-20 flex items-center justify-center w-full h-[50vh] md:h-screen px-4 mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center max-w-sm sm:max-w-7xl" >
          <div className = {`prose  
              prose-h1:text-4xl prose-h1:font-semibold prose-h1:sm:text-5xl prose-h1:md:text-6xl prose-h1:my-0 prose-h1:text-background
              prose-p:text-center prose-p:lg:text-lg prose-p:sm:text-base prose-p:mt-2 prose-p:text-background/90
              prose-h1:text-center
              prose-a:hidden
              `} ref = {textRef}>
            <div
              dangerouslySetInnerHTML={{__html: data?.page?.heroText?.value ?? '<h3>Idk</h3<h6>SomeShit</h3>'}}
            />
          </div>
          <Link href = {handle ?? '/collections/all-products'}>
            <Button text = "Shop now" CSS = {"w-[50%] bg-background py-2 text-onBackground"}/>
          </Link>
        </div>
      </div>
      <div className = "absolute inset-0 z-10 bg-black/40"/>
      <div className = "absolute inset-0">
        <div className = "w-full h-full">
          <img src = {data.page.heroImageBanner.reference.image.url} alt = {data.page.heroImageBanner.reference.image.altText} className = "object-cover w-full h-full"/>
        </div>
      </div>
    </section>
  )
}

export default Hero