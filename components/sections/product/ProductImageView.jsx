import React from 'react'

const ProductImageView = () => {
  return (
    <section className = "py-24 bg-primary1">
      <div className = "px-4 mx-auto max-w-7xl">
        <div className = "flex flex-col items-center justify-center">
          <h1 className = "text-3xl font-bold text-center text-primary2">Information for nerds.</h1>
          <p className = "max-w-sm mt-4 mb-12 text-base text-center lg:text-lg text-primary3">Just kidding, let&apos;s clear up some confusions you may have.</p>
        </div>
        <div className = "flex-row w-full h-full gap-3 my-3 md:flex">
          <div className = "bg-secondary1 h-[200px] max-h-[200px] rounded-md flex-[2] my-4 md:my-0">
            Image 1
          </div>
          <div className = "bg-secondary1 h-[200px] max-h-[200px] rounded-md flex-1">
            Image 2
          </div>
        </div>
        <div className = "flex-row w-full h-full gap-3 my-3 md:flex">
          <div className = "bg-secondary1 h-[200px] max-h-[200px] rounded-md flex-1 my-4 md:my-0">
            Image 3
          </div>
          <div className = "bg-secondary1 h-[200px] max-h-[200px] rounded-md flex-1">
            Image 4
          </div>
        </div>
        <div className = "flex-row hidden w-full h-full gap-3 my-3 md:flex">
          <div className = "bg-secondary1 h-[200px] max-h-[200px] rounded-md flex-[2]">
            Image 5
          </div>
          <div className = "bg-secondary1 h-[200px] max-h-[200px] rounded-md flex-1 md:my-0">
            Image 6
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductImageView