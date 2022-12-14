import Image from 'next/image'
import React from 'react'



const ProductBanner:React.FC<{data:string;}> = ({data}) => {
  const dataJSON = data ? JSON.parse(data) : null 
  return (
    <>
      {dataJSON && (  
        <section className = "relative px-4 py-10 mx-auto max-w-7xl">
          <div className = "relative flex flex-col justify-center w-full p-6 overflow-hidden rounded-md aspect-[16/9] md:aspect-[16/7] lg:aspect-[16/6] bg-neutral-300">
            {/* <div className = "absolute inset-0 z-10 rounded-md opacity-80 boxShadow"/> */}
            {dataJSON.image.split('').reverse().slice(0,3).reverse().join('') === "mp4" ? 
            <>
              <video autoPlay loop className = "absolute inset-0 z-[1] pointer-events-none select-none rounded-md" playsInline preload='auto'>
                <source src = {dataJSON.image} type = "video/mp4" />
              </video>
              <h1 className = "relative z-10 text-xl font-medium text-white sm:text-2xl md:text-4xl">{dataJSON.heading}</h1>
              <p className = "relative z-10 max-w-[175px] sm:max-w-xs mt-2 text-sm text-white/90 md:text-base lg:text-lg ">{dataJSON.paragraph}</p>
              {/* PLACEHOLDER */}
              <p className = "absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <span className = "font-extrabold text-8xl text-neutral-200 animate-pulse">Hufi.</span>
              </p>
            </>
            :
            <>
              <Image src = {dataJSON.image} layout = 'fill' objectFit='cover' objectPosition={dataJSON.imagePos} className = "pointer-events-none select-none z-[1] rounded-md" priority/>
              <h1 className = "relative z-10 text-xl font-medium text-white sm:text-2xl md:text-4xl">{dataJSON.heading}</h1>
              <p className = "relative z-10 max-w-[175px] sm:max-w-xs mt-2 text-sm text-white/90 md:text-base lg:text-lg ">{dataJSON.paragraph}</p>
              {/* PLACEHOLDER */}
              <p className = "absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <span className = "font-extrabold text-8xl text-neutral-200 animate-pulse">Hufi.</span>
              </p>
            </>
            }
          </div>
        </section>
      )}
    </>
  )
}

export default ProductBanner