import UserContext from "../../../context/userContext"
import LocaleContext from "../../../context/localeContext"
import CartContext from "../../../context/cartContext"
import { Transition, Dialog } from "@headlessui/react"
import { useState,useContext,useEffect } from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { formatNumber } from "../../../utils/formatNumber"
import Link from "next/link"
import { Button } from "../../elements"
import { CartProduct } from ".."

export default function CartDrawer({openCart, setOpenCart,Fragment}){
  const {cartData,setViewedCart,setCheckout,checkout} = useContext(CartContext)
  const {currentUser,currentUserACCESS} = useContext(UserContext)
  const {locale} = useContext(LocaleContext)
  const totalItems = cartData?.lines?.edges?.length ?? 0
  const [progressWidth, setProgressWidth] = useState(100)

  useEffect(()=>{
    setProgressWidth((cartData?.cost?.subtotalAmount?.amount || 0)/75*100)
  },[cartData?.cost?.subtotalAmount?.amount])
  useEffect(()=>{
    if(openCart){
      setViewedCart(true)
    }
  },[openCart])
  

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
                <div className="flex justify-between px-4 py-4">
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

                {/* PRODUCTS CONTAINER */}
                <div className = "w-full h-full overflow-scroll divide-y">
                  {cartData?.lines?.edges?.map((product)=>(
                      <CartProduct data = {product} key = {product.id}/>
                  ))}
                </div>

                {/* BOTTOM INFORMATION */}
                <div className = "w-full px-4 py-6 pb-16 overflow-hidden border-b border-onPrimary/15 bg-surface">
                  {/* If user is logged in do not display the slider as they get free shipping. */}
                  {currentUser ? 
                    <></>
                  :
                    <div className = "relative left-0 right-0 w-full pb-7">
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
                  }

                  {/* Subtotal information */}
                  <div className = "w-full pb-2">
                    <p className = "flex items-center justify-between">
                      <span className = "text-lg font-medium">Subtotal</span>
                      <span className = "text-lg font-medium">{formatNumber(cartData?.cost.subtotalAmount.amount,cartData?.cost.subtotalAmount.currencyCode,locale)}</span>
                    </p>
                  </div>
                  <div className = "flex flex-col items-center justify-center pb-8">
                    <Link href = {cartData?.checkoutUrl || ''}>
                      <Button text = {`Checkout (${totalItems} items)`} className = "w-full checkout-button bg-secondaryVariant hover:bg-secondary"/>
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