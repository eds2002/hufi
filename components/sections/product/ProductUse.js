import Image from 'next/image'
import React from 'react'

const ProductUse = ({data}) => {
  console.log(data)
  const dataJSON = data?.value ? JSON.parse(data.value) : undefined
  return (
    <>
      {dataJSON && (
        <section className = "py-16 bg-surface">
          <div className = "px-4 mx-auto max-w-7xl">
            {/* <h1 className = "text-4xl font-medium text-center ">Benefits</h1> */}
            <div className = "flex flex-col items-center justify-center gap-20 md:items-start md:flex-row">

              {dataJSON.map((useCase)=>(
                <div className = "flex flex-col items-center justify-center max-w-xs text-center md:mt-0" key = {useCase.heading}>
                  <div className = "relative w-16 h-16 ">
                    <Image src = {useCase?.svg} layout = 'fill' objectFit='cover'/>
                  </div>
                  <h3 className = "mt-4 text-xl font-medium">{useCase.heading}</h3>
                  <p className = "w-[20ch] text-base text-onSurface/70">{useCase.paragraph}</p>  
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default ProductUse