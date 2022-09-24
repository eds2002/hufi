import { Fragment, useState,useMemo, useContext} from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { ArrowRightOnRectangleIcon, Bars3Icon, Cog6ToothIcon, CubeIcon, MagnifyingGlassIcon, MinusIcon, PlusIcon, ShoppingCartIcon, TrashIcon, UserCircleIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useScrollDirection } from 'react-use-scroll-direction'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRef } from 'react'
import Image from 'next/image'
import { Button } from '../elements'
import CartContext from '../../context/cartContext'
import LocaleContext from '../../context/localeContext'
import {formatNumber} from '../../utils/formatNumber'
import {removeProduct} from '../../utils/removeProduct'
import { updateCart } from '../../utils/updateCart'
import { slugify } from '../../utils/slugify'
import UserContext from '../../context/userContext'
import { storefront } from '../../utils/storefront'
import { cartBuyerIdentity } from '../../graphql/mutations/cartBuyerIdentity'
import { createCheckout } from '../../graphql/mutations/createCheckout'
import { applyCheckoutDiscount } from '../../graphql/mutations/applyCheckoutDiscount'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



export default function Header({data,user}) {
  const {isScrollingDown,scrollDirection} = useScrollDirection()
  const [open, setOpen] = useState(false)
  const [displayTopNav, setDisplayTopNav] = useState(true)
  const [scrolling,setScrolling] = useState()
  const [scrollPos,setScrollPos] = useState(0)
  const {openCart,setOpenCart,cartData,viewedCart,setViewedCart} = useContext(CartContext)

  const headerRef = useRef()

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPos(position)
  };
  // TODO, get the scroll position
  useEffect(()=>{
    window.addEventListener('scroll',handleScroll)

    return()=>{
      window.removeEventListener('scroll',handleScroll)
    }
  },[])


  useEffect(()=>{
    if(scrollDirection != null){
      setScrolling(scrollDirection)
    }
  },[scrollDirection])

  return (
    <>
      <div className="relative z-40 bg-surface">
        <div className="flex items-center justify-between h-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <p className="absolute left-0 right-0 flex-1 text-sm font-medium text-center text-onPrimary lg:flex-none">
            Free worldwide shipping on orders over $75.
          </p>

          <div className="relative z-10 hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
            <span className="w-px h-6 bg-onPrimary" aria-hidden="true" />
            {user?.customer ? 
              <div className="relative group">
                <p className = "text-sm font-medium cursor-pointer text-onPrimary hover:text-onBackground/70">Hi, {user.customer.firstName}</p>
                <div className = "absolute right-0 z-40 max-w-xl py-4 rounded-lg shadow-xl opacity-0 pointer-events-none bg-surface group-hover:opacity-100 group-hover:pointer-events-auto">
                  <div className="flex flex-col items-start justify-start gap-3 w-44">
                    <Link href = "/profile">
                      <div className = "w-full pl-4 pr-10 rounded-md hover:bg-background">
                        <a className = "flex items-center w-full py-2 text-base font-medium cursor-pointer gap-x-3 text-onBackground">Profile <UserCircleIcon className = "w-5 h-5"/></a>
                      </div>
                    </Link>
                    <Link href = "/profile?tab=orders">
                      <div className = "w-full pl-4 pr-10 rounded-md hover:bg-background">
                        <a className = "flex items-center w-full py-2 text-base font-medium cursor-pointer gap-x-3 text-onBackground">Orders <CubeIcon className = "w-5 h-5"/></a>
                      </div>
                    </Link>
                    <Link href = "/profile?tab=settings">
                      <div className = "w-full pl-4 pr-10 rounded-md hover:bg-background">
                        <a className = "flex items-center w-full py-2 text-base font-medium cursor-pointer gap-x-3 text-onBackground">Settings <Cog6ToothIcon className = "w-5 h-5"/></a>
                      </div>
                    </Link>
                    <Link href = "/api/logout">
                      <div className = "w-full pl-4 pr-10 mt-5 rounded-md hover:bg-background">
                        <a className = "flex items-center w-full py-2 text-base font-medium cursor-pointer gap-x-3 text-onBackground ">Logout <ArrowRightOnRectangleIcon className = "w-5 h-5"/></a>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            :
            <Link href = "/login">
              <a className="text-sm font-medium text-onPrimary hover:text-onBackground/70">
                Sign in
              </a>
            </Link>
            }
          </div>
        </div>
      </div>
      <div className={`sticky top-0 z-30 transition duration-500`} ref = {headerRef}>
        {/* Mobile menu */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
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
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex flex-col w-full max-w-xs pb-12 overflow-y-auto shadow-xl bg-background">
                  <div className="flex px-4 pt-5 pb-2">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center p-2 -m-2 rounded-md text-onBackground"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Links */}
                  <Tab.Group as="div" className="mt-2">
                    <Tab.Panels as={Fragment}>
                      {data?.menu?.items?.map((category, categoryIdx) => (
                        <>
                          {category.items != 0 && (
                          <>
                            <MobileLinks category = {category}/>
                          </>
                          )}
                        </>
                      ))}
                    </Tab.Panels>
                  </Tab.Group>

                  <div className="px-4 py-6 space-y-6 border-t border-onBackground/15">
                    {data?.menu?.items?.map((page) => (
                      <>
                        {page.items.length === 0 && (  
                          <Link href = {`
                          ${page.title == 'About' ? '/company/about-us' : page.title == 'Contact' ? '/support' : ''}
                          `}>
                            <div key={page.title} className="flow-root">
                              <a className = "flex items-center justify-between w-full text-xl font-medium cursor-pointer text-onBackground hover:text-onBackground/70">
                                {page.title}
                              </a>
                            </div>
                          </Link>
                        )}
                      </>
                    ))}
                    <Link href = "/hufi-rewards-member">
                      <a className = "flex items-center w-full text-xl font-medium cursor-pointer gap-x-3 text-onBackground hover:text-onBackground/70">Hufi Rewards Member</a>
                    </Link>
                  </div>

                  {user?.customer ? 
                  <div className="absolute bottom-0 w-full px-4 py-6 pb-24 space-y-6 border-t border-onBackground/15">
                    <div className="flex flex-col gap-3">
                      <div>
                        <Link href = "/profile">
                          <a className = "flex items-center w-full text-xl font-medium cursor-pointer gap-x-3 text-onBackground hover:text-onBackground/70">Profile <UserCircleIcon className = "w-5 h-5"/></a>
                        </Link>
                      </div>
                      <div>
                        <Link href = "/profile?tab=orders">
                        <a className = "flex items-center w-full text-xl font-medium cursor-pointer gap-x-3 text-onBackground hover:text-onBackground/70">Orders <CubeIcon className = "w-5 h-5"/></a>
                        </Link>
                      </div>
                      <div>
                        <Link href = "/profile?tab=settings">
                        <a className = "flex items-center w-full text-xl font-medium cursor-pointer gap-x-3 text-onBackground hover:text-onBackground/70">Settings <Cog6ToothIcon className = "w-5 h-5"/></a>
                        </Link>
                      </div>
                      <div className = "mt-10">
                        <Link href = "/api/logout">
                          <a className = "flex items-center w-full text-xl font-medium cursor-pointer gap-x-3 text-onBackground hover:text-onBackground/70">Logout <ArrowRightOnRectangleIcon className = "w-5 h-5"/></a>
                        </Link>
                      </div>
                    </div>
                  </div>
                  :
                  <div className="absolute bottom-0 w-full px-4 py-6 pb-24 space-y-6 border-t border-onBackground/15 ">
                    <div className = "w-full">
                      <Link href = "/login">
                        <a className = "flex items-center w-full py-1 text-xl font-medium cursor-pointer gap-x-3 text-onBackground hover:text-onBackground/70">Login</a>
                      </Link>
                      <Link href = "/signup">
                        <a className = "flex items-center w-full py-1 text-xl font-medium cursor-pointer gap-x-3 text-onBackground hover:text-onBackground/70">Sign up</a>
                      </Link>
                    </div>
                  </div>
                  }

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
        <header className="relative z-20">
          <nav aria-label="Top">
            {/* Secondary navigation */}
            <div className={`top-0 z-20 shadow-sm bg-background overflow-hidden`}>
              <div className="px-4 mx-auto max-w-7xl">
                <div className="">
                  <div className="flex items-center justify-between h-16">

                    <div className="flex-1 hidden w-full h-full lg:flex">
                      {/* Mega menus */}
                        <div className="flex items-center justify-center h-full space-x-8 " >
                          {data?.menu?.items?.map((category, categoryIdx) => (
                            <> 
                              {category.items != 0 && (
                                <div className = "h-full group">
                                  <Link href = {`/collection/${slugify(category?.title)}`}>
                                    <div className="relative flex items-center justify-center h-full text-sm font-medium cursor-pointer hover:text-onBackground/70">
                                        {category.title}
                                        <div className = "absolute bottom-0 left-0 right-0 w-full h-0.5 bg-onBackground rounded-full group-hover:block hidden"/>
                                    </div>
                                  </Link>
                                  <div className="absolute left-0 right-0 transition opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto top-full sm:text-sm" style={{marginLeft:0}}>
                                    {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                    <div className="absolute inset-0 shadow-xl top-1/2" aria-hidden="true" />
                                    <div className="relative bg-background">
                                      <div className="px-4 mx-auto max-w-7xl">
                                        <div className="py-10 columns-5">
                                          {category.items.map((subCategory)=>(
                                            <div key = {subCategory.title} className = "mb-6 break-inside-avoid">
                                              <Link href = {`/collection/${slugify(category?.title)}/${slugify(category?.title)}-${slugify(subCategory?.title)}`}>
                                                <p
                                                  id={`desktop-featured-heading-${categoryIdx}`}
                                                  className="text-lg font-medium cursor-pointer hover:text-onBackground/70"
                                                >
                                                  {subCategory?.title}
                                                </p>
                                              </Link>
                                              <ul
                                                role="list"
                                                aria-labelledby={`desktop-featured-heading-${categoryIdx}`}
                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                              >
                                                {subCategory.items.map((item) => (
                                                  <Link href = {`collection/${slugify(category?.title)}/${slugify(subCategory?.title)}/${slugify(item?.title)}}`} key={item.title}>
                                                    <li className="flex">
                                                      <a className="cursor-pointer text-onBackground/80 hover:text-onBackground/50">
                                                        {item.title}
                                                      </a>
                                                    </li>
                                                  </Link>
                                                ))}
                                              </ul>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </>
                            ))}
                        </div>
                    </div>

                    {/* Logo (lg+) */}
                    <Link href = "/">
                      <div className="relative justify-center flex-1 hidden cursor-pointer lg:flex lg:items-center bg-orange-50">
                        <a className = "bg-purple-500 ">
                          <span className="sr-only">Hufi</span>
                            <div className = {`${scrollPos > 150 ? 'opacity-100' : 'opacity-0 '} transition duration-300 absolute inset-0 flex items-center justify-center w-full h-full`}>
                              <Image
                                className={`w-full h-full absolute inset-0 bg-white`}
                                src="/hufiLogo.svg"
                                alt=""
                                width={125}
                                height={125}
                              />
                            </div>
                            <div className = {`${scrollPos > 150 ? 'opacity-0' : 'opacity-100 scale-75'} transition duration-300 absolute inset-0 flex items-center justify-center w-full h-full`}>
                              <Image
                                className={`w-auto h-8 absolute inset-0`}
                                src="/hufiLogo.svg"
                                alt=""
                                width={125}
                                height={125}
                              />
                            </div>
                        </a>
                      </div>
                    </Link>

                    {/* Mobile menu and search (lg-) */}
                    <div className="flex items-center flex-1 lg:hidden">
                      <button
                        type="button"
                        className="p-2 -ml-2 rounded-md text-onBackground"
                        onClick={() => setOpen(true)}
                      >
                        <span className="sr-only">Open menu</span>
                        <Bars3Icon className="w-6 h-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Logo (lg-) */}
                    <Link href = "/">
                      <div className="relative justify-center flex-1 cursor-pointer lg:hidden ">
                        <a>
                          <span className="sr-only">Hufi</span>
                            <div className = {`${scrollPos > 150 ? 'opacity-100' : 'opacity-0'} transition duration-500 absolute inset-0 flex items-center justify-center w-full h-full`}>
                              <Image
                                className={`w-full h-full absolute inset-0`}
                                src="/hufiLogo.svg"
                                alt=""
                                width={125}
                                height={125}
                              />
                            </div>
                            <div className = {`${scrollPos > 150 ? 'opacity-0' : 'opacity-100 scale-75'} transition duration-500 absolute inset-0 flex items-center justify-center w-full h-full`}>
                              <Image
                                className={`w-auto h-8 absolute inset-0`}
                                src="/hufiLogo.svg"
                                alt=""
                                width={125}
                                height={125}
                              />
                            </div>
                        </a>
                      </div>
                    </Link>

                    {/* DESKTOP SUPPORT LINKS */}
                    <div className="flex items-center justify-end flex-1">
                      {/* For links that do not have sub links */}
                      <div className = "hidden lg:flex gap-x-10">
                        {data?.menu?.items?.map((page) => (
                          <>
                            {page.items.length === 0 && (
                              <Link href = {`
                                ${page.title == 'About' ? '/company/about-us' : page.title == 'Contact' ? '/support' : ''}
                              `} key={page.title}>
                                <a
                                  className="flex items-center text-sm font-medium transition cursor-pointer text-onBackground hover:text-onBackground/70"
                                >
                                  {page.title}
                                </a>
                              </Link>
                            )}
                          </>
                        ))}
                      </div>
                      <div className="flex items-center lg:ml-8">
                        <div className="relative flow-root rounded-full ">
                            <div className = {`${cartData?.lines?.edges?.length > 0 ? ('bg-tertiaryVariant text-white border-tertiaryVariant') : ('text-onBackground bg-transparent border-onBackground/50 hover:border-onBackground/75')} flex items-center justify-center w-6 h-6 border-2 rounded-full cursor-pointer relative z-10`}
                            onClick = {()=>setOpenCart(!openCart)}
                            >
                              <span className="text-sm font-medium ">{cartData?.lines?.edges?.length || 0}</span>
                            </div>
                            <div className = {`absolute inset-0 bg-tertiary rounded-full opacity-0 ${(cartData?.lines?.edges?.length != 0 && !viewedCart) && ('animate-ping opacity-100') }`}/>
                            <span className="sr-only">items in cart, view bag</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <CartDrawer openCart = {openCart} setOpenCart = {setOpenCart}/>
      </div>
    </>
  )
}

function MobileLinks({category}){
  const [open,setOpen] = useState(false)
  const [openSecondary, setOpenSecondary] = useState()
  return(
    <>
      <p className = "flex items-center justify-between w-full px-4 py-3 text-xl font-medium cursor-pointer text-onBackground hover:text-onBackground/70"
      onClick = {()=>setOpen(!open)}
      >
      {category.title}
      <ChevronRightIcon className = "w-5 h-5 font-medium"/>
      </p>
      {open && (
        <>
          <div className = "absolute inset-0 w-full overflow-scroll bg-background">
            {/* HEADER */}
            <div className="flex px-4 pt-5 pb-2 mt-2 text-onBackground/50">
              <button
                type="button"
                className="inline-flex items-center justify-center -m-2 rounded-md "
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <ChevronLeftIcon className="w-6 h-6" aria-hidden="true" />
                <span>{category.title}</span>
              </button>
            </div>

            {/* COLLECTION NAME LINK */}
            <Link href = {`/collection/${slugify(category.title)}`}>
              <h1 className = "px-4 mt-4 mb-4 text-2xl font-medium cursor-pointer">{category.title}</h1>
            </Link>

            {/* COLLECTION SUBCOLLECTIONS */}
            {category.items.map((subCategory,index)=>(
              <div key={subCategory.title} className="px-4">
                <div>
                  {/* SUBCOLLECTION TITLES */}
                  <p className="flex justify-between py-2 text-lg font-medium cursor-pointer text-onBackground/70 hover:text-onBackground/50 " onClick = {()=>setOpenSecondary(subCategory.title)}>
                    {subCategory.title}
                    <ChevronRightIcon className = "w-5 h-5"/>
                  </p>
                  {subCategory.title === openSecondary && (
                    <div className = "absolute inset-0 bg-background">
                      {/* SUBCOLLECTION HEADER */}
                      <div className="flex px-4 pt-5 pb-2 mt-2 text-onBackground/50">
                        <button
                          type="button"
                          className="inline-flex items-center justify-center -m-2 rounded-md"
                          onClick={() => setOpenSecondary(null)}
                        >
                          <span className="sr-only">Close menu</span>
                          <ChevronLeftIcon className="w-6 h-6" aria-hidden="true" />
                          <span>{subCategory.title}</span>
                        </button>
                      </div>

                      {/* SUBCOLLECTION TITLE */}
                      <Link href = {`/collection/${slugify(category.title)}/${slugify(category.title)}-${slugify(subCategory.title)}`}>
                        <h1 className = "px-4 mt-4 mb-4 text-2xl font-medium cursor-pointer">{subCategory.title}</h1>
                      </Link>

                      {/* SUBCOLLECTION PRODUCTS */}
                      {subCategory.items.map((item) => (
                        <Link href = "" key = {item.title}>
                          <p className="px-4 py-2 text-lg font-medium cursor-pointer text-onBackground/70 hover:text-onBackground/40">
                            {item.title}
                          </p>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  )
}


function CartDrawer({openCart, setOpenCart}){
  const {cartData,setViewedCart,setCheckout,checkout} = useContext(CartContext)
  const {currentUser,currentUserACCESS} = useContext(UserContext)
  const {locale} = useContext(LocaleContext)
  const totalItems = cartData?.lines?.edges?.length ?? 0
  const [progressWidth, setProgressWidth] = useState(100)
  const [newCheckout,setNewCheckout] = useState()
  const [checkoutUrl, setCheckoutUrl] = useState()

  useEffect(()=>{
    setProgressWidth((cartData?.cost?.subtotalAmount?.amount || 0)/75*100)
  },[cartData?.cost?.subtotalAmount?.amount])
  useEffect(()=>{
    if(openCart){
      setViewedCart(true)
    }
  },[openCart])
  


  // NOTE, this use effect is for applying automatic discounts to checkout mutation
  // AS of Sep 24 2022, we are using the normal cart checkout url.

  
  // useEffect(()=>{
  //   let lines = []
  //   cartData?.lines?.edges.forEach((product)=>{
  //     lines = [...lines, {quantity:product.node.quantity, variantId:product.node.merchandise.id}]
  //   })

  //   const createNewCheckout = async () =>{
  //     //TODO, create a new checkout from exisiting card
  //     //NOTE, too many queries might cause errors, please add error handling
  //     const {data,errors} = await storefront(createCheckout,{input:{email:currentUser?.email, lineItems:lines}})
  //     setNewCheckout(data?.checkoutCreate.checkout)

  //     // TODO, once checkout has been created, add discount application for free shipping if user is currently logged in.
  //     // NOTE, If statement is not necessary as we are creating new checkouts. 
  //     if(data?.checkoutCreate?.checkout?.discountApplications?.nodes.length == 0 && currentUser){
  //       const {data,errors} = await storefront(applyCheckoutDiscount,{checkoutId:newCheckout?.id,discountCode:"Members Rewards"})
  //       console.log(data)

  //       // TODO, replace checkoutUrl domain with stores domain
        
  //       // NOTE, this fix is very annoying as webUrl from applyCheckoutDiscount mutation
  //       // doesnt actually return the newly set url we have created in shopify. This will
  //       // do for now.
  //       setCheckoutUrl(data?.checkoutDiscountCodeApplyV2?.checkout.webUrl.replace("hufi-2262.myshopify","checkout.hufistore"))
  //       setCheckout(data?.checkoutDiscountCodeApplyV2?.checkout)
  //     }
  //   }
  //   createNewCheckout()
  // },[cartData,currentUser])




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
              {cartData?.lines.edges.length == 0 ?
                <>
                  <div className="flex justify-between px-4 pt-5 pb-2">
                    <span className = "text-xl font-medium">Cart <span className = "text-xl text-gray-400">{totalItems}</span></span>
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
                        <Link href =  "/collections/all-products">
                          <Button text = 'Shop' className = "w-full bg-secondaryVariant hover:bg-secondary" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              :
              <>
                <div className="flex justify-between px-4 pt-5 pb-2">
                  <span className = "text-xl font-medium">Cart <span className = "text-xl text-gray-400">{totalItems}</span></span>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center p-2 -m-2 rounded-md text-onBackground"
                    onClick={() => setOpenCart(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>

                {/* PRODUCTS CONTAINER */}
                <div className = "w-full h-full overflow-scroll ">
                  {cartData?.lines.edges.map((product)=>(
                      <CartProduct data = {product} key = {product.id}/>
                  ))}
                </div>

                {/* BOTTOM INFORMATION */}
                <div className = "w-full px-4 py-6 pb-16 overflow-hidden border-b border-onPrimary/15 bg-surface">
                  {/* SLIDER FOR FREE SHIPPING */}
                  <div className = "relative left-0 right-0 w-full">
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
                  </div>

                  {/* Subtotal information */}
                  <div className = "w-full py-6">
                    <p className = "flex items-center justify-between">
                      <span className = "text-base font-medium">Subtotal</span>
                      <span className = "text-base font-medium">{formatNumber(cartData?.cost.subtotalAmount.amount,cartData?.cost.subtotalAmount.currencyCode,locale)}</span>
                    </p>
                    <p className = "flex items-center justify-between text-onBackground/50">
                      <span className = "text-sm font-medium">Shipping</span>
                      <span className = "text-sm font-medium">{cartData?.cost.subtotalAmount.amount>=75 ? 'Free Shipping' :'Calculated at checkout'}</span>
                    </p>
                  </div>
                  <div className = "flex flex-col items-center justify-center">
                    <Link href = {cartData?.checkoutUrl || ''}>
                      <Button text = "Checkout" className = "w-full bg-secondaryVariant hover:bg-secondary"/>
                    </Link>
                      
                    <span className = "mt-2 text-xs text-neutral-400">Members get free shipping on any order.</span>
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

function CartProduct({data}){
  const {locale} = useContext(LocaleContext)
  const {cartData,setCartData} = useContext(CartContext)

  const handleDelete = async (data)=>{
    const newCart = await removeProduct(data,cartData)
    setCartData(newCart)
  }

  const handleQty = async (amount,product)=>{
    const newCart = await updateCart(cartData,amount,product)
    setCartData(newCart)
  }

  return(
    <div className = "flex w-full max-w-xs gap-6 px-4 py-6 border-b border-onPrimary/15">
      {/* IMAGE */}
      <div className = "relative w-20 h-20 bg-gray-400 rounded-md flex-0 "> 
        <Image src = {data.node.merchandise.image.url} alt = {data.node.merchandise.image.altText} layout = 'fill' objectFit='cover' className = "rounded-md"/>
        <span className = "absolute top-[-10px] right-[-10px] flex items-center justify-center w-6 h-6 text-sm font-medium rounded-full bg-primary text-onPrimary/70">{data.node.quantity}</span>
      </div>
      <div className = "flex-1 w-full h-full">
        <div className = "grid grid-rows-1 gap-1">
          {/* TITLE & PRICE */}
          <p className = "flex items-center justify-between w-full">
            <span className = "font-medium">{data.node.merchandise.product.title}</span>
            <span className = "font-medium">{formatNumber(data.node.merchandise.priceV2.amount,data.node.merchandise.priceV2.currencyCode,locale)}</span>
          </p>
          {/* SELECTED VARIANTS */}
          <p className = "flex items-center justify-between w-full text-sm text-onBackground/60">{data.node.merchandise.title === "Default Title" ? data.node.merchandise.product.title : (data.node.merchandise.title).replace("/","-")}</p>

          {/* INPUTS */}
          <div className = "flex items-center justify-between">
            <div className = "flex items-center justify-center">
              <button className = "hover:text-neutral-400" onClick = {()=>handleQty(data.node.quantity-1,data)}><MinusIcon className = "w-4 h-4"/></button>
              <p className = "flex items-center justify-center w-10">{data.node.quantity}</p>
              <button className = "hover:text-neutral-400" onClick = {()=>handleQty(data.node.quantity+1,data)}><PlusIcon className = "w-4 h-4"/></button>
            </div>
            <TrashIcon className = "w-5 h-5 transition cursor-pointer hover:text-tertiaryVariant"
              onClick = {()=>handleDelete(data)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
