import React, {useEffect, useState, useRef, useContext} from 'react'
import { ProductCard } from '../../cards'
import { FiltersDrawer } from '../../drawers'
import LocaleContext from '../../../context/localeContext'
import Link from 'next/link'
import Image from 'next/image'
import { formatNumber } from '../../../utils/formatNumber'
import { Button } from '../../elements'


const CollectionProducts = ({data,filters}) => {
  const [tags, setTags] = useState([])
  const [allFilters,setAllFilters] = useState([])
  const [filterBy, setFilterBy] = useState([])
  const [filtersModal,setFiltersModal] = useState(false)
  const [selectedFilters,setSelectedFilters] = useState([])
  const [displayAmount,setDisplayAmount] = useState(8)
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
    <section className = "relative bg-background">
      {/* FILTERS NAV */}
      <nav className = "flex items-center justify-between w-full gap-6 px-4 py-6 mx-auto max-w-7xl">
          {tags.length != 0 && (
            <div className = "flex items-center justify-start flex-1">
              <p className = "hidden mr-5 text-xs sm:text-sm text-onBackground/60 sm:block">Filter by</p>
              <div className = {`
              relative left-0 right-0 z-10 flex items-center justify-start max-w-xs gap-3 px-4 py-2 mx-auto overflow-scroll rounded-full  bg-onBackground/20 backdrop-blur-md w-min 
              sm:relative sm:flex sm:flex-1 sm:py-0 sm:bg-transparent sm:backdrop-blur-none sm:mx-0 sm:bottom-0 sm:max-w-none 
              `}>
                {tags.map((tag)=>(
                  <p 
                    className = {`${selectedFilters.some(selected=> selected.tag === tag && selected.userSelected.length > 0) ? 'bg-primary' : 'bg-neutral-200'}
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
          <div className = "grid w-full h-full grid-cols-2 gap-10 pb-32 md:grid-cols-2 lg:grid-cols-3 sm:gap-10 xl:grid-cols-4" ref ={productsRef}>
          {isEmpty ? 
            <>
              <div className = "flex items-center justify-center w-full h-full grid-cols-1 py-16 sm:grid-cols-2 lg:col-span-3 ">
                <div className = "max-w-xs text-center">
                  <h3 className = "font-medium">We couldn&apos;t find what you were looking for.</h3>
                  <p className = "text-onBackground/60">Showing you all products</p>
                </div>
              </div>
              {data.collectionByHandle.products.nodes.map((product)=>(
                <ProductBox 
                  data={product}
                  key = {product.handle}
                />
              ))}
            </>
            :
            <>
              {data.collectionByHandle.products.nodes.map((product,index)=>(
                <React.Fragment key = {index}>
                  {displayAmount > index && (
                    <React.Fragment>
                      {product.tags.length === 0 && ''}
                      <>
                        {selectedFilters.every(selected=> selected.userSelected.length === 0) ?
                            <ProductBox data={product}/>
                          :
                          <>
                            {filterBy.some(filter=> product.tags.some((tag)=> tag.split(":")[1] === filter)) && <ProductBox data={product}/>}
                          </>
                        }
                      </>
                    </React.Fragment>
                  )}
                </React.Fragment>
              ))}
              {displayAmount < data.collectionByHandle.products.nodes.length && (
                <div className = "w-full col-span-2 lg:col-span-3 xl:col-span-4">
                  <Button 
                    text = 'Load more' 
                    CSS = 'w-max px-4 py-2 bg-secondaryVariant hover:bg-secondary text-onSecondary mx-auto'
                    onClick={()=>setDisplayAmount(displayAmount + displayAmount)}
                  />
                </div>
              )}
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


function ProductBox({data}){
  const {locale} = useContext(LocaleContext)
  const coupon = data?.coupon ? JSON.parse(data.coupon.value) : null
  return(
    <div className = {`flex flex-col  gap-3`} >
      <div className = "flex-1 w-full h-full">
        <div className = "relative overflow-hidden rounded-md cursor-pointer bg-neutral-100 aspect-square">
          <Link href = {`/product/${data.handle}`}>
            <Image src = {data.media.nodes[0].previewImage.url} layout = 'fill' objectFit='cover'/>
          </Link>
          {coupon && (
            <div className = "absolute inset-0 flex items-end justify-start pointer-events-none">
              <p className = "text-xs font-medium bg-primaryVariant2 text-white w-max px-2 py-0.5 rounded-sm">%{coupon.discountAmount} coupon</p>
            </div>
          )}
        </div>
      </div>
      <div className = "flex flex-col items-start justify-center ">
        <p className = "text-sm text-center truncate ">{data.title}</p>
        <p className="text-sm mt-0.5">
        {parseInt(data?.priceRange?.maxVariantPrice?.amount) < parseInt(data?.compareAtPriceRange?.maxVariantPrice?.amount) ? 
          <span className = "flex flex-col ">
            <span className = " text-onBackground/80">
              {/* After discount */}
              <span>{formatNumber(data.priceRange.maxVariantPrice.amount,data.priceRange.maxVariantPrice.currencyCode,locale)}</span>
              {' '}
              {/* Before discount */}
              <span className = 'text-xs line-through text-onBackground/50'>{formatNumber(data?.compareAtPriceRange?.maxVariantPrice?.amount)}</span>
            </span>
          </span>
        :
          <>
            {/* Normal pricing */}
            <span>{formatNumber(data.priceRange.maxVariantPrice.amount,data.priceRange.maxVariantPrice.currencyCode,locale)}</span>
          </>
        }
      </p>
      </div>
    </div>
  )
}


export default CollectionProducts