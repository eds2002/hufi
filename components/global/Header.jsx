import { Fragment, useState,useMemo} from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingCartIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useScrollDirection } from 'react-use-scroll-direction'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRef } from 'react'
import Image from 'next/image'

const navigation = {
  categories: [
    {
      name: 'Women',
      featured: [
        { name: 'Sleep', href: '#' },
        { name: 'Swimwear', href: '#' },
        { name: 'Underwear', href: '#' },
      ],
      collection: [
        { name: 'Everything', href: '#' },
        { name: 'Core', href: '#' },
        { name: 'New Arrivals', href: '#' },
        { name: 'Sale', href: '#' },
      ],
      categories: [
        { name: 'Basic Tees', href: '#' },
        { name: 'Artwork Tees', href: '#' },
        { name: 'Bottoms', href: '#' },
        { name: 'Underwear', href: '#' },
        { name: 'Accessories', href: '#' },
      ],
      brands: [
        { name: 'Full Nelson', href: '#' },
        { name: 'My Way', href: '#' },
        { name: 'Re-Arranged', href: '#' },
        { name: 'Counterfeit', href: '#' },
        { name: 'Significant Other', href: '#' },
      ],
    },
    {
      name: 'Men',
      featured: [
        { name: 'Casual', href: '#' },
        { name: 'Boxers', href: '#' },
        { name: 'Outdoor', href: '#' },
      ],
      collection: [
        { name: 'Everything', href: '#' },
        { name: 'Core', href: '#' },
        { name: 'New Arrivals', href: '#' },
        { name: 'Sale', href: '#' },
      ],
      categories: [
        { name: 'Artwork Tees', href: '#' },
        { name: 'Pants', href: '#' },
        { name: 'Accessories', href: '#' },
        { name: 'Boxers', href: '#' },
        { name: 'Basic Tees', href: '#' },
      ],
      brands: [
        { name: 'Significant Other', href: '#' },
        { name: 'My Way', href: '#' },
        { name: 'Counterfeit', href: '#' },
        { name: 'Re-Arranged', href: '#' },
        { name: 'Full Nelson', href: '#' },
      ],
    },
  ],
  pages: [
    { name: 'Company', href: '#' },
    { name: 'Stores', href: '#' },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header({data}) {
  const {isScrollingDown,scrollDirection} = useScrollDirection()
  const [open, setOpen] = useState(false)
  const [displayTopNav, setDisplayTopNav] = useState(true)
  const [scrolling,setScrolling] = useState()
  const [scrollPos,setScrollPos] = useState(0)

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
      <div className=" bg-surface">
        <div className="flex items-center justify-between h-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <p className="absolute left-0 right-0 flex-1 text-sm font-medium text-center text-onPrimary lg:flex-none">
            Free worldwide shipping on orders over $75.
          </p>

          <div className="relative z-10 hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
            <span className="w-px h-6 bg-onPrimary" aria-hidden="true" />
            <Link href = "/signup">
              <a className="text-sm font-medium text-onPrimary hover:text-secondaryVariant">
                Sign in
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className={`sticky top-0 z-[30] transition duration-500`} ref = {headerRef}>
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
                          {category.items.map((subCategory,index)=>(
                            <div key={subCategory.title} className="px-4 pt-10 pb-6 ">
                              <div>
                                <p id={`mobile-featured-heading-${categoryIdx}`} className="font-medium text-onBackground">
                                  {subCategory.title}
                                </p>
                                <ul
                                  role="list"
                                  aria-labelledby={`mobile-featured-heading-${categoryIdx}`}
                                  className="mt-6 space-y-6"
                                >
                                  {subCategory.items.map((item) => (
                                    <li key={item.title} className="flex">
                                      <a href={item.url} className="text-onBackground/80">
                                        {item.title}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </>
                      ))}
                    </Tab.Panels>
                  </Tab.Group>

                  <div className="px-4 py-6 space-y-6 border-t border-primaryVariant">
                    {data?.menu?.items?.map((page) => (
                      <>
                        {page.items.length === 0 && (  
                          <div key={page.title} className="flow-root">
                            <a href={page.url} className="block p-2 -m-2 font-medium text-onBackground">
                              {page.title}
                            </a>
                          </div>
                        )}
                      </>
                    ))}
                  </div>

                  <div className="px-4 py-6 space-y-6 border-t border-primaryVariant">
                    <div className="flow-root">
                      <a href="#" className="block p-2 -m-2 font-medium text-onBackground">
                        Create an account
                      </a>
                    </div>
                    <div className="flow-root">
                      <a href="#" className="block p-2 -m-2 font-medium text-onBackground">
                        Sign in
                      </a>
                    </div>
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
        <header className="relative">
          <nav aria-label="Top">
            {/* Secondary navigation */}
            <div className={`sticky top-0 z-20 shadow-sm bg-background overflow-hidden`}>
              <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="">
                  <div className="relative flex items-center justify-between h-16">

                    <div className="z-[30]  hidden h-full lg:flex w-full flex-1 ">
                      {/* Mega menus */}
                      <Popover.Group className="ml-8">
                        <div className="flex justify-center h-full space-x-8 ">
                          {data?.menu?.items?.map((category, categoryIdx) => (
                            <> 
                              {category.items != 0 && (
                                <Popover key={category.name} className="flex">
                                  {({ open }) => (
                                    <>
                                      <div className="relative flex">
                                        <Popover.Button
                                          className={classNames(
                                            open
                                              ? 'border-secondaryVariant text-secondaryVariant'
                                              : 'border-transparent text-onBackground hover:text-secondaryVariant',
                                            'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition  ease-out'
                                          )}
                                        >
                                          {category.title}
                                          <span className = "transition hover:text-secondaryVariant text-onBackground"><ChevronDownIcon className = {`w-5 h-5 font-bold ${open ? 'rotate-180':'rotate-0'} transition `}/></span>
                                        </Popover.Button>
                                      </div>

                                      <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                      >
                                        <Popover.Panel className="absolute inset-x-0 top-full sm:text-sm">
                                          {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                          <div className="absolute inset-0 shadow-xl top-1/2" aria-hidden="true" />

                                          <div className="relative bg-background">
                                            <div className="px-8 mx-auto max-w-7xl">
                                              <div className="py-10 columns-4">
                                                {category.items.map((subCategory)=>(
                                                  <div key = {subCategory.title} className = "break-inside-avoid">
                                                    <p
                                                      id={`desktop-featured-heading-${categoryIdx}`}
                                                      className="text-lg font-medium text-onBackground"
                                                    >
                                                      {subCategory.title}
                                                    </p>
                                                    <ul
                                                      role="list"
                                                      aria-labelledby={`desktop-featured-heading-${categoryIdx}`}
                                                      className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                    >
                                                      {subCategory.items.map((item) => (
                                                        <li key={item.title} className="flex">
                                                          <a href={item.url} className="text-onBackground/80 hover:text-secondaryVariant">
                                                            {item.title}
                                                          </a>
                                                        </li>
                                                      ))}
                                                    </ul>
                                                  </div>
                                                ))}
                                              </div>
                                            </div>
                                          </div>
                                        </Popover.Panel>
                                      </Transition>
                                    </>
                                  )}
                                </Popover>
                              )}
                            </>
                          ))}

                          {/* For links that do not have sub links */}
                          {data?.menu?.items?.map((page) => (
                            <>
                              {page.items.length === 0 && (
                                <a
                                  key={page.title}
                                  href={page.href}
                                  className="flex items-center text-sm font-medium transition cursor-pointer text-onBackground hover:text-secondaryVariant"
                                >
                                  {page.title}
                                </a>
                              )}
                            </>
                          ))}
                        </div>
                      </Popover.Group>
                    </div>

                    {/* Logo (lg+) */}
                    <Link href = "/">
                      <div className="relative justify-center flex-1 hidden cursor-pointer lg:flex lg:items-center bg-orange-50">
                        <a className = "bg-purple-500 ">
                          <span className="sr-only">Hufi</span>
                            <div className = {`${scrollPos > 150 ? 'opacity-100' : 'opacity-0'} transition duration-300 absolute inset-0 flex items-center justify-center w-full h-full`}>
                              <Image
                                className={`w-full h-full absolute inset-0 bg-white`}
                                src="/hufi2.svg"
                                alt=""
                                width={25}
                                height={25}
                              />
                            </div>
                            <div className = {`${scrollPos > 150 ? 'opacity-0' : 'opacity-100'} transition duration-300 absolute inset-0 flex items-center justify-center w-full h-full`}>
                              <Image
                                className={`w-auto h-8 absolute inset-0`}
                                src="/hufi.svg"
                                alt=""
                                width={70}
                                height={70}
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
                                src="/hufi2.svg"
                                alt=""
                                width={25}
                                height={25}
                              />
                            </div>
                            <div className = {`${scrollPos > 150 ? 'opacity-0' : 'opacity-100'} transition duration-500 absolute inset-0 flex items-center justify-center w-full h-full`}>
                              <Image
                                className={`w-auto h-8 absolute inset-0`}
                                src="/hufi.svg"
                                alt=""
                                width={70}
                                height={70}
                              />
                            </div>
                        </a>
                      </div>
                    </Link>

                    <div className="flex items-center justify-end flex-1">
                      <div className="flex items-center lg:ml-8">
                        <span className="w-px h-6 mx-4 bg-onBacktext-onBackground lg:mx-6" aria-hidden="true" />

                        <div className="flow-root">
                          <a href="#" className="flex items-center p-2 -m-2 group">
                            <ShoppingCartIcon
                              className="flex-shrink-0 w-6 h-6 text-onBackground group-hover:text-secondaryVariant"
                              aria-hidden="true"
                            />
                            <span className="ml-2 text-sm font-medium text-onBackground">0</span>
                            <span className="sr-only">items in cart, view bag</span>
                          </a>
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
    </>
  )
}
