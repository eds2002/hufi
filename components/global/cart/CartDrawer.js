import UserContext from "../../../context/userContext"
import LocaleContext from "../../../context/localeContext"
import CartContext from "../../../context/cartContext"
import { Transition, Dialog } from "@headlessui/react"
import { useState,useContext,useEffect, useMemo } from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { formatNumber } from "../../../utils/formatNumber"
import Link from "next/link"
import { Button } from "../../elements"
import { CartProduct } from ".."
import hufiMemberSvg from '../../../assets/cartReminder.svg'
import refundsSvg from '../../../assets/30dayrefunds.svg'
import Image from "next/image"
import { storefront } from "../../../utils/storefront"
import { viewCollectionProducts } from "../../../graphql/queries/viewCollectionProducts"
import { deliveredDate } from "../../../utils/deliveredDate"
import { addToShopifyCart } from "../../../utils/addToShopifyCart"
import { useRouter } from "next/router"

export default function CartDrawer({openCart, setOpenCart,Fragment}){
  const {cartData,setViewedCart,setCartData} = useContext(CartContext)
  const {currentUser} = useContext(UserContext)
  const {locale} = useContext(LocaleContext)
  const totalItems = cartData?.lines?.edges?.length ?? 0
  const [progressWidth, setProgressWidth] = useState(100)
  const [cartUpsell,setCartUpsell] = useState(null)
  const [cartUpsellRow2, setCartUpsellRow2] = useState(null)
  const router = useRouter()

  useEffect(()=>{
    setProgressWidth((cartData?.cost?.subtotalAmount?.amount || 0)/75*100)
  },[cartData?.cost?.subtotalAmount?.amount])
  useEffect(()=>{
    if(openCart){
      setViewedCart(true)
    }
  },[openCart])

  useEffect(()=>{
    const collectionHandle = cartData?.lines?.edges[0]?.node?.merchandise?.product?.collections?.nodes[0]?.title ?? null 
    if(collectionHandle === null){
      setCartUpsell(null)
      return
    }
    const getRecommendedCartProducts = async () =>{
      const {data,errors} = await storefront(viewCollectionProducts,{handle:collectionHandle,amount:10})
      if(data.collectionByHandle && !errors && data.collectionByHandle){
        setCartUpsell(data.collectionByHandle)
      }else{
        setCartUpsell(null)
      }
    }

    const getGeneralProducts = async () =>{
      const {data,errors} = await storefront(viewCollectionProducts,{handle:"all-products",amount:10})
      if(data.collectionByHandle && !errors){
        setCartUpsellRow2(data.collectionByHandle)
      }else{
        setCartUpsellRow2(null)
      }
    }
    getRecommendedCartProducts()
    getGeneralProducts()
  },[cartData])


  const calculatePercentage = (minNum, maxNum) =>{
    return ((minNum-maxNum) / maxNum * 100).toFixed(0)
  }

  const handleAddToCart = async (product) =>{
    const responseCartData = await addToShopifyCart(cartData,product.variants.nodes[0].id)
    setViewedCart(false)
    setOpenCart(true)
    setCartData(responseCartData)
  }

  const handleRedirect = (link) =>{
    router.push(link)
    setOpenCart(false)
  }

  return(
    <Transition.Root show={openCart} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={setOpenCart}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-opacity-25 bg-secondaryVariant" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative flex flex-col justify-between w-full max-w-xs ml-auto overflow-scroll overflow-y-auto shadow-xl bg-background">

            
              {/* CART HEADER */}
              {cartData?.lines?.edges?.length == 0 ?
                <>
                  <div className="flex justify-between px-4 pt-5 pb-2">
                    <span className = "text-xl font-medium">Cart <span className = "text-xl">{totalItems}</span></span>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center p-2 -m-2 rounded-md text-onBackground"
                      onClick={() => setOpenCart(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className = "flex items-center justify-center w-full h-full">
                    <div className = "flex flex-col items-center justify-center">
                      <h1 className = "text-xl font-medium">Your cart is empty.</h1>
                      <h3 className = "text-base text-onBackground/60">Start shopping the latest.</h3>
                      <div className = "w-full mt-4">
                        <Link href =  "/">
                          <Button text = 'Shop' className = "w-full bg-secondaryVariant hover:bg-secondary" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              :
              <>

                {/* PRODUCTS CONTAINER */}
                <div className = "relative w-full overflow-scroll">
                  <div className = "relative">
                    <div className="sticky top-0 z-20 flex justify-between px-4 py-4 border-b bg-background border-b-secondary/10">
                      <span className = "text-xl font-medium">Cart <span className = "text-xl">({totalItems})</span></span>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center p-2 -m-2 rounded-md text-onBackground"
                        onClick={() => setOpenCart(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                      </button>
                    </div>
                    {cartData?.lines?.edges?.map((product)=>(
                      <CartProduct data = {product} key = {product.id}/>
                    ))}
                    <div className = "">
                      <div className = "flex items-center h-full p-4 bg-surface center gap-x-3">
                        <div className = "flex items-center justify-center overflow-hidden pointer-events-none select-none">
                          <Image src = {refundsSvg} width={100} height={100} className = "scale-[1.7]"/>
                        </div>
                        <div className = "flex flex-col items-start justify-center flex-1 ">
                          <h3 className = "mb-1 text-sm font-medium">Shopping is fun when it&apos;s safe.</h3>
                          <p className = "text-xs text-onSurface/70">30 day refunds are available on all of our products. Start shopping with ease.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    {/* CART UPSELL */}
                    {cartData?.lines?.edges.length != 0 && (
                      <>
                        {/* Hufi Rewards Member Banner */}
                        {/* Product Recommendations */}
                        {cartUpsell && (
                          <div className = "py-6 ">
                            <div className="sticky top-0 z-20 flex justify-between py-4 border-b bg-background border-b-secondary/10">
                              <h3 className = "px-4 text-xl font-medium">{cartData?.lines?.edges?.length > 1 ? 'Related to items in your cart' : `More from ${cartData?.lines?.edges[0]?.node?.merchandise?.product?.collections?.nodes[0]?.title}`}</h3>
                            </div>
                            <div className="w-full px-4 py-4 overflow-scroll scrollBar">
                              <div className = "grid grid-flow-col auto-cols-[50%] gap-5">
                                {cartUpsell?.products?.nodes?.map((product)=>(
                                  <>
                                  {/* Display all products that are not equal to the cart line product title */}
                                  {!cartData?.lines?.edges.filter(cartLines => cartLines?.node?.merchandise?.product?.title === product.title).length >= 1 && (
                                    <div className = 'w-full text-ellipsis'>
                                      <div 
                                        className = "relative w-full h-32 overflow-hidden bg-gray-200 rounded-md cursor-pointer aspect-square"
                                        onClick={()=>handleRedirect(`/product/${product?.handle}`)}
                                      >
                                        <Image src = {product.media.nodes[0].previewImage.url} layout = 'fill'/> 
                                      </div>
                                      <h5 className = "mt-3 text-sm font-medium truncate whitespace-nowrap text-ellipsis">{product.title}</h5>
                                      <p className = "text-sm">
                                      {parseInt(product?.priceRange?.maxVariantPrice?.amount) < parseInt(product?.compareAtPriceRange?.maxVariantPrice?.amount) ? 
                                        <span className = "flex flex-col gap-x-1">
                                          <span className = "font-medium text-onBackground">
                                            <span className = 'font-light text-tertiaryVariant'>{calculatePercentage(product?.priceRange?.maxVariantPrice?.amount, product.compareAtPriceRange.maxVariantPrice.amount)}%</span>
                                              {'  '}
                                              {formatNumber(product.priceRange.maxVariantPrice.amount,product.priceRange.maxVariantPrice.currencyCode,locale)}
                                            </span>
                                        </span>
                                      :
                                        <span>{formatNumber(product.priceRange.maxVariantPrice.amount,product.priceRange.maxVariantPrice.currencyCode,locale)}</span>
                                      }
                                      </p>
                                      <p className = "text-xs text-onSurface/70">
                                        <GetItByComponent data = {product}/>
                                      </p>
                                      <div className = "mt-3">
                                        <Button 
                                          text = 'View options' 
                                          CSS = 'text-xs bg-secondaryVariant hover:bg-secondary w-full px-2 py-1 text-onSecondary w-max'
                                          onClick={()=>handleRedirect(`/product/${product?.handle}`)}  
                                        />
                                      </div>
                                    </div>
                                  )}
                                  </>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* General Product recommendations */}
                        {cartUpsellRow2 && (
                          <div className = "py-6 ">
                          <div className="sticky top-0 z-20 flex justify-between py-4 border-b bg-background border-b-secondary/10">
                              <h3 className = "px-4 text-xl font-medium">Discover more at Hufi</h3>
                            </div>
                            <div className="w-full px-4 py-4 overflow-scroll scrollBar">
                              <div className = "grid grid-flow-col auto-cols-[50%] gap-5">
                                {cartUpsellRow2?.products?.nodes?.map((product)=>(
                                  <>
                                    {/* Step 1, check if firstCartUpsell row is valid */}
                                    {cartUpsell ? 
                                    <>
                                      {/* Step two is first upsell is valid*/}
                                      {/* Display all products, filter out products that are already included in the first upsell row */}
                                      {cartUpsell?.products?.nodes?.every((upsell)=> upsell.title != product.title) && (
                                        <>
                                        {/* 2nd step, filter out any products that are already added to the cart. */}
                                        {!cartData?.lines?.edges.filter(cartLines => cartLines?.node?.merchandise?.product?.title === product.title).length >= 1 && (
                                          <div className = 'w-full '>
                                            <div 
                                              className = "relative w-full h-32 overflow-hidden bg-gray-200 rounded-md cursor-pointer aspect-square"
                                              onClick = {()=>handleRedirect(`/product/${product?.handle}`)}
                                            >
                                              <Image src = {product.media.nodes[0].previewImage.url} layout = 'fill'/> 
                                            </div>
                                            <h5 className = "mt-3 text-sm font-medium truncate whitespace-nowrap text-ellipsis">{product.title}</h5>
                                            <p className = "text-sm">
                                            {parseInt(product?.priceRange?.maxVariantPrice?.amount) < parseInt(product?.compareAtPriceRange?.maxVariantPrice?.amount) ? 
                                              <span className = "flex flex-col gap-x-1">
                                                <span className = "font-medium text-onBackground">
                                                  <span className = 'font-light text-tertiaryVariant'>{calculatePercentage(product?.priceRange?.maxVariantPrice?.amount, product.compareAtPriceRange.maxVariantPrice.amount)}%</span>
                                                    {'  '}
                                                    {formatNumber(product.priceRange.maxVariantPrice.amount,product.priceRange.maxVariantPrice.currencyCode,locale)}
                                                  </span>
                                              </span>
                                            :
                                              <span>{formatNumber(product.priceRange.maxVariantPrice.amount,product.priceRange.maxVariantPrice.currencyCode,locale)}</span>
                                            }
                                            </p>
                                            <p className = "text-xs text-onSurface/70">
                                              <GetItByComponent data = {product}/>
                                            </p>
                                            <div className = "mt-3">
                                            {product.options.length === 1 && product.options[0].name === "Title" ? 
                                              <Button 
                                                text = 'Add to cart' 
                                                CSS = 'text-xs bg-secondaryVariant hover:bg-secondary w-full px-2 py-1 text-onSecondary w-max'
                                                onClick = {()=>handleAddToCart(product)}
                                              />
                                            :
                                              <Button 
                                                text = 'View all options' 
                                                CSS = 'text-xs bg-secondaryVariant hover:bg-secondary w-full px-2 py-1 text-onSecondary w-max'
                                                onClick={()=>handleRedirect(`/product/${product?.handle}`)}
                                              />
                                            }
                                            </div>
                                          </div>
                                        )}
                                        </>
                                      )}
                                    </>
                                    :
                                    <>
                                      {/* Step 2 if first upsell is not valid, filter out any products that are already added to the cart. */}
                                      {!cartData?.lines?.edges.filter(cartLines => cartLines?.node?.merchandise?.product?.title === product.title).length >= 1 && (
                                        <div className = 'w-full '>
                                          <div 
                                            className = "relative w-full h-32 overflow-hidden bg-gray-200 rounded-md cursor-pointer aspect-square"
                                            onClick = {()=>handleRedirect(`/product/${product?.handle}`)}
                                          >
                                            <Image src = {product.media.nodes[0].previewImage.url} layout = 'fill'/> 
                                          </div>
                                          <h5 className = "mt-3 text-sm font-medium truncate whitespace-nowrap text-ellipsis">{product.title}</h5>
                                          <p className = "text-sm">
                                          {parseInt(product?.priceRange?.maxVariantPrice?.amount) < parseInt(product?.compareAtPriceRange?.maxVariantPrice?.amount) ? 
                                            <span className = "flex flex-col gap-x-1">
                                              <span className = "font-medium text-onBackground">
                                                <span className = 'font-light text-tertiaryVariant'>{calculatePercentage(product?.priceRange?.maxVariantPrice?.amount, product.compareAtPriceRange.maxVariantPrice.amount)}%</span>
                                                  {'  '}
                                                  {formatNumber(product.priceRange.maxVariantPrice.amount,product.priceRange.maxVariantPrice.currencyCode,locale)}
                                                </span>
                                            </span>
                                          :
                                            <span>{formatNumber(product.priceRange.maxVariantPrice.amount,product.priceRange.maxVariantPrice.currencyCode,locale)}</span>
                                          }
                                          </p>
                                          <p className = "text-xs text-onSurface/70">
                                            <GetItByComponent data = {product}/>
                                          </p>
                                          <div className = "mt-3">
                                          {product.options.length === 1 && product.options[0].name === "Title" ? 
                                            <Button 
                                              text = 'Add to cart' 
                                              CSS = 'text-xs bg-secondaryVariant hover:bg-secondary w-full px-2 py-1 text-onSecondary w-max'
                                              onClick = {()=>handleAddToCart(product)}
                                            />
                                          :
                                            <Button 
                                              text = 'View all options' 
                                              CSS = 'text-xs bg-secondaryVariant hover:bg-secondary w-full px-2 py-1 text-onSecondary w-max'
                                              onClick={()=>handleRedirect(`/product/${product?.handle}`)}
                                            />
                                          }
                                          </div>
                                        </div>
                                      )}
                                    </>
                                    }
                                  </>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Sign up banner */}
                        {!currentUser && (
                          <div className = "">
                            <div className = "flex items-center h-full p-4 bg-surface center gap-x-3">
                              <div className = "flex items-center justify-center overflow-hidden pointer-events-none select-none">
                                <Image src = {hufiMemberSvg} width={100} height={100} className = "scale-[1.7]"/>
                              </div>
                              <div className = "flex flex-col items-start justify-center flex-1 ">
                                <h3 className = "mb-1 text-sm font-medium">Happy savings</h3>
                                <p className = "text-xs text-onSurface/70">Rewards member receive <span className = "font-medium text-onSurface">free shipping</span> on <span className = "font-medium text-onSurface">every order.</span></p>
                                <Link href = "/signup">
                                  <Button text = 'Join now' CSS = "text-xs transition bg-secondaryVariant hover:bg-secondary text-onSecondary py-1 w-max px-4 mt-2"/>
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* BOTTOM INFORMATION */}
                <div className = "flex flex-col justify-start w-full px-4 pt-6 pb-12 overflow-hidden border-b items-bottom border-onPrimary/15 bg-surface">
                  {/* If user is logged in do not display the slider as they get free shipping. */}
                  {currentUser ? 
                    <></>
                  :
                    <>
                      {/* <div className = "relative left-0 right-0 w-full pb-7">
                        <p className = "w-full pb-1 text-sm text-center text-neutral-500">
                          {cartData?.cost.subtotalAmount.amount >= 75 ? 
                            `Qualified for free shipping.`
                          :
                          <>
                            You are <b>{formatNumber(75 - cartData?.cost.subtotalAmount.amount,cartData?.cost.subtotalAmount.currencyCode,locale)}</b> away from <b>free shipping.</b>
                          </>
                          }
                        </p>
                        <div className = "absolute w-full h-2 overflow-hidden transition-all duration-500 rounded-full bg-neutral-400">
                          {cartData?.cost.subtotalAmount.amount >= 75 ? 
                          <div style = {{width:"100%"}} className = "absolute h-2 overflow-hidden rounded-full bg-primaryVariant"/>
                          :
                          <div style = {{width:progressWidth+ "%"}} className = "absolute h-2 overflow-hidden transition duration-500 rounded-full bg-primaryVariant"/>
                          }
                        </div>
                      </div> */}
                    </>
                  }

                  {/* Subtotal information */}
                  <div className = "w-full pb-2 bg">
                    <p className = "flex items-center justify-between">
                      <span className = "text-lg font-medium">Subtotal</span>
                      <span className = "text-lg font-medium">{formatNumber(cartData?.cost.subtotalAmount.amount,cartData?.cost.subtotalAmount.currencyCode,locale)}</span>
                    </p>
                  </div>
                  <div className = "flex flex-col items-center justify-center pb-8">
                    <Link href = {cartData?.checkoutUrl || ''}>
                      <Button 
                        text = {`Checkout (${totalItems} items)`} 
                        className = "w-full checkout-button bg-secondaryVariant hover:bg-secondary"
                        tag={'checkout-button'}
                      />
                    </Link>
                    {!currentUser && 
                      <span className = "mt-2 text-xs text-neutral-400">Free shipping on orders over $75.</span>
                    }  
                  </div>
                </div>
              </>
              }
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

function GetItByComponent({data}){
  const [day,setDay] = useState(0)
  const [hour,setHour] = useState(0)
  const [minute,setMinute] = useState(0)
  const [second,setSecond] = useState(0)
  const dates = data?.product?.deliveryBusinessDays?.value ? JSON.parse(data?.product?.deliveryBusinessDays?.value) : null

  
  // Time variables
  const today = new Date().getTime()
  const orderWithinDate = data?.orderWithin?.value ? new Date(JSON.parse(data.orderWithin.value)).getTime() : null 
  const gap = orderWithinDate ? orderWithinDate - today : 0 
  useEffect(()=>{
    const interval = setInterval(()=>{
      const today = new Date().getTime()
      const orderWithinDate = data?.orderWithin?.value ? new Date(JSON.parse(data.orderWithin.value)).getTime() : null 
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
    return deliveredDate(dates ? dates[0]?.orderWithin.min : 5, dates ? dates[0]?.orderWithin.max : 10)
  },[])
  return(
  <>
      {day <= 0 && hour <= 0 && minute <= 0 && second <= 0 ? 
        <p className = "mt-2 text-xs text-onBackground/70">Get it
          <span className = "font-medium text-onBackground/70">{` ${minMonth.slice(0,3)} ${minDays} - ${maxMonth.slice(0,3)} ${maxDays}`}</span>
        </p>
      :
      <>
        <p className = "mt-2 text-xs text-onBackground/70">Get it 
          <span className = "font-medium">{` ${orderWithinDates.minMonth.slice(0,3)} ${orderWithinDates.minDays} - ${orderWithinDates.maxMonth.slice(0,3)} ${orderWithinDates.maxDays}`}</span>
        </p>
      </>
      }
  </>
  )
}