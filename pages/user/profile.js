import { ArrowRightOnRectangleIcon, Bars3Icon, Cog6ToothIcon, CubeIcon, MagnifyingGlassIcon, MinusIcon, PlusIcon, ShoppingCartIcon, TrashIcon, UserCircleIcon, UserIcon, XMarkIcon,ChatBubbleBottomCenterIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { useEffect,useState,Fragment } from 'react'
import { useContext } from "react"
import UserContext from "../../context/userContext"
import Router from 'next/router'
import Layout from '../../components/global/Layout'
import { Button, Input } from '../../components/elements'
import { Dialog,Transition } from '@headlessui/react'
import Image from 'next/image'
import { slugify } from '../../utils/slugify'
import Link from 'next/link'
import { formatNumber } from '../../utils/formatNumber'
import LocaleContext from '../../context/localeContext'
import { useMemo } from 'react'
import Head from 'next/head'
import CartContext from '../../context/cartContext'
import {addToShopifyCart} from '../../utils/addToShopifyCart'

export default function Profile({pageProps}){
  const {currentUser,setCurrentUser} = useContext(UserContext)
  setCurrentUser(pageProps.userData.customer)
  const [tab,setTab] = useState()
  useEffect(()=>{
    const pathName = window.location.search.split('?')[1]
    setTab(pathName)
  })
  const linkChange = (name) =>{
    Router.push({
      pathname:'profile',
      query:{tab:encodeURI(name)}
    })
    setTab(`tab=${name}`)
  }

  return (
    <>
    <Head>
      <title>Hufi - Settings</title>
    </Head>
    <Layout {...pageProps}>
      <section>
        <div className = "w-full h-full px-4 pt-24 mx-auto bg-secondaryVariant">
          <div className = "px-4 mx-auto max-w-7xl ">
            <h3 className = "max-w-md text-3xl font-medium text-onSecondary">Hi {currentUser?.firstName}, how can we help you today?</h3>
            {/* <h1 className = "text-3xl font-medium text-onSecondary mt-7">Settings</h1> */}
            <div className = "flex justify-between max-w-lg pb-12 mt-12">
              <div className = "flex flex-col items-center justify-center w-auto min-w-min ">
                <UserCircleIcon className = {`w-16 h-16 p-3 transition cursor-pointer rounded-xl ${tab == 'tab=profile' ? 'bg-primary text-onPrimary/50': 'bg-onSecondary/5 text-onSecondary hover:bg-primary/25'}`} onClick = {()=>linkChange('profile')}/>
                <p className = "mt-3 text-sm text-onSecondary xl:text-base">Profile</p>
              </div>
              <div className = "flex flex-col items-center justify-center w-auto min-w-min">
              <CubeIcon className = {`w-16 h-16 p-3 transition cursor-pointer rounded-xl ${tab == 'tab=orders' ? 'bg-primary text-onPrimary/50': 'bg-onSecondary/5 text-onSecondary hover:bg-primary/25'}`} onClick = {()=>linkChange('orders')}/>
                <p className = "mt-3 text-sm text-onSecondary xl:text-base">Orders</p>
              </div>
              <div className = "flex flex-col items-center justify-center w-auto min-w-min">
              <ChatBubbleBottomCenterIcon className = {`w-16 h-16 p-3 transition cursor-pointer rounded-xl ${tab == 'tab=support' ? 'bg-primary text-onPrimary/50': 'bg-onSecondary/5 text-onSecondary hover:bg-primary/25'}`} onClick = {()=>linkChange('support')}/>
                <p className = "mt-3 text-sm text-onSecondary xl:text-base">Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {tab === "tab=profile" && (
        <ProfileTab currentUser = {currentUser} />
      )}
      {tab === 'tab=orders' && (
        <OrdersTab currentUser={currentUser}/>
      )}
      {tab === 'tab=support' && (
        <SupportTab currentUser={currentUser}/>
      )}
    </Layout>
    </>
  )
}

const SupportTab = ({currentUser}) =>{
  return(
    <section className = "py-24">
    <div className = "flex flex-col gap-6 px-4 mx-auto max-w-7xl md:flex-row">
      <div className = "flex flex-col items-start justify-center flex-1">
      <h1 className = "text-lg font-medium xl:text-lg text-onBackground">Support</h1>
        <p className = "max-w-sm mt-7 text-onBackground/60">We are here to help, whether it&apos;s a specific product or technical issue, we&apos;ll get back to you asap.</p>
      </div>
    </div>
    {currentUser?.orders?.nodes?.length == 0 ?
      <div className = "h-[50vh]">
        <div className = "flex flex-col items-center justify-center h-full px-4 mx-auto text-center max-w-7xl">
          <h1 className = "text-3xl font-medium text-center">Our support team is top notch.</h1>
          <p className = "mt-2 text-onBackground/60">I wouldn&apos;t worry about shopping.<br/></p>
          <Link href = "/">
            <div className = "w-full max-w-md mt-7">
              <Button text = 'Start shopping'/>
            </div>
          </Link>
        </div>
      </div>
    :
    <div className = "px-4 py-12 mx-auto max-w-7xl">
      <h3 className = "text-3xl font-medium">Which product did you have an issue with?</h3>
      <div className="w-full py-16 mx-auto overflow-scroll scrollBar">
        <div className = "grid grid-flow-col auto-cols-[70%] sm:auto-cols-[40%] md:auto-cols-[35%] lg:auto-cols-[25%] snap-mandatory snap-x gap-10">
          {currentUser?.orders?.nodes.map((order)=>(
            <ProductListBox order = {order} currentUser = {currentUser} key = {order.orderNumber}/>
          ))}
        </div>
      </div>
    </div>
    }
  </section>
  )
}

function ProductListBox({order, currentUser}){
  const complaint = [
    { id: 1, name: 'Durward Reynolds', unavailable: false },
    { id: 2, name: 'Kenton Towne', unavailable: false },
    { id: 3, name: 'Therese Wunsch', unavailable: false },
    { id: 4, name: 'Benedict Kessler', unavailable: true },
    { id: 5, name: 'Katelyn Rohan', unavailable: false },
  ]
  
  const [selectedComplaint, setSelectedComplaint] = useState(complaint[0])
  const formatDate = (userDate,monthAdd) =>{
    const num = monthAdd ?? 0

    const removeTime = new Date (new Date(userDate).toDateString())
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const month = new Date(removeTime).getMonth()
    const day = new Date(removeTime).getDate()
    const year = new Date(removeTime).getFullYear()
    return {
      month:months[month + num],
      day:day,
      year:year,
    }
  }

  const didRefundEnd = (month,day,year) =>{
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const monthIndex = months.findIndex(val => val === month)
    const date = new Date(year,monthIndex,day)
    const today = new Date()

    return today > date ? true : false
  }

  return(
    <>
      {order.lineItems.nodes.map((product)=>(
        <>
          <div className = "flex flex-col w-full h-full p-4 rounded-md bg-surface aspect-square">
            <h3 className = "flex items-center justify-between mb-3 W-full">
              <span className = "flex flex-col items-start justify-center">
                <span className = "font-medium">Purchased</span>
                <span>{formatDate(order.processedAt).month} {formatDate(order.processedAt).day}, {formatDate(order.processedAt).year}</span>
              </span>
              <span className = "flex flex-col items-start justify-center">
                <span className = "font-medium">Order Num</span>
                <span>#{order.orderNumber}</span>
              </span>
            </h3>
            <div className = "relative w-full h-full overflow-hidden rounded-md aspect-square">
              <Image src = {product.variant.image.url} layout = 'fill'/>
            </div>
            <div className = "py-4">
              <p className = "flex flex-col items-start justify-center">
                <span className = {`font-medium 
                  ${didRefundEnd(formatDate(order.processedAt,1).month,formatDate(order.processedAt).day,formatDate(order.processedAt).year ) ? 'text-tertiaryVariant' : 'text-primaryVariant'}`
                }>
                {didRefundEnd(formatDate(order.processedAt,1).month,formatDate(order.processedAt).day,formatDate(order.processedAt).year ) ?
                  "Refund period ended: "
                :
                  "Refund available by: "
                }
                
                </span>

                <span>{formatDate(order.processedAt,1).month} {formatDate(order.processedAt).day}, {formatDate(order.processedAt).year}</span>
              </p>
              <div>
                <div className = "flex flex-col items-center w-full gap-2 mt-7">
                  <div className = "flex-1 w-full">
                    <Link href = "/support">
                      <Button text = 'Contact support'/>
                    </Link>
                  </div>
                  {didRefundEnd(formatDate(order.processedAt,1).month,formatDate(order.processedAt).day,formatDate(order.processedAt).year ) ?
                    ''
                  :
                  <Link href = {`/support/refunds?orderNumber=${order.orderNumber}&email=${currentUser.email}&productName=${product?.variant?.product.title}&variantTitle=${product.variant.title}`}>
                      <a className=  "text-xs">or request refund</a>
                  </Link>
                  }
                </div>
              </div>
            </div>
          </div>
        </>
      ))}
    </>
  )
}

const ProfileTab = ({currentUser}) =>{
  const [checked,setChecked] = useState(currentUser?.acceptsMarketing)
  const [values, setValues] = useState({})
  const [confirmModal,setConfirmModal] = useState(false)


  const onChange =  (e) =>{
    setValues({...values, [e.target.name]: e.target.value})
  }
  const handleDeleteAccount = () =>{ 
    // handle deleting account
    // Send email to support@hufistore.com to request accoutn deletion
    setConfirmModal(false)
  }
  return(
    <section className = "py-24">
   <div className = "flex flex-col gap-6 px-4 mx-auto max-w-7xl md:flex-row">
      <div className = "flex flex-col items-start justify-center flex-1">
        <h1 className = "text-lg font-medium xl:text-lg text-onBackground">Profile</h1>
        <p className = "max-w-sm mt-7 text-onBackground/60">View your current account details associated with Hufi. You may update your details, or request for your account deletion on this page.</p>
      </div>
      <div className = "flex-1 rounded-md md:p-12 mt-7 md:mt-0 ">
        <div className = "flex flex-col items-center justify-between w-full md:gap-6 md:flex-row">
          <div className = "w-full">
            <p className = "mb-0 font-medium text-onBackground/60">First name</p>
            <Input type = 'text' placeHolder = {currentUser?.firstName} onChange = {onChange} />
          </div>
          <div className = "w-full">
            <p className = "mb-0 font-medium text-onBackground/60">Last name</p>
            <Input type = 'text' placeHolder = {currentUser?.lastName} onChange = {onChange}/>
          </div>
        </div>
        <div>
          <p className = "mb-0 font-medium text-onBackground/60">Email</p>
          <Input type = 'text' placeHolder = {currentUser?.email} onChange = {onChange}/>
        </div>
        <div className="flex items-center justify-start">
            <label class="inline-flex relative items-center mr-5 cursor-pointer">
                <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={checked}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary" onClick={()=>setChecked(!checked)}/>
            </label>
            <p className = "max-w-sm text-sm">Receive news on new upcoming projects, and occasional discounts?</p>
        </div>
        <div className = "mt-10">
          <Button text = 'Request account deletion.' onClick = {()=>setConfirmModal(!confirmModal)}/>
        </div>
      </div>
    </div>
    <Transition appear show={confirmModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={()=>setConfirmModal(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <div className = "absolute top-0 right-0 z-20 pt-6 pr-6" onClick = {()=>setConfirmModal(false)}>
                    <XMarkIcon className = "flex items-center justify-center transition-all border rounded-full cursor-pointer w-7 h-7 aspect-square hover:border-black border-black/10"/>
                  </div>
                  <h3
                    className="text-3xl font-medium leading-tight text-gray-900"
                  >
                    You are about to lose your benefits.
                  </h3>
                  <div className="mt-2">
                    <p className="mb-4 text-base text-onBackground/50">
                      We&apos;re sad to see you go. Deleting your account will result in us deleting all of your personal information.
                    </p>
                    <p className = "mb-4 text-base text-onBackground/50"> You will also lose your Hufi Rewards benefits which includes:</p>
                    <li className = "text-base text-onBackground/50">Occasional discounts up to 30% off.</li>
                    <li className = "text-base text-onBackground/50">News on the latest upcoming projects.</li>
                    <li className = "text-base text-onBackground/50">Alerts for new trending products.</li>
                  </div>

                  <div className="mt-7">
                    <Button text = 'Delete my account anyways' onClick = {()=>handleDeleteAccount()}/>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  </section>
  )
}

const OrdersTab = ({currentUser})=>{
  const {locale} = useContext(LocaleContext)
  const [viewOrder,setViewOrder] = useState(null)


  // Todo, story expensive function into system
  // Filter out orders by the month and year.
  const dates = useMemo(()=>{
    return getOrderDates(currentUser)
  },[currentUser]) 

  function getOrderDates(currentUser){
    const dateArr = []
    currentUser?.orders?.nodes?.forEach((order)=>{
      if(dateArr.some(obj => obj.month == new Date (new Date(order?.processedAt).toDateString()).getMonth())) return
      dateArr.push({
        month:new Date (new Date(order?.processedAt).toDateString()).getMonth(),
        year:new Date (new Date(order?.processedAt).toDateString()).getFullYear(),
      })
    })
    return dateArr
  }

  const getMonth = (dateNum) => {
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    return months[dateNum]
  }



  

  return(
    <section className = "py-24">
      <div className = "px-4 mx-auto max-w-7xl">
        <div className = "flex flex-col items-start justify-center">
          <h1 className = "text-lg font-medium xl:text-lg text-onBackground">Orders</h1>
          <p className = "max-w-sm mt-7 text-onBackground/60">View all orders you have made with us. </p>
        </div>
      </div>
      {currentUser?.orders?.nodes?.length == 0 ?
        <div className = "h-[50vh]">
          <div className = "flex flex-col items-center justify-center h-full px-4 mx-auto text-center max-w-7xl">
            <h1 className = "text-3xl font-medium text-center">It&apos;s lonesome in here.</h1>
            <p className = "mt-2 text-onBackground/60">Did you know we are always selling unique products?<br/></p>
            <Link href = "/">
              <div className = "w-full max-w-md mt-7">
                <Button text = 'Start shopping'/>
              </div>
            </Link>
          </div>
        </div>
      :
        <div className = "grid grid-cols-1 gap-6 px-4 pt-10 mx-auto max-w-7xl">
          {viewOrder ? 
            <div className = "divide-y divide-onBackground/20">  
              <OrderDetails order = {viewOrder}/>
            </div>
          :
          <>
            {currentUser?.orders?.nodes.map((order,index)=>(
              <div className = "divide-y divide-onBackground/20" key = {index}>  
                {order?.lineItems?.nodes?.map((product,index)=>(
                  <OrderProduct product = {product} order = {order} setViewOrder = {setViewOrder} key = {index}/>
                ))}
              </div>
            ))}
          </>
          }
        </div>
      }
    </section>
  )
}

function OrderDetails({order}){
  const {locale} = useContext(LocaleContext)
  const formatDate = (userDate,monthAdd) =>{
    const num = monthAdd ?? 0

    const removeTime = new Date (new Date(userDate).toDateString())
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const month = new Date(removeTime).getMonth()
    const day = new Date(removeTime).getDate()
    const year = new Date(removeTime).getFullYear()
    return {
      month:months[month + num],
      day:day,
      year:year,
    }
  }
  return(
    <div className = "max-w-7xl">
      <div className = "pb-2 border-b-2 text-onBackground/50">
        <p>Purchased Online - {formatDate(order.processedAt).month} {formatDate(order.processedAt).day}, {formatDate(order.processedAt).year}</p>
        <p>#{order.orderNumber} - {formatNumber(order.totalPriceV2.amount,order.totalPriceV2.currencyCode,locale)}</p>
      </div>

      {/* ORDER OVERVIEW */}
      <div className = "lg:flex lg:justify-between gap-x-32">
        <div className = "flex-1">
          <div className=  "py-4">
            <div className = "p-4 rounded-md bg-surface">
              <p className = "text-sm font-medium">Returns & Replacements.</p>
              <p className = "mt-2 text-sm text-onSurface/50">Was something wrong with your order? Email us at <b>support@hufistore.com</b> to request a refund or replacement.</p>
            </div>
          </div>
          <p className = "text-base font-medium text-onBackground/50">Delivered Mon, Feb 28</p>
          <div>
            <div className = "mb-7">
            {order.lineItems.nodes.map((product,index)=>(
              <div className = "py-4" key = {product.variant.product.title}>
                <p className = "mb-1 text-sm text-onBackground/50">Shipment {index + 1} of {order.lineItems.nodes.length} </p>
                <div className = "flex w-full h-full gap-x-3">
                  <div className = "relative w-32 h-32 bg-gray-200 cursor-pointer">
                    <Link href = {`/product/${slugify(product.variant.product.title)}`}>
                      <Image src = {product.variant.image.url} layout = 'fill'/>
                    </Link>
                  </div>
                  <div>
                    <p className = "font-medium">{product.variant.product.title}</p>
                    <p>{formatNumber(product.variant.product.priceRange.maxVariantPrice.amount,product.variant.product.priceRange.maxVariantPrice.currencyCode,locale)}</p>
                    <div className = "text-sm text-onBackground/50">
                      <p>{product.variant.product.productType}</p>
                      {product.variant.title.split("/").map((val)=>(
                        <p key = {val}>{val}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            </div>
            {order.successfulFulfillments.length != 0 && (
              <Link href = {`https://t.17track.net/en#nums=${order?.successfulFulfillments[0]?.trackingInfo[0]?.number}`}>
                <Button text = 'Track Shipment' CSS = 'bg-secondaryVariant text-onSecondary py-4 ' />
              </Link>
            )}
          </div>
        </div>

        {/* ORDER DETAILS */}
        <div className = "w-full lg:max-w-xs">
          <div className='py-6 mt-12 border-y-2'>
            <div className = "flex">
              <p className = "flex-1 font-medium">Address</p>
              <div className='text-sm text-onBackground/50'>
                <p>
                  <span>{order?.shippingAddress.firstName}</span>
                  {' '}
                  <span>{order?.shippingAddress.lastName}</span>
                </p>
                <p>{order?.shippingAddress.address1}</p>
                <p>{order?.shippingAddress.address2}</p>
                <p>
                  <span>{order?.shippingAddress.city}, </span>
                  <span>{order?.shippingAddress?.province} </span>
                  <span>{order?.shippingAddress?.zip}</span>
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>
          </div>
          <div className='py-6 border-b-2'>
            <div className = "">
              <p className = "font-medium">Summary</p>
              <div className = "mt-6">
                  <p className = "flex items-center justify-between text-onSurface/50">
                    <span>Subtotal</span> 
                    <span>{formatNumber(order?.subtotalPriceV2?.amount,order.subtotalPriceV2.currencyCode,locale)}</span>
                  </p>
                  <p className = "flex items-center justify-between text-onSurface/50">
                    <span>Shipping</span>
                    <span>{formatNumber(order.totalShippingPriceV2.amount,order.totalShippingPriceV2.currencyCode,locale)}</span>
                  </p>
                  {order.shippingDiscountAllocations.length != 0 && (
                    <p className = "flex items-center justify-between text-onSurface/50">
                      <span>Shipping Discount:</span>
                      <span>{formatNumber(order.shippingDiscountAllocations[0].allocatedAmount.amount * -1,order.shippingDiscountAllocations[0].allocatedAmount.currencyCode,locale)}</span>
                    </p>
                  )}
                  <h3 className = "flex justify-between mt-4">
                    <span className = "text-lg font-medium">Total</span>
                    <span className = "text-lg font-medium text-onSurface">{formatNumber(order.totalPriceV2.amount,order.totalPriceV2.currencyCode,locale)}</span>
                  </h3>
                </div>
            </div>
          </div>
          <div className = "py-6">
            <h1 className = "mb-4 text-lg font-medium">Need help?</h1>
            <div className = "flex flex-col font-medium gap-y-1 text-onBackground/50">
              <Link href = "/support?shipping-options">
                <a>Shipping</a>
              </Link>
              <Link href = "/support?warranty">
                <a>Warranty</a>
              </Link>
              <Link href = "/support?request-refund">
                <a>Request Refund</a>
              </Link>
              <Link href = "/support?request-refund">
                <a>Return Policy</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function OrderProduct({product,order,setViewOrder}){
  return(
    <div className = "pt-12 pb-12 sm:flex sm:justify-between">
      <div className = "flex gap-x-3">
        <div className = "relative w-32 h-32 bg-gray-200 sm:h-40 sm:w-40 lg:h-60 lg:w-60">
          <Link href = {product?.variant?.product?.title}>
            <Image src = {product.variant.image.url} layout = 'fill'/>
          </Link>
        </div>
        <div>
          <span className = "text-sm text-onBackground/70 md:text-base lg:text-lg">{order.successfulFulfillments.length === 0 ? 'Processing' : 'On the way'}</span>
          <p className = "mt-3 font-medium">{product?.variant?.product?.title}</p>
          <div className = "mt-3 text-sm text-onBackground/70">
            <p>{product.variant.product.productType}</p>
            {product.variant.title.split("/").map((val)=>(
              <p key = {val}>{val}</p>
            ))}
          </div>
        </div>
      </div>
      <div className = "flex flex-col gap-2 mt-5">
        <Link href = {`/product/${slugify(product?.variant?.product?.title)}`}>
          <Button text = 'Buy it again' CSS = 'bg-secondaryVariant text-onbackground py-3 text-onSecondary sm:px-4 sm:py-2'/>
        </Link>
        <Button text = 'View This Order' CSS = 'bg-background text-onBackground border py-3 border-onBackground/30 sm:px-4 sm:py-2' onClick = {()=>setViewOrder(order)}/>
        <Button text = 'Shop Similar' CSS = 'bg-background text-onBackground border py-3 border-onBackground/30 sm:px-4 sm:py-2'/>
      </div>
    </div>
  )
}

function OrderInformation({order}){
  const {locale} = useContext(LocaleContext)
  const {cartData,setOpenCart,setCartData} = useContext(CartContext)
  const {currentUser} = useContext(UserContext)
  const [expand,setExpand] = useState(false)
  const [expandShipping,setExpandShipping] = useState(false)

  const formatDate = (userDate,monthAdd) =>{
    const num = monthAdd ?? 0

    const removeTime = new Date (new Date(userDate).toDateString())
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const month = new Date(removeTime).getMonth()
    const day = new Date(removeTime).getDate()
    const year = new Date(removeTime).getFullYear()
    return {
      month:months[month + num],
      day:day,
      year:year,
    }
  }

  const didRefundEnd = (month,day,year) =>{
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const monthIndex = months.findIndex(val => val === month)
    const date = new Date(year,monthIndex,day)
    const today = new Date()

    return today > date ? true : false
  }

  const handleAddToCart = async (variant) => {
    const responseCartData = await addToShopifyCart(cartData,variant)
    setCartData(responseCartData)
    setOpenCart(true)
  }
  
  return(
    <>
      <div className = "w-full mx-auto mb-10">
        {/* <p className = "md:hidden"> <span className = "mb-1 text-lg font-medium">{formatDate(order.processedAt).month} {formatDate(order.processedAt).day}</span></p> */}
        <div className = "py-4 rounded-md md:pb-0 md:pt-4 ">
          <div className = " md:flex md:justify-between md:items-start">
            <p className = "hidden text-onSurface/50 md:flex md:flex-col md:justify-center md:items-start ">
              <span className = "mb-2 font-medium text-onSurface ">Order Date:</span> 
              <span className = "text-sm font-medium lg:text-base">{formatDate(order.processedAt).month} {formatDate(order.processedAt).day}, {formatDate(order.processedAt).year}</span>
            </p>
            <div className = "hidden md:block">
              <p className = "hidden gap-6 mb-2 text-onSurface/50 md:flex md:flex-row md:justify-between md:items-start ">
                <span className = "font-medium text-onSurface">Order Total</span>
                <span className = "font-medium text-onSurface">{formatNumber(order?.totalPriceV2?.amount,order.totalPriceV2.currencyCode,locale)}</span>
              </p>
              <p className = "flex items-center justify-between gap-6 text-sm text-onSurface/50 lg:text-base">
                <span>Subtotal:</span> 
                <span>{formatNumber(order?.subtotalPriceV2?.amount,order.subtotalPriceV2.currencyCode,locale)}</span>
              </p>
              <p className = "flex items-center justify-between gap-6 text-sm text-onSurface/50 lg:text-base">
                <span>Shipping & Handling:</span>
                <span>{formatNumber(order.totalShippingPriceV2.amount,order.totalShippingPriceV2.currencyCode,locale)}</span>
              </p>
              {order.shippingDiscountAllocations.length != 0 && (
                <p className = "flex items-center justify-between gap-6 text-sm text-onSurface/50 lg:text-base">
                  <span>Shipping Discount:</span>
                  <span>{formatNumber(order.shippingDiscountAllocations[0].allocatedAmount.amount * -1,order.shippingDiscountAllocations[0].allocatedAmount.currencyCode,locale)}</span>
                </p>
              )}
              <p className = "flex items-center justify-between gap-6 text-sm text-onSurface/50 lg:text-base">
                <span>Tax:</span>
                <span>{formatNumber(order.totalTaxV2.amount,order.totalTaxV2.currencyCode,locale)}</span>
              </p>
            </div>
            <p className = "hidden text-onSurface/50 md:flex md:flex-col md:justify-center md:items-start">
              <span className = "mb-2 font-medium text-onSurface">Shipped to:</span>
              <p className = "text-sm md:text-base">
                <span>{order?.shippingAddress.firstName}</span>
                {' '}
                <span>{order?.shippingAddress.lastName}</span>
              </p>
              <span className = "text-sm lg:text-base">{order?.shippingAddress.address1}</span>
              <span className = "text-sm lg:text-base">{order?.shippingAddress.address2}</span>
              <span className = "text-sm lg:text-base">
                <span >{order?.shippingAddress.city}, </span>
                <span>{order?.shippingAddress?.province} </span>
              </span>
            </p>
            <p className = "text-onSurface/50 md:flex md:flex-col md:justify-center md:items-start">
              <span className ="mb-2 font-medium text-onSurface">Order #:</span> 
              <span className = "text-sm font-medium lg:text-base">{order.orderNumber}</span>
            </p>
            <div className = "pt-6 md:pt-0">
              {order?.successfulFulfillments[0]?.trackingInfo[0] ?
                <Link href = {`https://t.17track.net/en#nums=${order?.successfulFulfillments[0]?.trackingInfo[0]?.number}`}>
                  <a target="_blank"><Button text = 'Track order' CSS = 'px-4 bg-secondaryVariant hover:bg-secondary text-onSecondary py-2'/></a>
                </Link>
                :
                <div className = "hidden md:block">
                  <Button text = 'Track order' CSS = 'bg-transparent text-transparent hover:bg-transparent hover:shadow-none cursor-default'/>
                </div>
              }
            </div>
          </div>
          <h3 className = {`flex items-center justify-between px-4 py-2 text-lg font-medium transition mt-7 md:pt-2 border-b md:border-b-0 md:border-t rounded-md cursor-pointer  border-onSurface/10 hover:bg-primary ${expand && 'bg-primary'}`}
            onClick = {()=>setExpand(!expand)}
          >
            <span>Order Items ({order.lineItems.nodes.length})</span>
            <span className = {`${expand ? 'rotate-180' : 'rotate-0'} transition`}><ChevronDownIcon className = "w-5 h-5"/></span>
          </h3>
          {expand && (
            <div className = "px-4 divide-y">
              {order?.lineItems?.nodes?.map((orderProduct)=>(
                <div className = "h-full md:my-6 md:p-4 md:flex md:gap-6 md:border-onSurface/20" key = {orderProduct?.orderProduct?.variant.product.title}>
                  <div className = "flex items-center justify-start flex-1 w-full h-full gap-6">
                    <Link href = {`/product/${slugify(orderProduct?.variant?.product.title)}`}>
                      <div className = "relative my-6 overflow-hidden rounded-md cursor-pointer w-28 h-28 md:h-36 md:w-36 ">
                        <Image src = {orderProduct?.variant?.image.url} alt={orderProduct?.variant?.image.altText} layout = 'fill'/>
                      </div>
                    </Link>
                    <div className = "flex justify-between flex-1 w-full h-full">
                      <div className = "w-full h-full ">
                        <p className = "text-sm sm:text-base">{orderProduct?.variant?.product.title}</p>
                        <p className = "text-xs md:text-sm text-onSurface/50">{orderProduct?.variant?.title}</p>
                        <p className = "text-xs md:text-sm text-onSurface/50 ">Qty: <span className = "font-medium">{orderProduct?.quantity}</span></p>
                        <p className = "text-xs md:text-sm text-onSurface/50 ">
                          {didRefundEnd(formatDate(order?.processedAt,1).month, formatDate(order.processedAt).day, formatDate(order.processedAt).year) ? 
                          <>
                            <span className = "text-tertiaryVariant">Refundable by:</span> <br/><b>{formatDate(order?.processedAt,1).month} {formatDate(order.processedAt).day}, {formatDate(order.processedAt).year}</b>
                          </>
                          :
                          <>
                            <span className = "">Refundable by:</span> <br/><b>{formatDate(order?.processedAt,1).month} {formatDate(order.processedAt).day}, {formatDate(order.processedAt).year}</b>
                          </>
                          }
                        </p>
                        <p className = "hidden text-sm md:block">{formatNumber(orderProduct?.variant?.product.compareAtPriceRange.maxVariantPrice.amount,orderProduct?.variant?.product.compareAtPriceRange.maxVariantPrice.currencycode,locale)}</p>
                        <div className = "flex items-center mt-2 gap-x-2">
                          <div className = "w-auto">
                            <Button 
                            text = 'Buy again' 
                            CSS = 'text-xs sm:text-sm bg-secondaryVariant hover:bg-secondary text-onSecondary text-sm  w-full py-1 px-3' 
                            onClick = {()=>handleAddToCart(orderProduct.variant.id)}/>
                          </div>
                          {!didRefundEnd(formatDate(order?.processedAt,1).month, formatDate(order.processedAt).day, formatDate(order.processedAt).year) &&
                            <Link href = {`/support/refunds?orderNumber=${order.orderNumber}&productName=${orderProduct?.variant?.product.title}&variantTitle=${orderProduct.variant.title}`}>
                              <span className = "text-xs cursor-pointer hover:text-onSurface/50">or refund</span>
                            </Link>
                          }
                        </div>
                      </div>
                      <div className = "text-sm md:hidden sm:text-base">
                        <p>{formatNumber(orderProduct?.variant?.product.compareAtPriceRange.maxVariantPrice.amount,orderProduct?.variant?.product.compareAtPriceRange.maxVariantPrice.currencycode,locale)}</p>
                      </div>
                    </div>
                  </div>
                  <div className = "flex-col justify-center hidden gap-3 md:flex ">
                    <div className='mt-2'>
                      <Link href = {`/product/${slugify(orderProduct?.variant?.product.title)}?review=true`}>
                        <Button text = 'Write a review' CSS = 'text-sm bg-secondaryVariant text-onSecondary px-4 py-2'/>
                      </Link>
                    </div>
                    <div>
                    <Link href = {`/support/refunds?orderNumber=${order.orderNumber}&productName=${orderProduct?.variant?.product.title}&variantTitle=${orderProduct.variant.title}`}>
                        <Button text = 'Request a refund' CSS = 'text-sm bg-secondaryVariant/30 text-onSecondary  px-4 py-2'/>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}


          <h3 className = {`flex items-center md:hidden justify-between px-4 py-2 text-lg font-medium transition border-b rounded-md cursor-pointer  border-onSurface/10 hover:bg-primary ${expandShipping && 'bg-primary'}`}
            onClick = {()=>setExpandShipping(!expandShipping)}
          >
            <span>Shipping Details</span>
            <span className = {`${expandShipping ? 'rotate-180' : 'rotate-0'} transition`}><ChevronDownIcon className = "w-5 h-5"/></span>
          </h3>
          {expandShipping && (
          <div className = 'w-full p-4 text-sm rounded-md md:hidden'>
            <p>
              <span>{order?.shippingAddress.firstName}</span>
              {' '}
              <span>{order?.shippingAddress.lastName}</span>
            </p>
            <p>{order?.shippingAddress.address1}</p>
            <p>{order?.shippingAddress.address2}</p>
            <p>
              <span>{order?.shippingAddress.city}, </span>
              <span>{order?.shippingAddress?.province} </span>
              <span>{order?.shippingAddress?.zip}</span>
            </p>
            <p>{order.shippingAddress.country}</p>
          </div>
          )}

          <div className = 'px-4 mt-7'>
            <h3 className = "text-lg font-medium md:hidden">Order Summary</h3>
            <div className = "p-4 border rounded-md border-onSurface/20 md:hidden">
              <p className = "flex items-center justify-between text-onSurface/50">
                <span>Subtotal:</span> 
                <span>{formatNumber(order?.subtotalPriceV2?.amount,order.subtotalPriceV2.currencyCode,locale)}</span>
              </p>
              <p className = "flex items-center justify-between text-onSurface/50">
                <span>Shipping & Handling:</span>
                <span>{formatNumber(order.totalShippingPriceV2.amount,order.totalShippingPriceV2.currencyCode,locale)}</span>
              </p>
              {order.shippingDiscountAllocations.length != 0 && (
                <p className = "flex items-center justify-between text-onSurface/50">
                  <span>Shipping Discount:</span>
                  <span>{formatNumber(order.shippingDiscountAllocations[0].allocatedAmount.amount * -1,order.shippingDiscountAllocations[0].allocatedAmount.currencyCode,locale)}</span>
                </p>
              )}
              <p className = "flex items-center justify-between text-onSurface/50">
                <span>Tax:</span>
                <span>{formatNumber(order.totalTaxV2.amount,order.totalTaxV2.currencyCode,locale)}</span>
              </p>
              <h3 className = "flex justify-between mt-4">
                <span className = "text-lg font-medium">Order total</span>
                <span className = "text-lg font-medium text-onSurface">{formatNumber(order.totalPriceV2.amount,order.totalPriceV2.currencyCode,locale)}</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export { default as getServerSideProps } from '../../utils/getServerSideProps'
