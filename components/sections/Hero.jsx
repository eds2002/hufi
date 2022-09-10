import React from 'react'
import { Button } from '../elements'

const Hero = ({data}) => {
  return (
    <section className="bg-primary1">
      <div className = "w-full h-[80vh] max-w-7xl mx-auto px-4 flex items-center justify-start">
        <div className="text-center">
          <div className = {`prose 
              prose-h3:text-4xl prose-h3:font-semibold prose-h3:text-left prose-h3:text-primary2 prose-h3:sm:text-5xl prose-h3:md:text-6xl
              `}>
            <div
              dangerouslySetInnerHTML={{__html: data?.collection?.descriptionHtml}}
            />
          </div>
          {/* <h1 className="text-4xl font-bold tracking-tight text-left text-primary3 sm:text-5xl md:text-6xl">
            <span className="block xl:inline text-primary2">Home decore with</span>{' '}
            <span className="block text-primary3 xl:inline">Hufi.</span>
          </h1> */}
            <Button text = "Shop now" CSS = {"w-[50%] mt-5"}/>
          </div>
        </div>
    </section>
  )
}

export default Hero