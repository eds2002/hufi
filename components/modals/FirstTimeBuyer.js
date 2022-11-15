import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment} from 'react'
import firstTime from '../../assets/firstTimeBuyer.svg'
import signedInFirstTime from '../../assets/signedInFirstTimeBuyer.svg'
import { Button, Input } from '../elements'
import { XMarkIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import UserContext from '../../context/userContext'

export default function FirstTimeModal({openModal,setOpenModal,isUserSignedAndQualified}) {
  return (
    <>
      <Transition appear show={openModal} as={Fragment}>
        <Dialog as="div" className="relative z-[99999999]" onClose={()=>setOpenModal(false)}>
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
                <Dialog.Panel className="relative w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform shadow-xl bg-surface rounded-2xl">
                  <div className = "absolute top-0 right-0 z-20 pt-6 pr-6" onClick = {()=>setOpenModal(false)}>
                    <XMarkIcon className = "flex items-center justify-center transition-all border rounded-full cursor-pointer w-7 h-7 aspect-square hover:border-black border-black/10"/>
                  </div>
                  {isUserSignedAndQualified ? 
                  <div className = "w-full h-full pointer-events-none select-none ">
                    <Image src = {signedInFirstTime} alt = 'Image of a bell.' objectFit='cover'/>
                  </div>
                  :
                  <div className = "w-full h-full pointer-events-none select-none ">
                    <Image src = {firstTime} alt = 'Image of a bell.' objectFit='cover'/>
                  </div>
                  }
                  <h3 className="text-4xl font-medium leading-6 text-onSurface">
                    {isUserSignedAndQualified  ? 
                      'Your nearly there.'
                      :
                      'Our gift to you.'
                    }
                  </h3>
                  <div className="my-4">
                      {isUserSignedAndQualified ? 
                        <div>
                          <p className="mb-2 text-gray-500">
                            Don&apos;t forget to use <b>&quot;First Timer&quot;</b> at checkout to get your discount! Being a Hufi Rewards Member, you also get:
                          </p>
                          <li className = "text-gray-500 list-item">Occasional discounts.</li>
                          <li className = "text-gray-500 list-item">News on new upcoming products.</li>
                          <li className = "text-gray-500 list-item">Free shipping with code &quot;Members Rewards&quot;.</li>
                        </div>
                        :
                        <p className="text-gray-500 ">
                          Become a Hufi rewards member to receive a 20% off your first order as well as many other benefits.
                        </p>
                      }
                  </div>
                  {isUserSignedAndQualified ? 
                    <>
                      <Button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      text = 'Start shopping'
                      onClick = {()=>setOpenModal(false)}
                      />
                    </>
                    :
                    <>
                      <Link href = "/signup">
                        <Button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        text = 'Unlock 20% off'
                        />
                      </Link>
                      <p className = 'mt-1 text-sm font-medium text-center cursor-pointer hover:text-onBackground/25 text-onBackground/50' onClick = {()=>setOpenModal(false)}>I&apos;ll pass, thanks.</p>
                    </>
                    }
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
