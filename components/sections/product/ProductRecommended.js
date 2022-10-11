import React from 'react'

const ProductRecommended = ({data}) => {
  return (
    <section className = "py-24 bg-surface">
      <div className = "px-4 max-w-7xl ">
        <h1 className = "text-2xl font-medium lg:text-3xl">We think you may also like</h1>
        <div className="w-full px-4 pb-16 mx-auto overflow-scroll max-w-7xl scrollBar">
          <div className = "grid grid-flow-col auto-cols-[70%] sm:auto-cols-[60%] md:auto-cols-[45%] lg:auto-cols-[35%] snap-mandatory snap-x gap-10">
            {/* {products.nodes.map((product,key)=>(
              <>
                {key > 10 ?
                  ''
                :
                  <ProductCard product={product} key = {key}/>
                }
              </>
            ))} */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductRecommended