import { useContext, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon, StarIcon, TruckIcon, CheckBadgeIcon } from '@heroicons/react/20/solid'
import { Button } from '../../elements'
import Image from 'next/image'
import LocaleContext from '../../../context/localeContext'
import { formatNumber } from '../../../utils/formatNumber'
import { addToShopifyCart } from '../../../utils/addToShopifyCart'
import CartContext from '../../../context/cartContext'
import { deliveredDate } from '../../../utils/deliveredDate'
import ProductContext from '../../../context/productContext'


export default function ProductOverview({data,compRef}) {
  const {locale} = useContext(LocaleContext)
  const {cartData,setCartData,viewedCart, setViewedCart,setOpenCart} = useContext(CartContext)
  const {selectedProduct,setSelectedProduct} = useContext(ProductContext)


  const [selectedOption, setSelectedOption] = useState(data.product.options.map((option)=>{return({name:option.name,value:option.values[0]})}))
  
  
  const [soldOutItems,setSoldOutItems] = useState([])
  const [currentVariant,setCurrentVariant] = useState(null)
  const didMount = useRef(false)
  
  // TODO, this is for the sticky cart
  setSelectedProduct(selectedOption)

  // TODO, change old array to new array with a value the user has selected
  const handleVariantChange = async (option,selectedValue) =>{
    if(!soldOutItems.includes(selectedValue)){
      setSelectedOption(prevArr => {
        const newArr = prevArr.map(obj =>{
          if(obj.name === option){
            return {...obj, value:selectedValue}
          }
  
          return obj
        })
        return newArr
      })
    }
  }
  const {minMonth,minDays,minYear,maxDays,maxMonth,maxYear} = deliveredDate()


  // TODO, sets the current image to the variant image
  useEffect(()=>{
    if(!didMount.current){
      didMount.current = true
      return
    }

    let findId;
    const query = []

    // TODO, for each selected option the user has requested, store variable into query array
    selectedOption.forEach((option)=>{
      query.push(option.value)
    })

    // TODO, find the id 
    data.product.variants.nodes.map((newArr, arrayIndex) =>{
      if(query.every(object=>newArr.selectedOptions.some(obj=> obj.value === object))){
        findId = arrayIndex
      }
    })
    setCurrentVariant(data.product.variants.nodes[findId].image.url)
    return(()=>{})
  },[selectedOption])



  const addToCart = async (e) =>{
    e.preventDefault()
    let findId;

    const query = []

    // TODO, for each selected option the user has requested, store variable into query array
    selectedOption.forEach((option)=>{
      query.push(option.value)
    })

    // TODO, find the id 
    data.product.variants.nodes.map((newArr, arrayIndex) =>{
      if(query.every(object=>newArr.selectedOptions.some(obj=> obj.value === object))){
        findId = arrayIndex
      }
    })
    const responseCartData = await addToShopifyCart(cartData,data.product.variants.nodes[findId].id)
    setViewedCart(false)
    setOpenCart(true)
    setCartData(responseCartData)
  }

  useEffect(()=>{
    const soldOutVariants = data.product.variants.nodes.filter((currentArr)=>{
      if(currentArr.quantityAvailable === 0){
        return currentArr.selectedOptions[0]
      }
    })
    setSoldOutItems(soldOutVariants.map((variant)=>variant.selectedOptions[0].value))
    return(()=>{})
  },[])

  return (
    <>
      {data.product ?  
        <div className="relative bg-background" ref = {compRef}>
          <div className="pt-6 pb-24">
            <div className="max-w-2xl px-4 mx-auto mt-8 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="flex flex-col w-full h-full gap-10 lg:grid lg:grid-cols-12">

                {/* Image gallery */}
                <div className="col-span-8">
                  <h2 className="sr-only">Images</h2>

                  
                  <div className={`
                  grid grid-flow-col auto-cols-[100%] overflow-scroll 
                  lg:grid-flow-row  lg:grid-cols-4 lg:gap-8 `}>
                    {data.product?.media?.nodes?.map((media,index)=>(
                      <div className = {`
                      ${index === 0 ? ('lg:col-span-4 w-full') :('lg:col-span-2')}
                      rounded-xl relative w-full  overflow-hidden 
                      `}
                      key = {index}
                      >
                        <img src = {(currentVariant && index == 0) ? currentVariant : media.previewImage.url} className = "object-cover w-full h-full"/>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className = "col-span-4">
                  <div className = "sticky top-[104px]">

                    {/* Product Title & Pricing */}
                    <div className="flex flex-col items-start justify-between w-full">
                      <h1 className="text-2xl font-medium text-onBackground">{data?.product?.title}</h1>
                      <p className="text-base sm:text-base">
                        {data.product?.priceRange?.maxVariantPrice?.amount < data.product.compareAtPriceRange.maxVariantPrice.amount ? 
                        <span className = "flex gap-x-1">
                          <span className = "text-base font-medium text-onBackground">{formatNumber(data.product.priceRange.maxVariantPrice.amount,data.product.priceRange.maxVariantPrice.currencyCode,locale)}</span>
                          {/* <span className = "text-sm font-normal line-through text-tertiaryVariant">{formatNumber(data.product.compareAtPriceRange.maxVariantPrice.amount,data.product.compareAtPriceRange.maxVariantPrice.currencyCode, locale)}</span> */}
                        </span>
                        :
                        <span>{formatNumber(data.product.priceRange.maxVariantPrice.amount,data.product.priceRange.maxVariantPrice.currencyCode,locale)}</span>
                      }
                      </p>
                    </div>

                    <div className = "mt-1">
                      <p className = "text-lg text-onBackground/60">{data?.product?.shortDesc?.value}</p>
                    </div>

                    {/* Product Information */}
                    <div className="mt-4 lg:col-span-5">
                      <form name = "productInformation" >
                        {data.product.options.map((option,index)=>(
                          <div key = {index} className = "">
                            {/* Options title */}
                            {/* TODO, avoid rendering products with no options / variants */}
                            {option.name != "Title" && (
                              <h3 className = "text-base font-medium" id = {option.name}>
                                <span>{option.name}: </span>
                                <span className = "font-normal text-neutral-800">{selectedOption[selectedOption.findIndex(opt =>opt.name === option.name)].value}</span>
                              </h3>
                            )}

                            {/* Options Values */}
                            <div className = "flex flex-wrap items-center gap-3 ">
                              {/* TODO, avoid rendering products with no options / variants */}
                              {option.name != "Title" && (
                                <div className = "flex flex-wrap items-center gap-3 mt-2 mb-4">
                                  {option.values.map((value,key)=>(
                                    <>
                                      <p className = 
                                      {`
                                        ${option.name === "Color" ? 
                                        (`${soldOutItems?.includes(value) ? 'h-7 w-7 rounded-full border cursor-default ' : `cursor-pointer h-7 w-7 rounded-full border ${selectedOption.filter(opt =>opt.value === value).length > 0 ? 'ring-primaryVariant ring-offset-2 ring' : 'ring-neutral-400'}`}`)
                                        :
                                        (`${soldOutItems?.includes(value) ? 'bg-gray-300 ring-black/60 cursor-default' : `${selectedOption.filter(opt =>opt.value === value).length > 0 ? 'ring-primaryVariant bg-primary text-onPrimary' : 'ring-neutral-400'}`} px-3 py-1 ring-2 cursor-pointer rounded-full`)
                                        }
                                        text-sm
                                      `}
                                      style={{backgroundColor:soldOutItems.includes(value) ? "lightgray" : option.name === "Color" && (value)}}
                                      onClick = {(e)=>handleVariantChange(option.name,value)}
                                      key = {key}
                                      id = {option.value}
                                      >
                                        {option.name === "Color" ? '' : value}
                                      </p>
                                    </>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                        <Button text = "Add to cart" onClick = {(e)=>addToCart(e)}/>
                        <p className = "mt-2 text-xs text-onBackground/70">Get it
                          <span className = "font-medium text-onBackground/70">{` ${minMonth} ${minDays}, ${minYear} - ${maxMonth} ${maxDays}, ${maxYear}`}</span>
                        </p>
                      </form>
                    </div>

                    {/* PRODUCT DESCRIPTION */}
                    <div className="p-4 mt-10 overflow-hidden rounded-md bg-surface">
                      <div
                        className="prose-h1:mb-6 prose-h1:font-medium prose-p:mt-2 prose-h1:text-onBackground prose-p:text-onBackground/60 prose-p:sm:text-base prose-p:font-light prose-h6:hidden prose-p:text-base prose-li:list-disc prose-li:ml-4 prose-li:mb-3"
                        dangerouslySetInnerHTML={{ __html: data.product.descriptionHtml }}
                      />
                    </div>



                    <DetailsComponent data = {data.product.details}/>
                    <LearnMoreComponent data = {data.product.learnmore}/>
                  
                    {/* Perks */}
                    <div className = "mt-4">
                        <div className = "flex items-center text-xs gap-x-3">
                          <TruckIcon className = "w-5 h-5 text-primaryVariant" />
                          <p>Free shipping for members using code &ldquo;Members Rewards&ldquo;.</p>
                        </div>
                        <div className = "flex items-center mt-2 text-xs gap-x-3">
                          <CheckBadgeIcon className = "w-5 h-5 text-primaryVariant" />
                          <p>Quality ensured on all products.</p>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      :
        <div>
        
        </div>
      }
    </>
  )
}

function LearnMoreComponent({data}){
  const [open, setOpen] = useState(false)
  return(
    <>
      {data === null ?
        <>
        </>
      :
        <div className = "mt-4">
          <div className = "prose-h3">
            <div className = "w-full h-full rounded-md bg-surface">
              <div className = {`flex items-center justify-between w-full px-4 py-2 transition rounded-md cursor-pointer  ${open ? 'bg-primary' : 'bg-surface'}`}
              onClick = {()=>setOpen(!open)}
              >
                <div
                  className="prose-p:hidden prose-h1:block prose-li:hidden prose-h1:text-onSurface prose-h1:font-medium"
                  dangerouslySetInnerHTML={{ __html: data.value }}
                />
                <ChevronDownIcon className = {`w-5 h-5 ${open ? 'rotate-180' : 'rotate-0'}`}/>
              </div>
              {open && (
                <div className = "w-full h-full p-4">
                  <div
                    className="prose-p:mb-4 prose-li:font-light prose-h1:hidden prose-li:text-onSurface prose-li:list-item prose-li:mb-4 prose-li:text-sm"
                    dangerouslySetInnerHTML={{ __html: data.value }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      }
    </>
  )
}

function DetailsComponent({data}){
  const [open, setOpen] = useState(false)
  return(
    <>
      {data === null ?
        <>
        </>
      :
        <div className = "mt-10">
          <div className = "prose-h3">
            <div className = "w-full h-full rounded-md bg-surface">
              <div className = {`flex items-center justify-between w-full px-4 py-2 transition rounded-md cursor-pointer ${open ? 'bg-primary' : 'bg-surface'}`}
              onClick = {()=>setOpen(!open)}
              >
                <div
                  className="prose-p:hidden prose-h1:block prose-li:hidden prose-h1:text-onSurface prose-h1:font-medium"
                  dangerouslySetInnerHTML={{ __html: data.value }}
                />
                <ChevronDownIcon className = {`w-5 h-5 ${open ? 'rotate-180' : 'rotate-0'}`}/>
              </div>
              {open && (
                <div className = "w-full h-full p-4">
                  <div
                    className="prose-p:mb-4 prose-p:text-sm prose-li:font-light prose-h1:hidden prose-li:text-onSurface prose-li:list-item prose-li:mb-4 prose-li:text-sm"
                    dangerouslySetInnerHTML={{ __html: data.value }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      }
    </>
  )
}
