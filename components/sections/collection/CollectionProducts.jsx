import {useEffect, useState, Fragment} from 'react'
import { Button } from '../../elements'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDownIcon, StarIcon, TruckIcon, CheckBadgeIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Transition,Dialog } from '@headlessui/react'
import { ProductCard } from '../../cards'

const CollectionProducts = ({data}) => {
  const [tags, setTags] = useState([])

  useEffect(()=>{
    let productTags = []
    data?.collectionByHandle?.products?.nodes?.forEach((arr)=>{
      arr.tags?.forEach(tag=>{
        if(productTags.includes(tag)){
          return
        }else{
          productTags.push(tag)
        }
      })
    })
    setTags(productTags)
  },[])

  return (
    <section className = "pb-24 pt-36 bg-surface">
      <div className = "w-full px-4 sm:px-10 mx-auto max-w-[1600px]"> 
      
      {/* This is set in shopify collection page. */}
      {data.collectionByHandle.sortByTags.value == true ?
      <>
        <div className = "grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 xl:grid-cols-4 ">
          {data.collectionByHandle.products.nodes.map((product,key)=>(
            <ProductCard product={product} data = {data.collectionByHandle.products} key = {key}/>
          ))}
        </div>
      </> 
      :
      <>
      {tags.map((tag,key)=>(
        <div key = {key}>
          <p className = "text-2xl font-medium text-left md:text-3xl">{tag}</p>

          {/* DISPLAY PRODUCTS */}
          <div className = "grid grid-cols-1 gap-10 pt-5 pb-32 sm:grid-cols-2 xl:grid-cols-4 ">
            {data.collectionByHandle.products.nodes.map((product)=>(
              <>
                {product.tags.includes(tag) && (
                  <ProductCard product={product} data = {data.collectionByHandle.products}/>
                )}
              </>
            ))}
          </div>
        </div>
      ))}
      </>
      }
      </div>
    </section>
    
  )
}

export default CollectionProducts