import React, { useContext, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon, CheckIcon,LockClosedIcon, PlayIcon } from '@heroicons/react/20/solid'
import { Button } from '../../elements'
import Image from 'next/image'
import LocaleContext from '../../../context/localeContext'
import { formatNumber } from '../../../utils/formatNumber'
import { addToShopifyCart } from '../../../utils/addToShopifyCart'
import CartContext from '../../../context/cartContext'
import { deliveredDate } from '../../../utils/deliveredDate'
import ProductContext from '../../../context/productContext'
import { useMemo } from 'react'
import { storefront } from '../../../utils/storefront'
import { addCartDiscountCode } from '../../../graphql/mutations/addCartDiscountCode'
import UserContext from '../../../context/userContext'
import { RefundsModal, SecureTransactions, DeliveryModal, SizeModal } from '../../modals'
import { ReviewsAccordian, ReviewsModal,CrossSellComponent } from '../../features'
import { useCallback } from 'react'
import ExpandImage from './ProductExpandImage'
import { BookOpenIcon } from '@heroicons/react/24/outline'


export default function ProductOverview({data,compRef,reviews,crossSell}) {
  const {cartData,setCartData, setViewedCart,setOpenCart} = useContext(CartContext)
  const {setSelectedProduct} = useContext(ProductContext)


  const [selectedOption, setSelectedOption] = useState(data.product.options.map((option)=>{return({name:option.name,value:option.values[0]})}))
  const [price,setPrice] = useState(data?.product?.variants?.nodes[0].priceV2?.amount || 0)
  
  
  const [soldOutItems,setSoldOutItems] = useState([])
  const [currentVariant,setCurrentVariant] = useState(null)
  const [secureTransactionModal, setSecureTransactionModal] = useState(false)
  const [refundsModal,setRefundsModal] = useState(false)
  const [openReviewsModal, setOpenReviewsModal] = useState(false)
  let imageRef = useRef([])
  
  
  // TODO, reset to default once the data changes.
  useEffect(()=>{
    setSelectedOption(data.product.options.map((option)=>{return({name:option.name,value:option.values[0]})}))
    setCurrentVariant(null)
    didMount.current = false;
    imageRef.current.scrollLeft = 0
    setPrice(data?.product?.variants?.nodes[0].priceV2?.amount || 0)
    return(()=>{})
  },[data?.product])
  
  
  
  // TODO, this is for the sticky cart
  setSelectedProduct(selectedOption)
  
  
  // FUNCTION TODO, change old array to new array with a value the user has selected
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
  
  
  // TODO, sets the current image to the variant selected image
  const didMount = useRef(false)
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

    
    imageRef.current.scrollLeft = 0
    setCurrentVariant(data.product.variants.nodes[findId].image.url)
    setPrice(data.product.variants.nodes[findId].priceV2.amount)
    return(()=>{})
  },[selectedOption])


  // FUNCTION TODO, add to cart
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

  // TODO, on data change, set the data for variants that are sold out.
  useEffect(()=>{
    const soldOutVariants = data.product.variants.nodes.filter((currentArr)=>{
      if(currentArr.quantityAvailable === 0){
        return currentArr.selectedOptions[0]
      }
    })
    setSoldOutItems(soldOutVariants.map((variant)=>variant.selectedOptions[0].value))
    return(()=>{})
  },[data?.product])

  return (
    <>
      {data.product ?  
      <>
        <div className="relative bg-background" ref = {compRef}>
          <div className="pb-24">
            <div className="max-w-2xl mx-auto sm:mt-8 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="flex flex-col w-full h-full md:gap-10 lg:grid lg:grid-cols-12">
                <ImageCarousel 
                  data = {data} 
                  imageRef = {imageRef} 
                  currentVariant = {currentVariant}
                  selectedOption = {selectedOption}
                />

                {/* RIGHT SIDE */}
                <div className = "col-span-4 ">
                  <div className = "sticky top-[104px]">
                    <ProductHeading data = {data} price = {price}/>
                    <CouponComponent data = {data} selectedOption = {selectedOption}/>
                    <ProductOptions data = {data} selectedOption = {selectedOption} setSelectedOption = {setSelectedOption} soldOutItems = {soldOutItems} handleVariantChange = {handleVariantChange}/>
                    <GetItByComponent data = {data}/>
                    <div className = "px-4 mt-4 mb-6">
                      <Button 
                        className = "product-page-add-to-cart" 
                        text = {`Add to cart | ${formatNumber(price)}`}
                        onClick = {(e)=>addToCart(e)} 
                        tag = {'product-page-add-to-cart'}
                        CSS = {'py-4 bg-secondaryVariant hover:bg-secondary text-onSecondary'}
                      />
                    </div>
                    <Description data = {data}/>
                    <div className = "px-4">
                      <ProductDetailsComponent data = {data.product.useCases}/>
                      <DetailsComponent data = {data.product.details}/>
                      <LearnMoreComponent data = {data.product.learnmore}/>
                      <ReviewsAccordian currentProduct = {data?.product?.title} data = {data} setOpenReviewsModal = {setOpenReviewsModal} reviews = {reviews}/>
                      <Perks setSecureTransactionModal = {setSecureTransactionModal}/>
                      <CrossSellComponent data = {data} crossSell = {crossSell} selectedOption = {selectedOption}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SecureTransactions secureTransactionModal={secureTransactionModal} setSecureTransactionsModal = {setSecureTransactionModal}/>
        <RefundsModal refundsModal={refundsModal} setRefundsModal = {setRefundsModal}/>
        <ReviewsModal openReviewsModal = {openReviewsModal} setOpenReviewsModal = {setOpenReviewsModal} data = {data}/>
      </>
      :
        <div>
        
        </div>
      }
    </>
  )
}

function Perks({setSecureTransactionModal}){
  return(
    <div className = "mt-4">
      <div className = "flex items-center text-xs gap-x-1">
        <LockClosedIcon className = "w-4 h-4 text-onBackground/50" />
        <p className = "text-sm cursor-pointer text-onBackground/40 hover:text-onBackground/30"
        onClick = {()=>setSecureTransactionModal(true)}
        >Secure transaction</p>
      </div>
    </div>
  )
}

function ImageCarousel({data, imageRef, currentVariant,selectedOption}){
  const [imagePos,setImagePos] = useState(0)
  const [expandImage, setExpandImage] = useState(false)
  const [expandPos,setExpandPos] = useState(0)
  const [imagesBasedOnSelected,setImagesBasedOnSelected] = useState(null)
  const containerRef = useRef() 
  
  useEffect(()=>{
  
    // Get the selected variants values 
    const filterImagesByValues = selectedOption.map(variants=>variants.value.toLowerCase())
    filterImagesByValues.push('all')


    // Map through images alt text and only return the ones that have a value 
    // that is in the filterImagesByValues array

    const imagesBasedOnSelectedVariant = data.product.media.nodes.map((media)=>{
      if(media?.image){
        if(!media?.image?.altText) return
  
        
        if(filterImagesByValues.includes(media.image.altText.split(":")[1])){
          return media
        }
      }else{
        if(media?.previewImage){
          if(!media.previewImage?.altText) return
  
          
          if(filterImagesByValues.includes(media.previewImage?.altText.split(":")[1])){
            return media
          }
        }
      }
    })
    // Filter the undefined values
    .filter((val)=>val != undefined)
    setImagesBasedOnSelected(imagesBasedOnSelectedVariant)
    
  },[selectedOption])

  // Figure out the current position of image, only set the image pos when number is a whole number.
  const handleScroll = useCallback(()=>{
    if(Number.isInteger(parseInt(imageRef.current.scrollLeft) / parseInt(imageRef.current.clientWidth))){
      setImagePos(imageRef.current.scrollLeft / imageRef.current.clientWidth)
    }
  })

  useEffect(()=>{
    (async ()=>{
      try{
        containerRef.current.scrollLeft = expandPos * containerRef?.current?.clientWidth
      }catch(e){
        console.log(e)
      }
    })()
  },[expandPos, containerRef.current])


  // Scrolls back to the beginning when image is 
  useEffect(()=>{
    imageRef.current.scrollLeft = imagePos * imageRef.current.clientWidth
  },[imagePos])


  useEffect(()=>{
    const div = imageRef.current
    div.addEventListener("scroll",handleScroll)
  },[handleScroll])

  const handleExpandClick = (index) =>{
    setExpandPos(index)
    setExpandImage(true)
  }



  return(
    <>
      <div className="relative col-span-7">
        <h2 className="sr-only">Images</h2>
        <div 
          className={`
            grid grid-flow-col auto-cols-[100%] overflow-scroll snap-x snap-mandatory
            lg:grid-flow-row  lg:grid-cols-2 lg:gap-8 scrollBar relative cursor-pointer w-full h-full `} 
          ref = {imageRef}
        >
          {imagesBasedOnSelected?.length === 0 || !imagesBasedOnSelected ? 
            <>
              {data.product.media.nodes.filter((media)=>{
                if(media?.image){
                  if(media.image.altText) return media
                }
                if(media?.previewImage){
                  if(media.previewImage.altText) return media
                }
              }).map((media,index)=>(
                <React.Fragment key = {index}>
                  {index < 10 && (
                    <>
                      {media?.image ? 
                        <div 
                          className = {`
                          ${index === 0 ? ('lg:col-span-2 h-full w-full') :('lg:col-span-1 h-full w-full')}
                            relative w-full h-full overflow-hidden snap-center rounded-md aspect-square
                            ${index >= 5 && ('lg:hidden')}
                            bg-neutral-100
                          `}
                          key = {index}
                          onClick = {()=>handleExpandClick(index)}
                        >
                          <Image 
                            src = {(currentVariant && index == 0) ? currentVariant : media?.image?.url} 
                            layout='fill' 
                            objectFit='contain' 
                          />
                        </div>
                      :
                        <div 
                          className = {`
                          ${index === 0 ? ('lg:col-span-2 w-full') :('lg:col-span-1')}
                            relative w-full overflow-hidden snap-center rounded-md h-full  bg-black
                          `}
                          key = {index}
                          onClick = {()=>handleExpandClick(index)}
                        >
                          <Image
                            className = "object-contain w-full h-full"
                            src = {media?.previewImage?.url}
                            layout='fill'
                            priority = {index === 0 ? true : false}
                          />
                          <div className = "absolute inset-0 z-20 flex items-center justify-center ">
                            <div className = "flex items-center justify-center p-4 rounded-full shadow-xl bg-background backdrop-blur-md">
                              <PlayIcon className = "w-8 h-8 text-secondary"/>
                            </div>
                          </div>
                        </div>
                      }
                    </>
                  )}
                </React.Fragment>
              ))
              }
              
            </>
            :
            <>
              {imagesBasedOnSelected?.map((media,index)=>(
                <React.Fragment key = {index}>
                  {index < 10 && (
                    <>
                    {media?.image ? 
                      <div 
                        className = {`
                        ${index === 0 ? ('lg:col-span-2 h-full w-full') :('lg:col-span-1 h-full w-full')}
                        ${index >= 5 && ('lg:hidden')}
                          relative w-full h-full overflow-hidden snap-center rounded-md aspect-square 
                          bg-neutral-100
                        `}
                        key = {index}
                        onClick = {()=>handleExpandClick(index)}
                      >
                        <Image 
                          src = {(currentVariant && index == 0) ? currentVariant : media?.image?.url} 
                          layout='fill' 
                          objectFit='contain' 
                        />
                      </div>
                    :
                      <div 
                        className = {`
                        ${index === 0 ? ('lg:col-span-2 w-full') :('lg:col-span-1')}
                        ${index >= 5 && ('lg:hidden')}
                          relative w-full overflow-hidden snap-center rounded-md h-full  bg-black
                        `}
                        key = {index}
                        onClick = {()=>handleExpandClick(index)}
                      >
                        <Image
                          className = "object-contain w-full h-full"
                          src = {media?.previewImage?.url}
                          layout='fill'
                          priority = {index === 0 ? true : false}
                        />
                        <div className = "absolute inset-0 z-20 flex items-center justify-center ">
                          <div className = "flex items-center justify-center p-4 rounded-full shadow-xl bg-background backdrop-blur-md">
                            <PlayIcon className = "w-8 h-8 text-secondary"/>
                          </div>
                        </div>
                      </div>
                    }
                    </>
                  )}
                </React.Fragment>
              ))}
            </>
          }



        </div>
        <div className = "absolute bottom-0 left-0 right-0 flex items-center justify-center mb-4 lg:hidden">
          <div className = "flex items-center p-2 rounded-full cursor-pointer bg-black/25 backdrop-blur-xl gap-x-1.5">
            {!imagesBasedOnSelected || imagesBasedOnSelected.length === 0 ?
            <>
              {data.product.media.nodes.filter((media)=>{
                if(media?.image){
                  if(media.image.altText) return media
                }
                if(media?.previewImage){
                  if(media.previewImage.altText) return media
                }
              }).map((v,index)=>(
                <React.Fragment key = {index}>
                  {index < 10 && (
                    <>
                      {v.image && (
                        <div 
                          key = {index}
                          className = {`w-2 h-2  ${index == imagePos ? 'bg-white' : 'bg-white/30'} rounded-full transition-colors`}  
                          onClick = {()=>setImagePos(index)}
                        />
                      )}
                      {v.sources && (
                        <PlayIcon 
                          key = {index}
                          className = {`w-3 h-3 -mx-0.5 ${index == imagePos ? 'text-white' : 'text-white/30'}  transition-colors`}
                          onClick = {()=>setImagePos(index)}
                        />
                      )}
                    </>
                  )}
                </React.Fragment>
              ))
              }
            </>
            :
            <>
              {imagesBasedOnSelected.map((v,index)=>(
                <React.Fragment key = {index}>
                  {index < 10 && (
                    <>
                      {v.image && (
                        <div 
                          key = {index}
                          className = {`w-2 h-2  ${index == imagePos ? 'bg-white' : 'bg-white/30'} rounded-full transition-colors`}  
                          onClick = {()=>setImagePos(index)}
                        />
                      )}
                      {v.sources && (
                        <PlayIcon 
                          key = {index}
                          className = {`w-3 h-3 -mx-0.5 ${index == imagePos ? 'text-white' : 'text-white/30'}  transition-colors`}
                          onClick = {()=>setImagePos(index)}
                        />
                      )}
                    </>
                  )}
                </React.Fragment>
              ))}
            </>
            }
          </div>
        </div>
      </div>
      <ExpandImage expandImage={expandImage} setExpandImage = {setExpandImage} data = {data} currentImage = {imagePos} setExpandPos = {setExpandPos} expandPos = {expandPos} containerRef = {containerRef}/>
    </>
  )
}

function Description({data}){
  return(
    <div className="px-4 my-4 overflow-hidden rounded-md">
      <div
        className="prose-h1:mb-6 prose-p:mt-2 prose-h1:text-onBackground prose-p:text-onBackground/60 prose-p:sm:text-base prose-p:font-light prose-h6:hidden prose-p:text-base prose-li:list-disc prose-li:ml-4 prose-li:mb-3"
        dangerouslySetInnerHTML={{ __html: data.product.descriptionHtml }}
      />
</div>
  )
}

function CouponComponent({data,selectedOption}){
  const {cartData,setCartData} = useContext(CartContext)
  const {currentUser} = useContext(UserContext)
  const [checked,setChecked] = useState()
  const couponCode = useMemo(()=>{return data.product.coupon?.value ? JSON.parse(data.product.coupon?.value) : ''},[data,cartData])
  
  // TODO, if coupon is already in cartData, set checked automaticlly on.
  useEffect(()=>{
    setChecked(cartData?.discountCodes.filter((discountCode)=> couponCode.discountName == discountCode.code).length  > 0)    
  },[cartData,data])

  // Created an array of already set discounts
  const currentDiscountsArr = useMemo(()=>{return cartData?.discountCodes.map((discountCode)=> discountCode.code)})

  const handleChecked = async () =>{
    if(checked) return
    

    // Avoids adding duplicate discount codes as well as adding a shipping discount if user is verifed 
    currentDiscountsArr.includes(couponCode.discountName) ? '' : currentDiscountsArr.push(couponCode.discountName)// Push non exisiting code into array, this avoids removing codes already set in the users cart
    currentUser ? currentDiscountsArr.includes('Members Rewards') ? '' : currentDiscountsArr.push('Members Rewards') : '' //If user is a customer, add the free shipping discount.

    const {data,errors} = await storefront(addCartDiscountCode,{cartId:cartData.id,discountCodes:currentDiscountsArr})
    if(data && data?.cartDiscountCodesUpdate.userErrors.length == 0){
      setCartData(data.cartDiscountCodesUpdate.cart)
    }else{
      alert("Error in adding coupon.")
    }
  }
  return(
    <>
    {(couponCode && selectedOption[0].value == couponCode?.availableTo?.variant || couponCode?.availableTo?.variant == "") && (  
      <div className = "flex items-center w-full px-4 mt-4 gap-x-3 ">
        <div className = "blockHead">
          <span className = "">Coupon</span>
        </div>
        <div className = {`w-4 h-4 border rounded-sm border-secondaryVariant ${checked ? 'bg-secondary' : 'bg-transparent cursor-pointer'} transition flex items-center justify-center`}
        onClick = {()=>handleChecked()}
        >
        {checked && (
          <CheckIcon className = "w-5 h-5 text-onSecondary"/>
        )}
        </div>
        <p className = "text-sm text-onBackground/70">
          <span className = {`font-medium text-onBackground`}>{couponCode.discountAmount}%</span>{' '}
          {checked ? 
            <span>applied at checkout</span>
          :
            'Promotional coupon'
          }
        </p>
      </div>
    )}
    </>
  )

}

function GetItByComponent({data}){
  const [day,setDay] = useState(0)
  const [hour,setHour] = useState(0)
  const [minute,setMinute] = useState(0)
  const [second,setSecond] = useState(0)
  const [deliveryModal,setDeliveryModal] = useState(false)
  const dates = data?.product?.deliveryBusinessDays?.value ? JSON.parse(data?.product?.deliveryBusinessDays?.value) : null

  
  // Time variables
  const today = new Date().getTime()
  const orderWithinDate = data.product.orderWithin?.value ? new Date(JSON.parse(data.product.orderWithin.value)).getTime() : null 
  const gap = orderWithinDate ? orderWithinDate - today : 0 
  useEffect(()=>{
    const interval = setInterval(()=>{
      const today = new Date().getTime()
      const orderWithinDate = data?.product?.orderWithin?.value ? new Date(JSON.parse(data.product.orderWithin.value)).getTime() : null 
      const gap = orderWithinDate - today
      
      const second = 1000;
      const minutes = second * 60
      const hours = minutes * 60
      const day = hours * 24
      
      if(gap <= 0) return 
      setDay(Math.floor(gap/day))
      setHour(Math.floor((gap % day) / hours))
      setMinute(Math.floor((gap % hours) / minutes))
      setSecond(Math.floor((gap % minutes) / second))
    },1000)

    
    return() => {
      clearInterval(interval)
    }
  },[day,hour,minute,second])

  
  const {minMonth,minDays,minYear,maxDays,maxMonth,maxYear} = useMemo(()=>{
    return deliveredDate(dates ? dates[0]?.default?.min : 7, dates ? dates[0]?.default?.max : 14)
  },[]) 

  const orderWithinDates = useMemo(()=>{
    return deliveredDate(dates ? dates[0]?.orderWithin.min : 7, dates ? dates[0]?.orderWithin.max : 14)
  },[])
  return(
  <>
      {day <= 0 && hour <= 0 && minute <= 0 && second <= 0 ? 
        <p className = "flex items-center px-4 text-sm md:flex text-onBackground/70">
          <span className = "mr-1">Delivery by</span>
          <span className = "font-semibold text-onBackground">{` ${minMonth.slice(0,3)} ${minDays} - ${maxMonth.slice(0,3)} ${maxDays}, ${maxYear}`}.</span>
        </p>
      :
      <>
        <p className = "px-4 text-sm text-onBackground/70">FAST delivery
          <span className = "font-semibold text-onBackground">{` ${orderWithinDates.minMonth.slice(0,3)} ${orderWithinDates.minDays} - ${orderWithinDates.maxMonth.slice(0,3)} ${orderWithinDates.maxDays}, ${orderWithinDates.maxYear}`}.</span>
          <br/>
          Order within:
          <span className = "font-medium text-primaryVariant2">{`
            ${day != 0 ? (`${day} day${day > 1 ? 's' : ''}`) : ('')} 
            ${hour != 0 ? (`${hour} hr${hour > 1 ? 's' : ''}`) : ('')} 
            ${day == 0 ? minute != 0 ? (`${minute} min${minute > 1 ? 's' : ''}`) : ('') : ('')}  
            ${hour == 0 ? (`${second} sec${second > 1 ? 's' : ''}`) : ('')}
            `}
          </span>
        </p>
      </>
      }
      <DeliveryModal deliveryModal = {deliveryModal} setDeliveryModal = {setDeliveryModal}/>
  </>
  )
}

function ProductOptions({data, selectedOption, soldOutItems, handleVariantChange}){
  const [sizeModal,setSizeModal] = useState(false)
  return(
    <>
      <div className = "mt-4">
        {data.product.options.map((option,index)=>(
          <div key = {index} className = "">
            {/* Options title */}
            {/* TODO, avoid rendering products with no options / variants */}
            {option.name != "Title" && (
              <h3 className = "flex items-center px-4 text-base font-medium gap-x-2 " id = {option.name}>
                <span>{option.name}</span>
                {option.name === "Size" && (
                  <React.Fragment>
                    {data?.product?.sizeGuide?.value && (
                      <span 
                        className = "flex items-center justify-center text-sm font-normal cursor-pointer text-tertiaryVariant gap-x-1" 
                        onClick = {()=>setSizeModal(true)}>
                        <BookOpenIcon className = "w-3 h-3"/> Size guide
                      </span>
                    )}
                  </React.Fragment>
                )}
                {/* <span className = "font-normal text-neutral-800">{selectedOption[selectedOption.findIndex(opt =>opt?.name === option.name)]?.value}</span> */}
              </h3>
            )}
    
            {/* Options Values */}
            <div className = "flex flex-wrap items-center gap-3 px-4 overflow-x-scroll scrollBar">
              {/* TODO, avoid rendering products with no options / variants */}
              {option.name != "Title" && (
                <div className = "flex items-center gap-3 px-1 mt-2 mb-4 md:flex-wrap">
                  {option.values.map((value,key)=>(
                    <p className = 
                    {`
                      ${option.name === "Color" 
                      ? (`${soldOutItems?.includes(value) ? 'h-7 w-7 rounded-full border cursor-default ' : `cursor-pointer h-7 w-7 rounded-full border ${selectedOption.filter(opt =>opt.value === value).length > 0 ? 'ring-primaryVariant ring-offset-2 ring' : 'ring-neutral-400'}`}`)
                      : (`${soldOutItems?.includes(value) 
                        ? 'bg-gray-300 ring-black/60 cursor-default w-max' 
                        : `${selectedOption.filter(opt =>opt.value === value).length > 0 
                          ? 'ring-primaryVariant bg-primary w-max' 
                          : 'ring-neutral-400'}`} px-3 py-1 ring-2 cursor-pointer rounded-md w-max`)}
                      text-sm mt-1
                    `}
                    style={{backgroundColor:soldOutItems.includes(value) ? "lightgray" : option.name === "Color" && (value)}}
                    onClick = {(e)=>handleVariantChange(option.name,value)}
                    key = {key}
                    id = {option.value}
                    >
                      {option.name === "Color" ? '' : value}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {data?.product?.sizeGuide?.value && (
        <SizeModal sizeModal = {sizeModal} setSizeModal = {setSizeModal} sizing = {data?.product?.sizeGuide?.value}/>
      )}
    </>
  )
}

function ProductHeading({data,price}){
  const {locale} =  useContext(LocaleContext)

  const calculatePercentage = (minNum, maxNum) =>{
    return ((minNum-maxNum) / maxNum * 100).toFixed(0)
  }

  return(
  <>
    <div className="flex flex-col items-start justify-between w-full px-4 mt-3 md:mt-0">
      <div className="flex items-center justify-between w-full text-2xl text-onBackground">
        <p id = {data?.product?.id}>{data?.product?.title}</p>
      </div>
      <p className="mt-1 text-base md:text-lg sm:text-base">
        {parseInt(data.product?.priceRange?.maxVariantPrice?.amount) < parseInt(data?.product?.compareAtPriceRange?.maxVariantPrice?.amount) ? 
        <span className = "flex flex-col gap-x-1">
          <span className = "font-medium text-onBackground">
            <span className = 'font-light text-tertiaryVariant'>{calculatePercentage(data.product?.priceRange?.maxVariantPrice?.amount, data.product.compareAtPriceRange.maxVariantPrice.amount)}%</span>
              {'  '}
              {formatNumber(price,data.product.priceRange.maxVariantPrice.currencyCode,locale)}
            </span>

            {/* WAS  */}
          <span className = "mt-0 text-xs font-normal">
            <span>Was</span>
            {' '}
            <span className = "line-through">{formatNumber(data.product.compareAtPriceRange.maxVariantPrice.amount,data.product.compareAtPriceRange.maxVariantPrice.currencyCode, locale)}</span>
          </span>
        </span>
        :
        <> 
          <span>{formatNumber(price,data.product.priceRange.maxVariantPrice.currencyCode,locale)}</span>
        </>
      }
      </p>
    </div>
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
        <div className = "mt-1">
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
        <div className = "mt-1">
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

function ProductDetailsComponent({data}){
  const [open, setOpen] = useState(false)
  const useCasesJSON = data ? JSON.parse(data.value) : null
  return(
    <>
      {useCasesJSON === null ?
        <>
        </>
      :
        <div className = "mt-4">
          <div className = "prose-h3">
            <div className = "w-full h-full rounded-md">
              <div className = "flex justify-between w-full h-full pb-4 gap-x-6">
                {useCasesJSON.map((useCase)=>(
                <div className = "flex flex-col items-center justify-start w-full max-w-xs pointer-events-none select-none" key = {useCase.heading}>
                  <Image src = {useCase.svg} width = {40} height = {40} priority/>
                  <h3 className = "mt-4 text-sm font-medium text-center text-onSurface">{useCase.heading}</h3>
                  {/* <p className = "text-sm text-center text-onSurface/70">{useCase.paragraph}</p> */}
                </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

