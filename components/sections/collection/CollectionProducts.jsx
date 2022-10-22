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


  useEffect(()=>{
    if(productsRef.current){
      productsRef.current.children.length === 0 ? setIsEmpty(true) : setIsEmpty(false) 
    }
  },[filterBy])

  const removeFilter = (filter) =>{
    setFilterBy(selectedTags => selectedTags.filter((selectedTag=> selectedTag != filter)))
  }

  useEffect(()=>{
    let productTags = []
    let filters = []

    // TODO, avoids adding already known tags
    // EXAMPLE: If user decides to view the watches sub collection,
    // then if product contains the tag 'Watches', it should not be displayed in the filtesr.
    const currentCollection = data.collectionByHandle.title.split(" ")
    data?.collectionByHandle?.products?.nodes?.forEach((arr)=>{
      arr.tags?.forEach(tag=>{
        filters.push(tag)
        if(productTags.includes(tag.split(":")[0]) || currentCollection.includes(tag.split(":")[0])){
          return
        }else{
          productTags.push(tag.split(":")[0])
        }
      })
    })
    setAllFilters(filters)
    setTags(productTags)
  },[])

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
    <section className = "pb-10 bg-background">
      {/* FILTERS NAV */}
      <nav className = "flex items-center justify-between w-full px-4 py-6 mx-auto max-w-7xl">
        <div className = "flex items-center justify-start flex-1">
          <p className = "mr-5 text-xs sm:text-sm text-onBackground/60">Filter by</p>
          <div className = "grid grid-flow-col gap-2 overflow-scroll auto-cols-max">
            {tags.map((tag)=>(
              <p 
                className = {`${selectedFilters.some(selected=> selected.tag === tag && selected.userSelected.length > 0) ? 'bg-primary' : 'bg-onBackground/10'}
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
        <div className = "flex items-center h-full text-sm text-onBackground/50">
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
          <div className = "grid w-full h-full grid-cols-1 gap-10 pt-5 pb-32 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 sm:gap-10 xl:grid-cols-3" ref ={productsRef}>
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
                  {selectedFilters.every(selected=> selected.userSelected.length === 0) ?
                    <>
                      <ProductCard product={product} data = {data.collectionByHandle.products}/>
                    </>
                    :
                    <>
                      {filterBy.every((filter)=> product.tags.some((tag)=> tag.split(":")[1] === filter)) && 
                        <ProductCard product={product} data = {data.collectionByHandle.products}/>
                      }
                    </>
                  }
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