import {useEffect, useState, Fragment} from 'react'
import { Button } from '../../elements'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDownIcon, StarIcon, TruckIcon, CheckBadgeIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Transition,Dialog } from '@headlessui/react'
import { ProductCard } from '../../cards'

const CollectionProducts = ({data,filters}) => {
  const [tags, setTags] = useState([])

  const [filterBy, setFilterBy] = useState(filters || [])

  const removeFilter = (filter) =>{
    setFilterBy(selectedTags => selectedTags.filter((selectedTag=> selectedTag != filter)))
  }

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

  console.log(filterBy.forEach((test)=> test))

  return (
    <section className = "relative pt-24 pb-10 bg-surface">
      {/* COLLECTION NAME NAV */}
      <nav className = "sticky top-0 z-[22] w-full pt-16">
        <div className = 'z-20 w-full h-full bg-surface'>
          <div className = "px-4 mx-auto max-w-7xl">
            <div className = "grid grid-flow-col py-3 overflow-scroll auto-cols-max">
              <p className = "text-base font-medium sm:text-lg md:text-xl ">{data?.collectionByHandle?.title ?? `Title`}{filterBy.length >= 1 && ':'} </p>
              <span className = "flex items-center ml-4 text-xl font-medium gap-x-3">
                {filterBy.length > 0 && (
                  <>
                    {filterBy.map((filter)=>(
                      <span key = {filter} className = "px-4 py-0 text-sm rounded-full cursor-pointer sm:text-base xl:text-lg bg-primaryVariant hover:bg-primaryVariant/60 text-onPrimary/60" onClick = {()=>removeFilter(filter)}>{filter}</span>
                    ))}
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* FILTERS NAV*/}
      <nav className = "w-full">
        <div className = "grid grid-flow-col gap-6 px-4 py-2 mx-auto overflow-scroll auto-cols-max max-w-7xl">
          {tags.map((tag)=>(
            <>
              {!filterBy.includes(tag) && (
                <p className = "text-xs font-medium transition cursor-pointer sm:text-base hover:text-onSurface/60" onClick = {()=>setFilterBy(oldArr=> [...oldArr,tag])}>{tag}</p>
              )}
            </>
          ))}
        </div>
      </nav>

      {/* DISPLAY PRODUCTS */}
      <div className = "w-full px-4 mx-auto max-w-7xl"> 
        <div className = "flex gap-10 mx-auto max-w-7xl">
          <div className = "grid w-full h-full grid-cols-1 gap-10 pt-5 pb-32 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 sm:gap-10 xl:grid-cols-3 ">
            {data.collectionByHandle.products.nodes.map((product)=>(
              <> 
                {filterBy.length === 0 ? 
                  <ProductCard product={product} data = {data.collectionByHandle.products}/>
                  :
                  <>
                    {filterBy.every((value)=> product.tags.includes(value)) && (
                      <>
                        {filterBy.some(e=>console.log(e))}
                        <ProductCard product={product} data = {data.collectionByHandle.products}/>
                      </>
                    )}
                  </>
                }
              </>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


export default CollectionProducts