import React, { useContext } from 'react'
import Image from 'next/image'
import { useRef,useEffect,useState } from 'react'
import Link from 'next/link'
import { Button } from '../../elements'
import Signup from '../Signup'
import { formatNumber } from '../../../utils/formatNumber'
import LocaleContext from '../../../context/localeContext'

const CollectionSubCol = ({data,productData}) => {
  return (
    <section className = "w-full">
      <div className = 'mx-auto '>
        {data.map((collectionSet,index)=>(
          <>
            <div className = "">
              {collectionSet?.heading?.title != "" && (
                <h1 className = "px-4 pt-10 mx-auto mb-6 text-2xl font-medium max-w-7xl">{collectionSet?.heading?.title ?? 'Collection Heading'}</h1>
              )}
              <div className = {`
                ${collectionSet.style.type === "Default" && ('grid w-full grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-3 h-screen max-w-7xl px-4 mx-auto pb-10')}
                ${collectionSet.style.type === "Row" && (`grid grid-flow-col auto-cols-[95%] sm:auto-cols-[48%] lg:auto-cols-[32%] w-full h-[50vh] gap-3 max-w-7xl px-4 mx-auto pb-10`)}
                ${collectionSet.style.type === "TwoRow" && (`grid md:grid-cols-2  w-full h-screen gap-3 max-w-7xl px-4 mx-auto pb-10`)}
                ${collectionSet.style.type === "Banner" && (`grid h-[60vh] gap-3 max-w-7xl px-4 mx-auto pb-10`)}
                ${collectionSet.style.type === "Header" && (`h-[70vh]`)}
                ${collectionSet.style.type === "Squared" && (`grid grid-cols-2 lg:grid-cols-4 gap-3 px-4 max-w-7xl mx-auto`)}
                ${collectionSet.style.type === "Products" && (`grid grid-cols-2 md:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto`)}
                overflow-scroll 
              `}>
                {collectionSet.style.type === "Products" ? 
                <>
                  {productData.nodes.map((product,index)=>(
                    <>
                      {index < 6 && (
                        <CollectionProduct data = {product}/>
                      )}
                    </>
                  ))}
                </>
                :
                <>
                  {collectionSet.collectionTitles.map((set,index)=>(
                    <CollectionBox set = {set} index = {index} collectionSet = {collectionSet} key = {index}/>
                  ))}
                </>
                }
              </div>
            </div> 
          </>
        ))}
      </div>
    </section>
  )
}
export default CollectionSubCol

function CollectionBox({set,index,collectionSet}){
  const [handle,setHandle] = useState('/collection/404')
  const aRef = useRef()
  useEffect(()=>{
    const handleFromRef = aRef.current?.getElementsByTagName("a")[0]?.innerText ?? "/404"
    setHandle(handleFromRef)
  },[])
  return(
    <div className = {`
      ${collectionSet.style.type === "Default" && (`${index === 0 && ('md:row-span-2 col-span-1')}`)}
      ${collectionSet.style.type === "Row" && (`col-span-1`)}
      relative w-full h-full  overflow-hidden aspect-square`}> 
        <Image src = {set?.collections?.nodes[0]?.image?.url} layout = 'fill' objectFit='cover' className = 'object-cover w-full h-full select-none '/>
        <div className = "absolute inset-0 bg-black/40 mix-blend-darken"/>
          <div className={`
            ${collectionSet.style.type === "Squared" && ('p-4 relative flex flex-col items-start justify-end w-full h-full mx-auto max-w-7xl')}
            ${collectionSet.style.type === "Default" && ('p-8 relative flex flex-col items-start justify-end w-full h-full mx-auto max-w-7xl')}
            ${collectionSet.style.type === "TwoRow" && ('p-8 relative flex flex-col items-start justify-end w-full h-full mx-auto max-w-7xl')}
            ${collectionSet.style.type === "Banner" && ('p-8 relative flex flex-col items-start justify-end w-full h-full mx-auto max-w-7xl')}
            ${collectionSet.style.type === "Row" && ('p-8 relative flex flex-col items-start justify-end w-full h-full mx-auto max-w-7xl')}
            ${collectionSet.style.type === "Header" && ('pl-8 pb-12 relative flex flex-col items-start justify-end w-full h-full mx-auto max-w-7xl')}
          `}>
            {/* FORMAT HTML */}
            <div className = {`w-full max-w-xs
            ${collectionSet.style.type === "Squared" && ('prose-h6:text-xs prose-h6:font-medium prose-h6:text-primary prose-h6:text-opacity-90 prose-h3:mt-1 prose-h3:text-base prose-h3:font-medium prose-h3:text-white prose-a:hidden')}
            ${collectionSet.style.type === "Default" && ('prose-h6:text-sm prose-h6:font-medium prose-h6:text-primary prose-h6:text-opacity-90 prose-h3:mt-1 prose-h3:text-2xl prose-h3:font-medium prose-h3:text-white prose-a:hidden')}
            ${collectionSet.style.type === "TwoRow" && ('prose-h6:text-sm prose-h6:font-medium prose-h6:text-primary prose-h6:text-opacity-90 prose-h3:mt-1 prose-h3:text-2xl prose-h3:font-medium prose-h3:text-white prose-a:hidden')}
            ${collectionSet.style.type === "Banner" && ('prose-h6:text-sm prose-h6:font-medium prose-h6:text-primary prose-h6:text-opacity-90 prose-h3:mt-1 prose-h3:text-2xl prose-h3:font-medium prose-h3:text-white prose-a:hidden')}
            ${collectionSet.style.type === "Row" && ('prose-h6:text-sm prose-h6:font-medium prose-h6:text-primary prose-h6:text-opacity-90 prose-h3:mt-1 prose-h3:text-2xl prose-h3:font-medium prose-h3:text-white prose-a:hidden')}
            ${collectionSet.style.type === "Header" && ('prose-h6:text-sm prose-h6:font-medium prose-h6:text-primary prose-h6:text-opacity-90 prose-h3:mt-1 prose-h3:text-2xl prose-h3:font-medium prose-h3:text-white prose-a:hidden')}
            `}
            >
              {set?.collections?.nodes[0]?.descriptionHtml && (
                <div
                  dangerouslySetInnerHTML={{__html: set.collections.nodes[0]?.descriptionHtml}}
                  ref = {aRef}
                />
              )}
              <Link href = {handle}>
                <Button text = "Shop" CSS = ' mt-3 w-24 py-1 bg-background text-onBackground' tag = 'view-collection-btn'/>
              </Link>
            </div>          
          </div>
    </div>
  )
}

function CollectionProduct({data}){
  const {locale} = useContext(LocaleContext)
  const coupon = data?.coupon ? JSON.parse(data.coupon.value) : null
  return(
    <div className = "flex flex-col w-full gap-3" >
      <div className = "flex-1 w-full h-full">
        <div className = "relative cursor-pointer bg-surface aspect-square">
          <Link href = {`/product/${data.handle}`}>
            <Image src = {data.media.nodes[0].previewImage.url} layout = 'fill' objectFit='cover'/>
          </Link>
          {coupon && (
            <div className = "absolute flex items-start justify-end inset-2">
              <p className = "text-[10px] font-medium bg-secondaryVariant text-onSecondary w-max px-2 py-0.5 rounded-md">%{coupon.discountAmount} coupon</p>
            </div>
          )}
        </div>
      </div>
      <div className = "flex flex-col items-center justify-center ">
        <p className = "overflow-hidden text-sm text-center">{data.title}</p>
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