import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { ProductCard } from '../cards'
import { useRef } from 'react'
export default function HorizontalProducts({data:{products},text}) {
  const overflowRef = useRef()

  const handleLeft = () =>{
    if(overflowRef.current.scrollLeft === 0) return
    overflowRef.current.scrollLeft = overflowRef.current.scrollLeft - overflowRef.current.clientWidth
  }


  const handleRight = () =>{
    overflowRef.current.scrollLeft = overflowRef.current.scrollLeft + overflowRef.current.clientWidth
  }

  return (
    <div className="py-10">
      <div className = "flex items-center justify-between px-4 mx-auto mb-6 max-w-7xl">
        <h1 className = "text-2xl font-medium">{text}</h1>
        <div className = "flex items-center justify-center gap-x-3">
          <div 
            className = "p-1 rounded-full cursor-pointer bg-secondary/10 text-onPrimary hover:bg-secondary/20 active:bg-secondary/40"
            onClick = {()=>handleLeft()}
          >
            <ChevronLeftIcon className = "w-6 h-6"/>
          </div>
          <div 
            className = "p-1 rounded-full cursor-pointer bg-secondary/10 text-onPrimary hover:bg-secondary/20 active:bg-secondary/40"
            onClick = {()=>handleRight()}
          >
            <ChevronRightIcon className = "w-6 h-6"/>
          </div>

        </div>
      </div>
      <div className="flex w-full mx-auto overflow-scroll max-w-7xl scrollBar flex-nowrap snap-x snap-mandatory" ref = {overflowRef}>
        {products?.nodes?.map((product,key)=>(
          <div className = "snap-start" key = {key}>
          {key < 10 && (
            <ProductCard product={product} key = {key}/>
          )}
          </div>
        ))}
      </div>
    </div>
  )
}
