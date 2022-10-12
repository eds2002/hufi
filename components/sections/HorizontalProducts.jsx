import { Skeleton } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import {slugify} from '../../utils/slugify'
import { ProductCard } from '../cards'
export default function HorizontalProducts({data:{products},text}) {
  return (
    <div className="py-10">
      <div className = "px-4 mx-auto max-w-7xl">
        <h1 className = "mb-6 text-2xl font-medium">{text}</h1>
      </div>
      <div className="w-full px-4 pb-16 mx-auto overflow-scroll max-w-7xl scrollBar">
        <div className = "grid grid-flow-col auto-cols-[40%] sm:auto-cols-[30%] md:auto-cols-[25%] lg:auto-cols-[18%] snap-mandatory snap-x gap-10">
          {products.nodes.map((product,key)=>(
            <>
              {key > 10 ?
                ''
              :
                <ProductCard product={product} key = {key}/>
              }
            </>
          ))}
        </div>
      </div>
    </div>
  )
}
