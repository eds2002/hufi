import {useEffect, useState, Fragment, useRef} from 'react'
import { Button } from '../../elements'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDownIcon, StarIcon, TruckIcon, CheckBadgeIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { Transition,Dialog } from '@headlessui/react'
import { ProductCard } from '../../cards'
import { FiltersDrawer } from '../../drawers'


const CollectionProducts = ({data,filters}) => {
  const [tags, setTags] = useState([])
  const [allFilters,setAllFilters] = useState([])
  const [filterBy, setFilterBy] = useState([])
  const [filtersModal,setFiltersModal] = useState(false)
  const [selectedFilters,setSelectedFilters] = useState([])
  const [isEmpty,setIsEmpty] = useState(false)
  const productsRef = useRef()


  // Handles if products section displays no products
  useEffect(()=>{
    productsRef?.current?.children?.length === 0 ? setIsEmpty(true) : setIsEmpty(false) 
  },[filterBy, selectedFilters])

  useEffect(()=>{
    let productTags = []
    let filters = []

    // TODO, avoids adding already known tags
    // EXAMPLE: If user decides to view the watches sub collection,
    // then if product contains the tag 'Watches', it should not be displayed in the filtesr.

    //A tag is the first phrase in a tag -->Type:Watches
    //A filter is second phrase in a tag Gender:Womens<--
    const currentCollection = data.collectionByHandle.title.split(" ")
    data?.collectionByHandle?.products?.nodes?.forEach((arr)=>{
      arr.tags?.forEach(tag=>{
        filters.push(tag)
        if(productTags.includes(tag.split(":")[0]) || currentCollection.includes(tag.split(":")[1])){
          return
        }else{
          productTags.push(tag.split(":")[0])
        }
      })
    })
    setAllFilters(filters)
    setTags(productTags)
  },[])


  // Handles adding filters to setState
  useEffect(()=>{
    const filters = []
    selectedFilters.forEach(selected=>{
      selected.userSelected.forEach((filter)=>{
        filters.push(filter)
      })
    })
    setFilterBy(filters)
  },[selectedFilters])
  
  return (
    <>
    <section className = "bg-background">
      {/* FILTERS NAV */}
      <nav className = "flex items-center justify-between w-full gap-6 px-4 py-6 mx-auto max-w-7xl">
          {tags.length != 0 && (
            <div className = "flex items-center justify-start flex-1">
              <p className = "hidden mr-5 text-xs sm:text-sm text-onBackground/60 sm:block">Filter by</p>
              <div className = {`
              fixed left-0 right-0 z-10 flex items-center justify-start max-w-xs gap-3 px-4 py-2 mx-auto overflow-scroll rounded-full bottom-7 bg-onBackground/5 backdrop-blur-md w-min 
              sm:relative sm:flex sm:flex-1 sm:py-0 sm:bg-transparent sm:backdrop-blur-none sm:mx-0 sm:bottom-0 sm:max-w-none`}>
                {tags.map((tag)=>(
                  <p 
                    className = {`${selectedFilters.some(selected=> selected.tag === tag && selected.userSelected.length > 0) ? 'bg-primary' : 'bg-neutral-300'}
                      px-4 py-1.5 text-xs  transition rounded-full cursor-pointer sm:text-sm hover:text-onSurface/60 flex items-center` 
                    }
                    onClick = {()=>setFiltersModal(true)}
                    key = {tag}
                  >
                    {tag}
                    {selectedFilters.some(selected=> selected.tag === tag && selected.userSelected.length > 0) && (
                      <p className = "flex items-center justify-center w-2 h-2 p-2.5 ml-2 text-xs rounded-full bg-primaryVariant2">{selectedFilters[selectedFilters.findIndex(selectedFilter => selectedFilter.tag === tag)].userSelected.length}</p>
                    )}
                  </p>
                ))}
              </div>
            </div>
          )}
        <div className = "items-center hidden h-full text-sm text-onBackground/50 sm:flex">
          <p>Sort by:</p>
          <select className = "font-medium outline-none">
            <option>Best Sellers</option>
            <option>Low to High</option>
            <option>High to Low</option>
          </select>
        </div>
      </nav>

      {/* DISPLAY PRODUCTS */}
      <div className = "w-full px-4 mx-auto max-w-7xl"> 
        <div className = "flex gap-10 mx-auto max-w-7xl">
          <div className = "grid w-full h-full grid-cols-1 gap-10 pb-32 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 sm:gap-10 xl:grid-cols-3" ref ={productsRef}>
          {isEmpty ? 
            <>
              <div className = "flex items-center justify-center w-full h-full grid-cols-1 py-16 sm:grid-cols-2 lg:col-span-3 ">
                <div className = "max-w-xs text-center">
                  <h3 className = "font-medium">We couldn&apos;t find what you were looking for.</h3>
                  <p className = "text-onBackground/60">Showing you all products</p>
                </div>
              </div>
              {data.collectionByHandle.products.nodes.map((product)=>(
                <ProductCard product={product} data = {data.collectionByHandle.products} key = {product.title}/>
              ))}
            </>
            :
            <>
              {data.collectionByHandle.products.nodes.map((product)=>(
                <>
                  {product.tags.length === 0 && ''}
                  <>
                    {selectedFilters.every(selected=> selected.userSelected.length === 0) ?
                        <ProductCard product={product} data = {data.collectionByHandle.products}/>
                      :
                      <>
                        {filterBy.every(filter=> product.tags.some((tag)=> tag.split(":")[1] === filter)) && <ProductCard product={product} data = {data.collectionByHandle.products}/>}
                      </>
                    }
                  </>
                </>
              ))}
            </>
            }
          </div>
        </div>
      </div>
    </section>
    <FiltersDrawer 
      filtersModal = {filtersModal} 
      setFiltersModal = {setFiltersModal}  
      tags = {tags}
      allFilters = {allFilters}
      filterBy = {filterBy}
      setFilterBy = {setFilterBy}
      selectedFilters = {selectedFilters}
      setSelectedFilters = {setSelectedFilters}
    />
    </>
  )
}


export default CollectionProducts