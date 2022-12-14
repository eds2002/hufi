import { Transition,Dialog,Tab } from "@headlessui/react"
import React, { Fragment,useEffect,useState } from "react"
import { XMarkIcon,UserCircleIcon,CubeIcon, ChatBubbleBottomCenterIcon,ArrowRightOnRectangleIcon,ChevronRightIcon,ChevronLeftIcon} from "@heroicons/react/24/outline"
import Link from "next/link"
import { slugify } from "../../../utils/slugify"
import { useRouter } from "next/router"
export default function MobileNav({open,setOpen,data,user}){
  const router = useRouter()

  useEffect(()=>{
    setOpen(false)
  },[router.asPath])
  return(
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
              <div className="flex items-center justify-center w-full px-4 py-5 ">
                <div className = "w-full ">
                  <Link href = "/">
                    <p className = "text-3xl font-medium ">Shop Hufi</p>
                  </Link>
                </div>
                <button
                  type="button"
                  className="p-2 -m-2 rounded-md outline-none"
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
                    <React.Fragment key = {categoryIdx}>
                      {category.items != 0 && (
                      <>
                        <MobileLinks category = {category}/>
                      </>
                      )}
                    </React.Fragment>
                  ))}
                </Tab.Panels>
              </Tab.Group>
              <div className="px-4 py-6 space-y-6 border-t border-onBackground/15">
                {data?.menu?.items?.map((page) => (
                  <React.Fragment key = {page.title}>
                    {page.items.length === 0 && (  
                      <Link href = {`
                      ${page.title == 'About' 
                        ? '/company/about-us' 
                        : page.title == 'Contact' 
                          ? '/support' 
                          : page.title == 'Blog' 
                            ? '/blog'
                            : ''
                          }
                      `}>
                        <div key={page.title} className="flow-root">
                          <a className = "flex items-center justify-between w-full text-xl font-medium cursor-pointer text-onBackground hover:text-onBackground/70">
                            {page.title}
                          </a>
                        </div>
                      </Link>
                    )}
                  </React.Fragment>
                ))}
                <Link href = "/hufi-rewards-member">
                  <a className = "flex items-center w-full text-xl font-medium cursor-pointer gap-x-3 text-onBackground hover:text-onBackground/70">Hufi Rewards Member</a>
                </Link>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
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
          <div className = "absolute inset-0 z-10 w-full overflow-scroll bg-background">
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
                        <Link href = {`/product/${slugify(item.title)}`} key = {item.title}>
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