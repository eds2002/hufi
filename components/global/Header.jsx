import { Fragment, useState,useMemo, useContext} from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { ArrowRightOnRectangleIcon, Bars3Icon, CubeIcon, UserCircleIcon, ChatBubbleBottomCenterIcon} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRef } from 'react'
import Image from 'next/image'
import CartContext from '../../context/cartContext'
import { slugify } from '../../utils/slugify'
import { CartDrawer } from '.'
import MobileNav from './mobilenav/MobileNav'
import useSWR from 'swr'




export default function Header({data,user}) {
  const [open, setOpen] = useState(false)
  const [scrollPos,setScrollPos] = useState(0)
  const {openCart,setOpenCart,cartData,viewedCart,setViewedCart} = useContext(CartContext)

  const headerRef = useRef()

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
                <div className = "absolute right-0 z-40 max-w-xl rounded-lg shadow-xl opacity-0 pointer-events-none bg-surface group-hover:opacity-100 group-hover:pointer-events-auto">
                  <div className="flex flex-col items-start justify-start w-56 divide-y divide-onSurface/20">
                    <Link href = "/user/profile?tab=profile">
                      <div className = "w-full pl-4 pr-10 rounded-md hover:bg-background">
                        <li className = "flex items-center w-full py-2 text-base font-medium cursor-pointer gap-x-3 text-onBackground">Profile <UserCircleIcon className = "w-5 h-5"/></li>
                      </div>
                    </Link>
                    <Link href = "/user/profile?tab=orders">
                      <div className = "w-full pl-4 pr-10 rounded-md hover:bg-background">
                        <a className = "flex items-center w-full py-2 text-base font-medium cursor-pointer gap-x-3 text-onBackground">Orders <CubeIcon className = "w-5 h-5"/></a>
                      </div>
                    </Link>
                    <Link href = "/user/profile?tab=support">
                      <div className = "w-full pl-4 pr-10 rounded-md hover:bg-background">
                        <a className = "flex items-center w-full py-2 text-base font-medium cursor-pointer gap-x-3 text-onBackground">Support <ChatBubbleBottomCenterIcon className = "w-5 h-5"/></a>
                      </div>
                    </Link>
                    <Link href = "/api/logout" >
                      <div className = "w-full py-5 pl-4 pr-10 rounded-md cursor-pointer hover:bg-background">
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
                                        <div className="py-10 columns-4">
                                          {category.items.map((subCategory)=>(
                                            <div key = {subCategory.title} className = "mb-6 break-inside-avoid">
                                              <Link href = {`/collection/${slugify(category?.title)}/${slugify(category?.title)}-${slugify(subCategory?.title)}`}>
                                                <p
                                                  id={`desktop-featured-heading-${categoryIdx}`}
                                                  className="self-start text-lg font-medium cursor-pointer hover:text-onBackground/70 justify-self-start"
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
                                                  <Link href = {`/product/${slugify(item?.title)}`} key={item.title}>
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
                            <div className = {`${cartData?.lines?.edges?.length > 0 ? ('bg-tertiaryVariant text-white border-tertiaryVariant') : ('text-onBackground bg-transparent border-onBackground/50 hover:border-onBackground/75')} flex items-center justify-center w-6 h-6 border-2 rounded-full cursor-pointer relative z-10 view-cart-GA4`}
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
      </div>
      <MobileNav open = {open} setOpen = {setOpen} data = {data} user = {user}/>
      <CartDrawer openCart={openCart} setOpenCart = {setOpenCart} Fragment = {Fragment}/>
    </>
  )
}


