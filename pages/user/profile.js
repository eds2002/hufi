import { ArrowRightOnRectangleIcon, Bars3Icon, Cog6ToothIcon, CubeIcon, MagnifyingGlassIcon, MinusIcon, PlusIcon, ShoppingCartIcon, TrashIcon, UserCircleIcon, UserIcon, XMarkIcon,ChatBubbleBottomCenterIcon, ChevronDownIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'
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
import { storefront } from '../../utils/storefront'
import { updateCustomer } from '../../graphql/mutations/customer/updateCustomer'

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
            <div className = "flex max-w-lg gap-24 pb-12 mt-12">
              <div className = "flex flex-col items-center justify-center w-auto min-w-min ">
                <UserCircleIcon className = {`w-16 h-16 p-3 transition cursor-pointer rounded-xl ${tab == 'tab=profile' ? 'bg-primary text-onPrimary/50': 'bg-onSecondary/5 text-onSecondary hover:bg-primary/25'}`} onClick = {()=>linkChange('profile')}/>
                <p className = "mt-3 text-sm text-onSecondary xl:text-base">Profile</p>
              </div>
              <div className = "flex flex-col items-center justify-center w-auto min-w-min">
              <CubeIcon className = {`w-16 h-16 p-3 transition cursor-pointer rounded-xl ${tab == 'tab=orders' ? 'bg-primary text-onPrimary/50': 'bg-onSecondary/5 text-onSecondary hover:bg-primary/25'}`} onClick = {()=>linkChange('orders')}/>
                <p className = "mt-3 text-sm text-onSecondary xl:text-base">Orders</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {tab === "tab=profile" && (
        <ProfileTab currentUser = {currentUser} accessToken = {pageProps?.userAccess}/>
      )}
      {tab === 'tab=orders' && (
        <OrdersTab currentUser={currentUser}/>
      )}
    </Layout>
    </>
  )
}



const ProfileTab = ({currentUser,accessToken}) =>{
  const [checked,setChecked] = useState(currentUser?.acceptsMarketing)
  const [values, setValues] = useState({})
  const [confirmModal,setConfirmModal] = useState(false)
  const [savingMessage,setSavingMessage] = useState('Save')
  const {setCurrentUser} = useContext(UserContext)


  const onChange =  (e) =>{
    setValues({...values, [e.target.name]: e.target.value})
  }

  const handleFormValidation = async () =>{
    if(Object.keys(values).length === 0) return
    if(values.firstName === currentUser?.firstName || values.firstName === "") return
    if(values?.lastName === currentUser?.lastName || values?.lastName === "") return
    if(values?.email === currentUser?.email || values?.email === "") return

    setSavingMessage('Saving...')
    const {data,errors} = await storefront(updateCustomer,{
      customer:{
        acceptsMarketing:checked, 
        email: values?.email ?? currentUser.email, 
        firstName: values?.firstName ?? currentUser.firstName, 
        lastName: values.lastName ?? currentUser.lastName 
      },
      customerAccessToken: accessToken,
    })

    if(data.customerUpdate.customerUserErrors.length === 0){
      setSavingMessage('Saved')
      const userRef = currentUser
      userRef.firstName = values.firstName ?? currentUser?.firstName
      userRef.lastName = values.lastName ?? currentUser?.lastName
      userRef.email = values.email ?? currentUser?.email
      setValues({})
    }else{
      setSavingMessage('Save')
    }
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
            <Input 
              name = "firstName" 
              type = 'text' 
              placeHolder = {currentUser?.firstName} 
              onChange = {onChange}
              value = {values?.firstName ?? ''}
              error = {values.firstName === currentUser?.firstName ? true : values.firstName === "" ? true : false}
            />
          </div>
          <div className = "w-full">
            <p className = "mb-0 font-medium text-onBackground/60">Last name</p>
            <Input 
              type = 'text' 
              name = "lastName" 
              placeHolder = {currentUser?.lastName} 
              onChange = {onChange}
              value = {values?.lastName ?? ''}
              error = {values.lastName === currentUser?.lastName ? true : values.lastName === "" ? true : false}
            />
          </div>
        </div>
        <div>
          <p className = "mb-0 font-medium text-onBackground/60">Email</p>
          <Input 
            name = "email" 
            type = 'email' 
            placeHolder = {currentUser?.email} 
            onChange = {onChange}
            value = {values?.email ?? ''}
            error = {values.email === currentUser?.email ? true : values.email === "" ? true : false}
          />
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
        <div className = "flex items-center justify-start mt-10 gap-x-4">
          <Button 
            text = {savingMessage} 
            onClick = {()=>handleFormValidation(true)} 
            CSS = "px-6 py-2 w-max bg-secondaryVariant hover:bg-secondary text-onSecondary"
          />
          <p 
            className = "text-xs cursor-pointer sm:text-sm"
            onClick = {()=>setConfirmModal(true)}
          >Request account deletion</p>
        </div>
      </div>
    </div>
    <DeleteAccountModal 
      confirmModal={confirmModal}
      setConfirmModal={setConfirmModal}
    />
  </section>
  )
}

function DeleteAccountModal({confirmModal,setConfirmModal}){
  const handleDeleteAccount = () =>{ 
    // handle deleting account
    // Send email to support@hufistore.com to request accoutn deletion
    setConfirmModal(false)
  }
  return(
    <Transition appear show={confirmModal} as={Fragment}>
        <Dialog as="div" className="relative z-[999999999999999999]" onClose={()=>setConfirmModal(false)}>
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
  )
}































const OrdersTab = ({currentUser})=>{
  const {locale} = useContext(LocaleContext)
  const [viewOrder,setViewOrder] = useState(null)

  useEffect(()=>{
    window.scrollTo({top:0})
  },[viewOrder])


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
              <OrderDetails order = {viewOrder} setViewOrder = {setViewOrder}/>
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

function OrderDetails({order,setViewOrder}){
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
      <div 
        className = "flex items-center cursor-pointer gap-x-3 mb-7 text-onBackground/50"
        onClick={()=>setViewOrder(false)}
      
      >
        <ChevronLeftIcon className = "w-5 h-5"/>
        <p>Back to all orders</p>
      </div>
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
                <a target={"_blank"}><Button text = 'Track Shipment' CSS = 'bg-secondaryVariant text-onSecondary py-4 ' /></a>
              </Link>
            )}
            <Link href = {order.statusUrl}>
              <a target={"_blank"}><Button text = 'View Order Status' CSS = 'text-onBackground border-secondaryVariant/30 mt-3 border py-4 ' /></a>
            </Link>
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
        <div className = "relative w-32 h-32 overflow-hidden bg-gray-200 rounded-md cursor-pointer sm:h-40 sm:w-40 lg:h-60 lg:w-60">
          <Link href = {`/product/${slugify(product?.variant?.product?.title)}`}>
            <Image src = {product.variant.image.url} layout = 'fill'/>
          </Link>
        </div>
        <div>
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



export { default as getServerSideProps } from '../../utils/getServerSideProps'
