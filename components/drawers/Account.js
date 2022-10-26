import { Transition, Dialog } from "@headlessui/react"
import { useState,useContext,useEffect, useMemo,Fragment } from "react"
import UserContext from "../../context/userContext"
import Link from "next/link"
import { UserCircleIcon,CubeIcon,ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline"
import { CloseButton } from "../features"
import { XMarkIcon } from "@heroicons/react/24/outline"

export default function Account({setOpenAccount, openAccount}){
  const {currentUser} = useContext(UserContext)
  return(
    <Transition.Root show={openAccount} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={setOpenAccount}>
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
              <div className = "relative h-full">
                <p className = "relative p-4 text-xl font-medium border-b">
                  Account
                  <span className = "absolute inset-0 flex items-center justify-end px-4 ">
                    <XMarkIcon 
                      className = "w-6 h-6 cursor-pointer"
                      onClick={()=>setOpenAccount(false)}

                    />
                  </span>
                </p>
                {currentUser ? 
                <>
                  <div className = "relative p-4">
                    <div className="flex flex-col gap-6">
                      <div>
                        <Link href = "/user/profile?tab=profile">
                          <a className = "flex items-center w-full text-xl font-medium cursor-pointer gap-x-3 text-onBackground hover:text-onBackground/70">Profile <UserCircleIcon className = "w-5 h-5"/></a>
                        </Link>
                      </div>
                      <div>
                        <Link href = "/user/profile?tab=orders">
                        <a className = "flex items-center w-full text-xl font-medium cursor-pointer gap-x-3 text-onBackground hover:text-onBackground/70">Orders <CubeIcon className = "w-5 h-5"/></a>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 w-full px-4 py-6 pb-12 space-y-6 border-t border-onBackground/15">
                    <div className = "mt-10">
                      <Link href = "/api/logout">
                        <a className = "flex items-center w-full text-xl font-medium cursor-pointer gap-x-3 text-onBackground hover:text-onBackground/70">Logout <ArrowRightOnRectangleIcon className = "w-5 h-5"/></a>
                      </Link>
                    </div>
                  </div>
                </>
                :
                <div className="absolute bottom-0 w-full px-4 py-6 pb-12 space-y-6 border-t border-onBackground/15 ">
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
              </div>
            
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

