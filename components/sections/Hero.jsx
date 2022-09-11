import React from 'react'
import { Button } from '../elements'

const Hero = ({data}) => {
  return (
    <section className="bg-background">
      <div className = "w-full h-[80vh] max-w-7xl mx-auto px-4 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center max-w-sm sm:max-w-7xl">
          <div className = {`prose  
              prose-h3:text-4xl prose-h3:font-semibold prose-h3:text-onBackground prose-h3:sm:text-5xl prose-h3:md:text-6xl
              prose-h6:text-center prose-h3:mt-0 prose-h6:text-onBackground/80 prose-h6:text-xs prose-h6:ring-2 prose-h6:w-24 prose-h6:mx-auto prose-h6:rounded-full prose-h6:ring-primaryVariant
              prose-h3:text-center
              `}>
            <div
              dangerouslySetInnerHTML={{__html: data?.collection?.descriptionHtml}}
            />
          </div>
            <Button text = "Shop now" CSS = {"w-[50%]"}/>
        </div>
      </div>
    </section>
  )
}

export default Hero